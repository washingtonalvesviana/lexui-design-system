"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./button"

export type LexTheme = "light" | "dark"

export function ThemeToggle({ storageKey = "lexui-theme" }: { storageKey?: string }) {
  const [theme, setTheme] = React.useState<LexTheme>("dark")

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as LexTheme | null
    const initial = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(initial)
    document.documentElement.dataset.theme = initial
  }, [storageKey])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem(storageKey, next)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
