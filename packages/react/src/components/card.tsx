import * as React from "react"
import { cx } from "../lib/cx.js"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <section className={cx("lex-card", className)} {...props} />
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cx("lex-card__header", className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cx("lex-card__title", className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("lex-card__description", className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-card__content", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <footer className={cx("lex-card__footer", className)} {...props} />
}
