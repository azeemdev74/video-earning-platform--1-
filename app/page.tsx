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
import { motion } from "framer-motion";
import "./page.css";

export default function Home() {
  const { setIsLoading } = useSplash();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate initial loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const sections = ["Features", "About", "Testimonials", "Partners"];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`sticky top-0 z-50 w-full bg-white dark:bg-black border-b dark:border-gray-800 transition-all duration-300 ${
          scrolled ? "h-16 shadow-lg dark:shadow-gray-800/50" : "h-20 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Play
              className={`text-primary transition-all duration-300 ${
                scrolled ? "h-5 w-5" : "h-6 w-6"
              } group-hover:scale-110`}
            />
            <span
              className={`ml-2 font-bold transition-all duration-300 ${
                scrolled ? "text-lg" : "text-xl"
              } group-hover:text-primary`}
            >
              Rewards Hub Dollar
            </span>
          </Link>

          {/* Desktop Navigation with Larger Text */}
          <nav className="hidden lg:flex flex-1 justify-center gap-10">
            {sections.map((text) => (
              <a
                key={text}
                onClick={() => scrollToSection(text)}
                // href={`/${text.toLowerCase()}`}
                className="relative px-2 py-1 group transition-all duration-300 cursor-pointer"
              >
                <span className="block text-lg font-semibold group-hover:scale-110 group-hover:text-primary transition-transform duration-300 origin-center">
                  {text}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                size={scrolled ? "sm" : "default"}
                className="hover:scale-105 transition-transform duration-300 text-base"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size={scrolled ? "sm" : "default"}
                className="hover:scale-105 hover:shadow-lg transition-all duration-300 text-base"
              >
                Register
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 dark:text-white hover:scale-110 transition-transform duration-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white dark:bg-black overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-96 border-t dark:border-gray-800 shadow-inner"
              : "max-h-0"
          }`}
        >
          <div className="px-4 py-3 flex flex-col space-y-4">
            {sections.map((text) => (
              <a
                key={text}
                href={`/${text.toLowerCase()}`}
                className="py-3 px-3 text-lg font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200 origin-left"
                onClick={() => setMenuOpen(false)}
              >
                {text}
              </a>
            ))}
            <div className="pt-3 flex gap-4">
              <Link
                href="/login"
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full hover:scale-105 text-base"
                >
                  Login
                </Button>
              </Link>
              <Link
                href="/register"
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              >
                <Button size="lg" className="w-full hover:scale-105 text-base">
                  Register
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Section 1 */}
        <section className="w-full mt-12 md:mt-12 lg:mt-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-32 lg:grid-cols-2 items-center ">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="space-y-8 text-center lg:text-left">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                    Watch Videos & Earn Money
                  </h1>
                  <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
                    Join thousands of users who earn money by simply watching
                    videos on our platform. Sign up today and get a $30 bonus
                    instantly!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                  <Link href="/register">
                    <Button className="w-full sm:w-auto animate-pulse">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto transition-all hover:scale-105"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                <p className="max-w-[600px] text-muted-foreground text-center lg:text-left md:text-base py-4">
                  Sign Up Now & Get $30 Welcome Bonus
                </p>
              </motion.div>

              {/* Right Image */}
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                src="/img/hero-img.png"
                alt="Hero"
                className="mx-auto h-72 sm:h-80 md:h-96 lg:h-[490px] w-full rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section id="about" className="px-6 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 max-w-7xl mx-auto items-center justify-between">
            {/* Left Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
              className="flex flex-row justify-center gap-10 overflow-x-auto px-2"
            >
              {/* Card 1 */}
              <div
                id="card-1"
                className=" w-[140px] sm:w-[160px] md:w-[220px] h-[250px] sm:h-[300px] md:h-[320px] lg:h-[430px] rounded-3xl overflow-hidden shadow-lg flex-shrink-0"
              >
                <div className="bg-blue-500 text-white px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 text-center h-1/2 flex flex-col justify-center gap-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                    +100K
                  </div>
                  <div className="text-xs sm:text-sm md:text-base">
                    Registered Users
                  </div>
                </div>
                <div className="bg-green-500 text-white px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 text-center h-1/2 flex flex-col justify-center gap-2">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                    +10K
                  </div>
                  <div className="text-xs sm:text-sm md:text-base">Videos</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-[140px] sm:w-[160px] md:w-[220px] h-[250px] sm:h-[300px] md:h-[320px] lg:h-[430px] rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
                <div className="bg-green-500 text-white px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 text-center h-1/2 flex flex-col justify-center gap-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                    $15M
                  </div>
                  <div className="text-xs sm:text-sm md:text-base">
                    Total Cash Paid
                  </div>
                </div>
                <div className="bg-orange-400 text-white px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 text-center h-1/2 flex flex-col justify-center gap-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                    +100M
                  </div>
                  <div className="text-xs sm:text-sm md:text-base">
                    Video Views
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-xl text-center lg:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-snug">
                Finally You Reached Your Destination for Highest Earnings!
              </h2>
              <p className="text-lg text-muted-foreground">
                DollarTub is a Rewards Platform where you can watch paid videos,
                take surveys, install apps, complete tasks, and more — all in
                your free time and turn it into real cash.
              </p>

              {/* Video Mockup */}
              <div className="mt-8">
                <div className="rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto lg:mx-0 transition-transform hover:scale-105 duration-300">
                  <img
                    src="/img/player-cover.jpg"
                    alt="Player cover"
                    className="w-full cursor-pointer object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Section 3 payout method */}
        <section id="features" className="px-4 py-16 my-24">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
              className="text-center lg:text-left w-full lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold  mb-4">
                Daily Payouts
              </h2>
              <p className=" text-lg md:text-xl leading-relaxed">
                We release cashouts of our members daily via Paypal, Cash App,
                Venmo etc.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <img
                src="/img/payout-img.png"
                alt="Daily Payouts"
                className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain"
              />
            </motion.div>
          </div>
        </section>
        {/* Section 4 higher rate */}
        <section className=" px-4 py-16 my-24">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <img
                src="/img/higher-rate-img.png"
                alt="Daily Payouts"
                className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain"
              />
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
              className="text-center lg:text-left w-full lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold  mb-4">
                Higher Rates
              </h2>
              <p className=" text-lg md:text-xl leading-relaxed">
                DollarTub always pay their members the HIGHEST on all offers &
                surveys as compared to others.
              </p>
            </motion.div>
          </div>
        </section>
        {/* Section 5 Global Offers */}
        <section className=" px-4 py-16">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
            >
              <img
                src="/img/global-offers-img.png"
                alt="Global Offers"
                className="w-full max-w-4xl object-contain"
              />
            </motion.div>
          </div>
        </section>
        <section id="testimonials">
          {" "}
          <TestimonialsSection />
        </section>
        <section id="partners">
          {" "}
          <PartnersSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
