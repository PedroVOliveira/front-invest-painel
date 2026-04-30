"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, TrendingUp, BarChart3, Shield } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0042fe] p-14 text-white">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Verity Invest</span>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              Gerencie seus ativos com inteligência.
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Acompanhe ações, FIIs e outros ativos em tempo real com dados diretos da B3.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: BarChart3, text: "Cotações em tempo real via Brapi" },
              { icon: Shield, text: "Autenticação segura com GitHub SSO" },
              { icon: TrendingUp, text: "Análise e acompanhamento de portfólio" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-blue-50 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-sm">
          © {new Date().getFullYear()} Verity Invest. Todos os direitos reservados.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 bg-white">
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-[#0042fe] flex items-center justify-center">
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
              className="h-12 w-full gap-3 bg-gray-900 hover:bg-gray-700 text-white font-medium text-sm rounded-lg transition-all"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <User className="h-4 w-4" />
              Entrar com GitHub
            </Button>
          </CardContent>

          <CardFooter className="pt-0">
            <p className="text-center w-full text-xs text-gray-400 leading-relaxed">
              Ao entrar, você concorda com os nossos{" "}
              <span className="text-gray-600 underline underline-offset-2 cursor-pointer hover:text-gray-900 transition-colors">
                termos de uso
              </span>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
