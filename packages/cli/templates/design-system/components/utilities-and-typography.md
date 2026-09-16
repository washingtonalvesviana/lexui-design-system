# Utilitários e tipografia

- `Typography`: Heading, Text, Lead, InlineCode, KeyboardKey e Blockquote formam a API oficial de conteúdo.
- `Text` e `Heading` expõem `weight` com as variantes da família variável: `light` (300), `regular` (400), `medium` (500), `semibold` (650), `bold` (750) e `black` (900). `Heading` é `bold` por padrão e `Text`, `regular`.
- `Text` e `Heading` expõem `italic`. O itálico é real: `@lexui/tokens` publica a face itálica do Inter self-hosted (OFL 1.1), com pesos de 100 a 900 — logo `weight="light" italic` é light itálico de verdade, não oblíquo sintetizado. Geist Mono não tem face itálica.
- Não ajuste `font-weight` por CSS na aplicação: use `weight` para manter a escala documentada.
- `Toggle`: estado binário acionável, como favorito ou visualização compacta.
- `ToggleGroup`: uma ou várias opções relacionadas em uma barra de ferramentas.
- `ContextMenu`: ações secundárias por clique direito ou toque prolongado. Toda ação importante também precisa estar disponível por interface visível.
- `ScrollArea`: regiões extensas que precisam de rolagem consistente sem assumir a rolagem da página.
- `ThemeProvider`/`useTheme`/`ThemeToggle`: gerenciam `light`, `dark` ou `system`, persistem a preferência (`lexui-theme`) e reagem a `prefers-color-scheme`. O `themePreloadScript` (export do `@lexui/react`) vai no `<head>` do layout raiz e aplica o tema antes da primeira pintura (sem flash).
- Densidade: `data-density="compact" | "comfortable"` no `<html>` reescala a altura dos controles (`--lex-control-*`).

Não estilize títulos diretamente na aplicação. Se a hierarquia necessária não existir, evolua a escala tipográfica e os tokens no LexUI.
