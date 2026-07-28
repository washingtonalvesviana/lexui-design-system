"use client"

import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cx } from "../lib/cx"

export const Dialog = BaseDialog.Root
export const DialogTrigger = BaseDialog.Trigger
export const DialogClose = BaseDialog.Close

type DialogPopupProps = Omit<React.ComponentProps<typeof BaseDialog.Popup>, "className"> & { className?: string }
type DialogTitleProps = Omit<React.ComponentProps<typeof BaseDialog.Title>, "className"> & { className?: string }
type DialogDescriptionProps = Omit<React.ComponentProps<typeof BaseDialog.Description>, "className"> & { className?: string }

export function DialogContent({ className, children, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="lex-dialog__backdrop" />
      <BaseDialog.Viewport className="lex-dialog__viewport">
        <BaseDialog.Popup className={cx("lex-dialog__popup", className)} {...props}>
          {children}
          <BaseDialog.Close className="lex-dialog__close" aria-label="Fechar">
            <X size={18} aria-hidden="true" />
          </BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cx("lex-dialog__header", className)} {...props} />
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <BaseDialog.Title className={cx("lex-dialog__title", className)} {...props} />
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <BaseDialog.Description className={cx("lex-dialog__description", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <footer className={cx("lex-dialog__footer", className)} {...props} />
}
