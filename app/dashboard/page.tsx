"use client";

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

export default function DashboardPage() {
  const [balance, setBalance] = useState(5.0);
  const [videosWatched, setVideosWatched] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(0);
  const { setIsLoading } = useSplash();

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [timer, setTimer] = useState(35);
  const [canContinue, setCanContinue] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

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

  const startVideo = (videoId: string) => {
    setCurrentVideo(videoId);
    setTimer(35);
    setCanContinue(false);
    setShowVideoModal(true);
  };

  const handleContinue = () => {
    setShowVideoModal(false);
    setCurrentVideo(null);
    setBalance((prev) => Number.parseFloat((prev + 0.25).toFixed(2)));
    setVideosWatched((prev) => prev + 1);
    setDailyGoal((prev) => Math.min(prev + 20, 100));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold">Rwards Hub Dollor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/videos"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Videos
          </Link>
          <Link
            href="/dashboard/earnings"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Earnings
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Settings
          </Link>
        </nav>
        <div className="ml-2">
          <ThemeToggle />
        </div>
        <Button variant="ghost" size="icon" className="ml-2">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </header>

      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome back, User!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your account
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Balance */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Current Balance</h3>
            </div>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ${(balance - 5).toFixed(2)} earned + $5.00 bonus
            </p>
          </div>

          {/* Videos Watched */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Play className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Videos Watched</h3>
            </div>
            <p className="text-2xl font-bold">{videosWatched}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ${(videosWatched * 0.25).toFixed(2)} earned from videos
            </p>
          </div>

          {/* Daily Goal */}
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

          {/* Referral */}
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

        {/* Recommended Videos */}
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
                      Duration: ~3min • Earn: $0.25
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

          {/* Quick Actions */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="#"
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Withdraw Earnings</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
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

        {/* Recent Earnings */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Recent Earnings</h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[300px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Activity</th>
                  <th className="text-left p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 text-sm">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="p-2 text-sm">Sign Up Bonus</td>
                  <td className="p-2 text-sm text-green-600">+$5.00</td>
                </tr>
                {videosWatched > 0 ? (
                  <tr className="border-b">
                    <td className="p-2 text-sm">
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="p-2 text-sm">
                      Watched {videosWatched} videos
                    </td>
                    <td className="p-2 text-sm text-green-600">
                      +${(videosWatched * 0.25).toFixed(2)}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-2 text-sm text-center text-muted-foreground"
                    >
                      No recent earnings. Start watching videos to earn money!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Video Modal */}
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
              <Button onClick={handleContinue}>Continue & Earn $0.25</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
