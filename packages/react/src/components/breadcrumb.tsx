import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cx } from "../lib/cx.js"

export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) { return <nav aria-label="Breadcrumb" className={cx("lex-breadcrumb", className)} {...props} /> }
export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) { return <ol className={cx("lex-breadcrumb__list", className)} {...props} /> }
export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) { return <li className={cx("lex-breadcrumb__item", className)} {...props} /> }
export function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) { return <a className={cx("lex-breadcrumb__link", className)} {...props} /> }
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) { return <span aria-current="page" className={cx("lex-breadcrumb__page", className)} {...props} /> }
export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) { return <li aria-hidden="true" className={cx("lex-breadcrumb__separator", className)} {...props}>{children ?? <ChevronRight size={14} />}</li> }
export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) { return <span aria-label="Mais páginas" className={cx("lex-breadcrumb__ellipsis", className)} {...props}><MoreHorizontal size={16} /></span> }
