import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "./Logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/routes";

interface NavigationItem {
    title: string;
    href: string;
    children?: {
        title: string;
        href: string;
        description?: string;
    }[];
}

export function NavBar() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to bypass authentication and access admin panel directly
    const accessAdminPanel = () => {
        // Set mock authentication token
        localStorage.setItem("authToken", "mock-jwt-token");
        // Navigate to dashboard
        navigate(ROUTES.DASHBOARD);
    };

    const navigationItems: NavigationItem[] = [
        {
            title: "Home",
            href: ROUTES.HOME,
        },
        {
            title: "Services",
            href: "#",
            children: [
                {
                    title: "Government Services",
                    href: "/government-services",
                    description: "A to Z UAE government services for individuals and businesses",
                },
                {
                    title: "Property Services",
                    href: "/property-services",
                    description: "Real estate & land transactions across UAE",
                },
                {
                    title: "Transport Services",
                    href: "/transport-services",
                    description: "Luxury VIP transport services across UAE",
                },
                {
                    title: "Labor Solutions",
                    href: "/labor-services",
                    description: "Workforce solutions for all industries",
                },
            ],
        },
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Logo className="h-10 w-auto" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navigationItems.map((item) =>
                                    item.children ? (
                                        <NavigationMenuItem key={item.title}>
                                            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                    {item.children.map((child) => (
                                                        <li key={child.title}>
                                                            <NavigationMenuLink asChild>
                                                                <a
                                                                    href={child.href}
                                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                >
                                                                    <div className="text-sm font-medium leading-none">{child.title}</div>
                                                                    {child.description && (
                                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                            {child.description}
                                                                        </p>
                                                                    )}
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    ) : (
                                        <NavigationMenuItem key={item.title}>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    href={item.href}
                                                    className={navigationMenuTriggerStyle()}
                                                >
                                                    {item.title}
                                                </a>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right side - buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <Button variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>
                            Sign In
                        </Button>
                        <Button onClick={() => navigate(ROUTES.REGISTER)}>
                            Register
                        </Button>
                        <Button
                            variant="default"
                            className="bg-green-600 text-white hover:bg-green-700 font-bold"
                            onClick={accessAdminPanel}
                        >
                            Test Admin Panel
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-4">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pt-4 pb-2">
                        <nav className="flex flex-col space-y-4">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    {item.children ? (
                                        <div className="space-y-2">
                                            <div className="font-medium">{item.title}</div>
                                            <div className="pl-4 border-l-2 border-primary/20 space-y-2">
                                                {item.children.map((child) => (
                                                    <a
                                                        key={child.title}
                                                        href={child.href}
                                                        className="block text-muted-foreground hover:text-foreground transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {child.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="block font-medium hover:text-primary transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </div>
                            ))}
                            <div className="pt-2 flex flex-col space-y-2">
                                <Button variant="outline" onClick={() => {
                                    navigate(ROUTES.LOGIN);
                                    setMobileMenuOpen(false);
                                }}>
                                    Sign In
                                </Button>
                                <Button onClick={() => {
                                    navigate(ROUTES.REGISTER);
                                    setMobileMenuOpen(false);
                                }}>
                                    Register
                                </Button>
                                <Button
                                    variant="default"
                                    className="bg-green-600 text-white hover:bg-green-700 font-bold mt-2"
                                    onClick={() => {
                                        accessAdminPanel();
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Test Admin Panel
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
