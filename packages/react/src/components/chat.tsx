import * as React from "react"
import { cx } from "../lib/cx"

export function Chat({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cx("lex-chat", className)} {...props} />
}

export function ChatHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cx("lex-chat__header", className)} {...props} />
}

export function ChatMessages({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-chat__messages", className)} role="log" aria-live="polite" {...props} />
}

export interface ChatMessageProps extends React.HTMLAttributes<HTMLElement> {
  role?: "assistant" | "user" | "system"
  avatar?: React.ReactNode
  author?: string
  time?: string
}

export function ChatMessage({ role = "assistant", avatar, author, time, className, children, ...props }: ChatMessageProps) {
  return <article className={cx("lex-chat-message", className)} data-role={role} {...props}>
    {avatar && <div className="lex-chat-message__avatar">{avatar}</div>}
    <div className="lex-chat-message__column">
      {(author || time) && <div className="lex-chat-message__meta">{author && <strong>{author}</strong>}{time && <time>{time}</time>}</div>}
      <div className="lex-chat-message__content">{children}</div>
    </div>
  </article>
}

export function ChatComposer({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cx("lex-chat-composer", className)} {...props} />
}

export function ChatToolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-chat-toolbar", className)} {...props} />
}

export function ChatAttachment({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("lex-chat-attachment", className)} {...props} />
}

export function ChatTyping({ className, label = "Assistente está digitando" }: { className?: string; label?: string }) {
  return <span className={cx("lex-chat-typing", className)} role="status" aria-label={label}><i /><i /><i /></span>
}
