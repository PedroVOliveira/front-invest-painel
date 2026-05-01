import { render, screen, fireEvent } from "@testing-library/react";
import { AssetModalWrapper } from "./asset-modal-wrapper";
import { useRouter } from "next/navigation";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AssetModalWrapper", () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it("renders children inside the modal", () => {
    render(
      <AssetModalWrapper>
        <div data-testid="modal-content">Modal Content</div>
      </AssetModalWrapper>
    );

    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
  });

});
