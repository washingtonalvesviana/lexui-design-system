import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar, Badge, Button, Chat, ChatComposer, ChatHeader, ChatMessage, ChatMessages, ChatToolbar, Textarea } from "@lexui/react"
import { Paperclip, Send } from "lucide-react"

const meta = { title: "Patterns/Chat", parameters: { layout: "centered" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Conversation: Story = { render: () => <Chat style={{ height: 560, width: "min(42rem, 92vw)" }}><ChatHeader><strong>Assistente Lex</strong><Badge variant="success">Online</Badge></ChatHeader><ChatMessages><ChatMessage author="Assistente" time="10:31" avatar={<Avatar name="Lex IA" size="sm" />}>Como posso ajudar com seus dados?</ChatMessage><ChatMessage role="user" author="Você" time="10:32" avatar={<Avatar name="Ana Lima" size="sm" />}>Resuma os indicadores do trimestre.</ChatMessage><ChatMessage author="Assistente" time="10:32" avatar={<Avatar name="Lex IA" size="sm" />}><p>A receita cresceu <strong>18,4%</strong>.</p><ul><li>Enterprise: +24%</li><li>Churn: 1,8%</li></ul></ChatMessage></ChatMessages><ChatComposer onSubmit={(event) => event.preventDefault()}><Textarea rows={2} placeholder="Digite sua mensagem…" /><ChatToolbar><Button variant="ghost" size="icon" aria-label="Anexar"><Paperclip size={17} /></Button><Button size="sm"><Send size={15} /> Enviar</Button></ChatToolbar></ChatComposer></Chat> }
