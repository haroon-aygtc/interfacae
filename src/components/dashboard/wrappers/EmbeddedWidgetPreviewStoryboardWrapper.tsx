import React from 'react';
import DashboardPage from '@/components/layouts/DashboardPage';
import EmbeddedWidgetPreviewStoryboard from '@/components/dashboard/EmbeddedWidgetPreviewStoryboard';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';

const EmbeddedWidgetPreviewStoryboardWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Widget Preview"
      description="Preview your chat widget with different configurations"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Integration", href: ROUTES.INTEGRATION },
        { label: "Widget Preview" }
      ]}
      actions={
        <Button variant="outline" className="gap-2">
          <Maximize className="h-4 w-4" />
          Fullscreen Preview
        </Button>
      }
    >
      <EmbeddedWidgetPreviewStoryboardWithoutHeader />
    </DashboardPage>
  );
};

// Modified version of EmbeddedWidgetPreviewStoryboard without the header
const EmbeddedWidgetPreviewStoryboardWithoutHeader: React.FC = () => {
  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
      <EmbeddedWidgetPreviewStoryboard />
    </div>
  );
};

export default EmbeddedWidgetPreviewStoryboardWrapper;
