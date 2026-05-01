import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function AssetListLoadingMobile() {
  return (
    <div className="space-y-6">
      <div className="h-12 w-full bg-white border border-gray-100 rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-48 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-6 w-20 bg-gray-100 rounded" />
                <div className="h-4 w-32 bg-gray-50 rounded" />
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-xl" />
            </div>
            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-end">
              <div className="space-y-1">
                <div className="h-4 w-12 bg-gray-50 rounded" />
                <div className="h-8 w-24 bg-gray-100 rounded" />
              </div>
              <div className="h-6 w-16 bg-blue-50 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetListLoadingDesktop() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <div className="flex-1 h-12 bg-white border border-gray-100 rounded-xl animate-pulse" />
        <div className="w-[200px] h-12 bg-white border border-gray-100 rounded-xl animate-pulse" />
      </div>
      <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="py-4 px-6 h-12 w-[300px]"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></TableHead>
              <TableHead className="py-4 px-6 h-12"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></TableHead>
              <TableHead className="py-4 px-6 h-12"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></TableHead>
              <TableHead className="py-4 px-6 h-12"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></TableHead>
              <TableHead className="py-4 px-6 h-12"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></TableHead>
              <TableHead className="py-4 px-6 h-12 text-center"><div className="h-4 w-12 bg-gray-200 rounded mx-auto animate-pulse" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <TableRow key={i} className="border-b border-gray-50">
                <TableCell className="py-6 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-50 rounded animate-pulse" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6"><div className="h-5 w-20 bg-gray-100 rounded animate-pulse" /></TableCell>
                <TableCell className="py-6 px-6"><div className="h-7 w-16 bg-gray-100 rounded-full animate-pulse" /></TableCell>
                <TableCell className="py-6 px-6"><div className="h-5 w-16 bg-gray-100 rounded animate-pulse" /></TableCell>
                <TableCell className="py-6 px-6"><div className="h-5 w-24 bg-gray-100 rounded-full animate-pulse" /></TableCell>
                <TableCell className="py-6 px-6"><div className="h-8 w-8 bg-gray-100 rounded-full mx-auto animate-pulse" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function AssetListLoading() {
  return (
    <>
      <div className="hidden md:block">
        <AssetListLoadingDesktop />
      </div>
      <div className="block md:hidden">
        <AssetListLoadingMobile />
      </div>
    </>
  );
}
