# Handoff — LexUI (dw-lex-ui)

Última atualização: 2026-09-16 03:15 UTC. Documento de memória para retomar em outra sessão.

## 1. Estado geral

- Design System **LexUI** (fonte canônica em `/home/ubuntu/dw-lex-ui`): monorepo pnpm + turbo.
  Pacotes: `@lexui/tokens`, `@lexui/react`, `@lexui/charts`, `@lexui/cli` · Apps: `demo-saas` (Next.js) e `storybook`.
- Ciclo do mapeamento Bootstrap→LexUI **concluído** (tokens z-index/gutter, 7 módulos novos, Grid, Navbar, ListGroup, Figure/Image, CloseButton, Offcanvas/Drawer, ScrollSpy, FloatingLabel, utilities `lex-utility-*`, docs, stories, registry CLI). Tarballs 0.2.0 em `artifacts/npm/`.
- Nesta sessão foram corrigidos 11 defeitos visuais do demo/catalogo (lista em §5).
- Última validação verde: typecheck 9/9 · build 6/6 · lexui:check 198 arquivos, 0 violações.

## 2. ⚠️ PRIORIDADE 1 — trabalho sem commit

- O repositório tem **1 commit de lançamento só**. Tudo o mais (73 arquivos modificados + 24 novos, ~1.940 linhas) está **solto no working tree**. Risco real de perda total.
- Recomendado: revisitar o `git status` e commitar (ex.: `feat: bootstrap coverage 0.2.0 + demo fixes`). Nunca assumir que "já está salvo".
- Arquivos novos principais: `packages/react/src/components/{grid,navbar,list-group,figure,image,close-button}.tsx`, `scrollspy.ts`, `foundations/grid.md` (live + template), `iconography.md` (template), `components/design-system/icons-reference.ts` (gerado), `scripts/collect-icons.mjs`.

## 3. Ambiente — armadilhas que já derrubaram sessões

- **Node**: o shell default é **v20.19.3** e o `pnpm` 11.9.0 falha nele (`ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`). Todo comando pnpm/typecheck/build exige antes:
  `export PATH=/root/.nvm/versions/node/v24.21.0/bin:$PATH` (v24.21.0 via nvm).
- **Produção**: Next.js em `127.0.0.1:3100` (build estático em `apps/demo-saas/.next`), nginx proxy em `/etc/nginx/sites-available/lexui.datawiseservice.com`, site público **https://lexui.datawiseservice.com**.
- **Reiniciar produção** (se a porta 3100 estiver parada):
  `ss -tln | grep 3100` → matar o pid → `cd apps/demo-saas && PATH=/root/.nvm/versions/node/v24.21.0/bin:$PATH node_modules/.bin/next start -p 3100` (rodar como processo persistente de background).
- **Storybook** (só local): `export PATH=...node24... && pnpm storybook` → http://127.0.0.1:6006.
- Verificação visual rápida via Chrome headless + CDP: `google-chrome --headless=new --no-sandbox --remote-debugging-port=9333 --user-data-dir=/tmp/chrome-prof about:blank` + Node ≥22 (WebSocket nativo). `--force-dark-mode` ou `Emulation.setEmulatedMedia` para dark.

## 4. Pipeline de validação obrigatório (regras do AGENTS.md)

```bash
export PATH=/root/.nvm/versions/node/v24.21.0/bin:$PATH
pnpm typecheck      # 9 tarefas (turbo)
pnpm build          # 6 tarefas
pnpm lexui:check    # CLI valida arquivos do design system
```
Depois: rebuild mudou → reiniciar o next (item 3). Usuário precisa de **hard refresh** no navegador (CSS antigo em cache causa falsos positivos).

## 5. Correções desta sessão (todas validadas via CDP)

1. **Botão primary invisível** (`/design-system`): `a { color: var(--lex-primary) }` sem layer no demo derrotava a layer `lexui.components` → texto com cor do fundo. Reboot do demo agora dentro de `@layer lexui.base { }` (`apps/demo-saas/app/demo.css`).
2. **Rotulagem da categoria Layout** faltando em `apps/demo-saas/app/(product)/design-system/page.tsx` (quebrava typecheck).
3. **Drawer/Sheet**: exemplo "Painel lateral" sem `position` → abria embaixo no desktop. Drawer demo `position="end"`, Sheet `position="start"`. Componente estava correto (4 posições; <640px tudo vira bottom sheet por design).
4. **Card sem header**: `.lex-card__content` tinha `padding-top: 0` → regra `.lex-card > .lex-card__content:first-child { padding-top: var(--lex-space-5); }` em `packages/react/src/styles.css`.
5. **Grid**: classes `demo-grid-cell/--alt/--accent` não existiam → criadas no demo.css (100% tokens).
6. **Utilities**: demo usava `lex-utility-flex` (inexistente; correta é `lex-utility-display-flex`) e `lex-utility-mb-4` (inexistente).
7. **Tabs**: scrollbar vertical interna — `overflow-x:auto` força `overflow-y:auto`; 1px de overflow do indicador absoluto → `overflow-y: hidden` no `.lex-tabs__list`.
8. **AspectRatio**: componente OK (16:9 exato); faltava `demo-aspect-preview` no demo.css.
9. **ScrollSpy**: nav sem gap (mesmo bug 6) e seções com `minHeight: 11rem` tornavam a página inescroável → seções `100vh`; tracking validado nos 3 estados + fim da página.
10. **Item**: botão "⋯" inerte → virou `DropdownMenu` (Visualizar/Editar/Excluir + toasts). Novo prop público `align?: "start"|"center"|"end"` em `DropdownMenuContent` (mesmo padrão do PopoverContent); demo usa `align="end"`; doc + story atualizados.
11. **Figure**: exemplo exibia `BarChart` dentro de `FigureImage` (semântica errada) → agora `Image` + figcaption.

## 6. Biblioteca de ícones (última entrega)

- **Lucide-react 1.27.0** é a família oficial (regras em `foundations/iconography.md`, live+template).
- Página `/design-system/components/iconography` (Fundamentos): tamanhos, semântica, ações-only e **referência dos 98 ícones em uso** (glifo + nome + nº de arquivos).
- Referência é **gerada**: `pnpm icons:reference` (→ `scripts/collect-icons.mjs` → `apps/demo-saas/components/design-system/icons-reference.ts`). Rodar sempre que importarem novo ícone.
- Story `Iconografia` em `apps/storybook/stories/foundations.stories.tsx`.

## 7. Padrão raiz que se repetiu (importante para a próxima sessão)

8 dos 11 bugs eram o MESMO: **exemplos do demo referenciavam classes CSS inexistentes** (`demo-grid-cell`, `demo-aspect-preview`, `lex-utility-flex`…) — criadas na sessão anterior apenas no app de teste isolado, nunca no app real.
**Tarefa preventiva recomendada**: varrer `apps/demo-saas/components/design-system/component-example.tsx` (e `demo.css`) validando toda classe `demo-*` e `lex-utility-*` contra `packages/react/src/styles.css` + `app/demo.css`.

## 8. Decisões de design fixadas (não reabrir sem motivo)

- Cascade: `@layer lexui.tokens → lexui.base → lexui.components` (declarado no topo de `packages/tokens/src/index.css`). CSS de app demo sem layer só deve usar seletores específicos; reboots entram em `lexui.base`.
- Drawer/Sheet: uma primitiva (Sheet é alias), `bottom` é default; mobile <640px colapsa tudo para bottom sheet (media query no `packages/react/src/styles.css`).
- Ícones: Lucide; 16/18/20px; Avatar para pessoas; `aria-label` obrigatório em ação-only; mesma ícone = mesmo conceito.
- Tokens: nada de hex/spaços arbitrários em apps demo; variantes tintadas usam `color-mix()` com tokens.

## 9. Próximos passos sugeridos

1. Commit do working tree (§2).
2. Varredura preventiva de classes (§7).
3. Se houver novos componentes (ex.: outros do mapeamento Bootstrap), seguir o checklist do AGENTS.md: componente + tokens + docs (live/template CLI em par) + story + exemplo no demo + registry do CLI.
4. Tarballs: `pnpm pack` / `node scripts/pack-packages.mjs` quando a API mudar de novo (bump de versão + `artifacts/npm/`).
