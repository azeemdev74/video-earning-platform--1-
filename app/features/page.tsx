import Link from "next/link"
import { Play, DollarSign, Shield, Gift, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold">VideoEarn</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </Link>
          <Link href="/partners" className="text-sm font-medium hover:underline underline-offset-4">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Discover all the ways you can earn money on VideoEarn.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Play className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Watch & Earn</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn money for every video you watch. The longer you watch, the more you earn.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Daily Bonuses</h3>
                  <p className="text-sm text-muted-foreground">
                    Log in daily to claim bonus rewards and increase your earning potential.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple secure payment options to withdraw your earnings.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Gift className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Referral Program</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn additional income by referring friends to the platform.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Flexible Schedule</h3>
                  <p className="text-sm text-muted-foreground">
                    Watch videos and earn money on your own schedule, anytime, anywhere.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Low Payout Threshold</h3>
                  <p className="text-sm text-muted-foreground">
                    Cash out your earnings with a low minimum withdrawal amount.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="rounded-lg border bg-muted p-8">
                <h2 className="text-2xl font-bold mb-4">How Our Earnings Work</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-6 w-6 rounded-full bg-primary text-white text-xs items-center justify-center">
                      1
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Sign up and get an instant $5 bonus</p>
                      <p className="text-sm text-muted-foreground">
                        Create your account and receive a welcome bonus immediately.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-6 w-6 rounded-full bg-primary text-white text-xs items-center justify-center">
                      2
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Watch videos to earn credits</p>
                      <p className="text-sm text-muted-foreground">
                        Each video you watch adds credits to your account based on length and type.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-6 w-6 rounded-full bg-primary text-white text-xs items-center justify-center">
                      3
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Complete daily tasks for bonuses</p>
                      <p className="text-sm text-muted-foreground">
                        Earn additional credits by completing simple daily tasks.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-6 w-6 rounded-full bg-primary text-white text-xs items-center justify-center">
                      4
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Cash out when ready</p>
                      <p className="text-sm text-muted-foreground">
                        Transfer your earnings to your preferred payment method once you reach the minimum threshold.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/register">
                <Button size="lg">Start Earning Now</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
