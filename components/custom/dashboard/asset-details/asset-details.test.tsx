import { render, screen } from "@testing-library/react";
import AssetDetails from "./asset-details";
import { assetFactory } from "@/test/factories/asset-factory";

jest.mock("../asset-chart", () => ({
  AssetChart: () => <div data-testid="asset-chart" />,
}));
jest.mock("../favorite-button/favorite-button", () => ({
  FavoriteButton: () => <div data-testid="favorite-button" />,
}));

describe("AssetDetails", () => {
  const mockAsset = assetFactory.createAsset({
    symbol: "PETR4",
    longName: "Petroleo Brasileiro S.A.",
    regularMarketPrice: 48.96,
    regularMarketChangePercent: 3.03,
    regularMarketChange: 1.44,
    twoHundredDayAverage: 45.5,
    twoHundredDayAverageChangePercent: 7.6,
  });

  const mockHistory = [
    { date: "01/01", price: 47 },
    { date: "02/01", price: 48.96 },
  ];

  it("renders asset information correctly", () => {
    render(<AssetDetails asset={mockAsset} isFavorite={false} history={mockHistory} />);

    expect(screen.getByText("PETR4")).toBeInTheDocument();
    expect(screen.getByText("Petroleo Brasileiro S.A.")).toBeInTheDocument();
    expect(screen.getByText(/R\$ 48,96/i)).toBeInTheDocument();
    expect(screen.getByText(/\+3.03%/i)).toBeInTheDocument();
  });

  it("renders statistics correctly", () => {
    render(<AssetDetails asset={mockAsset} isFavorite={false} history={mockHistory} />);

    expect(screen.getByText("R$ 45.50")).toBeInTheDocument();
    expect(screen.getByText("7.60%")).toBeInTheDocument();
    expect(screen.getByText("BRL")).toBeInTheDocument();
  });

  it("renders child components", () => {
    render(<AssetDetails asset={mockAsset} isFavorite={false} history={mockHistory} />);

    expect(screen.getByTestId("asset-chart")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });

  it("displays correct variation color for positive change", () => {
    render(<AssetDetails asset={mockAsset} isFavorite={false} history={mockHistory} />);
    const variation = screen.getByText(/\+3.03%/i).closest("div");
    expect(variation).toHaveClass("bg-green-100");
  });

  it("displays correct variation color for negative change", () => {
    const negativeAsset = assetFactory.createAsset({ regularMarketChangePercent: -2.5 });
    render(<AssetDetails asset={negativeAsset} isFavorite={false} history={mockHistory} />);
    const variation = screen.getByText(/-2.50%/i).closest("div");
    expect(variation).toHaveClass("bg-red-100");
  });
});
