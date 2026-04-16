import { Logo } from "@/components/layout/logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Painel esquerdo — identidade Group Legacy */}
      <div className="hidden lg:flex lg:w-1/2 gradient-navy flex-col justify-between p-12 relative overflow-hidden">
        {/* Decoração geométrica de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full border border-[#c9a84c]" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full border border-[#c9a84c]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rotate-45 border border-[#c9a84c]" />
        </div>

        <Logo variant="light" size="lg" />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white leading-snug mb-4">
            Análise Contábil
            <br />
            <span className="text-gold">Estratégica</span> com IA
          </h2>
          <p className="text-[#b0b0b0] text-base leading-relaxed max-w-sm">
            Faça upload dos documentos da sua empresa e receba um{" "}
            <strong className="text-white">Relatório Contábil Estratégico</strong> completo
            com projeções tributárias para 1, 3 e 5 anos.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Bases de dados", value: "11+", desc: "fontes oficiais" },
              { label: "Cenários", value: "3", desc: "tributários" },
              { label: "Projeções", value: "1–5", desc: "anos à frente" },
              { label: "Relatório", value: "PDF", desc: "profissional" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-gold text-2xl font-bold">{item.value}</div>
                <div className="text-white text-sm font-medium">{item.label}</div>
                <div className="text-[#b0b0b0] text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[#b0b0b0] text-xs relative z-10">
          © {new Date().getFullYear()} Group Legacy. Todos os direitos reservados.
        </p>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-background">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Logo variant="dark" size="md" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
