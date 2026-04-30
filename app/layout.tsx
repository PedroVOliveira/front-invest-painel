import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard de Investimentos | Verity",
  description: "Gerencie seus ativos com eficiência",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} antialiased dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-primary/30">
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-8">
            {children}
          </main>
          {modal}
        </div>
      </body>
    </html>
  );
}
