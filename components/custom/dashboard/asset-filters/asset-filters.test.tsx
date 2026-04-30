import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AssetFilters from "./asset-filters";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/lib/hooks/use-debounce", () => ({
  useDebounce: (value: unknown) => value,
}));

describe("AssetFilters", () => {
  const mockReplace = jest.fn();
  const sectors = ["Energy", "Finance", "Technology"];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    jest.clearAllMocks();
  });

  it("renders correctly with sectors", () => {
    render(<AssetFilters sectors={sectors} />);

    expect(screen.getByPlaceholderText(/Buscar por ticker/i)).toBeInTheDocument();
    expect(screen.getByText("Todos os Setores")).toBeInTheDocument();
    sectors.forEach((sector) => {
      expect(screen.getByText(sector)).toBeInTheDocument();
    });
  });

  it("updates URL when search input changes", async () => {
    render(<AssetFilters sectors={sectors} />);

    const input = screen.getByPlaceholderText(/Buscar por ticker/i);
    fireEvent.change(input, { target: { value: "PETR" } });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("?search=PETR", { scroll: false });
    });
  });

  it("updates URL when sector is selected", () => {
    render(<AssetFilters sectors={sectors} />);

    const select = screen.getByLabelText(/Filtrar por setor/i);
    fireEvent.change(select, { target: { value: "Energy" } });

    expect(mockReplace).toHaveBeenCalledWith("?sector=Energy", { scroll: false });
  });

  it("initializes with values from searchParams", () => {
    const params = new URLSearchParams("search=VALE&sector=Finance");
    (useSearchParams as jest.Mock).mockReturnValue(params);

    render(<AssetFilters sectors={sectors} />);

    const input = screen.getByPlaceholderText(/Buscar por ticker/i);
    expect(input).toHaveValue("VALE");

    const select = screen.getByLabelText(/Filtrar por setor/i);
    expect(select).toHaveValue("Finance");
  });
});
