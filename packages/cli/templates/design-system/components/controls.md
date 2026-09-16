# Controles e navegação

## Checkbox

Use para selecionar uma ou mais opções independentes. O rótulo é obrigatório e a descrição deve esclarecer efeitos que não sejam óbvios. Não use Checkbox para uma configuração que entra em vigor imediatamente; nesse caso use Switch.

## Switch

Use para ativar ou desativar uma configuração com efeito imediato. Nunca renderize sem `label`. Estados críticos devem oferecer feedback adicional além da mudança visual.

## Tabs

Use para alternar entre painéis relacionados no mesmo contexto. Não use Tabs como substituto para navegação profunda entre páginas. Em mobile, a lista deve permitir rolagem horizontal (a barra fica oculta; o conteúdo cortado é a dica de rolagem).

- Rótulos são sempre exibidos em maiúsculas com `letter-spacing`, para diferenciar a navegação de painéis do texto de conteúdo.
- A aba ativa recebe fundo tintado com `color-mix` sobre `--lex-primary` e mantém o indicador inferior; a aba em hover usa `--lex-surface-2`. Não ajuste essas cores na aplicação.
- `TabsTrigger` aceita `count` para contadores (ex.: `count={1202}`), exibidos em pílula com `--lex-surface-3` e números tabulares. Use para quantidade de itens do painel; para status semântico use `Badge` e para valores use texto.
- O contador faz parte do conteúdo do botão e é anunciado junto do rótulo ("Cobrança 1202"). Ele não substitui o rótulo: nunca deixe uma aba só com número.

## Tooltip

É apenas um rótulo visual suplementar. A informação não pode ser essencial, e o trigger precisa de nome acessível equivalente. Em dispositivos touch, conteúdo importante deve usar Popover ou texto visível.

## Pagination

Use para coleções divididas em páginas. Preserve a página atual na URL em aplicações reais e anuncie alterações assíncronas a tecnologias assistivas.
