import { render, screen } from "@testing-library/react";
import LandingHero from "./landing-hero";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("LandingHero", () => {
  beforeEach(() => {
    render(<LandingHero />);
  });

  it("deve renderizar o h1 com o texto correto", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: /seus ativos/i })
    ).toBeInTheDocument();
  });

  it("deve renderizar a badge de categoria", () => {
    expect(screen.getByText(/plataforma de investimentos/i)).toBeInTheDocument();
  });

  it("deve renderizar o parágrafo descritivo", () => {
    expect(screen.getByText(/dados diretos da b3/i)).toBeInTheDocument();
  });

  it("deve renderizar o CTA com texto 'Começar agora'", () => {
    expect(screen.getByText(/começar agora/i)).toBeInTheDocument();
  });

  it("deve ter o link CTA apontando para /login", () => {
    const cta = screen.getByRole("link", { name: /começar agora/i });
    expect(cta).toHaveAttribute("href", "/login");
  });

  it("deve ter a seção com aria-labelledby apontando para o h1", () => {
    const section = screen.getByRole("region", {
      name: /seus ativos/i,
    });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-labelledby", "hero-heading");
  });

  it("o h1 deve ter o id 'hero-heading'", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "hero-heading");
  });
});
