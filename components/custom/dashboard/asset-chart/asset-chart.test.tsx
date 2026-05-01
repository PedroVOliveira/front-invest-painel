import { render, screen } from "@testing-library/react";
import AssetChart from "./asset-chart";
import { ReactNode } from "react";

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AreaChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Area: () => <div />,
  Tooltip: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
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
