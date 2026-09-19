import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFDFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
};

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
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg font-sans antialiased">
        <a
          href="#main"
          className="sr-only left-4 top-4 z-[100] rounded-md bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:block"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('engin_theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
      </body>
    </html>
  );
}
