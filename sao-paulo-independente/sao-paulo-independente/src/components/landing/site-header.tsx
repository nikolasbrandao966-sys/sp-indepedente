"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_LINKS = [
  { href: "#numeros", label: "Números" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#galeria", label: "Galeria" },
  { href: "#assinaturas", label: "Mural" },
  { href: "#faq", label: "FAQ" },
]

/** Marca: mini bandeira paulista estilizada */
export function FlagMark({ size = 40 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="shrink-0 overflow-hidden rounded-[4px] border border-white/25 shadow-[0_2px_12px_rgba(229,37,43,0.35)]"
      style={{ width: size * 1.38, height: size }}
    >
      <div className="flex h-[52%] items-center justify-center bg-[#e5252b]">
        <span
          className="font-head leading-none text-white"
          style={{ fontSize: size * 0.36 }}
        >
          SP
        </span>
      </div>
      <div className="grid h-[48%] grid-rows-3">
        <div className="bg-zinc-100" />
        <div className="bg-zinc-950" />
        <div className="bg-zinc-100" />
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Faixa da bandeira paulista no topo */}
      <div className="h-[3px] w-full paulista-stripe" aria-hidden />

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Página inicial">
            <FlagMark />
            <div className="leading-tight">
              <p className="font-head text-xl tracking-wide text-white sm:text-2xl">
                SÃO PAULO INDEPENDENTE
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-red-500">
                Movimento Separatista
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="glow-red hidden font-semibold sm:inline-flex">
              <a href="#assinar">
                <PenLine className="size-4" aria-hidden />
                Assinar o Manifesto
              </a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Abrir menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 border-white/10 bg-[#101014] text-white"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <FlagMark size={26} />
                    <span className="font-head text-lg tracking-wide">SÃO PAULO INDEPENDENTE</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4" aria-label="Menu móvel">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {l.label}
                    </a>
                  ))}
                  <a
                    href="#assinar"
                    onClick={() => setOpen(false)}
                    className="mt-3 rounded-lg bg-primary px-4 py-3 text-center text-base font-bold text-white transition-transform active:scale-95"
                  >
                    Assinar o Manifesto
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
