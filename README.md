# LexUI

Design system React reutilizável para aplicações Next.js e Vite. O workspace reúne tokens, componentes, gráficos, documentação navegável, Storybook, uma aplicação SaaS de referência e um CLI de adoção.

## Usar em uma aplicação

```bash
npm install @lexui/react @lexui/tokens @lexui/charts
npm install --save-dev @lexui/cli
npx lexui init
```

No ponto de entrada global:

```ts
import "@lexui/tokens/theme.css"
import "@lexui/react/styles.css"
import "@lexui/charts/styles.css"
```

```tsx
import { Button, Card, CardContent } from "@lexui/react"

export function Example() {
  return <Card><CardContent><Button>Continuar</Button></CardContent></Card>
}
```

O CLI cria `.design-system-lex-ui`, instala a Skill `$lexui` em `.agents/skills/lexui` e conecta as regras ao `AGENTS.md` do projeto. Essas pastas devem ser versionadas e lidas pela IA antes de alterar a interface.

```bash
npx lexui info --json
npx lexui search dashboard
npx lexui view data-table
npx lexui add data-table,dialog
npx lexui check
```

`search` e `view` descobrem componentes antes da implementação; `check` bloqueia imports diretos das primitivas, cores literais e espaçamentos arbitrários.

## Desenvolver o design system

```bash
pnpm install
pnpm storybook
pnpm demo
pnpm build
pnpm typecheck
pnpm test
pnpm lexui:check
```

## Pacotes

- `@lexui/tokens`: cores, temas, tipografia, densidade e responsividade.
- `@lexui/react`: componentes React públicos.
- `@lexui/charts`: primitivas acessíveis de visualização de dados.
- `@lexui/cli`: instalação das regras e da Skill, descoberta do registry e validação de projetos consumidores.

O comando `pnpm run pack` gera tarballs locais em `artifacts/npm`. O processo de publicação está documentado em `.design-system-lex-ui/release.md`. Leia `AGENTS.md` antes de alterar interfaces.
