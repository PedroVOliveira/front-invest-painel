# Tech Context

## Stack Tecnológica
- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Database/ORM**: Prisma + LibSQL (Turso)
- **Auth**: NextAuth / Auth.js
- **API Externa**: brapi.dev
- **Package Manager**: pnpm

## Development Tools
- **Testes**: Jest, React Testing Library, MSW
- **Linting/Formatting**: ESLint
- **Type Safety**: TypeScript (Strict Mode)

## Constraints & Rules
- **Performance**: NUNCA re-renderize a lista inteira para atualizações de preço individuais.
- **Typing**: NUNCA use `any`.
- **SSR First**: Priorize Server Components sempre.
