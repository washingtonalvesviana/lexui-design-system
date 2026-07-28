import { LoaderCircle } from "lucide-react"

export function Spinner({ label = "Carregando" }: { label?: string }) {
  return <LoaderCircle className="lex-spin" role="status" aria-label={label} />
}
