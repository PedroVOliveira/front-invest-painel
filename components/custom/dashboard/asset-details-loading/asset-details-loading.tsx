import { Loader2 } from "lucide-react";

export function AssetDetailsLoading() {
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center gap-4 bg-white rounded-3xl">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <div className="absolute inset-0 blur-xl bg-blue-400/20 animate-pulse" />
      </div>
      <p className="text-gray-500 font-bold animate-pulse tracking-tight uppercase text-xs">
        Carregando dados do ativo...
      </p>
    </div>
  );
}
