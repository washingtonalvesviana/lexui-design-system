"use client"

import * as React from "react"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { Radio } from "@base-ui/react/radio"
import { cx } from "../lib/cx"

export function RadioGroup<T = string>({ className, ...props }: Omit<React.ComponentProps<typeof BaseRadioGroup<T>>, "className"> & { className?: string }) {
  return <BaseRadioGroup<T> className={cx("lex-radio-group", className)} {...props} />
}

export interface RadioOptionProps<T = string> extends Omit<React.ComponentProps<typeof Radio.Root<T>>, "className"> {
  label: string
  description?: string
  className?: string
}

export function RadioOption<T = string>({ label, description, className, disabled, ...props }: RadioOptionProps<T>) {
  return <label className={cx("lex-radio-option", className)} data-disabled={disabled || undefined}><Radio.Root<T> className="lex-radio" disabled={disabled} {...props}><Radio.Indicator className="lex-radio__indicator" /></Radio.Root><span className="lex-radio-option__copy"><span>{label}</span>{description && <small>{description}</small>}</span></label>
}
