import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const UF_LIST = [
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'DF',
  'GO', 'MT', 'MS', 'ES', 'PA', 'AM', 'MA', 'PB', 'RN', 'AL',
  'SE', 'PI', 'TO', 'RO', 'RR', 'AP', 'AC',
] as const

const signatureSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Informe seu nome completo (mínimo 3 letras).')
    .max(80, 'Nome muito longo.')
    .regex(/^[\p{L}\s'.-]+$/u, 'O nome deve conter apenas letras.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Informe um e-mail válido.'),
  city: z
    .string()
    .trim()
    .min(2, 'Informe sua cidade.')
    .max(60, 'Cidade muito longa.'),
  uf: z.enum(UF_LIST).default('SP'),
  isPublic: z.boolean().default(true),
  agreed: z.literal(true, {
    message: 'Você precisa concordar com o manifesto para assinar.',
  }),
})

// Throttle simples em memória: máx. 5 envios por IP por minuto
const hits = new Map<string, number[]>()
function isRateLimited(ip: string) {
  const now = Date.now()
  const window = 60_000
  const list = (hits.get(ip) ?? []).filter((t) => now - t < window)
  if (list.length >= 5) return true
  list.push(now)
  hits.set(ip, list)
  return false
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
    const limit = Math.min(48, Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10) || 12))

    const [items, totalPublic] = await Promise.all([
      db.signature.findMany({
        where: { isPublic: true },
        orderBy: [{ createdAt: 'desc' }],
        select: {
          name: true,
          city: true,
          uf: true,
          createdAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.signature.count({ where: { isPublic: true } }),
    ])

    return NextResponse.json({
      items,
      total: totalPublic,
      page,
      totalPages: Math.max(1, Math.ceil(totalPublic / limit)),
    })
  } catch (error) {
    console.error('GET /api/signatures error:', error)
    return NextResponse.json(
      { error: 'Não foi possível carregar as assinaturas.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Aguarde um minuto e tente novamente.' },
        { status: 429 }
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
    }

    const parsed = signatureSchema.safeParse(body)
    if (!parsed.success) {
      const issue = parsed.error.issues[0]
      return NextResponse.json(
        { error: issue?.message ?? 'Dados inválidos.' },
        { status: 400 }
      )
    }

    const { name, email, city, uf, isPublic } = parsed.data

    const existing = await db.signature.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'Este e-mail já assinou o manifesto. Cada pessoa assina uma vez!' },
        { status: 409 }
      )
    }

    const created = await db.signature.create({
      data: { name, email, city, uf, isPublic },
    })

    return NextResponse.json(
      {
        id: created.id,
        name: created.isPublic ? created.name : 'Assinatura anônima',
        message: 'Assinatura registrada com sucesso!',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/signatures error:', error)
    return NextResponse.json(
      { error: 'Erro interno ao registrar sua assinatura. Tente novamente.' },
      { status: 500 }
    )
  }
}
