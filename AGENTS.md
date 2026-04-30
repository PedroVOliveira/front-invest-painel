
# Dashboard Gestão de Ativos - Project Rules

Você é um desenvolvedor sênior cuidando deste projeto Next.js 16 (App Router). Siga estas regras rigorosamente para garantir uma arquitetura limpa, escalável e de altíssima performance.

## 🏗️ Tech Stack & Arquitetura
- **Next.js 16 (App Router)**: SSR (Server-Side Rendering) como abordagem primária. Use Server Components por padrão. `use client` apenas nas "folhas" da árvore onde interatividade é estritamente necessária (ex: modais, inputs de busca iterativos).
- **React 19**: Utilize os novos hooks como `useActionState`, `useFormStatus` e `startTransition`.
- **Server Actions**: As operações de mutação (ex: "Favoritar Ativo") devem ser realizadas via Server Actions em `/actions`.
- **Cookies & SSR State**: Persistência de filtros e estados efêmeros que afetam a visualização SSR devem usar Cookies e Search Params para manter a consistência e URL-sharability.
- **Intercepting Routes**: Utilize rotas interceptadas (ex: `@modal`) para a View de Detalhes, mantendo o contexto da lista por baixo.
- **Services API**: Lógica de integração com a API `brapi.dev` e formatação de dados de negócio centralizadas na pasta `/services`.

## 🎨 Styling & Design (High Performance & Premium UI)
- **Tailwind CSS v4**: Estilização via utilitários.
- **Shadcn UI**: Base de componentes UI em `components/ui`.
- **Custom Components**: Componentes de negócio (ex: `asset-card`, `asset-filters`, `detail-drawer`) ficam em `components/custom/`.
- **Aesthetics**: Interface "Premium". Use Glassmorphism, Blur effects (`backdrop-blur`), gradientes sofisticados e animações fluídas (60fps). Evite cores primárias puras sem tratamento.
- **Live Update Sem Re-render**: O preço atualizado a cada 5 segundos deve ser gerenciado por um componente Client isolado (ou via SSE) para que o restante do Grid/Tabela e layouts não sofra re-render.

## 🧪 Testing Strategy
- **Jest + React Testing Library**: Foco em testes de integração simulando comportamento de usuário (ex: Buscar -> Favoritar -> Visualizar Favoritos).
- **Test Factories**: SEMPRE utilize o padrão de Data Factories na pasta `/test/factories/` para gerar mocks de dados consistentes nos testes. Evite literais complexos espalhados.
- **MSW (Mock Service Worker)**: Interceptação das requisições REST da `brapi.dev` durante os testes em `/test/msw/`.

## 📁 Estrutura de Pastas Esperada
- `app/`: App Router, Pages, Layouts, e rotas interceptadas (`@modal`).
- `actions/`: Server Actions genéricas e de manipulação (ex: `asset-actions.ts`).
- `services/`: API client logic (Brapi requests).
- `components/ui/`: Shadcn UI primitivos.
- `components/custom/`: Componentes específicos de domínio. Cada componente DEVE ter sua própria pasta isolada seguindo o padrão estrutural:
  - `[nome-do-componente].tsx`: A implementação principal do componente.
  - `[nome-do-componente].test.tsx`: Os testes do componente.
  - `index.ts`: Arquivo de exportação (barrel file) para imports limpos.
  - `type.ts`: Tipagens e interfaces TypeScript do componente.
- `test/factories/`: Data generators para assets e usuários.
- `test/msw/`: Handlers do Mock Service Worker.
- `lib/` & `utils/`: Utilitários (ex: formatadores de moeda, parse de datas).

## 📝 Coding Standards
- **Concisa**: Não reescreva arquivos inteiros. Use `// ... rest of code` em diffs de contexto.
- **TypeScript**: Strict mode habilitado. NUNCA utilize `any`. Crie interfaces para a API da Brapi.
- **Commits**: Formato Conventional Commits (feat, fix, refactor, test, chore).
- **Error Handling**: Use `error.tsx` globais (Error Boundary) e trate chamadas à API adequadamente sem quebrar a UI. Use `Suspense` em `loading.tsx` para performance aparente (Skeleton Loading).
