"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const countdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Wedding date: April 26, 2026 at 6:00 PM
    const weddingDate = new Date("2026-04-26T18:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // GSAP animations for countdown cards
    if (countdownRef.current) {
      const cards = countdownRef.current.querySelectorAll(".countdown-card");
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: countdownRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-12 bg-[#F8F5F0] w-full max-w-[100vw] overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-[#1B4D46] mb-4 text-center break-words leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Counting Down
          </h2>
          <p className="text-[#5A7A75] mb-12">
            Every moment brings us closer to our special day
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="countdown-card relative group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 relative shadow-lg">
                {/* Number */}
                <motion.span
                  key={unit.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="block text-3xl sm:text-4xl md:text-6xl font-bold text-[#1B4D46]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {mounted ? String(unit.value).padStart(2, "0") : "00"}
                </motion.span>

                {/* Label */}
                <span className="text-[#5A7A75] text-sm md:text-base tracking-widest uppercase mt-2 block">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
