import type { Metadata } from "next"
import "@lexui/tokens/theme.css"
import "@lexui/react/styles.css"
import "@lexui/charts/styles.css"
import "./demo.css"
import { ToastProvider } from "@lexui/react"

export const metadata: Metadata = {
  title: "LexUI SaaS Demo",
  description: "Aplicação de referência oficial do Design System LexUI",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-theme="dark"><body><ToastProvider>{children}</ToastProvider></body></html>
}
