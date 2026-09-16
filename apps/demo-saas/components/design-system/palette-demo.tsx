"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Heading, Text } from "@lexui/react"

type Token = { name: string; use: string }

const families: { title: string; description: string; tokens: Token[] }[] = [
  {
    title: "Superfícies e fundo",
    description: "Do fundo da página às camadas de conteúdo empilhadas.",
    tokens: [
      { name: "--lex-background", use: "fundo da aplicação" },
      { name: "--lex-surface-1", use: "cards e painéis" },
      { name: "--lex-surface-2", use: "campos, itens e chips" },
      { name: "--lex-surface-3", use: "realce sobre superfície 2" },
    ],
  },
  {
    title: "Texto e ênfase",
    description: "Contraste de leitura; nunca dependa apenas da cor para comunicar estado.",
    tokens: [
      { name: "--lex-foreground", use: "texto principal" },
      { name: "--lex-muted", use: "texto auxiliar e metadados" },
    ],
  },
  {
    title: "Ação e identidade",
    description: "Azul é ação e navegação ativa; laranja é identidade e destaque.",
    tokens: [
      { name: "--lex-primary", use: "ação principal" },
      { name: "--lex-primary-hover", use: "estado hover" },
      { name: "--lex-primary-foreground", use: "texto sobre primary" },
      { name: "--lex-accent", use: "destaque e marca" },
      { name: "--lex-accent-fill", use: "preenchimento de destaque" },
      { name: "--lex-accent-foreground", use: "texto sobre accent" },
    ],
  },
  {
    title: "Bordas e foco",
    description: "Separação de camadas e anel de foco visível por teclado.",
    tokens: [
      { name: "--lex-border", use: "borda padrão" },
      { name: "--lex-border-strong", use: "borda de ênfase" },
      { name: "--lex-focus", use: "anel de foco" },
    ],
  },
  {
    title: "Estados",
    description: "Sempre acompanhados de ícone e texto, nunca só da cor.",
    tokens: [
      { name: "--lex-success", use: "sucesso" },
      { name: "--lex-warning", use: "atenção" },
      { name: "--lex-danger", use: "erro e destruição" },
    ],
  },
  {
    title: "Gráficos",
    description: "Paleta categórica de dez séries, com variantes semânticas.",
    tokens: [
      ...Array.from({ length: 10 }, (_, index) => ({ name: `--lex-chart-${index + 1}`, use: `série ${index + 1}` })),
      { name: "--lex-chart-positive", use: "tendência positiva" },
      { name: "--lex-chart-negative", use: "tendência negativa" },
      { name: "--lex-chart-warning", use: "atenção em gráfico" },
      { name: "--lex-chart-neutral", use: "série neutra" },
    ],
  },
]

const ramps: { label: string; steps: string[] }[] = [
  { label: "--lex-blue-*", steps: ["--lex-blue-300", "--lex-blue-400", "--lex-blue-500", "--lex-blue-600", "--lex-blue-700", "--lex-blue-800"] },
  { label: "--lex-orange-*", steps: ["--lex-orange-300", "--lex-orange-400", "--lex-orange-500", "--lex-orange-600", "--lex-orange-700"] },
  {
    label: "--lex-neutral-*",
    steps: ["--lex-neutral-0", "--lex-neutral-50", "--lex-neutral-100", "--lex-neutral-200", "--lex-neutral-300", "--lex-neutral-400", "--lex-neutral-500", "--lex-neutral-600", "--lex-neutral-700", "--lex-neutral-800", "--lex-neutral-900", "--lex-neutral-950"],
  },
]

const themes = ["light", "dark"] as const
type ThemeName = (typeof themes)[number]
type ResolvedValues = Record<string, Record<ThemeName, string>>

export function PaletteDemo() {
  const probes = React.useRef(new Map<string, HTMLElement>())
  const [values, setValues] = React.useState<ResolvedValues>({})

  React.useEffect(() => {
    const resolved: ResolvedValues = {}
    for (const [key, element] of probes.current) {
      const [token, theme] = key.split("|")
      const color = getComputedStyle(element).backgroundColor
      resolved[token] = { ...(resolved[token] ?? { light: "", dark: "" }), [theme as ThemeName]: formatColor(color) }
    }
    setValues(resolved)
  }, [])

  const registerProbe = (key: string) => (element: HTMLElement | null) => {
    if (element) probes.current.set(key, element)
    else probes.current.delete(key)
  }

  return <>
    <div className="demo-example-frame demo-palette-note">
      <div className="demo-example-frame__header"><div><Heading level={2} size="md">Variação por tema</Heading><Text size="sm" tone="muted">Cada token abaixo é exibido nos dois temas ao mesmo tempo, dentro de escopos <code>data-theme</code>. Os valores são lidos do CSS em tempo real.</Text></div></div>
    </div>
    {families.map((family) => <section className="demo-palette-group" key={family.title}>
      <header><Heading level={2} size="md">{family.title}</Heading><Text size="sm" tone="muted">{family.description}</Text></header>
      <div className="demo-palette-grid">
        {family.tokens.map((token) => <article className="demo-palette-swatch" key={token.name}>
          <div className="demo-palette-swatch__head"><code>{token.name}</code><Text as="span" size="xs" tone="muted">{token.use}</Text></div>
          <div className="demo-palette-chips">
            {themes.map((theme) => <div className="demo-palette-chip" data-theme={theme} key={theme}>
              <span className="demo-palette-chip__color" ref={registerProbe(`${token.name}|${theme}`)} style={{ background: `var(${token.name})` }} />
              <span className="demo-palette-chip__label">{theme === "light" ? "Claro" : "Escuro"}</span>
              <code className="demo-palette-chip__value">{values[token.name]?.[theme] ?? "…"}</code>
            </div>)}
          </div>
        </article>)}
      </div>
    </section>)}
    <section className="demo-palette-group">
      <header><Heading level={2} size="md">Rampas de marca</Heading><Text size="sm" tone="muted">Nível 1: as rampas alimentam os tokens semânticos e não mudam entre os temas. Componentes não consomem estas cores diretamente.</Text></header>
      <Card><CardHeader><CardTitle>Escalas base</CardTitle><CardDescription>Alterar a marca aqui propaga para primary, hover, foco, accent e séries de gráfico.</CardDescription></CardHeader><CardContent>
        <div className="demo-palette-ramps">
          {ramps.map((ramp) => <div className="demo-palette-ramp" key={ramp.label}><code>{ramp.label}</code><div className="demo-palette-ramp__steps">{ramp.steps.map((step) => <span key={step} style={{ background: `var(${step})` }} title={step} />)}</div></div>)}
        </div>
      </CardContent></Card>
    </section>
  </>
}

function formatColor(color: string) {
  const legacy = color.match(/rgba?\(([^)]+)\)/)
  if (legacy) {
    const [red, green, blue] = legacy[1].split(",").map((part) => Number.parseFloat(part.trim()))
    return toHex([red, green, blue])
  }
  const modern = color.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/)
  if (modern) return toHex(modern.slice(1, 4).map((channel) => Number.parseFloat(channel) * 255))
  return color
}

function toHex(channels: number[]) {
  return `#${channels.map((channel) => Math.min(255, Math.round(channel)).toString(16).padStart(2, "0")).join("")}`.toUpperCase()
}
