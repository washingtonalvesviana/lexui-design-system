"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cx } from "../lib/cx"

export interface SliderProps extends Omit<React.ComponentProps<typeof BaseSlider.Root<number>>, "className"> {
  label: string
  showValue?: boolean
  className?: string
}

export function Slider({ label, showValue = true, className, ...props }: SliderProps) {
  return <BaseSlider.Root<number> className={cx("lex-slider", className)} {...props}><div className="lex-slider__meta"><BaseSlider.Label>{label}</BaseSlider.Label>{showValue && <BaseSlider.Value />}</div><BaseSlider.Control className="lex-slider__control"><BaseSlider.Track className="lex-slider__track"><BaseSlider.Indicator className="lex-slider__indicator" /></BaseSlider.Track><BaseSlider.Thumb className="lex-slider__thumb" getAriaLabel={() => label} /></BaseSlider.Control></BaseSlider.Root>
}

export interface RangeSliderProps extends Omit<React.ComponentProps<typeof BaseSlider.Root<readonly number[]>>, "className"> {
  label: string
  className?: string
}

export function RangeSlider({ label, className, ...props }: RangeSliderProps) {
  return <BaseSlider.Root<readonly number[]> className={cx("lex-slider", className)} {...props}><div className="lex-slider__meta"><BaseSlider.Label>{label}</BaseSlider.Label><BaseSlider.Value>{(formatted) => formatted.join(" – ")}</BaseSlider.Value></div><BaseSlider.Control className="lex-slider__control"><BaseSlider.Track className="lex-slider__track"><BaseSlider.Indicator className="lex-slider__indicator" /></BaseSlider.Track><BaseSlider.Thumb className="lex-slider__thumb" index={0} getAriaLabel={() => `${label}, mínimo`} /><BaseSlider.Thumb className="lex-slider__thumb" index={1} getAriaLabel={() => `${label}, máximo`} /></BaseSlider.Control></BaseSlider.Root>
}
