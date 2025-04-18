import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="bg-primary/10 rounded-3xl p-8 md:p-16 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience premium services?</h2>
                            <p className="text-xl text-muted-foreground mb-0">
                                Connect with Al Yalayis Business Group today and discover how our comprehensive solutions can elevate your experience in the UAE.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="px-8 py-6 text-lg"
                                onClick={() => navigate("/contact")}
                            >
                                Contact Us
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-6 text-lg"
                                onClick={() => navigate("/services")}
                            >
                                Our Services
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
