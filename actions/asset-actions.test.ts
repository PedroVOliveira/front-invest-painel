import { toggleFavorite, getFavoriteAssets } from "./asset-actions";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Mocks
jest.mock("next-auth");
jest.mock("@/lib/prisma", () => ({
  prisma: {
    favoriteAsset: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Asset Actions", () => {
  const mockUser = { id: "user-1", name: "Test User" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("toggleFavorite", () => {
    it("throws error if user is not authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(null);

      await expect(toggleFavorite("PETR4")).rejects.toThrow("Unauthorized");
    });

    it("creates a favorite if it does not exist", async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce({ user: mockUser });
      (prisma.favoriteAsset.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await toggleFavorite("PETR4");

      expect(prisma.favoriteAsset.create).toHaveBeenCalledWith({
        data: { userId: "user-1", symbol: "PETR4" },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });

    it("deletes a favorite if it already exists", async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce({ user: mockUser });
      (prisma.favoriteAsset.findUnique as jest.Mock).mockResolvedValueOnce({ id: "fav-1" });

      await toggleFavorite("PETR4");

      expect(prisma.favoriteAsset.delete).toHaveBeenCalledWith({
        where: { id: "fav-1" },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });
  });

  describe("getFavoriteAssets", () => {
    it("throws error if user is not authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce(null);

      await expect(getFavoriteAssets()).rejects.toThrow("Unauthorized");
    });

    it("returns list of favorite symbols", async () => {
      (getServerSession as jest.Mock).mockResolvedValueOnce({ user: mockUser });
      (prisma.favoriteAsset.findMany as jest.Mock).mockResolvedValueOnce([
        { symbol: "PETR4" },
        { symbol: "VALE3" },
      ]);

      const result = await getFavoriteAssets();
      expect(result).toEqual(["PETR4", "VALE3"]);
    });
  });
});
