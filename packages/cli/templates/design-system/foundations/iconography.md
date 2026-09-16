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
O catálogo vivo em `/design-system/components/iconography` lista todos os ícones Lucide importados no repositório, com a quantidade de arquivos que os utilizam. O manifesto é gerado por ``pnpm icons:reference`` (`scripts/collect-icons.mjs`) e não deve ser editado à mão.

## Padrões de referência

- `/projects`: ícones de entidade, avatares, estados, progresso e metadados.
- `/users`: avatares, perfis e estados de conta.
- `/billing`: plano, pagamento, uso e faturas.
- `/profile` e `/settings`: navegação e títulos de seção.
- `/design-system/components`: categorias e componentes documentados.
