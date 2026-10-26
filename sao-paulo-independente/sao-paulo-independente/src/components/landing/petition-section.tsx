"use client"

import { useMemo, useState } from "react"
import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Lock,
  PenLine,
  Share2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useStats } from "@/hooks/use-stats"
import { formatNumber } from "@/lib/site"

const UFS = [
  "SP", "RJ", "MG", "RS", "PR", "SC", "BA", "PE", "CE", "DF",
  "GO", "MT", "MS", "ES", "PA", "AM", "MA", "PB", "RN", "AL",
  "SE", "PI", "TO", "RO", "RR", "AP", "AC",
]

const WHY_SIGN = [
  {
    icon: TrendingUp,
    title: "Pressão real em Brasília",
    text: "Cada assinatura soma ao total que entregaremos ao Congresso Nacional como projeto de emenda popular pelo plebiscito.",
  },
  {
    icon: ShieldCheck,
    title: "Assinatura verificada",
    text: "Uma assinatura por e-mail, com contagem auditável. Seriedade é o que separa um movimento de um meme.",
  },
  {
    icon: Lock,
    title: "Seus dados protegidos",
    text: "Seu e-mail nunca aparece no mural. Se quiser, assine de forma anônima — só você saberá que assinou.",
  },
]

interface FormState {
  name: string
  email: string
  city: string
  uf: string
  isPublic: boolean
  agreed: boolean
}

const INITIAL: FormState = {
  name: "",
  email: "",
  city: "",
  uf: "SP",
  isPublic: true,
  agreed: false,
}

export function PetitionSection() {
  const { toast } = useToast()
  const { stats } = useStats()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<{ name: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const total = stats?.total ?? 0
  const goal = stats?.goal ?? 1000
  const pct = Math.min(100, Math.round((total / goal) * 100))

  const firstName = useMemo(
    () => (success?.name ?? "").split(" ")[0] || "Paulista",
    [success]
  )

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (form.name.trim().length < 3) e.name = "Informe seu nome completo."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "Informe um e-mail válido."
    if (form.city.trim().length < 2) e.city = "Informe sua cidade."
    if (!form.agreed) e.agreed = "Concorde com o manifesto para assinar."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate() || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          city: form.city.trim(),
          uf: form.uf,
          isPublic: form.isPublic,
          agreed: form.agreed,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSuccess({ name: form.name.trim() })
        window.dispatchEvent(new Event("sp:signature-added"))
        toast({
          title: "Assinatura registrada!",
          description: "Obrigado por defender o futuro de São Paulo.",
        })
      } else {
        toast({
          title: "Não foi possível assinar",
          description: data.error ?? "Verifique os dados e tente novamente.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Erro de conexão",
        description: "Verifique sua internet e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ title: "Não foi possível copiar o link." })
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    "Acabei de assinar o manifesto por um São Paulo Independente. Assine você também: "
  )}`

  return (
    <section id="assinar" className="relative scroll-mt-24 overflow-hidden border-t border-white/5 bg-[#0d0d10] py-20 sm:py-28">
      {/* brilho decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            Assine o manifesto
          </p>
          <h2 className="font-head text-4xl leading-none text-white sm:text-5xl md:text-6xl">
            FAÇA PARTE <span className="text-red-500">DA HISTÓRIA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            A assinatura que faltava era a sua. Leva menos de um minuto e é
            grátis — o custo de não fazer nada é muito maior.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Coluna esquerda: por que assinar + progresso */}
          <div className="min-w-0 space-y-4 lg:col-span-2">
            {WHY_SIGN.map((w) => (
              <article
                key={w.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-card p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <w.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{w.text}</p>
                </div>
              </article>
            ))}

            {/* Card de progresso */}
            <div className="rounded-2xl border border-white/10 bg-card p-5">
              <div className="mb-3 flex items-end justify-between">
                <p className="text-sm font-semibold text-zinc-300">
                  Meta da 1ª fase
                </p>
                <p className="text-sm text-zinc-500">
                  <span className="font-head text-2xl text-white">{formatNumber(total)}</span>
                  <span className="mx-1 text-zinc-600">/</span>
                  {formatNumber(goal)}
                </p>
              </div>
              <Progress value={pct} className="h-2.5 bg-white/5" />
              <p className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <span className="live-dot inline-block size-2 rounded-full bg-red-500" aria-hidden />
                {pct}% da meta · {stats ? `${formatNumber(stats.recentCount)} nas últimas 24h` : "atualizando..."}
              </p>
            </div>
          </div>

          {/* Coluna direita: formulário / sucesso */}
          <div className="min-w-0 lg:col-span-3">
            <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
              <div className="h-[3px] w-full paulista-stripe" aria-hidden />

              {success ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center p-8 text-center sm:p-12">
                  <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-500/10">
                    <CheckCircle2 className="size-11 text-red-500" aria-hidden />
                  </div>
                  <h3 className="font-head text-4xl leading-none text-white sm:text-5xl">
                    ASSINATURA REGISTRADA!
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
                    Bem-vindo à história, <span className="font-semibold text-white">{firstName}</span>.
                    Sua assinatura já está contando para a meta de São Paulo
                    Independente. Agora espalhe a chama:
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="glow-red font-semibold">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <Share2 className="size-4" aria-hidden />
                        Compartilhar no WhatsApp
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyLink}
                      className="border-white/15 bg-white/5 font-semibold hover:bg-white/10 hover:text-white"
                    >
                      {copied ? (
                        <Check className="size-4 text-green-500" aria-hidden />
                      ) : (
                        <Copy className="size-4" aria-hidden />
                      )}
                      {copied ? "Link copiado!" : "Copiar link do site"}
                    </Button>
                  </div>

                  <a
                    href="#assinaturas"
                    className="mt-6 text-sm font-medium text-red-400 underline-offset-4 hover:underline"
                  >
                    Ver meu nome no mural de assinaturas →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-10" noValidate>
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-red-500 text-white">
                      <PenLine className="size-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Assinar pela independência de São Paulo
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Campos marcados com <span className="text-red-500">*</span> são obrigatórios
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input
                        id="name"
                        autoComplete="name"
                        placeholder="Ex.: Ana Bandeirante de Souza"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        className="mt-1.5 h-12 border-white/10 bg-background/80 text-base"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@exemplo.com.br"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        className="mt-1.5 h-12 border-white/10 bg-background/80 text-base"
                      />
                      {errors.email ? (
                        <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                      ) : (
                        <p className="mt-1.5 text-xs text-zinc-600">
                          Usado apenas para garantir uma assinatura por pessoa. Nunca exibido.
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        autoComplete="address-level2"
                        placeholder="Ex.: Campinas"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        aria-invalid={!!errors.city}
                        className="mt-1.5 h-12 border-white/10 bg-background/80 text-base"
                      />
                      {errors.city && <p className="mt-1.5 text-xs text-red-400">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="uf">Estado</Label>
                      <Select value={form.uf} onValueChange={(v) => set("uf", v)}>
                        <SelectTrigger
                          id="uf"
                          className="mt-1.5 h-12 w-full border-white/10 bg-background/80 text-base"
                        >
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72 border-white/10 bg-popover">
                          {UFS.map((uf) => (
                            <SelectItem key={uf} value={uf}>
                              {uf}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4 rounded-2xl border border-white/5 bg-background/50 p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="isPublic"
                        checked={form.isPublic}
                        onCheckedChange={(v) => set("isPublic", v === true)}
                        className="mt-0.5 size-5 border-white/25 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                      />
                      <Label htmlFor="isPublic" className="cursor-pointer text-sm leading-relaxed font-normal text-zinc-300">
                        Exibir meu nome no <a href="#assinaturas" className="underline underline-offset-2">mural de assinaturas</a>{" "}
                        (desmarque para assinar anonimamente)
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreed"
                        checked={form.agreed}
                        onCheckedChange={(v) => set("agreed", v === true)}
                        aria-invalid={!!errors.agreed}
                        className="mt-0.5 size-5 border-white/25 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                      />
                      <Label htmlFor="agreed" className="cursor-pointer text-sm leading-relaxed font-normal text-zinc-300">
                        Declaro que li e concordo com o{" "}
                        <a href="#manifesto" className="underline underline-offset-2">
                          manifesto do movimento
                        </a>{" "}
                        e com o uso pacífico e democrático da minha assinatura. *
                      </Label>
                    </div>
                    {errors.agreed && <p className="text-xs text-red-400">{errors.agreed}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="glow-red mt-7 h-14 w-full text-base font-bold uppercase tracking-wider"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden />
                        Registrando...
                      </>
                    ) : (
                      <>
                        <PenLine className="size-5" aria-hidden />
                        Assinar pelo futuro de São Paulo
                      </>
                    )}
                  </Button>

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-600">
                    <Lock className="size-3" aria-hidden />
                    Conexão segura · Nenhum dado compartilhado com terceiros
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
