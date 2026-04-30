import { 
  BrapiQuoteResponse, 
  BrapiListResponse 
} from "@/types/brapi";

const BASE_URL = process.env.NEXT_PUBLIC_BRAPI_BASE_URL;

export const brapiService = {
  /**
   * Fetch quotes for specific symbols
   * @param symbols Array of ticker symbols (e.g. ['PETR4', 'VALE3'])
   */
  async getQuotes(symbols: string[]): Promise<BrapiQuoteResponse> {
    if (!symbols.length) return { results: [], requestedAt: "", took: "" };

    const token = process.env.REACT_APP_BRAPI_API_KEY;
    const url = new URL(`${BASE_URL}/quote/${symbols.join(',')}`);
    if (token) url.searchParams.append('token', token);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Brapi API error: ${res.statusText}`);
    }

    return res.json();
  },

  /**
   * Fetch available stocks with optional search and filtering
   */
  async getAvailableStocks(search?: string, sector?: string): Promise<BrapiListResponse> {
    const token = process.env.REACT_APP_BRAPI_API_KEY;
    const url = new URL(`${process.env.NEXT_PUBLIC_BRAPI_BASE_URL || 'https://brapi.dev/api'}/quote/list`);

    if (search) url.searchParams.append('search', search);
    if (sector) url.searchParams.append('sector', sector);
    if (token) url.searchParams.append('token', token);

    url.searchParams.append('limit', '50');

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Brapi API error: ${res.statusText}`);
    }

    return res.json();
  }
};
