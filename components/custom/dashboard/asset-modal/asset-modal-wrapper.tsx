"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactNode } from "react";

export function AssetModalWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white rounded-3xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
}
