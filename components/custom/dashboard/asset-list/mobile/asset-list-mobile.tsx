"use client";

import { useRouter } from "next/navigation";
import { AssetListProps } from "../type";
import { AssetCard } from "./asset-card";
import { ROUTES } from "@/constants/routes";

export function AssetListMobile({
  initialStocks,
  sectors,
  favoriteSymbols
}: AssetListProps) {
  const router = useRouter();

  return (
    <div className="w-full">
      {initialStocks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {initialStocks.map((item) => (
            <AssetCard
              key={item.stock}
              asset={item}
              isFavorite={favoriteSymbols.includes(item.stock)}
              onClick={() => router.push(ROUTES.ASSET_DETAILS(item.stock))}
            />
          ))}
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Nenhum ativo encontrado</h3>
          <p className="text-gray-500 mt-2 text-sm font-medium">Tente ajustar seus filtros para encontrar o que procura.</p>
        </div>
      )}
    </div>
  );
}
