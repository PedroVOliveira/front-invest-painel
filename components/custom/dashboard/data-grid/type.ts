import { ReactNode } from "react";

export interface DataGridColumn<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => ReactNode;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

export interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  ariaLabel?: string;
}
