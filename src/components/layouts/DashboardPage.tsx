import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface DashboardPageProps {
  title: string;
  description?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  title,
  description,
  breadcrumbItems = [],
  actions,
  children,
}) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title={title}
          description={description}
          actions={actions}
        />

        {breadcrumbItems.length > 0 && (
          <div className="px-6 py-3 border-b border-border bg-background">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link to={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <span className="text-muted-foreground">{item.label}</span>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        <div className="flex-1 overflow-auto p-6 bg-background text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
