# Cores

A paleta vive em `@lexui/tokens` e é organizada em três níveis. Aplicações consomem apenas o nível 2 — tokens semânticos. A referência viva, com o valor resolvido de cada token nos dois temas ao lado do outro, está em `/design-system/components/palette`.

## Níveis

1. **Marca** (nível 1): `--lex-brand-blue`, `--lex-brand-orange` e as rampas `--lex-blue-*`, `--lex-orange-*`, `--lex-neutral-*`, mais as cores diretas `--lex-green-500`, `--lex-red-500` e `--lex-yellow-500`. As rampas são iguais nos dois temas.
2. **Semânticos** (nível 2): papéis de interface, reatribuídos no tema escuro. É o nível que componentes e gráficos usam.
3. **Consumo**: `@lexui/react` e `@lexui/charts` referenciam somente o nível 2.

## Famílias semânticas

| Família | Tokens | Uso |
| --- | --- | --- |
| Superfícies | `--lex-background`, `--lex-surface-1/2/3` | Fundo da aplicação, cards, campos e realce empilhado |
| Texto | `--lex-foreground`, `--lex-muted` | Texto principal e texto auxiliar/metadados |
| Ação e identidade | `--lex-primary`, `--lex-primary-hover`, `--lex-primary-foreground`, `--lex-accent`, `--lex-accent-fill`, `--lex-accent-foreground` | Azul representa ação principal, navegação ativa e foco; laranja representa identidade e destaque |
| Bordas e foco | `--lex-border`, `--lex-border-strong`, `--lex-focus` | Separação de camadas e anel de foco por teclado |
| Estados | `--lex-success`, `--lex-warning`, `--lex-danger` | Sucesso, atenção e erro/destruição; sempre com ícone e texto |
| Gráficos | `--lex-chart-1` … `--lex-chart-10`, `--lex-chart-positive/negative/warning/neutral` | Séries categóricas e tendências; `CHART_SERIES_COUNT` (10) controla o ciclo |

## Variação por tema

- O tema claro são os valores de `:root`; o escuro é declarado em `[data-theme="dark"]`. O mesmo token tem valores diferentes nos dois temas para preservar contraste — **nunca assuma que a tonalidade do tema claro serve no escuro**.
- O atributo é escopável em qualquer elemento (`:root, [data-theme="light"]` e `[data-theme="dark"]`), então um bloco pode ser renderizado no tema oposto: é assim que a página de paleta compara claro e escuro lado a lado e como previews embutidos devem declarar o próprio tema.
- Trocar a marca no nível 1 propaga automaticamente para `primary`, `hover`, `accent`, foco e séries de gráfico. Não redefina tokens semânticos na aplicação.

## Regras

- Nada de hexadecimal, `rgb()` ou nome de cor em aplicações: `pnpm lexui:check` bloqueia hex fora de `@lexui/tokens`.
- Tintas e estados translúcidos usam `color-mix(in srgb, var(--lex-token) X%, transparent)`, sempre com tokens.
- Contraste mínimo de 4.5:1 para texto e 3:1 para limites não textuais; estados nunca dependem só da cor (`Badge`, `Marker` e `Alert` combinam cor, ícone e texto).
- Cor de gráfico vem das séries, nunca de hex local; a série é estável por posição para não mudar de significado entre gráficos.
- Uma cor nova entra primeiro como token em `@lexui/tokens`, com documentação aqui e na página viva.
