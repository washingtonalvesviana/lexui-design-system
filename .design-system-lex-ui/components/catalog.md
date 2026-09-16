# Catálogo público

## Cobertura completa

O LexUI cobre os conceitos do catálogo shadcn/ui atual com APIs próprias, compatíveis com React e prontas para Next.js. A referência navegável está em `/design-system/components` e os estados isolados no Storybook.

### Layout e estrutura de página

- Grid: Container, Row e Col (12 trilhas, spans responsivos, gutter por token)
- Utilities CSS baseadas em tokens: display, flex, texto, alinhamento e espaçamento
- Escala de z-index semântica (`--lex-z-*`) para empilhamento previsível
- Navbar, NavbarBrand, NavbarContent e NavbarToggle (sticky opcional, mobile-first)
- Sidebar e NavigationMenu

### Fundamentos e conteúdo

- DirectionProvider, ThemeProvider e ThemeToggle
- Flow: nós, arestas, controles e minimapa para processos e diagramas (`@lexui/flow`)
- Paleta de cores: tokens semânticos por família, com valor resolvido nos temas claro e escuro (foundations/colors.md)
- Typography: Heading, Text, Lead, Blockquote, InlineCode e KeyboardKey
- AspectRatio, Separator, Skeleton, Spinner e ScrollArea
- Image, Figure, FigureImage e FigureCaption
- ListGroup e ListGroupItem
- CloseButton
- useScrollSpy (hook de seção ativa por rolagem)
- Ícones: lucide-react (tamanhos e semântica em foundations/iconography.md)

### Entradas

- Field (com variação horizontal), Label, Input, Textarea e InputGroup
- FloatingLabel e Fieldset
- NativeSelect e SelectMenu
- Checkbox, RadioGroup, Switch, Slider e RangeSlider
- Combobox, DatePicker, Calendar e InputOTP

### Ações e navegação

- Button, ButtonGroup, Toggle e ToggleGroup
- DropdownMenu, ContextMenu, Menubar e CommandPalette
- Breadcrumb, Pagination, Sidebar e NavigationMenu

### Estrutura, dados e disclosure

- Card, Item, Table e DataTable
- Tabs, Accordion, Collapsible, Carousel e ResizablePanelGroup
- Avatar, Badge, Marker, Progress e EmptyState

### Overlays e feedback

- Dialog, AlertDialog, Sheet, Drawer (offcanvas em posições `bottom/start/end/top`), Popover, HoverCard e Tooltip
- Alert, Toast e useToast

### Conversa e IA

- Chat, ChatHeader, ChatMessages, ChatMessage, ChatComposer e ChatToolbar
- Attachment, Bubble e MessageScroller

### Visualização de dados

- BarChart, HorizontalBarChart, LineChart, AreaChart, PieChart, DonutChart e Sparkline
- Todos expõem rótulo acessível, formatter, foco por teclado e tooltip por hover/foco.

## Critério de componente público

Um item só é considerado público quando possui tipos, exportação pelo pacote, estilos por tokens, exemplo navegável, story, documentação de uso e comportamento acessível. Novas abstrações devem resolver uma lacuna reutilizável e entrar no LexUI, nunca ficar duplicadas em uma aplicação.
