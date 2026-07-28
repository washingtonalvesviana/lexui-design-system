import type { Meta, StoryObj } from "@storybook/react-vite"
import { AreaChart, BarChart, DonutChart, HorizontalBarChart, LineChart, PieChart, Sparkline } from "@lexui/charts"

const meta = { title: "Dados/Charts", parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const timeline = [{ label: "Jan", value: 42 }, { label: "Fev", value: 58 }, { label: "Mar", value: 51 }, { label: "Abr", value: 76 }, { label: "Mai", value: 91 }]
const segments = [{ label: "Enterprise", value: 48 }, { label: "Mid-market", value: 32 }, { label: "SMB", value: 20 }]

export const Gallery: Story = { render: () => <div className="lex-story-grid"><BarChart label="Barras" data={timeline} /><HorizontalBarChart label="Ranking" data={segments} valueFormatter={(value) => `${value}%`} /><LineChart label="Linha" data={timeline} /><AreaChart label="Área" data={timeline} tone="positive" /><PieChart label="Pizza" data={segments} valueFormatter={(value) => `${value}%`} /><DonutChart label="Rosca" data={segments} centerValue="100%" centerLabel="Total" /></div> }
export const Compact: Story = { render: () => <div style={{ maxWidth: 240 }}><Sparkline label="Receita da semana" data={timeline} /></div> }
