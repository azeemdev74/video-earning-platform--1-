"use client";
import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Rewards Hub Dollar</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Rewards Hub Dollar. All rights
            reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
            <Link
              href="/partners"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Partners
            </Link>
          </nav>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
