"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

interface ScratchCardItemProps {
    revealText: string;
    subText: string;
    isRevealed: boolean;
    setIsRevealed: (value: boolean) => void;
}

function ScratchCardItem({ revealText, subText, isRevealed, setIsRevealed }: ScratchCardItemProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratching, setIsScratching] = useState(false);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);

        // Gold gradient fill
        const gradient = ctx.createRadialGradient(
            rect.width / 2,
            rect.height / 2,
            0,
            rect.width / 2,
            rect.height / 2,
            rect.width / 2
        );
        gradient.addColorStop(0, "#D4B85A");
        gradient.addColorStop(0.5, "#CBA135");
        gradient.addColorStop(1, "#A68B2D");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(rect.width / 2, rect.height / 2, rect.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Add sparkle pattern
        ctx.fillStyle = "#E8D078";
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = rect.width / 2 + Math.cos(angle) * (rect.width / 3);
            const y = rect.height / 2 + Math.sin(angle) * (rect.height / 3);
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Text
        ctx.fillStyle = "#1B4D46";
        ctx.font = "bold 12px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText("Scratch", rect.width / 2, rect.height / 2 - 5);
        ctx.fillText("Me", rect.width / 2, rect.height / 2 + 12);

        ctx.globalCompositeOperation = "destination-out";
    }, []);

    useEffect(() => {
        initCanvas();
    }, [initCanvas]);

    const scratch = useCallback(
        (x: number, y: number) => {
            const canvas = canvasRef.current;
            if (!canvas || isRevealed) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const rect = canvas.getBoundingClientRect();
            const canvasX = ((x - rect.left) * canvas.width) / rect.width / 2;
            const canvasY = ((y - rect.top) * canvas.height) / rect.height / 2;

            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 15, 0, Math.PI * 2);
            ctx.fill();

            // Check scratch percentage
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let transparent = 0;
            for (let i = 3; i < imageData.data.length; i += 4) {
                if (imageData.data[i] === 0) transparent++;
            }
            if ((transparent / (imageData.data.length / 4)) * 100 > 40) {
                setIsRevealed(true);
            }
        },
        [isRevealed, setIsRevealed]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (!isScratching) return;
            scratch(e.clientX, e.clientY);
        },
        [isScratching, scratch]
    );

    const handleTouchMove = useCallback(
        (e: React.TouchEvent<HTMLCanvasElement>) => {
            if (!isScratching) return;
            scratch(e.touches[0].clientX, e.touches[0].clientY);
        },
        [isScratching, scratch]
    );

    return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
            {/* Revealed Content */}
            <div className="absolute inset-0 rounded-full bg-white flex flex-col items-center justify-center shadow-lg border-2 border-[#CBA135]">
        <span
            className="text-lg sm:text-xl md:text-2xl text-[#1B4D46] font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {revealText}
        </span>
                <span className="text-xs text-[#CBA135]">{subText}</span>
            </div>

            {/* Scratch Canvas */}
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full rounded-full cursor-crosshair ${
                    isRevealed ? "pointer-events-none" : ""
                }`}
                style={{
                    opacity: isRevealed ? 0 : 1,
                    transition: "opacity 0.5s ease-out",
                }}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseLeave={() => setIsScratching(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={handleTouchMove}
            />
        </div>
    );
}

export function ScratchCard() {
    const [revealed1, setRevealed1] = useState(false);
    const [revealed2, setRevealed2] = useState(false);
    const [revealed3, setRevealed3] = useState(false);

    const allRevealed = revealed1 && revealed2 && revealed3;

    return (
        <section className="py-12 md:py-20 px-4 md:px-12 bg-[#F8F5F0] w-full max-w-[100vw] overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl text-[#1B4D46] mb-4 text-center break-words leading-tight"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        Reveal the Date
                    </h2>
                    <p className="text-[#5A7A75] mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                        A special moment awaits you...
                    </p>
                </motion.div>

                {/* Scratch Cards Row */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 mb-8"
                >
                    <ScratchCardItem
                        revealText="26"
                        subText="Day"
                        isRevealed={revealed1}
                        setIsRevealed={setRevealed1}
                    />
                    <ScratchCardItem
                        revealText="April"
                        subText="Month"
                        isRevealed={revealed2}
                        setIsRevealed={setRevealed2}
                    />
                    <ScratchCardItem
                        revealText="2026"
                        subText="Year"
                        isRevealed={revealed3}
                        setIsRevealed={setRevealed3}
                    />
                </motion.div>

                {/* Revealed Message */}
                {allRevealed && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mt-8"
                    >
                        <p className="text-[#1B4D46] text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Save the Date!
                        </p>
                        <p
                            className="text-3xl md:text-4xl text-[#CBA135]"
                            style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                            26th April 2026
                        </p>
                        <p className="text-[#5A7A75] mt-4">
                            Mark your calendars! We can&apos;t wait to celebrate with you.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
