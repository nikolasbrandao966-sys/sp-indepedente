import { Scale, Coins, Flag, Handshake } from "lucide-react"

const PILLARS = [
  {
    icon: Coins,
    title: "Autonomia Fiscal",
    text: "Cada real arrecadado em solo paulista deve voltar para quem o gerou. Chega de bancar um Estado nacional inchado enquanto hospitais, escolas e estradas de São Paulo esperam na fila.",
  },
  {
    icon: Scale,
    title: "Soberania Democrática",
    text: "Queremos o direito de plebiscito. Se a maioria dos paulistas decidir pela independência, nenhuma elite política terá autoridade moral para negar a voz das urnas.",
  },
  {
    icon: Flag,
    title: "Identidade e Herança",
    text: "A coragem bandeirante que abriu o sertão e o sacrifício dos heróis de 1932 correm em nosso sangue. Não somos um estado qualquer: somos uma nação em potencial.",
  },
  {
    icon: Handshake,
    title: "Um Novo País, uma Nova Parceria",
    text: "São Paulo independente não vira as costas ao Brasil. Ao contrário: nasce como nação irmã, próspera e parceira, livre para construir relações de verdadeiro interesse mútuo.",
  },
]

const TIMELINE = [
  {
    year: "1932",
    title: "Revolução Constitucionalista",
    text: "São Paulo se ergue contra a ditadura Vargas e luta por uma Constituição. Cerca de 20 mil paulistas tombam pela liberdade em 87 dias.",
  },
  {
    year: "2022",
    title: "O debate toma as ruas",
    text: "Inconformadas com o desequilíbrio fiscal e o centralismo de Brasília, milhões de paulistas começam a perguntar: por que continuar pagando a conta?",
  },
  {
    year: "Agora",
    title: "A assinatura que faltava era a sua",
    text: "Este manifesto é a etapa inicial de um caminho longo e democrático. Cada assinatura é um recado: o povo paulista quer discutir o próprio futuro.",
  },
]

export function ManifestoSection() {
  return (
    <section id="manifesto" className="relative scroll-mt-24 border-t border-white/5 bg-[#0d0d10] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            O manifesto
          </p>
          <h2 className="font-head text-4xl leading-none text-white sm:text-5xl md:text-6xl">
            A VOZ DE
            <br />
            <span className="text-red-500">44 MILHÕES DE PAULISTAS</span>
          </h2>
        </div>

        {/* Citação de abertura */}
        <blockquote className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-card p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 font-head text-[16rem] leading-none text-white/[0.04] select-none"
          >
            1932
          </div>
          <p className="relative text-2xl font-semibold leading-snug text-white sm:text-3xl">
            “Em 1932, São Paulo se levantou por uma Constituição. Quase um
            século depois, se levanta por algo ainda maior:{" "}
            <span className="text-red-500">o direito de escrever a própria história.</span>”
          </p>
          <footer className="mt-6 flex items-center gap-3">
            <div className="h-[3px] w-12 paulista-stripe rounded-full" aria-hidden />
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
              Manifesto do Movimento São Paulo Independente
            </p>
          </footer>
        </blockquote>

        {/* Texto do manifesto */}
        <div className="mb-16 grid gap-6 text-base leading-relaxed text-zinc-400 sm:text-lg md:grid-cols-2">
          <div className="space-y-5">
            <p>
              Nós, paulistas, aceitamos com orgulho o papel de motor do Brasil.
              Erguemos aqui a indústria que transformou o país, as universidades
              que formam suas elites, a cultura que exporta talento ao mundo.
              Mas há um limite para tudo — inclusive para a paciência de quem
              paga a conta e é tratado como caixa-postal.
            </p>
            <p>
              São Paulo entrega ao governo federal uma fração desproporcional
              de sua arrecadação e recebe de volta investimentos que não
              refletem sua contribuição. Enquanto isso, paulistas enfrentam
              filas em hospitais, rodovias esburacadas e a mesma insegurança
              que o Estado nacional promete resolver — e nunca resolve.
            </p>
          </div>
          <div className="space-y-5">
            <p>
              Não defendemos o rancor. Defendemos o direito de escolha. Escócia,
              Catalunha, Quebec: o mundo moderno convive com movimentos de
              autodeterminação maduros, civis e democráticos. Queremos o mesmo
              para São Paulo — um plebiscito legítimo, com debate aberto e
              decisão nas urnas.
            </p>
            <p>
              Este manifesto é o primeiro passo: uma demonstração de força
              pacífica que mostre a Brasília, ao Brasil e ao mundo que os
              paulistas querem discutir seu destino.{" "}
              <span className="font-semibold text-white">
                Assine. O futuro de São Paulo se escreve com a sua assinatura.
              </span>
            </p>
          </div>
        </div>

        {/* Pilares */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="group flex gap-5 rounded-2xl border border-white/10 bg-background/60 p-6 transition-all duration-300 hover:border-red-500/40"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
                <p.icon className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Linha do tempo */}
        <div className="grid gap-8 md:grid-cols-3">
          {TIMELINE.map((t, i) => (
            <div key={t.year} className="relative">
              <div className="mb-4 flex items-center gap-4">
                <p className="font-head text-5xl leading-none text-red-500">{t.year}</p>
                {i < TIMELINE.length - 1 && (
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-red-500/50 to-white/5 md:block" aria-hidden />
                )}
              </div>
              <h3 className="text-base font-bold text-white">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
