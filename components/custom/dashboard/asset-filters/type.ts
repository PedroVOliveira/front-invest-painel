export interface AssetFiltersProps {
  sectors: string[];
}

export interface AssetFiltersViewProps extends AssetFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentSector: string;
  onSectorChange: (value: string) => void;
  onClear?: () => void;
  isPending?: boolean;
}
