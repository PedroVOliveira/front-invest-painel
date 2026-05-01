import { render, screen } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { userFactory } from "@/test/factories/user-factory";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: userFactory.createSession(), status: "authenticated" })),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/actions/asset-actions", () => ({
  getFavoriteAssets: jest.fn(async () => ["PETR4"]),
  toggleFavorite: jest.fn(async () => {}),
}));

jest.mock("@/components/custom/dashboard/user-menu", () => ({
  UserMenu: () => <div data-testid="user-menu-mock">User Menu</div>,
}));

jest.mock("@/components/custom/dashboard/asset-filters", () => ({
  AssetFilters: () => <div data-testid="asset-filters-mock" />,
}));

describe("Dashboard Integration", () => {
  it("renders the dashboard with assets fetched via MSW", async () => {
    const searchParams = Promise.resolve({});
    const Page = await DashboardPage({ searchParams });
    render(Page);

    expect((await screen.findAllByText("PETR4")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("VALE3")).length).toBeGreaterThan(0);
    expect(screen.getByTestId("asset-filters-mock")).toBeInTheDocument();
  });
});
