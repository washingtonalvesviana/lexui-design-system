"use client"

import * as React from "react"
import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { Check, ChevronDown, X } from "lucide-react"
import { cx } from "../lib/cx.js"

export interface ComboboxOption { value: string; label: string; description?: string; disabled?: boolean }
export interface ComboboxProps {
  options: ComboboxOption[]
  value?: ComboboxOption | null
  defaultValue?: ComboboxOption | null
  onValueChange?: (option: ComboboxOption | null) => void
  placeholder?: string
  emptyMessage?: string
  disabled?: boolean
  required?: boolean
  name?: string
  className?: string
  "aria-label"?: string
}

export function Combobox({ options, value, defaultValue, onValueChange, placeholder = "Buscar ou selecionar", emptyMessage = "Nenhum resultado", className, "aria-label": ariaLabel = "Selecionar opção", ...props }: ComboboxProps) {
  return <BaseCombobox.Root<ComboboxOption> items={options} value={value} defaultValue={defaultValue} onValueChange={onValueChange} itemToStringLabel={(item) => item.label} itemToStringValue={(item) => item.value} isItemEqualToValue={(item, selected) => item.value === selected.value} {...props}><BaseCombobox.InputGroup className={cx("lex-combobox__input-group", className)}><BaseCombobox.Input className="lex-combobox__input" placeholder={placeholder} aria-label={ariaLabel} /><BaseCombobox.Clear className="lex-combobox__clear" aria-label="Limpar seleção"><X size={15} /></BaseCombobox.Clear><BaseCombobox.Trigger className="lex-combobox__trigger" aria-label="Abrir opções"><ChevronDown size={17} /></BaseCombobox.Trigger></BaseCombobox.InputGroup><BaseCombobox.Portal><BaseCombobox.Positioner className="lex-combobox__positioner" sideOffset={6}><BaseCombobox.Popup className="lex-combobox__popup"><BaseCombobox.Empty className="lex-combobox__empty">{emptyMessage}</BaseCombobox.Empty><BaseCombobox.List className="lex-combobox__list">{(option: ComboboxOption) => <BaseCombobox.Item key={option.value} value={option} disabled={option.disabled} className="lex-combobox__item"><BaseCombobox.ItemIndicator className="lex-combobox__indicator"><Check size={15} /></BaseCombobox.ItemIndicator><span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span></BaseCombobox.Item>}</BaseCombobox.List></BaseCombobox.Popup></BaseCombobox.Positioner></BaseCombobox.Portal></BaseCombobox.Root>
}
