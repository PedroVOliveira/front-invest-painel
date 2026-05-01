import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Verity<span className="text-blue-600">Invest</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href={ROUTES.LOGIN}
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-black transition-all hover:scale-105 shadow-lg shadow-blue-200"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
