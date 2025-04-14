import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button 
            onClick={() => navigate("/")} 
            className="text-xl font-bold text-primary"
          >
            Al Yalayis
          </button>
          
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/services")} className="text-sm text-muted-foreground hover:text-primary">
              Services
            </button>
            <button onClick={() => navigate("/about")} className="text-sm text-muted-foreground hover:text-primary">
              About
            </button>
            <Button onClick={() => navigate("/contact")} size="sm">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 