import { AssetChart } from "../asset-chart";
import { FavoriteButton } from "../favorite-button/favorite-button";
import { AssetDetailsProps } from "./type";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3 } from "lucide-react";

export default function AssetDetails({ asset, isFavorite, history = [] }: AssetDetailsProps) {
  const isPositive = asset.regularMarketChangePercent >= 0;

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-2">
            <img
              src={asset.logourl}
              alt={asset.symbol}
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

        <div className="flex flex-col items-end">
          <span className="text-4xl font-black text-gray-900 tracking-tighter">
            R$ {asset.regularMarketPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <div className={cn(
            "flex items-center gap-1 font-bold text-sm px-3 py-1 rounded-full mt-2",
            isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {isPositive ? "+" : ""}{asset.regularMarketChangePercent.toFixed(2)}%
            <span className="ml-1 opacity-70">(R$ {asset.regularMarketChange.toFixed(2)})</span>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} />
              Variação (30 dias)
            </h3>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tempo Real</span>
          </div>
          <AssetChart
            data={history}
            color={isPositive ? "#10b981" : "#ef4444"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-3 mb-4 opacity-80">
              <DollarSign size={20} />
              <h3 className="font-bold">Estatísticas</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-sm opacity-70">Média (200 dias)</span>
                <span className="font-bold">R$ {asset.twoHundredDayAverage?.toFixed(2) || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-sm opacity-70">Variação Média</span>
                <span className="font-bold">{asset.twoHundredDayAverageChangePercent?.toFixed(2) || "0.00"}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-70">Moeda</span>
                <span className="font-bold">{asset.currency || "BRL"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-4 text-gray-800">
              <BarChart3 size={20} className="text-blue-500" />
              <h3 className="font-bold">Mercado</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Última atualização às {new Date(asset.regularMarketTime).toLocaleTimeString('pt-BR')}.
              Os dados são fornecidos pela Brapi e podem ter um pequeno atraso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
