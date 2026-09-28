import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StoreHydration } from "@/components/providers/store-hydration";
import { site } from "@/data/site";
import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-app-sans",
  preload: false,
});

const serif = Noto_Serif_TC({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-app-serif",
  preload: false,
});

const sceneGuard = `(function(){try{var narrow=window.matchMedia("(max-width: 767px)").matches;var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var nav=navigator;var conn=nav.connection;var lowCpu=nav.hardwareConcurrency&&nav.hardwareConcurrency<=2;var lowMem=nav.deviceMemory&&nav.deviceMemory<=2;if(narrow||reduce||lowCpu||lowMem||(conn&&conn.saveData)){document.documentElement.classList.add("scene-static");}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s｜弘泰科技",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-paper font-sans text-ink">
        <script dangerouslySetInnerHTML={{ __html: sceneGuard }} />
        <StoreHydration />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
