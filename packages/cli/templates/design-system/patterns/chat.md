# Chat inteligente

Use os primitivos `Chat`, `ChatHeader`, `ChatMessages`, `ChatMessage`, `ChatComposer`, `ChatToolbar` e `ChatAttachment`. A referência completa está em `/chat`.

- O agente ativo e as fontes selecionadas devem permanecer visíveis.
- No composer, apresente primeiro `Selecionar um Agente` e `Escolher a Fonte(s)` na mesma faixa; abaixo, mantenha pergunta, anexo, microfone e envio na mesma linha.
- Mantenha a altura do chat limitada à viewport; mensagens e histórico devem possuir rolagens independentes.
- O campo de pergunta deve ser um `Textarea` alto, com rolagem interna para textos longos.
- Toda conversa deve poder ser exportada, e cada item do histórico deve oferecer exclusão individual.
- Permita combinar fontes; não limite a seleção a uma única origem.
- Anexos devem aparecer imediatamente e poder ser removidos antes do envio.
- A entrada por voz precisa ter estado visível de gravação e alternativa por teclado.
- Respostas podem compor Markdown, tabelas, imagens e componentes de `@lexui/charts`.
- Gráficos em mensagens devem usar `min-width: 0` e `max-width: 100%` para nunca ultrapassar o balão ou o painel.
- Preserve `role="log"`, `aria-live`, autoria, horário e feedback de digitação.
- Para uso flutuante, mantenha o botão acessível e não cubra ações essenciais da página.
- Botões somente com ícone precisam de `aria-label`; o LexUI usa esse nome como tooltip nativo no hover.

O demo simula agente, upload e microfone no frontend. Integrações reais devem ser conectadas na camada da aplicação sem alterar os primitivos visuais.
