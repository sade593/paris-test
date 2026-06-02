import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-firago-fallback",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Paris Match" }],
  creator: "Paris Match",
  publisher: "Paris Match",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
