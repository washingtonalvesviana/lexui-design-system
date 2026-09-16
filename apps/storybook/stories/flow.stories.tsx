import type { Meta, StoryObj } from "@storybook/react-vite"
import { BackgroundVariant, Flow, FlowBackground, FlowControls, FlowMiniMap, MarkerType, flowNodeTypes } from "@lexui/flow"
import type { Edge, Node } from "@lexui/flow"

const meta = { title: "Estrutura/Flow", parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const nodes: Node[] = [
  { id: "distribuicao", type: "lex", position: { x: 0, y: 100 }, data: { title: "Distribuição", description: "Vara cível · 3ª", tone: "primary" } },
  { id: "citacao", type: "lex", position: { x: 240, y: 100 }, data: { title: "Citação", meta: "Prazo 15 dias" } },
  { id: "audiencia", type: "lex", position: { x: 480, y: 0 }, data: { title: "Conciliação", description: "Ana Lima", tone: "accent" } },
  { id: "acordo", type: "lex", position: { x: 740, y: -80 }, data: { title: "Acordo", meta: "Homologado", tone: "success" } },
  { id: "instrucao", type: "lex", position: { x: 740, y: 120 }, data: { title: "Instrução", description: "Provas", tone: "warning" } },
  { id: "sentenca", type: "lex", position: { x: 1000, y: 40 }, data: { title: "Sentença", tone: "danger" } },
]

const link = (source: string, target: string, label?: string): Edge => ({ id: `${source}-${target}`, source, target, label, markerEnd: { type: MarkerType.ArrowClosed } })

const edges: Edge[] = [
  link("distribuicao", "citacao"),
  link("citacao", "audiencia"),
  link("audiencia", "acordo", "acordo"),
  link("audiencia", "instrucao", "sem acordo"),
  link("instrucao", "sentenca"),
]

export const Processo: Story = {
  render: () => (
    <div style={{ height: "30rem" }}>
      <Flow nodes={nodes} edges={edges} nodeTypes={flowNodeTypes} aria-label="Fluxo do processo">
        <FlowBackground />
        <FlowControls />
        <FlowMiniMap />
      </Flow>
    </div>
  ),
}

export const Vinculado: Story = {
  render: () => (
    <div style={{ height: "22rem", maxWidth: "32rem" }}>
      <Flow nodes={nodes.slice(0, 3)} edges={edges.slice(0, 2)} nodeTypes={flowNodeTypes} aria-label="Fluxo linear">
        <FlowBackground variant={BackgroundVariant.Lines} />
        <FlowControls position="top-right" />
      </Flow>
    </div>
  ),
}
