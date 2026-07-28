import Link from "next/link"
import { UserPlus } from "lucide-react"
import { Button, Field, Input } from "@lexui/react"
import { AuthShell } from "../../../components/auth-shell"

export default function RegisterPage() {
  return <AuthShell title="Crie sua conta" description="Comece com uma organização e convide sua equipe depois." footer={<p>Já possui conta? <Link href="/login">Entrar</Link></p>}>
    <form className="demo-form" action="/mfa">
      <Field label="Nome completo" htmlFor="name"><Input id="name" name="name" autoComplete="name" required /></Field>
      <Field label="E-mail profissional" htmlFor="email"><Input id="email" name="email" type="email" autoComplete="email" required /></Field>
      <Field label="Senha" htmlFor="password" description="Mínimo de 8 caracteres."><Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} /></Field>
      <Button type="submit" size="lg"><UserPlus size={17} /> Criar conta</Button>
    </form>
  </AuthShell>
}
