# Responsividade

O LexUI é mobile-first. Componentes devem funcionar a partir de 320 px, sem depender de largura fixa.

- Mobile: até 640 px.
- Tablet: 641–1024 px.
- Desktop: acima de 1024 px.
- Os limites também são publicados como tokens (`--lex-bp-sm: 640px`, `--lex-bp-md: 1024px`) para consumo em JavaScript/TypeScript; media queries CSS declaram os próprios limites.
- Controles aumentam em dispositivos de toque.
- Tabelas podem rolar horizontalmente ou adotar uma representação mobile documentada.
- Modais tornam-se painéis inferiores em telas pequenas.
- Sidebar torna-se drawer.
- A ordem visual não pode quebrar a ordem semântica do documento.

Todo exemplo público deve ser validado nos temas claro e escuro e nas larguras 375, 768, 1024 e 1440 px.
