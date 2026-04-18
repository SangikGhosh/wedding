"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Add the prop type here
interface FooterProps {
  isLoaded?: boolean;
}

export function Footer({ isLoaded = true }: FooterProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Only try to play if the loader is completely finished!
    if (isLoaded && audioRef.current) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
            .then(() => {
              // Successfully started playing
              setIsPlaying(true);
            })
            .catch(() => {
              // Browser blocked it, keep the button showing as "paused"
              console.warn("Autoplay blocked. User needs to tap the play button.");
              setIsPlaying(false);
            });
      }
    } else if (!isLoaded && audioRef.current) {
      // Ensure it stays paused while loading
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isLoaded]); // This effect runs again when isLoaded changes from false to true

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
      <>
        {/* Floating Music Button */}
        <motion.button
            onClick={toggleMusic}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1B4D46] text-[#F8F5F0] flex items-center justify-center shadow-lg z-50 hover:bg-[#2A6B62] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
        >
          {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
          ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
          )}
        </motion.button>

        {/* Hidden audio element - removed autoPlay since React handles it now */}
        <audio
            ref={audioRef}
            loop
            src="https://res.cloudinary.com/dzr311jwb/video/upload/v1776519383/song_nmze5t.mp3"
        />

        {/* Footer Content */}
        <footer className="bg-[#0F352E] py-12 md:py-16 px-4 md:px-12 pb-24 md:pb-16 relative w-full max-w-[100vw] overflow-hidden">
          <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CBA135' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
              <h2
                  className="text-2xl sm:text-3xl md:text-5xl text-[#CBA135] mb-4 text-center break-words leading-tight"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                S. Pravin Bala & L. Preethi
              </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#A8C4C0] text-lg mb-2"
            >
              We look forward to celebrating with you
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-[#F8F5F0] text-xl font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
              20th April 2026
            </motion.p>

            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-4 my-8"
            >
              <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[#CBA135]" />
              <svg className="w-6 h-6 text-[#CBA135]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[#CBA135]" />
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-[#5A7A75] text-sm"
            >
              Made with love for Pravin & Preethi&apos;s Wedding
            </motion.p>
          </div>
        </footer>
      </>
  );
}
