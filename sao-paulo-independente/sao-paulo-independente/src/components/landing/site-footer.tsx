import { FlagMark } from "@/components/landing/site-header"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0d0d10]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <FlagMark size={32} />
              <p className="font-head text-2xl tracking-wide text-white">
                SÃO PAULO INDEPENDENTE
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Movimento civil, pacífico e suprapartidário pela autodeterminação
              de São Paulo. Este site é uma plataforma de manifestação
              política e coleta de assinaturas — não possui vínculo com
              partidos, governos ou empresas.
            </p>
          </div>

          <nav aria-label="Links do rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                Movimento
              </p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#numeros" className="text-zinc-400 transition-colors hover:text-white">Números</a></li>
                <li><a href="#manifesto" className="text-zinc-400 transition-colors hover:text-white">Manifesto</a></li>
                <li><a href="#faq" className="text-zinc-400 transition-colors hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                Participe
              </p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#assinar" className="text-zinc-400 transition-colors hover:text-white">Assinar</a></li>
                <li><a href="#assinaturas" className="text-zinc-400 transition-colors hover:text-white">Mural de assinaturas</a></li>
                <li><a href="#galeria" className="text-zinc-400 transition-colors hover:text-white">Galeria</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                Compromissos
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>Manifestação pacífica</li>
                <li>Dados protegidos</li>
                <li>Suprapartidário</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {year} Movimento São Paulo Independente. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-2 text-xs text-zinc-600">
            <span className="inline-block h-[3px] w-8 paulista-stripe rounded-full" aria-hidden />
            Feito com orgulho entre a Paulista e o Ipiranga
          </p>
        </div>
      </div>
    </footer>
  )
}
