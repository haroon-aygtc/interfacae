import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BusinessDivision } from "./BusinessDivisions";

interface BusinessDivisionCardProps {
  division: BusinessDivision;
  index: number;
}

export function BusinessDivisionCard({ division, index }: BusinessDivisionCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
      style={{ background: division.bgPattern }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: `linear-gradient(135deg, ${division.color.replace('bg-', 'var(--')}-500/20 0%, transparent 100%)` }} />

      <div className="p-8">
        <div className={`${division.color} text-white rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
          {division.icon}
        </div>

        <h3 className="text-xl font-bold mb-3">{division.title}</h3>
        <p className="text-muted-foreground mb-6">{division.description}</p>

        <Button
          variant="ghost"
          className="group/btn flex items-center gap-2"
          onClick={() => navigate(division.learnMoreLink)}
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
