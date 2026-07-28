# Overlays, menus e data

## Regra de escolha

- `Dialog`: tarefa focada que exige atenção, mas pode ser cancelada.
- `AlertDialog`: confirmação de ação destrutiva ou irreversível.
- `Drawer`: formulário contextual ou detalhes sem abandonar a página.
- `Popover`: conteúdo breve ancorado a um controle.
- `DropdownMenu`: lista compacta de ações sobre um item.
- `Toast`: confirmação assíncrona; nunca substitui erro inline de formulário.
- `Accordion`: conteúdo secundário que pode ser expandido.

## Datas

Use `DatePicker` em formulários e `Calendar` quando o calendário é parte principal da interface. Datas visíveis seguem `pt-BR`; persistência e integração com APIs devem usar ISO 8601. Sempre explicite o fuso horário quando o domínio envolver horas.

## Acessibilidade

Não substitua Trigger, Close, Title ou Description por `div`. Use a composição `render={<Button />}` oferecida pelo Base UI, preserve rótulos acessíveis em botões apenas com ícone e mantenha a confirmação destrutiva em um `AlertDialog` separado do menu que a iniciou.
