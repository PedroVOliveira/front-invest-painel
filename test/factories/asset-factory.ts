import { BrapiAsset, BrapiStockListItem, BrapiHistoryItem } from "@/types/brapi";

export const assetFactory = {
  createStockListItem: (overrides: Partial<BrapiStockListItem> = {}): BrapiStockListItem => ({
    stock: "PETR4",
    name: "Petroleo Brasileiro S.A.",
    close: 40.5,
    change: 1.5,
    volume: 1000000,
    logo: "https://example.com/logo.png",
    sector: "Energy",
    ...overrides,
  }),

  createAsset: (overrides: Partial<BrapiAsset> = {}): BrapiAsset => ({
    symbol: "PETR4",
    shortName: "Petrobras",
    longName: "Petroleo Brasileiro S.A.",
    regularMarketPrice: 40.5,
    regularMarketChange: 0.6,
    regularMarketChangePercent: 1.5,
    regularMarketTime: "2024-01-01T18:00:00Z",
    logourl: "https://example.com/logo.png",
    currency: "BRL",
    twoHundredDayAverage: 38.0,
    twoHundredDayAverageChange: 2.5,
    twoHundredDayAverageChangePercent: 6.5,
    ...overrides,
  }),

  createHistoryItem: (overrides: Partial<BrapiHistoryItem> = {}): BrapiHistoryItem => ({
    date: 1704132000, // 2024-01-01
    open: 39.0,
    high: 41.0,
    low: 38.5,
    close: 40.5,
    volume: 1000000,
    adjustedClose: 40.5,
    ...overrides,
  }),

  createHistoryList: (count: number = 5): BrapiHistoryItem[] => {
    return Array.from({ length: count }, (_, i) => 
      assetFactory.createHistoryItem({
        date: 1704132000 + (i * 86400),
        close: 40 + Math.random() * 5
      })
    );
  }
};
