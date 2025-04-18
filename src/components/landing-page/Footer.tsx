import React from "react";
import { Logo } from "./Logo";
import { ROUTES } from "@/routes";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Logo className="h-10 w-auto" />
                        <p className="text-muted-foreground max-w-xs">
                            Al Yalayis Business Group provides comprehensive business solutions across government services, property, transportation, and workforce management.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Our Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/government-services" className="text-muted-foreground hover:text-primary transition-colors">Government Transactions</a>
                            </li>
                            <li>
                                <a href="/property-services" className="text-muted-foreground hover:text-primary transition-colors">Property Services</a>
                            </li>
                            <li>
                                <a href="/transport-services" className="text-muted-foreground hover:text-primary transition-colors">VIP Transport</a>
                            </li>
                            <li>
                                <a href="/labor-services" className="text-muted-foreground hover:text-primary transition-colors">Labor Solutions</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
                            </li>
                            <li>
                                <a href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">Sheikh Zayed Road, Dubai, United Arab Emirates</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                <a href="tel:+971554444888" className="text-muted-foreground hover:text-primary transition-colors">+971 55 444 4888</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                                <a href="mailto:info@alyalayis.com" className="text-muted-foreground hover:text-primary transition-colors">info@alyalayis.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            &copy; {currentYear} Al Yalayis Business Group. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Terms & Conditions
                            </a>
                            <a href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
