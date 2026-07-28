"use client"

import * as React from "react"
import { BarChart3, CircleCheck, Clock3, ListFilter, Plus, Search, ShieldCheck, Trash2, UserRound } from "lucide-react"
import {
  Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Dialog, DialogClose, DialogContent,
  DialogDescription, DialogFooter, DialogHeader, DialogTitle, Field, Input, Select, Table, TableCell,
  TableContainer, TableHead,
} from "@lexui/react"

type User = { id: number; name: string; email: string; role: string; status: "Ativo" | "Convite" }
const initialUsers: User[] = [
  { id: 1, name: "Ana Lima", email: "ana@lexui.dev", role: "Admin", status: "Ativo" },
  { id: 2, name: "Rafael Costa", email: "rafael@lexui.dev", role: "Analista", status: "Ativo" },
  { id: 3, name: "Marina Souza", email: "marina@lexui.dev", role: "Membro", status: "Convite" },
]

export default function UsersPage() {
  const [users, setUsers] = React.useState(initialUsers)
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [activeOnly, setActiveOnly] = React.useState(false)
  const filtered = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()) && (!activeOnly || user.status === "Ativo"))

  function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setUsers((current) => [...current, { id: Date.now(), name: String(form.get("name")), email: String(form.get("email")), role: String(form.get("role")), status: "Convite" }])
    setOpen(false)
  }

  return <><header className="demo-page-header"><div><p className="demo-eyebrow">Administração</p><h1>Usuários</h1><p>Gerencie pessoas, acessos e convites da organização.</p></div><Button onClick={() => setOpen(true)}><Plus size={16} />Adicionar usuário</Button></header>
    <Card><CardHeader><CardTitle>Pessoas</CardTitle><CardDescription>{users.length} registros na organização</CardDescription></CardHeader><CardContent>
      <div className="demo-toolbar"><label className="demo-search"><Search size={16} /><span className="lex-visually-hidden">Buscar usuários</span><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome ou e-mail" /></label><Button variant={activeOnly ? "secondary" : "outline"} onClick={() => setActiveOnly((current) => !current)} aria-pressed={activeOnly}><ListFilter size={16} /> {activeOnly ? "Somente ativos" : "Todos os status"}</Button></div>
      <TableContainer><Table><thead><tr><TableHead>Nome</TableHead><TableHead>Perfil</TableHead><TableHead>Status</TableHead><TableHead><span className="lex-visually-hidden">Ações</span></TableHead></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><TableCell><div className="demo-user-cell"><Avatar name={user.name} size="md" /><div><strong>{user.name}</strong><span className="demo-table-subtitle">{user.email}</span></div></div></TableCell><TableCell><span className="demo-role"><RoleIcon role={user.role} />{user.role}</span></TableCell><TableCell><Badge variant={user.status === "Ativo" ? "success" : "warning"}>{user.status === "Ativo" ? <CircleCheck size={13} /> : <Clock3 size={13} />}{user.status}</Badge></TableCell><TableCell className="demo-table-actions"><Button aria-label={`Excluir ${user.name}`} variant="ghost" size="icon" onClick={() => setUsers((current) => current.filter((item) => item.id !== user.id))}><Trash2 size={16} /></Button></TableCell></tr>)}</tbody></Table></TableContainer>
      {filtered.length === 0 && <div className="demo-empty"><Search /><strong>Nenhum usuário encontrado</strong><span>Tente alterar os termos da busca.</span></div>}
    </CardContent></Card>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent><form onSubmit={createUser}><DialogHeader><DialogTitle>Adicionar usuário</DialogTitle><DialogDescription>O usuário receberá um convite por e-mail.</DialogDescription></DialogHeader><div className="demo-form demo-dialog-form"><Field label="Nome" htmlFor="new-name"><Input id="new-name" name="name" required /></Field><Field label="E-mail" htmlFor="new-email"><Input id="new-email" name="email" type="email" required /></Field><Field label="Perfil" htmlFor="new-role"><Select id="new-role" name="role"><option>Membro</option><option>Analista</option><option>Admin</option></Select></Field></div><DialogFooter><DialogClose className="lex-button" data-variant="ghost" data-size="md">Cancelar</DialogClose><Button type="submit">Enviar convite</Button></DialogFooter></form></DialogContent></Dialog>
  </>
}

function RoleIcon({ role }: { role: string }) { return role === "Admin" ? <ShieldCheck size={15} /> : role === "Analista" ? <BarChart3 size={15} /> : <UserRound size={15} /> }
