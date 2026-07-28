import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontal, SlidersHorizontal } from "lucide-react"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogClose,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
  Button, Calendar, DatePicker, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Popover,
  PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger, ToastProvider, useToast,
} from "@lexui/react"

const meta = { title: "Components/Overlays e data", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const NavegacaoEData: Story = { render: () => <div className="lex-story-form"><Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">Projetos</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#">Lex CRM</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Agenda</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb><DatePicker defaultValue={new Date()} /><Calendar defaultValue={new Date()} /></div> }

export const AccordionFAQ: Story = { render: () => <div className="lex-story-form"><Accordion defaultValue={["tokens"]}><AccordionItem value="tokens"><AccordionTrigger>Como alterar as cores globais?</AccordionTrigger><AccordionContent>Edite somente os tokens semânticos de marca. Todos os componentes herdam as mudanças.</AccordionContent></AccordionItem><AccordionItem value="themes"><AccordionTrigger>O tema escuro é automático?</AccordionTrigger><AccordionContent>O ThemeToggle respeita a preferência salva e os tokens do tema selecionado.</AccordionContent></AccordionItem></Accordion></div> }

export const MenusEPopover: Story = { render: () => <div className="lex-story-stack"><DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" />}><MoreHorizontal size={17} /> Ações</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Registro</DropdownMenuLabel><DropdownMenuItem>Editar</DropdownMenuItem><DropdownMenuCheckboxItem defaultChecked>Receber alertas</DropdownMenuCheckboxItem><DropdownMenuSeparator /><DropdownMenuItem data-danger>Excluir</DropdownMenuItem></DropdownMenuContent></DropdownMenu><Popover><PopoverTrigger render={<Button variant="secondary" />}><SlidersHorizontal size={17} /> Filtros</PopoverTrigger><PopoverContent><PopoverTitle>Filtros rápidos</PopoverTitle><PopoverDescription>Refine a lista sem perder o contexto atual.</PopoverDescription></PopoverContent></Popover></div> }

export const ConfirmacaoEDrawer: Story = { render: () => <div className="lex-story-stack"><AlertDialog><AlertDialogTrigger render={<Button variant="destructive" />}>Excluir projeto</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Excluir este projeto?</AlertDialogTitle><AlertDialogDescription>Esta ação é permanente e removerá os dados associados.</AlertDialogDescription><AlertDialogFooter><AlertDialogClose render={<Button variant="outline" />}>Cancelar</AlertDialogClose><AlertDialogClose render={<Button variant="destructive" />}>Excluir</AlertDialogClose></AlertDialogFooter></AlertDialogContent></AlertDialog><Drawer><DrawerTrigger render={<Button />}>Novo evento</DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Criar evento</DrawerTitle><DrawerDescription>Preencha os dados essenciais e confirme.</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose><DrawerClose render={<Button />}>Criar evento</DrawerClose></DrawerFooter></DrawerContent></Drawer></div> }

function ToastDemo() { const toast = useToast(); return <div className="lex-story-stack"><Button onClick={() => toast({ title: "Alterações salvas", description: "As preferências já estão ativas.", variant: "success" })}>Mostrar sucesso</Button><Button variant="accent" onClick={() => toast({ title: "Atenção necessária", description: "Revise os campos destacados.", variant: "warning" })}>Mostrar alerta</Button></div> }
export const NotificacoesToast: Story = { render: () => <ToastProvider><ToastDemo /></ToastProvider> }
