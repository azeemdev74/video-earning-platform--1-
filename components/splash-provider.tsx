"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SplashScreen from "./splash-screen";

type SplashContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const SplashContext = createContext<SplashContextType | undefined>(undefined);

function SplashProviderContent({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStart = () => {
      setIsLoading(true);
    };

    window.addEventListener("beforeunload", handleStart);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <SplashContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <SplashScreen />}
      {children}
    </SplashContext.Provider>
  );
}

// This is the exported component you will use
export function SplashProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SplashProviderContent>{children}</SplashProviderContent>
    </Suspense>
  );
}

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
};
