"use client"

import * as React from "react"
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import { cx } from "../lib/cx"

export const AlertDialog = BaseAlertDialog.Root
export const AlertDialogTrigger = BaseAlertDialog.Trigger
export const AlertDialogClose = BaseAlertDialog.Close

export function AlertDialogContent({ className, ...props }: Omit<React.ComponentProps<typeof BaseAlertDialog.Popup>, "className"> & { className?: string }) {
  return <BaseAlertDialog.Portal><BaseAlertDialog.Backdrop className="lex-dialog__backdrop" /><BaseAlertDialog.Viewport className="lex-dialog__viewport"><BaseAlertDialog.Popup className={cx("lex-dialog__popup lex-alert-dialog__popup", className)} {...props} /></BaseAlertDialog.Viewport></BaseAlertDialog.Portal>
}

export function AlertDialogTitle({ className, ...props }: Omit<React.ComponentProps<typeof BaseAlertDialog.Title>, "className"> & { className?: string }) {
  return <BaseAlertDialog.Title className={cx("lex-dialog__title", className)} {...props} />
}

export function AlertDialogDescription({ className, ...props }: Omit<React.ComponentProps<typeof BaseAlertDialog.Description>, "className"> & { className?: string }) {
  return <BaseAlertDialog.Description className={cx("lex-dialog__description", className)} {...props} />
}

export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <footer className={cx("lex-dialog__footer", className)} {...props} />
}
