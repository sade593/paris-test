import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paris Match International",
  description:
    "A visual international news experience powered by the Le Monde RSS feed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
