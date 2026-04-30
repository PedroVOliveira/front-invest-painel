# System Patterns

## Architecture
- **Next.js 16 App Router**: Uso intensivo de Server Components.
- **Server Actions**: Mutasões centralizadas em `/actions`.
- **Intercepting Routes**: View de detalhes usando `@modal`.
- **Services Layer**: Lógica de integração com `brapi.dev` isolada em `/services`.

## Component Architecture
Cada componente deve seguir o padrão de pasta isolada em `components/custom/{moduleName}/`:
- `[nome].tsx`: Implementação.
- `[nome].test.tsx`: Testes.
- `index.ts`: Barrel export.
- `type.ts`: Tipagens.

## State Management
- **Server State**: Gerenciado via SSR e Server Actions.
- **Efêmero/URL**: Persistência via Search Params e Cookies.
- **Real-time**: Atualizações de preço isoladas em componentes Client para evitar re-renders globais.

## Testing Strategy
- **Jest + RTL**: Foco em integração.
- **Data Factories**: Localizadas em `/test/factories/`.
- **MSW**: Mock de API externa em `/test/msw/`.

## Styling Patterns
- **Tailwind CSS v4**: Utilitários nativos.
- **Premium UI**: Blur effects, gradientes, glassmorphism.
