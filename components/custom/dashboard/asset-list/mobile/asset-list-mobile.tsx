"use client";

import { useRouter } from "next/navigation";
import { AssetListProps } from "../type";
import { AssetCard } from "./asset-card";
import { ROUTES } from "@/constants/routes";

export function AssetListMobile({
  initialStocks,
  favoriteSymbols,
}: AssetListProps) {
  const router = useRouter();

  if (initialStocks.length === 0) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-3xl border border-dashed border-gray-200"
      >
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
          <span className="text-2xl">🔍</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900">Nenhum ativo encontrado</h2>
        <p className="text-gray-500 mt-2 text-sm font-medium">Tente ajustar seus filtros para encontrar o que procura.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4" aria-label="Lista de ativos">
      {initialStocks.map((item) => (
        <li key={item.stock}>
          <AssetCard
            asset={item}
            isFavorite={favoriteSymbols.includes(item.stock)}
            onClick={() => router.push(ROUTES.ASSET_DETAILS(item.stock))}
          />
        </li>
      ))}
    </ul>
  );
}
