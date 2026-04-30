import { render, screen, fireEvent } from "@testing-library/react";
import AssetList from "./asset-list";
import { useRouter, useSearchParams } from "next/navigation";
import { assetFactory } from "@/test/factories/asset-factory";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("AssetList", () => {
  const mockPush = jest.fn();
  const initialStocks = [
    assetFactory.createStockListItem({ stock: "PETR4", name: "Petrobras", sector: "Energy" }),
    assetFactory.createStockListItem({ stock: "VALE3", name: "Vale", sector: "Mining" }),
  ];
  const sectors = ["Energy", "Mining"];
  const favoriteSymbols = ["PETR4"];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    jest.clearAllMocks();
  });

  it("renders the list of assets correctly", () => {
    render(
      <AssetList
        initialStocks={initialStocks}
        sectors={sectors}
        favoriteSymbols={favoriteSymbols}
      />
    );

    expect(screen.getByText("PETR4")).toBeInTheDocument();
    expect(screen.getByText("VALE3")).toBeInTheDocument();
    expect(screen.getByText("Petrobras")).toBeInTheDocument();
    expect(screen.getByText("Vale")).toBeInTheDocument();
  });

  it("navigates to asset details on row click", () => {
    render(
      <AssetList
        initialStocks={initialStocks}
        sectors={sectors}
        favoriteSymbols={favoriteSymbols}
      />
    );

    const row = screen.getByText("PETR4");
    fireEvent.click(row);

    expect(mockPush).toHaveBeenCalledWith("/dashboard/asset/PETR4");
  });
});
