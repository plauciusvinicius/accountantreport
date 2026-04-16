"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Metadata } from "next"

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const MAX_SIZE = 20 * 1024 * 1024 // 20MB

export default function UploadPage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  function handleFile(f: File) {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      toast.error("Formato não suportado. Use PDF, Excel, CSV ou Word.")
      return
    }
    if (f.size > MAX_SIZE) {
      toast.error("Arquivo muito grande. Tamanho máximo: 20MB.")
      return
    }
    setFile(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setProgress(10)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuário não autenticado")

      // 1. Upload para Supabase Storage
      const fileName = `${user.id}/${Date.now()}_${file.name}`
      setProgress(30)

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, file, { upsert: false })

      if (uploadError) throw uploadError
      setProgress(60)

      // 2. Registrar no banco
      const { data: doc, error: dbError } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: fileName,
          file_type: file.type,
          file_size: file.size,
          status: "pending",
        })
        .select()
        .single()

      if (dbError) throw dbError
      setProgress(80)

      // 3. Disparar webhook N8N
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            document_id: doc.id,
            file_path: fileName,
            file_name: file.name,
          }),
        })
      }

      setProgress(100)
      toast.success("Documento enviado! A análise iniciará em breve.")
      setTimeout(() => router.push("/reports"), 1500)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar documento."
      toast.error(msg)
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">Enviar Documentos</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Faça upload dos documentos contábeis da sua empresa para análise
        </p>
      </div>

      {/* Área de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          dragging
            ? "border-[#c9a84c] bg-[#c9a84c]/5"
            : file
            ? "border-emerald-400 bg-emerald-50 cursor-default"
            : "border-gray-200 hover:border-[#c9a84c] hover:bg-[#c9a84c]/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.xlsx,.xls,.csv,.docx"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {file ? (
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0d1b3e]">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null) }}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 mx-auto"
            >
              <X size={14} />
              Remover arquivo
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#0d1b3e]/5 flex items-center justify-center mx-auto">
              <Upload size={28} className="text-[#0d1b3e]/40" />
            </div>
            <div>
              <p className="font-semibold text-[#0d1b3e]">
                Arraste o arquivo aqui ou{" "}
                <span className="text-[#c9a84c]">clique para selecionar</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PDF, Excel, CSV ou Word — máximo 20MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Barra de progresso */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Enviando e processando...</span>
            <span className="text-[#0d1b3e] font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c9a84c] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Botão enviar */}
      {file && !uploading && (
        <Button
          onClick={handleUpload}
          className="w-full h-12 bg-[#0d1b3e] hover:bg-[#1a2d5a] text-white font-bold text-base gap-2"
        >
          <Upload size={18} />
          Enviar para Análise
        </Button>
      )}

      {/* Informações */}
      <div className="bg-[#0d1b3e]/3 rounded-xl p-5 space-y-3">
        <h3 className="font-semibold text-[#0d1b3e] text-sm flex items-center gap-2">
          <FileText size={16} className="text-[#c9a84c]" />
          O que acontece após o envio?
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {[
            "Seu documento é armazenado com segurança",
            "A IA analisa os dados contábeis e fiscais",
            "Cruzamento com 11+ bases de dados públicas brasileiras",
            "Geração do Relatório Contábil Estratégico em PDF",
            "Você recebe um e-mail de notificação quando o relatório ficar pronto",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#c9a84c] text-[#0d1b3e] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
