"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Activity, BarChart3, Blocks, CalendarDays, Component, CreditCard, FolderKanban, Menu, MessageCircle, Search, Settings, Upload, UserRound, UsersRound, X } from "lucide-react"
import * as React from "react"
import { Button, CommandPalette, CommandShortcut, ThemeToggle, useCommandShortcut } from "@lexui/react"

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/users", label: "Usuários", icon: UsersRound },
  { href: "/calendar", label: "Agenda", icon: CalendarDays },
  { href: "/projects", label: "Projetos", icon: FolderKanban },
  { href: "/upload", label: "Arquivos", icon: Upload },
  { href: "/chat", label: "Chat IA", icon: MessageCircle },
  { href: "/activity", label: "Atividade", icon: Activity },
  { href: "/profile", label: "Perfil", icon: UserRound },
  { href: "/settings", label: "Configurações", icon: Settings },
  { href: "/billing", label: "Cobrança", icon: CreditCard },
  { href: "/design-system", label: "Design System", icon: Component },
  { href: "/design-system/components", label: "Componentes", icon: Blocks },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [commandOpen, setCommandOpen] = React.useState(false)
  const showCommands = React.useCallback(() => setCommandOpen(true), [])
  useCommandShortcut(showCommands)
  return <div className="demo-shell" data-nav-open={open || undefined}>
    <aside className="demo-sidebar">
      <div className="demo-sidebar__top"><Link className="demo-brand" href="/dashboard"><span className="demo-brand__mark">L</span><span>LexUI</span></Link><button className="demo-nav-close" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button></div>
      <nav aria-label="Principal">{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} data-active={pathname === href || (href === "/design-system/components" && pathname.startsWith(`${href}/`)) || undefined} onClick={() => setOpen(false)}><Icon size={18} /><span>{label}</span></Link>)}</nav>
      <div className="demo-sidebar__footer"><div className="demo-avatar">AL</div><div><strong>Ana Lima</strong><span>Admin</span></div></div>
    </aside>
    <div className="demo-main">
      <header className="demo-topbar"><Button className="demo-menu-button" variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu size={20} /></Button><Button className="demo-command-trigger" variant="outline" size="sm" onClick={showCommands}><Search size={16} /><span>Buscar</span><CommandShortcut>Ctrl K</CommandShortcut></Button><div className="demo-topbar__spacer" /><ThemeToggle /><Button variant="outline" size="sm" onClick={() => window.location.href = "/login"}>Sair</Button></header>
      <main className="demo-content">{children}</main>
    </div>
    {open && <button className="demo-overlay" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
    <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} groups={[{ label: "Navegação", items: navigation.map(({ href, label, icon: Icon }) => ({ id: href, label: `Abrir ${label}`, icon: <Icon size={17} />, keywords: [label], onSelect: () => router.push(href) })) }]} />
  </div>
}
