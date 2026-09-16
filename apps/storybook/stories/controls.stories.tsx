import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bell, Plus, Settings } from "lucide-react"
import {
  Avatar, Button, Checkbox, EmptyState, Pagination, Progress, Skeleton, Switch,
  Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipProvider,
} from "@lexui/react"

const meta = { title: "Components/Controles e navegação", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Selecao: Story = {
  render: () => <div className="lex-story-grid">
    <div className="lex-story-form"><h2>Checkbox</h2><Checkbox label="Receber novidades" description="Enviaremos no máximo um e-mail por semana." defaultChecked /><Checkbox label="Aceitar os termos" required /><Checkbox label="Seleção parcial" indeterminate /><Checkbox label="Indisponível" disabled /></div>
    <div className="lex-story-form"><h2>Switch</h2><Switch label="Notificações" description="Avisos importantes da organização." defaultChecked /><Switch label="Relatório semanal" /><Switch label="Indisponível" disabled /></div>
  </div>,
}

export const ProgressoECarregamento: Story = {
  render: () => <div className="lex-story-form">
    <Progress label="Armazenamento utilizado" value={68} />
    <Progress label="Importação de contatos" value={34} />
    <div style={{ display: "grid", gap: "var(--lex-space-3)" }}><Skeleton style={{ height: "2.5rem", width: "12rem" }} /><Skeleton style={{ height: "1rem", width: "100%" }} /><Skeleton style={{ height: "8rem", width: "100%" }} /></div>
  </div>,
}

export const Abas: Story = {
  render: () => <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview" count={4}>Visão geral</TabsTrigger><TabsTrigger value="security" count={2}>Segurança</TabsTrigger><TabsTrigger value="billing" count={1202}>Cobrança</TabsTrigger></TabsList><TabsContent value="overview">Dados gerais da organização.</TabsContent><TabsContent value="security">Políticas de senha e autenticação.</TabsContent><TabsContent value="billing">Plano, pagamento e faturas.</TabsContent></Tabs>,
}

export const IdentidadeEContexto: Story = {
  render: () => <TooltipProvider><div className="lex-story-stack"><Avatar name="Ana Lima" /><Avatar name="Rafael Costa" size="lg" /><Tooltip label="Configurações"><Settings size={20} /></Tooltip><Tooltip label="Notificações"><Bell size={20} /></Tooltip></div></TooltipProvider>,
}

export const EstadoVazio: Story = {
  render: () => <EmptyState title="Nenhum projeto encontrado" description="Crie o primeiro projeto para começar a acompanhar tarefas e resultados." action={<Button><Plus size={16} />Criar projeto</Button>} />,
}

export const Paginacao: Story = {
  render: function PaginationStory() { const [page, setPage] = React.useState(3); return <div className="lex-story-form"><p>Página atual: {page}</p><Pagination page={page} totalPages={8} onPageChange={setPage} /></div> },
}
