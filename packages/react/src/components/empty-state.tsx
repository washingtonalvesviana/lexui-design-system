import * as React from "react"
import { Inbox } from "lucide-react"
import { cx } from "../lib/cx"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action, className, ...props }: EmptyStateProps) {
  return <div className={cx("lex-empty", className)} {...props}>
    <div className="lex-empty__icon">{icon || <Inbox size={24} aria-hidden="true" />}</div>
    <strong>{title}</strong><p>{description}</p>{action && <div className="lex-empty__action">{action}</div>}
  </div>
}
