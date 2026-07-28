"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import { cx } from "../lib/cx"

export interface CommandItem { id: string; label: string; description?: string; keywords?: string[]; icon?: React.ReactNode; shortcut?: string; disabled?: boolean; onSelect: () => void }
export interface CommandGroup { label?: string; items: CommandItem[] }
export interface CommandPaletteProps { open: boolean; onOpenChange: (open: boolean) => void; groups: CommandGroup[]; title?: string; description?: string; placeholder?: string }

export function CommandPalette({ open, onOpenChange, groups, title = "Comandos", description = "Pesquise uma ação ou destino.", placeholder = "Digite um comando…" }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  React.useEffect(() => { if (!open) setQuery("") }, [open])
  const normalized = query.trim().toLocaleLowerCase("pt-BR")
  const filtered = groups.map((group) => ({ ...group, items: group.items.filter((item) => !normalized || [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ").toLocaleLowerCase("pt-BR").includes(normalized)) })).filter((group) => group.items.length)
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="lex-command"><DialogHeader className="lex-command__header"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><div className="lex-command__search"><Search size={17} aria-hidden="true" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} aria-label="Pesquisar comandos" /></div><div className="lex-command__list" role="listbox" aria-label="Resultados">{filtered.length ? filtered.map((group, index) => <section className="lex-command__group" key={group.label ?? index}>{group.label && <h3>{group.label}</h3>}{group.items.map((item) => <button type="button" role="option" aria-selected="false" key={item.id} disabled={item.disabled} className="lex-command__item" onClick={() => { item.onSelect(); onOpenChange(false) }}>{item.icon && <span className="lex-command__icon">{item.icon}</span>}<span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span>{item.shortcut && <kbd>{item.shortcut}</kbd>}</button>)}</section>) : <div className="lex-command__empty">Nenhum comando encontrado.</div>}</div></DialogContent></Dialog>
}

export function useCommandShortcut(onOpen: () => void, key = "k") {
  React.useEffect(() => { const listener = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) { event.preventDefault(); onOpen() } }; document.addEventListener("keydown", listener); return () => document.removeEventListener("keydown", listener) }, [key, onOpen])
}

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <kbd className={cx("lex-command-shortcut", className)} {...props} /> }
