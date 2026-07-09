import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { Home } from "lucide-react";
import { socialLinks } from "@/lib/social-links";
import "./globals.css";
import { Button } from "@/lib/components/ui/button";
import { FiGithub } from "react-icons/fi";

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
              <Button variant="outline" size="icon">
                <Home className="size-4 text-white" />
              </Button>
            </Link>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto flex items-center justify-between gap-5 max-w-3xl px-4 py-6  text-muted-foreground">
            <p>با خودت و دیگران مهربون باش، ماچ به کله ات 💋</p>
            <a
              href="https://github.com/yazdanctx/yazdan-me"
              className="flex items-center gap-1"
            >
              <FiGithub className="mt-0.5" />
              سورس کد روی گیتهاب
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
