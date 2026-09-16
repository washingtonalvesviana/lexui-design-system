import * as React from "react"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"
import { cx } from "../lib/cx.js"

export type AlertVariant = "info" | "success" | "warning" | "danger"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title: string
}

const icons = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert }

export function Alert({ className, variant = "info", title, children, ...props }: AlertProps) {
  const Icon = icons[variant]
  return (
    <div className={cx("lex-alert", className)} data-variant={variant} role={variant === "danger" ? "alert" : "status"} {...props}>
      <Icon className="lex-alert__icon" size={18} aria-hidden="true" />
      <div><strong>{title}</strong>{children && <div className="lex-alert__body">{children}</div>}</div>
    </div>
  )
}
