import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { useRouter, useSearchParams } from "next/navigation";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/dashboard"),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: { user: { id: "1", name: "Test User" } }, status: "authenticated" })),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/actions/asset-actions", () => ({
  getFavoriteAssets: jest.fn(async () => ["PETR4"]),
  toggleFavorite: jest.fn(async () => {}),
}));

describe("Dashboard Integration", () => {
  it("renders the dashboard with initial assets", async () => {
    const searchParams = Promise.resolve({});
    const Page = await DashboardPage({ searchParams });
    render(Page);

    expect(await screen.findByText("PETR4")).toBeInTheDocument();
    expect(await screen.findByText("VALE3")).toBeInTheDocument();
  });

  it("navigates to asset details on row click", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const searchParams = Promise.resolve({});
    const Page = await DashboardPage({ searchParams });
    render(Page);

    const petrRow = await screen.findByText("PETR4");
    fireEvent.click(petrRow);

    expect(push).toHaveBeenCalledWith("/dashboard/asset/PETR4");
  });
});
