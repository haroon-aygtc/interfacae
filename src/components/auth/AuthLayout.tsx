import React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/landing-page/Logo";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="inline-block">
                            <Logo className="h-8 w-auto" />
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold">{title}</h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>
            </div>

            {/* Right side - Decorative */}
            <div className="hidden lg:block relative bg-muted/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-background/0"></div>

                {/* Animated decoration */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="absolute inset-0 flex items-center justify-center p-8">
                    {/* Feature highlights */}
                    <div className="backdrop-blur-sm bg-card/70 border p-8 rounded-xl shadow-lg max-w-md space-y-6">
                        <h2 className="text-2xl font-bold">Al Yalayis Business Group</h2>
                        <p className="text-muted-foreground">
                            Access premium services across government transactions, property management, VIP transportation, and workforce solutions.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/20 rounded-full p-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium">Streamlined Services</h3>
                                    <p className="text-sm text-muted-foreground">Quick and efficient processing of all your requirements</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/20 rounded-full p-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium">Professional Assistance</h3>
                                    <p className="text-sm text-muted-foreground">Expert guidance throughout your journey</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/20 rounded-full p-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium">Secure Platform</h3>
                                    <p className="text-sm text-muted-foreground">Your data is protected with state-of-the-art security</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
