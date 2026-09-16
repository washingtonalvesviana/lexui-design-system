import * as React from "react"
import { X } from "lucide-react"
import { cx } from "../lib/cx.js"

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  closeLabel?: string
}

export function CloseButton({ closeLabel = "Fechar", className, ...props }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={cx("lex-close-button", className)}
      aria-label={props["aria-label"] ?? closeLabel}
      {...props}
    >
      <X size={18} aria-hidden="true" />
    </button>
  )
}
