import Link from "next/link"
import { ArrowRight, FileText, BarChart3, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#0d1b3e] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
              <polygon points="20,8 32,20 20,32 8,20" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
              <circle cx="20" cy="20" r="4" fill="#c9a84c"/>
            </svg>
            <div>
              <div className="font-bold text-lg leading-tight">Group Legacy</div>
              <div className="text-[#c9a84c] text-xs font-medium tracking-wider">ACCOUNTANT REPORT</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#funcionalidades" className="hover:text-[#c9a84c] transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-[#c9a84c] transition-colors">Como Funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-[#c9a84c] hover:bg-white/10 text-sm">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold text-sm">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d1b3e] to-[#1a2d5a] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 text-[#c9a84c] text-sm font-medium mb-8">
            <Shield size={14} />
            Análise Contábil com Inteligência Artificial
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Relatório Contábil Estratégico{" "}
            <span className="text-[#c9a84c]">em Minutos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Faça upload dos documentos contábeis da sua empresa e receba um relatório completo com
            diagnóstico financeiro, 3 cenários tributários e projeções para 1, 3 e 5 anos —
            cruzado com as principais bases de dados fiscais do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#c9a84c] hover:bg-[#b8942a] text-[#0d1b3e] font-bold px-8 h-12 text-base">
                Gerar Meu Relatório
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0d1b3e] mb-3">
              Tudo que você precisa para tomar decisões fiscais estratégicas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinamos Inteligência Artificial com as principais bases de dados tributárias do Brasil
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Upload Simples",
                desc: "Envie PDFs, planilhas Excel, CSV ou DOCX. Nosso sistema extrai e analisa todos os dados automaticamente.",
              },
              {
                icon: BarChart3,
                title: "3 Cenários Tributários",
                desc: "Regime atual, otimizado e alternativo — com análise de sensibilidade e projeções para 1, 3 e 5 anos.",
              },
              {
                icon: Shield,
                title: "Bases Oficiais Brasileiras",
                desc: "Receita Federal, CARF, STF, STJ, CONFAZ, e-CAC, SPED e Portal da Legislação — cruzados em tempo real.",
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#0d1b3e]/5 flex items-center justify-center mb-5">
                  <f.icon size={22} className="text-[#0d1b3e]" />
                </div>
                <h3 className="font-bold text-[#0d1b3e] text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0d1b3e] mb-3">Como funciona</h2>
            <p className="text-muted-foreground">Seu relatório estratégico em 3 passos simples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Faça upload", desc: "Envie os documentos contábeis da sua empresa — DRE, Balanço, Fluxo de Caixa e declarações fiscais." },
              { step: "02", title: "IA analisa", desc: "Nossa IA cruza os dados com as bases oficiais brasileiras e identifica oportunidades e riscos fiscais." },
              { step: "03", title: "Receba o relatório", desc: "Em minutos, você recebe um PDF completo com 10 seções estratégicas e recomendações práticas." },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#0d1b3e] text-[#c9a84c] font-extrabold text-xl flex items-center justify-center mx-auto mb-5">
                  {s.step}
                </div>
                <h3 className="font-bold text-[#0d1b3e] text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report sections */}
      <section className="py-20 px-6 bg-[#0d1b3e] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">O que inclui o relatório</h2>
            <p className="text-gray-300">10 seções estratégicas seguindo o padrão Group Legacy de consultoria</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Sumário Executivo",
              "Diagnóstico Atual",
              "Premissas do Estudo",
              "Projeções 1, 3 e 5 anos",
              "3 Cenários Tributários",
              "Comparativo entre Cenários",
              "Análise Crítica",
              "Recomendações Estratégicas",
              "TIR e Análise de Sensibilidade",
              "Conclusão + Próximos Passos",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
                <CheckCircle size={16} className="text-[#c9a84c] shrink-0" />
                <span className="text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#c9a84c]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#0d1b3e] mb-4">
            Pronto para otimizar sua carga tributária?
          </h2>
          <p className="text-[#0d1b3e]/70 mb-8 text-lg">
            Crie sua conta gratuitamente e gere seu primeiro relatório hoje mesmo.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-[#0d1b3e] hover:bg-[#1a2d5a] text-white font-bold px-10 h-12 text-base">
              Criar conta gratuita
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1b3e] text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
              <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
              <circle cx="20" cy="20" r="4" fill="#c9a84c"/>
            </svg>
            <span className="text-white font-bold text-sm">Group Legacy</span>
            <span className="text-[#c9a84c] text-xs">Accountant Report</span>
          </div>
          <p className="text-xs text-center">
            © {new Date().getFullYear()} Group Legacy. Todos os direitos reservados.{" "}
            <a href="https://grouplegacy.com.br" className="text-[#c9a84c] hover:underline" target="_blank" rel="noreferrer">
              grouplegacy.com.br
            </a>
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/login" className="hover:text-[#c9a84c] transition-colors">Entrar</Link>
            <Link href="/register" className="hover:text-[#c9a84c] transition-colors">Cadastrar</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
