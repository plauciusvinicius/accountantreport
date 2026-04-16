import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  Shield,
  TrendingUp,
  Database,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0d1b3e] sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo variant="light" size="sm" href="/" />
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold">
                Criar conta grátis
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0d1b3e] relative overflow-hidden pb-24 pt-20">
        {/* Decoração */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#c9a84c] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#c9a84c] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              Powered by Inteligência Artificial
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Relatório Contábil
              <br />
              <span className="text-[#c9a84c]">Estratégico</span> com IA
            </h1>
            <p className="text-white/70 text-lg mt-6 leading-relaxed max-w-xl">
              Faça upload dos documentos da sua empresa e receba um relatório
              completo com projeções tributárias para 1, 3 e 5 anos — confrontado
              com as principais bases de dados oficiais do Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/register">
                <Button className="h-12 px-8 bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold text-base gap-2">
                  Começar agora — é grátis
                  <ChevronRight size={18} />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-medium text-base bg-transparent">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#c9a84c] py-4">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-2 text-[#0d1b3e]">
            {[
              { value: "11+", label: "bases oficiais consultadas" },
              { value: "3", label: "cenários tributários" },
              { value: "5 anos", label: "de projeção financeira" },
              { value: "PDF", label: "relatório profissional" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-sm">
                <span className="font-bold text-lg">{s.value}</span>
                <span className="opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0d1b3e]">Como funciona</h2>
            <p className="text-muted-foreground mt-2">
              Três passos simples para o seu relatório estratégico
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Upload size={24} className="text-[#c9a84c]" />,
                title: "Envie os documentos",
                desc: "Faça upload do DRE, Balanço Patrimonial, Fluxo de Caixa e outros documentos contábeis da sua empresa (PDF, Excel, CSV).",
              },
              {
                step: "02",
                icon: <Database size={24} className="text-[#c9a84c]" />,
                title: "IA analisa e cruza dados",
                desc: "Nossa IA analisa seus documentos e consulta 11+ bases de dados oficiais: Receita Federal, CARF, STF, STJ, CONFAZ e mais.",
              },
              {
                step: "03",
                icon: <FileText size={24} className="text-[#c9a84c]" />,
                title: "Receba o relatório",
                desc: "Receba um PDF profissional com diagnóstico, projeções de 1 a 5 anos, 3 cenários tributários e recomendações estratégicas.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-7xl font-black text-[#0d1b3e]/5 absolute top-0 right-0 leading-none select-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1b3e]/5 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1b3e] mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que está no relatório */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0d1b3e] mb-4">
                Relatório completo em{" "}
                <span className="text-[#c9a84c]">10 seções</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Desenvolvido no padrão de consultoria estratégica, seu relatório inclui
                desde a análise atual até projeções detalhadas com três cenários tributários.
              </p>
              <div className="space-y-2.5">
                {[
                  "Sumário Executivo com KPIs principais",
                  "Diagnóstico contábil e fiscal completo",
                  "Projeções financeiras para 1, 3 e 5 anos",
                  "3 Cenários Tributários comparativos",
                  "Análise de risco fiscal",
                  "Recomendações estratégicas de regime",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0d1b3e] rounded-2xl p-6 text-white space-y-3">
              <div className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-4">
                Estrutura do Relatório
              </div>
              {[
                "1. Capa + Identificação",
                "2. Sumário Executivo",
                "3. Diagnóstico Atual (DRE, Balanço, Fluxo de Caixa)",
                "4. Premissas do Estudo",
                "5. Projeções Financeiras (1, 3 e 5 anos)",
                "6. Cenários Tributários",
                "7. Comparativo entre Cenários",
                "8. Análise Crítica",
                "9. Recomendações Estratégicas",
                "10. Conclusão + Anexos",
              ].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="text-[#c9a84c]">›</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bases de dados */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold text-[#0d1b3e] mb-2">
            Fontes Oficiais Consultadas
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Seu relatório é confrontado com as principais bases de dados do Brasil
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Receita Federal",
              "Portal Planalto",
              "CONFAZ",
              "CARF",
              "STF",
              "STJ",
              "e-CAC",
              "SPED",
              "NF-e",
              "Simples Nacional",
              "Reforma Tributária",
            ].map((source) => (
              <span
                key={source}
                className="px-4 py-2 bg-[#0d1b3e]/5 rounded-full text-sm font-medium text-[#0d1b3e] border border-[#0d1b3e]/10"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#0d1b3e]">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-6">
            <Shield size={28} className="text-[#c9a84c]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para analisar sua empresa?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Crie sua conta, envie os documentos e receba seu Relatório Contábil Estratégico.
          </p>
          <Link href="/register">
            <Button className="h-12 px-10 bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold text-base gap-2">
              Criar conta grátis
              <ChevronRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1530] py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="light" size="sm" />
          <p className="text-white/40 text-xs text-center sm:text-right">
            © {new Date().getFullYear()} Group Legacy. Todos os direitos reservados.
            <br className="sm:hidden" />
            {" "}grouplegacy.com.br
          </p>
        </div>
      </footer>
    </div>
  );
}
