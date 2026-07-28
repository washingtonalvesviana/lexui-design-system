"use client"

import * as React from "react"
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu"
import { Check } from "lucide-react"
import { cx } from "../lib/cx"

export const ContextMenu = BaseContextMenu.Root
export function ContextMenuTrigger({ className, ...props }: Omit<React.ComponentProps<typeof BaseContextMenu.Trigger>, "className"> & { className?: string }) { return <BaseContextMenu.Trigger className={cx("lex-context-trigger", className)} {...props} /> }
export function ContextMenuContent({ className, ...props }: Omit<React.ComponentProps<typeof BaseContextMenu.Popup>, "className"> & { className?: string }) { return <BaseContextMenu.Portal><BaseContextMenu.Positioner><BaseContextMenu.Popup className={cx("lex-menu__popup", className)} {...props} /></BaseContextMenu.Positioner></BaseContextMenu.Portal> }
export function ContextMenuItem({ className, ...props }: Omit<React.ComponentProps<typeof BaseContextMenu.Item>, "className"> & { className?: string }) { return <BaseContextMenu.Item className={cx("lex-menu__item", className)} {...props} /> }
export function ContextMenuCheckboxItem({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseContextMenu.CheckboxItem>, "className"> & { className?: string }) { return <BaseContextMenu.CheckboxItem className={cx("lex-menu__item lex-menu__check-item", className)} {...props}><BaseContextMenu.CheckboxItemIndicator className="lex-menu__indicator"><Check size={15} /></BaseContextMenu.CheckboxItemIndicator>{children}</BaseContextMenu.CheckboxItem> }
export function ContextMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-menu__label", className)} {...props} /> }
export function ContextMenuSeparator({ className, ...props }: Omit<React.ComponentProps<typeof BaseContextMenu.Separator>, "className"> & { className?: string }) { return <BaseContextMenu.Separator className={cx("lex-menu__separator", className)} {...props} /> }
