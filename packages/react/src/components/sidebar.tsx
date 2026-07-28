"use client"

import * as React from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cx } from "../lib/cx"

type SidebarContextValue = { collapsed: boolean; setCollapsed: (value: boolean) => void }
const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> { collapsed?: boolean; defaultCollapsed?: boolean; onCollapsedChange?: (collapsed: boolean) => void }
export function Sidebar({ collapsed, defaultCollapsed = false, onCollapsedChange, className, children, ...props }: SidebarProps) {
  const [internal, setInternal] = React.useState(defaultCollapsed)
  const current = collapsed ?? internal
  const setCollapsed = (next: boolean) => { if (collapsed === undefined) setInternal(next); onCollapsedChange?.(next) }
  return <SidebarContext.Provider value={{ collapsed: current, setCollapsed }}><aside className={cx("lex-sidebar", className)} data-collapsed={current || undefined} {...props}>{children}</aside></SidebarContext.Provider>
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-sidebar__header", className)} {...props} /> }
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-sidebar__content", className)} {...props} /> }
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-sidebar__footer", className)} {...props} /> }
export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-sidebar__group", className)} {...props} /> }
export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-sidebar__group-label", className)} {...props} /> }
export function SidebarNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <nav className={cx("lex-sidebar__nav", className)} {...props} /> }

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { icon?: React.ReactNode; active?: boolean; badge?: React.ReactNode }
export function SidebarItem({ icon, active, badge, className, children, ...props }: SidebarItemProps) { return <a className={cx("lex-sidebar__item", className)} data-active={active || undefined} aria-current={active ? "page" : undefined} {...props}>{icon && <span className="lex-sidebar__icon">{icon}</span>}<span className="lex-sidebar__label">{children}</span>{badge && <span className="lex-sidebar__badge">{badge}</span>}</a> }

export function SidebarToggle({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("SidebarToggle deve ser usado dentro de Sidebar")
  return <button type="button" className={cx("lex-sidebar__toggle", className)} onClick={() => context.setCollapsed(!context.collapsed)} aria-label={context.collapsed ? "Expandir navegação" : "Recolher navegação"} {...props}>{context.collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button>
}
