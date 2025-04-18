import { EmbeddedWidgetPreview } from "./EmbeddedWidgetPreview";

export default function EmbeddedWidgetPreviewStoryboard() {
  return (
    <div className="bg-background min-h-screen">
      <div className="w-full h-[600px] overflow-hidden">
        <EmbeddedWidgetPreview
          widgetColor="#7c3aed"
          widgetSize={60}
          widgetPosition="bottom-right"
          autoOpen={true}
          welcomeMessage="Hello! How can I help you today?"
          darkMode={false}
          quickResponses={["How does this work?", "What can you help with?", "Can I speak to a human?"]}
        />
      </div>
    </div>
  );
}
