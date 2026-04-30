import { render, screen } from "@testing-library/react";
import DashboardHeader from "./dashboard-header";

describe("DashboardHeader", () => {
  beforeEach(() => {
    render(<DashboardHeader />);
  });

  it("deve renderizar o elemento header com role=banner", () => {
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("deve renderizar o h1 com o título do dashboard", () => {
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /dashboard de investimentos/i,
      })
    ).toBeInTheDocument();
  });

  it("deve renderizar o subtítulo descritivo", () => {
    expect(
      screen.getByText(/área logada para gestão de ativos/i)
    ).toBeInTheDocument();
  });
});
