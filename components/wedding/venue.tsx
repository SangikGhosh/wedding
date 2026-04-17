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
    name: "VGP Golden Beach",
    location: "Chennai",
    address: "East Coast Road, Injambakkam, Chennai, Tamil Nadu 600041",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7898983458146!2d80.25084!3d12.9178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d1c22222222%3A0x1234567890abcdef!2sVGP%20Golden%20Beach!5e0!3m2!1sen!2sin!4v1234567890",
  },
  {
    name: "Guna Hall, Hotel Anandhaas",
    location: "Coimbatore",
    address: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123456789!2d77.0123!3d11.0234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2c22222%3A0xabcdef1234567890!2sHotel%20Anandhaas!5e0!3m2!1sen!2sin!4v1234567890",
  },
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
              key={venue.name}
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

                  {/* Map Placeholder */}
                  <div className="w-full aspect-video bg-[#EDE8E0] rounded-xl overflow-hidden relative">
                    {/* Map placeholder - in production, use actual Google Maps embed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 text-[#CBA135]/50 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        <p className="text-[#5A7A75]">Map View</p>
                        <a
                          href={`https://www.google.com/maps?q=${encodeURIComponent(venue.name + " " + venue.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#1B4D46] text-[#F8F5F0] rounded-full text-sm hover:bg-[#2A6B62] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
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
