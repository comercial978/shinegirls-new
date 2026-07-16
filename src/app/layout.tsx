import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileCastingCta } from "@/components/mobile-casting-cta";
import { site } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.shortName,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/legacy/logo-shine-girls-root.jpg", width: 491, height: 491 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCastingCta />
        <Analytics />
      </body>
    </html>
  );
}
