import { render, screen } from "@testing-library/react";
import LandingHeader from "./landing-header";
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

describe("LandingHeader", () => {
  beforeEach(() => {
    render(<LandingHeader />);
  });

  it("should render brand name parts", () => {
    expect(screen.getByText(/Verity/i)).toBeInTheDocument();
    expect(screen.getByText(/Invest/i)).toBeInTheDocument();
  });

  it("should render header element with fixed positioning classes", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("fixed", "top-0", "w-full");
  });

  it("should render sign in link pointing to correct route", () => {
    const link = screen.getByRole("link", { name: /entrar/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", ROUTES.LOGIN);
  });

  it("should render home link pointing to root", () => {
    const homeLink = screen.getAllByRole("link")[0];
    expect(homeLink).toHaveAttribute("href", ROUTES.HOME);
  });
});
