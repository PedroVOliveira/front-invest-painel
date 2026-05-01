# Product Context

## User Problems
- **Atraso na Informação**: Investidores precisam de dados atualizados sem re-renderizar a página inteira.
- **Complexidade de Interface**: Painéis financeiros costumam ser poluídos; buscamos uma estética "Premium" e limpa.
- **Perda de Contexto**: Navegar para detalhes de um ativo não deve fazer o usuário perder a posição na lista principal.

## User Experience Goals
- **Fluidez**: Transições suaves e feedback instantâneo (Skeleton Loaders).
- **Consistência**: Filtros que sobrevivem ao refresh da página (URL Search Params).
- **Engajamento**: Micro-animações e efeitos de blur que trazem um ar moderno e profissional.

## Key Workflows
1. **Monitoramento**: O usuário abre o dashboard e observa as variações de preço.
2. **Filtragem**: O usuário busca por ativos específicos ou categorias.
3. **Favoritar**: O usuário marca ativos para acompanhamento rápido (Server Action).
4. **Análise Detalhada**: O usuário clica em um ativo e vê detalhes em um modal/drawer sem sair da lista.
