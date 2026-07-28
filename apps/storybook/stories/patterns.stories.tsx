import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart } from "@lexui/charts"
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, Input, Table, TableCell, TableContainer, TableHead } from "@lexui/react"

const meta = { title: "Patterns/Referências", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const revenue = [{ label: "Jan", value: 42 }, { label: "Fev", value: 58 }, { label: "Mar", value: 51 }, { label: "Abr", value: 76 }, { label: "Mai", value: 91 }]

export const Dashboard: Story = {
  render: () => <div className="lex-story-grid">
    <Card><CardHeader><CardDescription>Receita mensal</CardDescription><CardTitle>R$ 91.240</CardTitle></CardHeader><CardContent><BarChart label="Receita mensal" data={revenue} valueFormatter={(v) => `R$ ${v}k`} /></CardContent></Card>
    <Card><CardHeader><CardDescription>Conversão</CardDescription><CardTitle>8,42%</CardTitle></CardHeader><CardContent><BarChart label="Conversão" data={revenue} tone="positive" valueFormatter={(v) => `${v}%`} /></CardContent></Card>
  </div>,
}

export const Crud: Story = {
  render: () => <Card>
    <CardHeader><CardTitle>Usuários</CardTitle><CardDescription>Gerencie pessoas e permissões.</CardDescription></CardHeader>
    <CardContent><TableContainer><Table><thead><tr><TableHead>Nome</TableHead><TableHead>Perfil</TableHead><TableHead>Status</TableHead><TableHead>Ações</TableHead></tr></thead><tbody>
      <tr><TableCell>Ana Lima</TableCell><TableCell>Admin</TableCell><TableCell><Badge variant="success">Ativa</Badge></TableCell><TableCell><Button variant="ghost" size="sm">Editar</Button></TableCell></tr>
      <tr><TableCell>Rafael Costa</TableCell><TableCell>Analista</TableCell><TableCell><Badge variant="warning">Convite</Badge></TableCell><TableCell><Button variant="ghost" size="sm">Editar</Button></TableCell></tr>
    </tbody></Table></TableContainer></CardContent>
  </Card>,
}

export const Login: Story = {
  render: () => <div className="lex-auth-preview"><Card style={{ width: "min(100%, 26rem)" }}><CardHeader><CardTitle>Entrar</CardTitle><CardDescription>Acesse sua conta LexUI.</CardDescription></CardHeader><CardContent><form className="lex-story-form"><Field label="E-mail" htmlFor="auth-email"><Input id="auth-email" type="email" /></Field><Field label="Senha" htmlFor="auth-password"><Input id="auth-password" type="password" /></Field><Button>Continuar</Button></form></CardContent></Card></div>,
}
