"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import SplashScreen from "./splash-screen"

type SplashContextType = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const SplashContext = createContext<SplashContextType | undefined>(undefined)

export function SplashProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 800) // Show splash for at least 800ms for better UX
    }

    // Listen for route changes
    window.addEventListener("beforeunload", handleStart)

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleStart)
    }
  }, [])

  // This effect runs when the route changes
  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <SplashContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <SplashScreen />}
      {children}
    </SplashContext.Provider>
  )
}

export const useSplash = () => {
  const context = useContext(SplashContext)
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashProvider")
  }
  return context
}
