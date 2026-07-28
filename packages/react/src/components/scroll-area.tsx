"use client"

import * as React from "react"
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import { cx } from "../lib/cx"

export function ScrollArea({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseScrollArea.Root>, "className"> & { className?: string }) {
  return <BaseScrollArea.Root className={cx("lex-scroll-area", className)} {...props}><BaseScrollArea.Viewport className="lex-scroll-area__viewport"><BaseScrollArea.Content className="lex-scroll-area__content">{children}</BaseScrollArea.Content></BaseScrollArea.Viewport><BaseScrollArea.Scrollbar className="lex-scroll-area__scrollbar" orientation="vertical"><BaseScrollArea.Thumb className="lex-scroll-area__thumb" /></BaseScrollArea.Scrollbar><BaseScrollArea.Scrollbar className="lex-scroll-area__scrollbar" orientation="horizontal"><BaseScrollArea.Thumb className="lex-scroll-area__thumb" /></BaseScrollArea.Scrollbar><BaseScrollArea.Corner className="lex-scroll-area__corner" /></BaseScrollArea.Root>
}
