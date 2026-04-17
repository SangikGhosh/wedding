"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const coupleNameRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for loader elements
    const timeline = gsap.timeline();

    // Animate couple names with staggered effect
    if (coupleNameRef.current) {
      timeline.fromTo(
        coupleNameRef.current.querySelectorAll(".name-letter"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
        0.5
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
  }, []);

  return (
    <motion.div
      ref={loaderRef}
      className="fixed inset-0 z-50 w-full h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden text-center bg-[#F8F5F0]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 3.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center w-full">
        {/* Couple Names */}
        <motion.div
          ref={coupleNameRef}
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {["S", "a", "n", "g", "i", "k"].map((letter, i) => (
              <span
                key={`bride-${i}`}
                className="name-letter text-2xl sm:text-3xl md:text-4xl text-[#1B4D46] font-semibold"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {letter}
              </span>
            ))}
            <span
              className="text-2xl sm:text-3xl md:text-4xl text-[#CBA135] mx-2"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              &
            </span>
            {["S", "h", "r", "u", "t", "i"].map((letter, i) => (
              <span
                key={`groom-${i}`}
                className="name-letter text-2xl sm:text-3xl md:text-4xl text-[#1B4D46] font-semibold"
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
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
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
                <ellipse
                  cx="50"
                  cy="15"
                  rx="8"
                  ry="12"
                  fill="none"
                  stroke="#CBA135"
                  strokeWidth="1"
                  opacity="0.8"
                />
                <ellipse
                  cx="50"
                  cy="15"
                  rx="4"
                  ry="8"
                  fill="#CBA135"
                  opacity="0.3"
                />
              </g>
            ))}
            {/* Middle layer petals */}
            {[...Array(8)].map((_, i) => (
              <g key={`mid-${i}`} transform={`rotate(${i * 45 + 22.5} 50 50)`}>
                <ellipse
                  cx="50"
                  cy="25"
                  rx="6"
                  ry="10"
                  fill="none"
                  stroke="#1B4D46"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </g>
            ))}
            {/* Inner circle */}
            <circle
              cx="50"
              cy="50"
              r="12"
              fill="none"
              stroke="#CBA135"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="6"
              fill="#CBA135"
              opacity="0.5"
            />
            {/* Center dot */}
            <circle
              cx="50"
              cy="50"
              r="3"
              fill="#1B4D46"
            />
          </motion.svg>
        </motion.div>

        {/* Subtitle Text */}
        <motion.p
          className="text-[#1B4D46] text-base sm:text-lg tracking-wider break-words mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Preparing Something Beautiful
        </motion.p>

        {/* Event Details */}
        <motion.div
          ref={detailsRef}
          className="space-y-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="detail-item">
            <p className="text-[#CBA135] text-sm font-semibold tracking-widest">
              WEDDING CEREMONY
            </p>
          </div>
          <div className="detail-item">
            <p
              className="text-[#1B4D46] text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              26 April 2026
            </p>
          </div>
          <div className="detail-item">
            <p className="text-[#5A7A75] text-sm">6:00 PM</p>
          </div>
          <div className="detail-item">
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
