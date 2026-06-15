import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { FichaProvider } from "@/components/providers/FichaProvider";
import { NewsProvider } from "@/components/providers/NewsProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";
import { ThemeScript } from "@/components/ThemeScript";
import { LogoPreloader } from "@/components/ui/LogoPreloader";
import { IMAGES, SITE } from "@/lib/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Descubre Ovalle y el Valle del Limarí: astroturismo, naturaleza, gastronomía, enoturismo, cultura y experiencias auténticas en el norte de Chile.",
  metadataBase: new URL("https://www.ovalleturismo.cl"),
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preload" as="image" href={IMAGES.logo} />
        <link rel="preload" as="image" href={IMAGES.logoCream} />
      </head>
      <body
        className={`${jakarta.variable} ${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <LogoPreloader />
        <SmoothScroll>
          <Suspense fallback={null}>
            <NewsProvider>
              <FichaProvider>
                <ScrollProgress />
                <TopBar />
                <Header />
                <main>
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </FichaProvider>
            </NewsProvider>
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}
