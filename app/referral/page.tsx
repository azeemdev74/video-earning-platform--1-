"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/utils/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Play, LogOut, X, Menu } from "lucide-react";
import Footer from "@/components/footer";

const Referrals = () => {
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [userId, setUserId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const sections = ["Dashboard", "Withdraw", "Task", "Referrals"];

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

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        const generatedLink = `${window.location.origin}/signup?ref=${uid}`;
        setReferralLink(generatedLink);

        const userDocRef = doc(db, "users", uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setReferralCount(data.referralCount || 0);
            setReferralEarnings(data.referralEarnings || 0);
          }
        });

        // Clean up Firestore listener
        return () => unsubscribeDoc();
      } else {
        setReferralLink("");
        setReferralCount(0);
        setReferralEarnings(0);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Referral link copied!",
        description: "You can now share it with friends.",
      });
    } catch (error) {
      console.error("Copy failed", error);
      toast({
        title: "Error copying link",
        description: "Please try manually.",
      });
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
          <Link href="/dashboard" className="flex items-center group">
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

      <section className="p-4 max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Refer & Earn</h1>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Referral Link</label>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly />
            <Button onClick={handleCopyLink}>Copy</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 border rounded-lg shadow">
            <p className="text-lg font-semibold">{referralCount}</p>
            <p className="text-sm text-muted-foreground">Referrals</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <p className="text-lg font-semibold">
              ${referralEarnings.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Earnings</p>
          </div>
        </div>
        <h1 className="pt-11">
          <b>Note:</b> Referral earning will be withdraw after verification.
          Please make sure to join our official WhatsApp group to complete the
          process.
        </h1>
      </section>
      <section className="mt-36">
        <Footer />
      </section>
    </div>
  );
};

export default Referrals;
