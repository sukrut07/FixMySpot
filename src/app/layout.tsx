import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  metadataBase: new URL("https://fixmyspot.app"),
  title: "FixMySpot — Your Neighborhood, Live",
  description: "See what's broken near you. Report issues, ask neighbors, find services — all within your radius. Free. No signup to browse.",
  openGraph: {
    title: "FixMySpot — Your Neighborhood, Live",
    description: "See what's broken near you. Report issues, ask neighbors, find services — all within your radius.",
    images: ["/og-fixmyspot.png"]
  },
  icons: {
    icon: [
      {
        url: `data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path fill='#7C3AED' d='M32 4C20.4 4 11 13.4 11 25c0 15.8 21 35 21 35s21-19.2 21-35C53 13.4 43.6 4 32 4Z'/><circle cx='32' cy='25' r='13' fill='white'/><path fill='#7C3AED' d='M27 17h13v5h-7v4h6v5h-6v8h-6V17Z'/></svg>")}`,
        type: "image/svg+xml"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#7C3AED"
};

const themeScript = `
(() => {
  try {
    const savedTheme = window.localStorage.getItem("theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : preferredTheme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.classList.add("dark");
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
