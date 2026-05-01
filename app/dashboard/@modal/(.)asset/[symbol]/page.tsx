import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";
import { AssetDetails } from "@/components/custom/dashboard/asset-details";
import { AssetModalWrapper } from "@/components/custom/dashboard/asset-modal/asset-modal-wrapper";
import { notFound } from "next/navigation";
import { BrapiHistoryItem } from "@/types/brapi";

interface AssetModalPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function AssetModalPage({ params }: AssetModalPageProps) {
  const { symbol } = await params;

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
    <AssetModalWrapper>
      <AssetDetails
        asset={asset}
        isFavorite={favorites.includes(symbol)}
        history={history}
      />
    </AssetModalWrapper>
  );
}
