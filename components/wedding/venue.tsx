"use client";

import { motion } from "framer-motion";

interface VenueDetails {
  name: string;
  location: string;
  address: string;
  mapEmbedUrl: string;
}

const venues: VenueDetails[] = [
  {
    name: "Wedding Venue", // You can change this to the actual name of the banquet/hall!
    location: "Kolkata",
    address: "162 S. N. Roy Road, Newalipore, Kolkata-700038",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9610128491904!2d88.3277181!3d22.505645899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0270a8c104ff8f%3A0x121fa7d29987962a!2sNabarun%20Sangha%20Club!5e0!3m2!1sen!2sin!4v1776526799630!5m2!1sen!2sin",
  }
];

export function Venue() {
  return (
      <section className="py-12 md:py-20 px-4 md:px-12 bg-[#F8F5F0] w-full max-w-[100vw] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
          >
            <h2
                className="text-2xl sm:text-3xl md:text-4xl text-[#1B4D46] mb-4 text-center break-words leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Find Your Way
            </h2>
          </motion.div>

          {/* Venue Cards */}
          <div className="space-y-8">
            {venues.map((venue, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Venue Name & Location */}
                      <h3
                          className="text-xl sm:text-2xl md:text-3xl text-[#1B4D46] mb-2 break-words leading-tight"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                      >
                        {venue.name}
                      </h3>
                      <p className="text-[#CBA135] font-semibold mb-2">{venue.location}</p>
                      <p className="text-[#5A7A75] text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {venue.address}
                      </p>

                      {/* Google Map Embed */}
                      <div className="w-full aspect-video bg-[#EDE8E0] rounded-xl overflow-hidden relative shadow-inner">
                        <iframe
                            src={venue.mapEmbedUrl}
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>

                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}
