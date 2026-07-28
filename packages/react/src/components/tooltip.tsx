"use client"

import * as React from "react"
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"

export const TooltipProvider = BaseTooltip.Provider

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return <BaseTooltip.Root><BaseTooltip.Trigger className="lex-tooltip__trigger" aria-label={label}>{children}</BaseTooltip.Trigger><BaseTooltip.Portal><BaseTooltip.Positioner sideOffset={8}><BaseTooltip.Popup className="lex-tooltip__popup">{label}<BaseTooltip.Arrow className="lex-tooltip__arrow" /></BaseTooltip.Popup></BaseTooltip.Positioner></BaseTooltip.Portal></BaseTooltip.Root>
}
