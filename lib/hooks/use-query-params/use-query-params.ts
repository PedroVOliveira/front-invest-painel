"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getQueryParam = useCallback(
    (key: string) => searchParams.get(key) || "",
    [searchParams]
  );

  const setQueryParam = useCallback(
    (key: string, value: string) => {
      const currentValue = searchParams.get(key) || "";
      if (currentValue === value) return;

      const params = new URLSearchParams(searchParams.toString());
      
      if (!value) {
        params.delete(key);
        router.replace(`?${params.toString()}`, { scroll: false });
        return;
      }

      params.set(key, value);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return {
    getQueryParam,
    setQueryParam,
    searchParams,
  };
}
