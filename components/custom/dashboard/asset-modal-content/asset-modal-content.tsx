import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";
import { AssetDetails } from "@/components/custom/dashboard/asset-details";
import { notFound } from "next/navigation";
import { BrapiHistoryItem } from "@/types/brapi";

interface AssetModalContentProps {
  symbol: string;
}

export async function AssetModalContent({ symbol }: AssetModalContentProps) {
  const [quoteResponse, favorites] = await Promise.all([
    brapiService.getHistory(symbol),
    getFavoriteAssets(),
  ]);

  const asset = quoteResponse.results?.[0];

  if (!asset) {
    notFound();
  }

  const history = asset.historicalDataPrice?.map((item: BrapiHistoryItem) => ({
    date: new Date(item.date * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    price: item.close
  })) || [];

  return (
    <AssetDetails
      asset={asset}
      isFavorite={favorites.includes(symbol)}
      history={history}
    />
  );
}
