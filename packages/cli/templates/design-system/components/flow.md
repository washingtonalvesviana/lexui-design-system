# Flow

Fluxos e diagramas de processo com nós, arestas, controles e minimapa, embrulhando o [React Flow](https://reactflow.dev/) (`@xyflow/react`) com os tokens e as regras do LexUI.

- `Flow`: canvas do fluxo. Aceita `nodes`, `edges`, `nodeTypes`, `onConnect` e as demais props do React Flow; `fitView`, `minZoom` e `maxZoom` têm padrões do design system.
- `FlowProvider`: contexto para hooks como `useReactFlow` fora do canvas.
- `FlowBackground`: padrão de fundo em `dots` (padrão), `lines` ou `cross`.
- `FlowControls`: botões de zoom e ajuste, com `showInteractive` desligado por padrão.
- `FlowMiniMap`: mapa navegável (`pannable`, `zoomable`) com rótulo acessível.
- `FlowNode` + `flowNodeTypes`: nó do LexUI (`type: "lex"`) com `data.title`, `data.description`, `data.meta` e `data.tone` (`default`, `primary`, `accent`, `success`, `warning`, `danger`).
- `FlowEdge`: aresta bezier padrão para customização.
- Reexportados: `Position`, `MarkerType`, `BackgroundVariant`, `Handle`, `addEdge`, `getBezierPath`, `useNodesState`, `useEdgesState`, `useReactFlow` e os tipos `Node`, `Edge`, `NodeProps`, `EdgeProps`, `Connection`, `OnConnect`, `NodeTypes`.

## Quando usar

- Cadeias e ramificações de processo, organogramas, dependências entre etapas e mapas de decisão.
- Quando a posição dos elementos é parte do significado.

## Quando não usar

- Séries numéricas, comparativos e tendências: use `@lexui/charts`.
- Listas, tabelas e pipelines lineares: use `Table`, `DataTable` ou `Card`.
- Conteúdo que cabe em uma lista: o canvas adiciona custo de navegação por teclado sem ganho.

## Regras

- A aplicação importa somente `@lexui/flow`; `lexui:check` bloqueia `@xyflow/react` fora do pacote do design system.
- Importe `@lexui/flow/styles.css` depois de tokens, react e charts. A estrutura vem do `base.css` do React Flow (layer `lexui.flow-base`) e a aparência só usa tokens (`lexui.components`).
- O contêiner precisa de altura: passe `style={{ height }}`, a prop `height` numérica ou dimensione o pai.
- Para ajuste fino use as variáveis `--xy-*` (`--xy-node-background-color`, `--xy-edge-stroke`, `--xy-handle-background-color`, `--xy-minimap-mask-background-color`…) sempre apontando para tokens.
- O nó do LexUI expõe a superfície, o título, a descrição e o tom; estados de seleção e foco vêm do design system.

## Acessibilidade

- Cada nó e aresta é focável (`nodesFocusable`, `edgesFocusable`) e o foco desenha o anel do token `--lex-focus`.
- O canvas recebe `aria-label` descrevendo o fluxo; o minimapa tem rótulo próprio.
- Arrastar é opcional: mantenha ações essenciais também em menus ou botões do nó, nunca apenas no gesto.
- Em telas pequenas o canvas é navegável por pan/zoom, mas prefira apresentações por etapas quando o fluxo for o conteúdo principal.
- O tema claro/escuro é resolvido por tokens; não fixe cores de nó, aresta ou fundo.
