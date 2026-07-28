import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lexui/react"
import { Bell, CircleCheck, Download, FolderKanban, Settings2, ShieldCheck, Trash2, UserRound } from "lucide-react"

const meta = { title: "Foundations/Iconografia", parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const SemanticIcons: Story = { render: () => <div className="lex-story-grid">
  <Card><CardHeader><CardTitle>Entidades e pessoas</CardTitle><CardDescription>Avatar identifica pessoas; ícones identificam objetos.</CardDescription></CardHeader><CardContent style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 16 }}><Avatar name="Ana Lima" /><Avatar name="Rafael Costa" /><FolderKanban aria-label="Projeto" /><UserRound aria-label="Perfil" /><ShieldCheck aria-label="Segurança" /></CardContent></Card>
  <Card><CardHeader><CardTitle>Ações</CardTitle><CardDescription>Ícone com texto para ações principais; somente ícone para comandos familiares.</CardDescription></CardHeader><CardContent style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8 }}><Button><Download size={16} /> Exportar</Button><Button variant="outline"><Settings2 size={16} /> Configurar</Button><Button variant="ghost" size="icon" aria-label="Notificações"><Bell size={17} /></Button><Button variant="ghost" size="icon" aria-label="Excluir"><Trash2 size={17} /></Button></CardContent></Card>
  <Card><CardHeader><CardTitle>Estados</CardTitle><CardDescription>Estado combina texto, cor e símbolo.</CardDescription></CardHeader><CardContent style={{ display: "flex", gap: 8 }}><Badge variant="success"><CircleCheck size={13} /> Ativo</Badge><Badge variant="primary"><ShieldCheck size={13} /> Administrador</Badge></CardContent></Card>
</div> }
