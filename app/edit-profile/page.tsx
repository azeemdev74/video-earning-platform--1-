"use client";
import { useState, useEffect } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, Menu, Play, X } from "lucide-react";

import Footer from "@/components/footer";

export default function EditProfilePage() {
  const [name, setName] = useState("azeem");
  const [email, setEmail] = useState("azeemrauf@gmail.com");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = ["Dashboard", "Videos", "Task", "Referrals"];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleUpdate = () => {
    alert(`Profile updated:\nName: ${name}\nEmail: ${email}`);
    // You can integrate API call here
  };

  return (
    <div>
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
              <Link
                href={"/dashboard"}
                key={text}
                onClick={() => scrollToSection(text)}
                // href={`/${text.toLowerCase()}`}
                className="relative px-2 py-1 group transition-all duration-300 cursor-pointer"
              >
                <span className="block text-lg font-semibold group-hover:scale-110 group-hover:text-primary transition-transform duration-300 origin-center">
                  {text}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="icon" className="ml-2">
                <LogOut className="h-8 w-8" />
                <span className="sr-only">Logout</span>
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
                <Button variant="ghost" size="icon" className="ml-2">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Editable Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Editable Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-10 flex justify-end">
            <Button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
