# Instruções para agentes de IA

1. Procure primeiro uma referência em `examples/index.json`.
2. Procure depois um pattern documentado.
3. Use somente a API pública de `@lexui/react`, `@lexui/charts` e `@lexui/flow`.
4. Não recrie Button, Input, Dialog, Card, Table, DataTable, Sidebar, CommandPalette, Chart ou qualquer componente existente.
5. Não use cores hexadecimais, RGB, OKLCH, sombras ou espaçamentos diretamente nas aplicações.
6. Não importe `@base-ui/react` nem `@xyflow/react` fora do pacote LexUI.
7. Preserve tema claro/escuro, teclado, foco, labels, contraste e layout mobile-first.
8. Para novos componentes, documente propósito, quando usar, quando não usar, estados, API, acessibilidade e exemplos.
9. Execute `npm run lexui:check` antes de concluir.
10. Para listas operacionais use DataTable; para navegação principal use Sidebar e mantenha CommandPalette apenas como atalho complementar.
11. Consulte `/design-system` para descobrir categorias e rotas; consulte o Storybook para estados isolados e APIs.
12. Para monitores em tempo real use `@lexui/flow` com arestas animadas e siga `patterns/live-activity.md`; para conversas use os primitivos `Chat`; para visualizações escolha um componente de `@lexui/charts` conforme `components/charts.md`.
13. Siga `foundations/iconography.md`: use Lucide de forma semântica, Avatar para pessoas e `aria-label` em toda ação somente com ícone.

14. Antes de implementar, execute `npx @lexui/cli info --json`, pesquise com `lexui search` e inspecione a API com `lexui view`.
15. Quando disponível, invoque a Skill `$lexui`; sua cópia instalável fica em `.agents/skills/lexui`.

Quando não houver componente adequado, registre a lacuna antes de criar uma solução local. Uma nova abstração deve entrar no LexUI, não ficar escondida em uma aplicação.
