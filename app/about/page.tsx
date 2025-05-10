import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About VideoEarn</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our mission is to reward users for their time and attention.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  VideoEarn was founded in 2023 with a simple idea: what if people could earn money by watching videos
                  they're already interested in? Our founders recognized that people's attention is valuable, and
                  advertisers are willing to pay for it. Instead of all that value going to big tech companies, we
                  decided to share it directly with our users.
                </p>
                <p className="text-muted-foreground">
                  Since our launch, we've helped thousands of users earn extra income while enjoying content they love.
                  Our platform continues to grow, with new videos and earning opportunities added daily.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Values</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      1
                    </div>
                    <div>
                      <strong>User First:</strong> We prioritize our users' experience and earnings above all else.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      2
                    </div>
                    <div>
                      <strong>Transparency:</strong> We're open about how our platform works and how users earn money.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      3
                    </div>
                    <div>
                      <strong>Quality Content:</strong> We only partner with content creators who produce valuable
                      videos.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      4
                    </div>
                    <div>
                      <strong>Fair Compensation:</strong> We believe in fairly compensating users for their time and
                      attention.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center space-y-4">
                    <img
                      src={`/placeholder.svg?height=150&width=150`}
                      alt={`Team Member ${i}`}
                      className="rounded-full h-32 w-32 object-cover"
                    />
                    <div className="space-y-1 text-center">
                      <h3 className="font-bold">Team Member {i}</h3>
                      <p className="text-sm text-muted-foreground">Co-Founder & CEO</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/register">
                <Button size="lg">Join Us Today</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
