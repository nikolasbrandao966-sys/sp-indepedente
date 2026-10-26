export const SITE_NAME = "São Paulo Independente"
export const SITE_SHORT = "SPI"
export const SIGNATURE_GOAL = 1000

export interface SignatureItem {
  name: string
  city: string
  uf: string
  createdAt: string
}

export interface StatsResponse {
  total: number
  spCount: number
  recentCount: number
  topCities: Array<{ city: string; uf: string; count: number }>
  goal: number
}

export interface SignaturesResponse {
  items: SignatureItem[]
  total: number
  page: number
  totalPages: number
}

export function formatNumber(n: number) {
  return n.toLocaleString("pt-BR")
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60_000)
  if (min < 1) return "agora mesmo"
  if (min < 60) return `há ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `há ${h} ${h === 1 ? "hora" : "horas"}`
  const d = Math.floor(h / 24)
  if (d < 30) return `há ${d} ${d === 1 ? "dia" : "dias"}`
  const m = Math.floor(d / 30)
  return `há ${m} ${m === 1 ? "mês" : "meses"}`
}

/** Cor determinística baseada no nome (para avatares do mural) */
const AVATAR_COLORS = [
  "bg-red-600",
  "bg-zinc-600",
  "bg-red-800",
  "bg-stone-600",
  "bg-rose-700",
  "bg-zinc-800",
  "bg-red-950",
  "bg-neutral-700",
]
export function avatarColor(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
