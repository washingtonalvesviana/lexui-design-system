import * as React from "react"
import { cx } from "../lib/cx.js"

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type TextWeight = "light" | "regular" | "medium" | "semibold" | "bold" | "black"
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> { level?: HeadingLevel; size?: "sm" | "md" | "lg" | "xl" | "2xl"; weight?: TextWeight; italic?: boolean }
export function Heading({ level = 2, size, weight, italic, className, ...props }: HeadingProps) { const Tag = `h${level}` as React.ElementType; return React.createElement(Tag, { className: cx("lex-heading", className), "data-size": size, "data-weight": weight, "data-italic": italic || undefined, ...props }) }

export interface TextProps extends React.HTMLAttributes<HTMLElement> { as?: "p" | "span" | "div"; size?: "xs" | "sm" | "md" | "lg"; tone?: "default" | "muted" | "primary" | "accent"; weight?: TextWeight; italic?: boolean }
export function Text({ as: Tag = "p", size = "md", tone = "default", weight = "regular", italic, className, ...props }: TextProps) { return <Tag className={cx("lex-text", className)} data-size={size} data-tone={tone} data-weight={weight} data-italic={italic || undefined} {...props} /> }
export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={cx("lex-lead", className)} {...props} /> }
export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <code className={cx("lex-inline-code", className)} {...props} /> }
export function KeyboardKey({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <kbd className={cx("lex-keyboard-key", className)} {...props} /> }
export function Blockquote({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) { return <blockquote className={cx("lex-blockquote", className)} {...props} /> }
