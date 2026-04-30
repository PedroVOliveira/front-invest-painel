"use client";

import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useQueryParams } from "@/lib/hooks/use-query-params";
import { AssetFiltersProps } from "./type";

export default function AssetFilters({
  sectors,
}: Pick<AssetFiltersProps, "sectors">) {
  const { getQueryParam, setQueryParam } = useQueryParams();
  
  const initialSearch = getQueryParam("search");
  const initialSector = getQueryParam("sector");
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setQueryParam("search", debouncedSearch);
  }, [debouncedSearch, setQueryParam]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={20} />
        </div>
        <Input
          placeholder="Buscar por ticker ou nome (ex: PETR4, Vale...)"
          className="pl-12 h-12 bg-white border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar ativos"
        />
      </div>

      <div className="relative min-w-[200px] group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
          <Filter size={18} />
        </div>
        <select
          className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-xl shadow-sm appearance-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-600 cursor-pointer"
          onChange={(e) => setQueryParam("sector", e.target.value)}
          value={initialSector}
          aria-label="Filtrar por setor"
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
