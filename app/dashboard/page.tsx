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

      <section
        aria-labelledby="dashboard-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
      >
        <header className="mb-10">
          <h1 id="dashboard-heading" className="text-3xl font-black text-gray-900 tracking-tight">Explorar Ativos</h1>
          <p className="text-gray-500 mt-2 font-medium">Acompanhe as cotações em tempo real e gerencie sua carteira.</p>
        </header>

        <AssetFilters sectors={stocksResponse.availableSectors || []} />

        <section aria-label="Lista de ativos — desktop" className="hidden md:block">
          <AssetListDesktop
            initialStocks={stocksResponse.stocks}
            sectors={stocksResponse.availableSectors || []}
            favoriteSymbols={favorites}
          />
        </section>

        <section aria-label="Lista de ativos — mobile" className="block md:hidden">
          <AssetListMobile
            initialStocks={stocksResponse.stocks}
            sectors={stocksResponse.availableSectors || []}
            favoriteSymbols={favorites}
          />
        </section>
      </section>
    </main>
  );
}
