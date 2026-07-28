"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cx } from "../lib/cx"

export function NavigationMenu({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <nav className={cx("lex-navigation-menu", className)} {...props} /> }
export function NavigationMenuList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) { return <ul className={cx("lex-navigation-menu__list", className)} {...props} /> }
export function NavigationMenuItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) { return <li className={cx("lex-navigation-menu__item", className)} {...props} /> }
export function NavigationMenuTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button type="button" className={cx("lex-navigation-menu__trigger", className)} {...props}>{children}<ChevronDown size={15} /></button> }
export function NavigationMenuContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-navigation-menu__content", className)} {...props} /> }
export function NavigationMenuLink({ active, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }) { return <a className={cx("lex-navigation-menu__link", className)} data-active={active || undefined} {...props} /> }

export function Menubar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-menubar", className)} role="menubar" {...props} /> }
export function MenubarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-menubar__menu", className)} {...props} /> }
export function MenubarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button type="button" className={cx("lex-menubar__trigger", className)} role="menuitem" {...props} /> }
export function MenubarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-menubar__content", className)} role="menu" {...props} /> }
export function MenubarItem({ inset, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }) { return <button type="button" className={cx("lex-menubar__item", className)} data-inset={inset || undefined} role="menuitem" {...props} /> }
export function MenubarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-menubar__separator", className)} role="separator" {...props} /> }
export function MenubarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cx("lex-menubar__shortcut", className)} {...props} /> }
