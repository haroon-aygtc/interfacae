import React, { useEffect, useRef } from "react";
import { NavBar } from "./NavBar";
import { Hero } from "./Hero";
import { BusinessDivisions } from "./BusinessDivisions";
import { AuthShowcase } from "./AuthShowcase";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

export default function Home() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Animated gradient background parallax effect
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const scrollTop = window.scrollY;
                scrollContainerRef.current.style.backgroundPosition = `center ${scrollTop * 0.5}px`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="flex flex-col min-h-screen"
            ref={scrollContainerRef}
            style={{
                backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)",
                backgroundSize: "50px 50px"
            }}
        >
            <NavBar />
            <main className="flex-grow pt-20">
                <Hero />
                <BusinessDivisions />
                <AuthShowcase />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
