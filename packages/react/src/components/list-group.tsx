import * as React from "react"
import { cx } from "../lib/cx.js"

export function ListGroup({ variant = "default", className, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "flush" | "numbered" }) {
  return <div role="list" className={cx("lex-list-group", className)} data-variant={variant} {...props} />
}

export interface ListGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

export function ListGroupItem({ active, disabled, icon, children, className, ...props }: ListGroupItemProps) {
  return (
    <div role="listitem" className={cx("lex-list-group__item", className)} data-active={active || undefined} data-disabled={disabled || undefined} {...props}>
      {icon && <span className="lex-list-group__icon" aria-hidden="true">{icon}</span>}
      <span className="lex-list-group__body">{children}</span>
    </div>
  )
}
