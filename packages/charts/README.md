# @lexui/charts

Gráficos React acessíveis do LexUI, com cores semânticas e descrição textual.

```tsx
import "@lexui/charts/styles.css"
import { BarChart, LineChart, AreaChart, PieChart, DonutChart } from "@lexui/charts"

<BarChart label="Receita mensal" data={[{ label: "Jan", value: 42 }]} />
```

Componentes disponíveis: `BarChart`, `HorizontalBarChart`, `LineChart`, `AreaChart`, `PieChart`, `DonutChart` e `Sparkline`. Todos recebem `label`, `data`, `tone` e `valueFormatter`; gráficos radiais também aceitam conteúdo central.

Hover, foco por teclado e clique/toque revelam o rótulo e o valor formatado. Gráficos cartesianos adicionam crosshair e gráficos radiais destacam o segmento ativo.
