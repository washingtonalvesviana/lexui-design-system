"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./button.js"

export type LexTheme = "light" | "dark"
export type LexThemePreference = LexTheme | "system"
export const LEXUI_THEME_STORAGE_KEY = "lexui-theme"

// Script inline para o <head> da página: aplica o tema antes da primeira pintura (evita flash).
export const themePreloadScript = `(function(){try{var s=window.localStorage.getItem("${LEXUI_THEME_STORAGE_KEY}");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`

function readStoredPreference(storageKey: string): LexThemePreference | null {
  if (typeof window === "undefined") return null
  try {
    const stored = window.localStorage.getItem(storageKey)
    return stored === "light" || stored === "dark" || stored === "system" ? stored : null
  } catch { return null }
}

function systemTheme(): LexTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(preference: LexThemePreference): LexTheme {
  return preference === "system" ? systemTheme() : preference
}

interface ThemeContextValue {
  preference: LexThemePreference
  theme: LexTheme
  setPreference: (preference: LexThemePreference) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ storageKey = LEXUI_THEME_STORAGE_KEY, children }: { storageKey?: string; children: React.ReactNode }) {
  const [preference, setPreferenceState] = React.useState<LexThemePreference>(() => readStoredPreference(storageKey) ?? "system")
  const [theme, setTheme] = React.useState<LexTheme>(() => {
    const applied = typeof document !== "undefined" ? document.documentElement.dataset.theme : null
    if (applied === "light" || applied === "dark") return applied
    return resolveTheme(readStoredPreference(storageKey) ?? "system")
  })

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => { if (preference === "system") setTheme(systemTheme()) }
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [preference])

  React.useEffect(() => {
    if (document.documentElement.dataset.theme !== theme) document.documentElement.dataset.theme = theme
  }, [theme])

  const setPreference = React.useCallback((next: LexThemePreference) => {
    setPreferenceState(next)
    setTheme(resolveTheme(next))
    try { window.localStorage.setItem(storageKey, next) } catch { /* storage indisponível */ }
  }, [storageKey])

  const value = React.useMemo(() => ({ preference, theme, setPreference }), [preference, theme, setPreference])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>")
  return context
}

function ContextThemeToggle({ context }: { context: ThemeContextValue }) {
  const { theme, setPreference } = context
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setPreference(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}

function StandaloneThemeToggle({ storageKey }: { storageKey: string }) {
  const [theme, setTheme] = React.useState<LexTheme>(() => {
    const stored = readStoredPreference(storageKey)
    return stored === "light" || stored === "dark" ? stored : systemTheme()
  })

  React.useEffect(() => {
    const applied = document.documentElement.dataset.theme
    if (applied === "light" || applied === "dark") setTheme(applied)
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.dataset.theme = next
    try { window.localStorage.setItem(storageKey, next) } catch { /* storage indisponível */ }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}

export function ThemeToggle({ storageKey = LEXUI_THEME_STORAGE_KEY }: { storageKey?: string }) {
  const context = React.useContext(ThemeContext)
  return context ? <ContextThemeToggle context={context} /> : <StandaloneThemeToggle storageKey={storageKey} />
}
