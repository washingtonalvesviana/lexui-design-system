import * as React from "react"
import { cx } from "../lib/cx.js"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fit?: "contain" | "cover" | "fill"
  rounded?: boolean
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image({ className, fit, rounded, ...props }, ref) {
  return <img ref={ref} className={cx("lex-image", className)} data-fit={fit} data-rounded={rounded || undefined} {...props} />
})
