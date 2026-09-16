import * as React from "react"
import { File, X } from "lucide-react"
import { cx } from "../lib/cx.js"

export function Attachment({ name, metadata, onRemove, icon, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { name: string; metadata?: string; onRemove?: () => void; icon?: React.ReactNode }) {
  return <div className={cx("lex-attachment", className)} {...props}><span className="lex-attachment__icon">{icon ?? <File size={18} />}</span><span className="lex-attachment__copy"><strong>{name}</strong>{metadata && <small>{metadata}</small>}</span>{onRemove && <button type="button" onClick={onRemove} aria-label={`Remover ${name}`} title={`Remover ${name}`}><X size={15} /></button>}</div>
}
export function Bubble({ role = "assistant", className, ...props }: React.HTMLAttributes<HTMLDivElement> & { role?: "assistant" | "user" | "system" }) { return <div className={cx("lex-bubble", className)} data-role={role} {...props} /> }
export function MessageScroller({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-message-scroller", className)} role="log" aria-live="polite" {...props} /> }
