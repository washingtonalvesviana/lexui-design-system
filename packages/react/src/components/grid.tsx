import * as React from "react"
import { cx } from "../lib/cx.js"

export function Container({ fluid, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { fluid?: boolean }) {
  return <div className={cx("lex-container", className)} data-fluid={fluid || undefined} {...props} />
}

export function Row({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-row", className)} {...props} />
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trilhas ocupadas (1-12) na base mobile. Padrão: largura total. */
  span?: number
  /** Trilhas ocupadas em ≥ 641px. */
  sm?: number
  /** Trilhas ocupadas em ≥ 1025px. */
  md?: number
}

export function Col({ span, sm, md, className, ...props }: ColProps) {
  return <div className={cx("lex-col", className)} data-span={span} data-span-sm={sm} data-span-md={md} {...props} />
}
