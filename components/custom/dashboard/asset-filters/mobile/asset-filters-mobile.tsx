"use client";

import { useState } from "react";
import { Search, Filter, X, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AssetFiltersViewProps } from "../type";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AssetFiltersMobile({
  sectors,
  searchTerm,
  onSearchChange,
  currentSector,
  onSectorChange,
  onClear,
  isPending,
}: AssetFiltersViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-12 justify-start gap-3 px-4 bg-white border-gray-100 shadow-sm rounded-xl text-gray-500 font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 size={18} className="text-blue-500 animate-spin" />
            ) : (
              <Search size={18} className="text-blue-500" />
            )}
            {searchTerm || currentSector ? (
              <span className="text-gray-900 truncate">
                {searchTerm || currentSector}
              </span>
            ) : (
              "Buscar ativos ou filtrar..."
            )}
            <div className="ml-auto bg-gray-100 p-1.5 rounded-lg">
              <Filter size={16} className="text-gray-600" />
            </div>
          </Button>
        </DrawerTrigger>
        
        <DrawerContent 
          className="h-[85vh] bg-white border-t rounded-t-3xl"
          aria-describedby="filters-description"
        >
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 my-4" />
          
          <div className="px-6 pb-2">
            <DrawerTitle className="text-xl font-black text-gray-900">Filtrar Ativos</DrawerTitle>
            <DrawerDescription id="filters-description" className="text-gray-500 text-sm mt-1">
              Busque por nome ou filtre ativos por setor.
            </DrawerDescription>
          </div>

          <DrawerHeader className="border-b pb-4 px-6 absolute top-0 right-0">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
              <X size={20} />
            </Button>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Busca por nome</h3>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <Input
                  placeholder="Ex: PETR4, Vale..."
                  className="pl-12 h-14 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all rounded-2xl text-base"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Setores</h3>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => onSectorChange("")}
                  disabled={isPending}
                  className={cn(
                    "w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all text-left",
                    currentSector === "" || !currentSector
                      ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm" 
                      : "border-gray-100 bg-white text-gray-600 hover:border-gray-200",
                    isPending && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="font-bold">Todos os Setores</span>
                  {(currentSector === "" || !currentSector) && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </button>

                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => onSectorChange(sector)}
                    disabled={isPending}
                    className={cn(
                      "w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all text-left",
                      currentSector === sector 
                        ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm" 
                        : "border-gray-100 bg-white text-gray-600 hover:border-gray-200",
                      isPending && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="font-bold">{sector}</span>
                    {currentSector === sector && (
                      <div className="bg-blue-500 text-white p-1 rounded-full">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50/50 flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-14 rounded-2xl font-bold border-gray-200 text-gray-500 hover:bg-white"
              onClick={onClear}
              disabled={isPending}
            >
              Limpar
            </Button>
            <Button 
              className="flex-[2] h-14 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Ver Resultados
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
