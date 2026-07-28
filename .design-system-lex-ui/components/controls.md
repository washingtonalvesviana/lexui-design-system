# Controles e navegação

## Checkbox

Use para selecionar uma ou mais opções independentes. O rótulo é obrigatório e a descrição deve esclarecer efeitos que não sejam óbvios. Não use Checkbox para uma configuração que entra em vigor imediatamente; nesse caso use Switch.

## Switch

Use para ativar ou desativar uma configuração com efeito imediato. Nunca renderize sem `label`. Estados críticos devem oferecer feedback adicional além da mudança visual.

## Tabs

Use para alternar entre painéis relacionados no mesmo contexto. Não use Tabs como substituto para navegação profunda entre páginas. Em mobile, a lista deve permitir rolagem horizontal.

## Tooltip

É apenas um rótulo visual suplementar. A informação não pode ser essencial, e o trigger precisa de nome acessível equivalente. Em dispositivos touch, conteúdo importante deve usar Popover ou texto visível.

## Pagination

Use para coleções divididas em páginas. Preserve a página atual na URL em aplicações reais e anuncie alterações assíncronas a tecnologias assistivas.
