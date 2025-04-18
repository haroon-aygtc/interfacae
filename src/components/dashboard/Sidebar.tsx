import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "../../routes";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/contexts/ThemeContext";
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
  Users,
  Sparkles,
  BookOpen,
  MessageSquare,
  Brain,
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
          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md",
            isActive ? "bg-white/20" : "bg-muted",
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

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme } = useTheme();

  return (
    <div className="flex h-full w-[280px] flex-col border-r bg-background">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold">AI Chat Admin</h2>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-auto py-6">
        <div className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Main
        </div>
        <nav className="grid gap-1 px-2 mb-6">
          <NavItem
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
            href={ROUTES.DASHBOARD}
            isActive={currentPath === ROUTES.DASHBOARD}
          />
          <NavItem
            icon={<Bot className="h-4 w-4" />}
            label="AI Model Configuration"
            href={ROUTES.AI_MODELS}
            isActive={currentPath.startsWith(ROUTES.AI_MODELS)}
            badge="New"
          />
          <NavItem
            icon={<Bot className="h-4 w-4" />}
            label="AI Integration"
            href={ROUTES.AI_INTEGRATION}
            isActive={currentPath.startsWith(ROUTES.AI_INTEGRATION)}
            badge="New"
          />
          <NavItem
            icon={<FileText className="h-4 w-4" />}
            label="Context Rules"
            href={ROUTES.CONTEXT_RULES}
            isActive={currentPath.startsWith(ROUTES.CONTEXT_RULES)}
          />
          <NavItem
            icon={<PenTool className="h-4 w-4" />}
            label="Prompt Templates"
            href={ROUTES.PROMPT_TEMPLATES}
            isActive={currentPath.startsWith(ROUTES.PROMPT_TEMPLATES)}
          />
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Analytics
        </div>
        <nav className="grid gap-1 px-2 mb-6">
          <NavItem
            icon={<BarChart2 className="h-4 w-4" />}
            label="Analytics Dashboard"
            href={ROUTES.ANALYTICS}
            isActive={currentPath.startsWith(ROUTES.ANALYTICS)}
          />
          <NavItem
            icon={<Globe className="h-4 w-4" />}
            label="Web Scraping"
            href={ROUTES.WEB_SCRAPING}
            isActive={currentPath.startsWith(ROUTES.WEB_SCRAPING)}
          />
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Configuration
        </div>
        <nav className="grid gap-1 px-2">
          <NavItem
            icon={<MessageSquare className="h-4 w-4" />}
            label="Chat Widget Test"
            href={ROUTES.CHAT_WIDGET_TEST}
            isActive={currentPath.startsWith(ROUTES.CHAT_WIDGET_TEST)}
            badge="New"
          />
          <NavItem
            icon={<Brain className="h-4 w-4" />}
            label="AI Insights"
            href={ROUTES.AI_INSIGHTS}
            isActive={currentPath.startsWith(ROUTES.AI_INSIGHTS)}
            badge="New"
          />
          <NavItem
            icon={<Code className="h-4 w-4" />}
            label="Integration"
            href={ROUTES.INTEGRATION}
            isActive={currentPath.startsWith(ROUTES.INTEGRATION)}
          />
          <NavItem
            icon={<BookOpen className="h-4 w-4" />}
            label="Knowledge Base"
            href={ROUTES.KNOWLEDGE_BASE}
            isActive={currentPath.startsWith(ROUTES.KNOWLEDGE_BASE)}
          />
          <NavItem
            icon={<Users className="h-4 w-4" />}
            label="User Management"
            href={ROUTES.USER_MANAGEMENT}
            isActive={currentPath.startsWith(ROUTES.USER_MANAGEMENT)}
          />
          <NavItem
            icon={<Settings className="h-4 w-4" />}
            label="System Settings"
            href={ROUTES.SYSTEM_CONFIG}
            isActive={currentPath.startsWith(ROUTES.SYSTEM_CONFIG)}
          />
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-muted/50">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">admin@example.com</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <NavItem
          icon={<LogOut className="h-4 w-4" />}
          label="Logout"
          href="/logout"
          isActive={currentPath === "/logout"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
