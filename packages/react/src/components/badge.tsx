import * as React from "react"
import { cx } from "../lib/cx"

export type BadgeVariant = "neutral" | "primary" | "accent" | "success" | "warning" | "danger"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return <span className={cx("lex-badge", className)} data-variant={variant} {...props} />
}
