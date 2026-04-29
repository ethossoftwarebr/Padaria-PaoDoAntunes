# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── padaria-antunes/    # Landing page Pão do Antunes (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Artifacts

### `artifacts/padaria-antunes` — Landing Page Pão do Antunes

Landing page para a padaria "Pão do Antunes", focada em geração de leads para convênios corporativos.

**Tecnologias**: React + Vite, Tailwind CSS v4, framer-motion, lucide-react
**Preview path**: `/` (raiz do projeto)

**Seções**:
1. **Navbar** — Logo + botão WhatsApp fixo, glassmorphism on scroll
2. **Hero** — Imagem de fundo da padaria gerada por IA com efeito parallax, título, CTA
3. **Como Funciona** — 4 passos do convênio com animação stagger
4. **Benefícios** — 6 cards com ícones e hover effects
5. **Banner de Estatísticas** — Contador animado (100+ empresas, etc.)
6. **Galeria de Produtos** — Grid masonry com 5 imagens geradas por IA (pães, salgados, café, doces, lanches)
7. **Avaliações** — 4 depoimentos de empresas parceiras (Itaú, Santander, Ferroeste, Uluru)
8. **CTA Final** — Fundo bordô com botão WhatsApp grande
9. **Footer** — Logo, links Instagram, Email, WhatsApp

**Assets**:
- `public/logo-antunes.png` — Logo branco da padaria
- `public/images/hero-bg.png` — Foto de fundo do hero (IA)
- `public/images/prod-bread.png` — Foto pães (IA)
- `public/images/prod-savory.png` — Foto salgados (IA)
- `public/images/prod-coffee.png` — Foto café (IA)
- `public/images/prod-sweets.png` — Foto doces (IA)
- `public/images/prod-sandwich.png` — Foto lanches (IA)

**Paleta de cores**:
- Primário: `#560000` (bordô escuro)
- Acento: `#cb9921` (dourado âmbar)
- Background: `#0a0505` (quase preto com tom quente)

**WhatsApp**: Link configurável em `WHATSAPP_URL` no topo do `Landing.tsx`
**Responsivo**: Mobile-first com menu hamburguer e layout adaptativo

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec + Orval codegen config.

### `scripts` (`@workspace/scripts`)

Utility scripts package.
