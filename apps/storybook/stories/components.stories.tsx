import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Alert, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger, Field, Input, Select, Textarea,
} from "@lexui/react"

const meta = { title: "Components/Visão geral", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Botoes: Story = {
  render: () => <div className="lex-story-stack">
    <Button>Primário</Button><Button variant="accent">Destaque</Button><Button variant="secondary">Secundário</Button>
    <Button variant="outline">Contorno</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Excluir</Button>
    <Button loading>Salvando</Button><Button disabled>Desabilitado</Button>
  </div>,
}

export const Formularios: Story = {
  render: () => <form className="lex-story-form">
    <Field label="Nome completo" htmlFor="name"><Input id="name" placeholder="Digite seu nome" /></Field>
    <Field label="E-mail" htmlFor="email" description="Usaremos para notificações importantes."><Input id="email" type="email" placeholder="nome@empresa.com" /></Field>
    <Field label="Perfil" htmlFor="role"><Select id="role"><option>Administrador</option><option>Analista</option></Select></Field>
    <Field label="Observações" htmlFor="notes" optional><Textarea id="notes" /></Field>
    <Field label="Código" htmlFor="invalid" error="O código informado é inválido."><Input id="invalid" aria-invalid="true" defaultValue="123" /></Field>
    <Button type="submit">Salvar alterações</Button>
  </form>,
}

export const CardsEEstados: Story = {
  render: () => <div className="lex-story-grid">
    <Card><CardHeader><CardTitle>Assinatura</CardTitle><CardDescription>Plano atual da organização.</CardDescription></CardHeader><CardContent><strong>Professional</strong></CardContent><CardFooter><Button size="sm">Gerenciar</Button></CardFooter></Card>
    <Card><CardHeader><CardTitle>Status</CardTitle></CardHeader><CardContent><div className="lex-story-stack"><Badge variant="success">Ativo</Badge><Badge variant="warning">Pendente</Badge><Badge variant="danger">Falhou</Badge></div></CardContent></Card>
    <Card><CardHeader><CardTitle>Feedback</CardTitle></CardHeader><CardContent><Alert variant="success" title="Alterações salvas">Os dados já estão disponíveis.</Alert></CardContent></Card>
  </div>,
}

export const Modal: Story = {
  render: () => <Dialog>
    <DialogTrigger className="lex-button" data-variant="primary" data-size="md">Abrir modal</DialogTrigger>
    <DialogContent>
      <DialogHeader><DialogTitle>Convidar pessoa</DialogTitle><DialogDescription>Envie um convite para participar da organização.</DialogDescription></DialogHeader>
      <div className="lex-story-form" style={{ marginTop: "1.5rem" }}><Field label="E-mail" htmlFor="invite"><Input id="invite" type="email" /></Field></div>
      <DialogFooter><DialogClose className="lex-button" data-variant="ghost" data-size="md">Cancelar</DialogClose><Button>Enviar convite</Button></DialogFooter>
    </DialogContent>
  </Dialog>,
}
