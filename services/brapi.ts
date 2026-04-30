export interface BrapiQuoteResponse {
  results: BrapiAsset[];
}

export interface BrapiAsset {
  symbol: string;
  shortName?: string;
  longName?: string;
  currency?: string;
  regularMarketPrice: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketChangePercent: number;
  logourl?: string;
}

export interface BrapiListResponse {
  stocks: {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    logo: string;
    sector?: string;
  }[];
}

const BASE_URL = 'https://brapi.dev/api';

export const brapiService = {
  /**
   * Fetch quotes for specific symbols
   * @param symbols Array of ticker symbols (e.g. ['PETR4', 'VALE3'])
   */
  async getQuotes(symbols: string[]): Promise<BrapiQuoteResponse> {
    if (!symbols.length) return { results: [] };
    
    const token = process.env.REACT_APP_BRAPI_API_KEY;
    const url = new URL(`${BASE_URL}/quote/${symbols.join(',')}`);
    if (token) url.searchParams.append('token', token);

    const res = await fetch(url.toString(), {
      // Revalidate every 60 seconds to keep data relatively fresh on SSR without killing the API limits
      next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch quotes: ${res.statusText}`);
    }

    return res.json();
  },

  /**
   * Fetch a list of available stocks, optionally filtered by a search query
   * @param search Optional search string
   */
  async getAvailableStocks(search?: string): Promise<BrapiListResponse> {
    const token = process.env.REACT_APP_BRAPI_API_KEY;
    const url = new URL(`${BASE_URL}/quote/list`);
    
    if (search) url.searchParams.append('search', search);
    if (token) url.searchParams.append('token', token);
    
    // Defaulting to a reasonable limit for search results
    url.searchParams.append('limit', '50');

    const res = await fetch(url.toString(), {
      // The overall list changes rarely, cache for 1 hour
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch stock list: ${res.statusText}`);
    }

    return res.json();
  }
};
