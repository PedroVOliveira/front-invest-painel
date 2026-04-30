import { render, screen } from "@testing-library/react";
import AssetChart from "./asset-chart";

// Mock ResponsiveContainer and other Recharts components to render children simply
jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
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
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    // Recharts components themselves are harder to test with JSDOM as they render SVGs 
    // that depend on sizing, but we can verify the container and that it didn't render error states.
    expect(screen.queryByText(/Carregando gráfico/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Dados históricos indisponíveis/i)).not.toBeInTheDocument();
  });
});
