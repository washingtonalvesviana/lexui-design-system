# @lexui/cli

Instala, descobre e valida o LexUI em aplicações React ou Next.js.

```bash
npm install --save-dev @lexui/cli
npx lexui init
npx lexui info --json
npx lexui search "data visualization"
npx lexui view data-table
npx lexui add data-table,dialog
npx lexui docs chat
npx lexui check
npx lexui doctor
```

`init` cria `.design-system-lex-ui`, instala a Skill em `.agents/skills/lexui`, registra os scripts `lexui:check` e `lexui:doctor` e preserva instruções já existentes em `AGENTS.md`.

`info --json` entrega à IA o framework, tema, marca, pacotes, documentação e componentes selecionados. `search` e `view` evitam recriar primitives. `add` registra a seleção do projeto. `diff` detecta documentação desatualizada e `build` produz um snapshot portátil do registry.
