"use client"

import * as React from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import { CircleCheck, CircleAlert, Info, X } from "lucide-react"

export type ToastVariant = "info" | "success" | "warning" | "danger"
export type ToastOptions = { title: React.ReactNode; description?: React.ReactNode; variant?: ToastVariant; timeout?: number }

const ToastContext = React.createContext<((options: ToastOptions) => string) | null>(null)

function ToastViewport() {
  const manager = BaseToast.useToastManager<{ variant?: ToastVariant }>()
  const icons = { info: Info, success: CircleCheck, warning: CircleAlert, danger: CircleAlert }
  return <BaseToast.Portal><BaseToast.Viewport className="lex-toast__viewport">{manager.toasts.map((toast) => { const variant = toast.data?.variant ?? "info"; const Icon = icons[variant]; return <BaseToast.Root key={toast.id} toast={toast} className="lex-toast" data-variant={variant}><Icon className="lex-toast__icon" size={19} aria-hidden="true" /><BaseToast.Content className="lex-toast__content"><BaseToast.Title className="lex-toast__title" />{toast.description && <BaseToast.Description className="lex-toast__description" />}</BaseToast.Content><BaseToast.Close className="lex-toast__close" aria-label="Fechar aviso"><X size={16} /></BaseToast.Close></BaseToast.Root> })}</BaseToast.Viewport></BaseToast.Portal>
}

function ToastBridge({ children }: { children: React.ReactNode }) {
  const manager = BaseToast.useToastManager<{ variant?: ToastVariant }>()
  const notify = React.useCallback((options: ToastOptions) => manager.add({ title: options.title, description: options.description, timeout: options.timeout, type: options.variant, data: { variant: options.variant } }), [manager])
  return <ToastContext.Provider value={notify}>{children}<ToastViewport /></ToastContext.Provider>
}

export function ToastProvider({ children, timeout = 5000, limit = 3 }: { children: React.ReactNode; timeout?: number; limit?: number }) {
  return <BaseToast.Provider timeout={timeout} limit={limit}><ToastBridge>{children}</ToastBridge></BaseToast.Provider>
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast deve ser usado dentro de ToastProvider")
  return context
}
