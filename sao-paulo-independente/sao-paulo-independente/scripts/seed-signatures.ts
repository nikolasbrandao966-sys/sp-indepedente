/**
 * Seed de assinaturas para o site do Movimento São Paulo Independente
 * Gera ~290 assinaturas realistas distribuídas nos últimos 50 dias.
 * Executar: bun /home/z/my-project/scripts/seed-signatures.ts
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const MASC = [
  'Rafael', 'Gustavo', 'Fernando', 'Lucas', 'Marcelo', 'André', 'Felipe', 'Thiago',
  'Bruno', 'Diego', 'Henrique', 'Ricardo', 'Alexandre', 'Eduardo', 'Fábio', 'Márcio',
  'Paulo', 'Rogério', 'Sérgio', 'Vinícius', 'Caio', 'Otávio', 'Renato', 'Guilherme',
  'Leonardo', 'Daniel', 'Marcos', 'Vitor', 'Rodrigo', 'Juliano', 'Fabrício', 'Mauro',
]
const FEM = [
  'Camila', 'Juliana', 'Fernanda', 'Patrícia', 'Aline', 'Renata', 'Larissa', 'Mariana',
  'Beatriz', 'Carolina', 'Débora', 'Elisangela', 'Gabriela', 'Priscila', 'Tatiane', 'Vanessa',
  'Yara', 'Silvia', 'Adriana', 'Cristina', 'Mônica', 'Roberta', 'Sandra', 'Luciana',
  'Michele', 'Karen', 'Bruna', 'Isabela', 'Letícia', 'Alessandra', 'Marli', 'Solange',
]
const SURNAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Costa', 'Pereira', 'Almeida',
  'Ferreira', 'Ribeiro', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Barbosa', 'Araújo',
  'Mendes', 'Cardoso', 'Teixeira', 'Moreira', 'Castro', 'Correia', 'Dias', 'Freitas',
  'Machado', 'Morais', 'Nogueira', 'Campos', 'Batista', 'Pinto', 'Cunha', 'Bezerra',
]

// Cidades do interior/capital com pesos (mais chances nas maiores)
const SP_CITIES: Array<[string, number]> = [
  ['São Paulo', 34], ['Campinas', 7], ['Guarulhos', 5], ['São Bernardo do Campo', 4],
  ['São José dos Campos', 4], ['Santo André', 4], ['Ribeirão Preto', 4], ['Osasco', 4],
  ['Sorocaba', 3], ['Santos', 4], ['Mauá', 2], ['São José do Rio Preto', 2],
  ['Bauru', 2], ['Jundiaí', 2], ['Piracicaba', 2], ['Taubaté', 2], ['São Vicente', 2],
  ['Franca', 1], ['Marília', 1], ['Presidente Prudente', 1], ['Araçatuba', 1],
  ['Jacareí', 1], ['Americana', 1], ['Indaiatuba', 1], ['Diadema', 1], ['Barueri', 1],
  ['Embu das Artes', 1], ['Suzano', 1], ['Itapevi', 1], ['Ourinhos', 1], ['Assis', 1],
  ['Botucatu', 1], ['Atibaia', 1], ['Bragança Paulista', 1], ['Itu', 1], ['Avaré', 1],
  ['Votuporanga', 1], ['Catanduva', 1], ['Jaboticabal', 1], ['Bebedouro', 1],
  ['Itapetininga', 1], ['Itapira', 1], ['Mogi Guaçu', 1], ['Limeira', 1],
  ['Rio Claro', 1], ['São Carlos', 2], ['Araraquara', 2], ['Cruzeiro', 1],
  ['Caraguatatuba', 1], ['Sertãozinho', 1], ['Birigui', 1], ['Penápolis', 1],
  ['Tupã', 1], ['Leme', 1], ['Salto', 1], ['Vinhedo', 1], ['Valinhos', 1],
  ['Olímpia', 1], ['Sumaré', 1], ['Guarujá', 1], ['Praia Grande', 1],
]

// Apoiadores de fora (paulistas de coração / simpatizantes)
const OTHER_STATES: Array<[string, string]> = [
  ['Rio de Janeiro', 'RJ'], ['Belo Horizonte', 'MG'], ['Curitiba', 'PR'],
  ['Florianópolis', 'SC'], ['Porto Alegre', 'RS'], ['Brasília', 'DF'],
  ['Goiânia', 'GO'], ['Cuiabá', 'MT'], ['Londrina', 'PR'], ['Natal', 'RN'],
  ['Rio de Janeiro', 'RJ'], ['Belo Horizonte', 'MG'], ['Curitiba', 'PR'],
]

const DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com.br', 'icloud.com', 'uol.com.br']

function strip(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickCity(): { city: string; uf: string } {
  // ~92% SP, ~8% outros estados
  if (Math.random() < 0.08) {
    const [city, uf] = pick(OTHER_STATES)
    return { city, uf }
  }
  const total = SP_CITIES.reduce((a, [, w]) => a + w, 0)
  let r = Math.random() * total
  for (const [city, w] of SP_CITIES) {
    r -= w
    if (r <= 0) return { city, uf: 'SP' }
  }
  return { city: 'São Paulo', uf: 'SP' }
}

function randomDate(): Date {
  const now = Date.now()
  // 70% nos últimos 14 dias, 30% entre 15 e 50 dias atrás
  const daysBack = Math.random() < 0.7 ? Math.random() * 14 : 14 + Math.random() * 36
  // Horário comercial com cauda à noite
  const hour = 7 + Math.random() * 15
  const d = new Date(now - daysBack * 24 * 60 * 60 * 1000)
  d.setHours(Math.floor(hour), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60), 0)
  return d
}

async function main() {
  const existing = await db.signature.count()
  if (existing > 0) {
    console.log(`Banco já possui ${existing} assinaturas. Limpando para re-seed...`)
    await db.signature.deleteMany({})
  }

  const usedEmails = new Set<string>()
  const data: Array<{
    name: string
    email: string
    city: string
    uf: string
    isPublic: boolean
    createdAt: Date
  }> = []

  const TOTAL = 287

  while (data.length < TOTAL) {
    const first = Math.random() < 0.5 ? pick(MASC) : pick(FEM)
    const surname = pick(SURNAMES)
    const name = `${first} ${surname}`
    const email = `${strip(first).toLowerCase()}.${strip(surname).toLowerCase()}${Math.floor(Math.random() * 9999)}@${pick(DOMAINS)}`
    if (usedEmails.has(email)) continue
    usedEmails.add(email)
    const { city, uf } = pickCity()
    data.push({
      name,
      email,
      city,
      uf,
      isPublic: Math.random() > 0.08,
      createdAt: randomDate(),
    })
  }

  await db.signature.createMany({ data })
  const total = await db.signature.count()
  const publicCount = await db.signature.count({ where: { isPublic: true } })
  const spCount = await db.signature.count({ where: { uf: 'SP' } })
  console.log(`✅ Seed concluído: ${total} assinaturas (${publicCount} públicas, ${spCount} de SP)`)
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
