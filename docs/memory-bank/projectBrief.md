# Project Brief - Dashboard Gestão de Ativos

## Vision
Um painel administrativo de alta performance e interface premium para gestão de ativos financeiros, integrando dados em tempo real da API `brapi.dev`.

## Goals
- Proporcionar uma visualização clara e fluída de ativos financeiros.
- Garantir alta performance através de SSR (Next.js 16) e atualizações granulares no lado do cliente.
- Implementar uma arquitetura escalável e testável.

## Core Features
- Dashboard de Ativos com grid/tabela responsiva.
- Atualização de preços em tempo real (polling de 5s ou SSE).
- Sistema de favoritar ativos.
- Busca e filtros avançados persistidos via URL.
- Detalhes de ativos via rotas interceptadas (@modal).
