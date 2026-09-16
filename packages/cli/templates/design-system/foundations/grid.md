# Grid

O LexUI tem sistema de layout próprio baseado em CSS Grid, mobile-first e guiado exclusivamente por tokens.

## API

- `<Container>` limita a largura a `--lex-content-max` e centraliza; `<Container fluid>` ocupa 100% da largura.
- `<Row>` é uma grade de 12 trilhas com `gap: var(--lex-gutter)`.
- `<Col span={6} sm={4} md={3}>` ocupa as trilhas indicadas: base (mobile), `sm` (≥ 641px) e `md` (≥ 1025px). Sem `span`, a coluna ocupa a linha inteira.

## Regras

- Mobile-first: sem `span`, tudo empilha em uma coluna no mobile.
- Gutter e largura máxima vêm de tokens (`--lex-gutter`, `--lex-content-max`); nunca defina larguras fixas em rem fora da escala.
- Prefira o grid para estrutura de página; use o `Sidebar` para navegação fixa e o `ResizablePanelGroup` para painéis ajustáveis.
- Breakpoints publicados: `--lex-bp-sm: 640px` e `--lex-bp-md: 1024px` (para uso em JS; o CSS declara os próprios limites).
