# Distribuição e releases

Os pacotes públicos são `@lexui/tokens`, `@lexui/react`, `@lexui/charts` e `@lexui/cli`. O workspace e as aplicações de demonstração permanecem privados.

## Checklist

1. Escolha uma versão SemVer única para os quatro pacotes.
2. Execute `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm typecheck`, `pnpm test` e `pnpm lexui:check`.
3. Execute `pnpm run pack` e instale os arquivos de `artifacts/npm` em uma aplicação React isolada.
4. Revise o conteúdo com `npm pack --dry-run` e registre as mudanças.
5. Publique na ordem: tokens, React, charts e CLI.

Os tarballs de `artifacts/npm` são **versionados no git** (o `.gitignore` bloqueia apenas `artifacts/.npm-cache`), de modo que qualquer projeto ou servidor instala a release sem registry privado. Ao publicar uma versão nova, rode `pnpm run pack` e commite os `.tgz` junto do bump.

Não publique automaticamente a partir de uma máquina local. O release oficial deve usar autenticação protegida, proveniência e aprovação no pipeline.

## Instalação em aplicações

```bash
npm install @lexui/react @lexui/tokens @lexui/charts
npm install --save-dev @lexui/cli
npx lexui init
```

Importe os estilos uma única vez no ponto de entrada da aplicação:

```ts
import "@lexui/tokens/theme.css"
import "@lexui/react/styles.css"
import "@lexui/charts/styles.css"
```
