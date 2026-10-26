import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CTA_IMAGE } from "@/lib/images"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/5">
      {/* Fundo com foto */}
      <div className="absolute inset-0" aria-hidden>
        <img src={CTA_IMAGE} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#0a0a0c]/85" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="mx-auto mb-6 h-[3px] w-24 paulista-stripe rounded-full" aria-hidden />
        <h2 className="font-head text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl">
          EM 1932, ELES TOMBARAM.
          <br />
          <span className="text-red-500">HOJE, NÓS ASSINAMOS.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          A independência de São Paulo não nasce de um decreto — nasce de
          milhões de assinaturas que Brasília não conseguirá ignorar. Seja
          parte da maior mobilização cívica da história paulista.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="glow-red h-16 px-12 text-lg font-bold uppercase tracking-wider">
            <a href="#assinar">
              <PenLine className="size-6" aria-hidden />
              Assinar agora — é grátis
            </a>
          </Button>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-600">
          1 minuto · 1 assinatura · 1 futuro
        </p>
      </div>
    </section>
  )
}
