"use client"

import * as React from "react"
import { OTPField } from "@base-ui/react/otp-field"
import { cx } from "../lib/cx.js"

export interface InputOTPProps extends Omit<React.ComponentProps<typeof OTPField.Root>, "className" | "children"> {
  className?: string
  separatorAfter?: number
  "aria-label"?: string
}

export function InputOTP({ length = 6, className, separatorAfter = 3, "aria-label": ariaLabel = "Código de verificação", ...props }: InputOTPProps) {
  return <OTPField.Root length={length} className={cx("lex-otp", className)} aria-label={ariaLabel} {...props}>{Array.from({ length }, (_, index) => <React.Fragment key={index}><OTPField.Input className="lex-otp__input" aria-label={`Dígito ${index + 1} de ${length}`} />{index + 1 === separatorAfter && index + 1 < length && <OTPField.Separator className="lex-otp__separator">–</OTPField.Separator>}</React.Fragment>)}</OTPField.Root>
}
