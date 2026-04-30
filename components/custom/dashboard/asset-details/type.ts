import { BrapiAsset } from "@/types/brapi";

export interface AssetDetailsProps {
  asset: BrapiAsset;
  isFavorite: boolean;
  history?: { date: string; price: number }[];
}
