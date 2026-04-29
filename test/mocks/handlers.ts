import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example handler
  http.get('https://brapi.dev/api/quote/:ticker', ({ params }) => {
    return HttpResponse.json({
      results: [
        {
          symbol: params.ticker,
          shortName: "MOCK ASSET",
          regularMarketPrice: 100.50,
          regularMarketChangePercent: 1.5,
          logourl: "https://mock.logo",
        }
      ]
    });
  }),
];
