# Tokens

Todos os tokens vivem em `@lexui/tokens` (arquivo CSS único, camadas `lexui.tokens` e `lexui.base`). Os componentes e gráficos consomem apenas variáveis CSS — nenhuma aplicação usa cores hexadecimais, durações ou espaçamentos arbitrários.

## Identidade

- Azul oficial: `#46519E`.
- Laranja oficial: `#F45E41`.
- Base dark: `#1A1A1A`, nunca preto puro.

Componentes não consomem essas cores diretamente. Eles usam tokens semânticos como `--lex-primary`, `--lex-accent`, `--lex-background`, `--lex-surface-1`, `--lex-border`, `--lex-muted` e `--lex-danger`.

Azul representa ação principal, navegação ativa e foco. Laranja representa identidade e destaque. Verde, vermelho e amarelo permanecem reservados para sucesso, erro e aviso.

Os valores semânticos mudam entre os temas claro e escuro para preservar contraste. Não assuma que a mesma tonalidade funciona nos dois temas.

## Hierarquia em três níveis

1. **Marca**: `--lex-brand-blue` e `--lex-brand-orange` (e as rampas `--lex-blue-*`, `--lex-orange-*`, `--lex-neutral-*`). Alterar a marca atualiza automaticamente primary, hover, focus, accent e séries de gráfico.
2. **Semânticos**: `--lex-primary`, `--lex-surface-*`, `--lex-border`, `--lex-muted`, `--lex-success/warning/danger`, etc. Reatribuídos no bloco `[data-theme="dark"]`.
3. **Consumo**: componentes (`@lexui/react`) e gráficos (`@lexui/charts`) referenciam apenas o nível 2.

## Tipografia e fontes

- `--lex-font-sans`: Inter (variable, latin) — **self-hosted no pacote** (`@font-face` embutido em `theme.css`, OFL 1.1). Publica duas faces: normal e itálica (`inter-latin.woff2` e `inter-latin-italic.woff2`), ambas com pesos 100–900.
- `--lex-font-mono`: Geist Mono (variable, latin) — também self-hosted (OFL 1.1), somente face normal.
- Escala: `--lex-text-xs/sm/md/lg/xl/2xl` (a 2xl usa `clamp` fluido).
- Pesos documentados na API tipográfica: `light` 300, `regular` 400, `medium` 500, `semibold` 650, `bold` 750, `black` 900 (`weight` em `Text`/`Heading`; itálico via `italic`).
- Importar `@lexui/tokens/theme.css` no entry já ativa as fontes; nenhuma aplicação precisa hospedá-las.

## Tema

- Clássico claro/escuro via `data-theme="light" | "dark"` no `<html>`.
- `ThemeProvider` (`@lexui/react`) gerencia a preferência (`light`, `dark` ou `system`), persiste em `localStorage` (`lexui-theme`) e reage a `prefers-color-scheme`.
- `themePreloadScript` (export do `@lexui/react`) é o script inline para o `<head>` que aplica o tema **antes da primeira pintura** e elimina o flash. Use uma única vez, no layout raiz.
- `ThemeToggle` funciona dentro ou fora do provider; `useTheme()` exige provider.

## Movimento

- Durações: `--lex-duration-fast` (100ms), `--lex-duration-base` (150ms), `--lex-duration-slow` (180ms), `--lex-duration-slower` (240ms), `--lex-duration-entrance` (300ms), `--lex-duration-spin` (800ms), `--lex-duration-pulse` (1.6s).
- Easings: `--lex-ease-standard` e `--lex-ease-emphasized`.
- A layer base respeita `prefers-reduced-motion: reduce` desativando animações e transições.
- Componentes não definem duração inline; toda `transition`/`animation` consome esses tokens.

## Densidade

`data-density="compact" | "comfortable"` no `<html>` reescala os controles (`--lex-control-sm/md/lg`) sem afetar espaçamento de conteúdo. Padrão (sem atributo) é 2/2.5/3rem. Dispositivos de toque recebem altura aumentada automaticamente (`@media (pointer: coarse)`).

## Breakpoints

`--lex-bp-sm: 640px` e `--lex-bp-md: 1024px` são publicados para uso em JavaScript/TypeScript (componentes que precisam decidir estrutura). Media queries CSS não aceitam variáveis; o CSS dos componentes continua declarando os próprios limites.

## Grid e z-index

- `--lex-gutter`: espaçamento entre colunas e padding do Container (padrão `var(--lex-space-6)`).
- `--lex-content-max`: largura máxima do conteúdo (90rem).
- Escala de z-index semântica em ordem de empilhamento: `--lex-z-content` (100), `--lex-z-navbar` (1030), `--lex-z-dropdown` (1040), `--lex-z-backdrop` (1050), `--lex-z-modal` (1060), `--lex-z-popover` (1070), `--lex-z-tooltip` (1080), `--lex-z-toast` (1090). Componentes nunca usam número literal de z-index.

## Gráficos

- Paleta categórica de **10 séries**: `--lex-chart-1` … `--lex-chart-10`, com variante por tema.
- Tons semânticos: `--lex-chart-positive/negative/warning/neutral`.
- `CHART_SERIES_COUNT` (10) controla o ciclo de cores em `BarChart`, `HorizontalBarChart`, `PieChart` e `DonutChart`.

## Regras

- `pnpm lexui:check` bloqueia hex fora do pacote de tokens, imports diretos de primitivas e valores arbitrários de layout.
- Nova cor, fonte, duração ou espaçamento entra primeiro como token aqui; componente novo pode existir somente se consumir tokens.
