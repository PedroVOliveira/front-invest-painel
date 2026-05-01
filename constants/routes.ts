export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  FAVORITES: "/dashboard/favorites",
  ASSET_DETAILS: (symbol: string) => `/dashboard/asset/${symbol}`,
} as const;
