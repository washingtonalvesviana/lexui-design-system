import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = { title: "Foundations/Identidade", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

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
    </>
  ),
}
