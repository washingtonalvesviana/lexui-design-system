"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cx } from "../lib/cx.js"

type CarouselContextValue = { index: number; count: number; register: (count: number) => void; go: (index: number) => void }
const CarouselContext = React.createContext<CarouselContextValue | null>(null)

export function Carousel({ defaultIndex = 0, onIndexChange, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { defaultIndex?: number; onIndexChange?: (index: number) => void }) {
  const [index, setIndex] = React.useState(defaultIndex)
  const [count, setCount] = React.useState(0)
  const go = React.useCallback((next: number) => { const value = count ? (next + count) % count : 0; setIndex(value); onIndexChange?.(value) }, [count, onIndexChange])
  return <CarouselContext.Provider value={{ index, count, register: setCount, go }}><div className={cx("lex-carousel", className)} aria-roledescription="carrossel" {...props}>{children}</div></CarouselContext.Provider>
}
export function CarouselContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("CarouselContent deve estar dentro de Carousel")
  const items = React.Children.toArray(children)
  React.useEffect(() => context.register(items.length), [items.length, context.register])
  return <div className={cx("lex-carousel__viewport", className)} {...props}><div className="lex-carousel__track" style={{ transform: `translateX(-${context.index * 100}%)` }}>{items}</div></div>
}
export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cx("lex-carousel__item", className)} role="group" aria-roledescription="slide" {...props} /> }
export function CarouselPrevious({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { const context = React.useContext(CarouselContext); if (!context) throw new Error("CarouselPrevious deve estar dentro de Carousel"); return <button type="button" className={cx("lex-carousel__button", className)} data-side="previous" aria-label="Slide anterior" {...props} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.go(context.index - 1) }}><ChevronLeft size={18} /></button> }
export function CarouselNext({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { const context = React.useContext(CarouselContext); if (!context) throw new Error("CarouselNext deve estar dentro de Carousel"); return <button type="button" className={cx("lex-carousel__button", className)} data-side="next" aria-label="Próximo slide" {...props} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.go(context.index + 1) }}><ChevronRight size={18} /></button> }
export function CarouselDots({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { const context = React.useContext(CarouselContext); if (!context) throw new Error("CarouselDots deve estar dentro de Carousel"); return <div className={cx("lex-carousel__dots", className)} {...props}>{Array.from({ length: context.count }, (_, index) => <button type="button" key={index} aria-label={`Ir para slide ${index + 1}`} aria-current={context.index === index ? "true" : undefined} onClick={() => context.go(index)} />)}</div> }
