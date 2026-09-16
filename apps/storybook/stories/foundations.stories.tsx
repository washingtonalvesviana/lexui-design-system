import type { Meta, StoryObj } from "@storybook/react-vite"
import { TriangleAlert, BarChart3, CircleCheck, FolderKanban, Search, XCircle } from "lucide-react"
import { Col, Container, Row } from "@lexui/react"

const meta = { title: "Foundations/Identidade", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const paletteFamilies: { title: string; tokens: string[] }[] = [
  { title: "Superfícies e fundo", tokens: ["--lex-background", "--lex-surface-1", "--lex-surface-2", "--lex-surface-3"] },
  { title: "Texto", tokens: ["--lex-foreground", "--lex-muted"] },
  { title: "Ação e identidade", tokens: ["--lex-primary", "--lex-primary-hover", "--lex-primary-foreground", "--lex-accent", "--lex-accent-fill", "--lex-accent-foreground"] },
  { title: "Bordas e foco", tokens: ["--lex-border", "--lex-border-strong", "--lex-focus"] },
  { title: "Estados", tokens: ["--lex-success", "--lex-warning", "--lex-danger"] },
  { title: "Gráficos", tokens: [...Array.from({ length: 10 }, (_, index) => `--lex-chart-${index + 1}`), "--lex-chart-positive", "--lex-chart-negative", "--lex-chart-warning", "--lex-chart-neutral"] },
]

export const Cores: Story = {
  render: () => (
    <>
      <h1 className="lex-story-heading">Cores oficiais</h1>
      <div className="lex-color-grid">
        <div className="lex-swatch" style={{ "--swatch": "#46519e" } as React.CSSProperties}>Azul · #46519E</div>
        <div className="lex-swatch" style={{ "--swatch": "#f45e41" } as React.CSSProperties}>Laranja · #F45E41</div>
        <div className="lex-swatch" style={{ "--swatch": "#1a1a1a" } as React.CSSProperties}>Dark · #1A1A1A</div>
        <div className="lex-swatch" style={{ "--swatch": "var(--lex-surface-1)", "--text": "var(--lex-foreground)" } as React.CSSProperties}>Surface 1</div>
        <div className="lex-swatch" style={{ "--swatch": "var(--lex-surface-2)", "--text": "var(--lex-foreground)" } as React.CSSProperties}>Surface 2</div>
      </div>
      <h2 className="lex-story-heading">Tokens semânticos por tema</h2>
      <p style={{ color: "var(--lex-muted)", fontSize: "var(--lex-text-sm)", margin: "0 0 var(--lex-space-4)" }}>
        Cada token é renderizado dentro de escopos <code>data-theme</code>, então claro e escuro aparecem ao mesmo tempo. Nunca assuma que a tonalidade de um tema funciona no outro.
      </p>
      <div style={{ display: "grid", gap: "var(--lex-space-6)" }}>
        {paletteFamilies.map((family) => (
          <section key={family.title} style={{ display: "grid", gap: "var(--lex-space-3)" }}>
            <h3 className="lex-story-heading" style={{ fontSize: "var(--lex-text-md)" }}>{family.title}</h3>
            <div style={{ display: "grid", gap: "var(--lex-space-3)", gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))" }}>
              {family.tokens.map((token) => (
                <div key={token} style={{ background: "var(--lex-surface-2)", border: "1px solid var(--lex-border)", borderRadius: "var(--lex-radius-md)", display: "grid", gap: "var(--lex-space-2)", padding: "var(--lex-space-3)" }}>
                  <code style={{ fontFamily: "var(--lex-font-mono)", fontSize: "var(--lex-text-xs)" }}>{token}</code>
                  <div style={{ display: "grid", gap: "var(--lex-space-2)", gridTemplateColumns: "1fr 1fr" }}>
                    {(["light", "dark"] as const).map((theme) => (
                      <div key={theme} data-theme={theme} style={{ background: "var(--lex-surface-1)", border: "1px solid var(--lex-border)", borderRadius: "var(--lex-radius-sm)", display: "grid", gap: "var(--lex-space-1)", padding: "var(--lex-space-2)" }}>
                        <span style={{ background: `var(${token})`, border: "1px solid var(--lex-border-strong)", borderRadius: "var(--lex-radius-sm)", display: "block", height: "2rem" }} />
                        <small style={{ color: "var(--lex-muted)", fontSize: "var(--lex-text-xs)" }}>{theme === "light" ? "Claro" : "Escuro"}</small>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  ),
}

export const Grid: Story = {
  render: () => (
    <Container style={{ paddingBlock: "var(--lex-space-6)" }}>
      <h1 className="lex-story-heading">Grid: Container · Row · Col</h1>
      <Row>
        <Col span={12} md={4}><div style={{ background: "var(--lex-surface-2)", padding: "var(--lex-space-4)" }}>span 12 → md 4</div></Col>
        <Col span={12} md={4}><div style={{ background: "var(--lex-surface-2)", padding: "var(--lex-space-4)" }}>span 12 → md 4</div></Col>
        <Col span={12} md={4}><div style={{ background: "var(--lex-surface-2)", padding: "var(--lex-space-4)" }}>span 12 → md 4</div></Col>
        <Col span={6} sm={4} md={2}><div style={{ background: "color-mix(in srgb, var(--lex-primary) 15%, transparent)", padding: "var(--lex-space-4)" }}>6/4/2</div></Col>
        <Col span={6} sm={8} md={10}><div style={{ background: "var(--lex-surface-2)", padding: "var(--lex-space-4)" }}>6/8/10</div></Col>
      </Row>
      <p style={{ color: "var(--lex-muted)", fontSize: "var(--lex-text-sm)", marginTop: "var(--lex-space-4)" }}>
        Mobile-first: a base empilha; o gutter é o token <code>--lex-gutter</code>; o limite de largura é o <code>--lex-content-max</code>.
      </p>
    </Container>
  ),
}

export const Escalas: Story = {
  render: () => (
    <Container style={{ paddingBlock: "var(--lex-space-6)" }}>
      <h1 className="lex-story-heading">Z-index, gutter e spacing</h1>
      <div style={{ display: "grid", gap: "var(--lex-space-2)", maxWidth: "36rem" }}>
        {(["--lex-z-content", "--lex-z-navbar", "--lex-z-dropdown", "--lex-z-backdrop", "--lex-z-modal", "--lex-z-popover", "--lex-z-tooltip", "--lex-z-toast"] as const).map((token) => (
          <div key={token} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--lex-border)", paddingBlock: "var(--lex-space-1)", fontSize: "var(--lex-text-sm)" }}>
            <code>{token}</code>
            <span style={{ color: "var(--lex-muted)" }}>{getComputedStyle(document.documentElement).getPropertyValue(token).trim() || "—"}</span>
          </div>
        ))}
      </div>
    </Container>
  ),
}

export const Iconografia: Story = {
  render: () => (
    <Container style={{ paddingBlock: "var(--lex-space-6)" }}>
      <h1 className="lex-story-heading">Iconografia · Lucide</h1>
      <div style={{ display: "grid", gap: "var(--lex-space-8)", maxWidth: "40rem" }}>
        <div>
          <p style={{ color: "var(--lex-muted)", fontSize: "var(--lex-text-sm)", marginBottom: "var(--lex-space-3)" }}>
            Tamanhos: 16px controles · 18px entidades · 20px destaques
          </p>
          <div style={{ alignItems: "end", display: "flex", gap: "var(--lex-space-6)" }}>
            <Search size={16} aria-hidden="true" /><FolderKanban size={18} aria-hidden="true" /><BarChart3 size={20} aria-hidden="true" />
          </div>
        </div>
        <div>
          <p style={{ color: "var(--lex-muted)", fontSize: "var(--lex-text-sm)", marginBottom: "var(--lex-space-3)" }}>
            Semântica de estado (cor + ícone + texto, nunca só a cor)
          </p>
          <div style={{ display: "flex", gap: "var(--lex-space-6)" }}>
            <CircleCheck size={18} style={{ color: "var(--lex-success)" }} aria-hidden="true" />
            <TriangleAlert size={18} style={{ color: "var(--lex-warning)" }} aria-hidden="true" />
            <XCircle size={18} style={{ color: "var(--lex-danger)" }} aria-hidden="true" />
            <Search size={18} style={{ color: "var(--lex-primary)" }} aria-hidden="true" />
          </div>
        </div>
        <p style={{ color: "var(--lex-muted)", fontSize: "var(--lex-text-sm)", margin: 0 }}>
          Pessoas usam <code>Avatar</code>; ícone sozinho exige <code>aria-label</code>; mantenha o mesmo ícone para o mesmo conceito em toda a interface.
        </p>
      </div>
    </Container>
  ),
}
