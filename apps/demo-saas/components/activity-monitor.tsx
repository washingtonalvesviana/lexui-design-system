"use client"

import * as React from "react"
import { Activity, Database, FileText, Globe, HardDrive, Layers, Pause, Play, Search, Waypoints } from "lucide-react"
import {
  Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, Input, Progress, ScrollArea, Text, Toggle, ToggleGroup,
} from "@lexui/react"
import {
  Flow, FlowBackground, FlowControls, MarkerType, flowNodeTypes, useEdgesState, useNodesState,
} from "@lexui/flow"
import type { Edge, Node } from "@lexui/flow"

const sources = [
  { id: "postgres", title: "PostgreSQL", meta: "banco · 24 tabelas", icon: Database, kind: "Banco" },
  { id: "mysql", title: "MySQL", meta: "banco · 11 tabelas", icon: Database, kind: "Banco" },
  { id: "metadados", title: "Metadados", meta: "catálogo · 3 schemas", icon: Layers, kind: "Catálogo" },
  { id: "arquivos", title: "Arquivos", meta: "PDF e CSV", icon: FileText, kind: "Arquivos" },
  { id: "api", title: "API externa", meta: "convênio · 2 rotas", icon: Globe, kind: "Conectividade" },
  { id: "storage", title: "Arquivo frio", meta: "backup diário", icon: HardDrive, kind: "Arquivos" },
]

const operations = ["SELECT", "INSERT", "UPDATE"] as const
type Operation = (typeof operations)[number]

const callWindows: { operation: Operation; latency: number }[] = [
  { operation: "SELECT", latency: 380 },
  { operation: "SELECT", latency: 363 },
  { operation: "SELECT", latency: 418 },
  { operation: "SELECT", latency: 18 },
  { operation: "INSERT", latency: 44 },
  { operation: "UPDATE", latency: 27 },
  { operation: "SELECT", latency: 1276 },
  { operation: "SELECT", latency: 22 },
]

interface Call {
  id: number
  source: string
  operation: Operation
  latency: number
  at: string
}

function buildNodes(activeId: string | null): Node[] {
  const hub: Node = { id: "consultas", type: "lex", position: { x: 350, y: 190 }, data: { title: "Consultas", description: "camada de acesso", tone: "primary" } }
  const ring = sources.map((source, index) => {
    const angle = (Math.PI * 2 * index) / sources.length - Math.PI / 2
    return {
      id: source.id,
      type: "lex",
      position: { x: 350 + Math.round(Math.cos(angle) * 250), y: 190 + Math.round(Math.sin(angle) * 150) },
      data: { title: source.title, meta: source.meta, tone: source.kind === "Banco" ? "default" : "accent", activity: source.id === activeId ? "active" : "idle" },
    } satisfies Node
  })
  return [hub, ...ring]
}

function buildEdges(recentIds: string[]): Edge[] {
  return sources.map((source) => ({
    id: `${source.id}-consultas`,
    source: source.id,
    target: "consultas",
    animated: recentIds.includes(source.id),
    markerEnd: { type: MarkerType.ArrowClosed },
  }))
}

export function ActivityMonitor() {
  const [mounted, setMounted] = React.useState(false)
  const [running, setRunning] = React.useState(true)
  const [filter, setFilter] = React.useState<Operation | "todas">("todas")
  const [query, setQuery] = React.useState("")
  const [calls, setCalls] = React.useState<Call[]>([])
  const [active, setActive] = React.useState<string | null>(null)
  const [recent, setRecent] = React.useState<string[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(null))
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges([]))
  const sequence = React.useRef(0)

  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    if (!mounted || !running) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(null)
    }
    const timer = window.setInterval(() => {
      if (document.hidden) return
      const index = sequence.current % callWindows.length
      const source = sources[sequence.current % sources.length]
      const window_ = callWindows[index]
      sequence.current += 1
      setActive(source.id)
      setRecent((current) => [source.id, ...current.filter((id) => id !== source.id)].slice(0, 3))
      setCalls((current) => [{ id: sequence.current, source: source.id, operation: window_.operation, latency: window_.latency, at: new Date().toLocaleTimeString("pt-BR", { hour12: false }) }, ...current].slice(0, 40))
    }, 1200)
    return () => window.clearInterval(timer)
  }, [mounted, running])

  React.useEffect(() => {
    setNodes(buildNodes(active))
    setEdges(buildEdges(recent))
  }, [active, recent, setEdges, setNodes])

  const visible = calls.filter((call) => (filter === "todas" || call.operation === filter) && (query === "" || call.source.toLowerCase().includes(query.toLowerCase())))
  const perSecond = (calls.length / 60 * 4).toFixed(2)
  const slowest = calls.reduce((worst, call) => Math.max(worst, call.latency), 0)

  if (!mounted) return <Card><CardContent><Text size="sm" tone="muted">Preparando o monitor…</Text></CardContent></Card>

  return <div className="demo-monitor">
    <Card className="demo-monitor__panel">
      <CardHeader><CardTitle>Fontes</CardTitle><CardDescription>{sources.length} conectadas</CardDescription></CardHeader>
      <CardContent>
        <ul className="demo-monitor__sources">
          {sources.map((source) => {
            const Icon = source.icon
            return <li key={source.id} data-active={source.id === active || undefined}>
              <Icon size={16} aria-hidden="true" />
              <span>{source.title}</span>
              <Text as="span" size="xs" tone="muted">{source.kind}</Text>
            </li>
          })}
        </ul>
      </CardContent>
    </Card>

    <section className="demo-monitor__canvas" aria-label="Mapa de consultas em tempo real">
      <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={flowNodeTypes} nodesConnectable={false} aria-label="Consultas entre fontes e a camada de acesso">
        <FlowBackground />
        <FlowControls />
      </Flow>
    </section>

    <Card className="demo-monitor__panel">
      <CardHeader>
        <CardTitle>Chamadas em tempo real</CardTitle>
        <CardDescription>Janela de 60 segundos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="demo-monitor__metric">
          <span><Text as="span" size="sm" weight="semibold">{perSecond}</Text><Text as="span" size="xs" tone="muted"> req/s</Text></span>
          <Badge variant={active ? "success" : "primary"}>{active ? "Ao vivo" : "Pausado"}</Badge>
        </div>
        <Progress value={Math.min(100, Number(perSecond) * 12)} label="Volume de consultas" />
        <div className="demo-monitor__filters">
          <Field label="Buscar banco ou tabela" htmlFor="monitor-search">
            <Input id="monitor-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="postgres, metadados…" />
          </Field>
          <Field label="Operação" htmlFor="monitor-operation">
            <ToggleGroup defaultValue={["todas"]} onValueChange={(value) => setFilter((value[0] ?? "todas") as Operation | "todas")}>
              <Toggle value="todas">Todas</Toggle>
              <Toggle value="SELECT">SELECT</Toggle>
              <Toggle value="INSERT">INSERT</Toggle>
              <Toggle value="UPDATE">UPDATE</Toggle>
            </ToggleGroup>
          </Field>
        </div>
        <Button variant="outline" size="sm" onClick={() => setRunning((current) => !current)} aria-pressed={!running}>
          {running ? <><Pause size={16} aria-hidden="true" />Pausar</> : <><Play size={16} aria-hidden="true" />Retomar</>}
        </Button>
        <ScrollArea className="demo-monitor__feed">
          <ul role="log" aria-live="polite" aria-relevant="additions" aria-label="Chamadas recentes">
            {visible.length === 0 ? <li className="demo-monitor__empty"><Text size="sm" tone="muted">Nenhuma chamada no filtro atual.</Text></li> : null}
            {visible.map((call) => {
              const source = sources.find((item) => item.id === call.source)
              return <li key={call.id} className="demo-monitor__call">
                <time>{call.at}</time>
                <span className="demo-monitor__call-title"><Waypoints size={14} aria-hidden="true" />{source?.title ?? call.source}</span>
                <Badge variant="primary">{call.operation}</Badge>
                <Text as="span" size="xs" tone="muted">{call.latency} ms</Text>
                <Activity size={14} className={call.latency > 1000 ? "lex-utility-text-warning" : "lex-utility-text-primary"} aria-hidden="true" />
              </li>
            })}
          </ul>
        </ScrollArea>
        <Text size="xs" tone="muted">Latência máxima na janela: {slowest} ms · {calls.length} chamadas registradas</Text>
      </CardContent>
    </Card>
  </div>
}
