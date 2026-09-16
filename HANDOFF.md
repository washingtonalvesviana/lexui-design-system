# Handoff — LexUI (dw-lex-ui)

Última atualização: 2026-09-16 03:52 UTC. Documento de memória para retomar em outra sessão.

## 1. Estado geral

- Design System **LexUI** (fonte canônica em `/home/ubuntu/dw-lex-ui`): monorepo pnpm + turbo.
  Pacotes: `@lexui/tokens`, `@lexui/react`, `@lexui/charts`, `@lexui/flow`, `@lexui/cli` · Apps: `demo-saas` (Next.js) e `storybook`.
- Ciclo do mapeamento Bootstrap→LexUI **concluído** (tokens z-index/gutter, 7 módulos novos, Grid, Navbar, ListGroup, Figure/Image, CloseButton, Offcanvas/Drawer, ScrollSpy, FloatingLabel, utilities `lex-utility-*`, docs, stories, registry CLI). Tarballs em `artifacts/npm/`.
- **Versão atual: 0.6.0** (0.3.0 tipografia; 0.4.0 `@lexui/flow`; 0.5.0 variantes de aba; 0.6.0 atividade em tempo real no flow). Os cinco tarballs estão **versionados no git** em `artifacts/npm/` (só `artifacts/.npm-cache` fica fora), então outro projeto/servidor instala sem registry — ver README §"Instalar em outro projeto ou servidor" e `.design-system-lex-ui/release.md`. Smoke test em projeto isolado: `npm install` dos 5 tarballs + peers, `tsc` de `weight`/`italic` e de `Flow`, `lexui init`/`doctor`/`search`/`view`/`check` verdes — inclusive o guard que barra `@xyflow/react` direto.
- Nesta sessão foram corrigidos 11 defeitos visuais do demo/catalogo (lista em §5).
- **Sessão seguinte (03:15–04:15)**: working tree commitado (§2), varredura preventiva de classes concluída (§7), biblioteca de ícones ampliada com vocabulário jurídico aprovado (§6) e fundamentos completados com tipografia variável (pesos + itálico real) e **paleta de cores viva** (`/design-system/components/palette`, doc `foundations/colors.md` live + template).
- Última validação verde: typecheck 11/11 · build 7/7 · tests 6/6 · lexui:check 222 arquivos, 0 violações + 209 classes demo-* conferidas + 123 ícones sem alias duplicado.
- **Atividade em tempo real (0.6.0)**: `@lexui/flow` ganhou aresta animada tokenizada (`--lex-flow-edge-dash`, `--lex-flow-edge-duration` = `--lex-duration-spin`, com `prefers-reduced-motion` desligando o movimento mas mantendo o tracejado e o anel) e `FlowNodeData.activity = "active"` (anel + pulso em `--lex-primary` e texto acessível "Em execução", nunca só animação). Pattern documentado em `patterns/live-activity.md` (live + template) e navegável em `/activity`: legenda de fontes, grafo com a fonte ativa pulsando, métrica req/s, `Progress` de volume, busca, filtro por operação, pausar/retomar (`aria-pressed`) e feed `role="log"` + `aria-live="polite"` limitado a 40 chamadas, pausando com a aba oculta. Story `AtividadeAoVivo` em `patterns.stories.tsx`.
- **Tabs (0.5.0)**: rótulos sempre em maiúsculas com `letter-spacing`, aba ativa com fundo `color-mix(--lex-primary 12%, transparent)` mantendo o indicador inferior, hover em `--lex-surface-2`, e `TabsTrigger` com `count` (pílula em `--lex-surface-3`, mono, números tabulares; tintada quando ativa). A lista esconde a barra de rolagem (`scrollbar-width: none`) mas continua rolável no mobile. Doc em `components/controls.md` (live + template), story e exemplo do demo com contadores (4 / 2 / 1202).
- Componentes novos do pacote 0.2.0: `packages/react/src/components/{grid,navbar,list-group,figure,image,close-button}.tsx`, `scrollspy.ts`.

## 2. ✅ RESOLVIDO — working tree commitado

- `35f1840` launch → `662d75f` (feat: bootstrap coverage 0.2.0 + demo fixes, 100 arquivos) → `8739057` (fix(demo): demo-chart-card + demo-chat-toolbar-spacer) → `b0b8cd3` (chore: guarda de classes no lexui:check). Todos já em `origin/main`.
- Único item fora do git: `.agents/skills/lexui/` — cópia byte-idêntica de `packages/cli/templates/skills/lexui` (regenerável); decisão sobre versionar ou ignorar segue aberta.

## 3. Ambiente — armadilhas que já derrubaram sessões

- **Node**: o shell default é **v20.19.3** e o `pnpm` 11.9.0 falha nele (`ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`). Todo comando pnpm/typecheck/build exige antes:
  `export PATH=/root/.nvm/versions/node/v24.21.0/bin:$PATH` (v24.21.0 via nvm).
- **Produção**: Next.js em `127.0.0.1:3100` (build estático em `apps/demo-saas/.next`), nginx proxy em `/etc/nginx/sites-available/lexui.datawiseservice.com`, site público **https://lexui.datawiseservice.com**.
- **Reiniciar produção** (se a porta 3100 estiver parada):
  `ss -tln | grep 3100` → **matar o pid antes** (um `next start` novo falha em silêncio se a porta estiver ocupada; várias tentativas de background já morreram assim) → depois iniciar como processo persistente:
  `cd apps/demo-saas && PATH=/root/.nvm/versions/node/v24.21.0/bin:$PATH node_modules/.bin/next start -p 3100` (background persistente, com ready na porta 3100).
- **Armadilha do background**: o tool às vezes reporta `status: failed` (last_output `}` ou "Ready port is already in use") **mas o servidor subiu** — o `next-server` fica órfão (PPID 1). Sempre confirmar com `ss -tlnp | grep 3100` + `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3100/dashboard` antes de concluir que falhou. Última instância em produção: pid 4192558.
- **Chrome/CDP travado**: se um script CDP pendurar, é o `close()` não encerrando — usar `process.exit(0)` no fim; se der `Promise was collected`, a navegação foi reusada e a promise da página se perdeu (reavaliar sem `awaitPromise`).
- **Storybook** (só local): `export PATH=...node24... && pnpm storybook` → http://127.0.0.1:6006.
- Verificação visual rápida via Chrome headless + CDP: `google-chrome --headless=new --no-sandbox --remote-debugging-port=9333 --user-data-dir=/tmp/chrome-prof about:blank` + Node ≥22 (WebSocket nativo). `--force-dark-mode` ou `Emulation.setEmulatedMedia` para dark.

## 4. Pipeline de validação obrigatório (regras do AGENTS.md)

```bash
export PATH=/root/.nvm/versions/node/v24.21.0/bin:$PATH
pnpm typecheck      # 9 tarefas (turbo)
pnpm build          # 6 tarefas
pnpm lexui:check    # CLI valida arquivos do design system + classes demo-*/lex-utility-* (§7)
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

## 6. Biblioteca de ícones

- **Lucide-react 1.27.0** é a família oficial (2.007 ícones; regras em `foundations/iconography.md`, live+template). Não misturar famílias — Bootstrap Icons foi avaliado e descartado: o caminho para um glifo ausente é equivalente Lucide, composição com componentes existentes ou vendorizar um ícone próprio no `@lexui/react`.
- Página `/design-system/components/iconography` (Fundamentos): tamanhos, semântica, ações-only e a **referência única e alfabética** com **118 ícones** — 99 em uso e 19 do vocabulário aprovado (marcados `aprovado`, com conceito e orientação no tooltip). Nome do ícone em light 300, 20% menor (`calc(--lex-text-sm * .8)`) e 70% de foreground; glifo em 18px e cor cheia, para o ícone ser o destaque da célula.
- Duas fontes, manifesto **gerado** por `pnpm icons:reference` (→ `scripts/collect-icons.mjs` → `apps/demo-saas/components/design-system/icons-reference.ts`), nunca editado à mão:
  1. imports de `lucide-react` no repositório (contagem por arquivo);
  2. `.design-system-lex-ui/foundations/icon-vocabulary.json` (live + template do CLI em par) — vocabulário jurídico aprovado: 23 entradas com `concept` e `use`.
- **Correção no gerador**: o arquivo `icons-reference.ts` era escaneado por ele mesmo, inflando todo contador em +1 (Landmark aparecia como 2). Agora o gerador ignora o próprio artefato, e ícones só-vocabulário ficam em `uses: 0` (sem loop de auto-contagem).
- **Guarda de aliases**: `node scripts/collect-icons.mjs --check` resolve o nome canônico de cada ícone no `lucide-react` e falha se dois nomes apontarem para o mesmo glifo (roda dentro de `pnpm lexui:check`). Foram corrigidos 3 casos que já existiam: `AlertTriangle`→`TriangleAlert`, `CheckCircle2`→`CircleCheck` (demo, storybook, `[slug]/page.tsx` e `toast.tsx` do pacote react) e `FileSignature`→`FilePenLine` no vocabulário.
- Uso real no demo: `/calendar` usa `Gavel` (audiência), `Hourglass` (prazo) e `Handshake` (acordo) dentro do `Badge`, junto de cor e texto.
- Story `Iconografia` em `apps/storybook/stories/foundations.stories.tsx`.

## 6b. `@lexui/flow` (React Flow) — entrega desta sessão

- Pacote novo `packages/flow` (0.4.0) que embrulha `@xyflow/react@12` (MIT, peer react >=17) e expõe `Flow`, `FlowProvider`, `FlowBackground`, `FlowControls`, `FlowMiniMap`, `FlowNode` + `flowNodeTypes`, `FlowEdge` e reexporta `Position`, `MarkerType`, `BackgroundVariant`, `Handle`, `addEdge`, `getBezierPath`, `useNodesState`, `useEdgesState`, `useReactFlow` e os tipos (`Node`, `Edge`, `NodeProps`, `EdgeProps`, `Connection`, `OnConnect`, `NodeTypes`). Assim a aplicação nunca importa `@xyflow/react`.
- **Aparência 100% por tokens**: o `base.css` do React Flow (estrutura, zero aparência) entra no `dist/styles.css` dentro da layer `lexui.flow-base` via `packages/flow/scripts/build-styles.mjs`; o tema em `src/styles.css` (`lexui.components`) mapeia ~30 variáveis `--xy-*` para tokens (`--xy-node-background-color: var(--lex-surface-1)`, `--xy-edge-stroke: var(--lex-border-strong)`, `--xy-handle-background-color: var(--lex-primary)`…). Sem `style.css` do vendor: nenhuma cor padrão dele aparece.
- Ordem de layers passou a ser `lexui.tokens, lexui.base, lexui.flow-base, lexui.components` (declarada em `packages/tokens/src/index.css`).
- O contêiner precisa de altura (`style={{ height }}`, prop `height` numérica ou pai dimensionado); o exemplo do demo usa `.demo-flow-canvas` com 26rem.
- Guard do CLI generalizado: `@base-ui/react` só em `packages/react/` e `@xyflow/react` só em `packages/flow/` (mensagem "importe o fluxo somente através de @lexui/flow"), com exit 1 — validado no projeto consumidor.
- Superfícies atualizadas: registry (3 arquivos, entry `flow` com `keywords` PT: fluxo, diagrama, processo, organograma…), `search` do CLI agora casa `keywords`, `components/flow.md` (live + template), `catalog.md`, `ai/instructions.md`, `SKILL.md` + `component-selection.md`, `manifest.json`, `AGENTS.md`, `README.md`, `release.md`, `next.config.ts` e preview do Storybook.
- Demo: `/design-system/components/flow` (categoria Estrutura) com fluxo jurídico de 6 nós e 5 arestas, tons, labels de aresta, controles e minimapa; montagem client-only (o build do demo é estático) e verificado por CDP em claro e escuro (nó/aresta/controles lendo os tokens, sem overflow).
- Também sincronizei o `.design-system-lex-ui/registry.json` (estava com 63 componentes, faltavam os 9 módulos do ciclo Bootstrap) — agora igual ao template e ao `lexui.registry.json` (72).

## 7. ✅ RESOLVIDO — classes órfãs do demo (guarda automática)
- 8 dos 11 bugs de §5 eram o MESMO: **exemplos referenciavam classes CSS inexistentes** (`demo-grid-cell`, `demo-aspect-preview`, `lex-utility-flex`…), criadas só no app de teste isolado.
- Varredura feita: 183 classes `demo-*`/`lex-utility-*` usadas em `apps/demo-saas` + `apps/storybook`, todas definidas. Restavam apenas **2 órfãs** (nenhuma quebrava layout de forma óbvia, mas ambas eram reais):
  - `demo-chat-toolbar-spacer` → sem `flex: 1 1 auto` o botão Enviar do chat flutuante colava no Anexar (270px de espaço morto). Medido via CDP em 1440px e 390px, claro/escuro.
  - `demo-chart-card` → sem `min-width: 0` no card/`__content` do gráfico do dashboard (mesmo guard da galeria).
- **Guarda permanente**: `scripts/check-demo-classes.mjs` (falha com exit 1 e aponta arquivo:linha) agora roda dentro de `pnpm lexui:check`; isolado em `pnpm check:demo-classes`.
- Nota de implementação: não há `className` dinâmico (`${}`) nem injeção via `classList`/`cx` no demo, então a cobertura estática é total. Cuidado ao usar `\b` no regex de classes — ele casa prefixos (`demo-chat-` em `demo-chat-agent`) e gera falso positivo; o script compara tokens completos e aceita `_` (BEM `__element`).

## 8. Decisões de design fixadas (não reabrir sem motivo)

- Cascade: `@layer lexui.tokens → lexui.base → lexui.components` (declarado no topo de `packages/tokens/src/index.css`). CSS de app demo sem layer só deve usar seletores específicos; reboots entram em `lexui.base`.
- Drawer/Sheet: uma primitiva (Sheet é alias), `bottom` é default; mobile <640px colapsa tudo para bottom sheet (media query no `packages/react/src/styles.css`).
- Terceiros: biblioteca externa entra embrulhada em pacote do DS, nunca importada pela aplicação. `@base-ui/react` só em `packages/react/`; `@xyflow/react` só em `packages/flow/`, com o CSS estrutural do vendor em `lexui.flow-base` e a aparência em tokens em `lexui.components`.
- Ícones: Lucide; 16/18/20px; Avatar para pessoas; `aria-label` obrigatório em ação-only; mesma ícone = mesmo conceito.
- Tokens: nada de hex/spaços arbitrários em apps demo; variantes tintadas usam `color-mix()` com tokens.
- Paleta: três níveis (marca → semântico → consumo), documentados em `foundations/colors.md`. O tema claro são os valores de `:root, [data-theme="light"]` e o escuro de `[data-theme="dark"]` — como o seletor casa **qualquer** elemento (não só o `<html>`), um bloco pode ser renderizado no tema oposto: é o que a página de paleta usa para mostrar claro e escuro lado a lado, e o que previews embutidos devem fazer. Não redefinir tokens semânticos na aplicação; cor nova entra primeiro em `@lexui/tokens`.
- Tipografia: uma única família variável (Inter) com pesos `light` 300, `regular` 400, `medium` 500, `semibold` 650, `bold` 750 e `black` 900 expostos por `weight` em `Text`/`Heading`, e `italic` para o estilo. `@lexui/tokens` publica a face **itálica** self-hosted (`inter-latin-italic.woff2`, OFL já coberto pelo `inter.LICENSE`), então light itálico é real — nunca oblíquo sintetizado. Não ajustar `font-weight`/`font-style` por CSS na aplicação.
- Ícones (reforço): um nome por glifo. Nomes que são alias no Lucide (`AlertTriangle`, `CheckCircle2`, `FileSignature`…) não entram — a guarda de `collect-icons.mjs --check` falha.

## 9. Próximos passos sugeridos

1. Decidir sobre `.agents/` (§2): versionar ou adicionar ao `.gitignore`.
2. Aprovar mais ícones do domínio jurídico conforme a necessidade aparecer: basta acrescentar a entrada em `icon-vocabulary.json` (live + template em par) com `concept` e `use` e rodar `pnpm icons:reference`. Antes de aprovar, confira se o conceito já não tem ícone — a lista única existe justamente para evitar sinônimos.
3. Uso real do vocabulário novo nas telas (hoje só `/calendar` usa `Gavel`/`Hourglass`/`Handshake`): candidatos naturais são carteira de processos, autos sigilosos e honorários, quando essas telas existirem.
4. Paleta: se algum valor for ajustado, atualize `foundations/colors.md` junto e confira contraste (4.5:1 texto, 3:1 limites) nos dois temas pela página `/design-system/components/palette`, que lê os valores do CSS em tempo real.
5. Se houver novos componentes (ex.: outros do mapeamento Bootstrap), seguir o checklist do AGENTS.md: componente + tokens + docs (live/template CLI em par) + story + exemplo no demo + registry do CLI.
6. `pnpm pack` já empacota os cinco pacotes (a lista estava fixa em quatro — corrigida); qualquer bump exige repack e commit dos `.tgz`.
6. Tarballs: `pnpm pack` / `node scripts/pack-packages.mjs` quando a API mudar de novo (bump de versão + `artifacts/npm/`).
7. Antes de concluir qualquer mudança de UI: `pnpm typecheck && pnpm build && pnpm lexui:check` (agora inclui a guarda de classes e a de aliases de ícone) e, se o build mudou, reiniciar o next (§3).
