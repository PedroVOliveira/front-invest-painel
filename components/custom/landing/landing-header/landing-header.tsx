import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function LandingHeader() {
  return (
    <header
      role="banner"
      className="flex items-center justify-between px-8 py-6"
    >
      <div className="flex items-center gap-2" aria-label="Verity Invest">
        <div
          className="h-8 w-8 rounded-md bg-[#0042fe] flex items-center justify-center"
          aria-hidden="true"
        >
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">
          Verity Invest
        </span>
      </div>

      <nav aria-label="Navegação principal">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Entrar
        </Link>
      </nav>
    </header>
  );
}
