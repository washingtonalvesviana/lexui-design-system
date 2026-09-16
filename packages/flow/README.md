# @lexui/flow

Fluxos e diagramas do LexUI, embrulhando o [React Flow](https://reactflow.dev/) (`@xyflow/react`) com a aparência, os tokens e as regras do design system.

```tsx
import "@lexui/flow/styles.css"
import { Flow, FlowBackground, FlowControls, FlowMiniMap, flowNodeTypes, MarkerType } from "@lexui/flow"

const nodes = [
  { id: "1", type: "lex", position: { x: 0, y: 0 }, data: { title: "Distribuição", description: "Justiça gratuita", tone: "primary" } },
  { id: "2", type: "lex", position: { x: 260, y: 0 }, data: { title: "Contestação", meta: "Prazo 15 dias", tone: "warning" } },
]

const edges = [{ id: "1-2", source: "1", target: "2", markerEnd: { type: MarkerType.ArrowClosed } }]

export function ProcessFlow() {
  return <div style={{ height: "26rem" }}>
    <Flow nodes={nodes} edges={edges} nodeTypes={flowNodeTypes}>
      <FlowBackground />
      <FlowControls />
      <FlowMiniMap />
    </Flow>
  </div>
}
```

O contêiner precisa de altura: use `height` no `Flow` ou um pai dimensionado. A aplicação **não** importa `@xyflow/react` diretamente — `lexui:check` bloqueia esse import fora do pacote do design system.

Aparência vem dos tokens: nós, arestas, alças, controles, minimapa e padrão de fundo leem variáveis `--xy-*` apontando para tokens semânticos, então tema claro/escuro funcionam sem CSS local. As variáveis continuam expostas para ajuste fino pela aplicação.

## Atividade em tempo real

- Aresta com `animated: true` mostra o tracejado em movimento, indicando envio ou recebimento de dados. O traço e a duração vêm de tokens: `--lex-flow-edge-dash` e `--lex-flow-edge-duration` (padrão `--lex-duration-spin`).
- Nó com `data.activity = "active"` (via `FlowNodeData.activity`) recebe anel e pulso em `--lex-primary`, com o rótulo acessível "Em execução" — o estado não depende só da animação.
- Com `prefers-reduced-motion: reduce` as animações param: o tracejado permanece e o anel continua marcando o estado, sem movimento.
