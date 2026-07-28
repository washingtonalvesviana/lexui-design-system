"use client"

import * as React from "react"
import { CalendarPlus, MoreHorizontal, SlidersHorizontal, Trash2 } from "lucide-react"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogClose, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Calendar, Card, CardContent, CardDescription,
  CardHeader, CardTitle, DatePicker, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, Field, Input, Popover, PopoverContent, PopoverDescription,
  PopoverTitle, PopoverTrigger, Select, useToast,
} from "@lexui/react"

const events = [
  { time: "09:00", title: "Revisão do onboarding", owner: "Produto", kind: "Reunião" },
  { time: "11:30", title: "Demo com cliente", owner: "Comercial", kind: "Cliente" },
  { time: "15:00", title: "Planejamento da sprint", owner: "Engenharia", kind: "Interno" },
]

export default function CalendarPage() {
  const [date, setDate] = React.useState(new Date())
  const [deleteEvent, setDeleteEvent] = React.useState<string | null>(null)
  const toast = useToast()
  return <>
    <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/dashboard">Workspace</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Agenda</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
    <header className="demo-page-header demo-calendar-heading"><div><p className="demo-eyebrow">Planejamento</p><h1>Agenda</h1><p>Eventos, compromissos e ações do time em um só lugar.</p></div><Drawer><DrawerTrigger render={<Button />}><CalendarPlus size={17} /> Novo evento</DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Novo evento</DrawerTitle><DrawerDescription>Use o formulário padrão para manter datas e responsáveis consistentes.</DrawerDescription></DrawerHeader><div className="demo-form demo-drawer-form"><Field label="Título" htmlFor="event-title"><Input id="event-title" placeholder="Ex.: Revisão trimestral" /></Field><div className="demo-field-grid"><Field label="Data" htmlFor="event-date"><DatePicker value={date} onValueChange={setDate} /></Field><Field label="Tipo" htmlFor="event-type"><Select id="event-type"><option>Reunião</option><option>Entrega</option><option>Lembrete</option></Select></Field></div></div><DrawerFooter><DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose><DrawerClose render={<Button onClick={() => toast({ title: "Evento criado", description: "O compromisso foi adicionado à agenda.", variant: "success" })} />}>Criar evento</DrawerClose></DrawerFooter></DrawerContent></Drawer></header>
    <div className="demo-calendar-layout"><Card><CardHeader><CardTitle>Calendário</CardTitle><CardDescription>Selecione uma data para consultar os compromissos.</CardDescription></CardHeader><CardContent><Calendar value={date} onValueChange={setDate} /></CardContent></Card><Card><CardHeader><div className="demo-plan-heading"><div><CardTitle>Hoje</CardTitle><CardDescription>3 compromissos programados</CardDescription></div><Popover><PopoverTrigger render={<Button variant="outline" size="icon" aria-label="Filtrar agenda" />}><SlidersHorizontal size={17} /></PopoverTrigger><PopoverContent><PopoverTitle>Filtrar agenda</PopoverTitle><PopoverDescription>Os filtros persistem durante esta sessão.</PopoverDescription><div className="demo-form demo-popover-form"><Field label="Responsável" htmlFor="owner"><Select id="owner"><option>Todos</option><option>Produto</option><option>Comercial</option></Select></Field></div></PopoverContent></Popover></div></CardHeader><CardContent><div className="demo-agenda">{events.map((event) => <article className="demo-agenda__item" key={event.time}><time>{event.time}</time><div><strong>{event.title}</strong><span>{event.owner}</span></div><Badge variant={event.kind === "Cliente" ? "accent" : "primary"}>{event.kind}</Badge><DropdownMenu><DropdownMenuTrigger className="demo-icon-trigger" aria-label={`Ações de ${event.title}`}><MoreHorizontal size={18} /></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Editar evento</DropdownMenuItem><DropdownMenuItem>Duplicar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem data-danger onClick={() => setDeleteEvent(event.title)}><Trash2 size={15} /> Excluir</DropdownMenuItem></DropdownMenuContent></DropdownMenu></article>)}</div></CardContent></Card></div>
    <Card className="demo-calendar-faq"><CardHeader><CardTitle>Dúvidas sobre a agenda</CardTitle></CardHeader><CardContent><Accordion><AccordionItem value="timezone"><AccordionTrigger>Qual fuso horário é usado?</AccordionTrigger><AccordionContent>Todos os horários seguem America/São_Paulo, configurado no workspace.</AccordionContent></AccordionItem><AccordionItem value="notifications"><AccordionTrigger>Quando os participantes são avisados?</AccordionTrigger><AccordionContent>Ao criar ou alterar um evento, participantes recebem uma notificação conforme suas preferências.</AccordionContent></AccordionItem></Accordion></CardContent></Card>
    <AlertDialog open={Boolean(deleteEvent)} onOpenChange={(open) => { if (!open) setDeleteEvent(null) }}><AlertDialogContent><AlertDialogTitle>Excluir evento?</AlertDialogTitle><AlertDialogDescription>O compromisso “{deleteEvent}” será removido da agenda.</AlertDialogDescription><AlertDialogFooter><AlertDialogClose render={<Button variant="outline" />}>Cancelar</AlertDialogClose><AlertDialogClose render={<Button variant="destructive" onClick={() => toast({ title: "Evento excluído", variant: "info" })} />}>Excluir</AlertDialogClose></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </>
}
