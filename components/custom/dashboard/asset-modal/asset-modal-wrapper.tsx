"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { ReactNode } from "react";

export function AssetModalWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent 
        className="fixed inset-0 translate-x-0 translate-y-0 w-full h-full max-w-none rounded-none border-0 p-0 overflow-y-auto bg-white duration-200 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-4xl sm:h-auto sm:max-h-[90vh] sm:rounded-3xl shadow-2xl"
        aria-describedby="asset-modal-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Detalhes do Ativo</DialogTitle>
          <DialogDescription id="asset-modal-description">
            Visualização detalhada dos dados e histórico do ativo financeiro.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>



  );
}
