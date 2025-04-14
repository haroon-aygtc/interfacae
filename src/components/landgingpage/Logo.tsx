import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-bold text-2xl flex items-center ${className}`}>
      <div className="relative w-8 h-8 mr-2">
        <div className="absolute w-8 h-8 bg-primary/20 rounded-lg transform rotate-45"></div>
        <div className="absolute w-6 h-6 bg-primary/40 rounded-lg top-1 left-1"></div>
        <div className="absolute w-4 h-4 bg-primary top-2 left-2 rounded-md flex items-center justify-center">
          <span className="text-white text-xs">F</span>
        </div>
      </div>
      <span>Al Yalayis<span className="text-primary font-black"></span></span>
    </div>
  );
}
