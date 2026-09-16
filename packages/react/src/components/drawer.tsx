"use client"

import * as React from "react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import { X } from "lucide-react"
import { cx } from "../lib/cx.js"

export const Drawer = BaseDrawer.Root
export const DrawerTrigger = BaseDrawer.Trigger
export const DrawerClose = BaseDrawer.Close

export type DrawerPosition = "bottom" | "start" | "end" | "top"

export function DrawerContent({ className, children, position = "bottom", ...props }: Omit<React.ComponentProps<typeof BaseDrawer.Popup>, "className"> & { className?: string } & { position?: DrawerPosition }) {
  return <BaseDrawer.Portal><BaseDrawer.Backdrop className="lex-drawer__backdrop" /><BaseDrawer.Viewport className="lex-drawer__viewport" data-position={position}><BaseDrawer.Popup className={cx("lex-drawer__popup", className)} {...props}><BaseDrawer.Content className="lex-drawer__content">{children}</BaseDrawer.Content><BaseDrawer.Close className="lex-drawer__close" aria-label="Fechar"><X size={18} /></BaseDrawer.Close></BaseDrawer.Popup></BaseDrawer.Viewport></BaseDrawer.Portal>
}

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <header className={cx("lex-drawer__header", className)} {...props} /> }
export function DrawerTitle({ className, ...props }: Omit<React.ComponentProps<typeof BaseDrawer.Title>, "className"> & { className?: string }) { return <BaseDrawer.Title className={cx("lex-dialog__title", className)} {...props} /> }
export function DrawerDescription({ className, ...props }: Omit<React.ComponentProps<typeof BaseDrawer.Description>, "className"> & { className?: string }) { return <BaseDrawer.Description className={cx("lex-dialog__description", className)} {...props} /> }
export function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <footer className={cx("lex-drawer__footer", className)} {...props} /> }
