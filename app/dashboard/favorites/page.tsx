import { DashboardHeader } from "@/components/custom/dashboard/dashboard-header";
import { AssetListDesktop } from "@/components/custom/dashboard/asset-list/desktop/asset-list-desktop";
import { AssetListMobile } from "@/components/custom/dashboard/asset-list/mobile/asset-list-mobile";
import { AssetFilters } from "@/components/custom/dashboard/asset-filters";
import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";
import { BrapiStockListItem, BrapiAsset } from "@/types/brapi";

interface FavoritesPageProps {
  searchParams: Promise<{ search?: string; sector?: string }>;
}

export default async function FavoritesPage({ searchParams }: FavoritesPageProps) {
  const { search, sector } = await searchParams;

  const favoriteSymbols = await getFavoriteAssets();

  if (favoriteSymbols.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50/30 pb-20">
        <DashboardHeader />
        <section aria-labelledby="favorites-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <header className="mb-10">
            <h1 id="favorites-heading" className="text-3xl font-black text-gray-900 tracking-tight">Meus Favoritos</h1>
            <p className="text-gray-500 font-medium">Ativos que você está acompanhando de perto.</p>
          </header>
          <div role="status" className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
              <span className="text-2xl">⭐</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Nenhum ativo favoritado</h2>
            <p className="text-gray-500 mt-1 max-w-xs">
              Comece a favoritar ativos na tela principal para acompanhá-los aqui.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const [quoteResponse, stocksListResponse] = await Promise.all([
    brapiService.getQuotes(favoriteSymbols),
    brapiService.getAvailableStocks()
  ]);

  const favoritedStocks: BrapiStockListItem[] = (quoteResponse?.results || [])
    .filter((asset): asset is BrapiAsset => !!asset && typeof asset === 'object' && 'symbol' in asset)
    .map(asset => ({
      stock: asset.symbol,
      name: asset.shortName || asset.longName || asset.symbol,
      close: asset.regularMarketPrice || 0,
      change: asset.regularMarketChangePercent || 0,
      volume: asset.regularMarketVolume || 0,
      logo: asset.logourl,
      sector: stocksListResponse?.stocks?.find(s => s.stock === asset.symbol)?.sector || "",
    }));

  const filteredStocks = favoritedStocks.filter(stock => {
    const matchesSearch = !search || 
      stock.stock.toLowerCase().includes(search.toLowerCase()) || 
      stock.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesSector = !sector || stock.sector === sector;

    return matchesSearch && matchesSector;
  });

  return (
    <main className="min-h-screen bg-gray-50/30 pb-20">
      <DashboardHeader />

      <section aria-labelledby="favorites-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 id="favorites-heading" className="text-3xl font-black text-gray-900 tracking-tight">Meus Favoritos</h1>
            <div className="bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-full text-sm font-black" aria-label={`${favoriteSymbols.length} favoritos`}>
              {favoriteSymbols.length}
            </div>
          </div>
          <p className="text-gray-500 font-medium">Ativos que você está acompanhando de perto.</p>
        </header>

        <AssetFilters sectors={stocksListResponse?.availableSectors || []} />

        {filteredStocks.length === 0 ? (
          <div role="status" className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
              <span className="text-2xl">⭐</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Nenhum ativo encontrado</h2>
            <p className="text-gray-500 mt-1 max-w-xs">
              Nenhum dos seus favoritos corresponde aos filtros aplicados.
            </p>
          </div>
        ) : (
          <>
            <section aria-label="Lista de favoritos — desktop" className="hidden md:block">
              <AssetListDesktop
                initialStocks={filteredStocks}
                sectors={stocksListResponse?.availableSectors || []}
                favoriteSymbols={favoriteSymbols}
              />
            </section>

            <section aria-label="Lista de favoritos — mobile" className="block md:hidden">
              <AssetListMobile
                initialStocks={filteredStocks}
                sectors={stocksListResponse?.availableSectors || []}
                favoriteSymbols={favoriteSymbols}
              />
            </section>
          </>
        )}
      </section>
    </main>
  );
}
