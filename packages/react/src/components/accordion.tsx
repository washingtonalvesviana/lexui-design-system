"use client"

import * as React from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"
import { cx } from "../lib/cx.js"

export const Accordion = BaseAccordion.Root

export function AccordionItem({ className, ...props }: Omit<React.ComponentProps<typeof BaseAccordion.Item>, "className"> & { className?: string }) {
  return <BaseAccordion.Item className={cx("lex-accordion__item", className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseAccordion.Trigger>, "className"> & { className?: string }) {
  return <BaseAccordion.Header className="lex-accordion__header"><BaseAccordion.Trigger className={cx("lex-accordion__trigger", className)} {...props}>{children}<ChevronDown className="lex-accordion__chevron" size={18} aria-hidden="true" /></BaseAccordion.Trigger></BaseAccordion.Header>
}

export function AccordionContent({ className, children, ...props }: Omit<React.ComponentProps<typeof BaseAccordion.Panel>, "className"> & { className?: string }) {
  return <BaseAccordion.Panel className={cx("lex-accordion__panel", className)} {...props}><div className="lex-accordion__content">{children}</div></BaseAccordion.Panel>
}
