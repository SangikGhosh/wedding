"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // GSAP smooth scroll-triggered text reveal animations
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(
          "h1, h2, p, button"
      );
      gsap.to(elements, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        ease: "power3.inOut",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
      <section ref={ref} className="relative min-h-[100dvh] w-full max-w-[100vw] flex items-center justify-center overflow-hidden">
        {/* Mobile Background Image */}
        <motion.div
            className="absolute inset-0 lg:hidden"
            style={{ y }}
        >
          <img
              src="https://res.cloudinary.com/dzr311jwb/image/upload/v1776457829/4441656c64c1a1e22c476d4a4f1b1b4a_y0gcda.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{
                minHeight: "100vh",
              }}
          />
          {/* Subtle overlay for text readability on mobile */}
          <div className="absolute inset-0 bg-[#F8F5F0]/20" />
        </motion.div>

        {/* Desktop/Tablet Background Image */}
        <motion.div
            className="absolute inset-0 hidden lg:block"
            style={{ y }}
        >
          <img
              src="https://res.cloudinary.com/dzr311jwb/image/upload/v1776457764/image_saanwc.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
          />
          {/* Subtle overlay for text readability on desktop */}
          <div className="absolute inset-0 bg-[#F8F5F0]/10" />
        </motion.div>

        {/* Main Content */}
        <motion.div
            ref={contentRef}
            className="relative z-10 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto"
            style={{ opacity }}
        >
          {/* Wedding Invitation Header */}
          <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="mb-4"
          >
            <h2
                className="text-2xl md:text-3xl text-[#1B4D46] italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Wedding Invitation
            </h2>
          </motion.div>

          {/* Together With Their Families */}
          <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="text-[#5A7A75] text-base md:text-lg tracking-wide mb-8"
          >
            Together with our families
          </motion.p>

          {/* Couple Names */}
          <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
              className="mb-6"
          >
            <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#1B4D46] text-center break-words leading-tight"
                style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              <span className="block sm:inline">M. Sonu</span>
              <span className="text-[#CBA135] mx-1 sm:mx-2 md:mx-4">&</span>
              <span className="block sm:inline">Ms. Dipannita</span>
            </h1>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
              className="flex items-center justify-center gap-4 mb-8 origin-center"
          >
            <div className="h-px w-16 md:w-24 bg-[#CBA135]" />
          </motion.div>

          {/* Invitation Text */}
          <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: 1.2 }}
              className="text-[#1B4D46] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
          >
            With love and joy, we invite you to celebrate our wedding and
            share this beautiful beginning with us.
          </motion.p>

          {/* Warmly Invited */}
          <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: 1.3 }}
              className="text-[#CBA135] text-xl md:text-2xl italic mb-12"
              style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            You are warmly invited
          </motion.p>

          {/* Scroll to Explore Button */}
          <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20, delay: 1.4 }}
          >
            <motion.button
                onClick={() => {
                  document.getElementById("couple-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4D46] text-[#F8F5F0] rounded-full hover:bg-[#2A6B62] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <span>Scroll to Explore</span>
              <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
        >
          <motion.svg
              className="w-6 h-6 text-[#1B4D46]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7"
            />
          </motion.svg>
        </motion.div>
      </section>
  );
}
