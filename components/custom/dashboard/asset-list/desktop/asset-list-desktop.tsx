"use client";

import { useRouter } from "next/navigation";
import { DataGrid, DataGridColumn } from "../../data-grid";
import { FavoriteButton } from "../../favorite-button/favorite-button";
import { AssetListProps } from "../type";
import { BrapiStockListItem } from "@/types/brapi";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

export function AssetListDesktop({
  initialStocks,
  sectors,
  favoriteSymbols
}: AssetListProps) {
  const router = useRouter();

  const columns: DataGridColumn<BrapiStockListItem>[] = [
    {
      header: "Ativo",
      accessorKey: "stock",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1 bg-white">
            <img
              src={item.logo}
              alt={item.stock}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/40x40?text=" + item.stock;
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 leading-tight">{item.stock}</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider truncate max-w-[150px]">{item.name}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Preço",
      accessorKey: "close",
      cell: (item) => (
        <span className="font-bold text-gray-900">
          R$ {item.close.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      header: "Variação",
      accessorKey: "change",
      cell: (item) => {
        const isPositive = item.change >= 0;
        return (
          <div className={cn(
            "inline-flex items-center font-bold text-sm px-2.5 py-1 rounded-full",
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {isPositive ? "+" : ""}{item.change.toFixed(2)}%
          </div>
        );
      },
    },
    {
      header: "Volume",
      accessorKey: "volume",
      cell: (item) => (
        <span className="text-gray-500 font-medium">
          {new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(item.volume)}
        </span>
      ),
    },
    {
      header: "Setor",
      accessorKey: "sector",
      cell: (item) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
          {item.sector || "N/A"}
        </span>
      ),
    },
    {
      header: "Favorito",
      accessorKey: "favorite",
      align: "center",
      cell: (item) => (
        <FavoriteButton
          symbol={item.stock}
          isFavorite={favoriteSymbols.includes(item.stock)}
        />
      ),
    },
  ];

  return (
    <div className="w-full">
      <DataGrid
        data={initialStocks}
        columns={columns}
        onRowClick={(item) => router.push(ROUTES.ASSET_DETAILS(item.stock))}
        ariaLabel="Lista de ativos financeiros"
      />
    </div>
  );
}
