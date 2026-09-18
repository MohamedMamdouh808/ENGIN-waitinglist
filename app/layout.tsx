import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://engin.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ENGIN — From Intent to Software",
  description:
    "ENGIN turns plain-English product requirements into structured Blueprints and deterministically compiles them into working software.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "ENGIN — From Intent to Software",
    description:
      "Describe what you want. ENGIN validates it and compiles it into working software — the same Blueprint, every time.",
    url: siteUrl,
    siteName: "ENGIN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ENGIN — From Intent to Software",
    description:
      "Describe what you want. ENGIN validates it and compiles it into working software — the same Blueprint, every time.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-bg font-sans antialiased">{children}</body>
    </html>
  );
}
