import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  FileText,
  PenTool,
  BarChart2,
  Globe,
  Code,
  Settings,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: string;
}

const NavItem = ({
  icon,
  label,
  href,
  isActive = false,
  onClick,
  badge,
}: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
          : "text-muted-foreground hover:bg-gray-100 hover:text-gray-900",
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md",
            isActive ? "bg-white/20" : "bg-gray-100",
          )}
        >
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {badge && (
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </div>
      )}
    </Link>
  );
};

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: any) => void;
}

const Sidebar = ({
  activeSection = "overview",
  onSectionChange,
}: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <div className="flex h-full w-[280px] flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold">AI Chat Admin</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-6">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main
        </div>
        <nav className="grid gap-1 px-2 mb-6">
          <NavItem
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
            href="#"
            isActive={activeSection === "overview"}
            onClick={() => handleNavClick("overview")}
          />
          <NavItem
            icon={<Bot className="h-4 w-4" />}
            label="AI Model Configuration"
            href="#"
            isActive={activeSection === "ai-models"}
            onClick={() => handleNavClick("ai-models")}
            badge="New"
          />
          <NavItem
            icon={<FileText className="h-4 w-4" />}
            label="Context Rules"
            href="#"
            isActive={activeSection === "context-rules"}
            onClick={() => handleNavClick("context-rules")}
          />
          <NavItem
            icon={<PenTool className="h-4 w-4" />}
            label="Prompt Templates"
            href="#"
            isActive={activeSection === "prompt-templates"}
            onClick={() => handleNavClick("prompt-templates")}
          />
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Analytics
        </div>
        <nav className="grid gap-1 px-2 mb-6">
          <NavItem
            icon={<BarChart2 className="h-4 w-4" />}
            label="Analytics Dashboard"
            href="#"
            isActive={activeSection === "analytics"}
            onClick={() => handleNavClick("analytics")}
          />
          <NavItem
            icon={<Globe className="h-4 w-4" />}
            label="Web Scraping"
            href="#"
            isActive={activeSection === "web-scraping"}
            onClick={() => handleNavClick("web-scraping")}
          />
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Configuration
        </div>
        <nav className="grid gap-1 px-2">
          <NavItem
            icon={<Code className="h-4 w-4" />}
            label="Integration"
            href="#"
            isActive={activeSection === "integration"}
            onClick={() => handleNavClick("integration")}
          />
          <NavItem
            icon={<Settings className="h-4 w-4" />}
            label="System Settings"
            href="#"
            isActive={activeSection === "system-config"}
            onClick={() => handleNavClick("system-config")}
          />
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-gray-50">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-500">admin@example.com</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            <Settings className="h-4 w-4 text-gray-600" />
          </div>
        </div>
        <NavItem
          icon={<LogOut className="h-4 w-4" />}
          label="Logout"
          href="/logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;
