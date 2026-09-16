import * as React from "react"
import { cx } from "../lib/cx.js"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  htmlFor: string
  description?: string
  error?: string
  optional?: boolean
  /** Alinha o rótulo à esquerda (em telas ≥ 641px). */
  horizontal?: boolean
}

export function Field({ label, htmlFor, description, error, optional, horizontal, className, children, ...props }: FieldProps) {
  return (
    <div className={cx("lex-field", className)} data-invalid={Boolean(error) || undefined} data-horizontal={horizontal || undefined} {...props}>
      <div className="lex-field__label-row">
        <label className="lex-field__label" htmlFor={htmlFor}>{label}</label>
        {optional && <span className="lex-field__optional">Opcional</span>}
      </div>
      {children}
      {(error || description) && (
        <p className="lex-field__message" id={`${htmlFor}-message`} role={error ? "alert" : undefined}>
          {error || description}
        </p>
      )}
    </div>
  )
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props }, ref,
) {
  return <input ref={ref} className={cx("lex-input", className)} {...props} />
})

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...props }, ref,
) {
  return <textarea ref={ref} className={cx("lex-input lex-textarea", className)} {...props} />
})

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, ...props }, ref,
) {
  return <select ref={ref} className={cx("lex-input lex-select", className)} {...props} />
})

/** Explicit name for the native HTML select. `Select` remains as a compatible alias. */
export const NativeSelect = Select

export function FloatingLabel({ htmlFor, label, children }: { htmlFor: string; label: string; children: React.ReactElement }) {
  const child = children as React.ReactElement<Record<string, unknown>>
  const field = React.cloneElement(child, { id: (child.props.id as string | undefined) ?? htmlFor, placeholder: (child.props.placeholder as string | undefined) ?? " " })
  return (
    <div className="lex-floating-label">
      {field}
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  )
}

export function Fieldset({ legend, className, children, ...props }: React.FieldsetHTMLAttributes<HTMLFieldSetElement> & { legend: string }) {
  return (
    <fieldset className={cx("lex-fieldset", className)} {...props}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}
