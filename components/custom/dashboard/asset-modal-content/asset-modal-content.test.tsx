import { render, screen } from "@testing-library/react";
import { AssetModalContent } from "./asset-modal-content";
import { brapiService } from "@/services/brapi";
import { getFavoriteAssets } from "@/actions/asset-actions";

jest.mock("@/services/brapi");
jest.mock("@/actions/asset-actions");
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/components/custom/dashboard/asset-details", () => ({
  AssetDetails: ({ asset }: any) => <div data-testid="asset-details">{asset.symbol}</div>,
}));

describe("AssetModalContent", () => {
  it("renders asset details when data is found", async () => {
    const mockAsset = {
      symbol: "PETR4",
      historicalDataPrice: [{ date: 123456789, close: 30 }]
    };

    (brapiService.getHistory as jest.Mock).mockResolvedValue({
      results: [mockAsset]
    });
    (getFavoriteAssets as jest.Mock).mockResolvedValue([]);

    const Result = await AssetModalContent({ symbol: "PETR4" });
    render(Result);

    expect(screen.getByTestId("asset-details")).toHaveTextContent("PETR4");
  });
});
