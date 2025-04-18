import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BusinessDivisionCard } from "./BusinessDivisionCard";

export interface BusinessDivision {
    id: string;
    title: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    bgPattern: string;
    learnMoreLink: string;
}

const businessDivisions: BusinessDivision[] = [
    {
        id: "government",
        title: "Al Yalayis Government Transaction Center",
        description: "Comprehensive A to Z UAE government services offering efficient processing of all your government transactions in one place.",
        color: "bg-blue-600",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        bgPattern: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 70%)",
        learnMoreLink: "/government-services"
    },
    {
        id: "property",
        title: "Al Yalayis Property",
        description: "Specialized services for real estate & land transactions across UAE, ensuring smooth property dealings with professional guidance.",
        color: "bg-emerald-600",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        bgPattern: "radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, rgba(5, 150, 105, 0) 70%)",
        learnMoreLink: "/property-services"
    },
    {
        id: "transport",
        title: "Super Wheel",
        description: "Premium VIP transport services throughout UAE, offering luxury vehicles with professional drivers for a refined travel experience.",
        color: "bg-amber-600",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
        bgPattern: "radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, rgba(217, 119, 6, 0) 70%)",
        learnMoreLink: "/transport-services"
    },
    {
        id: "labor",
        title: "Al Yalayis Labor Supplier",
        description: "Comprehensive workforce solutions for all industries, connecting skilled professionals with businesses across the UAE.",
        color: "bg-purple-600",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        bgPattern: "radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0) 70%)",
        learnMoreLink: "/labor-services"
    }
];

export function BusinessDivisions() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Business Divisions</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Al Yalayis Business Group provides comprehensive services through four specialized divisions, each dedicated to excellence in their respective fields.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {businessDivisions.map((division, index) => (
                        <BusinessDivisionCard key={division.id} division={division} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
