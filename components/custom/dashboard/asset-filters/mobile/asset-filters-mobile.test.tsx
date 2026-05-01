import { render, screen } from "@testing-library/react";
import { AssetFiltersMobile } from "./asset-filters-mobile";
import { ReactNode } from "react";

jest.mock("@/components/ui/drawer", () => ({
  Drawer: ({ children, open }: { children: ReactNode; open: boolean }) => <div data-testid="drawer" data-open={open}>{children}</div>,
  DrawerContent: ({ children }: { children: ReactNode }) => <div data-testid="drawer-content">{children}</div>,
  DrawerTrigger: ({ children }: { children: ReactNode }) => <div data-testid="drawer-trigger">{children}</div>,
  DrawerHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerTitle: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerDescription: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerClose: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));


describe("AssetFiltersMobile", () => {
  const sectors = ["Energy"];
  const mockOnSearchChange = jest.fn();
  const mockOnSectorChange = jest.fn();

  it("renders trigger button with search term", () => {
    render(
      <AssetFiltersMobile 
        sectors={sectors} 
        searchTerm="PETR"
        onSearchChange={mockOnSearchChange}
        currentSector=""
        onSectorChange={mockOnSectorChange}
      />
    );
    expect(screen.getByText("PETR")).toBeInTheDocument();
  });

  it("renders 'Buscar ativos' when search is empty", () => {
    render(
      <AssetFiltersMobile 
        sectors={sectors} 
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        currentSector=""
        onSectorChange={mockOnSectorChange}
      />
    );
    expect(screen.getByText(/Buscar ativos ou filtrar/i)).toBeInTheDocument();
  });
});
