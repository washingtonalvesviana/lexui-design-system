import * as React from "react"
import { cx } from "../lib/cx"

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label: string
  showValue?: boolean
}

export function Progress({ className, label, showValue = true, value = 0, max = 100, ...props }: ProgressProps) {
  const percentage = typeof value === "number" ? Math.round((value / Number(max || 100)) * 100) : 0
  return <div className={cx("lex-progress", className)}>
    <div className="lex-progress__meta"><span>{label}</span>{showValue && <span>{percentage}%</span>}</div>
    <progress aria-label={label} value={value} max={max} {...props} />
  </div>
}
