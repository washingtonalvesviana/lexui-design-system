"use client"

import * as React from "react"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import { cx } from "../lib/cx.js"

export type ToggleVariant = "default" | "outline"
export interface ToggleProps extends Omit<React.ComponentProps<typeof BaseToggle<string>>, "className"> { variant?: ToggleVariant; className?: string }
export function Toggle({ className, variant = "default", ...props }: ToggleProps) { return <BaseToggle<string> className={cx("lex-toggle", className)} data-variant={variant} {...props} /> }
export function ToggleGroup({ className, ...props }: Omit<React.ComponentProps<typeof BaseToggleGroup<string>>, "className"> & { className?: string }) { return <BaseToggleGroup<string> className={cx("lex-toggle-group", className)} {...props} /> }
