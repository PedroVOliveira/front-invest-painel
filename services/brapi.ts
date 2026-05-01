import {
  BrapiQuoteResponse,
  BrapiListResponse,
  BrapiHistoryResponse,
  BrapiAsset
} from "@/types/brapi";
import { getRequiredEnv } from "@/lib/env";

const BASE_URL = getRequiredEnv("NEXT_PUBLIC_BRAPI_BASE_URL");
const API_KEY = process.env.REACT_APP_BRAPI_API_KEY;

export const brapiService = {
  async getQuotes(symbols: string[]): Promise<BrapiQuoteResponse> {
    const validSymbols = Array.from(new Set(symbols.filter(Boolean)));
    if (!validSymbols.length) return { results: [], requestedAt: "", took: "" };


    const results = await Promise.all(
      validSymbols.map(async (symbol) => {
        try {
          const url = new URL(`${BASE_URL}/quote/${encodeURIComponent(symbol)}`);
          if (API_KEY) url.searchParams.append('token', API_KEY);

          const res = await fetch(url.toString(), {
            next: { revalidate: 60 },
          });

          if (!res.ok) return null;

          const data = await res.json();
          return data.results?.[0] || null;
        } catch {
          return null;
        }
      })
    );

    return {
      results: results.filter((r): r is BrapiAsset => r !== null),
      requestedAt: new Date().toISOString(),
      took: "0"
    };
  },

  async getAvailableStocks(search?: string, sector?: string): Promise<BrapiListResponse> {
    const url = new URL(`${BASE_URL}/quote/list`);

    if (search) url.searchParams.append('search', search);
    if (sector) url.searchParams.append('sector', sector);
    if (API_KEY) url.searchParams.append('token', API_KEY);

    url.searchParams.append('limit', '50');

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Brapi API error: ${res.statusText}`);
    }

    return res.json();
  },

  async getHistory(symbol: string): Promise<BrapiHistoryResponse> {
    const url = new URL(`${BASE_URL}/quote/${encodeURIComponent(symbol)}`);
    
    url.searchParams.append('range', '1mo');
    url.searchParams.append('interval', '1d');
    if (API_KEY) url.searchParams.append('token', API_KEY);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Brapi API error: ${res.statusText}`);
    }

    return res.json();
  }
};


