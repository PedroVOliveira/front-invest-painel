import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/session-provider"
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
    <html lang="pt-BR" className={`${outfit.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <SessionProvider>
          {children}
          {modal}
        </SessionProvider>
      </body>
    </html>
  );
}
