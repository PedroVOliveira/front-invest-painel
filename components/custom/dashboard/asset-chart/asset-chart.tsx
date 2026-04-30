"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AssetChartProps } from "./type";

export default function AssetChart({ 
  data, 
  color = "#3b82f6", 
  isLoading 
}: AssetChartProps) {
  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-gray-50/50 rounded-xl animate-pulse">
        <span className="text-gray-400 text-sm font-medium">Carregando gráfico...</span>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-gray-50/50 rounded-xl">
        <span className="text-gray-400 text-sm font-medium">Dados históricos indisponíveis</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.1} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            hide 
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']} 
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                    <p className="text-xs text-gray-500 font-bold mb-1">{payload[0].payload.date}</p>
                    <p className="text-sm text-blue-600 font-bold">
                      R$ {payload[0].value?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorPrice)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
