# Component selection

Use `lexui search` and `lexui view` as the source of truth. Prefer these families:

- Form: `Field`, `Label`, `Input`, `Textarea`, `NativeSelect`, `SelectMenu`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `DatePicker`, `InputOTP`, `InputGroup`.
- Action: `Button`, `ButtonGroup`, `Toggle`, `DropdownMenu`, `ContextMenu`, `Menubar`, `CommandPalette`.
- Layout: `Card`, `Item`, `Tabs`, `Accordion`, `Collapsible`, `Carousel`, `ResizablePanelGroup`, `Separator`, `AspectRatio`.
- Navigation: `Sidebar`, `Breadcrumb`, `Pagination`, `NavigationMenu`.
- Overlay: `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `HoverCard`, `Tooltip`.
- Data: `Table`, `DataTable`, `Calendar`, `Avatar`, `Badge`, `Marker`, and `@lexui/charts`.
- Flows and diagrams: `Flow`, `FlowBackground`, `FlowControls`, `FlowMiniMap`, `flowNodeTypes` from `@lexui/flow`.
- Conversation: `Chat`, `ChatMessage`, `ChatComposer`, `Bubble`, `Attachment`, `MessageScroller`.

Use a pattern rather than isolated primitives for dashboard, CRUD, authentication, upload, profile, settings, billing, and AI chat screens. The local example index maps these patterns to navigable routes.
