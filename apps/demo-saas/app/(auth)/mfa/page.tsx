import Link from "next/link"
import { KeyRound, ShieldCheck } from "lucide-react"
import { Button, Field, InputOTP } from "@lexui/react"
import { AuthShell } from "../../../components/auth-shell"

export default function MfaPage() {
  return <AuthShell title="Verificação em duas etapas" description="Digite o código de seis dígitos do seu aplicativo autenticador." footer={<Link href="/login">Usar outra conta</Link>}>
    <form className="demo-form" action="/dashboard">
      <Field label="Código de autenticação" htmlFor="code"><InputOTP id="code" name="code" length={6} required /></Field>
      <Button type="submit" size="lg"><ShieldCheck size={17} /> Verificar</Button>
      <Link href="/dashboard" className="lex-button" data-variant="ghost" data-size="lg"><KeyRound size={17} /> Usar código de recuperação</Link>
    </form>
  </AuthShell>
}
