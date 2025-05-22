"use client";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
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
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSplash } from "@/components/splash-provider";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [videosWatched, setVideosWatched] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const { setIsLoading } = useSplash();
  const [showSignupBonus, setShowSignupBonus] = useState(false);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [timer, setTimer] = useState(35);
  const [canContinue, setCanContinue] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [videos, setVideos] = useState<Video[]>([]);

  const sections = ["Dashboard", "Withdraw", "Task", "Referral"];

  // Sample video data
  const sampleVideos: Video[] = [
    {
      id: "dQw4w9WgXcQ",
      title: "Amazing Product Review",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      duration: "3:45",
    },
    {
      id: "9bZkp7q19f0",
      title: "Tech Gadgets Unboxing",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
      duration: "4:20",
    },
    {
      id: "JGwWNGJdvx8",
      title: "Latest Fashion Trends",
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg",
      duration: "2:55",
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Travel Destination Guide",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
      duration: "5:10",
    },
  ];

  useEffect(() => {
    setVideos(sampleVideos);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setBalance(data.balance || 0);
            setVideosWatched(data.videosWatched || 0);
            setDailyGoal(data.dailyGoal || 0);
            setReferralEarnings(data.referralEarnings || 0);

            if (
              data.hasReceivedSignupBonus &&
              !localStorage.getItem("signupBonusShown")
            ) {
              setShowSignupBonus(true);
              localStorage.setItem("signupBonusShown", "true");
            }

            if (data.referralCode) {
              const referralsQuery = query(
                collection(db, "users"),
                where("referredBy", "==", data.referralCode)
              );
              const querySnapshot = await getDocs(referralsQuery);
              setReferralCount(querySnapshot.size);
            }
          } else {
            const initialBalance = 30.0; // $30 signup bonus
            const referralCode = generateReferralCode(user.uid);

            await setDoc(userDocRef, {
              balance: initialBalance,
              videosWatched: 0,
              dailyGoal: 0,
              videoHistory: [],
              dailyWatchHistory: {},
              createdAt: new Date().toISOString(),
              lastActiveDate: new Date().toISOString().slice(0, 10),
              hasReceivedSignupBonus: true,
              referralCode: referralCode,
              referralEarnings: 0,
              referredBy: null,
            });

            setBalance(initialBalance);
            setShowSignupBonus(true);
            localStorage.setItem("signupBonusShown", "true");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoadingUserData(false);
        }
      } else {
        setLoadingUserData(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const generateReferralCode = (uid: string) => {
    return uid.slice(0, 8).toUpperCase();
  };

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
      const newBalance = Number((balance + 3).toFixed(2));
      const newVideosWatched = videosWatched + 1;
      const newDailyGoal = Math.min(dailyGoal + 20, 100);

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
      {/* Signup Bonus Notification */}
      {showSignupBonus && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
            <Gift className="w-5 h-5" />
            <span>Welcome bonus! $30 has been added to your account</span>
            <button
              onClick={() => setShowSignupBonus(false)}
              className="ml-2 p-1 rounded-full hover:bg-green-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* <header
        className={`sticky top-0 z-40 w-full bg-white dark:bg-black border-b dark:border-gray-800 transition-all duration-300 ${
          scrolled ? "h-16 shadow-lg dark:shadow-gray-800/50" : "h-20 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="text-xl font-bold">
              EarnView
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </header> */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center gap-10">
            {sections.map((text) =>
              text.toLowerCase() === "withdraw" ||
              text.toLowerCase() === "referral" ? (
                // For Withdraw and Profile - link to separate pages
                <Link
                  href={`/${text.toLowerCase()}`}
                  key={text}
                  className="relative px-2 py-1 group transition-all duration-300 cursor-pointer"
                >
                  <span className="block text-lg font-semibold group-hover:scale-110 group-hover:text-primary transition-transform duration-300 origin-center">
                    {text}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              ) : (
                // For Dashboard and Referral - scroll to section
                <Link
                  href="/dashboard"
                  key={text}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(text);
                  }}
                  className="relative px-2 py-1 group transition-all duration-300 cursor-pointer"
                >
                  <span className="block text-lg font-semibold group-hover:scale-110 group-hover:text-primary transition-transform duration-300 origin-center">
                    {text}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              )
            )}
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

        {/* Mobile Navigation */}

        <div
          className={`lg:hidden bg-white dark:bg-black overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-96 border-t dark:border-gray-800 shadow-inner"
              : "max-h-0"
          }`}
        >
          <div className="px-4 py-3 flex flex-col space-y-4">
            {sections.map((text) => (
              <Link
                key={text}
                href={
                  text.toLowerCase() === "dashboard"
                    ? "/dashboard"
                    : text.toLowerCase() === "referral"
                    ? "/referral" // Changed this line to go to referral page
                    : `/${text.toLowerCase()}`
                }
                className="py-3 px-3 text-lg font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200 origin-left"
                onClick={(e) => {
                  if (text.toLowerCase() === "dashboard") {
                    e.preventDefault();
                    scrollToSection(text);
                  }
                  setMenuOpen(false);
                }}
              >
                {text}
              </Link>
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
        {loadingUserData ? (
          <p className="text-center text-muted-foreground">
            Loading dashboard...
          </p>
        ) : (
          <div className="container mx-auto space-y-8">
            {/* Dashboard Stats */}
            <section id="dashboard" className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <DollarSign className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-2xl font-bold">
                        ${balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <Play className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Videos Watched
                      </p>
                      <p className="text-2xl font-bold">{videosWatched}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Daily Goal
                      </p>
                      <Progress value={dailyGoal} className="h-2 mt-2" />
                      <p className="text-sm mt-1">{dailyGoal}% complete</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <Gift className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Referrals</p>
                      <p className="text-2xl font-bold">{referralCount}</p>
                      <p className="text-sm">
                        Earned: ${referralEarnings.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Video Recommendations */}
            <section id="videos" className="space-y-6">
              <h2 className="text-2xl font-bold">Available Videos</h2>
              <p className="text-muted-foreground">
                Watch these videos to earn money
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                      <button
                        onClick={() => startVideo(video.id)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity"
                      >
                        <Play className="w-12 h-12 text-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-2">
                        {video.title}
                      </h3>
                      <Button
                        onClick={() => startVideo(video.id)}
                        className="w-full mt-3"
                        variant="default"
                      >
                        Watch & Earn $3
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Withdraw Section */}
            <section id="referrals" className="space-y-6">
              <h2 className="text-2xl font-bold">Withdraw</h2>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium">
                      Video dekhne ke baad withdraw lene ke liye aap hum se
                      WhatsApp par raabta karein.
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Please click the withdraw Button
                    </p>
                  </div>
                  <Link
                    href={"https://chat.whatsapp.com/EBhmdiaB9879OvjQIewBeR"}
                  >
                    {" "}
                    <Button variant="default">Withdraw</Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Referral Section */}
            <section id="referrals" className="space-y-6">
              <h2 className="text-2xl font-bold">Refer Friends</h2>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium">
                      Invite friends and earn 20% of their earnings
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Share your referral link and start earning more
                    </p>
                  </div>
                  <Link href={"/referral"}>
                    {" "}
                    <Button variant="default">Copy Referral Link</Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="bg-white dark:bg-gray-900 h-full w-4/5 max-w-sm p-4">
            <div className="flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between"
                >
                  {section}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
              <div className="border-t dark:border-gray-800 pt-4">
                <button className="w-full py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
                <button className="w-full py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center">
                  <CreditCard className="w-5 h-5 mr-3" />
                  Withdraw
                </button>
                <button className="w-full py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center text-red-500">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
