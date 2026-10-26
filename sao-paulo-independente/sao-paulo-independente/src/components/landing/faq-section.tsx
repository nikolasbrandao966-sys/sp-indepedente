import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    q: "A separação de São Paulo é juridicamente possível?",
    a: "É um debate aberto — e é exatamente por isso que ele precisa acontecer. A Constituição de 1988 não prevê a secessão de estados, mas também nasceu de uma luta por direitos que um dia pareceu impossível. Nosso caminho é democrático: pressionar por uma emenda constitucional e um plebiscito, como acontece em processos de autodeterminação no mundo inteiro. Nenhuma mudança profunda na história começou como 'permitida'.",
  },
  {
    q: "Por que São Paulo sairia ganhando?",
    a: "Pelo mesmo motivo que uma pessoa sai ganhando quando para de pagar a conta de todos: sobra recurso para o que importa. São Paulo arrecada bilhões anualmente em impostos federais que não retornam em investimento proporcional. Com autonomia fiscal plena, o estado poderia dobrar investimentos em segurança, saúde, mobilidade e educação sem aumentar a carga sobre o paulista.",
  },
  {
    q: "E o resto do Brasil? Isso não é egoísmo?",
    a: "Não — é honestidade. Um Brasil que depende de São Paulo é um Brasil que nunca se desenvolveu de verdade. A independência obrigaria a união a repensar seu modelo, valorizando cada região por sua própria vocação. E São Paulo seguiria como parceira comercial, cultural e diplomática: fronteiras não apagam séculos de história compartilhada.",
  },
  {
    q: "Quem pode assinar o manifesto?",
    a: "Qualquer pessoa, de qualquer estado ou país, que concorde com os termos do manifesto. Nascidos em SP, radicados, paulistas de coração e simpatizantes da causa da autodeterminação dos povos são todos bem-vindos. Uma pessoa assina uma única vez, com e-mail válido — a seriedade da causa começa pela seriedade das assinaturas.",
  },
  {
    q: "Meus dados estão protegidos?",
    a: "Sim. Seu e-mail é usado apenas para validar a unicidade da assinatura e nunca será exibido, vendido ou compartilhado. Se preferir, você pode assinar de forma anônima: nesse caso, nem seu nome aparece no mural — apenas a cidade e a contagem. Você também pode entrar em contato para solicitar a remoção da sua assinatura a qualquer momento.",
  },
  {
    q: "O movimento é ligado a algum partido ou instituição?",
    a: "Não. Somos um movimento civil, pacífico, suprapartidário e sem fins lucrativos. Não recebemos dinheiro de partidos, empresas ou governos. Nossa única moeda é a assinatura de quem acredita na causa — e nossa única bandeira é a de 1932.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            Dúvidas frequentes
          </p>
          <h2 className="font-head text-4xl leading-none text-white sm:text-5xl">
            PERGUNTAS QUE TODO PAULISTA FAZ
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-white/10 [&:last-child]:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-zinc-100 hover:text-red-400 hover:no-underline [&[data-state=open]>svg]:text-red-500">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-zinc-400">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
