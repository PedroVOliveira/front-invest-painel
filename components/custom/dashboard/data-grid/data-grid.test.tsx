import { render, screen, fireEvent } from "@testing-library/react";
import DataGrid from "./data-grid";
import { DataGridColumn } from "./type";

interface MockData {
  symbol: string;
  name: string;
  price: number;
}

const columns: DataGridColumn<MockData>[] = [
  { header: "Ativo", accessorKey: "symbol" },
  { header: "Nome", accessorKey: "name" },
  { header: "Preço", accessorKey: "price", cell: (item) => `R$ ${item.price.toFixed(2)}` },
];

const mockData: MockData[] = [
  { symbol: "PETR4", name: "Petrobras", price: 35.50 },
  { symbol: "VALE3", name: "Vale", price: 70.20 },
];

describe("DataGrid Component", () => {
  it("renders the table headers correctly", () => {
    render(<DataGrid data={mockData} columns={columns} />);
    
    expect(screen.getByText(/ATIVO/i)).toBeInTheDocument();
    expect(screen.getByText(/NOME/i)).toBeInTheDocument();
    expect(screen.getByText(/PREÇO/i)).toBeInTheDocument();
  });

  it("renders the data rows correctly", () => {
    render(<DataGrid data={mockData} columns={columns} />);
    
    expect(screen.getByText("PETR4")).toBeInTheDocument();
    expect(screen.getByText("Petrobras")).toBeInTheDocument();
    expect(screen.getByText("R$ 35.50")).toBeInTheDocument();
  });

  it("calls onRowClick when a row is clicked", () => {
    const onRowClick = jest.fn();
    render(<DataGrid data={mockData} columns={columns} onRowClick={onRowClick} />);
    
    const row = screen.getByText("PETR4").closest("tr");
    if (row) fireEvent.click(row);
    
    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it("renders loading state correctly", () => {
    render(<DataGrid data={[]} columns={columns} isLoading={true} />);
    expect(screen.getByText("Carregando dados...")).toBeInTheDocument();
  });

  it("renders empty message when no data is provided", () => {
    render(<DataGrid data={[]} columns={columns} emptyMessage="Sem ativos" />);
    expect(screen.getByText("Sem ativos")).toBeInTheDocument();
  });
});
