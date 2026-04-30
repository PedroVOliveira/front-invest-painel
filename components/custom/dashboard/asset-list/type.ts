import { BrapiStockListItem } from "@/types/brapi";

export interface AssetListProps {
  initialStocks: BrapiStockListItem[];
  sectors: string[];
  favoriteSymbols: string[];
}
