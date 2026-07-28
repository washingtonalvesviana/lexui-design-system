# Instruções para IA

- Procure uma referência antes de criar uma interface.
- Use somente `@lexui/react` e `@lexui/charts`.
- Não recrie componentes existentes nem importe Base UI diretamente. Use DataTable para listas operacionais, Sidebar para navegação principal e CommandPalette apenas como atalho complementar.
- Não use cores, sombras ou espaçamentos literais.
- Preserve temas claro/escuro, acessibilidade e responsividade.
- Consulte a rota `/design-system` para categorias e patterns e o Storybook para APIs e estados isolados.
- Execute `npx @lexui/cli info --json` antes de implementar, pesquise com `lexui search` e inspecione APIs com `lexui view`.
- Quando disponível, invoque a Skill `$lexui` instalada em `.agents/skills/lexui`.
- Execute `npm run lexui:check` antes de concluir.
