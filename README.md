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

## Instalar em outro projeto ou servidor

Os tarballs de cada release ficam versionados em `artifacts/npm/` (versão atual **0.3.0**), então a instalação não depende de um registry privado. Instale os quatro pacotes no projeto consumidor, junto dos peers:

```bash
npm install react@19 react-dom@19
npm install \
  ./lexui/artifacts/npm/lexui-tokens-0.3.0.tgz \
  ./lexui/artifacts/npm/lexui-react-0.3.0.tgz \
  ./lexui/artifacts/npm/lexui-charts-0.3.0.tgz
npm install --save-dev ./lexui/artifacts/npm/lexui-cli-0.3.0.tgz
npx lexui init
```

O caminho pode ser local (como acima) ou direto do repositório, por URL:

```bash
npm install https://raw.githubusercontent.com/washingtonalvesviana/lexui-design-system/main/artifacts/npm/lexui-react-0.3.0.tgz
```

Para gerar os tarballs do zero a partir do código: `pnpm install && pnpm build && pnpm pack`. A instalação é autossuficiente: nenhum pacote `@lexui/*` depende dos outros em tempo de resolução, e a fonte Inter (normal e itálica) já vem embutida em `@lexui/tokens`.

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

O comando `pnpm run pack` gera os tarballs em `artifacts/npm` (versionados no git a cada release). O processo de publicação está documentado em `.design-system-lex-ui/release.md`. Leia `AGENTS.md` antes de alterar interfaces.
