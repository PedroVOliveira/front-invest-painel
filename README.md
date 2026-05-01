# Invest Investimentos - Dashboard de Ativos

Uma plataforma premium de gestão e acompanhamento de ativos financeiros, construída com o que há de mais moderno no ecossistema Next.js.

🔗 **Link do Projeto:** [front-invest-painel.vercel.app](https://front-invest-painel.vercel.app/)

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js**: v24.15.0 (Use o comando `nvm use` para carregar a versão do arquivo `.nvmrc`)
- **Gerenciador de Pacotes**: pnpm (recomendado) ou npm/yarn
- **API Externa**: Chave de API da [Brapi.dev](https://brapi.dev/)

### Passo a Passo Detalhado

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/usuario/front-invest-painel.git
    cd front-invest-painel
    ```

2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

3.  **Configuração do Banco de Dados (Turso):**
    - Acesse o [Turso CLI](https://docs.turso.tech/cli) ou o dashboard web.
    - Crie um novo banco de dados: `turso db create invest-db`.
    - Obtenha a URL: `turso db show invest-db --url`.
    - Gere um token de acesso: `turso db tokens create invest-db`.
    - Adicione estes valores em `DATABASE_URL` e `DATABASE_AUTH_TOKEN` no seu `.env`.

4.  **Configuração de Autenticação (GitHub OAuth):**
    - Vá em **Settings > Developer Settings > OAuth Apps > New OAuth App** no seu GitHub.
    - **Homepage URL**: `http://localhost:3000`
    - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
    - Copie o **Client ID** e gere um **Client Secret**.
    - No seu `.env`, preencha `AUTH_GITHUB_ID` e `AUTH_GITHUB_SECRET`.
    - Gere uma string aleatória para `NEXTAUTH_SECRET` (pode usar `openssl rand -base64 32`).

5.  **Variáveis de Ambiente (.env):**
    Crie o arquivo `.env` com base no passo acima:
    ```env
    DATABASE_URL="libsql://your-db-url.turso.io"
    DATABASE_AUTH_TOKEN="your-auth-token"
    AUTH_GITHUB_ID="your-client-id"
    AUTH_GITHUB_SECRET="your-client-secret"
    NEXTAUTH_SECRET="your-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    BRAPI_API_KEY="your-api-key"
    ```

6.  **Sincronização do Prisma:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

7.  **Inicie o servidor:**
    ```bash
    pnpm dev
    ```

---

## 🧠 Decisões Técnicas

Para este projeto, optamos pela utilização do **Shadcn UI** em conjunto com **Tailwind CSS v4**. A escolha do Shadcn se justifica pela sua natureza modular e "desplugável", oferecendo componentes que são, em sua essência, baseados em primitivos *headless* (como o Base UI). Essa abordagem permitiu manter o controle total sobre o código-fonte dos componentes, facilitando a implementação de uma interface "Premium" com Glassmorphism e animações fluidas, totalmente alinhada às classes utilitárias do Tailwind. Além disso, a utilização do **Next.js 15 com Server Actions** eliminou a necessidade de uma camada complexa de gerenciamento de estado global, simplificando a arquitetura e otimizando a performance.

---

## 📈 Próximos Passos

Se tivéssemos mais uma semana de desenvolvimento, o foco seria em robustez e expansão global:

1.  **Novos Ativos (Cripto e Moedas)**: Expandir o suporte para criptomoedas (Bitcoin, Ethereum, etc.) e moedas estrangeiras (Dólar, Euro), permitindo o acompanhamento de cotações em tempo real e conversões diretas no dashboard.
2.  **Infraestrutura e CI/CD**: Implementar uma esteira de deploy dedicada utilizando **GitHub Actions**, com pipelines bem definidas que executam linting, testes unitários e de integração antes de cada deploy em produção.
3.  **Analytics & Charts Dashboard**: Criar uma visão exclusivamente dedicada a gráficos avançados, proporcionando uma análise técnica e visual profunda da evolução de todos os ativos da carteira.
4.  **Testes E2E com Playwright**: Implementar fluxos críticos de usuário para garantir a integridade entre as camadas de Frontend e API.
5.  **Internacionalização (i18n)**: Configurar o `next-intl` para suporte a PT-BR, EN e ES.

---

Desenvolvido por **Pedro Oliveira**.
