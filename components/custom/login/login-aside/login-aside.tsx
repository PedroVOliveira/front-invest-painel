import { TrendingUp, BarChart3, Shield } from "lucide-react";

const features = [
  { icon: BarChart3, text: "Cotações em tempo real via Brapi" },
  { icon: Shield, text: "Autenticação segura com GitHub SSO" },
  { icon: TrendingUp, text: "Análise e acompanhamento de portfólio" },
] as const;

export default function LoginAside() {
  return (
    <aside
      aria-label="Informações da plataforma"
      className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0042fe] p-14 text-white"
    >
      <div className="flex items-center gap-2" aria-label="Verity Invest">
        <div
          className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center"
          aria-hidden="true"
        >
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Verity Invest</span>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold leading-tight">
            Gerencie seus ativos com inteligência.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Acompanhe ações, FIIs e outros ativos em tempo real com dados
            diretos da B3.
          </p>
        </div>

        <ul className="space-y-4" aria-label="Funcionalidades da plataforma">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-blue-50 text-sm">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-blue-300 text-sm">
        <small>
          © {new Date().getFullYear()} Verity Invest. Todos os direitos
          reservados.
        </small>
      </p>
    </aside>
  );
}
