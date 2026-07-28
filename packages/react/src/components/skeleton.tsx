import * as React from "react"
import { cx } from "../lib/cx"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-skeleton", className)} aria-hidden="true" {...props} />
}
