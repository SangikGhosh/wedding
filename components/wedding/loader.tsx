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
                  className="absolute inset-0 z-50 flex items-center justify-center bg-[#1B4D46] cursor-pointer overflow-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  onClick={() => setHasTapped(true)}
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onTouchStart={() => setIsPressed(true)}
                  onTouchEnd={() => setIsPressed(false)}
              >

                <div className="relative flex items-center justify-center w-80 h-80">
                  {/* Ripple Ring 1 - Behind */}
                  <motion.div
                      className="absolute rounded-full border border-[#CBA135] z-0"
                      animate={{
                        scale: [1, 1.4, 1.8],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{
                        width: "240px",
                        height: "240px",
                      }}
                  />

                  {/* Ripple Ring 2 - Behind */}
                  <motion.div
                      className="absolute rounded-full border border-[#CBA135] z-0"
                      animate={{
                        scale: [1, 1.4, 1.8],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                      style={{
                        width: "240px",
                        height: "240px",
                      }}
                  />

                  {/* Main Circle - Front */}
                  <div className="absolute z-10 w-56 h-56 rounded-full border-2 border-[#CBA135] flex items-center justify-center bg-[#0F352E] shadow-lg">
                    <div className="text-center">
                      <p className="text-[#CBA135] text-xs tracking-[0.3em] font-semibold uppercase mb-3">
                        Invitation
                      </p>
                      <p
                          className="text-[#F8F5F0] text-2xl font-light tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Tap to Open
                      </p>
                    </div>
                  </div>
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
