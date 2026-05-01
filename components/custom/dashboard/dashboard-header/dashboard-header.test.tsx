import { render, screen } from "@testing-library/react";
import DashboardHeader from "./dashboard-header";
import { ROUTES } from "@/constants/routes";

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("DashboardHeader", () => {
  beforeEach(() => {
    render(<DashboardHeader />);
  });

  it("should render header element with role=banner", () => {
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render VerityInvest brand parts", () => {
    expect(screen.getByText(/Verity/i)).toBeInTheDocument();
    expect(screen.getByText(/Invest/i)).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    expect(screen.getByText(/Explorar/i)).toBeInTheDocument();
    expect(screen.getByText(/Favoritos/i)).toBeInTheDocument();
  });

  it("should render sign out button", () => {
    expect(screen.getByText(/Sair/i)).toBeInTheDocument();
  });
});
