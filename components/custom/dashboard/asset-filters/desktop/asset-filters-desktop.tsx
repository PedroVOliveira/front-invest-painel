import { Search, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AssetFiltersViewProps } from "../type";

export function AssetFiltersDesktop({
  sectors,
  searchTerm,
  onSearchChange,
  currentSector,
  onSectorChange,
  isPending,
}: AssetFiltersViewProps) {
  return (
    <div className="flex flex-row gap-4 mb-8 relative">
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          {isPending ? <Loader2 size={20} className="animate-spin text-blue-500" /> : <Search size={20} />}
        </div>
        <Input
          placeholder="Buscar por ticker ou nome (ex: PETR4, Vale...)"
          className="pl-12 h-12 bg-white border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all rounded-xl"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar ativos"
          disabled={isPending}
        />
      </div>

      <div className="relative min-w-[200px] group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
          <Filter size={18} />
        </div>
        <select
          className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-xl shadow-sm appearance-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-600 cursor-pointer disabled:opacity-50"
          onChange={(e) => onSectorChange(e.target.value)}
          value={currentSector}
          aria-label="Filtrar por setor"
          disabled={isPending}
        >
          <option value="">Todos os Setores</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
