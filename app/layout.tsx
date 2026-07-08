import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const iranyekan = localFont({
  src: "./fonts/IRANYekanXFaNum-Regular.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "وبلاگ یزدان",
  description: "وبلاگ شخصی فنی",
  metadataBase: new URL("https://yazdan.me"),
  openGraph: {
    images: ["/og/default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={iranyekan.className}>
      <body className="min-h-screen bg-pitch-black antialiased">
        <main className="mx-auto max-w-3xl px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
