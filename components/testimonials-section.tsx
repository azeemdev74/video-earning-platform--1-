import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  country: string;
  role: string;
  image: string;
}

export default function TestimonialSlider() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Great network with high payouts! I have never missed a payment. The platform is incredibly reliable and the support team is always helpful.",
      author: "Adam Walls",
      country: "USA",
      role: "Freelance Designer",
      image: "/images/testimonial-1.jpg",
    },
    {
      id: 2,
      text: "Good app, many offers and tasks, also have a good UI. It's become my primary source of extra income with minimal effort required.",
      author: "Vickie Linneman",
      country: "United Kingdom",
      role: "Marketing Consultant",
      image: "/images/testimonial-2.jpg",
    },
    {
      id: 3,
      text: "Excellent service with quick support response times. I've tried many similar platforms but this one stands out for its transparency.",
      author: "Michael Chen",
      country: "Canada",
      role: "Software Developer",
      image: "/images/testimonial-3.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextSlide = (): void => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = (): void => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number): void => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 7000); // Change slide every 7 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentIndex, isAutoPlaying]);

  // Pause autoplay when user interacts
  const pauseAutoPlay = (): void => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000); // Resume after 15 seconds
  };

  // Animation variants
  const cardVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: string) => ({
      x: direction === "right" ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full flex justify-center pt-0 sm:pt-28"
      >
        <div className="max-w-xl w-full bg-gray-50 dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].author}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            <p className="font-semibold text-xl text-gray-900 dark:text-white">
              {testimonials[currentIndex].author}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {testimonials[currentIndex].role}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
              {testimonials[currentIndex].country}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
