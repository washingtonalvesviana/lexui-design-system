import { Heading, Lead } from "@lexui/react"
import { ActivityMonitor } from "../../../components/activity-monitor"

export default function ActivityPage() {
  return <><header className="demo-page-header"><div><p className="demo-eyebrow">Pattern navegável</p><Heading level={1} size="2xl">Atividade ao vivo</Heading><Lead>Consultas, fontes e latência em tempo real, sobre o fluxo animado do LexUI.</Lead></div></header><ActivityMonitor /></>
}
