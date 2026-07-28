import Link from "next/link"
import { Mail } from "lucide-react"
import { Alert, Button, Field, Input } from "@lexui/react"
import { AuthShell } from "../../../components/auth-shell"

export default function ForgotPasswordPage() {
  return <AuthShell title="Recupere seu acesso" description="Enviaremos instruções para o e-mail cadastrado." footer={<Link href="/login">Voltar para o login</Link>}>
    <form className="demo-form" action="/login">
      <Alert title="Ambiente demonstrativo">Nenhum e-mail real será enviado.</Alert>
      <Field label="E-mail" htmlFor="email"><Input id="email" type="email" autoComplete="email" required /></Field>
      <Button type="submit" size="lg"><Mail size={17} /> Enviar instruções</Button>
    </form>
  </AuthShell>
}
