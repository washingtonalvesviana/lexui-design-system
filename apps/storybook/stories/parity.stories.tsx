import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart3, FolderKanban, Search } from "lucide-react"
import {
  AspectRatio, Attachment, Bubble, Button, ButtonGroup, Carousel, CarouselContent, CarouselDots,
  CarouselItem, CarouselNext, CarouselPrevious, Collapsible, CollapsibleContent, CollapsibleTrigger,
  HoverCard, HoverCardContent, HoverCardTrigger, Input, InputGroup, InputGroupAddon, Item, ItemActions,
  ItemContent, ItemDescription, ItemMedia, ItemTitle, Marker, Menubar, MenubarContent, MenubarItem,
  MenubarMenu, MenubarShortcut, MenubarTrigger, MessageScroller, NavigationMenu, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, ResizablePanel, ResizablePanelGroup, SelectMenu, Separator,
} from "@lexui/react"

const meta = { title: "Components/Complete coverage", parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const InputsAndActions: Story = { render: () => <div className="story-stack">
  <InputGroup><InputGroupAddon>https://</InputGroupAddon><Input defaultValue="lexui.dev" /><Button aria-label="Buscar" size="icon"><Search size={16} /></Button></InputGroup>
  <SelectMenu label="Agente" defaultValue="analyst" options={[{ value: "analyst", label: "Analista de dados" }, { value: "support", label: "Suporte" }]} />
  <ButtonGroup><Button variant="outline">Editar</Button><Button variant="outline">Duplicar</Button><Button variant="outline">Arquivar</Button></ButtonGroup>
  <Attachment name="relatorio.pdf" metadata="2,4 MB" />
</div> }

export const LayoutAndDisclosure: Story = { render: () => <div className="story-stack">
  <AspectRatio ratio={21 / 9} style={{ background: "var(--lex-surface-2)", display: "grid", placeItems: "center" }}><BarChart3 size={40} /></AspectRatio>
  <Collapsible><CollapsibleTrigger>Ver detalhes</CollapsibleTrigger><CollapsibleContent>Conteúdo adicional preservando o contexto.</CollapsibleContent></Collapsible>
  <ResizablePanelGroup><ResizablePanel>Painel A</ResizablePanel><ResizablePanel>Painel B</ResizablePanel></ResizablePanelGroup>
  <Separator />
</div> }

export const NavigationAndMenus: Story = { render: () => <div className="story-stack">
  <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink active href="#">Visão geral</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#">Projetos</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>
  <Menubar><MenubarMenu><MenubarTrigger>Arquivo</MenubarTrigger><MenubarContent><MenubarItem>Novo<MenubarShortcut>Ctrl N</MenubarShortcut></MenubarItem></MenubarContent></MenubarMenu></Menubar>
  <Item variant="outline"><ItemMedia><FolderKanban size={20} /></ItemMedia><ItemContent><ItemTitle>Portal financeiro</ItemTitle><ItemDescription>Atualizado hoje</ItemDescription></ItemContent><ItemActions><Marker tone="positive">Ativo</Marker></ItemActions></Item>
</div> }

export const CarouselAndConversation: Story = { render: () => <div className="story-stack">
  <Carousel><CarouselContent>{["Primeiro destaque", "Segundo destaque", "Terceiro destaque"].map((item) => <CarouselItem key={item}><div style={{ background: "var(--lex-surface-2)", padding: "var(--lex-space-8)" }}>{item}</div></CarouselItem>)}</CarouselContent><CarouselPrevious /><CarouselNext /><CarouselDots /></Carousel>
  <MessageScroller><Bubble>Como posso ajudar?</Bubble><Bubble role="user">Mostre os indicadores.</Bubble><Bubble role="system">Fonte conectada.</Bubble></MessageScroller>
  <HoverCard><HoverCardTrigger>Ana Lima</HoverCardTrigger><HoverCardContent><strong>Ana Lima</strong><span>Product Designer</span></HoverCardContent></HoverCard>
</div> }
