"use client"

import * as React from "react"
import { CalendarDays } from "lucide-react"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cx } from "../lib/cx"

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" })

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
  "aria-label"?: string
}

export function DatePicker({ value, defaultValue, onValueChange, placeholder = "Selecionar data", disabled, min, max, className, "aria-label": ariaLabel = "Selecionar data" }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selected = value ?? internalValue
  const select = (date: Date) => { if (value === undefined) setInternalValue(date); onValueChange?.(date); setOpen(false) }
  return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger className={cx("lex-date-picker", className)} disabled={disabled} aria-label={ariaLabel}><CalendarDays size={17} aria-hidden="true" /><span>{selected ? dateFormatter.format(selected) : placeholder}</span></PopoverTrigger><PopoverContent className="lex-date-picker__popover"><Calendar value={selected} onValueChange={select} min={min} max={max} /></PopoverContent></Popover>
}
