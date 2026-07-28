"use client"

import * as React from "react"
import Link from "next/link"
import { Blocks, ExternalLink, Grid2X2, List, MousePointerClick } from "lucide-react"
import {
  Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, ContextMenu, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel, ContextMenuTrigger, Heading, Lead, ScrollArea, Text, Toggle, ToggleGroup,
  useToast,
} from "@lexui/react"
import { catalogComponents, componentCategories, type ComponentCategory } from "../../../components/design-system/catalog-data"

const descriptions: Record<ComponentCategory, string> = {
  Fundamentos: "Tema, tokens e conteúdo", Entradas: "Formulários e seleção", Ações: "Comandos e controles",
  Feedback: "Estados e comunicação", Estrutura: "Layout e navegação", Dados: "Listas, tabelas e visualização",
  Overlays: "Camadas e tarefas focadas",
}
const categories = componentCategories.map((name) => ({ name, description: descriptions[name], components: catalogComponents.filter((component) => component.category === name) }))
const patterns = [
  { label: "Autenticação completa", route: "/login", tags: ["Login", "MFA", "Senha"] },
  { label: "Dashboard", route: "/dashboard", tags: ["Métricas", "Gráficos"] },
  { label: "CRUD de usuários", route: "/users", tags: ["Lista", "Modal"] },
  { label: "Agenda", route: "/calendar", tags: ["Datas", "Overlays"] },
  { label: "Gestão de projetos", route: "/projects", tags: ["DataTable", "Filtros"] },
  { label: "Chat inteligente", route: "/chat", tags: ["Agentes", "Multimodal"] },
  { label: "Configurações", route: "/settings", tags: ["Controles", "Abas"] },
  { label: "Billing", route: "/billing", tags: ["Plano", "Faturas"] },
]

export default function DesignSystemPage() {
  const [view, setView] = React.useState<string[]>(["grid"])
  const toast = useToast()
  return <>
    <header className="demo-page-header demo-library-header"><div><p className="demo-eyebrow">Referência oficial</p><Heading level={1} size="2xl">Design System LexUI</Heading><Lead>Componentes, regras e patterns usados como fonte única por pessoas e agentes de IA.</Lead><Link href="/design-system/components" className="lex-button demo-library-cta" data-variant="primary" data-size="md"><Blocks size={17} /> Explorar todos os componentes</Link></div><div><Text size="xs" tone="muted">Visualização</Text><ToggleGroup value={view} onValueChange={(value) => value.length && setView(value)}><Toggle value="grid" variant="outline" aria-label="Exibir em grade"><Grid2X2 size={17} /></Toggle><Toggle value="list" variant="outline" aria-label="Exibir em lista"><List size={17} /></Toggle></ToggleGroup></div></header>
    <div className="demo-library-stats"><Card><CardContent><strong>{catalogComponents.length}</strong><span>componentes documentados</span></CardContent></Card><Card><CardContent><strong>14</strong><span>referências navegáveis</span></CardContent></Card><Card><CardContent><strong>2</strong><span>temas globais</span></CardContent></Card></div>
    <section><div className="demo-section-heading"><div><Heading level={2} size="lg">Catálogo por categoria</Heading><Text size="sm" tone="muted">Cada componente abaixo abre uma página com exemplos ao vivo.</Text></div><Badge variant="success">Cobertura principal concluída</Badge></div><div className="demo-library-categories" data-view={view[0]}>{categories.map((category) => <ContextMenu key={category.name}><ContextMenuTrigger><Card className="demo-library-card"><CardHeader><CardTitle>{category.name}</CardTitle><CardDescription>{category.description}</CardDescription></CardHeader><CardContent><ScrollArea className="demo-library-scroll"><div className="demo-component-tags">{category.components.map((component) => <Link className="demo-component-tag-link" href={`/design-system/components/${component.slug}`} key={component.slug}>{component.name}</Link>)}</div></ScrollArea></CardContent></Card></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>{category.name}</ContextMenuLabel><ContextMenuItem onClick={() => toast({ title: "Orientação", description: `Abra um componente de ${category.name} para testar sua API.`, variant: "success" })}><MousePointerClick size={15} /> Ver orientação</ContextMenuItem></ContextMenuContent></ContextMenu>)}</div></section>
    <section className="demo-pattern-section"><div className="demo-section-heading"><div><Heading level={2} size="lg">Patterns navegáveis</Heading><Text size="sm" tone="muted">Referências completas que devem ser consultadas antes de novas telas.</Text></div></div><div className="demo-pattern-list">{patterns.map((pattern) => <Link href={pattern.route} key={pattern.route} className="demo-pattern-link"><span className="demo-pattern-icon"><Blocks size={18} /></span><span><strong>{pattern.label}</strong><small>{pattern.route}</small></span><span className="demo-pattern-tags">{pattern.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</span><ExternalLink size={16} /></Link>)}</div></section>
  </>
}
