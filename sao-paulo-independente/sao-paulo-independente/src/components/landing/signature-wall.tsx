"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Loader2, MapPin, Plus, RefreshCw, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useStats } from "@/hooks/use-stats"
import {
  avatarColor,
  formatNumber,
  initials,
  SignaturesResponse,
  SignatureItem,
  timeAgo,
} from "@/lib/site"

const PAGE_SIZE = 12

export function SignatureWall() {
  const { stats } = useStats()
  const [items, setItems] = useState<SignatureItem[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestId = useRef(0)

  const fetchPage = useCallback(
    async (targetPage: number, append: boolean) => {
      const id = ++requestId.current
      if (append) setLoadingMore(true)
      else setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/signatures?page=${targetPage}&limit=${PAGE_SIZE}`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error()
        const data = (await res.json()) as SignaturesResponse
        if (id !== requestId.current) return // resposta desatualizada
        setItems((prev) =>
          append
            ? [...prev, ...data.items.filter((n) => !prev.some((p) => p.name === n.name && p.createdAt === n.createdAt))]
            : data.items
        )
        setTotalPages(data.totalPages)
        setPage(data.page)
      } catch {
        if (id === requestId.current)
          setError("Não foi possível carregar o mural. Tente novamente.")
      } finally {
        if (id === requestId.current) {
          setLoading(false)
          setLoadingMore(false)
        }
      }
    },
    []
  )

  useEffect(() => {
    fetchPage(1, false)
  }, [fetchPage])

  // Quando alguém assina, recarrega a primeira página
  useEffect(() => {
    const onSign = () => fetchPage(1, false)
    window.addEventListener("sp:signature-added", onSign)
    return () => window.removeEventListener("sp:signature-added", onSign)
  }, [fetchPage])

  const topCities = stats?.topCities ?? []

  return (
    <section id="assinaturas" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Mural de assinaturas
            </p>
            <h2 className="font-head text-4xl leading-none text-white sm:text-5xl md:text-6xl">
              O POVO ESTÁ <span className="text-red-500">FALANDO</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card px-5 py-3.5">
            <span className="live-dot size-2.5 rounded-full bg-red-500" aria-hidden />
            <p className="text-sm text-zinc-400">
              <span className="font-head text-3xl text-white">
                {formatNumber(stats?.total ?? 0)}
              </span>{" "}
              assinaturas até agora
            </p>
          </div>
        </div>

        {/* Faixa animada das cidades mais ativas */}
        {topCities.length > 0 && (
          <div className="mb-10 overflow-hidden rounded-full border border-white/10 bg-card py-2.5">
            <div className="flex w-max animate-marquee gap-10 pl-6">
              {[...topCities, ...topCities].map((c, i) => (
                <span
                  key={`${c.city}-${i}`}
                  className="flex items-center gap-2 whitespace-nowrap text-sm text-zinc-400"
                >
                  <MapPin className="size-3.5 text-red-500" aria-hidden />
                  <span className="font-semibold text-zinc-200">{c.city}</span>
                  <span className="text-zinc-500">
                    {c.uf} · {formatNumber(c.count)} assinaturas
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-card p-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-11 rounded-full" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-3/5" />
                    <Skeleton className="h-3 w-2/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
            <p className="text-sm text-red-300">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-white/15 bg-white/5 hover:bg-white/10 hover:text-white"
              onClick={() => fetchPage(1, false)}
            >
              <RefreshCw className="size-4" aria-hidden />
              Tentar novamente
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => (
                <article
                  key={`${s.name}-${s.createdAt}-${i}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card p-5 transition-colors hover:border-red-500/30"
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColor(s.name + s.city)}`}
                    aria-hidden
                  >
                    {initials(s.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{s.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                      <MapPin className="size-3 shrink-0 text-red-500/70" aria-hidden />
                      {s.city} — {s.uf} · <span>{timeAgo(s.createdAt)}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {page < totalPages ? (
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  disabled={loadingMore}
                  onClick={() => fetchPage(page + 1, true)}
                  className="border-white/15 bg-white/5 px-8 font-semibold hover:bg-white/10 hover:text-white"
                >
                  {loadingMore ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Plus className="size-4" aria-hidden />
                  )}
                  {loadingMore ? "Carregando..." : "Carregar mais assinaturas"}
                </Button>
                <p className="mt-3 text-xs text-zinc-600">
                  Mostrando {items.length} de {formatNumber(stats?.total ?? items.length)} assinaturas públicas
                </p>
              </div>
            ) : (
              <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-zinc-600">
                <Users className="size-3.5" aria-hidden />
                Você viu todas as assinaturas recentes — a próxima pode ser a sua.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
