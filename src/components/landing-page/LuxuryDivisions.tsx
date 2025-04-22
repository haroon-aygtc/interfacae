import React from "react";
import { motion } from "framer-motion";
import { LuxuryDivisionCard } from "./LuxuryDivisionCard";
import { Building2, Home, Car, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export interface LuxuryDivision {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const divisions: LuxuryDivision[] = [
  {
    id: "government",
    title: "Al Yalayis Government Transaction Center",
    description: "A to Z UAE government services under one roof.",
    icon: <Building2 className="h-8 w-8" />,
    href: "/government-services"
  },
  {
    id: "property",
    title: "Al Yalayis Property",
    description: "Expert real estate & land transaction services across the UAE.",
    icon: <Home className="h-8 w-8" />,
    href: "/property-services"
  },
  {
    id: "transport",
    title: "Super Wheel",
    description: "VIP luxury transport for elite individuals and businesses.",
    icon: <Car className="h-8 w-8" />,
    href: "/transport-services"
  },
  {
    id: "labor",
    title: "Al Yalayis Labor Supplier",
    description: "Scalable, trusted workforce solutions for all sectors.",
    icon: <Users className="h-8 w-8" />,
    href: "/labor-services"
  }
];

export function LuxuryDivisions() {
  const { theme } = useTheme();

  return (
    <section id="divisions" className="py-24 relative">
      {/* Background accent */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#09090B] via-[#020817] to-[#09090B]' : 'from-white via-[#f8f8f8] to-white'} z-0`}></div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A23B]/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-[#D8A23B]">Al Yalayis</span> Divisions
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'} max-w-3xl mx-auto`}>
            Four specialized divisions, each dedicated to excellence in their respective fields,
            working together to provide comprehensive solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {divisions.map((division, index) => (
            <LuxuryDivisionCard
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
