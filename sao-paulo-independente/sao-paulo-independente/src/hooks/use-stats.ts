"use client"

import { useCallback, useEffect, useState } from "react"
import { SIGNATURE_GOAL, StatsResponse } from "@/lib/site"

/**
 * Hook compartilhado de estatísticas da petição.
 * - Busca inicial + atualização a cada 30s
 * - Atualização imediata quando uma nova assinatura é registrada (evento global)
 */
export function useStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/stats", { cache: "no-store" })
      if (res.ok) {
        const data = (await res.json()) as StatsResponse
        setStats({ ...data, goal: data.goal || SIGNATURE_GOAL })
      }
    } catch {
      // silencioso: mantém últimos dados
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, 30_000)
    const onSign = () => refresh()
    window.addEventListener("sp:signature-added", onSign)
    return () => {
      clearInterval(interval)
      window.removeEventListener("sp:signature-added", onSign)
    }
  }, [refresh])

  return { stats, loading, refresh }
}
