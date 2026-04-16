"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPassword } from "@/app/actions/auth"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await forgotPassword(formData)
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    } else if (result?.success) {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-[#c9a84c]" />
        </div>
        <h2 className="text-xl font-bold text-[#0d1b3e]">E-mail enviado!</h2>
        <p className="text-sm text-muted-foreground">
          Verifique sua caixa de entrada e clique no link para redefinir sua senha. O link é válido por 24 horas.
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full border-[#0d1b3e] text-[#0d1b3e] mt-2">
            <ArrowLeft size={16} className="mr-2" />
            Voltar ao Login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0d1b3e]">Esqueceu a senha?</h1>
        <p className="text-sm text-muted-foreground">
          Digite seu e-mail e enviaremos um link para redefinição
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail cadastrado</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            required
            className="h-11"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#0d1b3e] hover:bg-[#1a2d5a] text-white font-semibold"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Mail size={16} />
              Enviar link de redefinição
            </span>
          )}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-[#0d1b3e] flex items-center justify-center gap-1"
        >
          <ArrowLeft size={14} />
          Voltar ao login
        </Link>
      </div>
    </div>
  )
}
