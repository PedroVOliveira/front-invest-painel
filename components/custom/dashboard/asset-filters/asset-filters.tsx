"use client";

import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useQueryParams } from "@/lib/hooks/use-query-params";
import { AssetFiltersProps } from "./type";
import { AssetFiltersDesktop } from "./desktop/asset-filters-desktop";
import { AssetFiltersMobile } from "./mobile/asset-filters-mobile";

export function AssetFilters({ sectors }: AssetFiltersProps) {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [isPending, startTransition] = useTransition();
  
  const initialSearch = getQueryParam("search");
  const initialSector = getQueryParam("sector");
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    startTransition(() => {
      setQueryParam("search", debouncedSearch);
    });
  }, [debouncedSearch, setQueryParam]);

  const onSectorChange = (sector: string) => {
    startTransition(() => {
      setQueryParam("sector", sector);
    });
  };

  const onClear = () => {
    setSearchTerm("");
    startTransition(() => {
      setQueryParam("search", "");
      setQueryParam("sector", "");
    });
  };

  return (
    <>
      <div className="hidden md:block">
        <AssetFiltersDesktop 
          sectors={sectors}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentSector={initialSector}
          onSectorChange={onSectorChange}
          isPending={isPending}
        />
      </div>
      <div className="block md:hidden">
        <AssetFiltersMobile 
          sectors={sectors}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentSector={initialSector}
          onSectorChange={onSectorChange}
          onClear={onClear}
          isPending={isPending}
        />
      </div>
    </>
  );
}
