"use client";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth, db } from "@/app/utils/firebaseConfig";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  DollarSign,
  Clock,
  Gift,
  LogOut,
  User,
  Settings,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSplash } from "@/components/splash-provider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Menu, X } from "lucide-react";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [videosWatched, setVideosWatched] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(0);
  const { setIsLoading } = useSplash();

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [timer, setTimer] = useState(35);
  const [canContinue, setCanContinue] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sections = ["Dashboard", "Videos", "Task", "Referrals"];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Fetch user data from Firestore with auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsLoading(true);
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setBalance(data.balance || 0);
            setVideosWatched(data.videosWatched || 0);
            setDailyGoal(data.dailyGoal || 0);
          } else {
            // Initialize new user document with $30 registration bonus
            const initialBalance = 30.0;
            await setDoc(userDocRef, {
              balance: initialBalance,
              videosWatched: 0,
              dailyGoal: 0,
              videoHistory: [],
              dailyWatchHistory: {},
              createdAt: new Date().toISOString(),
              lastActiveDate: new Date().toISOString().slice(0, 10),
              hasReceivedSignupBonus: true,
            });
            setBalance(initialBalance);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Video timer effect
  useEffect(() => {
    if (!showVideoModal || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanContinue(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showVideoModal, timer]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const startVideo = (videoId: string) => {
    setCurrentVideo(videoId);
    setTimer(35);
    setCanContinue(false);
    setShowVideoModal(true);
  };

  const handleContinue = async () => {
    if (!auth.currentUser || !currentVideo) return;

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const today = new Date().toISOString().slice(0, 10);

      // Calculate new values - earning $3 per video
      const newBalance = Number((balance + 3).toFixed(2));
      const newVideosWatched = videosWatched + 1;
      const newDailyGoal = Math.min(dailyGoal + 20, 100);

      // Update Firestore
      await updateDoc(userDocRef, {
        balance: newBalance,
        videosWatched: newVideosWatched,
        dailyGoal: newDailyGoal,
        videoHistory: arrayUnion({
          videoId: currentVideo,
          watchedAt: new Date().toISOString(),
          earned: 3,
        }),
        [`dailyWatchHistory.${today}`]: newVideosWatched,
        lastActiveDate: today,
      });

      // Update local state
      setBalance(newBalance);
      setVideosWatched(newVideosWatched);
      setDailyGoal(newDailyGoal);
      setShowVideoModal(false);
      setCurrentVideo(null);
    } catch (error) {
      console.error("Error updating user data:", error);
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
              <a
                key={text}
                onClick={() => scrollToSection(text)}
                className="relative px-2 py-1 group transition-all duration-300 cursor-pointer"
              >
                <span className="block text-lg font-semibold group-hover:scale-110 group-hover:text-primary transition-transform duration-300 origin-center">
                  {text}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
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

      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div id="dashboard" className="mb-8">
          <h1 className="text-2xl font-bold">Welcome back, User!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your account
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Current Balance</h3>
            </div>
            <p className="text-2xl font-bold">${(balance + 30).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ${balance >= 30 ? (balance - 30).toFixed(2) : "0.00"} earned +
              $30.00 bonus
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Play className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Videos Watched</h3>
            </div>
            <p className="text-2xl font-bold">{videosWatched}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ${(videosWatched * 3).toFixed(2)} earned from videos
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Daily Goal</h3>
            </div>
            <div className="space-y-2">
              <Progress value={dailyGoal} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {dailyGoal}% complete - Watch more videos to reach your goal
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Referral Bonus</h3>
            </div>
            <p className="text-2xl font-bold">$0.00</p>
            <p className="text-xs text-muted-foreground mt-1">
              Invite friends to earn more
            </p>
          </div>
        </div>

        <section id="videos">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="md:col-span-2 rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
              <div className="space-y-4">
                {[
                  { id: "dQw4w9WgXcQ", title: "Learn Fast" },
                  { id: "9bZkp7q19f0", title: "Motivation 101" },
                  { id: "3JZ_D3ELwOQ", title: "Success Hacks" },
                ].map((video) => (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-lg border hover:bg-muted cursor-pointer"
                  >
                    <div className="relative w-full sm:w-32 h-20 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                        alt={`Thumbnail`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-black/60 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Duration: ~3min • Earn: $3
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startVideo(video.id)}
                    >
                      Watch
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="link">View All Videos</Button>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  href="/withdraw"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Withdraw Earnings</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/edit-profile"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <span>Edit Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/account-settings"
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-2xl w-full">
          <div className="relative aspect-video mb-4">
            {currentVideo && (
              <iframe
                className="w-full h-full rounded"
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&controls=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
          {!canContinue ? (
            <p className="text-center text-sm text-muted-foreground">
              Please watch for {timer} seconds...
            </p>
          ) : (
            <div className="text-center">
              <Button onClick={handleContinue}>Continue & Earn $3</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
