"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(symbol: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

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
    revalidatePath("/dashboard");
    return;
  }

  await prisma.favoriteAsset.create({
    data: {
      userId,
      symbol,
    },
  });

  revalidatePath("/dashboard");
}

export async function getFavoriteAssets() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  const favorites = await prisma.favoriteAsset.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      symbol: true,
    },
  });

  return favorites.map((favorites: { symbol: string }) => favorites.symbol);
}
