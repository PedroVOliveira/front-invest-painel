import { render, screen } from "@testing-library/react";
import AssetChart from "./asset-chart";
import { ReactNode } from "react";

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  AreaChart: ({ children }: { children: ReactNode }) => <svg data-testid="area-chart">{children}</svg>,
  Area: () => <g data-testid="area" />,
  Tooltip: () => <g data-testid="tooltip" />,
  XAxis: () => <g data-testid="x-axis" />,
  YAxis: () => <g data-testid="y-axis" />,
}));

describe("AssetChart", () => {
  const mockData = [
    { date: "01/01", price: 10 },
    { date: "02/01", price: 12 },
    { date: "03/01", price: 11 },
  ];

  it("renders loading state", () => {
    render(<AssetChart data={[]} isLoading={true} />);
    expect(screen.getByText(/Carregando gráfico/i)).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<AssetChart data={[]} isLoading={false} />);
    expect(screen.getByText(/Dados históricos indisponíveis/i)).toBeInTheDocument();
  });

  it("renders chart when data is provided", () => {
    render(<AssetChart data={mockData} isLoading={false} />);
    expect(screen.queryByText(/Carregando gráfico/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Dados históricos indisponíveis/i)).not.toBeInTheDocument();
  });
});
