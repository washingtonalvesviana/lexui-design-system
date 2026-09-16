import type { Metadata } from "next"
import Script from "next/script"
import "@lexui/tokens/theme.css"
import "@lexui/react/styles.css"
import "@lexui/charts/styles.css"
import "@lexui/flow/styles.css"
import "./demo.css"
import { ThemeProvider, ToastProvider, themePreloadScript } from "@lexui/react"

export const metadata: Metadata = {
  title: "LexUI SaaS Demo",
  description: "Aplicação de referência oficial do Design System LexUI",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script strategy="beforeInteractive">{themePreloadScript}</Script>
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
