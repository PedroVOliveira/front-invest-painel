/**
 * Brapi API Type Definitions
 * Based on official documentation: https://brapi.dev/docs
 */

export interface BrapiAsset {
  symbol: string;
  shortName: string;
  longName?: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  logourl: string;
  currency?: string;
  twoHundredDayAverage?: number;
  twoHundredDayAverageChange?: number;
  twoHundredDayAverageChangePercent?: number;
}

export interface BrapiStockListItem {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap?: number;
  logo: string;
  sector?: string;
}

export interface BrapiQuoteResponse {
  results: BrapiAsset[];
  requestedAt: string;
  took: string;
}

export interface BrapiListResponse {
  stocks: BrapiStockListItem[];
  availableSectors?: string[];
  availableStockTypes?: string[];
}

export interface BrapiHistoryItem {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

export interface BrapiHistoryResponse {
  results: {
    symbol: string;
    historicalDataPrice: BrapiHistoryItem[];
  }[];
}
