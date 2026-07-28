import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart3, FolderKanban, LayoutDashboard, Search, Settings, Users } from "lucide-react"
import {
  Badge, Button, Combobox, CommandPalette, DataTable, InputOTP, RadioGroup, RadioOption, RangeSlider,
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarItem,
  SidebarNav, SidebarToggle, Slider,
} from "@lexui/react"

const meta = { title: "Components/Avançados", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const roles = [{ value: "member", label: "Membro", description: "Acesso aos projetos atribuídos" }, { value: "admin", label: "Administrador", description: "Gerencia pessoas e configurações" }, { value: "viewer", label: "Visualizador", description: "Acesso somente para leitura" }]
export const SelecaoAvancada: Story = { render: () => <div className="lex-story-form"><Combobox options={roles} placeholder="Selecione um perfil" /><RadioGroup defaultValue="balanced" name="mode"><RadioOption value="simple" label="Simples" description="Menos opções e decisões rápidas." /><RadioOption value="balanced" label="Equilibrado" description="Configuração recomendada para a maioria dos times." /><RadioOption value="advanced" label="Avançado" description="Controle completo sobre o fluxo." /></RadioGroup><Slider label="Automação" defaultValue={65} /><RangeSlider label="Faixa de orçamento" defaultValue={[20, 80]} /></div> }

export const CodigoOTP: Story = { render: () => <div className="lex-story-form"><h2>Verificação</h2><p>Digite o código enviado ao dispositivo confiável.</p><InputOTP length={6} /></div> }

type Row = { id: string; name: string; owner: string; status: "Ativo" | "Pausado" }
const rows: Row[] = [{ id: "1", name: "Portal financeiro", owner: "Ana", status: "Ativo" }, { id: "2", name: "Onboarding", owner: "Rafael", status: "Ativo" }, { id: "3", name: "Migração CRM", owner: "Marina", status: "Pausado" }]
export const TabelaDeDados: Story = { render: () => <DataTable data={rows} rowId={(row) => row.id} columns={[{ id: "name", header: "Projeto", accessor: "name", sortable: true }, { id: "owner", header: "Responsável", accessor: "owner", sortable: true }, { id: "status", header: "Status", cell: (row) => <Badge variant={row.status === "Ativo" ? "success" : "warning"}>{row.status}</Badge> }]} actions={<Button>Novo projeto</Button>} /> }

function CommandDemo() { const [open, setOpen] = React.useState(false); return <><Button onClick={() => setOpen(true)}><Search size={16} /> Abrir comandos</Button><CommandPalette open={open} onOpenChange={setOpen} groups={[{ label: "Navegação", items: [{ id: "dash", label: "Abrir dashboard", icon: <LayoutDashboard size={17} />, shortcut: "G D", onSelect: () => undefined }, { id: "projects", label: "Abrir projetos", icon: <FolderKanban size={17} />, shortcut: "G P", onSelect: () => undefined }] }]} /></> }
export const PaletaDeComandos: Story = { render: () => <CommandDemo /> }

export const NavegacaoLateral: Story = { render: () => <div style={{ height: "38rem", display: "flex" }}><Sidebar><SidebarHeader><strong>LexUI</strong><SidebarToggle /></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarNav aria-label="Exemplo"><SidebarItem href="#" icon={<BarChart3 size={18} />} active>Dashboard</SidebarItem><SidebarItem href="#" icon={<FolderKanban size={18} />}>Projetos</SidebarItem><SidebarItem href="#" icon={<Users size={18} />} badge={<Badge>12</Badge>}>Time</SidebarItem><SidebarItem href="#" icon={<Settings size={18} />}>Configurações</SidebarItem></SidebarNav></SidebarGroup></SidebarContent><SidebarFooter>Conta LexUI</SidebarFooter></Sidebar><div style={{ padding: "2rem" }}>Conteúdo da aplicação</div></div> }
