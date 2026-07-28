"use client"

import { Bell, ExternalLink, RotateCcw, Save, UserRound } from "lucide-react"
import { Alert, Avatar, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, Input, Select, Textarea, useToast } from "@lexui/react"

export default function ProfilePage() {
  const toast = useToast()
  return <><header className="demo-page-header"><div><p className="demo-eyebrow">Configurações</p><h1>Perfil</h1><p>Atualize seus dados pessoais e preferências.</p></div></header>
    <div className="demo-settings-grid"><nav className="demo-settings-nav" aria-label="Configurações"><a data-active href="#general"><UserRound size={16} />Informações gerais</a><a href="#notifications"><Bell size={16} />Notificações</a></nav>
      <div className="demo-settings-content"><Alert variant="info" title="Perfil público">Essas informações serão exibidas para outros membros da organização.</Alert>
        <Card id="general"><CardHeader><div className="demo-profile-identity"><Avatar name="Ana Lima" size="lg" /><div><CardTitle>Informações gerais</CardTitle><CardDescription>Ana Lima · Product Designer</CardDescription></div><BadgeProfile /></div></CardHeader><CardContent><form className="demo-form" onSubmit={(event) => { event.preventDefault(); toast({ title: "Perfil atualizado", description: "Os dados foram salvos nesta sessão.", variant: "success" }) }}><div className="demo-field-grid"><Field label="Nome" htmlFor="first"><Input id="first" defaultValue="Ana" /></Field><Field label="Sobrenome" htmlFor="last"><Input id="last" defaultValue="Lima" /></Field></div><Field label="E-mail" htmlFor="profile-email"><Input id="profile-email" type="email" defaultValue="ana@lexui.dev" /></Field><Field label="Cargo" htmlFor="role"><Select id="role" defaultValue="product"><option value="product">Product Designer</option><option value="engineering">Engenharia</option></Select></Field><Field label="Biografia" htmlFor="bio" optional><Textarea id="bio" defaultValue="Construindo experiências consistentes com o LexUI." /></Field><div className="demo-form-actions"><Button variant="outline" type="reset"><RotateCcw size={16} /> Descartar</Button><Button type="submit"><Save size={16} /> Salvar alterações</Button></div></form></CardContent></Card>
        <Card id="notifications"><CardHeader><div className="demo-title-with-icon"><Bell size={18} /><CardTitle>Notificações</CardTitle></div><CardDescription>Gerenciadas na página de configurações da organização.</CardDescription></CardHeader><CardContent><Button variant="outline" onClick={() => window.location.href = "/settings"}>Abrir configurações <ExternalLink size={16} /></Button></CardContent></Card>
      </div>
    </div>
  </>
}

function BadgeProfile() { return <span className="demo-profile-status"><span /> Perfil ativo</span> }
