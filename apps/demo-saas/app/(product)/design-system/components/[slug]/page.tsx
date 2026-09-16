import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CircleCheck, Copy, ExternalLink } from "lucide-react"
import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Card, CardContent, Heading, Lead, Text } from "@lexui/react"
import { ComponentExample } from "../../../../../components/design-system/component-example"
import { catalogComponents, getCatalogComponent } from "../../../../../components/design-system/catalog-data"

export function generateStaticParams() {
  return catalogComponents.map((component) => ({ slug: component.slug }))
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getCatalogComponent(slug)
  if (!component) notFound()
  const currentIndex = catalogComponents.findIndex((item) => item.slug === slug)
  const previous = currentIndex > 0 ? catalogComponents[currentIndex - 1] : null
  const next = currentIndex < catalogComponents.length - 1 ? catalogComponents[currentIndex + 1] : null

  return <div className="demo-component-doc">
    <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/design-system">Design System</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="/design-system/components">Componentes</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{component.name}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
    <header className="demo-component-doc__header"><div><div className="demo-component-doc__meta"><Badge>{component.category}</Badge>{component.interactive && <Badge variant="success">Exemplo interativo</Badge>}</div><Heading level={1} size="2xl">{component.name}</Heading><Lead>{component.description}</Lead></div><Link href="http://127.0.0.1:6006" target="_blank" className="lex-button" data-variant="outline" data-size="sm">Abrir Storybook <ExternalLink size={16} /></Link></header>
    <div className="demo-component-doc__layout"><main id="component-preview" className="demo-component-doc__main"><ComponentExample slug={component.slug} /><section className="demo-code-section"><div className="demo-example-frame__header"><div><Heading level={2} size="md">Importação</Heading><Text size="sm" tone="muted">Use somente a API pública do LexUI.</Text></div><Copy size={17} aria-hidden="true" /></div><pre><code>{component.usage}</code></pre></section></main><aside className="demo-component-guidance"><Card><CardContent><Heading level={2} size="md">Regras de uso</Heading><ul><li><CircleCheck size={16} /> Reutilize esta API antes de criar uma alternativa local.</li><li><CircleCheck size={16} /> Preserve labels, foco, teclado e estados semânticos.</li><li><CircleCheck size={16} /> Use somente tokens globais para aparência e layout.</li><li><CircleCheck size={16} /> Teste nos temas claro e escuro e em telas menores.</li></ul></CardContent></Card><Card><CardContent><Heading level={2} size="md">Navegação rápida</Heading><div className="demo-component-mini-list">{catalogComponents.filter((item) => item.category === component.category).map((item) => <Link key={item.slug} href={`/design-system/components/${item.slug}`} data-active={item.slug === component.slug || undefined}>{item.name}</Link>)}</div></CardContent></Card></aside></div>
    <nav className="demo-component-doc__pager" aria-label="Componentes anterior e próximo">{previous ? <Link href={`/design-system/components/${previous.slug}`}><ArrowLeft size={17} /><span><small>Anterior</small><strong>{previous.name}</strong></span></Link> : <span />}{next && <Link href={`/design-system/components/${next.slug}`}><span><small>Próximo</small><strong>{next.name}</strong></span><ArrowRight size={17} /></Link>}</nav>
  </div>
}
