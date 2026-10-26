import { Landmark, Users, Globe2, Map } from "lucide-react"

const STATS = [
  {
    icon: Landmark,
    value: "≈ 31%",
    label: "do PIB brasileiro",
    desc: "São Paulo sozinha produz quase um terço de toda a riqueza do país — mais que qualquer outro estado por ampla margem.",
    source: "IBGE, Contas Regionais",
  },
  {
    icon: Users,
    value: "44,4 mi",
    label: "de paulistas",
    desc: "Quase 1 em cada 5 brasileiros vive em São Paulo. Uma população maior que a da Argentina inteira.",
    source: "IBGE, Censo 2022",
  },
  {
    icon: Globe2,
    value: "US$ 700 bi",
    label: "de economia (est.)",
    desc: "Se fosse um país, São Paulo teria uma das maiores economias da América do Sul — à frente de nações como Argentina e Colômbia.",
    source: "estimativa com base no PIB estadual",
  },
  {
    icon: Map,
    value: "645",
    label: "municípios",
    desc: "Do litoral ao pontal, uma rede de cidades que pesquisa, produz, planta, industrializa e exporta para o mundo.",
    source: "IBGE",
  },
]

export function NumbersSection() {
  return (
    <section id="numeros" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            Por que São Paulo?
          </p>
          <h2 className="font-head text-4xl leading-none text-white sm:text-5xl md:text-6xl">
            QUEM PRODUZ,
            <br />
            <span className="text-red-500">TEM DIREITO DE ESCOLHER</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Os números não mentem: São Paulo banca uma fatia desproporcional do
            Brasil e recebe de volta muito menos do que entrega. Autonomia não é
            ingratidão — é justiça fiscal e o direito de decidir o próprio
            destino.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <article
              key={s.label}
              className="group rounded-2xl border border-white/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_16px_48px_-16px_rgba(229,37,43,0.35)]"
            >
              <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-white/5 p-2.5 text-red-500 transition-colors group-hover:border-red-500/40 group-hover:bg-red-500/10">
                <s.icon className="size-6" aria-hidden />
              </div>
              <p className="font-head text-5xl leading-none text-white">{s.value}</p>
              <p className="mt-1.5 text-sm font-bold uppercase tracking-wider text-red-500">
                {s.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              <p className="mt-4 border-t border-white/5 pt-3 text-[11px] uppercase tracking-wider text-zinc-600">
                {s.source}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-zinc-600">
          * Valores aproximados, com base em dados públicos recentes (IBGE). O
          objetivo do movimento é o debate qualificado sobre a autonomia
          paulista — não a distorção de números.
        </p>
      </div>
    </section>
  )
}
