# São Paulo Independente 🏴

Site do **Movimento Separatista de São Paulo** — plataforma de coleta de
assinaturas pelo manifesto de um São Paulo Independente.

> Projeto de demonstração cívica. Conteúdo fictício com dados públicos (IBGE).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + **shadcn/ui**
- **Prisma ORM** + **SQLite**
- **framer-motion** (animações)
- Fontes: Bebas Neue + Archivo (Google Fonts)

## Como rodar

Requisitos: [Bun](https://bun.sh) (recomendado) **ou** Node.js 18+.

```bash
# 1. Instalar dependências
bun install          # ou: npm install

# 2. Gerar o client do Prisma
bun run db:generate  # ou: npx prisma generate

# 3. Iniciar o servidor de desenvolvimento
bun run dev          # ou: npm run dev
```

Abra **http://localhost:3000** no navegador.

> O banco SQLite (`db/custom.db`) já vem incluído com **287 assinaturas de
> demonstração** para o mural nascer populado.

## Resetar / regerar o banco

```bash
# Zera o banco e recria as tabelas
bun run db:push

# (Opcional) Regenerar as 287 assinaturas de demonstração
bun scripts/seed-signatures.ts
```

## Estrutura

```
src/
├── app/
│   ├── page.tsx                  # Página única (landing completa)
│   ├── layout.tsx                # Layout raiz + fontes + metadata
│   ├── globals.css               # Tema (paleta bandeira paulista 1932)
│   └── api/
│       ├── signatures/route.ts   # POST assinar / GET listar (paginado)
│       └── stats/route.ts        # GET estatísticas (total, cidades, 24h)
├── components/landing/           # Seções do site
│   ├── site-header.tsx           # Header sticky + menu mobile
│   ├── hero.tsx                  # Hero com contador ao vivo
│   ├── numbers-section.tsx       # Números do estado (PIB, população...)
│   ├── manifesto-section.tsx     # Manifesto, pilares e linha do tempo
│   ├── gallery-section.tsx       # Galeria de fotos de SP
│   ├── petition-section.tsx      # Formulário de assinatura
│   ├── signature-wall.tsx        # Mural de assinaturas (paginação)
│   ├── faq-section.tsx           # FAQ (accordion)
│   ├── final-cta.tsx             # CTA final
│   └── site-footer.tsx           # Footer com disclaimer
├── hooks/use-stats.ts            # Hook de estatísticas (polling + eventos)
└── lib/
    ├── db.ts                     # Cliente Prisma
    ├── site.ts                   # Constantes e utilitários
    └── images.ts                 # URLs das fotos

prisma/schema.prisma              # Model Signature
scripts/seed-signatures.ts        # Seed de assinaturas demo
db/custom.db                      # Banco SQLite (já populado)
```

## API

| Método | Rota                  | Descrição                                    |
|--------|-----------------------|----------------------------------------------|
| POST   | `/api/signatures`     | Registra assinatura (validação + anti-spam)  |
| GET    | `/api/signatures`     | Lista assinaturas públicas (`?page=&limit=`) |
| GET    | `/api/stats`          | Total, cidades top, últimas 24h, meta        |

Regras de negócio: um e-mail por assinatura (409 se duplicado), validação Zod,
rate-limit de 5 envios por IP por minuto, opção de assinatura anônima
(`isPublic: false` — nome oculto no mural).

## Personalização rápida

- **Meta de assinaturas**: `SIGNATURE_GOAL` em `src/lib/site.ts` (também
  retornada por `/api/stats`).
- **Textos do manifesto/FAQ**: componentes em `src/components/landing/`.
- **Fotos**: URLs em `src/lib/images.ts`.
- **Paleta**: variáveis CSS em `src/app/globals.css` (tema preto/vermelho da
  bandeira paulista de 1932).

## Observações

- As fotos são hospedadas em CDN com URLs estáveis (buscadas na web pública).
- As 287 assinaturas inclusas são **fictícias** (geradas por seed) — zere o
  banco antes de usar em produção real.
- Para build de produção: `bun run build && bun run start`.
