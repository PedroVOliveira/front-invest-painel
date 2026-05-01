import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";
import { AssetDetails } from "@/components/custom/dashboard/asset-details";
import { DashboardHeader } from "@/components/custom/dashboard/dashboard-header";
import { notFound } from "next/navigation";
import { BrapiHistoryItem } from "@/types/brapi";

interface AssetPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function AssetPage({ params }: AssetPageProps) {
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
    <main className="min-h-screen bg-gray-50/30">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <AssetDetails
            asset={asset}
            isFavorite={favorites.includes(symbol)}
            history={history}
          />
        </div>
      </div>
    </main>
  );
}
