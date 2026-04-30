"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold tracking-tight">Algo deu errado!</h2>
      <p className="text-muted-foreground max-w-[500px]">
        Ocorreu um erro inesperado no processamento dos dados. Por favor, tente novamente.
      </p>
      <div className="flex gap-2">
        <Button onClick={() => reset()} variant="default">
          Tentar novamente
        </Button>
        <Button onClick={() => (window.location.href = "/")} variant="outline">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
}
