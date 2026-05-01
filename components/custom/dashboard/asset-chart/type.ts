export interface ChartDataPoint {
  date: string;
  price: number;
}

export interface AssetChartProps {
  data: ChartDataPoint[];
  color?: string;
  isLoading?: boolean;
}
