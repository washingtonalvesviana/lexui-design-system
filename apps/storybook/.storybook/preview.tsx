import type { Preview } from "@storybook/react-vite"
import "@lexui/tokens/theme.css"
import "@lexui/react/styles.css"
import "@lexui/charts/styles.css"
import "@lexui/flow/styles.css"
import "../stories/storybook.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Tema global do LexUI",
      defaultValue: "dark",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Claro" },
          { value: "dark", title: "Escuro" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme
      return <div className="lex-story"><Story /></div>
    },
  ],
  parameters: {
    controls: { expanded: true },
    a11y: { test: "error" },
    options: { storySort: { order: ["Foundations", "Components", "Patterns"] } },
  },
}

export default preview
