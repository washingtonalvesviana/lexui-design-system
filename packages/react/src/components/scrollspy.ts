"use client"

import * as React from "react"

export interface ScrollSpyOptions {
  /** ids (ou seletores de anchor) na ordem da página. */
  ids: string[]
  /** Distância do topo considerada como início da seção ativa. */
  offset?: number
}

export function useScrollSpy({ ids, offset = 96 }: ScrollSpyOptions) {
  const [activeId, setActiveId] = React.useState<string | null>(ids[0] ?? null)
  const key = ids.join(",")

  React.useEffect(() => {
    const list = key.split(",").filter(Boolean)
    const update = () => {
      let current = list[0] ?? null
      for (const id of list) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top - offset <= 0) current = id
      }
      setActiveId((previous) => (previous === current ? previous : current))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [key, offset])

  return activeId
}
