"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/utils/firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import { Play, LogOut, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Footer from "@/components/footer";

const WithdrawPage = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const paymentMethods = [
    {
      name: "WhatsApp Payout",
      description:
        "Join our WhatsApp group to receive payout, updates, get support, and stay informed about the latest payment methods and announcements.",
      img: "/img/payout/whatsapp-payout.png",
      isWhatsApp: true,
      whatsappLink: "https://chat.whatsapp.com/KbbpZsCThxaGKxwf5WhbUy",
    },
    {
      name: "PayPal",
      description: "Get paid by direct transfer into your PayPal account.",
      img: "/img/payout/paypal-payout.png",
    },
    {
      name: "JazzCash",
      description: "Get paid by direct transfer into your JazzCash wallet.",
      img: "/img/payout/jazzcash-payout.png",
    },
    {
      name: "Binance",
      description: "Get paid by direct transfer into your Binance wallet.",
      img: "/img/payout/binance-payout.png",
    },
    {
      name: "Bank Transfer",
      description: "Get paid by direct transfer into your Bank account.",
      img: "/img/payout/bank-payout.png",
    },
  ];

  const sections = ["Dashboard", "Videos", "Task", "Referrals"];

  // Fetch user balance from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setLoading(true);
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setBalance(data.balance || 0);
          } else {
            setError("User data not found");
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
          setError("Failed to load balance. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const refreshBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setBalance(data.balance || 0);
      } else {
        setError("User data not found");
      }
    } catch (error) {
      console.error("Error refreshing balance:", error);
      setError("Failed to refresh balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header
        className={`sticky top-0 z-50 w-full bg-white dark:bg-black border-b dark:border-gray-800 transition-all duration-300 ${
          scrolled ? "h-16 shadow-lg dark:shadow-gray-800/50" : "h-20 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
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

          <nav className="hidden lg:flex flex-1 justify-center gap-10">
            {sections.map((text) => (
              <Link
                href={"/dashboard"}
                key={text}
                onClick={() => scrollToSection(text)}
                className="relative px-2 py-1 group transition-all duration-300 cursor-pointer"
              >
                <span className="block text-lg font-semibold group-hover:scale-110 group-hover:text-primary transition-transform duration-300 origin-center">
                  {text}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="icon" className="ml-2">
                <LogOut className="h-8 w-8" />
                <span className="sr-only">Logout</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>

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

      <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Center
          </h1>
          {error ? (
            <div className="text-red-500 mb-4">{error}</div>
          ) : loading ? (
            <div className="animate-pulse h-8 w-32 bg-gray-200 rounded mx-auto mb-8"></div>
          ) : (
            <div className="mb-8">
              <p className="text-xl font-semibold text-green-600">
                ${(balance + 30).toFixed(2)}{" "}
                <span className="text-gray-500 text-base">Account Balance</span>
              </p>
              <button
                onClick={refreshBalance}
                className="mt-2 text-sm text-blue-500 hover:text-blue-700 hover:underline"
              >
                Refresh Balance
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start"
            >
              <h2 className="text-xl font-semibold mb-2">{method.name}</h2>
              <div className="mb-3">
                <Image
                  src={method.img}
                  alt={method.name}
                  width={60}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-600 mb-4">{method.description}</p>
              {method.isWhatsApp ? (
                <Link
                  href={method.whatsappLink}
                  target="_blank"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Join on WhatsApp
                </Link>
              ) : (
                <button
                  className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition"
                  disabled={balance < 5.0}
                >
                  {balance < 5.0 ? "Minimum $5.00 required" : "Coming Soon..."}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WithdrawPage;
