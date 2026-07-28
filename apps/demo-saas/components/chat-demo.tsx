"use client"

import * as React from "react"
import { AreaChart, DonutChart } from "@lexui/charts"
import { Avatar, Badge, Button, Chat, ChatAttachment, ChatComposer, ChatHeader, ChatMessage, ChatMessages, ChatToolbar, ChatTyping, Checkbox, Heading, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger, Select, Textarea } from "@lexui/react"
import { Bot, Database, Download, FileText, Maximize2, MessageCircle, Mic, Paperclip, Send, Sparkles, Trash2, X } from "lucide-react"

type Message = { id: number; role: "user" | "assistant"; text: string; rich?: boolean }
type HistoryItem = { id: number; title: string; date: string }
const sourceOptions = ["Base comercial", "Documentação", "Tickets de suporte", "Arquivos da conversa"]

export function ChatDemo() {
  const [agent, setAgent] = React.useState("Analista de dados")
  const [sources, setSources] = React.useState(["Base comercial", "Documentação"])
  const [attachment, setAttachment] = React.useState<File | null>(null)
  const [draft, setDraft] = React.useState("")
  const [recording, setRecording] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [floating, setFloating] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([{ id: 1, role: "user", text: "Compare o crescimento da receita com a meta deste trimestre." }, { id: 2, role: "assistant", text: "Análise concluída", rich: true }])
  const [history, setHistory] = React.useState<HistoryItem[]>([{ id: 1, title: "Análise trimestral", date: "agora" }, { id: 2, title: "Resumo de tickets", date: "ontem" }, { id: 3, title: "Pesquisa de mercado", date: "22 jul" }, { id: 4, title: "Projeção de receita", date: "18 jul" }, { id: 5, title: "Análise de churn", date: "12 jul" }, { id: 6, title: "Performance por canal", date: "08 jul" }, { id: 7, title: "Resumo executivo", date: "02 jul" }, { id: 8, title: "Planejamento do trimestre", date: "28 jun" }])
  const [activeHistory, setActiveHistory] = React.useState(1)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const messageEnd = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => { messageEnd.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, pending])
  function toggleSource(source: string) { setSources((current) => current.includes(source) ? current.filter((item) => item !== source) : [...current, source]) }
  function deleteHistory(id: number) { setHistory((current) => current.filter((item) => item.id !== id)); if (activeHistory === id) setActiveHistory(0) }
  function exportConversation() {
    const content = messages.map((message) => `## ${message.role === "user" ? "Você" : agent}\n\n${message.text}${message.rich ? "\n\n[Resposta rica com gráficos e fontes]" : ""}`).join("\n\n---\n\n")
    const blob = new Blob([`# Conversa — ${history.find((item) => item.id === activeHistory)?.title ?? "Chat LexUI"}\n\n${content}`], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "conversa-lexui.md"; link.click(); URL.revokeObjectURL(url)
  }
  function send(event: React.FormEvent) {
    event.preventDefault()
    const text = draft.trim() || (attachment ? `Analise o arquivo ${attachment.name}` : "")
    if (!text || pending) return
    setMessages((current) => [...current, { id: Date.now(), role: "user", text }]); setDraft(""); setAttachment(null); setPending(true)
    window.setTimeout(() => { setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: `Consultei ${sources.length} fonte(s) com o agente ${agent}. A resposta está pronta com referências e dados estruturados.` }]); setPending(false) }, 700)
  }

  return <>
    <div className="demo-chat-layout">
      <aside className="demo-chat-context" aria-label="Histórico de conversas"><div className="demo-chat-context__header"><span className="demo-eyebrow">Workspace</span><Heading level={2} size="md">Histórico</Heading></div><div className="demo-chat-history">{history.length ? history.map((item) => <article className="demo-chat-history__item" data-active={activeHistory === item.id || undefined} key={item.id}><button className="demo-chat-history__open" onClick={() => setActiveHistory(item.id)}><MessageCircle size={17} /><span><strong>{item.title}</strong><small>{item.date}</small></span></button><Button type="button" variant="ghost" size="icon" aria-label={`Excluir ${item.title}`} onClick={() => deleteHistory(item.id)}><Trash2 size={15} /></Button></article>) : <p className="demo-chat-history__empty">Nenhuma conversa salva.</p>}</div></aside>
      <Chat className="demo-chat-main" aria-label="Conversa com IA">
        <ChatHeader><div className="demo-chat-agent"><span className="demo-chat-agent__icon"><Bot size={18} /></span><div><strong>{history.find((item) => item.id === activeHistory)?.title ?? "Nova conversa"}</strong><span><i /> {agent} online</span></div></div><div className="demo-chat-header-actions"><Badge variant="success">{sources.length} fontes</Badge><Button type="button" variant="ghost" size="icon" aria-label="Exportar conversa" onClick={exportConversation}><Download size={17} /></Button><Button type="button" variant="ghost" size="icon" aria-label="Expandir conversa"><Maximize2 size={17} /></Button></div></ChatHeader>
        <ChatMessages><ChatMessage role="system">Hoje · Fontes conectadas: {sources.join(", ") || "nenhuma"}</ChatMessage>{messages.map((message) => message.role === "user" ? <ChatMessage key={message.id} role="user" author="Você" time="10:32" avatar={<Avatar name="Ana Lima" size="sm" />}><p>{message.text}</p></ChatMessage> : <ChatMessage key={message.id} role="assistant" author={agent} time="10:32" avatar={<Avatar name="Lex IA" size="sm" />}>{message.rich ? <RichAnswer /> : <><p>{message.text}</p><div className="demo-chat-citations"><Badge>Base comercial</Badge><Badge>Documentação</Badge></div></>}</ChatMessage>)}{pending && <ChatMessage role="assistant" author={agent} avatar={<Avatar name="Lex IA" size="sm" />}><ChatTyping /></ChatMessage>}<div ref={messageEnd} /></ChatMessages>
        <ChatComposer onSubmit={send}>
          {attachment && <ChatToolbar><ChatAttachment><FileText size={14} /><span>{attachment.name}</span><button type="button" onClick={() => setAttachment(null)} aria-label="Remover anexo"><X size={13} /></button></ChatAttachment></ChatToolbar>}
          <div className="demo-chat-controls">
            <label><span>Selecionar um Agente:</span><Select aria-label="Agente da conversa" value={agent} onChange={(event) => setAgent(event.target.value)}><option>Analista de dados</option><option>Especialista de suporte</option><option>Pesquisador</option><option>Agente financeiro</option></Select></label>
            <span className="demo-chat-controls__separator" aria-hidden="true" />
            <div className="demo-chat-source-control"><span>Escolher a Fonte(s):</span><Popover><PopoverTrigger render={<Button type="button" variant="outline" />}><Database size={15} /> Escolher ({sources.length})</PopoverTrigger><PopoverContent className="demo-chat-source-popover"><PopoverTitle>Fontes de dados</PopoverTitle><PopoverDescription>Combine uma ou mais fontes nesta conversa.</PopoverDescription><div className="demo-chat-source-list">{sourceOptions.map((source) => <Checkbox key={source} label={source} checked={sources.includes(source)} onCheckedChange={() => toggleSource(source)} />)}</div></PopoverContent></Popover></div>
          </div>
          <div className="demo-chat-input-row">
            {recording ? <div className="demo-chat-recording" role="status"><span /><strong>Ouvindo…</strong><small>Fale sua mensagem</small><Button type="button" variant="outline" size="sm" onClick={() => { setRecording(false); setDraft("Mostre os principais indicadores do período") }}>Concluir</Button></div> : <Textarea aria-label="Mensagem" rows={1} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Pergunte ao ${agent}…`} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} />}
            <input ref={fileRef} className="lex-sr-only" type="file" onChange={(event) => setAttachment(event.target.files?.[0] ?? null)} />
            <div className="demo-chat-input-actions"><Button type="button" variant="ghost" size="icon" onClick={() => fileRef.current?.click()} aria-label="Anexar arquivo"><Paperclip size={18} /></Button><Button type="button" variant={recording ? "primary" : "ghost"} size="icon" onClick={() => setRecording((value) => !value)} aria-label={recording ? "Parar gravação" : "Gravar áudio"}><Mic size={18} /></Button><Button type="submit" size="icon" disabled={pending || (!draft.trim() && !attachment)} aria-label="Enviar mensagem"><Send size={17} /></Button></div>
          </div>
        </ChatComposer>
      </Chat>
    </div>
    <Button className="demo-floating-chat-button" size="icon" onClick={() => setFloating((value) => !value)} aria-label={floating ? "Fechar chat flutuante" : "Abrir chat flutuante"}>{floating ? <X size={20} /> : <MessageCircle size={20} />}</Button>
    {floating && <Chat className="demo-floating-chat" aria-label="Chat flutuante"><ChatHeader><div className="demo-chat-agent"><span className="demo-chat-agent__icon"><Sparkles size={17} /></span><div><strong>Assistente Lex</strong><span><i /> online</span></div></div></ChatHeader><ChatMessages><ChatMessage author="Assistente" avatar={<Avatar name="Lex IA" size="sm" />}>Como posso ajudar você agora?</ChatMessage></ChatMessages><ChatComposer onSubmit={(event) => event.preventDefault()}><Textarea rows={2} placeholder="Digite sua mensagem…" aria-label="Mensagem rápida" /><ChatToolbar><Button type="button" variant="ghost" size="icon" aria-label="Anexar arquivo"><Paperclip size={17} /></Button><span className="demo-chat-toolbar-spacer" /><Button type="submit" size="icon" aria-label="Enviar"><Send size={16} /></Button></ChatToolbar></ChatComposer></Chat>}
  </>
}

function RichAnswer() { return <><p>A receita cresceu <strong>18,4%</strong> e superou a meta em 6 pontos percentuais. O maior avanço ocorreu em maio.</p><AreaChart label="Receita versus tendência trimestral" tone="positive" data={[{ label: "Jan", value: 42 }, { label: "Fev", value: 48 }, { label: "Mar", value: 53 }, { label: "Abr", value: 61 }, { label: "Mai", value: 74 }, { label: "Jun", value: 78 }]} valueFormatter={(value) => `R$ ${value}k`} /><div className="demo-chat-rich-grid"><div><h4>Destaques</h4><ul><li>Enterprise: +24%</li><li>Expansão: +16%</li><li>Churn caiu para 1,8%</li></ul></div><DonutChart label="Receita por segmento" data={[{ label: "Enterprise", value: 48 }, { label: "Mid-market", value: 32 }, { label: "SMB", value: 20 }]} valueFormatter={(value) => `${value}%`} /></div><details><summary>Ver fontes e metodologia</summary><p>Base comercial atualizada em 28/07 e documentação da meta Q3.</p></details><div className="demo-chat-citations"><Badge>1 · Base comercial</Badge><Badge>2 · Meta Q3</Badge></div></> }
