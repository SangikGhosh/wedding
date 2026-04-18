"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/wedding/loader";
import { Hero } from "@/components/wedding/hero";
import { CoupleSection } from "@/components/wedding/couple-section";
import { ScratchCard } from "@/components/wedding/scratch-card";
import { Countdown } from "@/components/wedding/countdown";
import { EventCards } from "@/components/wedding/event-cards";
import { Venue } from "@/components/wedding/venue";
import { Footer } from "@/components/wedding/footer";

export default function WeddingInvitation() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <Loader key="loader" onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <div
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.5s ease-in-out",
                    // Prevents invisible elements from being clicked while loading
                    pointerEvents: isLoading ? "none" : "auto",
                }}
            >
                <Hero />
                <CoupleSection />
                <ScratchCard />
                <Countdown />
                <EventCards />
                <Venue />
                {/* Pass the loading state down so the music knows when to start */}
                <Footer isLoaded={!isLoading} />
            </div>
        </main>
    );
}
