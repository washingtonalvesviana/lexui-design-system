import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Alert, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger, Field, Fieldset, FloatingLabel, Input, Navbar, NavbarBrand, NavbarContent, NavbarToggle, Select, Textarea,
  CloseButton, Figure, FigureCaption, FigureImage, Image, Col, Container, ListGroup, ListGroupItem, Row,
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

export const BarraDeNavegacao: Story = {
  render: () => (
    <div style={{ border: "1px dashed var(--lex-border-strong)", borderRadius: "var(--lex-radius-md)" }}>
      <Navbar sticky>
        <NavbarBrand href="#lexui">LexUI SaaS</NavbarBrand>
        <NavbarContent>
          <Button variant="ghost" size="sm">Dashboard</Button>
          <Button variant="ghost" size="sm">Projetos</Button>
          <Button variant="ghost" size="sm">Configurações</Button>
        </NavbarContent>
        <NavbarToggle />
      </Navbar>
    </div>
  ),
}

export const ListaDeItens: Story = {
  render: () => <div className="lex-story-form" style={{ maxWidth: "28rem" }}>
    <ListGroup>
      <ListGroupItem icon={<span>●</span>} active><strong>Contrato ativo</strong><span className="lex-list-group__meta">Renova em 12 dias</span></ListGroupItem>
      <ListGroupItem icon={<span>○</span>}>Fatura 2048 — emitida<span className="lex-list-group__meta">R$ 1.290,00 · em dia</span></ListGroupItem>
      <ListGroupItem disabled>Fatura 2047 — arquivada</ListGroupItem>
    </ListGroup>
  </div>,
}

export const FiguraEImagem: Story = {
  render: () => <div className="lex-story-form" style={{ maxWidth: "30rem" }}>
    <Figure>
      <FigureImage><Image src="https://placehold.co/640x280/46519e/ffffff?text=LexUI" alt="Exemplo de imagem" rounded fit="cover" /></FigureImage>
      <FigureCaption>Figura 1 · Composição com tokens de cor e raio.</FigureCaption>
    </Figure>
  </div>,
}

export const BotaoDeFechar: Story = {
  render: () => <div className="lex-story-stack">
    <CloseButton /><CloseButton disabled /><CloseButton closeLabel="Fechar painel" aria-label="Fechar painel" />
  </div>,
}

export const FormAvancado: Story = {
  render: () => <form className="lex-story-form" style={{ maxWidth: "30rem" }}>
    <FloatingLabel htmlFor="fl-email" label="E-mail corporativo"><Input id="fl-email" type="email" /></FloatingLabel>
    <Field label="Plano" htmlFor="fl-plan" horizontal><Select id="fl-plan"><option>Essencial</option><option>Profissional</option></Select></Field>
    <Fieldset legend="Preferências de contato">
      <Field label="Telefone" htmlFor="fs-phone" optional><Input id="fs-phone" type="tel" /></Field>
      <Field label="Observações" htmlFor="fs-notes" description="Visível apenas para a equipe."><Textarea id="fs-notes" /></Field>
    </Fieldset>
    <Button type="submit" variant="outline">Salvar</Button>
  </form>,
}
