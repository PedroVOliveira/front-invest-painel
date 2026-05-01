import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { FavoriteButton } from "./favorite-button";
import { toggleFavorite } from "@/actions/asset-actions";

jest.mock("@/actions/asset-actions", () => ({
  toggleFavorite: jest.fn(),
}));

describe("FavoriteButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial favorite state", () => {
    render(<FavoriteButton symbol="PETR4" isFavorite={true} />);
    const button = screen.getByLabelText(/Remover PETR4 dos favoritos/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-yellow-400");
  });

  it("renders correctly with initial non-favorite state", () => {
    render(<FavoriteButton symbol="VALE3" isFavorite={false} />);
    const button = screen.getByLabelText(/Adicionar VALE3 aos favoritos/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-gray-300");
  });

  it("handles toggle click and optimistic update", async () => {
    let resolveAction: (val: void) => void;
    const actionPromise = new Promise<void>((resolve) => {
      resolveAction = resolve;
    });
    (toggleFavorite as jest.Mock).mockReturnValue(actionPromise);

    render(<FavoriteButton symbol="PETR4" isFavorite={false} />);
    const button = screen.getByLabelText(/Adicionar PETR4 aos favoritos/i);

    fireEvent.click(button);

    expect(button).toHaveClass("text-yellow-400");
    expect(toggleFavorite).toHaveBeenCalledWith("PETR4");

    await act(async () => {
      resolveAction!();
    });
  });

  it("rolls back state on error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });
    let rejectAction: (reason: Error) => void;
    const actionPromise = new Promise<void>((_, reject) => {
      rejectAction = reject;
    });
    (toggleFavorite as jest.Mock).mockReturnValue(actionPromise);

    render(<FavoriteButton symbol="PETR4" isFavorite={false} />);
    const button = screen.getByLabelText(/Adicionar PETR4 aos favoritos/i);

    fireEvent.click(button);

    expect(button).toHaveClass("text-yellow-400");

    await act(async () => {
      rejectAction!(new Error("API Error"));
    });

    await waitFor(() => {
      expect(button).toHaveClass("text-gray-300");
    });

    consoleSpy.mockRestore();
  });
});
