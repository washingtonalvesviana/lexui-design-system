"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { Check, Minus } from "lucide-react"
import { cx } from "../lib/cx"

type BaseCheckboxProps = Omit<React.ComponentProps<typeof BaseCheckbox.Root>, "className" | "children"> & {
  className?: string
  label: React.ReactNode
  description?: React.ReactNode
}

export function Checkbox({ className, label, description, indeterminate, ...props }: BaseCheckboxProps) {
  return (
    <label className={cx("lex-check-label", className)} data-disabled={props.disabled || undefined}>
      <BaseCheckbox.Root className="lex-checkbox" indeterminate={indeterminate} {...props}>
        <BaseCheckbox.Indicator className="lex-checkbox__indicator">
          {indeterminate ? <Minus size={14} aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span className="lex-check-label__copy"><span>{label}</span>{description && <small>{description}</small>}</span>
    </label>
  )
}
