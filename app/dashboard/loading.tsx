import { AssetListLoading } from "@/components/custom/dashboard/asset-list-loading";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-gray-50/30 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <header className="mb-10 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-4" />
          <div className="h-5 w-96 bg-gray-200 rounded-lg" />
        </header>

        <AssetListLoading />
      </div>
    </main>
  );
}
