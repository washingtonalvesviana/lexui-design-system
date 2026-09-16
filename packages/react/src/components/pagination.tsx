"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button.js"

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  label?: string
}

export function Pagination({ page, totalPages, onPageChange, label = "Paginação" }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1)
  return <nav className="lex-pagination" aria-label={label}>
    <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Página anterior"><ChevronLeft size={16} /></Button>
    <div className="lex-pagination__pages">{pages.map((item, index) => <span key={item} className="lex-pagination__item">{index > 0 && item - pages[index - 1] > 1 && <span aria-hidden="true">…</span>}<Button variant={item === page ? "primary" : "ghost"} size="icon" aria-current={item === page ? "page" : undefined} onClick={() => onPageChange(item)} aria-label={`Página ${item}`}>{item}</Button></span>)}</div>
    <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Próxima página"><ChevronRight size={16} /></Button>
  </nav>
}
