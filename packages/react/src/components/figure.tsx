import * as React from "react"
import { cx } from "../lib/cx.js"

export function Figure({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <figure className={cx("lex-figure", className)} {...props} />
}

export function FigureImage({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-figure__image", className)} {...props} />
}

export function FigureCaption({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <figcaption className={cx("lex-figcaption", className)} {...props} />
}
