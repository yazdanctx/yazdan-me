"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X } from "lucide-react";
import { socialLinks } from "@/lib/social-links";
import { Button } from "@/lib/components/ui/button";

const pageLinks = [{ href: "/r", label: "مطالب پیشنهادی" }] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="border-b border-border sticky z-10 top-0 bg-background">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-2">
        <Link href="/" className="link ml-auto" aria-label="خانه">
          <Button variant="outline" size="icon">
            <Home className="size-4 text-white" />
          </Button>
        </Link>

        <div className="hidden sm:flex items-center gap-4">
          {pageLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link">
              {link.label}
            </Link>
          ))}
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="sm:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="size-4 text-white" />
          ) : (
            <Menu className="size-4 text-white" />
          )}
        </Button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-border bg-background"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4">
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href} className="link">
                {link.label}
              </Link>
            ))}
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
