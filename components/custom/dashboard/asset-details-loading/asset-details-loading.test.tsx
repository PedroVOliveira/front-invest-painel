import { render, screen } from "@testing-library/react";
import { AssetDetailsLoading } from "./asset-details-loading";

describe("AssetDetailsLoading", () => {
  it("renders correctly with loading message", () => {
    render(<AssetDetailsLoading />);
    
    expect(screen.getByText(/Carregando dados do ativo/i)).toBeInTheDocument();
  });
});
