import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { Home } from "lucide-react";
import { socialLinks } from "@/lib/social-links";
import "./globals.css";

const peyda = localFont({
  src: "./fonts/PeydaFaNumWeb-Regular.woff2",
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
    <html lang="fa" dir="rtl" className={peyda.className}>
      <body className="min-h-screen bg-pitch-black antialiased">
        <nav className="border-b border-border sticky top-0 bg-background">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-2">
            <Link href="/" className="ml-auto">
              <button className="border border-border rounded-lg size-9 inline-flex items-center justify-center hover:bg-accent transition-colors">
                <Home className="size-4" />
              </button>
            </Link>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <main className="mx-auto max-w-3xl px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
