import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yazdan's Blog",
  description: "Personal technical blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pitch-black text-gray-100 antialiased">
        <main className="mx-auto max-w-3xl px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
