import { DashboardHeader } from "@/components/custom/dashboard/dashboard-header";
import { AssetList } from "@/components/custom/dashboard/asset-list";
import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";
import { Suspense } from "react";

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

        <Suspense fallback={
          <div className="w-full h-96 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <AssetList 
            initialStocks={stocksResponse.stocks} 
            sectors={stocksResponse.availableSectors || []} 
            favoriteSymbols={favorites}
          />
        </Suspense>
      </div>
    </main>
  );
}
