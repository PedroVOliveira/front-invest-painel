import { AssetChart } from "../asset-chart";
import { FavoriteButton } from "../favorite-button/favorite-button";
import { AssetDetailsProps } from "./type";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3 } from "lucide-react";

export default function AssetDetails({ asset, isFavorite, history = [] }: AssetDetailsProps) {
  const isPositive = asset.regularMarketChangePercent >= 0;

  return (
    <article aria-label={`Detalhes do ativo ${asset.symbol}`} className="flex flex-col gap-8 p-6 lg:p-8 pt-12 sm:pt-8">
      <header className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-2">
            <img
              src={asset.logourl}
              alt={`Logo ${asset.symbol}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{asset.symbol}</h1>
              <FavoriteButton symbol={asset.symbol} isFavorite={isFavorite} />
            </div>
            <p className="text-gray-500 font-medium">{asset.longName || asset.shortName}</p>
          </div>
        </div>

        <div className="flex flex-col items-end" aria-label="Preço atual">
          <span className="text-4xl font-black text-gray-900 tracking-tighter">
            R$ {asset.regularMarketPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          <div
            className={cn(
              "flex items-center gap-1 font-bold text-sm px-3 py-1 rounded-full mt-2",
              isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}
            aria-label={`Variação: ${isPositive ? "+" : ""}${asset.regularMarketChangePercent.toFixed(2)}%`}
          >
            {isPositive
              ? <TrendingUp size={16} aria-hidden="true" />
              : <TrendingDown size={16} aria-hidden="true" />
            }
            {isPositive ? "+" : ""}{asset.regularMarketChangePercent.toFixed(2)}%
            <span className="ml-1 opacity-70">(R$ {asset.regularMarketChange.toFixed(2)})</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section aria-labelledby="chart-heading" className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 id="chart-heading" className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} aria-hidden="true" />
              Variação (30 dias)
            </h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tempo Real</span>
          </div>
          <AssetChart
            data={history}
            color={isPositive ? "#10b981" : "#ef4444"}
          />
        </section>

        <div className="flex flex-col gap-4">
          <section aria-labelledby="stats-heading" className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-3 mb-4 opacity-80">
              <DollarSign size={20} aria-hidden="true" />
              <h2 id="stats-heading" className="font-bold">Estatísticas</h2>
            </div>
            <dl className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <dt className="text-sm opacity-70">Média (200 dias)</dt>
                <dd className="font-bold">R$ {asset.twoHundredDayAverage?.toFixed(2) || "N/A"}</dd>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <dt className="text-sm opacity-70">Variação Média</dt>
                <dd className="font-bold">{asset.twoHundredDayAverageChangePercent?.toFixed(2) || "0.00"}%</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm opacity-70">Moeda</dt>
                <dd className="font-bold">{asset.currency || "BRL"}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="market-heading" className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-4 text-gray-800">
              <BarChart3 size={20} className="text-blue-500" aria-hidden="true" />
              <h2 id="market-heading" className="font-bold">Mercado</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Última atualização às{" "}
              <time dateTime={new Date(asset.regularMarketTime).toISOString()}>
                {new Date(asset.regularMarketTime).toLocaleTimeString("pt-BR")}
              </time>
              . Os dados são fornecidos pela Brapi e podem ter um pequeno atraso.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
