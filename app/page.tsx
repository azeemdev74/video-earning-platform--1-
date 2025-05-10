"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Shield,
  Users,
  Award,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialsSection from "@/components/testimonials-section";
import PartnersSection from "@/components/partners-section";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSplash } from "@/components/splash-provider";
import { Menu, X } from "lucide-react";

export default function Home() {
  const { setIsLoading } = useSplash();
  const [menuOpen, setMenuOpen] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Play className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">Rewards Hub Dollor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
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
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </header> */}
      <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm transition-all duration-300">
        <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Play className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold text-gray-800">
              Rewards Hub Dollar
            </span>
          </Link>

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex flex-1 justify-center gap-10">
            {["Features", "About", "Testimonials", "Partners"].map((text) => (
              <Link
                key={text}
                href={`/${text.toLowerCase()}`}
                className="text-lg font-semibold text-gray-700 hover:text-primary transform transition-all duration-200 hover:scale-110"
              >
                {text}
              </Link>
            ))}
          </nav>

          {/* Buttons & Theme (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-200 hover:bg-gray-100 hover:scale-105"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                Register
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden bg-white px-6 py-4 border-t shadow">
            <nav className="flex flex-col gap-4 text-center">
              {["Features", "About", "Testimonials", "Partners"].map((text) => (
                <Link
                  key={text}
                  href={`/${text.toLowerCase()}`}
                  className="text-base font-medium text-gray-700 hover:text-primary transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </Link>
              ))}
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full mt-2 transition hover:scale-105"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full mt-1 transition hover:scale-105 hover:shadow-lg">
                  Register
                </Button>
              </Link>
              <div className="mt-2 flex justify-center">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        {/* Section 1 */}
        <section className="w-full py-12 md:py-20 lg:py-20 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-10">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Watch Videos & Earn Money
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of users who earn money by simply watching
                    videos on our platform. Sign up today and get a $5 bonus
                    instantly!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row space-x-4">
                  <Link href="/register">
                    <Button className="w-full min-[400px]:w-auto">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      variant="outline"
                      className="w-full min-[400px]:w-auto"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-base py-8">
                  Sign Up Now & Get $5 Welcome Bonus{" "}
                </p>
              </div>

              <img
                src="/img/hero-img.png"
                alt="Hero Image"
                className="mx-auto h-64 sm:h-80 md:h-96 lg:h-[500px] w-full rounded-xl object-cover object-center "
              />
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className=" px-6 py-16 lg:flex lg:items-center lg:justify-center">
          <div className="flex flex-col lg:flex-row gap-28 max-w-7xl mx-auto">
            {/* Left Stats Section */}
            <div className="flex gap-14 flex-wrap lg:flex-nowrap items-center justify-center">
              {/* Card 1 */}
              <div className="rounded-[2rem] overflow-hidden">
                <div className="bg-blue-500 text-white px-10 py-16 text-center">
                  <div className="text-3xl font-bold">+100K</div>
                  <div className="text-sm">Registered Users</div>
                </div>
                <div className="bg-green-500 text-white px-10 py-16 text-center">
                  <div className="text-3xl font-bold">+10K</div>
                  <div className="text-sm">Videos</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-[2rem] overflow-hidden">
                <div className="bg-green-500 text-white px-10 py-16 text-center">
                  <div className="text-3xl font-bold">$15M</div>
                  <div className="text-sm">Total Cash Paid</div>
                </div>
                <div className="bg-orange-400 text-white px-10 py-16 text-center">
                  <div className="text-3xl font-bold">+100M</div>
                  <div className="text-sm">Video Views</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-center max-w-xl text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4 leading-snug">
                Finally You Reached Your Destination for Highest Earnings!
              </h2>
              <p className=" mb- text-lg">
                DollarTub is a Rewards Platform where you can take part in
                watching paid videos, online surveys, install apps, complete
                tasks, watch ads etc in your free time and turn it into money.
              </p>

              {/* Video Mockup */}
              <div className="mt-8">
                <div className="rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto lg:mx-0">
                  <img
                    src="/img/player-cover.jpg" // image path
                    alt="Player-cover"
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 3 payout method */}
        <section className="px-4 py-16 my-24">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="text-center lg:text-left w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold  mb-4">
                Daily Payouts
              </h2>
              <p className=" text-lg md:text-xl leading-relaxed">
                We release cashouts of our members daily via Paypal, Cash App,
                Venmo etc.
              </p>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/img/payout-img.png"
                alt="Daily Payouts"
                className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain"
              />
            </div>
          </div>
        </section>
        {/* Section 4 higher rate */}
        <section className=" px-4 py-16 my-24">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/img/higher-rate-img.png"
                alt="Daily Payouts"
                className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain"
              />
            </div>

            {/* Right Image */}
            <div className="text-center lg:text-left w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold  mb-4">
                Higher Rates
              </h2>
              <p className=" text-lg md:text-xl leading-relaxed">
                DollarTub always pay their members the HIGHEST on all offers &
                surveys as compared to others.
              </p>
            </div>
          </div>
        </section>
        {/* Section 5 Global Offers */}
        <section className=" px-4 py-16">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">
              Global Offers
            </h2>
            {/* Subheading */}
            <p className="text-lg md:text-xl  mb-10 max-w-3xl">
              We have huge inventory of surveys & offers in our system for all
              our members across the globe.
            </p>
            {/* Illustration */}
            <img
              src="/img/global-offers-img.png"
              alt="Global Offers"
              className="w-full max-w-4xl object-contain"
            />
          </div>
        </section>
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
