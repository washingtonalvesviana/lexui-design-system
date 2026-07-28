import Link from "next/link"

export function AuthShell({ title, description, children, footer }: { title: string; description: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return <main className="demo-auth">
    <section className="demo-auth__brand" aria-label="LexUI">
      <Link className="demo-brand" href="/dashboard"><span className="demo-brand__mark">L</span><span>LexUI</span></Link>
      <div><p className="demo-eyebrow">SaaS Reference</p><h1>Interfaces coerentes.<br />Produtos mais rápidos.</h1><p>Uma aplicação navegável construída exclusivamente com o Design System LexUI.</p></div>
    </section>
    <section className="demo-auth__form"><div className="demo-auth__panel"><header><p className="demo-eyebrow">Bem-vindo</p><h2>{title}</h2><p>{description}</p></header>{children}{footer && <footer>{footer}</footer>}</div></section>
  </main>
}
