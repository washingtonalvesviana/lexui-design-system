import * as React from "react"
import { cx } from "../lib/cx"

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> { level?: HeadingLevel; size?: "sm" | "md" | "lg" | "xl" | "2xl" }
export function Heading({ level = 2, size, className, ...props }: HeadingProps) { const Tag = `h${level}` as React.ElementType; return React.createElement(Tag, { className: cx("lex-heading", className), "data-size": size, ...props }) }

export interface TextProps extends React.HTMLAttributes<HTMLElement> { as?: "p" | "span" | "div"; size?: "xs" | "sm" | "md" | "lg"; tone?: "default" | "muted" | "primary" | "accent"; weight?: "regular" | "medium" | "semibold" | "bold" }
export function Text({ as: Tag = "p", size = "md", tone = "default", weight = "regular", className, ...props }: TextProps) { return <Tag className={cx("lex-text", className)} data-size={size} data-tone={tone} data-weight={weight} {...props} /> }
export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={cx("lex-lead", className)} {...props} /> }
export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <code className={cx("lex-inline-code", className)} {...props} /> }
export function KeyboardKey({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <kbd className={cx("lex-keyboard-key", className)} {...props} /> }
export function Blockquote({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) { return <blockquote className={cx("lex-blockquote", className)} {...props} /> }
