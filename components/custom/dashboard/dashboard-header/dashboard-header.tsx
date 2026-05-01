"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Star, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function DashboardHeader() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Explorar",
      href: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: "Favoritos",
      href: ROUTES.FAVORITES,
      icon: Star,
    },
  ];

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-black text-xs">V</span>
            </div>
            <span className="text-lg font-black text-gray-900 tracking-tight hidden sm:block">
              Verity<span className="text-blue-600">Invest</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                    isActive 
                      ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive ? "text-blue-600" : "text-gray-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 font-bold transition-colors gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

