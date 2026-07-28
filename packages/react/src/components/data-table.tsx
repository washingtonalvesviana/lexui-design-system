"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react"
import { Button } from "./button"
import { Input } from "./field"
import { Pagination } from "./pagination"
import { Table, TableCell, TableContainer, TableHead } from "./table"
import { cx } from "../lib/cx"

export interface DataTableColumn<T> {
  id: string
  header: React.ReactNode
  accessor?: keyof T
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
  align?: "left" | "center" | "right"
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  rowId: (row: T) => string
  searchable?: boolean
  searchPlaceholder?: string
  searchText?: (row: T) => string
  pageSize?: number
  emptyTitle?: string
  emptyDescription?: string
  actions?: React.ReactNode
  className?: string
}

export function DataTable<T>({ data, columns, rowId, searchable = true, searchPlaceholder = "Buscar…", searchText, pageSize = 8, emptyTitle = "Nenhum resultado", emptyDescription = "Ajuste a busca ou os filtros para continuar.", actions, className }: DataTableProps<T>) {
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<{ id: string; direction: "asc" | "desc" } | null>(null)
  const [page, setPage] = React.useState(1)
  const filtered = React.useMemo(() => { const normalized = query.trim().toLocaleLowerCase("pt-BR"); const rows = !normalized ? data : data.filter((row) => (searchText?.(row) ?? JSON.stringify(row)).toLocaleLowerCase("pt-BR").includes(normalized)); if (!sort) return rows; const column = columns.find((item) => item.id === sort.id); if (!column?.accessor) return rows; return [...rows].sort((a, b) => String(a[column.accessor!]).localeCompare(String(b[column.accessor!]), "pt-BR", { numeric: true }) * (sort.direction === "asc" ? 1 : -1)) }, [columns, data, query, searchText, sort])
  React.useEffect(() => setPage(1), [query, pageSize])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const toggleSort = (column: DataTableColumn<T>) => setSort((current) => current?.id !== column.id ? { id: column.id, direction: "asc" } : current.direction === "asc" ? { id: column.id, direction: "desc" } : null)
  return <div className={cx("lex-data-table", className)}>
    {(searchable || actions) && <div className="lex-data-table__toolbar">{searchable && <label className="lex-data-table__search"><Search size={17} aria-hidden="true" /><span className="lex-sr-only">Buscar na tabela</span><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} /></label>}<div className="lex-data-table__actions">{actions}</div></div>}
    <TableContainer><Table><thead><tr>{columns.map((column) => <TableHead key={column.id} style={{ textAlign: column.align }}>{column.sortable && column.accessor ? <button type="button" className="lex-data-table__sort" onClick={() => toggleSort(column)}>{column.header}{sort?.id === column.id ? sort.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} /> : <ArrowUpDown size={14} />}</button> : column.header}</TableHead>)}</tr></thead><tbody>{rows.map((row) => <tr key={rowId(row)}>{columns.map((column) => <TableCell key={column.id} style={{ textAlign: column.align }}>{column.cell ? column.cell(row) : column.accessor ? String(row[column.accessor] ?? "") : null}</TableCell>)}</tr>)}</tbody></Table></TableContainer>
    {!rows.length && <div className="lex-data-table__empty"><strong>{emptyTitle}</strong><span>{emptyDescription}</span></div>}
    {filtered.length > pageSize && <div className="lex-data-table__footer"><span>{filtered.length} registros</span><Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} /></div>}
  </div>
}
