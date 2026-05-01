"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { DataGridProps } from "./type";
import { cn } from "@/lib/utils";

export default function DataGrid<T extends { symbol?: string; stock?: string }>({
  data,
  columns,
  onRowClick,
  isLoading,
  emptyMessage = "Nenhum dado encontrado.",
  ariaLabel = "Tabela de dados",
}: DataGridProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse">
        <span className="text-gray-400 font-medium">Carregando dados...</span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <Table aria-label={ariaLabel}>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={column.header}
                className={cn(
                  "text-xs font-bold uppercase tracking-wider text-gray-500 py-4 px-6",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right"
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length} 
                className="h-32 text-center text-gray-400 font-medium"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => {
              const id = item.symbol || item.stock || `row-${index}`;
              return (
                <TableRow 
                  key={id}
                  className={cn(
                    "group transition-colors hover:bg-blue-50/30 cursor-pointer border-b border-gray-50 last:border-0",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${id}-${column.header}`}
                      className={cn(
                        "py-4 px-6 text-sm text-gray-600 font-medium",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right"
                      )}
                    >
                      {column.cell ? column.cell(item) : (item[column.accessorKey as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
