"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cx } from "../lib/cx.js"

type BaseSwitchProps = Omit<React.ComponentProps<typeof BaseSwitch.Root>, "className" | "children"> & {
  className?: string
  label: React.ReactNode
  description?: React.ReactNode
}

export function Switch({ className, label, description, ...props }: BaseSwitchProps) {
  return (
    <label className={cx("lex-switch-label", className)} data-disabled={props.disabled || undefined}>
      <span className="lex-switch-label__copy"><span>{label}</span>{description && <small>{description}</small>}</span>
      <BaseSwitch.Root className="lex-switch" {...props}><BaseSwitch.Thumb className="lex-switch__thumb" /></BaseSwitch.Root>
    </label>
  )
}
