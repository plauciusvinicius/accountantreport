import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { FileText, Download, Eye, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Meus Relatórios" }

const statusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: "Aguardando", className: "bg-gray-100 text-gray-600" },
  generating: { label: "Gerando", className: "bg-amber-100 text-amber-700" },
  ready: { label: "Pronto", className: "bg-emerald-100 text-emerald-700" },
  error: { label: "Erro", className: "bg-red-100 text-red-600" },
}

export default async function ReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: reports } = await supabase
    .from("reports")
    .select(`
      id, company_name, period, tax_regime, status, report_url,
      created_at,
      documents(file_name)
    `)
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1b3e]">Meus Relatórios</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Histórico completo de análises contábeis
          </p>
        </div>
        <Link href="/upload">
          <Button className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold gap-2">
            <Upload size={16} />
            Nova Análise
          </Button>
        </Link>
      </div>

      {!reports || reports.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0d1b3e]/5 flex items-center justify-center mx-auto mb-4">
            <FileText size={28} className="text-[#0d1b3e]/30" />
          </div>
          <p className="font-medium text-[#0d1b3e]">Nenhum relatório ainda</p>
          <p className="text-sm text-muted-foreground mt-1">
            Envie documentos contábeis para gerar seu primeiro relatório
          </p>
          <Link href="/upload" className="mt-5 inline-block">
            <Button className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold gap-2">
              <Upload size={16} />
              Enviar documentos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-[#0d1b3e]">Empresa</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#0d1b3e] hidden md:table-cell">Período</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#0d1b3e] hidden lg:table-cell">Regime</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#0d1b3e]">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#0d1b3e] hidden sm:table-cell">Data</th>
                  <th className="text-right py-3 px-4 font-semibold text-[#0d1b3e]">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reports.map((report) => {
                  const s = statusLabels[report.status] ?? statusLabels.pending
                  return (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0d1b3e]/5 flex items-center justify-center shrink-0">
                            <FileText size={14} className="text-[#0d1b3e]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#0d1b3e] leading-tight">
                              {report.company_name ?? "—"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                              {(report.documents as { file_name: string } | null)?.file_name ?? ""}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground hidden md:table-cell">
                        {report.period ?? "—"}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground hidden lg:table-cell">
                        {report.tax_regime ?? "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.className}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                        {new Date(report.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/reports/${report.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-[#0d1b3e] hover:bg-[#0d1b3e]/5">
                              <Eye size={14} />
                            </Button>
                          </Link>
                          {report.status === "ready" && report.report_url && (
                            <a href={report.report_url} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-[#c9a84c] hover:bg-[#c9a84c]/10">
                                <Download size={14} />
                              </Button>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
