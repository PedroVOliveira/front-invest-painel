import { render, screen } from "@testing-library/react";
import LandingHeader from "./landing-header";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("LandingHeader", () => {
  beforeEach(() => {
    render(<LandingHeader />);
  });

  it("deve renderizar o nome da marca", () => {
    expect(screen.getByText("Verity Invest")).toBeInTheDocument();
  });

  it("deve ter role=banner no elemento header", () => {
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("deve renderizar o link de navegação 'Entrar' apontando para /login", () => {
    const link = screen.getByRole("link", { name: /entrar/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });

  it("deve ter aria-label no wrapper da logo da marca", () => {
    const logoWrapper = screen.getByLabelText("Verity Invest");
    expect(logoWrapper).toBeInTheDocument();
  });

  it("deve ter nav com aria-label de navegação principal", () => {
    expect(
      screen.getByRole("navigation", { name: /navegação principal/i })
    ).toBeInTheDocument();
  });
});
