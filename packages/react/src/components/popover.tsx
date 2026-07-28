"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { cx } from "../lib/cx"

export const Popover = BasePopover.Root
export const PopoverTrigger = BasePopover.Trigger
export const PopoverClose = BasePopover.Close

export function PopoverContent({ className, sideOffset = 8, align = "start", children, ...props }: Omit<React.ComponentProps<typeof BasePopover.Popup>, "className"> & { className?: string; sideOffset?: number; align?: "start" | "center" | "end" }) {
  return <BasePopover.Portal><BasePopover.Positioner className="lex-popover__positioner" sideOffset={sideOffset} align={align}><BasePopover.Popup className={cx("lex-popover__popup", className)} {...props}>{children}<BasePopover.Arrow className="lex-popover__arrow" /></BasePopover.Popup></BasePopover.Positioner></BasePopover.Portal>
}

export function PopoverTitle({ className, ...props }: Omit<React.ComponentProps<typeof BasePopover.Title>, "className"> & { className?: string }) {
  return <BasePopover.Title className={cx("lex-popover__title", className)} {...props} />
}

export function PopoverDescription({ className, ...props }: Omit<React.ComponentProps<typeof BasePopover.Description>, "className"> & { className?: string }) {
  return <BasePopover.Description className={cx("lex-popover__description", className)} {...props} />
}
