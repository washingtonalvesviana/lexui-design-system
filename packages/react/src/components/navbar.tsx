"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { cx } from "../lib/cx.js"

interface NavbarContextValue { open: boolean; setOpen: (open: boolean) => void }
const NavbarContext = React.createContext<NavbarContextValue | null>(null)

export function Navbar({ sticky = false, fluid = false, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { sticky?: boolean; fluid?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const value = React.useMemo(() => ({ open, setOpen }), [open])
  return (
    <NavbarContext.Provider value={value}>
      <header className={cx("lex-navbar", className)} data-sticky={sticky || undefined} {...props}>
        <div className={cx("lex-navbar__inner", !fluid && "lex-navbar__inner--contained")}>{children}</div>
      </header>
    </NavbarContext.Provider>
  )
}

export function NavbarBrand({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx("lex-navbar__brand", className)} {...props} />
}

export function NavbarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(NavbarContext)
  return <div className={cx("lex-navbar__content", className)} data-open={context?.open || undefined} {...props} />
}

export function NavbarToggle({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(NavbarContext)
  if (!context) throw new Error("NavbarToggle deve ser usado dentro de <Navbar>")
  return (
    <button
      type="button"
      className={cx("lex-navbar__toggle", className)}
      aria-expanded={context.open}
      aria-label={context.open ? "Fechar menu" : "Abrir menu"}
      onClick={() => context.setOpen(!context.open)}
      {...props}
    >
      {context.open ? <X size={18} /> : <Menu size={18} />}
    </button>
  )
}
