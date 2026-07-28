# Gráficos

Escolha o formato pela pergunta respondida:

- `BarChart`: comparação entre categorias.
- `HorizontalBarChart`: rankings e rótulos longos.
- `LineChart`: evolução temporal e tendência.
- `AreaChart`: evolução com ênfase em volume.
- `PieChart`: composição simples com poucas categorias.
- `DonutChart`: composição com total ou indicador central.
- `Sparkline`: tendência compacta dentro de métricas.

Sempre informe `label`, preserve a descrição textual gerada pelo componente e use `valueFormatter` para unidade e moeda. Use `tone` apenas quando a série possuir significado semântico; séries categóricas podem variar as cores automaticamente.

Todos os gráficos oferecem inspeção por hover, foco de teclado e clique/toque. Linha e área exibem crosshair; pizza e rosca destacam o segmento e atenuam os demais. Não remova os tooltips nem bloqueie os eventos dos pontos com uma camada sobre o gráfico.
