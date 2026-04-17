"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 w-full h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden text-center bg-[#F8F5F0]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 3.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
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

        {/* Text */}
        <motion.p
          className="text-[#1B4D46] text-base sm:text-lg tracking-wider break-words"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Preparing Something Beautiful
        </motion.p>
      </div>
    </motion.div>
  );
}
