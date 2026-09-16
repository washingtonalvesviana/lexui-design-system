"use client"

import * as React from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import { Check } from "lucide-react"
import { cx } from "../lib/cx.js"

export const DropdownMenu = BaseMenu.Root
export const DropdownMenuTrigger = BaseMenu.Trigger
export const DropdownMenuGroup = BaseMenu.Group
export const DropdownMenuRadioGroup = BaseMenu.RadioGroup

export function DropdownMenuContent({ className, sideOffset = 8, align, ...props }: Omit<React.ComponentProps<typeof BaseMenu.Popup>, "className"> & { className?: string; sideOffset?: number; align?: "start" | "center" | "end" }) {
  return <BaseMenu.Portal><BaseMenu.Positioner sideOffset={sideOffset} align={align}><BaseMenu.Popup className={cx("lex-menu__popup", className)} {...props} /></BaseMenu.Positioner></BaseMenu.Portal>
}

export function DropdownMenuItem({ className, ...props }: Omit<React.ComponentProps<typeof BaseMenu.Item>, "className"> & { className?: string }) {
  return <BaseMenu.Item className={cx("lex-menu__item", className)} {...props} />
}

export function DropdownMenuCheckboxItem({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseMenu.CheckboxItem>, "className"> & { className?: string }) {
  return <BaseMenu.CheckboxItem className={cx("lex-menu__item lex-menu__check-item", className)} {...props}><BaseMenu.CheckboxItemIndicator className="lex-menu__indicator"><Check size={15} /></BaseMenu.CheckboxItemIndicator>{children}</BaseMenu.CheckboxItem>
}

export function DropdownMenuRadioItem({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseMenu.RadioItem>, "className"> & { className?: string }) {
  return <BaseMenu.RadioItem className={cx("lex-menu__item lex-menu__check-item", className)} {...props}><BaseMenu.RadioItemIndicator className="lex-menu__indicator"><span className="lex-menu__radio-dot" /></BaseMenu.RadioItemIndicator>{children}</BaseMenu.RadioItem>
}

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("lex-menu__label", className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: Omit<React.ComponentProps<typeof BaseMenu.Separator>, "className"> & { className?: string }) {
  return <BaseMenu.Separator className={cx("lex-menu__separator", className)} {...props} />
}
