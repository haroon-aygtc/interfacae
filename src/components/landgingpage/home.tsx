import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/landgingpage/NavBar";
import { Footer } from "@/components/landgingpage/Footer";

// Import animation libraries
import { motion } from "framer-motion";

interface BusinessDivision {
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

export default function AlYalayisLanding() {
  const navigate = useNavigate();
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
    <div className="flex flex-col min-h-screen" ref={scrollContainerRef} 
         style={{
           backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)",
           backgroundSize: "50px 50px"
         }}>
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <DivisionsSection divisions={businessDivisions} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DivisionsSection({ divisions }: { divisions: BusinessDivision[] }) {
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
            Explore our specialized business units designed to provide comprehensive solutions across multiple sectors
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {divisions.map((division, index) => (
            <DivisionCard 
              key={division.id} 
              division={division} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionCard({ division, index }: { division: BusinessDivision; index: number }) {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="bg-card rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-8" style={{ background: division.bgPattern }}>
        <div className={`w-16 h-16 ${division.color} rounded-lg flex items-center justify-center text-white mb-6`}>
          {division.icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{division.title}</h3>
        <p className="text-muted-foreground mb-6">{division.description}</p>
        
        <Button 
          variant="outline" 
          className="group"
          onClick={() => navigate(division.learnMoreLink)}
        >
          Learn More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </div>
    </motion.div>
  );
}

function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-primary/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Excellence?</h2>
              <p className="text-xl text-muted-foreground">
                Connect with us today to discover how Al Yalayis Business Group can support your needs with our premium services.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8" onClick={() => navigate("/contact")}>
                Contact Us
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/services")}>
                Our Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
