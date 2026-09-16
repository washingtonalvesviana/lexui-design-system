# Iconografia

O LexUI usa `lucide-react` como biblioteca padrão. Ícones comunicam entidade, estado ou ação; não devem ser inseridos apenas para preencher espaço.

## Regras

- Use `16px` em botões e controles, `18px` em entidades e títulos de card e `20px` em destaques.
- Pessoas devem usar `Avatar`; não substitua identidade pessoal por um ícone genérico quando houver nome.
- Projetos, arquivos, faturas e outros objetos podem usar um ícone de entidade dentro de uma superfície tonal.
- Estados como ativo, convite, concluído e pausado combinam cor semântica, ícone e texto. Nunca dependa apenas da cor.
- Botões somente com ícone precisam de `aria-label`. O `Button` transforma esse nome em tooltip nativo no hover.
- Ações desconhecidas, destrutivas ou usadas com pouca frequência devem preservar rótulo explícito ou confirmação.
- Mantenha o mesmo ícone para o mesmo conceito em navegação, tabelas, cards e menus.
- Não misture famílias de ícones e não use emojis como parte da interface operacional.

## Referência
O catálogo vivo em `/design-system/components/iconography` lista os ícones Lucide **em uso no repositório** e o **vocabulário aprovado** do design system, sem separar em grupos: a lista é única e alfabética. O ícone sem uso aparece marcado como `aprovado` e o conceito é exibido no tooltip.

Duas fontes alimentam o manifesto, gerado por ``pnpm icons:reference`` (`scripts/collect-icons.mjs`), que não deve ser editado à mão:

- os imports de `lucide-react` encontrados no repositório, com a quantidade de arquivos que usam cada ícone;
- `foundations/icon-vocabulary.json` — vocabulário aprovado, com um conceito e uma orientação de uso por ícone.

Para aprovar um ícone novo, adicione-o a `icon-vocabulary.json` com o conceito e o uso pretendido; para usá-lo, importe direto de `lucide-react`. Não crie dois ícones para o mesmo conceito.

## Padrões de referência

- `/projects`: ícones de entidade, avatares, estados, progresso e metadados.
- `/calendar`: ícone por tipo de compromisso — `Gavel` (audiência), `Hourglass` (prazo) e `Handshake` (acordo) dentro do `Badge`, junto de cor e texto.
- `/users`: avatares, perfis e estados de conta.
- `/billing`: plano, pagamento, uso e faturas.
- `/profile` e `/settings`: navegação e títulos de seção.
- `/design-system/components`: categorias e componentes documentados.
