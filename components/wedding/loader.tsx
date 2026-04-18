"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const coupleNameRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [hasTapped, setHasTapped] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Wait for the user to tap the cover before starting animations
    if (!hasTapped) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        // Once the GSAP animation finishes, wait 2 seconds for them to
        // admire the screen, then trigger the main site reveal!
        setTimeout(onComplete, 2000);
      }
    });

    // Animate couple names with staggered effect
    if (coupleNameRef.current) {
      timeline.fromTo(
          coupleNameRef.current.querySelectorAll(".name-letter"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          0.5 // Start right as the cover fades away
      );
    }

    // Animate event details
    if (detailsRef.current) {
      timeline.fromTo(
          detailsRef.current.querySelectorAll(".detail-item"),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 },
          1.5
      );
    }
  }, [hasTapped, onComplete]);

  return (
      <motion.div
          ref={loaderRef}
          className="fixed inset-0 z-50 w-full h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden text-center bg-[#F8F5F0]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Smooth fade out when the whole component unmounts
          transition={{ duration: 0.8 }}
      >
        {/* ENHANCED THEMED COVER LAYER */}
        <AnimatePresence>
          {!hasTapped && (
              <motion.div
                  className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1B4D46] via-[#0F352E] to-[#1B4D46] cursor-pointer overflow-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  onClick={() => setHasTapped(true)}
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onTouchStart={() => setIsPressed(true)}
                  onTouchEnd={() => setIsPressed(false)}
              >
                {/* Animated background orbs */}
                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-[#CBA135] rounded-full opacity-10 blur-3xl"
                    animate={{
                      x: [0, 100, -50, 0],
                      y: [0, -50, 100, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#CBA135] rounded-full opacity-10 blur-3xl"
                    animate={{
                      x: [0, -100, 50, 0],
                      y: [0, 50, -100, 0],
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                />

                <div className="relative flex flex-col items-center justify-center gap-12 z-10">
                  {/* Main Interactive Button/Circle */}
                  <motion.div
                      className="relative flex flex-col items-center justify-center"
                      animate={{
                        y: isPressed ? 4 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Outer shimmer ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#CBA135] opacity-40"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          width: "240px",
                          height: "240px",
                        }}
                    />

                    {/* Secondary glow ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#D4B85A] opacity-20"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                        style={{
                          width: "280px",
                          height: "280px",
                        }}
                    />

                    {/* Main Circle with Glass Effect */}
                    <div className="w-60 h-60 rounded-full border-2 border-[#CBA135]/30 flex items-center justify-center bg-gradient-to-br from-[#1B4D46]/40 to-[#0F352E]/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                      {/* Inner gradient overlay */}
                      <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: "radial-gradient(circle at 30% 30%, rgba(203, 161, 53, 0.2), transparent 70%)",
                          }}
                      />

                      {/* Decorative pattern */}
                      <div
                          className="absolute inset-0 opacity-15"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='%23CBA135' fill-opacity='0.05'/%3E%3Cpath d='M0 0l40 40M40 0L0 40' stroke='%23CBA135' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")`,
                          }}
                      />

                      {/* Animated content */}
                      <motion.div
                          className="text-center z-10 flex flex-col items-center gap-6"
                          animate={{
                            y: [0, -4, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                      >
                        <motion.div
                            animate={{
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                        >
                          <p className="text-[#CBA135] text-xs tracking-[0.4em] font-semibold uppercase mb-2 drop-shadow-lg">
                            Invitation
                          </p>
                          <p
                              className="text-[#F8F5F0] text-2xl sm:text-3xl font-light tracking-wide drop-shadow-lg"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            Tap to Open
                          </p>
                        </motion.div>

                        {/* Tap indicator */}
                        <motion.div
                            className="flex gap-1"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                        >
                          <div className="w-1 h-1 bg-[#CBA135] rounded-full" />
                          <div className="w-1 h-1 bg-[#CBA135] rounded-full" />
                          <div className="w-1 h-1 bg-[#CBA135] rounded-full" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Subtle text instruction */}
                  <motion.p
                      className="text-[#D4B85A] text-sm tracking-[0.2em] uppercase font-light"
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                  >
                    Click to reveal
                  </motion.p>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN LOADER CONTENT */}
        <div className="text-center w-full relative z-0">
          {/* Couple Names */}
          <motion.div
              ref={coupleNameRef}
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={hasTapped ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {["S", "o", "n", "u"].map((letter, i) => (
                  <span
                      key={`bride-${i}`}
                      className="name-letter opacity-0 text-2xl sm:text-3xl md:text-4xl text-[#1B4D46] font-semibold inline-block"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                {letter}
              </span>
              ))}
              <span
                  className="name-letter opacity-0 text-2xl sm:text-3xl md:text-4xl text-[#CBA135] mx-2 inline-block"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
              >
              &
            </span>
              {["D", "i", "p", "a", "n", "n", "i", "t", "a"].map((letter, i) => (
                  <span
                      key={`groom-${i}`}
                      className="name-letter opacity-0 text-2xl sm:text-3xl md:text-4xl text-[#1B4D46] font-semibold inline-block"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                {letter}
              </span>
              ))}
            </div>
          </motion.div>

          {/* Spinning Mandala */}
          <motion.div
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 max-w-[80%] mx-auto mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={hasTapped ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer mandala petals */}
              {[...Array(12)].map((_, i) => (
                  <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                    <ellipse cx="50" cy="15" rx="8" ry="12" fill="none" stroke="#CBA135" strokeWidth="1" opacity="0.8" />
                    <ellipse cx="50" cy="15" rx="4" ry="8" fill="#CBA135" opacity="0.3" />
                  </g>
              ))}
              {/* Middle layer petals */}
              {[...Array(8)].map((_, i) => (
                  <g key={`mid-${i}`} transform={`rotate(${i * 45 + 22.5} 50 50)`}>
                    <ellipse cx="50" cy="25" rx="6" ry="10" fill="none" stroke="#1B4D46" strokeWidth="1" opacity="0.6" />
                  </g>
              ))}
              {/* Inner circle */}
              <circle cx="50" cy="50" r="12" fill="none" stroke="#CBA135" strokeWidth="2" />
              <circle cx="50" cy="50" r="6" fill="#CBA135" opacity="0.5" />
              {/* Center dot */}
              <circle cx="50" cy="50" r="3" fill="#1B4D46" />
            </motion.svg>
          </motion.div>

          {/* Subtitle Text */}
          <motion.p
              className="text-[#1B4D46] text-base sm:text-lg tracking-wider break-words mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0 }}
              animate={hasTapped ? { opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.8 }}
          >
            Preparing Something Beautiful
          </motion.p>

          {/* Event Details */}
          <motion.div
              ref={detailsRef}
              className="space-y-3 text-center"
              initial={{ opacity: 0 }}
              animate={hasTapped ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5 }}
          >
            <div className="detail-item opacity-0">
              <p className="text-[#CBA135] text-sm font-semibold tracking-widest">
                WEDDING CEREMONY
              </p>
            </div>
            <div className="detail-item opacity-0">
              <p
                  className="text-[#1B4D46] text-lg font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                26 April 2026
              </p>
            </div>
            <div className="detail-item opacity-0">
              <p className="text-[#5A7A75] text-sm">6:00 PM</p>
            </div>
            <div className="detail-item opacity-0">
              <p className="text-[#5A7A75] text-xs leading-relaxed">
                SAHAPUR ADARSHAPALLI NABARUN SANGHA
                <br />
                Kolkata
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
}
