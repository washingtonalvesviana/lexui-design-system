"use client"

import * as React from "react"
import { AlertTriangle, BarChart3, Bell, CheckCircle2, Copy, FolderKanban, Grid2X2, LayoutDashboard, List, MessageCircle, MoreHorizontal, Plus, Search, Send, Settings, SlidersHorizontal, Star, Trash2, Users, XCircle } from "lucide-react"
import { AreaChart, BarChart, DonutChart, HorizontalBarChart, LineChart, PieChart, Sparkline } from "@lexui/charts"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDialog, AlertDialogClose,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger,
  Avatar, Badge, Blockquote, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator, Button, Calendar, Card, CardContent, CardDescription, CardFooter, CardHeader, Chat,
  ChatComposer, ChatHeader, ChatMessage, ChatMessages, ChatToolbar,
  CardTitle, Checkbox, Combobox, CommandPalette, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, DataTable, DatePicker,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader,
  DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, Field, Heading, InlineCode,
  Input, InputOTP, KeyboardKey, Lead, Pagination, Popover, PopoverContent, PopoverDescription, PopoverTitle,
  PopoverTrigger, Progress, RadioGroup, RadioOption, RangeSlider, ScrollArea, Select, Sidebar, SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarItem, SidebarNav, SidebarToggle,
  Skeleton, Slider, Spinner, Switch, Table, TableCell, TableContainer, TableHead, Tabs, TabsContent, TabsList,
  TabsTrigger, Text, Textarea, ThemeToggle, Toggle, ToggleGroup, Tooltip, TooltipProvider, useToast,
} from "@lexui/react"
import { iconsReference } from "./icons-reference"
import {
  AspectRatio, Attachment, Bubble, ButtonGroup, Carousel, CarouselContent, CarouselDots, CarouselItem,
  CarouselNext, CarouselPrevious, Collapsible, CollapsibleContent, CollapsibleTrigger, DirectionProvider,
  HoverCard, HoverCardContent, HoverCardTrigger, InputGroup, InputGroupAddon, Item, ItemActions,
  ItemContent, ItemDescription, ItemMedia, ItemTitle, Label, Marker, Menubar, MenubarContent, MenubarItem,
  MenubarMenu, MenubarShortcut, MenubarTrigger, MessageScroller, NativeSelect, NavigationMenu,
  NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  ResizablePanel, ResizablePanelGroup, SelectMenu, Separator, Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger, CloseButton, Col, Container, Fieldset, Figure,
  FigureCaption, FigureImage, FloatingLabel, Image, ListGroup, ListGroupItem, Navbar, NavbarBrand,
  NavbarContent, NavbarToggle, Row, useScrollSpy,
} from "@lexui/react"

function ExampleFrame({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="demo-example-frame"><div className="demo-example-frame__header"><div><Heading level={2} size="md">{title}</Heading>{description && <Text size="sm" tone="muted">{description}</Text>}</div><Badge variant="success">Ao vivo</Badge></div><div className="demo-example-frame__canvas">{children}</div></section>
}

const roles = [
  { value: "member", label: "Membro", description: "Acesso aos projetos atribuídos" },
  { value: "admin", label: "Administrador", description: "Gerencia pessoas e configurações" },
  { value: "viewer", label: "Visualizador", description: "Acesso somente para leitura" },
]

const tableRows = [
  { id: "1", project: "Portal financeiro", owner: "Ana", status: "Ativo" },
  { id: "2", project: "Onboarding", owner: "Rafael", status: "Ativo" },
  { id: "3", project: "Migração CRM", owner: "Marina", status: "Pausado" },
  { id: "4", project: "Aplicativo mobile", owner: "Caio", status: "Ativo" },
  { id: "5", project: "Novo checkout", owner: "Lia", status: "Revisão" },
  { id: "6", project: "Central de ajuda", owner: "Bia", status: "Ativo" },
]

const demoImageSrc = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300"><rect width="640" height="300" fill="gainsboro"/><circle cx="150" cy="150" r="80" fill="slateblue"/><rect x="290" y="70" width="130" height="160" rx="14" fill="orangered"/><rect x="470" y="110" width="130" height="120" rx="14" fill="teal"/></svg>')

function ScrollSpyDemo() {
  const active = useScrollSpy({ ids: ["spy-um", "spy-dois", "spy-tres"], offset: 120 })
  const sections: [string, string, string][] = [
    ["spy-um", "Seção 1", "Conteúdo da primeira seção. A navegação ao lado destaca este bloco enquanto ele estiver visível na viewport."],
    ["spy-dois", "Seção 2", "Role a página: o destaque segue a seção que ocupa o topo da área visível."],
    ["spy-tres", "Seção 3", "O hook useScrollSpy devolve o id da seção ativa para qualquer navegação própria."],
  ]
  return <>
    <nav className="lex-utility-display-flex lex-utility-gap-6 lex-utility-justify-center lex-utility-my-4" aria-label="Seções da página">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} style={{ fontWeight: active === id ? 700 : 400, color: active === id ? "var(--lex-primary)" : "var(--lex-muted)" }}>{label}</a>)}
    </nav>
    <div className="demo-example-stack">
      {sections.map(([id, title, body]) => (
        <section key={id} id={id} style={{ minHeight: "100vh" }}>
          <Heading size="md">{title}</Heading>
          <Text>{body}</Text>
        </section>
      ))}
    </div>
  </>
}

export function ComponentExample({ slug }: { slug: string }) {
  const toast = useToast()
  const [page, setPage] = React.useState(3)
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [toggleView, setToggleView] = React.useState<string[]>(["grid"])

  switch (slug) {
    case "typography": return <>
      <ExampleFrame title="Hierarquia"><div className="demo-example-stack demo-example-copy"><Heading level={1} size="2xl">Título principal</Heading><Lead>Texto de abertura que apresenta o contexto da página.</Lead><Heading level={2} size="xl">Título de seção</Heading><Text>Conteúdo principal com leitura confortável e contraste consistente.</Text><Text size="sm" tone="muted">Informação auxiliar com menor ênfase visual.</Text></div></ExampleFrame>
      <ExampleFrame title="Conteúdo técnico"><div className="demo-example-stack demo-example-copy"><Text>Execute <InlineCode>npm run lexui:check</InlineCode> antes de concluir.</Text><Text>Atalho principal: <KeyboardKey>Ctrl K</KeyboardKey></Text><Blockquote>Reutilize componentes públicos antes de criar uma nova abstração.</Blockquote></div></ExampleFrame>
    </>
    case "theme-toggle": return <ExampleFrame title="Tema global" description="Clique para alternar toda a aplicação entre claro e escuro."><div className="demo-example-row"><ThemeToggle /><Text size="sm" tone="muted">A escolha é persistida no navegador.</Text></div></ExampleFrame>
    case "field": return <><ExampleFrame title="Campo completo"><div className="demo-example-form"><Field label="E-mail" htmlFor="field-email" description="Usaremos para notificações importantes."><Input id="field-email" type="email" placeholder="nome@empresa.com" /></Field><Field label="Código" htmlFor="field-error" error="O código informado é inválido."><Input id="field-error" aria-invalid="true" defaultValue="123" /></Field></div></ExampleFrame></>
    case "input": return <ExampleFrame title="Estados"><div className="demo-example-form"><Input placeholder="Digite seu nome" value={inputValue} onChange={(event) => setInputValue(event.target.value)} /><Input type="email" placeholder="nome@empresa.com" /><Input disabled value="Campo desabilitado" /><Text size="sm" tone="muted">Valor digitado: {inputValue || "—"}</Text></div></ExampleFrame>
    case "textarea": return <ExampleFrame title="Texto multilinha"><div className="demo-example-form"><Textarea placeholder="Descreva o objetivo do projeto" defaultValue="Precisamos organizar o fluxo de aprovação e publicação." /><Textarea aria-invalid="true" placeholder="Estado inválido" /></div></ExampleFrame>
    case "select": return <ExampleFrame title="Seleção simples"><div className="demo-example-form"><Select defaultValue="analyst" aria-label="Perfil"><option value="admin">Administrador</option><option value="analyst">Analista</option><option value="viewer">Visualizador</option></Select><Select disabled aria-label="Seleção indisponível"><option>Indisponível</option></Select></div></ExampleFrame>
    case "checkbox": return <ExampleFrame title="Estados de seleção"><div className="demo-example-form"><Checkbox label="Receber novidades" description="No máximo um e-mail por semana." defaultChecked /><Checkbox label="Aceitar os termos" required /><Checkbox label="Seleção parcial" indeterminate /><Checkbox label="Indisponível" disabled /></div></ExampleFrame>
    case "radio-group": return <ExampleFrame title="Escolha exclusiva"><RadioGroup defaultValue="balanced" name="catalog-mode"><RadioOption value="simple" label="Simples" description="Menos opções e decisões rápidas." /><RadioOption value="balanced" label="Equilibrado" description="Recomendado para a maioria dos times." /><RadioOption value="advanced" label="Avançado" description="Controle completo sobre o fluxo." /></RadioGroup></ExampleFrame>
    case "switch": return <ExampleFrame title="Preferências"><div className="demo-example-form"><Switch label="Notificações" description="Avisos importantes da organização." defaultChecked /><Switch label="Relatório semanal" /><Switch label="Indisponível" disabled /></div></ExampleFrame>
    case "slider": return <ExampleFrame title="Valor e intervalo"><div className="demo-example-form"><Slider label="Automação" defaultValue={65} /><RangeSlider label="Faixa de orçamento" defaultValue={[20, 80]} /></div></ExampleFrame>
    case "combobox": return <ExampleFrame title="Busca de opções"><div className="demo-example-narrow"><Combobox options={roles} placeholder="Selecione um perfil" /></div></ExampleFrame>
    case "date-picker": return <ExampleFrame title="Selecionar data"><div className="demo-example-stack"><DatePicker value={selectedDate} onValueChange={setSelectedDate} /><Text size="sm" tone="muted">Data: {selectedDate?.toLocaleDateString("pt-BR")}</Text></div></ExampleFrame>
    case "input-otp": return <ExampleFrame title="Código de verificação"><div className="demo-example-stack"><Text>Digite o código enviado ao dispositivo confiável.</Text><InputOTP length={6} /></div></ExampleFrame>
    case "button": return <><ExampleFrame title="Variantes"><div className="demo-example-row"><Button onClick={() => toast({ title: "Ação executada", variant: "success" })}>Primário</Button><Button variant="accent">Destaque</Button><Button variant="secondary">Secundário</Button><Button variant="outline">Contorno</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Excluir</Button></div></ExampleFrame><ExampleFrame title="Estados e tamanhos"><div className="demo-example-row"><Button size="sm">Pequeno</Button><Button>Normal</Button><Button loading>Salvando</Button><Button disabled>Desabilitado</Button></div></ExampleFrame></>
    case "toggle": return <ExampleFrame title="Alternador"><div className="demo-example-row"><Toggle defaultPressed><Star size={17} /> Favorito</Toggle><Toggle variant="outline"><Bell size={17} /> Alertas</Toggle></div></ExampleFrame>
    case "toggle-group": return <ExampleFrame title="Visualização"><div className="demo-example-stack"><ToggleGroup value={toggleView} onValueChange={(value) => value.length && setToggleView(value)}><Toggle value="grid" aria-label="Exibir em grade"><Grid2X2 size={17} /></Toggle><Toggle value="list" aria-label="Exibir em lista"><List size={17} /></Toggle></ToggleGroup><Text size="sm" tone="muted">Modo atual: {toggleView[0] === "grid" ? "grade" : "lista"}</Text></div></ExampleFrame>
    case "dropdown-menu": return <ExampleFrame title="Menu de ações"><DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" />}><MoreHorizontal size={17} /> Ações</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Registro</DropdownMenuLabel><DropdownMenuItem onClick={() => toast({ title: "Edição aberta" })}>Editar</DropdownMenuItem><DropdownMenuCheckboxItem defaultChecked>Receber alertas</DropdownMenuCheckboxItem><DropdownMenuSeparator /><DropdownMenuItem data-danger onClick={() => toast({ title: "Registro excluído", variant: "danger" })}>Excluir</DropdownMenuItem></DropdownMenuContent></DropdownMenu></ExampleFrame>
    case "context-menu": return <ExampleFrame title="Menu contextual" description="Clique com o botão direito dentro da área tracejada."><ContextMenu><ContextMenuTrigger><div className="demo-context-target"><Heading size="md">Arquivo de referência</Heading><Text size="sm" tone="muted">Em touch, mantenha pressionado.</Text></div></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Arquivo</ContextMenuLabel><ContextMenuItem onClick={() => toast({ title: "Arquivo duplicado" })}><Copy size={15} /> Duplicar</ContextMenuItem><ContextMenuCheckboxItem defaultChecked>Disponível offline</ContextMenuCheckboxItem><ContextMenuSeparator /><ContextMenuItem data-danger><Trash2 size={15} /> Excluir</ContextMenuItem></ContextMenuContent></ContextMenu></ExampleFrame>
    case "command-palette": return <ExampleFrame title="Busca por comandos"><><Button onClick={() => setCommandOpen(true)}><Search size={16} /> Abrir comandos</Button><CommandPalette open={commandOpen} onOpenChange={setCommandOpen} groups={[{ label: "Navegação", items: [{ id: "dash", label: "Abrir dashboard", icon: <LayoutDashboard size={17} />, shortcut: "G D", onSelect: () => toast({ title: "Dashboard selecionado" }) }, { id: "projects", label: "Abrir projetos", icon: <FolderKanban size={17} />, shortcut: "G P", onSelect: () => toast({ title: "Projetos selecionado" }) }] }]} /></></ExampleFrame>
    case "alert": return <ExampleFrame title="Variantes semânticas"><div className="demo-example-form"><Alert title="Informação disponível">Confira os detalhes antes de continuar.</Alert><Alert variant="success" title="Alterações salvas">As preferências já estão ativas.</Alert><Alert variant="warning" title="Atenção necessária">Revise os campos destacados.</Alert><Alert variant="danger" title="Não foi possível salvar">Tente novamente em alguns instantes.</Alert></div></ExampleFrame>
    case "badge": return <ExampleFrame title="Status e categorias"><div className="demo-example-row"><Badge>Padrão</Badge><Badge variant="success">Ativo</Badge><Badge variant="warning">Pendente</Badge><Badge variant="danger">Falhou</Badge></div></ExampleFrame>
    case "toast": return <ExampleFrame title="Notificações temporárias"><div className="demo-example-row"><Button onClick={() => toast({ title: "Alterações salvas", description: "As preferências já estão ativas.", variant: "success" })}>Mostrar sucesso</Button><Button variant="accent" onClick={() => toast({ title: "Atenção necessária", description: "Revise os campos destacados.", variant: "warning" })}>Mostrar alerta</Button><Button variant="destructive" onClick={() => toast({ title: "Operação falhou", variant: "danger" })}>Mostrar erro</Button></div></ExampleFrame>
    case "progress": return <ExampleFrame title="Progresso mensurável"><div className="demo-example-form"><Progress label="Armazenamento utilizado" value={68} /><Progress label="Importação de contatos" value={34} /><Progress label="Processamento concluído" value={100} /></div></ExampleFrame>
    case "spinner": return <ExampleFrame title="Espera breve"><div className="demo-example-row"><Spinner /><Button loading>Carregando</Button><Text size="sm" tone="muted">Sincronizando dados…</Text></div></ExampleFrame>
    case "skeleton": return <ExampleFrame title="Estrutura de carregamento"><div className="demo-skeleton-preview"><Skeleton className="demo-skeleton-avatar" /><div><Skeleton className="demo-skeleton-title" /><Skeleton className="demo-skeleton-line" /></div><Skeleton className="demo-skeleton-block" /></div></ExampleFrame>
    case "empty-state": return <ExampleFrame title="Sem resultados"><EmptyState title="Nenhum projeto encontrado" description="Crie o primeiro projeto para começar a acompanhar tarefas e resultados." action={<Button onClick={() => toast({ title: "Novo projeto iniciado", variant: "success" })}><Plus size={16} /> Criar projeto</Button>} /></ExampleFrame>
    case "tooltip": return <ExampleFrame title="Ajuda contextual"><TooltipProvider><div className="demo-example-row"><Tooltip label="Configurações"><Settings size={20} /></Tooltip><Tooltip label="Notificações"><Bell size={20} /></Tooltip><Text size="sm" tone="muted">Passe o mouse ou use o teclado.</Text></div></TooltipProvider></ExampleFrame>
    case "card": return <ExampleFrame title="Composição"><div className="demo-example-grid"><Card><CardHeader><CardTitle>Assinatura</CardTitle><CardDescription>Plano atual da organização.</CardDescription></CardHeader><CardContent><Heading size="lg">Professional</Heading></CardContent><CardFooter><Button size="sm">Gerenciar</Button></CardFooter></Card><Card><CardHeader><CardTitle>Resumo</CardTitle><CardDescription>Indicadores do mês.</CardDescription></CardHeader><CardContent><Text>24 projetos ativos</Text></CardContent></Card></div></ExampleFrame>
    case "tabs": return <ExampleFrame title="Painéis relacionados"><Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Visão geral</TabsTrigger><TabsTrigger value="security">Segurança</TabsTrigger><TabsTrigger value="billing">Cobrança</TabsTrigger></TabsList><TabsContent value="overview"><div className="demo-tab-panel">Dados gerais da organização.</div></TabsContent><TabsContent value="security"><div className="demo-tab-panel">Políticas de senha e autenticação.</div></TabsContent><TabsContent value="billing"><div className="demo-tab-panel">Plano, pagamento e faturas.</div></TabsContent></Tabs></ExampleFrame>
    case "accordion": return <ExampleFrame title="Perguntas frequentes"><Accordion defaultValue={["tokens"]}><AccordionItem value="tokens"><AccordionTrigger>Como alterar as cores globais?</AccordionTrigger><AccordionContent>Edite somente os tokens de marca. Os componentes e gráficos herdam as mudanças.</AccordionContent></AccordionItem><AccordionItem value="themes"><AccordionTrigger>O tema escuro é automático?</AccordionTrigger><AccordionContent>O ThemeToggle persiste a preferência e troca os tokens semânticos.</AccordionContent></AccordionItem></Accordion></ExampleFrame>
    case "breadcrumb": return <ExampleFrame title="Hierarquia"><Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/dashboard">Início</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="/design-system/components">Componentes</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb></ExampleFrame>
    case "pagination": return <ExampleFrame title="Navegação de páginas"><div className="demo-example-stack"><Text>Página atual: {page}</Text><Pagination page={page} totalPages={8} onPageChange={setPage} /></div></ExampleFrame>
    case "sidebar": return <ExampleFrame title="Navegação recolhível"><div className="demo-sidebar-preview"><Sidebar><SidebarHeader><strong>LexUI</strong><SidebarToggle /></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarNav aria-label="Exemplo"><SidebarItem href="#component-preview" icon={<BarChart3 size={18} />} active>Dashboard</SidebarItem><SidebarItem href="#component-preview" icon={<FolderKanban size={18} />}>Projetos</SidebarItem><SidebarItem href="#component-preview" icon={<Users size={18} />} badge={<Badge>12</Badge>}>Time</SidebarItem></SidebarNav></SidebarGroup></SidebarContent><SidebarFooter>Conta LexUI</SidebarFooter></Sidebar><div className="demo-sidebar-preview__content">Conteúdo da aplicação</div></div></ExampleFrame>
    case "scroll-area": return <ExampleFrame title="Conteúdo com rolagem"><ScrollArea className="demo-scroll-preview"><div className="demo-scroll-preview__content">{Array.from({ length: 18 }, (_, index) => <div key={index}><strong>Atividade {index + 1}</strong><Text size="sm" tone="muted">Registro preservado na área de rolagem.</Text></div>)}</div></ScrollArea></ExampleFrame>
    case "table": return <ExampleFrame title="Tabela semântica"><TableContainer><Table><thead><tr><TableHead>Nome</TableHead><TableHead>Perfil</TableHead><TableHead>Status</TableHead></tr></thead><tbody><tr><TableCell>Ana Lima</TableCell><TableCell>Admin</TableCell><TableCell><Badge variant="success">Ativa</Badge></TableCell></tr><tr><TableCell>Rafael Costa</TableCell><TableCell>Analista</TableCell><TableCell><Badge variant="warning">Convite</Badge></TableCell></tr></tbody></Table></TableContainer></ExampleFrame>
    case "data-table": return <ExampleFrame title="Busca, ordenação e paginação"><DataTable data={tableRows} rowId={(row) => row.id} pageSize={4} searchText={(row) => `${row.project} ${row.owner} ${row.status}`} columns={[{ id: "project", header: "Projeto", accessor: "project", sortable: true }, { id: "owner", header: "Responsável", accessor: "owner", sortable: true }, { id: "status", header: "Status", accessor: "status", sortable: true, cell: (row) => <Badge variant={row.status === "Ativo" ? "success" : "warning"}>{row.status}</Badge> }]} actions={<Button onClick={() => toast({ title: "Novo projeto" })}><Plus size={16} /> Novo</Button>} /></ExampleFrame>
    case "calendar": return <ExampleFrame title="Calendário mensal"><div className="demo-example-stack"><Calendar value={selectedDate} onValueChange={setSelectedDate} /><Text size="sm" tone="muted">Selecionada: {selectedDate?.toLocaleDateString("pt-BR")}</Text></div></ExampleFrame>
    case "bar-chart": return <><ExampleFrame title="Série categórica"><BarChart label="Receita mensal" data={[{ label: "Jan", value: 42 }, { label: "Fev", value: 58 }, { label: "Mar", value: 51 }, { label: "Abr", value: 76 }, { label: "Mai", value: 91 }]} valueFormatter={(value) => `R$ ${value}k`} /></ExampleFrame><ExampleFrame title="Tom contextual"><BarChart label="Conversão" tone="positive" data={[{ label: "Seg", value: 32 }, { label: "Ter", value: 47 }, { label: "Qua", value: 39 }, { label: "Qui", value: 61 }]} valueFormatter={(value) => `${value}%`} /></ExampleFrame></>
    case "horizontal-bar-chart": return <ExampleFrame title="Ranking por canal"><HorizontalBarChart label="Aquisição por canal" data={[{ label: "Orgânico", value: 84 }, { label: "Indicação", value: 67 }, { label: "Mídia", value: 52 }, { label: "Eventos", value: 31 }]} valueFormatter={(value) => `${value}%`} /></ExampleFrame>
    case "line-chart": return <><ExampleFrame title="Evolução de receita"><LineChart label="Receita nos últimos seis meses" data={[{ label: "Jan", value: 42 }, { label: "Fev", value: 58 }, { label: "Mar", value: 51 }, { label: "Abr", value: 76 }, { label: "Mai", value: 91 }, { label: "Jun", value: 88 }]} valueFormatter={(value) => `R$ ${value}k`} /></ExampleFrame><ExampleFrame title="Tendência positiva"><LineChart label="Usuários ativos" tone="positive" data={[{ label: "Seg", value: 22 }, { label: "Ter", value: 35 }, { label: "Qua", value: 31 }, { label: "Qui", value: 48 }, { label: "Sex", value: 63 }]} /></ExampleFrame></>
    case "area-chart": return <ExampleFrame title="Volume acumulado"><AreaChart label="Volume de mensagens" data={[{ label: "Jan", value: 28 }, { label: "Fev", value: 44 }, { label: "Mar", value: 39 }, { label: "Abr", value: 62 }, { label: "Mai", value: 79 }, { label: "Jun", value: 96 }]} valueFormatter={(value) => `${value} mil`} /></ExampleFrame>
    case "pie-chart": return <ExampleFrame title="Distribuição por plano"><PieChart label="Clientes por plano" data={[{ label: "Starter", value: 34 }, { label: "Professional", value: 46 }, { label: "Business", value: 20 }]} valueFormatter={(value) => `${value}%`} /></ExampleFrame>
    case "donut-chart": return <ExampleFrame title="Tickets por status"><DonutChart label="Tickets por status" centerValue="248" centerLabel="Tickets" data={[{ label: "Resolvidos", value: 148 }, { label: "Em andamento", value: 62 }, { label: "Aguardando", value: 38 }]} /></ExampleFrame>
    case "sparkline": return <ExampleFrame title="Métricas compactas"><div className="demo-sparkline-grid"><Card><CardHeader><CardDescription>Receita</CardDescription><CardTitle>R$ 184 mil</CardTitle></CardHeader><CardContent><Sparkline label="Tendência de receita" data={[{ label: "1", value: 22 }, { label: "2", value: 31 }, { label: "3", value: 28 }, { label: "4", value: 44 }, { label: "5", value: 51 }]} /></CardContent></Card><Card><CardHeader><CardDescription>Cancelamentos</CardDescription><CardTitle>1,8%</CardTitle></CardHeader><CardContent><Sparkline label="Tendência de cancelamentos" tone="negative" data={[{ label: "1", value: 5 }, { label: "2", value: 4 }, { label: "3", value: 6 }, { label: "4", value: 3 }, { label: "5", value: 2 }]} /></CardContent></Card></div></ExampleFrame>
    case "avatar": return <ExampleFrame title="Tamanhos e fallback"><div className="demo-example-row"><Avatar name="Ana Lima" size="sm" /><Avatar name="Rafael Costa" /><Avatar name="Marina Souza" size="lg" /><Text size="sm" tone="muted">Iniciais são geradas automaticamente.</Text></div></ExampleFrame>
    case "dialog": return <ExampleFrame title="Modal de tarefa"><Dialog><DialogTrigger render={<Button />}>Convidar pessoa</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Convidar pessoa</DialogTitle><DialogDescription>Envie um convite para participar da organização.</DialogDescription></DialogHeader><div className="demo-example-form demo-dialog-form"><Field label="E-mail" htmlFor="dialog-email"><Input id="dialog-email" type="email" placeholder="nome@empresa.com" /></Field></div><DialogFooter><DialogClose render={<Button variant="ghost" />}>Cancelar</DialogClose><DialogClose render={<Button />}>Enviar convite</DialogClose></DialogFooter></DialogContent></Dialog></ExampleFrame>
    case "alert-dialog": return <ExampleFrame title="Confirmação crítica"><AlertDialog><AlertDialogTrigger render={<Button variant="destructive" />}>Excluir projeto</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Excluir este projeto?</AlertDialogTitle><AlertDialogDescription>Esta ação é permanente e removerá os dados associados.</AlertDialogDescription><AlertDialogFooter><AlertDialogClose render={<Button variant="outline" />}>Cancelar</AlertDialogClose><AlertDialogClose render={<Button variant="destructive" />}>Excluir</AlertDialogClose></AlertDialogFooter></AlertDialogContent></AlertDialog></ExampleFrame>
    case "drawer": return <ExampleFrame title="Painel lateral" description={'position "end" ancora à direita; sem position o padrão é bottom sheet. Abaixo de 640px toda posição vira bottom sheet.'}><Drawer><DrawerTrigger render={<Button />}>Novo evento</DrawerTrigger><DrawerContent position="end"><DrawerHeader><DrawerTitle>Criar evento</DrawerTitle><DrawerDescription>Preencha os dados essenciais e confirme.</DrawerDescription></DrawerHeader><div className="demo-example-form demo-drawer-form"><Field label="Título" htmlFor="drawer-title"><Input id="drawer-title" placeholder="Reunião de planejamento" /></Field><Field label="Data" htmlFor="drawer-date"><Input id="drawer-date" type="date" /></Field></div><DrawerFooter><DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose><DrawerClose render={<Button />}>Criar evento</DrawerClose></DrawerFooter></DrawerContent></Drawer></ExampleFrame>
    case "popover": return <ExampleFrame title="Conteúdo ancorado"><Popover><PopoverTrigger render={<Button variant="secondary" />}><SlidersHorizontal size={17} /> Filtros</PopoverTrigger><PopoverContent><PopoverTitle>Filtros rápidos</PopoverTitle><PopoverDescription>Refine a lista sem perder o contexto atual.</PopoverDescription><div className="demo-example-form demo-popover-form"><Checkbox label="Somente ativos" defaultChecked /><Checkbox label="Meus projetos" /></div></PopoverContent></Popover></ExampleFrame>
    case "chat": return <ExampleFrame title="Conversa básica"><div className="demo-example-narrow"><Chat><ChatHeader><strong>Assistente Lex</strong><Badge variant="success">Online</Badge></ChatHeader><ChatMessages><ChatMessage author="Assistente" avatar={<Avatar name="Lex IA" size="sm" />}>Olá! Posso analisar seus dados e documentos.</ChatMessage><ChatMessage role="user" author="Você">Mostre o resumo da semana.</ChatMessage></ChatMessages><ChatComposer onSubmit={(event) => event.preventDefault()}><Textarea rows={2} placeholder="Digite uma mensagem…" aria-label="Mensagem" /><ChatToolbar><Button size="sm"><Send size={15} /> Enviar</Button><a className="demo-inline-link" href="/chat"><MessageCircle size={15} /> Ver exemplo completo</a></ChatToolbar></ChatComposer></Chat></div></ExampleFrame>
    case "aspect-ratio": return <ExampleFrame title="Mídia responsiva"><div className="demo-example-narrow"><AspectRatio ratio={16 / 9} className="demo-aspect-preview"><div><BarChart3 size={36} /><strong>Preview 16:9</strong></div></AspectRatio></div></ExampleFrame>
    case "attachment": return <ExampleFrame title="Arquivos anexados"><div className="demo-example-form"><Attachment name="relatorio-trimestral.pdf" metadata="PDF · 2,4 MB" onRemove={() => toast({ title: "Anexo removido" })} /><Attachment name="base-clientes.csv" metadata="CSV · 840 KB" /></div></ExampleFrame>
    case "bubble": return <ExampleFrame title="Papéis de conversa"><div className="demo-example-form"><Bubble>Posso ajudar a analisar os indicadores.</Bubble><Bubble role="user">Compare os dois últimos meses.</Bubble><Bubble role="system">Fonte comercial conectada.</Bubble></div></ExampleFrame>
    case "button-group": return <ExampleFrame title="Ações relacionadas"><ButtonGroup><Button variant="outline"><Grid2X2 size={16} /> Grade</Button><Button variant="outline"><List size={16} /> Lista</Button><Button variant="outline" size="icon" aria-label="Mais opções"><MoreHorizontal size={16} /></Button></ButtonGroup></ExampleFrame>
    case "carousel": return <ExampleFrame title="Destaques navegáveis"><Carousel><CarouselContent>{["Receita cresceu 18%", "42 novos clientes", "Churn caiu para 1,8%"].map((text, index) => <CarouselItem key={text}><Card><CardHeader><CardDescription>Destaque {index + 1}</CardDescription><CardTitle>{text}</CardTitle></CardHeader></Card></CarouselItem>)}</CarouselContent><CarouselPrevious /><CarouselNext /><CarouselDots /></Carousel></ExampleFrame>
    case "collapsible": return <ExampleFrame title="Detalhes sob demanda"><Collapsible><CollapsibleTrigger>Ver fontes e metodologia</CollapsibleTrigger><CollapsibleContent><Text size="sm">Dados consolidados da base comercial e meta trimestral.</Text></CollapsibleContent></Collapsible></ExampleFrame>
    case "direction": return <ExampleFrame title="Direção do conteúdo"><div className="demo-example-grid"><DirectionProvider dir="ltr"><Card><CardContent>Interface LTR →</CardContent></Card></DirectionProvider><DirectionProvider dir="rtl"><Card><CardContent>واجهة RTL ←</CardContent></Card></DirectionProvider></div></ExampleFrame>
    case "iconography": return <>
      <ExampleFrame title="Tamanhos padrão" description="16px em controles, 18px em entidades e títulos, 20px em destaques.">
        <div className="demo-example-row">
          <div className="demo-example-stack"><Search size={16} aria-hidden="true" /><Text size="xs" tone="muted">16 · controle</Text></div>
          <div className="demo-example-stack"><FolderKanban size={18} aria-hidden="true" /><Text size="xs" tone="muted">18 · entidade</Text></div>
          <div className="demo-example-stack"><BarChart3 size={20} aria-hidden="true" /><Text size="xs" tone="muted">20 · destaque</Text></div>
        </div>
      </ExampleFrame>
      <ExampleFrame title="Estados e entidades" description="Cor, ícone e texto juntos; nunca dependa somente da cor.">
        <div className="demo-example-row">
          <div className="demo-example-stack"><CheckCircle2 size={18} className="lex-utility-text-success" aria-hidden="true" /><Text size="xs" tone="muted">Concluído</Text></div>
          <div className="demo-example-stack"><AlertTriangle size={18} className="lex-utility-text-warning" aria-hidden="true" /><Text size="xs" tone="muted">Aguardando</Text></div>
          <div className="demo-example-stack"><XCircle size={18} className="lex-utility-text-danger" aria-hidden="true" /><Text size="xs" tone="muted">Falhou</Text></div>
          <div className="demo-entity-icon"><FolderKanban size={16} aria-hidden="true" /></div>
        </div>
      </ExampleFrame>
      <ExampleFrame title="Ação somente com ícone" description="aria-label é obrigatório; o Button expõe o nome como tooltip nativo no hover.">
        <div className="demo-example-row"><Button variant="outline" size="icon" aria-label="Buscar"><Search size={16} /></Button><Button variant="outline" size="icon" aria-label="Configurações"><Settings size={16} /></Button><Button variant="outline" size="icon" aria-label="Excluir item"><Trash2 size={16} /></Button><Text size="sm" tone="muted">Pessoas usam Avatar, nunca um ícone genérico.</Text></div>
      </ExampleFrame>
      <ExampleFrame title={`Referência de ícones (${iconsReference.length})`} description="Em uso no repositório e vocabulário aprovado do design system; regenere com pnpm icons:reference. O número indica em quantos arquivos o ícone aparece.">
        <div className="demo-icon-ref-grid">
          {iconsReference.map(({ icon: Icon, name, uses, concept, use }) => <div key={name} className="demo-icon-ref" title={`${name}${concept ? ` · ${concept}` : ""} · ${uses ? `${uses} arquivo${uses > 1 ? "s" : ""}` : "aprovado, sem uso"}${use ? ` · ${use}` : ""}`}><Icon size={18} aria-hidden="true" /><span>{name}</span><small>{uses || "aprovado"}</small></div>)}
        </div>
      </ExampleFrame>
    </>
    case "hover-card": return <ExampleFrame title="Preview por hover ou foco"><Text>Responsável: <HoverCard><HoverCardTrigger>Ana Lima</HoverCardTrigger><HoverCardContent><Avatar name="Ana Lima" /><strong>Ana Lima</strong><Text as="span" size="sm" tone="muted">Product Designer · Online</Text></HoverCardContent></HoverCard></Text></ExampleFrame>
    case "input-group": return <ExampleFrame title="Prefixos e ações"><div className="demo-example-form"><InputGroup><InputGroupAddon>https://</InputGroupAddon><Input defaultValue="lexui.dev" aria-label="Domínio" /><InputGroupAddon align="end">.com</InputGroupAddon></InputGroup><InputGroup><Input placeholder="Buscar projeto" aria-label="Busca" /><Button size="icon" aria-label="Buscar"><Search size={16} /></Button></InputGroup></div></ExampleFrame>
    case "item": return <ExampleFrame title="Lista composta" description="O menu de três pontos abre as ações ativas do item."><div className="demo-example-form">{["Portal financeiro", "Central de conhecimento"].map((name) => <DropdownMenu key={name}><Item variant="outline"><ItemMedia><FolderKanban size={20} /></ItemMedia><ItemContent><ItemTitle>{name}</ItemTitle><ItemDescription>Atualizado hoje por Ana Lima</ItemDescription></ItemContent><ItemActions><DropdownMenuTrigger render={<Button size="icon" variant="ghost" aria-label={`Abrir ações de ${name}`}><MoreHorizontal size={17} /></Button>} /></ItemActions></Item><DropdownMenuContent align="end"><DropdownMenuLabel>{name}</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => toast({ title: "Visualizar", description: `“${name}” abriria em uma nova aba.`, variant: "info" })}>Visualizar</DropdownMenuItem><DropdownMenuItem onClick={() => toast({ title: "Editar", description: `As configurações de “${name}” foram abertas.`, variant: "success" })}>Editar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem data-danger onClick={() => toast({ title: "Exclusão confirmada", description: `“${name}” seria excluído permanentemente.`, variant: "danger" })}>Excluir</DropdownMenuItem></DropdownMenuContent></DropdownMenu>)}</div></ExampleFrame>
    case "label": return <ExampleFrame title="Rótulo explícito"><div className="demo-example-form"><Label htmlFor="label-example">Nome da organização</Label><Input id="label-example" placeholder="LexUI Labs" /></div></ExampleFrame>
    case "marker": return <ExampleFrame title="Estados compactos"><div className="demo-example-row"><Marker tone="positive" pulse>Online</Marker><Marker tone="warning">Aguardando</Marker><Marker tone="negative">Falhou</Marker><Marker tone="primary">Em revisão</Marker></div></ExampleFrame>
    case "menubar": return <ExampleFrame title="Comandos da aplicação"><Menubar><MenubarMenu><MenubarTrigger>Arquivo</MenubarTrigger><MenubarContent><MenubarItem>Novo projeto<MenubarShortcut>Ctrl N</MenubarShortcut></MenubarItem><MenubarItem>Exportar<MenubarShortcut>Ctrl E</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>Editar</MenubarTrigger><MenubarContent><MenubarItem>Desfazer<MenubarShortcut>Ctrl Z</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu></Menubar></ExampleFrame>
    case "message-scroller": return <ExampleFrame title="Fluxo rolável"><MessageScroller>{Array.from({ length: 8 }, (_, index) => <Bubble role={index % 2 ? "user" : "assistant"} key={index}>Mensagem de exemplo {index + 1}</Bubble>)}</MessageScroller></ExampleFrame>
    case "native-select": return <ExampleFrame title="Seleção nativa"><NativeSelect defaultValue="br" aria-label="País"><option value="br">Brasil</option><option value="pt">Portugal</option><option value="ao">Angola</option></NativeSelect></ExampleFrame>
    case "navigation-menu": return <ExampleFrame title="Navegação rica"><NavigationMenu aria-label="Produto"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#component-preview" active>Visão geral</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuTrigger>Recursos</NavigationMenuTrigger><NavigationMenuContent><Item><ItemMedia><BarChart3 size={18} /></ItemMedia><ItemContent><ItemTitle>Analytics</ItemTitle><ItemDescription>Indicadores e relatórios interativos</ItemDescription></ItemContent></Item></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#component-preview">Preços</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu></ExampleFrame>
    case "resizable": return <ExampleFrame title="Painéis ajustáveis"><ResizablePanelGroup><ResizablePanel><Heading size="md">Navegação</Heading><Text size="sm" tone="muted">Arraste o divisor ou use as setas.</Text></ResizablePanel><ResizablePanel><Heading size="md">Conteúdo</Heading><Text>Área principal redimensionável.</Text></ResizablePanel></ResizablePanelGroup></ExampleFrame>
    case "select-menu": return <ExampleFrame title="Seleção composta"><SelectMenu label="Selecionar agente" placeholder="Escolha um agente" defaultValue="analyst" options={[{ value: "analyst", label: "Analista de dados" }, { value: "support", label: "Especialista de suporte" }, { value: "writer", label: "Redator" }]} /></ExampleFrame>
    case "separator": return <ExampleFrame title="Divisores"><div className="demo-example-stack"><Text>Conteúdo acima</Text><Separator /><div className="demo-example-row"><Text>Esquerda</Text><Separator orientation="vertical" /><Text>Direita</Text></div></div></ExampleFrame>
    case "sheet": return <ExampleFrame title="Painel modal lateral" description={'Sheet é o alias de Drawer para painéis laterais; aqui position "start" ancora à esquerda.'}><Sheet><SheetTrigger render={<Button />}>Abrir detalhes</SheetTrigger><SheetContent position="start"><SheetHeader><SheetTitle>Detalhes do projeto</SheetTitle><SheetDescription>Revise informações sem sair da página.</SheetDescription></SheetHeader><div className="demo-example-form demo-drawer-form"><Field label="Nome" htmlFor="sheet-project"><Input id="sheet-project" defaultValue="Portal financeiro" /></Field></div><SheetFooter><SheetClose render={<Button />}>Concluir</SheetClose></SheetFooter></SheetContent></Sheet></ExampleFrame>
    case "grid": return <>
      <ExampleFrame title="Container · Row · Col" description="Base empilha; sm a partir de 641px; md a partir de 1025px. O gutter é o token --lex-gutter.">
        <Container style={{ padding: 0 }}>
          <Row>
            <Col span={12}><div className="demo-grid-cell">span 12 (mobile)</div></Col>
            <Col span={6} md={4}><div className="demo-grid-cell demo-grid-cell--alt">6 / 4 / —</div></Col>
            <Col span={6} md={4}><div className="demo-grid-cell demo-grid-cell--alt">6 / 4 / —</div></Col>
            <Col md={4}><div className="demo-grid-cell">total no md</div></Col>
            <Col span={12} sm={6} md={3}><div className="demo-grid-cell demo-grid-cell--accent">12 / 6 / 3</div></Col>
            <Col sm={6} md={9}><div className="demo-grid-cell">6 / 9</div></Col>
          </Row>
        </Container>
      </ExampleFrame>
      <ExampleFrame title="Container fluid" description="Ocupa 100% da largura, sem limite de --lex-content-max.">
        <Container fluid style={{ padding: 0 }}><div className="demo-grid-cell">Fluido de ponta a ponta</div></Container>
      </ExampleFrame>
    </>
    case "navbar": return <ExampleFrame title="Barra de navegação" description="Sticky opcional; no mobile o NavbarToggle revela o conteúdo.">
      <div style={{ border: "1px solid var(--lex-border)", borderRadius: "var(--lex-radius-md)" }}>
        <Navbar sticky>
          <NavbarBrand href="#component-preview"><span style={{ fontWeight: 800 }}>LexUI</span><Badge variant="success">SaaS</Badge></NavbarBrand>
          <NavbarContent>
            <Button variant="ghost" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm">Projetos</Button>
            <Button variant="ghost" size="sm">Configurações</Button>
          </NavbarContent>
          <NavbarToggle />
        </Navbar>
      </div>
    </ExampleFrame>
    case "utilities": return <>
      <ExampleFrame title="Texto e exibição">
        <div className="demo-example-row">
          <span className="lex-utility-text-muted lex-utility-text-sm">lex-utility-text-muted</span>
          <span className="lex-utility-text-primary lex-utility-font-semibold">lex-utility-text-primary</span>
          <span className="lex-utility-text-success">lex-utility-text-success</span>
          <span className="lex-utility-text-danger">lex-utility-text-danger</span>
          <span className="lex-utility-display-none" aria-hidden>invisível</span>
        </div>
      </ExampleFrame>
      <ExampleFrame title="Flex e espaçamento">
        <div className="lex-utility-display-flex lex-utility-justify-between lex-utility-items-center lex-utility-gap-4" style={{ border: "1px dashed var(--lex-border-strong)", borderRadius: "var(--lex-radius-md)", padding: "var(--lex-space-4)" }}>
          <span className="lex-utility-flex-1 lex-utility-text-sm" style={{ background: "var(--lex-surface-2)", padding: "var(--lex-space-3)", borderRadius: "var(--lex-radius-md)" }}>flex-1</span>
          <span className="lex-utility-text-sm lex-utility-p-3" style={{ background: "var(--lex-surface-2)", borderRadius: "var(--lex-radius-md)" }}>p-3</span>
          <span className="lex-utility-text-sm lex-utility-px-4 lex-utility-py-2" style={{ background: "var(--lex-surface-2)", borderRadius: "var(--lex-radius-md)" }}>px-4 py-2</span>
        </div>
      </ExampleFrame>
    </>
    case "list-group": return <ExampleFrame title="Lista com estados">
      <ListGroup>
        <ListGroupItem icon={<span aria-hidden>●</span>} active><strong>Contrato ativo</strong><span className="lex-list-group__meta">Renovação em 12 dias</span></ListGroupItem>
        <ListGroupItem icon={<span aria-hidden>○</span>}>Fatura 2048 — emitida<span className="lex-list-group__meta">R$ 1.290,00 · em dia</span></ListGroupItem>
        <ListGroupItem icon={<span aria-hidden>–</span>}>Fatura 2047 — arquivada<span className="lex-list-group__meta">Jun/2026</span></ListGroupItem>
        <ListGroupItem disabled>Item desabilitado</ListGroupItem>
      </ListGroup>
    </ExampleFrame>
    case "figure": return <ExampleFrame title="Mídia com legenda" description="figcaption associa a legenda semanticamente à mídia; gráficos usam os próprios componentes LexUI Chart.">
      <Figure>
        <FigureImage><Image src={demoImageSrc} alt="Ilustração com formas geométricas coloridas" rounded /></FigureImage>
        <FigureCaption>Figura 1 · Ilustração de exemplo com legenda semanticamente associada.</FigureCaption>
      </Figure>
    </ExampleFrame>
    case "image": return <>
      <ExampleFrame title="Imagem responsiva">
        <div className="demo-example-grid">
          <figure style={{ margin: 0 }}><Image src={demoImageSrc} alt="Ilustração com formas" rounded /><Text size="xs" tone="muted">rounded</Text></figure>
          <figure style={{ margin: 0 }}><Image src={demoImageSrc} alt="Ilustração sem raio" /><Text size="xs" tone="muted">padrão</Text></figure>
        </div>
      </ExampleFrame>
    </>
    case "close-button": return <ExampleFrame title="Botão de fechar" description="Acessível por padrão: aria-label e foco visível.">
      <div className="demo-example-row"><CloseButton /><CloseButton disabled /><div style={{ border: "1px solid var(--lex-border)", borderRadius: "var(--lex-radius-md)", padding: "var(--lex-space-3)", display: "flex", justifyContent: "flex-end" }}><CloseButton closeLabel="Fechar cartão" /></div></div>
    </ExampleFrame>
    case "floating-label": return <>
      <ExampleFrame title="Rótulo flutuante" description="O label acompanha foco e conteúdo do campo.">
        <div className="demo-example-form">
          <FloatingLabel htmlFor="fl-email" label="E-mail corporativo"><Input id="fl-email" type="email" /></FloatingLabel>
          <FloatingLabel htmlFor="fl-plan" label="Plano"><Select id="fl-plan" defaultValue="es"><option value="es" hidden>—</option><option value="essencial">Essencial</option><option value="pro">Profissional</option></Select></FloatingLabel>
        </div>
      </ExampleFrame>
      <ExampleFrame title="Fieldset e campo horizontal">
        <div className="demo-example-form">
          <Fieldset legend="Contato">
            <Field label="Telefone" htmlFor="fs-phone" horizontal optional><Input id="fs-phone" type="tel" placeholder="(11) 90000-0000" /></Field>
            <Field label="Observações" htmlFor="fs-notes" horizontal description="Visível apenas para a equipe."><Textarea id="fs-notes" /></Field>
          </Fieldset>
        </div>
      </ExampleFrame>
    </>
    case "offcanvas": return <ExampleFrame title="Painel em posições" description="DrawerContent com position start, end ou top; abaixo de 640px vira bottom sheet.">
      <div className="demo-example-row">
        <Drawer><DrawerTrigger render={<Button variant="outline" />}>Lateral esquerda</DrawerTrigger><DrawerContent position="start"><DrawerHeader><DrawerTitle>Painel esquerdo</DrawerTitle><DrawerDescription>Offcanvas ancorado à esquerda.</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose render={<Button />}>Concluir</DrawerClose></DrawerFooter></DrawerContent></Drawer>
        <Drawer><DrawerTrigger render={<Button variant="outline" />}>Lateral direita</DrawerTrigger><DrawerContent position="end"><DrawerHeader><DrawerTitle>Painel direito</DrawerTitle><DrawerDescription>Offcanvas ancorado à direita.</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose render={<Button />}>Concluir</DrawerClose></DrawerFooter></DrawerContent></Drawer>
        <Drawer><DrawerTrigger render={<Button variant="outline" />}>Superior</DrawerTrigger><DrawerContent position="top"><DrawerHeader><DrawerTitle>Painel superior</DrawerTitle><DrawerDescription>Âncora no topo da viewport.</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose render={<Button />}>Concluir</DrawerClose></DrawerFooter></DrawerContent></Drawer>
      </div>
    </ExampleFrame>
    case "scrollspy": return <ExampleFrame title="Navegação por seção" description="Role a página e observe o destaque acompanhar a seção visível."><ScrollSpyDemo /></ExampleFrame>
    default: return <Alert variant="warning" title="Exemplo indisponível">Este componente ainda não possui demonstração registrada.</Alert>
  }
}
