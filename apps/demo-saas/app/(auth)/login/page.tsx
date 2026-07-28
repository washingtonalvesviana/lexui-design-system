import Link from "next/link"
import { Building2, LogIn } from "lucide-react"
import { Button, Field, Input } from "@lexui/react"
import { AuthShell } from "../../../components/auth-shell"

export default function LoginPage() {
  return <AuthShell title="Entre na sua conta" description="Use suas credenciais para continuar." footer={<p>Não possui uma conta? <Link href="/register">Criar conta</Link></p>}>
    <form className="demo-form" action="/dashboard">
      <Field label="E-mail" htmlFor="email"><Input id="email" name="email" type="email" autoComplete="email" placeholder="nome@empresa.com" required /></Field>
      <Field label="Senha" htmlFor="password"><Input id="password" name="password" type="password" autoComplete="current-password" required /></Field>
      <div className="demo-form__meta"><label><input type="checkbox" /> Manter conectado</label><Link href="/forgot-password">Esqueci a senha</Link></div>
      <Button type="submit" size="lg"><LogIn size={17} /> Entrar</Button>
      <Link href="/dashboard" className="lex-button" data-variant="outline" data-size="lg"><Building2 size={17} /> Continuar com SSO</Link>
    </form>
  </AuthShell>
}
