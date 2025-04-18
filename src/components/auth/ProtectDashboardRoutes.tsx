import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes";
import DashboardLayout from "@/components/layouts/DashboardLayout";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProtectDashboardRouteProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  actions?: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectDashboardRoute({
  children,
  title,
  description,
  breadcrumbItems,
  actions,
  redirectTo = ROUTES.LOGIN
}: ProtectDashboardRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Render children wrapped in DashboardLayout if authenticated
  return (
    <DashboardLayout
      title={title}
      description={description}
      breadcrumbItems={breadcrumbItems}
      actions={actions}
    >
      {children}
    </DashboardLayout>
  );
}
