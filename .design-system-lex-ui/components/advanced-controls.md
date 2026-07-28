# Controles avançados e estrutura

## Escolha do componente

- `Combobox`: selecionar uma opção em lista pesquisável. As opções usam sempre `{ value, label, description? }`.
- `CommandPalette`: navegação e ações globais; o atalho oficial é `Ctrl+K` ou `⌘K`.
- `RadioGroup`: escolha exclusiva entre poucas opções visíveis.
- `Slider`: valor aproximado dentro de uma faixa. Para números exatos, use Input numérico.
- `InputOTP`: código temporário, MFA e confirmação de identidade.
- `DataTable`: listas operacionais com busca, ordenação e paginação local.
- `Sidebar`: navegação principal persistente em telas largas. Em mobile, deve ser exibida como navegação temporária.

## Regras para DataTable

Colunas devem declarar `id`, `header` e `accessor` ou `cell`. O ID da linha deve vir do domínio, nunca do índice. Busca, ordenação e paginação pertencem ao componente; filtros de domínio ficam acima da tabela. Para volumes grandes, a aplicação pode controlar os dados no servidor mantendo a mesma composição visual.

## Regras para CommandPalette

Comandos recebem IDs estáveis, rótulos objetivos e callbacks explícitos. Não inclua ações destrutivas sem uma confirmação posterior. A paleta complementa a navegação visível; nunca é a única forma de chegar a uma tela.
