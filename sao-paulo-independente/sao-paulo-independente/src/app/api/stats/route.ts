import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const now = new Date()
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const [total, spCount, recentCount] = await Promise.all([
      db.signature.count(),
      db.signature.count({ where: { uf: 'SP' } }),
      db.signature.count({ where: { createdAt: { gte: last24h } } }),
    ])

    // Cidades com mais assinaturas
    const grouped = await db.signature.groupBy({
      by: ['city', 'uf'],
      _count: { city: true },
      orderBy: { _count: { city: 'desc' } },
      take: 6,
    })

    const topCities = grouped.map((g) => ({
      city: g.city,
      uf: g.uf,
      count: g._count.city,
    }))

    return NextResponse.json({
      total,
      spCount,
      recentCount,
      topCities,
      goal: 1000,
    })
  } catch (error) {
    console.error('GET /api/stats error:', error)
    return NextResponse.json(
      { error: 'Não foi possível carregar as estatísticas.' },
      { status: 500 }
    )
  }
}
