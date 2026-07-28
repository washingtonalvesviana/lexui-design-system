import React from "react"
import { createRoot } from "react-dom/client"
import "@lexui/tokens/theme.css"
import "@lexui/react/styles.css"
import "@lexui/charts/styles.css"
import { Button, Card, CardContent, CardHeader, CardTitle, ThemeToggle } from "@lexui/react"
import { BarChart } from "@lexui/charts"

function App() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Projeto consumidor LexUI</CardTitle>
          <ThemeToggle />
        </CardHeader>
        <CardContent>
          <BarChart label="Receita" data={[{ label: "Jan", value: 36 }, { label: "Fev", value: 58 }]} />
          <Button>Continuar</Button>
        </CardContent>
      </Card>
    </main>
  )
}

createRoot(document.getElementById("root")).render(<App />)
