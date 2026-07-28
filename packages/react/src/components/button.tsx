import * as React from "react"
import { LoaderCircle } from "lucide-react"
import { cx } from "../lib/cx"

export type ButtonVariant = "primary" | "accent" | "secondary" | "outline" | "ghost" | "destructive"
export type ButtonSize = "sm" | "md" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx("lex-button", className)}
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      title={props.title ?? (size === "icon" && typeof props["aria-label"] === "string" ? props["aria-label"] : undefined)}
      {...props}
    >
      {loading && <LoaderCircle className="lex-spin" aria-hidden="true" size={16} />}
      {children}
    </button>
  )
})
