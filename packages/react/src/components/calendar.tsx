"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cx } from "../lib/cx.js"

const weekdays = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"]
const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" })

function sameDay(a?: Date, b?: Date) {
  return Boolean(a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate())
}

function calendarDays(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(first.getDate() - offset)
  return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index))
}

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date) => void
  min?: Date
  max?: Date
}

export function Calendar({ value, defaultValue, onValueChange, min, max, className, ...props }: CalendarProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selected = value ?? internalValue
  const [month, setMonth] = React.useState(() => new Date((selected ?? new Date()).getFullYear(), (selected ?? new Date()).getMonth(), 1))
  const today = new Date()
  const days = calendarDays(month)
  const select = (date: Date) => { if (value === undefined) setInternalValue(date); onValueChange?.(date) }
  return <div className={cx("lex-calendar", className)} {...props}>
    <div className="lex-calendar__header"><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Mês anterior"><ChevronLeft size={18} /></button><strong aria-live="polite">{monthFormatter.format(month)}</strong><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Próximo mês"><ChevronRight size={18} /></button></div>
    <div className="lex-calendar__grid" role="grid" aria-label={monthFormatter.format(month)}>{weekdays.map((day) => <span className="lex-calendar__weekday" key={day} role="columnheader">{day}</span>)}{days.map((date) => { const disabled = Boolean((min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) || (max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate()))); return <button type="button" key={date.toISOString()} className="lex-calendar__day" data-outside={date.getMonth() !== month.getMonth() || undefined} data-today={sameDay(date, today) || undefined} data-selected={sameDay(date, selected) || undefined} disabled={disabled} aria-label={new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(date)} aria-selected={sameDay(date, selected)} onClick={() => select(date)} role="gridcell">{date.getDate()}</button> })}</div>
  </div>
}
