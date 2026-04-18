"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function CoupleSection() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-revert the photos after 5 seconds when swapped
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSwapped) {
      timeout = setTimeout(() => {
        setIsSwapped(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isSwapped]);

  // Touch Handlers for Mobile Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    // Only allow swipe logic on mobile/tablet (screens smaller than 1024px)
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return;

    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 40; // 40px swipe threshold

    if (isSwipe) {
      setIsSwapped(!isSwapped);
    }
  };

  return (
      <section id="couple-section" className="py-12 md:py-20 px-4 md:px-12 bg-[#F8F5F0] w-full max-w-[100vw] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Photo Collage */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex-shrink-0"
            >
              {/* Photo Placeholders styled like vintage polaroids - Swipe Enabled Container */}
              <div
                  className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
              >
                {/* First Photo - Our Story */}
                <motion.div
                    className="absolute top-0 left-0 w-40 h-52 sm:w-48 sm:h-60 md:w-56 md:h-72 bg-white p-2 sm:p-3 shadow-xl rounded-sm origin-bottom-left"
                    initial={{ rotate: -3, zIndex: 10 }}
                    animate={{
                      rotate: isSwapped ? -8 : -3,
                      scale: isSwapped ? 0.95 : 1,
                      zIndex: isSwapped ? 5 : 10,
                      x: isSwapped ? -15 : 0,
                      y: isSwapped ? 10 : 0
                    }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <img
                      src="https://res.cloudinary.com/dzr311jwb/image/upload/v1776525526/couple_k6y8op.jpg"
                      alt="Couple Photo"
                      className="w-full h-[85%] object-cover rounded-sm pointer-events-none"
                  />
                  <p className="text-[#1B4D46] text-center text-sm mt-2 font-medium">
                    Our Story
                  </p>
                </motion.div>

                {/* Second Photo - Cherished Moments */}
                <motion.div
                    className="absolute top-8 right-0 w-40 h-52 sm:w-48 sm:h-60 md:w-56 md:h-72 bg-white p-2 sm:p-3 shadow-xl rounded-sm origin-bottom-right"
                    initial={{ rotate: 2, zIndex: 5 }}
                    animate={{
                      rotate: isSwapped ? 0 : 2,
                      scale: isSwapped ? 1.05 : 1,
                      zIndex: isSwapped ? 20 : 5,
                      x: isSwapped ? -15 : 0,
                      y: isSwapped ? -15 : 0
                    }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <img
                      src="https://res.cloudinary.com/dzr311jwb/image/upload/v1776525762/couple2_nmuvbb.jpg"
                      alt="Couple Photo"
                      className="w-full h-[85%] object-cover rounded-sm pointer-events-none"
                  />
                  <p className="text-[#1B4D46] text-center text-sm mt-2 font-medium">
                    Cherished Moments
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Message Card */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-1"
            >
              {/* Glassmorphism Card */}
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 border border-[#CBA135]/30 shadow-xl relative overflow-hidden">
                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#CBA135] opacity-50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#CBA135] opacity-50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#CBA135] opacity-50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#CBA135] opacity-50" />

                {/* Content */}
                <h3
                    className="text-3xl sm:text-4xl md:text-5xl text-[#1B4D46] mb-4 sm:mb-6 text-center break-words leading-tight"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  Two Souls, One Journey
                </h3>

                <p
                    className="text-[#1B4D46] text-lg leading-relaxed mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Every love story is beautiful, but ours is our favorite. We can&apos;t wait
                  to step into this new chapter of life surrounded by the people who mean
                  the most to us.
                </p>

                {/* Decorative Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#CBA135]" />
                  <svg className="w-6 h-6 text-[#CBA135]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#CBA135]" />
                </div>

                <p className="text-[#5A7A75] text-base">
                  We are blessed to have you share in our joy. Your presence at our wedding
                  will make our special day complete.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
}
