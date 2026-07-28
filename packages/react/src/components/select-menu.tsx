"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cx } from "../lib/cx"

export type SelectMenuOption = { value: string; label: string; disabled?: boolean }
export function SelectMenu({ options, value: controlled, defaultValue = "", onValueChange, placeholder = "Selecione", label, disabled, className }: { options: SelectMenuOption[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; placeholder?: string; label?: string; disabled?: boolean; className?: string }) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const value = controlled ?? internal
  const selected = options.find((option) => option.value === value)
  const choose = (next: string) => { if (controlled === undefined) setInternal(next); onValueChange?.(next); setOpen(false) }
  return <div className={cx("lex-select-menu", className)} data-open={open || undefined}>
    {label && <span className="lex-select-menu__label">{label}</span>}
    <button type="button" className="lex-select-menu__trigger" aria-haspopup="listbox" aria-expanded={open} disabled={disabled} onClick={() => setOpen((current) => !current)}><span data-placeholder={!selected || undefined}>{selected?.label ?? placeholder}</span><ChevronDown size={16} /></button>
    {open && <div className="lex-select-menu__content" role="listbox" aria-label={label}>{options.map((option) => <button type="button" className="lex-select-menu__item" role="option" aria-selected={option.value === value} disabled={option.disabled} key={option.value} onClick={() => choose(option.value)}><Check size={15} aria-hidden="true" />{option.label}</button>)}</div>}
  </div>
}
