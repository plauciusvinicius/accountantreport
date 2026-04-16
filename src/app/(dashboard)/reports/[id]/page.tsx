import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Download, FileText, Clock, Building2, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Relatório Contábil" }

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: report } = await supabase
    .from("reports")
    .select(`
      *, documents(file_name, file_type, created_at)
    `)
    .eq("id", id)
    .eq("user_id", user!.id)
    .single()

  if (!report) notFound()

  const isPending = report.status === "pending" || report.status === "generating"
  const isReady = report.status === "ready"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/reports" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0d1b3e] transition-colors">
        <ArrowLeft size={16} />
        Voltar aos relatórios
      </Link>

      {/* Header */}
      <div className="bg-[#0d1b3e] rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <FileText size={14} />
              Relatório Contábil Estratégico
            </div>
            <h1 className="text-2xl font-bold">
              {report.company_name ?? "Empresa"}
            </h1>
            {report.period && (
              <p className="text-white/60 mt-1 flex items-center gap-1.5">
                <Calendar size={14} />
                {report.period}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
              isReady
                ? "bg-emerald-400/20 text-emerald-300"
                : isPending
                ? "bg-amber-400/20 text-amber-300"
                : "bg-red-400/20 text-red-300"
            }`}>
              {isReady ? "Pronto" : isPending ? "Gerando..." : "Erro"}
            </span>
            {isReady && report.report_url && (
              <a href={report.report_url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold gap-2">
                  <Download size={15} />
                  Baixar PDF
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Status de geração */}
      {isPending && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Clock size={20} className="text-amber-600 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">Relatório sendo gerado</h3>
            <p className="text-sm text-amber-700 mt-1">
              Estamos analisando seus documentos e consultando as bases de dados oficiais.
              Você receberá um e-mail quando o relatório estiver pronto.
            </p>
          </div>
        </div>
      )}

      {/* Informações do documento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: <Building2 size={16} className="text-[#c9a84c]" />,
            label: "Empresa",
            value: report.company_name ?? "Não identificado",
          },
          {
            icon: <TrendingUp size={16} className="text-[#c9a84c]" />,
            label: "Regime Tributário",
            value: report.tax_regime ?? "Não identificado",
          },
          {
            icon: <Calendar size={16} className="text-[#c9a84c]" />,
            label: "Data da análise",
            value: new Date(report.created_at).toLocaleDateString("pt-BR"),
          },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1.5">
              {item.icon}
              {item.label}
            </div>
            <p className="font-semibold text-[#0d1b3e] text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Sumário */}
      {isReady && report.summary && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-[#0d1b3e] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#c9a84c] rounded-full inline-block" />
            Sumário Executivo
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {report.summary}
          </p>
        </div>
      )}

      {/* Estrutura do relatório */}
      {isReady && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-[#0d1b3e] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#c9a84c] rounded-full inline-block" />
            Estrutura do Relatório
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "1. Capa + Identificação",
              "2. Sumário Executivo",
              "3. Diagnóstico Atual (DRE, Balanço, Fluxo de Caixa)",
              "4. Premissas do Estudo",
              "5. Projeções Financeiras (1, 3 e 5 anos)",
              "6. Cenários Tributários (3 cenários)",
              "7. Comparativo entre Cenários",
              "8. Análise Crítica",
              "9. Recomendações Estratégicas",
              "10. Conclusão + Anexos Técnicos",
            ].map((section) => (
              <div key={section} className="flex items-start gap-2.5 text-sm">
                <span className="text-[#c9a84c] mt-0.5">✓</span>
                <span className="text-muted-foreground">{section}</span>
              </div>
            ))}
          </div>
          {report.report_url && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <a href={report.report_url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#0d1b3e] hover:bg-[#1a2d5a] text-white font-bold gap-2">
                  <Download size={16} />
                  Baixar Relatório Completo em PDF
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
