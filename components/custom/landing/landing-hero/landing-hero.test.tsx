import { render, screen } from "@testing-library/react";
import LandingHero from "./landing-hero";
import { ROUTES } from "@/constants/routes";

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

describe("LandingHero", () => {
  beforeEach(() => {
    render(<LandingHero />);
  });

  it("should render main heading", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Seus ativos/i)).toBeInTheDocument();
  });

  it("should render platform badge", () => {
    expect(screen.getByText(/Plataforma de investimentos/i)).toBeInTheDocument();
  });

  it("should render call to action button with correct route", () => {
    const cta = screen.getByRole("link", { name: /começar agora/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", ROUTES.LOGIN);
  });
});
