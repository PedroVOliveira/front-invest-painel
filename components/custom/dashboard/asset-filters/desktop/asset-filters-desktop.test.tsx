import { render, screen, fireEvent } from "@testing-library/react";
import { AssetFiltersDesktop } from "./asset-filters-desktop";

describe("AssetFiltersDesktop", () => {
  const sectors = ["Energy", "Finance"];
  const mockOnSearchChange = jest.fn();
  const mockOnSectorChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with provided props", () => {
    render(
      <AssetFiltersDesktop 
        sectors={sectors} 
        searchTerm="PETR"
        onSearchChange={mockOnSearchChange}
        currentSector="Energy"
        onSectorChange={mockOnSectorChange}
      />
    );

    expect(screen.getByDisplayValue("PETR")).toBeInTheDocument();
    expect(screen.getByLabelText(/Filtrar por setor/i)).toHaveValue("Energy");
  });

  it("calls onSearchChange when typing", () => {
    render(
      <AssetFiltersDesktop 
        sectors={sectors} 
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        currentSector=""
        onSectorChange={mockOnSectorChange}
      />
    );

    const input = screen.getByPlaceholderText(/Buscar por ticker/i);
    fireEvent.change(input, { target: { value: "VALE" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("VALE");
  });

  it("calls onSectorChange when selecting sector", () => {
    render(
      <AssetFiltersDesktop 
        sectors={sectors} 
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        currentSector=""
        onSectorChange={mockOnSectorChange}
      />
    );

    const select = screen.getByLabelText(/Filtrar por setor/i);
    fireEvent.change(select, { target: { value: "Finance" } });

    expect(mockOnSectorChange).toHaveBeenCalledWith("Finance");
  });
});
