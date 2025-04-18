import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  title,
  description,
  breadcrumbItems,
  actions
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page header with breadcrumbs */}
          {(title || breadcrumbItems) && (
            <div className="mb-8">
              {breadcrumbItems && breadcrumbItems.length > 0 && (
                <Breadcrumb items={breadcrumbItems} className="mb-4" />
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {title && <h1 className="text-2xl font-bold">{title}</h1>}
                  {description && <p className="text-muted-foreground mt-1">{description}</p>}
                </div>

                {actions && <div className="flex-shrink-0">{actions}</div>}
              </div>
            </div>
          )}

          {/* Page content */}
          {children}
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
