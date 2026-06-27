import Link from "next/link";
import { MapPin, PlusCircle, ShieldCheck } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";

const links = [
  ["Map", "/map"],
  ["Dashboard", "/dashboard"],
  ["Leaderboard", "/leaderboard"],
  ["Street Score", "/street-score"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-orange">
            <ShieldCheck size={20} />
          </span>
          FixMySpot
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium text-muted transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonClassName({ variant: "ghost" })}>
            Login
          </Link>
          <Link href="/report" className={buttonClassName({ size: "sm" })}>
            <PlusCircle size={17} />
            Report
          </Link>
        </div>
        <Link href="/map" className="md:hidden">
          <MapPin className="text-orange" />
        </Link>
      </div>
    </header>
  );
}
