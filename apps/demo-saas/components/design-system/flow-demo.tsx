"use client"

import * as React from "react"
import { Skeleton, Text } from "@lexui/react"
import {
  Flow,
  FlowBackground,
  FlowControls,
  FlowMiniMap,
  MarkerType,
  addEdge,
  flowNodeTypes,
  useEdgesState,
  useNodesState,
} from "@lexui/flow"
import type { Connection, Edge, Node } from "@lexui/flow"

const initialNodes: Node[] = [
  { id: "distribuicao", type: "lex", position: { x: 0, y: 120 }, data: { title: "Distribuição", description: "Vara cível · 3ª", tone: "primary" } },
  { id: "citacao", type: "lex", position: { x: 230, y: 120 }, data: { title: "Citação", meta: "Prazo 15 dias" } },
  { id: "audiencia", type: "lex", position: { x: 460, y: 20 }, data: { title: "Audiência de conciliação", description: "Ana Lima", tone: "accent" } },
  { id: "acordo", type: "lex", position: { x: 730, y: -60 }, data: { title: "Acordo", meta: "Homologado", tone: "success" } },
  { id: "instrucao", type: "lex", position: { x: 730, y: 130 }, data: { title: "Instrução", description: "Provas e testemunhas", tone: "warning", activity: "active" } },
  { id: "sentenca", type: "lex", position: { x: 990, y: 40 }, data: { title: "Sentença", description: "Publicação em 48h", tone: "danger" } },
]

const edge = (source: string, target: string, options: { label?: string; animated?: boolean } = {}): Edge => ({
  id: `${source}-${target}`,
  source,
  target,
  label: options.label,
  animated: options.animated,
  markerEnd: { type: MarkerType.ArrowClosed },
})

const initialEdges: Edge[] = [
  edge("distribuicao", "citacao"),
  edge("citacao", "audiencia"),
  edge("audiencia", "acordo", { label: "acordo" }),
  edge("audiencia", "instrucao", { label: "sem acordo", animated: true }),
  edge("instrucao", "sentenca", { animated: true }),
]

export function FlowDemo() {
  const [mounted, setMounted] = React.useState(false)
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = React.useCallback((connection: Connection) => setEdges((current) => addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, current)), [setEdges])

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="demo-flow-canvas"><Skeleton className="demo-flow-skeleton" /></div>

  return <>
    <div className="demo-flow-canvas">
      <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={flowNodeTypes} aria-label="Fluxo do processo">
        <FlowBackground />
        <FlowControls />
        <FlowMiniMap />
      </Flow>
    </div>
    <Text size="sm" tone="muted">Arraste os nós, role o canvas para navegar e use o teclado: cada nó é focável, e Tab percorre nós e arestas. Arestas com <code>animated</code> correm no sentido origem → destino e o nó com <code>activity: "active"</code> fica em execução.</Text>
  </>
}
