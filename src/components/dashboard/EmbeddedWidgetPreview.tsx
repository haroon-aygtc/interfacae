import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, X, Maximize2, Minimize2, Send } from "lucide-react";

interface EmbeddedWidgetPreviewProps {
  widgetColor: string;
  widgetSize: number;
  widgetPosition: string;
  autoOpen: boolean;
  welcomeMessage: string;
  darkMode?: boolean;
}

const EmbeddedWidgetPreview: React.FC<EmbeddedWidgetPreviewProps> = ({
  widgetColor,
  widgetSize,
  widgetPosition,
  autoOpen,
  welcomeMessage,
  darkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    welcomeMessage ? [{ text: welcomeMessage, isUser: false }] : [],
  );

  const handleToggleChat = () => {
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "This is a simulated response from the AI assistant. The actual response would be generated based on your AI model configuration and context rules.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPositionStyles = () => {
    const positionStyles: React.CSSProperties = {};

    if (widgetPosition.includes("bottom")) {
      positionStyles.bottom = "20px";
    } else {
      positionStyles.top = "20px";
    }

    if (widgetPosition.includes("right")) {
      positionStyles.right = "20px";
    } else {
      positionStyles.left = "20px";
    }

    return positionStyles;
  };

  return (
    <div className="relative w-full h-full">
      {/* Website Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md overflow-hidden">
        {/* Header */}
        <div className="h-12 bg-white border-b flex items-center px-4">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1 mx-auto max-w-md">
            <div className="h-6 bg-gray-100 rounded-full w-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="h-40 bg-white rounded-lg shadow-sm mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="h-6 bg-gray-100 rounded w-48 mx-auto mb-3"></div>
                <div className="h-4 bg-gray-100 rounded w-64 mx-auto"></div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="h-32 bg-white rounded-lg shadow-sm"></div>
              <div className="h-32 bg-white rounded-lg shadow-sm"></div>
              <div className="h-32 bg-white rounded-lg shadow-sm"></div>
              <div className="h-32 bg-white rounded-lg shadow-sm"></div>
            </div>

            {/* Footer */}
            <div className="h-20 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-100 rounded w-20"></div>
                <div className="h-4 bg-gray-100 rounded w-20"></div>
                <div className="h-4 bg-gray-100 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget Button */}
      <div
        style={{
          ...getPositionStyles(),
          position: "absolute",
          backgroundColor: widgetColor,
          width: `${widgetSize}px`,
          height: `${widgetSize}px`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 50,
          transition: "all 0.3s ease",
        }}
        onClick={handleToggleChat}
        className="hover:shadow-lg transform hover:scale-105 transition-all"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </div>

      {/* Chat Widget Window */}
      {isOpen && (
        <div
          style={{
            ...getPositionStyles(),
            position: "absolute",
            width: isMinimized ? "300px" : "360px",
            height: isMinimized ? "60px" : "500px",
            backgroundColor: darkMode ? "#1f2937" : "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 49,
            transition: "all 0.3s ease",
            transform: `translateY(${widgetPosition.includes("bottom") ? "-80px" : "80px"})`,
          }}
          className="border border-gray-200"
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: widgetColor,
              padding: "12px 16px",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">AI Chat Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              {!isMinimized ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={handleMinimize}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(false)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div
                style={{
                  flex: 1,
                  padding: "16px",
                  overflowY: "auto",
                  backgroundColor: darkMode ? "#111827" : "#f9fafb",
                }}
                className="space-y-4"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.isUser
                          ? `bg-${widgetColor.replace("#", "")} text-white`
                          : darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-white text-gray-800 border border-gray-200"
                      }`}
                      style={{
                        backgroundColor: msg.isUser
                          ? widgetColor
                          : darkMode
                            ? "#374151"
                            : "white",
                      }}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div
                style={{
                  borderTop: "1px solid",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                  padding: "12px 16px",
                  backgroundColor: darkMode ? "#1f2937" : "white",
                }}
                className="flex items-center"
              >
                <input
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: darkMode ? "#4b5563" : "#e5e7eb",
                    backgroundColor: darkMode ? "#374151" : "white",
                    color: darkMode ? "white" : "black",
                    marginRight: "8px",
                  }}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button
                  style={{
                    backgroundColor: widgetColor,
                    color: "white",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleSendMessage}
                  className="p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmbeddedWidgetPreview;
