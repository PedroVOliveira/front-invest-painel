import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example handler
  http.get('https://brapi.dev/api/quote/list', () => {
    return HttpResponse.json({
      stocks: [
        { stock: "PETR4", name: "PETROBRAS PN", close: 35.50, change: 1.2, volume: 1000000, logo: "https://mock.logo/petr4" },
        { stock: "VALE3", name: "VALE ON", close: 70.20, change: -0.5, volume: 500000, logo: "https://mock.logo/vale3" },
      ],
      availableSectors: ["Petróleo", "Mineração"],
    });
  }),
  http.get('https://brapi.dev/api/quote/:ticker', ({ params }) => {
    return HttpResponse.json({
      results: [
        {
          symbol: params.ticker,
          shortName: "MOCK ASSET",
          longName: "MOCK ASSET LONG NAME",
          regularMarketPrice: 100.50,
          regularMarketChange: 1.5,
          regularMarketChangePercent: 1.5,
          regularMarketTime: "2024-04-30T00:00:00Z",
          logourl: "https://mock.logo",
          historicalDataPrice: [
            { date: 1714435200, close: 100.0 },
            { date: 1714521600, close: 100.5 },
          ]
        }
      ]
    });
  }),
];
