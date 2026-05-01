import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function LandingHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-1 flex-col items-center justify-center text-center px-6 gap-8"
    >
      <div className="space-y-4 max-w-2xl">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0042fe] bg-blue-50 px-3 py-1 rounded-full"
          aria-label="Plataforma de investimentos"
        >
          Plataforma de investimentos
        </span>

        <h1
          id="hero-heading"
          className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight"
        >
          Seus ativos,{" "}
          <span className="text-[#0042fe]">sob controle.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Acompanhe ações, FIIs e outros ativos em tempo real. Dados diretos
          da B3 para decisões mais inteligentes.
        </p>
      </div>

      <Link
        href={ROUTES.LOGIN}
        className="inline-flex items-center gap-2 bg-[#0042fe] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
        aria-label="Começar agora — acessar plataforma"
      >
        Começar agora
      </Link>
    </section>
  );
}

