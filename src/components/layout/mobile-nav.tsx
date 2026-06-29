"use client";

import Link from "next/link";
import { BarChart3, Home, Map, PlusCircle, Trophy, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/report", label: "Report", icon: PlusCircle },
  { href: "/dashboard", label: "Stats", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/leaderboard", label: "Rank", icon: Trophy }
];

export function MobileNav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-6 border-t border-border bg-card/95 md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-1 py-2 text-[10px] text-muted", active && "text-orange")}>
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
