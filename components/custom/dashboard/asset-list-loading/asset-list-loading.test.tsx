import { render } from "@testing-library/react";
import { AssetListLoading } from "./asset-list-loading";

describe("AssetListLoading", () => {
  it("renders correctly with shimmer effects", () => {
    const { container } = render(<AssetListLoading />);
    
    const animatePulseElements = container.querySelectorAll(".animate-pulse");
    expect(animatePulseElements.length).toBeGreaterThan(0);
  });
});
