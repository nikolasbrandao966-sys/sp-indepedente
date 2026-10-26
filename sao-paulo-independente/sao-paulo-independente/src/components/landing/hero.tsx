"use client"

import { motion } from "framer-motion"
import { ArrowDown, PenLine, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useStats } from "@/hooks/use-stats"
import { HERO_IMAGE } from "@/lib/images"
import { formatNumber } from "@/lib/site"

const MINI_STATS = [
  { value: "≈31%", label: "do PIB nacional" },
  { value: "44,4 mi", label: "de paulistas" },
  { value: "645", label: "municípios" },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export function Hero() {
  const { stats } = useStats()

  const total = stats?.total ?? 0
  const goal = stats?.goal ?? 1000
  const pct = Math.min(100, Math.round((total / goal) * 100))

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Foto de fundo */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full scale-105 object-cover"
          loading="eager"
        />
        {/* Camadas de escurecimento para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c]/55 to-[#0a0a0c]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-[#0a0a0c]/30 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur"
        >
          <span className="live-dot size-2 rounded-full bg-red-500" aria-hidden />
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-200 sm:text-xs">
            Movimento cívico · pacífico · suprapartidário
          </p>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="font-head text-[17vw] leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          SÃO PAULO
          <br />
          <span className="text-red-500">INDEPENDENTE</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
        >
          Produzimos riqueza, ciência e cultura para todo o Brasil — e pagamos
          a conta de um país que não funciona. Chegou a hora de discutir,
          nas urnas e nas ruas, o futuro de São Paulo{" "}
          <span className="font-semibold text-white">
            nas mãos dos paulistas.
          </span>
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button asChild size="lg" className="glow-red h-14 px-8 text-base font-bold uppercase tracking-wider">
            <a href="#assinar">
              <PenLine className="size-5" aria-hidden />
              Assinar o manifesto
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-14 border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/10 hover:text-white"
          >
            <a href="#manifesto">
              Conhecer o movimento
              <ChevronRight className="size-5" aria-hidden />
            </a>
          </Button>
        </motion.div>

        {/* Contador ao vivo */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="mt-12 max-w-md rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-md"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Assinaturas até agora
              </p>
              <p className="mt-1 font-head text-5xl leading-none text-white">
                {formatNumber(total)}
                <span className="ml-2 align-baseline font-body text-sm font-medium text-zinc-500">
                  / {formatNumber(goal)} na 1ª fase
                </span>
              </p>
            </div>
            <p className="whitespace-nowrap pb-1 text-right text-xs text-zinc-400">
              <span className="font-semibold text-red-400">
                {stats ? formatNumber(stats.recentCount) : "—"}
              </span>
              <br />
              em 24 horas
            </p>
          </div>
          <Progress value={pct} className="mt-4 h-2 bg-white/10" />
          <p className="mt-2.5 text-xs text-zinc-500">
            {pct}% da meta alcançada — atualiza a cada nova assinatura
          </p>
        </motion.div>

        {/* Mini estatísticas */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {MINI_STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <p className="font-head text-2xl text-white">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-zinc-500">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#numeros"
        aria-label="Rolar para os números"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative mx-auto mb-6 flex size-11 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:border-red-500/50 hover:text-red-400"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  )
}
