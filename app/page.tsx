import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="h-screen flex flex-col">
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[#0042fe] flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Verity Invest
            </span>
          </div>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Entrar
          </Link>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center px-6 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0042fe] bg-blue-50 px-3 py-1 rounded-full">
              Plataforma de investimentos
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
              Seus ativos,{" "}
              <span className="text-[#0042fe]">sob controle.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Acompanhe ações, FIIs e outros ativos em tempo real. Dados diretos
              da B3 para decisões mais inteligentes.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#0042fe] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
          >
            Começar agora
          </Link>
        </div>
      </section>
    </main>
  );
}
