"use client";

import { signIn } from "next-auth/react";
import { TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function LoginCard() {
  return (
    <section
      aria-label="Formulário de login"
      className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 bg-white"
    >
      <div className="flex lg:hidden items-center gap-2 mb-8" aria-label="Verity Invest">
        <div
          className="h-8 w-8 rounded-md bg-[#0042fe] flex items-center justify-center"
          aria-hidden="true"
        >
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Verity Invest</span>
      </div>

      <Card className="w-full max-w-sm border border-gray-100 shadow-md rounded-2xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Boas-vindas 👋
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Entre com sua conta GitHub para acessar o painel.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <Button
            id="github-login-btn"
            aria-label="Entrar com GitHub"
            className="h-12 w-full gap-3 bg-gray-900 hover:bg-gray-700 text-white font-medium text-sm rounded-lg transition-all"
            onClick={() => signIn("github", { callbackUrl: ROUTES.DASHBOARD })}
          >
            <User className="h-4 w-4" aria-hidden="true" />
            Entrar com GitHub
          </Button>
        </CardContent>

        <CardFooter className="pt-0">
          <p className="text-center w-full text-xs text-gray-400 leading-relaxed">
            Ao entrar, você concorda com os nossos{" "}
            <span
              role="link"
              tabIndex={0}
              className="text-gray-600 underline underline-offset-2 cursor-pointer hover:text-gray-900 transition-colors"
            >
              termos de uso
            </span>
            .
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
