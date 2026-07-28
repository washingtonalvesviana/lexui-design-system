# Regras obrigatórias do LexUI

Este repositório é a fonte canônica do Design System LexUI.

Quando a Skill estiver disponível, invoque `$lexui`. A fonte distribuível fica em `packages/cli/templates/skills/lexui/SKILL.md`.

Antes de criar ou modificar interfaces, leia:

- `.design-system-lex-ui/ai/instructions.md`
- `.design-system-lex-ui/foundations/tokens.md`
- `.design-system-lex-ui/foundations/responsive.md`
- `.design-system-lex-ui/components/catalog.md`
- `.design-system-lex-ui/examples/index.json`

## Regras de implementação

- Use componentes públicos de `@lexui/react` e `@lexui/charts`.
- Não replique um componente ou pattern já existente.
- Não use cores hexadecimais, espaçamentos arbitrários ou sombras diretamente em aplicações.
- Componentes devem consumir tokens semânticos, nunca cores de marca diretamente.
- Não importe primitivas Base UI em aplicações consumidoras.
- Toda nova API pública precisa de documentação, story e exemplo de estado vazio, carregando, erro e sucesso quando aplicável.
- Preserve acessibilidade, navegação por teclado, tema claro/escuro e responsividade.
- Execute `pnpm typecheck`, `pnpm build` e `pnpm lexui:check` antes de concluir alterações.
