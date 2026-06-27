import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  title: "FixMySpot",
  description: "Hyperlocal civic issue reporting for neighborhoods."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
