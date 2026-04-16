"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Eye, EyeOff, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/app/actions/auth"

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    const password = formData.get("password") as string
    const confirm = formData.get("confirmPassword") as string

    if (password !== confirm) {
      toast.error("As senhas não coincidem.")
      return
    }
    if (password.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.")
      return
    }

    setLoading(true)
    const result = await resetPassword(formData)
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0d1b3e]">Nova senha</h1>
        <p className="text-sm text-muted-foreground">
          Escolha uma nova senha segura para sua conta
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">Nova senha</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              required
              minLength={8}
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repita a nova senha"
            autoComplete="new-password"
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
              Salvando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <KeyRound size={16} />
              Redefinir senha
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}
