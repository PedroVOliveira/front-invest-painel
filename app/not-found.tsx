"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MoveLeft, SearchX, Home } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  const router = useRouter();
  const { status } = useSession();

  const handleBack = () => {
    if (status === "authenticated") {
      router.push(ROUTES.DASHBOARD);
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(ROUTES.HOME);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 text-center px-6 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10" />
      
      <div className="relative mb-4 flex flex-col items-center">
        <div className="bg-blue-50 p-4 rounded-3xl mb-6 ring-1 ring-blue-100 shadow-sm">
          <SearchX size={40} className="text-blue-600" />
        </div>
        
        <h2 className="text-8xl font-black tracking-tighter text-gray-900 leading-none">
          404
        </h2>
        
        <div className="h-1.5 w-12 bg-blue-600 rounded-full mt-4" />
      </div>

      <div className="space-y-2 mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Página não encontrada</h3>
        <p className="text-gray-500 max-w-[420px] mx-auto text-sm leading-relaxed">
          Sentimos muito, mas o ativo ou a página que você está tentando acessar não pôde ser localizado em nossa base de dados.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleBack}
          variant="default"
          className="rounded-2xl px-10 h-14 font-bold shadow-xl shadow-blue-500/20 gap-3 transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-700"
        >
          <MoveLeft size={20} />
          {status === "authenticated" ? "Voltar ao Dashboard" : "Voltar para a página anterior"}
        </Button>

        {status !== "authenticated" && (
          <Button 
            onClick={() => router.push(ROUTES.HOME)}
            variant="outline"
            className="rounded-2xl px-10 h-14 font-bold gap-3 transition-all hover:scale-105 active:scale-95 border-gray-200"
          >
            <Home size={20} />
            Ir para o Início
          </Button>
        )}
      </div>
      
      <p className="absolute bottom-10 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
        Invest Investimentos • Dashboard
      </p>
    </div>
  );
}
