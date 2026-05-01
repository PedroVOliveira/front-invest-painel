import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { useRouter, useSearchParams } from "next/navigation";

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

    expect((await screen.findAllByText("PETR4")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("VALE3")).length).toBeGreaterThan(0);
  });

  it("navigates to asset details on interaction", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const searchParams = Promise.resolve({});
    const Page = await DashboardPage({ searchParams });
    render(Page);

    const petrElements = await screen.findAllByText("PETR4");
    fireEvent.click(petrElements[0]);

    expect(push).toHaveBeenCalledWith("/dashboard/asset/PETR4");
  });
});
