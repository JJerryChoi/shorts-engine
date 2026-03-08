import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://shorts-engine.vercel.app",
  ),
  title: "Shorts Engine",
  description: "Discover products from viral short-form videos.",
  openGraph: {
    title: "Shorts Engine",
    description: "Discover products from viral short-form videos.",
    type: "website",
    siteName: "Shorts Engine",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
