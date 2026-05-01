import { render, screen, fireEvent } from "@testing-library/react";
import { AssetListMobile } from "./asset-list-mobile";
import { useRouter, useSearchParams } from "next/navigation";
import { assetFactory } from "@/test/factories/asset-factory";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("AssetListMobile", () => {
  const mockPush = jest.fn();
  const mockStocks = [
    assetFactory.createStockListItem({ stock: "PETR4", name: "Petrobras", close: 30.5 }),
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    jest.clearAllMocks();
  });

  it("renders asset cards correctly", () => {
    render(<AssetListMobile initialStocks={mockStocks} sectors={["Energy"]} favoriteSymbols={[]} />);

    expect(screen.getAllByText("PETR4").length).toBeGreaterThan(0);
    expect(screen.getByText("R$ 30,50")).toBeInTheDocument();
  });

  it("navigates to details on card click", () => {
    render(<AssetListMobile initialStocks={mockStocks} sectors={["Energy"]} favoriteSymbols={[]} />);

    const petrElement = screen.getAllByText("PETR4")[0];
    const card = petrElement.closest("div[class*='bg-white']");
    if (card) fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith("/dashboard/asset/PETR4");
  });

  it("shows empty state when no stocks", () => {
    render(<AssetListMobile initialStocks={[]} sectors={[]} favoriteSymbols={[]} />);
    expect(screen.getByText(/Nenhum ativo encontrado/i)).toBeInTheDocument();
  });
});
