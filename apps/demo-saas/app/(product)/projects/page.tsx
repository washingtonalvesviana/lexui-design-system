"use client"

import * as React from "react"
import { AppWindow, BookOpen, CheckCheck, CircleCheck, CirclePause, Clock3, FileChartColumn, FolderKanban, Landmark, Plug, Plus, RefreshCcw, ShieldCheck, ShoppingCart, Smartphone } from "lucide-react"
import {
  Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Combobox, type ComboboxOption,
  DataTable, type DataTableColumn, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger, Field, Input, Progress, RadioGroup, RadioOption, Slider, useToast,
} from "@lexui/react"

type Project = { id: string; name: string; owner: string; status: "Ativo" | "Pausado" | "Concluído"; progress: number; updated: string }
const initialProjects: Project[] = [
  { id: "PRJ-104", name: "Portal financeiro", owner: "Ana Lima", status: "Ativo", progress: 78, updated: "Hoje, 10:42" },
  { id: "PRJ-103", name: "Onboarding de clientes", owner: "Rafael Costa", status: "Ativo", progress: 54, updated: "Hoje, 09:18" },
  { id: "PRJ-102", name: "Migração do CRM", owner: "Marina Souza", status: "Pausado", progress: 32, updated: "Ontem" },
  { id: "PRJ-101", name: "Base de conhecimento", owner: "Lucas Reis", status: "Concluído", progress: 100, updated: "25 jul." },
  { id: "PRJ-100", name: "Aplicativo de vendas", owner: "Ana Lima", status: "Ativo", progress: 67, updated: "24 jul." },
  { id: "PRJ-099", name: "Relatórios executivos", owner: "Rafael Costa", status: "Ativo", progress: 45, updated: "23 jul." },
  { id: "PRJ-098", name: "Central de integrações", owner: "Lucas Reis", status: "Pausado", progress: 28, updated: "22 jul." },
  { id: "PRJ-097", name: "Auditoria de acessos", owner: "Marina Souza", status: "Concluído", progress: 100, updated: "20 jul." },
  { id: "PRJ-096", name: "Novo checkout", owner: "Ana Lima", status: "Ativo", progress: 82, updated: "18 jul." },
]
const statusOptions: ComboboxOption[] = [{ value: "all", label: "Todos os status" }, { value: "active", label: "Ativo" }, { value: "paused", label: "Pausado" }, { value: "done", label: "Concluído" }]

export default function ProjectsPage() {
  const [status, setStatus] = React.useState<ComboboxOption | null>(statusOptions[0])
  const [minimumProgress, setMinimumProgress] = React.useState(0)
  const toast = useToast()
  const exportProjects = () => { const csv = ["Código,Projeto,Responsável,Status,Progresso", ...filtered.map((project) => `${project.id},${project.name},${project.owner},${project.status},${project.progress}%`)].join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "lexui-projetos.csv"; link.click(); URL.revokeObjectURL(url); toast({ title: "Projetos exportados", variant: "success" }) }
  const filtered = initialProjects.filter((project) => (status?.value === "all" || !status ? true : status.value === "active" ? project.status === "Ativo" : status.value === "paused" ? project.status === "Pausado" : project.status === "Concluído") && project.progress >= minimumProgress)
  const columns: DataTableColumn<Project>[] = [
    { id: "name", header: "Projeto", accessor: "name", sortable: true, cell: (project) => <div className="demo-project-cell"><ProjectIcon project={project} /><div className="demo-project-name"><strong>{project.name}</strong><span>{project.id}</span></div></div> },
    { id: "owner", header: "Responsável", accessor: "owner", sortable: true, cell: (project) => <div className="demo-person-cell"><Avatar name={project.owner} size="sm" /><span>{project.owner}</span></div> },
    { id: "status", header: "Status", accessor: "status", sortable: true, cell: (project) => <Badge variant={project.status === "Ativo" ? "success" : project.status === "Pausado" ? "warning" : "primary"}>{project.status === "Ativo" ? <CircleCheck size={13} /> : project.status === "Pausado" ? <CirclePause size={13} /> : <CheckCheck size={13} />}{project.status}</Badge> },
    { id: "progress", header: "Progresso", accessor: "progress", sortable: true, cell: (project) => <div className="demo-table-progress"><Progress label={`${project.progress}% concluído`} value={project.progress} showValue={false} /></div> },
    { id: "updated", header: "Atualização", accessor: "updated", align: "right", cell: (project) => <span className="demo-inline-meta"><Clock3 size={14} />{project.updated}</span> },
  ]
  const createButton = <Drawer><DrawerTrigger render={<Button />}><Plus size={16} /> Novo projeto</DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Criar projeto</DrawerTitle><DrawerDescription>Comece com uma estrutura consistente e ajuste os detalhes depois.</DrawerDescription></DrawerHeader><div className="demo-form demo-drawer-form"><Field label="Nome" htmlFor="project-name"><Input id="project-name" placeholder="Ex.: Portal de parceiros" /></Field><Field label="Modelo de gestão" htmlFor="project-mode"><RadioGroup defaultValue="balanced" name="project-mode"><RadioOption value="simple" label="Simples" description="Lista única e poucos estados." /><RadioOption value="balanced" label="Equilibrado" description="Etapas, responsáveis e automações essenciais." /><RadioOption value="advanced" label="Avançado" description="Múltiplos fluxos e regras personalizadas." /></RadioGroup></Field></div><DrawerFooter><DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose><DrawerClose render={<Button onClick={() => toast({ title: "Projeto criado", description: "A estrutura inicial já está disponível.", variant: "success" })} />}>Criar projeto</DrawerClose></DrawerFooter></DrawerContent></Drawer>
  return <><header className="demo-page-header"><div><p className="demo-eyebrow">Portfólio</p><h1>Projetos</h1><p>Acompanhe iniciativas, responsáveis e andamento do trabalho.</p></div>{createButton}</header>
    <Card className="demo-project-filters"><CardHeader><CardTitle>Filtros do portfólio</CardTitle><CardDescription>Combine status e progresso sem alterar a fonte de dados.</CardDescription></CardHeader><CardContent><div className="demo-project-filter-grid"><Field label="Status" htmlFor="project-status"><Combobox options={statusOptions} value={status} onValueChange={setStatus} aria-label="Filtrar por status" /></Field><Slider label="Progresso mínimo" value={minimumProgress} onValueChange={(value) => setMinimumProgress(value)} step={10} /></div></CardContent></Card>
    <DataTable data={filtered} columns={columns} rowId={(project) => project.id} pageSize={5} searchPlaceholder="Buscar projeto, responsável ou código" searchText={(project) => `${project.name} ${project.owner} ${project.id}`} emptyTitle="Nenhum projeto encontrado" actions={<Button variant="outline" onClick={exportProjects}><FolderKanban size={16} /> Exportar</Button>} />
  </>
}

function ProjectIcon({ project }: { project: Project }) {
  const Icon = project.id === "PRJ-104" ? Landmark : project.id === "PRJ-103" ? RefreshCcw : project.id === "PRJ-102" ? AppWindow : project.id === "PRJ-101" ? BookOpen : project.id === "PRJ-100" ? Smartphone : project.id === "PRJ-099" ? FileChartColumn : project.id === "PRJ-098" ? Plug : project.id === "PRJ-097" ? ShieldCheck : ShoppingCart
  return <span className="demo-entity-icon" data-status={project.status.toLowerCase()}><Icon size={18} /></span>
}
