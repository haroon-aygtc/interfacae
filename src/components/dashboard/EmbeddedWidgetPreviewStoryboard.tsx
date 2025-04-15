import { EmbeddedWidgetPreview } from "./EmbeddedWidgetPreview";

export default function EmbeddedWidgetPreviewStoryboard() {
  return (
    <div className="bg-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Widget Preview</h2>
      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
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
