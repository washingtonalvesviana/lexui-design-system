"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import { cx } from "../lib/cx.js"

export function AspectRatio({ ratio = 16 / 9, className, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { ratio?: number }) {
  return <div className={cx("lex-aspect-ratio", className)} style={{ aspectRatio: ratio, ...style }} {...props} />
}

export function Separator({ orientation = "horizontal", decorative = true, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical"; decorative?: boolean }) {
  return <div className={cx("lex-separator", className)} data-orientation={orientation} role={decorative ? "none" : "separator"} aria-orientation={decorative ? undefined : orientation} {...props} />
}

export function ButtonGroup({ orientation = "horizontal", className, ...props }: React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return <div className={cx("lex-button-group", className)} data-orientation={orientation} role="group" {...props} />
}

export function InputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-input-group", className)} {...props} />
}
export function InputGroupAddon({ align = "start", className, ...props }: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  return <div className={cx("lex-input-group__addon", className)} data-align={align} {...props} />
}

export function Item({ variant = "default", size = "md", className, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "muted"; size?: "sm" | "md" | "lg" }) {
  return <div className={cx("lex-item", className)} data-variant={variant} data-size={size} {...props} />
}
export function ItemMedia({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-item__media", className)} {...props} /> }
export function ItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-item__content", className)} {...props} /> }
export function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-item__title", className)} {...props} /> }
export function ItemDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-item__description", className)} {...props} /> }
export function ItemActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-item__actions", className)} {...props} /> }

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) { return <label className={cx("lex-label", className)} {...props} /> }

export function Marker({ tone = "neutral", pulse = false, className, children, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "primary" | "accent" | "positive" | "warning" | "negative"; pulse?: boolean }) {
  return <span className={cx("lex-marker", className)} data-tone={tone} data-pulse={pulse || undefined} {...props}><i aria-hidden="true" />{children}</span>
}

export function ResizablePanelGroup({ direction = "horizontal", className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { direction?: "horizontal" | "vertical" }) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [firstSize, setFirstSize] = React.useState(50)
  const parts = React.Children.toArray(children)
  const update = React.useCallback((client: number) => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return
    const raw = direction === "horizontal" ? ((client - rect.left) / rect.width) * 100 : ((client - rect.top) / rect.height) * 100
    setFirstSize(Math.max(20, Math.min(80, raw)))
  }, [direction])
  return <div ref={rootRef} className={cx("lex-resizable", className)} data-direction={direction} style={{ "--lex-first-panel": `${firstSize}%` } as React.CSSProperties} {...props}>
    {parts.map((child, index) => index === 1 ? <React.Fragment key={index}><button type="button" className="lex-resizable__handle" aria-label="Redimensionar painéis" aria-valuemin={20} aria-valuemax={80} aria-valuenow={Math.round(firstSize)} role="separator" onKeyDown={(event) => { const delta = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -5 : event.key === "ArrowRight" || event.key === "ArrowDown" ? 5 : 0; if (delta) { event.preventDefault(); setFirstSize((value) => Math.max(20, Math.min(80, value + delta))) } }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); update(direction === "horizontal" ? event.clientX : event.clientY) }} onPointerMove={(event) => event.currentTarget.hasPointerCapture(event.pointerId) && update(direction === "horizontal" ? event.clientX : event.clientY)}><GripVertical size={16} /></button>{child}</React.Fragment> : child)}
  </div>
}
export function ResizablePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-resizable__panel", className)} {...props} /> }
