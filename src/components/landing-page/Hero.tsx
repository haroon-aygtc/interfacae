import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <div className="container mx-auto px-4 relative">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 px-6 py-1.5 bg-primary/10 rounded-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <span className="text-primary font-medium">Al Yalayis Business Group</span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Your Premier Business <span className="text-primary">Partner</span> in the UAE
                    </motion.h1>

                    <motion.p
                        className="text-xl text-muted-foreground mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        Comprehensive business solutions across government services, property, transportation, and workforce management – all under one prestigious group.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <Button size="lg" className="px-8 py-6 text-lg" onClick={() => navigate("/contact")}>
                            Contact Us
                        </Button>
                        <Button size="lg" variant="outline" className="px-8 py-6 text-lg" onClick={() => navigate("/about")}>
                            Learn More
                        </Button>
                        <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" onClick={() => navigate(ROUTES.LOGIN)}>
                            Admin Login
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
