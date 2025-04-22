import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuxuryDivision } from "./LuxuryDivisions";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface LuxuryDivisionCardProps {
  division: LuxuryDivision;
  index: number;
}

export function LuxuryDivisionCard({ division, index }: LuxuryDivisionCardProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      className="group relative overflow-hidden"
    >
      {/* Card background with gradient border */}
      <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-b from-[#D8A23B] via-transparent to-transparent opacity-70"></div>

      <div className={`relative ${theme === 'dark' ? 'bg-[#09090B]/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-8 h-full transition-all duration-300 group-hover:translate-y-[-4px]`}>
        {/* Icon with glow effect */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#D8A23B]/20 rounded-full blur-xl transform scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#D8A23B] to-[#9F7425] text-[#09090B]">
            {division.icon}
          </div>
        </div>

        {/* Content */}
        <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'} group-hover:text-[#D8A23B] transition-colors duration-300`}>
          {division.title}
        </h3>

        <p className={`mb-6 ${theme === 'dark' ? 'text-white/70 group-hover:text-white/90' : 'text-[#09090B]/70 group-hover:text-[#09090B]/90'} transition-colors duration-300`}>
          {division.description}
        </p>

        {/* Learn more link */}
        <div
          className="inline-flex items-center text-[#D8A23B] cursor-pointer group/link"
          onClick={() => navigate(division.href)}
        >
          <span className="mr-2 font-medium">Learn More</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
