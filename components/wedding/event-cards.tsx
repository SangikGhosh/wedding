"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  title: string;
  time: string;
  dates: string;
  venue: string;
  address: string;
  mapLink: string;
}

const events: Event[] = [
  {
    title: "Wedding Ceremony",
    time: "6:00 PM",
    dates: "26 April 2026",
    venue: "SAHAPUR ADARSHAPALLI NABARUN SANGHA",
    address: "162 S. N. Roy Road, Newalipore, Kolkata-700038",
    mapLink: "https://maps.app.goo.gl/JBMYX4nb2Ws6vTbb7?g_st=iwb",
  },
  {
    title: "Reception",
    time: "Coming Soon",
    dates: "Details Coming Soon",
    venue: "TBD",
    address: "Location details will be shared soon",
    mapLink: "#",
  },
];

// Ornate SVG corner flourish
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#CBA135] pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M5 55 C5 30 30 5 55 5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 55 C10 35 35 10 55 10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />
      <circle cx="5" cy="55" r="3" fill="currentColor" />
      <circle cx="55" cy="5" r="3" fill="currentColor" />
      {/* Decorative leaf */}
      <path
        d="M20 40 Q25 35 30 40 Q25 45 20 40"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M40 20 Q45 15 50 20 Q45 25 40 20"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export function EventCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for cards entrance
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".event-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 px-4 md:px-12 bg-[#F8F5F0] w-full max-w-[100vw] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-[#1B4D46] mb-4 text-center break-words leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Events
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {events.map((event, index) => (
            <div key={event.title} className="event-card">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative h-[420px] flex flex-col">
                {/* Ornate Corner Flourishes */}
                <CornerFlourish className="absolute top-2 left-2" />
                <CornerFlourish className="absolute top-2 right-2 -scale-x-100" />
                <CornerFlourish className="absolute bottom-2 left-2 -scale-y-100" />
                <CornerFlourish className="absolute bottom-2 right-2 scale-x-[-1] scale-y-[-1]" />

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-10 text-center relative z-10 flex flex-col h-full justify-between">
                  {/* Title */}
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl md:text-3xl text-[#1B4D46] mb-4 break-words leading-tight"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                      {event.title}
                    </h3>

                    {/* Time */}
                    <p className="text-[#CBA135] text-lg font-semibold mb-3 tracking-wider">
                      {event.time}
                    </p>

                    {/* Dates */}
                    <div className="text-[#1B4D46] mb-6">
                      <span className="text-[#5A7A75] text-sm">Date: </span>
                      <span
                        className="text-lg font-semibold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {event.dates}
                      </span>
                    </div>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="h-px w-10 bg-[#CBA135]" />
                      <div className="w-2 h-2 rotate-45 bg-[#CBA135]" />
                      <div className="h-px w-10 bg-[#CBA135]" />
                    </div>

                    {/* Venue */}
                    <div className="mb-6">
                      <p
                        className="text-[#1B4D46] text-base font-semibold mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {event.venue}
                      </p>
                      <p className="text-[#5A7A75] text-sm">{event.address}</p>
                    </div>
                  </div>

                  {/* View Location Button */}
                  {event.mapLink !== "#" && (
                    <motion.a
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1B4D46] text-[#1B4D46] rounded-full hover:bg-[#1B4D46] hover:text-[#F8F5F0] transition-colors mt-auto"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>View Location</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
