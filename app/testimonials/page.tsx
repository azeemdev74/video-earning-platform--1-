import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold">Rewards Hub Dollar</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
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
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  User Testimonials
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Hear from our users who are earning money by watching videos.
                </p>
              </div>
            </div>
            <TestimonialsSection />
            <div className="mt-12 flex justify-center">
              <Link href="/register">
                <Button size="lg">Join Them Today</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
