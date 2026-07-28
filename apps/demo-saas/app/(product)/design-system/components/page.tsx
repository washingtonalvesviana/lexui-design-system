"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, BellRing, Blocks, ChartNoAxesCombined, FormInput, Layers, LayoutPanelTop, MousePointerClick, Search } from "lucide-react"
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Heading, Input, Lead, Text } from "@lexui/react"
import { catalogComponents, componentCategories } from "../../../../components/design-system/catalog-data"

export default function ComponentsIndexPage() {
  const [query, setQuery] = React.useState("")
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR")
  const filtered = React.useMemo(() => catalogComponents.filter((component) => !normalizedQuery || `${component.name} ${component.description} ${component.category}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery)), [normalizedQuery])

  return <>
    <header className="demo-page-header demo-components-header"><div><p className="demo-eyebrow">Biblioteca React</p><Heading level={1} size="2xl">Componentes</Heading><Lead>Explore os {catalogComponents.length} componentes públicos, abra exemplos reais e teste cada interação.</Lead></div><Badge variant="success">{catalogComponents.length} documentados</Badge></header>
    <label className="demo-component-search"><Search size={18} aria-hidden="true" /><span className="lex-sr-only">Buscar componentes</span><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, categoria ou finalidade…" /></label>
    <div className="demo-components-summary"><Text size="sm" tone="muted">{filtered.length} {filtered.length === 1 ? "componente encontrado" : "componentes encontrados"}</Text><Link href="/design-system" className="demo-inline-link">Visão geral do Design System</Link></div>
    {componentCategories.map((category) => {
      const components = filtered.filter((component) => component.category === category)
      if (!components.length) return null
      return <section className="demo-component-category" key={category}><div className="demo-section-heading"><div className="demo-category-heading"><span className="demo-entity-icon"><CategoryIcon category={category} /></span><div><Heading level={2} size="lg">{category}</Heading><Text size="sm" tone="muted">{components.length} {components.length === 1 ? "componente" : "componentes"}</Text></div></div></div><div className="demo-component-index-grid">{components.map((component) => <Link href={`/design-system/components/${component.slug}`} className="demo-component-index-link" key={component.slug}><Card><CardHeader><div className="demo-component-card-title"><span className="demo-component-title"><span className="demo-component-icon"><CategoryIcon category={component.category} /></span><CardTitle>{component.name}</CardTitle></span>{component.interactive && <Badge>Interativo</Badge>}</div><CardDescription>{component.description}</CardDescription></CardHeader><CardContent><span className="demo-component-open">Abrir documentação <ArrowRight size={16} /></span></CardContent></Card></Link>)}</div></section>
    })}
    {!filtered.length && <Card><CardContent className="demo-no-results"><Heading size="md">Nenhum componente encontrado</Heading><Text tone="muted">Tente buscar por “formulário”, “dados” ou “overlay”.</Text></CardContent></Card>}
  </>
}

function CategoryIcon({ category }: { category: string }) {
  const Icon = category === "Fundamentos" ? Blocks : category === "Entradas" ? FormInput : category === "Ações" ? MousePointerClick : category === "Feedback" ? BellRing : category === "Estrutura" ? LayoutPanelTop : category === "Dados" ? ChartNoAxesCombined : Layers
  return <Icon size={17} />
}
