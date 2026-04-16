import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { FileText, Upload, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single()

  const { data: documents } = await supabase
    .from("documents")
    .select("id, status")
    .eq("user_id", user!.id)

  const { data: reports } = await supabase
    .from("reports")
    .select("id, status, company_name, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = {
    total: documents?.length ?? 0,
    pending: documents?.filter((d) => d.status === "pending" || d.status === "processing").length ?? 0,
    completed: documents?.filter((d) => d.status === "completed").length ?? 0,
    errors: documents?.filter((d) => d.status === "error").length ?? 0,
  }

  const firstName = profile?.full_name?.split(" ")[0] ?? "Usuário"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1b3e]">
            Olá, {firstName}!
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Bem-vindo ao seu painel de análise contábil
          </p>
        </div>
        <Link href="/upload">
          <Button className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold gap-2">
            <Upload size={16} />
            Enviar Documentos
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Enviados", value: stats.total, icon: <FileText size={20} />, color: "text-[#0d1b3e]", bg: "bg-[#0d1b3e]/5" },
          { label: "Em Análise", value: stats.pending, icon: <Clock size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Concluídos", value: stats.completed, icon: <CheckCircle size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Com Erro", value: stats.errors, icon: <AlertCircle size={20} />, color: "text-red-500", bg: "bg-red-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-[#0d1b3e]">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Últimos relatórios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-semibold text-[#0d1b3e]">Últimos Relatórios</h2>
          <Link href="/reports" className="text-sm text-[#c9a84c] font-medium hover:underline">
            Ver todos
          </Link>
        </div>

        {!reports || reports.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0d1b3e]/5 flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-[#0d1b3e]/30" />
            </div>
            <p className="text-muted-foreground font-medium">Nenhum relatório gerado ainda</p>
            <p className="text-sm text-muted-foreground mt-1">
              Envie os documentos da sua empresa para começar
            </p>
            <Link href="/upload" className="mt-4 inline-block">
              <Button variant="outline" size="sm" className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d1b3e]">
                Enviar agora
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0d1b3e]/5 flex items-center justify-center">
                    <FileText size={16} className="text-[#0d1b3e]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0d1b3e]">
                      {report.company_name ?? "Empresa não identificada"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    report.status === "ready"
                      ? "bg-emerald-100 text-emerald-700"
                      : report.status === "generating"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {report.status === "ready" ? "Pronto" : report.status === "generating" ? "Gerando" : "Erro"}
                  </span>
                  {report.status === "ready" && (
                    <Link href={`/reports/${report.id}`}>
                      <Button variant="ghost" size="sm" className="text-[#c9a84c] hover:text-[#b8942a] h-8 px-3">
                        Ver
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA de primeiro acesso */}
      {stats.total === 0 && (
        <div className="bg-[#0d1b3e] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg">Pronto para começar?</h3>
            <p className="text-white/60 text-sm mt-1">
              Envie os documentos contábeis da sua empresa e receba um relatório estratégico completo
            </p>
          </div>
          <Link href="/upload" className="shrink-0">
            <Button className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold gap-2 whitespace-nowrap">
              <Upload size={16} />
              Começar agora
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
