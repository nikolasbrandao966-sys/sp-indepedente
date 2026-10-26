import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "São Paulo Independente — Movimento Separatista Paulista",
  description:
    "Assine o manifesto pela independência de São Paulo. Um movimento cívico, pacífico e suprapartidário que defende o direito de São Paulo decidir o próprio futuro.",
  keywords: [
    "São Paulo Independente",
    "Movimento Separatista Paulista",
    "Independência de São Paulo",
    "Manifesto paulista",
    "Autonomia de São Paulo",
  ],
  authors: [{ name: "Movimento São Paulo Independente" }],
  openGraph: {
    title: "São Paulo Independente — Movimento Separatista Paulista",
    description:
      "Assine o manifesto pela independência de São Paulo. O futuro de São Paulo nas mãos dos paulistas.",
    siteName: "São Paulo Independente",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "São Paulo Independente — Movimento Separatista Paulista",
    description:
      "Assine o manifesto pela independência de São Paulo. O futuro de São Paulo nas mãos dos paulistas.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
