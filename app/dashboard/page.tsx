import { DashboardHeader } from "@/components/custom/dashboard/dashboard-header";
import { AssetListDesktop } from "@/components/custom/dashboard/asset-list/desktop/asset-list-desktop";
import { AssetListMobile } from "@/components/custom/dashboard/asset-list/mobile/asset-list-mobile";
import { AssetFilters } from "@/components/custom/dashboard/asset-filters";
import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";

interface DashboardPageProps {
  searchParams: Promise<{ search?: string; sector?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { search, sector } = await searchParams;

  const [stocksResponse, favorites] = await Promise.all([
    brapiService.getAvailableStocks(search, sector),
    getFavoriteAssets(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50/30 pb-20">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Explorar Ativos</h2>
          <p className="text-gray-500 mt-2 font-medium">Acompanhe as cotações em tempo real e gerencie sua carteira.</p>
        </header>

        <AssetFilters sectors={stocksResponse.availableSectors || []} />

        <div className="hidden md:block">
          <AssetListDesktop
            initialStocks={stocksResponse.stocks}
            sectors={stocksResponse.availableSectors || []}
            favoriteSymbols={favorites}
          />
        </div>

        <div className="block md:hidden">
          <AssetListMobile
            initialStocks={stocksResponse.stocks}
            sectors={stocksResponse.availableSectors || []}
            favoriteSymbols={favorites}
          />
        </div>
      </div>
    </main>
  );
}
