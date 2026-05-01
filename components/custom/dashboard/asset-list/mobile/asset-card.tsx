"use client";

import { BrapiStockListItem } from "@/types/brapi";
import { FavoriteButton } from "../../favorite-button/favorite-button";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AssetCardProps {
  asset: BrapiStockListItem;
  isFavorite: boolean;
  onClick: () => void;
}

export function AssetCard({ asset, isFavorite, onClick }: AssetCardProps) {
  const isPositive = asset.change >= 0;

  return (
    <article
      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden"
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`${asset.stock} — ${asset.name}. Cotação: R$ ${asset.close.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Variação: ${isPositive ? "+" : ""}${asset.change.toFixed(2)}%. Ver detalhes.`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1.5">
            <img
              src={asset.logo}
              alt={`Logo ${asset.stock}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/48x48?text=" + asset.stock;
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-gray-900 text-lg leading-none">{asset.stock}</span>
            <span className="text-xs text-gray-400 font-medium truncate max-w-[150px] mt-1">{asset.name}</span>
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteButton symbol={asset.stock} isFavorite={isFavorite} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Cotação</span>
          <span className="text-xl font-black text-gray-900">
            R$ {asset.close.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm",
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}
          aria-label={`Variação: ${isPositive ? "+" : ""}${asset.change.toFixed(2)}%`}
        >
          {isPositive
            ? <TrendingUp size={14} aria-hidden="true" />
            : <TrendingDown size={14} aria-hidden="true" />
          }
          {isPositive ? "+" : ""}{asset.change.toFixed(2)}%
        </div>
      </div>

      <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none" aria-hidden="true">
        <span className="text-4xl font-black italic">{asset.stock}</span>
      </div>
    </article>
  );
}
