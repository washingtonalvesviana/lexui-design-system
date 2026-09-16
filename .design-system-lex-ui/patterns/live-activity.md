# Atividade ao vivo

Monitor de execução em tempo real sobre `@lexui/flow`: um grafo de fontes e destinos, arestas animadas marcando o tráfego e um painel de chamadas recentes. A referência navegável está em `/activity`.

## Composição

- `Flow` com `flowNodeTypes` para as fontes, o hub e os destinos; `FlowBackground` e `FlowControls` no canvas.
- Aresta com `animated: true` indica envio ou recebimento em curso; o nó que executa agora usa `data.activity = "active"`.
- Painel lateral com contador da janela, `Progress` do volume, busca por fonte e filtro por operação.
- Feed de chamadas em `ScrollArea` com `role="log"` e `aria-live="polite"`, cada linha com horário, origem, operação, latência e estado.

## Regras

- Duração e traço da animação vêm dos tokens `--lex-flow-edge-dash` e `--lex-flow-edge-duration`; nunca fixe `animation` ou `stroke-dasharray` na aplicação.
- Estado nunca depende só do movimento: o nó ativo também muda de borda e anel, e o rótulo acessível "Em execução" é anunciado.
- Com `prefers-reduced-motion: reduce` o tracejado permanece estático e o pulso para; os dados continuam atualizando o feed.
- Limite o histórico em memória (a referência guarda 40 chamadas) e atualize em intervalo, não a cada evento, para não travar a interface.
- Pause quando a aba estiver oculta (`document.hidden`) e ofereça controle explícito de pausar/retomar com `aria-pressed`.
- O canvas precisa de altura definida e rótulo acessível; mantenha fontes e feed navegáveis por teclado.
- Latência, volume e contagens usam `Text` e `Badge`; para séries use `@lexui/charts` em vez de desenhar números no grafo.

O demo simula as chamadas no frontend. Em produção, alimente `nodes`, `edges` e o feed com eventos reais da camada de aplicação, sem alterar os primitivos visuais.
