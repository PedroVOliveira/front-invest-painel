"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleFavorite } from "@/actions/asset-actions";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  symbol: string;
  isFavorite: boolean;
}

export function FavoriteButton({ symbol, isFavorite }: FavoriteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorite, toggleOptimistic] = useOptimistic(
    isFavorite,
    (state, newState: boolean) => newState
  );

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    startTransition(async () => {
      try {
        toggleOptimistic(!optimisticFavorite);
        await toggleFavorite(symbol);
      } catch (error) {
        console.error("Erro ao favoritar:", error);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "p-2 rounded-lg transition-all hover:bg-yellow-50 active:scale-95 disabled:opacity-50",
        optimisticFavorite ? "text-yellow-400" : "text-gray-300"
      )}
      aria-label={optimisticFavorite ? `Remover ${symbol} dos favoritos` : `Adicionar ${symbol} aos favoritos`}
    >
      <Star
        size={20}
        fill={optimisticFavorite ? "currentColor" : "none"}
        className={cn(isPending && "animate-pulse")}
      />
    </button>
  );
}
