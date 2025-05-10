import Link from "next/link"
import { Button } from "@/components/ui/button"
import PartnersSection from "@/components/partners-section"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PartnersPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Partners</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  We work with leading brands and content creators to bring you the best videos.
                </p>
              </div>
            </div>
            <PartnersSection />
            <div className="mx-auto max-w-5xl py-12">
              <div className="rounded-lg border bg-muted p-8">
                <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
                <p className="mb-6 text-muted-foreground">
                  Are you a content creator or brand looking to reach a wider audience? Partner with VideoEarn to
                  showcase your videos to our engaged user base. Our platform offers:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <div>Access to thousands of active users</div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <div>Detailed analytics on video performance</div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <div>Customizable campaign options</div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <div>Competitive pricing models</div>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button>Contact Us to Partner</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
