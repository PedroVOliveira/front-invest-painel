"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ensureAuthenticated } from "@/lib/auth-utils";
import { ROUTES } from "@/constants/routes";

export async function toggleFavorite(symbol: string) {
  const session = await ensureAuthenticated();
  const userId = session.user.id;

  const existingFavorite = await prisma.favoriteAsset.findUnique({
    where: {
      userId_symbol: {
        userId,
        symbol,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favoriteAsset.delete({
      where: {
        id: existingFavorite.id,
      },
    });
    revalidatePath(ROUTES.DASHBOARD);
    revalidatePath(ROUTES.FAVORITES);
    return;
  }

  await prisma.favoriteAsset.create({
    data: {
      userId,
      symbol,
    },
  });

  revalidatePath(ROUTES.DASHBOARD);
  revalidatePath(ROUTES.FAVORITES);
}


export async function getFavoriteAssets() {
  const session = await ensureAuthenticated();

  const favorites = await prisma.favoriteAsset.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      symbol: true,
    },
  });

  return favorites.map((fav: { symbol: string }) => fav.symbol);
}
