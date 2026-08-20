import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FiGithub } from "react-icons/fi";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SiteNav } from "./_components/site-nav";
// changed
const peyda = localFont({
  src: "./fonts/PeydaFaNumWeb-Regular.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antimatter 0.1",
  description: "اینجا از خودم و چیزهایی که یاد میگیرم مینویسم.",
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
        <NuqsAdapter>
          <SiteNav />
          <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
            {children}
          </main>
          <footer className="border-t border-border">
            <div className="mx-auto md:flex items-center justify-between gap-5 max-w-3xl px-4 py-6  text-muted-foreground">
              <p>با خودت و دیگران مهربون باش، ماچ به کله ات 💋</p>
              <a
                href="https://github.com/yazdanctx/yazdan-me"
                className="link flex items-center gap-1"
                target="_blank"
              >
                <FiGithub className="mt-0.5" />
                سورس کد روی گیتهاب
              </a>
            </div>
          </footer>
        </NuqsAdapter>
      </body>
    </html>
  );
}
