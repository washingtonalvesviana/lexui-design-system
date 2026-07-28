"use client"

import * as React from "react"
import { FileText, UploadCloud, X } from "lucide-react"
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lexui/react"

type DemoFile = { id: number; name: string; size: string }

export default function UploadPage() {
  const [files, setFiles] = React.useState<DemoFile[]>([{ id: 1, name: "relatorio-junho.pdf", size: "2,4 MB" }])
  const inputRef = React.useRef<HTMLInputElement>(null)
  function addFiles(list: FileList | null) {
    if (!list) return
    setFiles((current) => [...current, ...Array.from(list).map((file) => ({ id: Date.now() + Math.random(), name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB` }))])
  }
  return <><header className="demo-page-header"><div><p className="demo-eyebrow">Biblioteca</p><h1>Arquivos</h1><p>Envie e organize documentos da sua equipe.</p></div></header>
    <div className="demo-upload-grid"><Card><CardHeader><CardTitle>Enviar arquivos</CardTitle><CardDescription>PDF, PNG, JPG ou CSV com até 20 MB.</CardDescription></CardHeader><CardContent><button className="demo-dropzone" type="button" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files) }}><UploadCloud size={32} /><strong>Arraste arquivos ou clique para selecionar</strong><span>Os arquivos desta demo permanecem somente nesta sessão.</span></button><input className="lex-visually-hidden" ref={inputRef} type="file" multiple onChange={(e) => addFiles(e.target.files)} /></CardContent></Card>
      <Card><CardHeader><CardTitle>Arquivos recentes</CardTitle><CardDescription>{files.length} arquivo(s)</CardDescription></CardHeader><CardContent><div className="demo-files">{files.map((file) => <div className="demo-file" key={file.id}><FileText /><div><strong>{file.name}</strong><span>{file.size}</span></div><Badge variant="success">Pronto</Badge><Button variant="ghost" size="icon" aria-label={`Remover ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item.id !== file.id))}><X size={16} /></Button></div>)}</div></CardContent></Card>
    </div>
  </>
}
