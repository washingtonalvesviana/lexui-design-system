# Distribuição e releases

O projeto consome os pacotes públicos `@lexui/tokens`, `@lexui/react` e `@lexui/charts`. Atualize-os juntos e valide toda a interface antes de aceitar uma nova versão.

```bash
npm install @lexui/react@latest @lexui/tokens@latest @lexui/charts@latest
npm install --save-dev @lexui/cli@latest
npx lexui doctor
npx lexui check
```

Versione esta pasta e nunca edite internamente os pacotes instalados em `node_modules`.
