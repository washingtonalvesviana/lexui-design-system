import * as React from "react"
import { cx } from "../lib/cx"

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
}

export function Avatar({ name, src, size = "md", className, ...props }: AvatarProps) {
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
  return <span className={cx("lex-avatar", className)} data-size={size} title={name} {...props}>
    {src ? <img src={src} alt={name} /> : <span aria-hidden="true">{initials}</span>}
    {!src && <span className="lex-visually-hidden">{name}</span>}
  </span>
}
