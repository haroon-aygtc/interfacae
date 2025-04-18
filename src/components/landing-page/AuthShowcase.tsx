import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";
import { UserPlus, LogIn, Laptop } from "lucide-react";

export function AuthShowcase() {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Seamless Access to Your Account</h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Manage your business needs through our secure platform. Access our services, track your requests, and stay updated with the latest from Al Yalayis Business Group.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <UserPlus className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                                    <p className="text-muted-foreground">
                                        Register to access personalized services and track your transactions.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <LogIn className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Easy Login</h3>
                                    <p className="text-muted-foreground">
                                        Secure and quick access to your account with robust authentication.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Laptop className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Dashboard Access</h3>
                                    <p className="text-muted-foreground">
                                        Comprehensive dashboard to manage all your services and requests.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                onClick={() => navigate(ROUTES.REGISTER)}
                            >
                                Register Now
                                <UserPlus className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate(ROUTES.LOGIN)}
                            >
                                Sign In
                                <LogIn className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative rounded-xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Dashboard Preview Image */}
                        <div className="aspect-video bg-card border rounded-xl overflow-hidden p-4">
                            <div className="w-full h-10 bg-muted rounded-md mb-4 flex items-center px-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="h-6 w-64 bg-muted-foreground/20 rounded-md mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 h-[calc(100%-3rem)]">
                                <div className="col-span-1 bg-muted-foreground/10 rounded-md"></div>
                                <div className="col-span-2 space-y-4">
                                    <div className="h-24 bg-muted-foreground/10 rounded-md"></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-32 bg-muted-foreground/10 rounded-md"></div>
                                        <div className="h-32 bg-muted-foreground/10 rounded-md"></div>
                                    </div>
                                    <div className="h-24 bg-muted-foreground/10 rounded-md"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/30 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/30 rounded-full blur-xl"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
