"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSplash } from "@/components/splash-provider";
import { Menu, X } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setIsLoading } = useSplash();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show splash screen when component mounts
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show splash screen before navigation
    setIsLoading(true);
    // In a real app, you would validate and authenticate the user here
    // For demo purposes, we'll just redirect to the dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold">Rewards Hub Dollor</span>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header> */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white shadow-sm sticky top-0 z-50">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-xl font-bold text-gray-900"
        >
          Rewards Hub Dollor
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Right section */}
        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col items-start px-6 py-4 lg:hidden">
            <ThemeToggle />
          </div>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login to Your Account</h1>
            <p className="text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
