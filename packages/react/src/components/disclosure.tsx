"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cx } from "../lib/cx.js"

type CollapsibleContextValue = { open: boolean; setOpen: (open: boolean) => void; contentId: string }
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null)

export function Collapsible({ open: controlled, defaultOpen = false, onOpenChange, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internal, setInternal] = React.useState(defaultOpen)
  const open = controlled ?? internal
  const contentId = React.useId()
  const setOpen = (next: boolean) => { if (controlled === undefined) setInternal(next); onOpenChange?.(next) }
  return <CollapsibleContext.Provider value={{ open, setOpen, contentId }}><div className={cx("lex-collapsible", className)} data-open={open || undefined} {...props}>{children}</div></CollapsibleContext.Provider>
}
export function CollapsibleTrigger({ className, children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleTrigger deve estar dentro de Collapsible")
  return <button type="button" className={cx("lex-collapsible__trigger", className)} aria-expanded={context.open} aria-controls={context.contentId} {...props} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.setOpen(!context.open) }}>{children}<ChevronDown className="lex-collapsible__chevron" size={16} aria-hidden="true" /></button>
}
export function CollapsibleContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleContent deve estar dentro de Collapsible")
  return <div id={context.contentId} className={cx("lex-collapsible__content", className)} hidden={!context.open} {...props} />
}

export function HoverCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <span className={cx("lex-hover-card", className)} {...props} /> }
export function HoverCardTrigger({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cx("lex-hover-card__trigger", className)} tabIndex={0} {...props} /> }
export function HoverCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <span className={cx("lex-hover-card__content", className)} role="tooltip" {...props} /> }
