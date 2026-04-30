import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-4xl font-bold tracking-tight">404</h2>
      <h3 className="text-xl font-semibold">Página não encontrada</h3>
      <p className="text-muted-foreground max-w-[500px]">
        O ativo ou a página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/" 
        className={cn(buttonVariants({ variant: "default" }), "mt-4")}
      >
        Voltar para o início
      </Link>
    </div>
  );
}
