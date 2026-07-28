"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cx } from "../lib/cx"

export const Tabs = BaseTabs.Root

type TabsListProps = Omit<React.ComponentProps<typeof BaseTabs.List>, "className"> & { className?: string }
type TabsTriggerProps = Omit<React.ComponentProps<typeof BaseTabs.Tab>, "className"> & { className?: string }
type TabsPanelProps = Omit<React.ComponentProps<typeof BaseTabs.Panel>, "className"> & { className?: string }

export function TabsList({ className, children, ...props }: TabsListProps) {
  return <BaseTabs.List className={cx("lex-tabs__list", className)} {...props}>{children}<BaseTabs.Indicator className="lex-tabs__indicator" /></BaseTabs.List>
}
export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return <BaseTabs.Tab className={cx("lex-tabs__trigger", className)} {...props} />
}
export function TabsContent({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={cx("lex-tabs__content", className)} {...props} />
}
