import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const iranYekanX = localFont({
  src: [
    { path: "./fonts/IRANYekanXFaNum-Thin.woff2", weight: "100" },
    { path: "./fonts/IRANYekanXFaNum-UltraLight.woff2", weight: "200" },
    { path: "./fonts/IRANYekanXFaNum-Light.woff2", weight: "300" },
    { path: "./fonts/IRANYekanXFaNum-Medium.woff2", weight: "500" },
    { path: "./fonts/IRANYekanXFaNum-DemiBold.woff2", weight: "600" },
    { path: "./fonts/IRANYekanXFaNum-Bold.woff2", weight: "700" },
    { path: "./fonts/IRANYekanXFaNum-ExtraBold.woff2", weight: "800" },
    { path: "./fonts/IRANYekanXFaNum-Heavy.woff2", weight: "900" },
    { path: "./fonts/IRANYekanXFaNum-Black.woff2", weight: "950" },
    { path: "./fonts/IRANYekanXFaNum-ExtraBlack.woff2", weight: "1000" },
  ],
});

export const metadata: Metadata = {
  title: "دسترسی آسان به هوش مصنوعی",
  description: "لیست پلتفرم‌های رایگان هوش مصنوعی",
  openGraph: {
    title: "free-ai",
    description: "لیست پلتفرم‌های رایگان هوش مصنوعی",
    siteName: "free-ai",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${iranYekanX.className} h-full`}>
      <body className="min-h-full max-w-6xl mx-auto px-4 py-8">{children}</body>
    </html>
  );
}
