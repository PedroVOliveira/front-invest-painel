import { render, screen, fireEvent } from "@testing-library/react";
import { AssetListDesktop } from "./asset-list-desktop";
import { useRouter, useSearchParams } from "next/navigation";
import { assetFactory } from "@/test/factories/asset-factory";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("AssetListDesktop", () => {
  const mockPush = jest.fn();
  const mockStocks = [
    assetFactory.createStockListItem({ stock: "PETR4", name: "Petrobras", sector: "Energy" }),
    assetFactory.createStockListItem({ stock: "VALE3", name: "Vale", sector: "Mining" }),
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    jest.clearAllMocks();
  });

  it("renders asset table correctly", () => {
    render(<AssetListDesktop initialStocks={mockStocks} sectors={["Energy", "Mining"]} favoriteSymbols={[]} />);

    expect(screen.getByText("PETR4")).toBeInTheDocument();
    expect(screen.getByText("VALE3")).toBeInTheDocument();
    expect(screen.getByText("Petrobras")).toBeInTheDocument();
  });

  it("navigates to details on row click", () => {
    render(<AssetListDesktop initialStocks={mockStocks} sectors={["Energy", "Mining"]} favoriteSymbols={[]} />);

    const row = screen.getByText("PETR4").closest("tr");
    if (row) fireEvent.click(row);

    expect(mockPush).toHaveBeenCalledWith("/dashboard/asset/PETR4");
  });
});
