import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, X, Maximize2, Minimize2, Send, HelpCircle, Settings, Info, Brain } from "lucide-react";
import AIInsightsPanel from "./AIInsightsPanel";

interface EmbeddedWidgetPreviewProps {
  widgetColor: string;
  widgetSize: number;
  widgetPosition: string;
  autoOpen: boolean;
  welcomeMessage: string;
  darkMode?: boolean;
  quickResponses?: string[];
  language?: string;
  showAIInsights?: boolean;
}

// Language translations
const translations = {
  en: {
    chatTitle: "AI Chat Assistant",
    inputPlaceholder: "Type your message...",
    helpTitle: "Frequently Asked Questions",
    settingsTitle: "Chat Settings",
    accessibilityLabel: "Accessibility options",
    accessibilityText: "Accessibility",
    uploadLabel: "Upload file",
    sendLabel: "Send message",
    darkModeLabel: "Dark Mode",
    darkModeDesc: "Switch between light and dark themes",
    soundLabel: "Sound Notifications",
    soundDesc: "Play sound when receiving messages",
    historyLabel: "Save Chat History",
    historyDesc: "Save conversations for future reference",
    largeTextLabel: "Larger Text",
    largeTextDesc: "Increase text size for better readability",
    screenReaderLabel: "Screen Reader Support",
    screenReaderDesc: "Enhanced compatibility with screen readers",
    aboutTitle: "About",
    aboutVersion: "AI Chat Assistant v1.0",
    aboutDesc: "Powered by advanced AI technology to provide helpful and accurate responses.",
    chatTab: "Chat",
    helpTab: "Help",
    settingsTab: "Settings",
  },
  es: {
    chatTitle: "Asistente de Chat IA",
    inputPlaceholder: "Escribe tu mensaje...",
    helpTitle: "Preguntas Frecuentes",
    settingsTitle: "Configuración del Chat",
    accessibilityLabel: "Opciones de accesibilidad",
    accessibilityText: "Accesibilidad",
    uploadLabel: "Subir archivo",
    sendLabel: "Enviar mensaje",
    darkModeLabel: "Modo Oscuro",
    darkModeDesc: "Cambiar entre temas claros y oscuros",
    soundLabel: "Notificaciones de Sonido",
    soundDesc: "Reproducir sonido al recibir mensajes",
    historyLabel: "Guardar Historial de Chat",
    historyDesc: "Guardar conversaciones para referencia futura",
    largeTextLabel: "Texto Grande",
    largeTextDesc: "Aumentar el tamaño del texto para mejor legibilidad",
    screenReaderLabel: "Soporte para Lector de Pantalla",
    screenReaderDesc: "Compatibilidad mejorada con lectores de pantalla",
    aboutTitle: "Acerca de",
    aboutVersion: "Asistente de Chat IA v1.0",
    aboutDesc: "Impulsado por tecnología avanzada de IA para proporcionar respuestas útiles y precisas.",
    chatTab: "Chat",
    helpTab: "Ayuda",
    settingsTab: "Ajustes",
  },
  fr: {
    chatTitle: "Assistant de Chat IA",
    inputPlaceholder: "Tapez votre message...",
    helpTitle: "Questions Fréquentes",
    settingsTitle: "Paramètres du Chat",
    accessibilityLabel: "Options d'accessibilité",
    accessibilityText: "Accessibilité",
    uploadLabel: "Télécharger un fichier",
    sendLabel: "Envoyer un message",
    darkModeLabel: "Mode Sombre",
    darkModeDesc: "Basculer entre les thèmes clairs et sombres",
    soundLabel: "Notifications Sonores",
    soundDesc: "Jouer un son lors de la réception de messages",
    historyLabel: "Enregistrer l'Historique",
    historyDesc: "Enregistrer les conversations pour référence future",
    largeTextLabel: "Texte Plus Grand",
    largeTextDesc: "Augmenter la taille du texte pour une meilleure lisibilité",
    screenReaderLabel: "Support Lecteur d'Écran",
    screenReaderDesc: "Compatibilité améliorée avec les lecteurs d'écran",
    aboutTitle: "À Propos",
    aboutVersion: "Assistant de Chat IA v1.0",
    aboutDesc: "Propulsé par une technologie d'IA avancée pour fournir des réponses utiles et précises.",
    chatTab: "Chat",
    helpTab: "Aide",
    settingsTab: "Paramètres",
  },
};

const EmbeddedWidgetPreview: React.FC<EmbeddedWidgetPreviewProps> = ({
  widgetColor,
  widgetSize,
  widgetPosition,
  autoOpen,
  welcomeMessage,
  darkMode = false,
  quickResponses = ["How does this work?", "What can you help with?", "Can I speak to a human?"],
  language = "en",
  showAIInsights = true,
}) => {
  // Get translations for the selected language (default to English if language not found)
  const t = translations[language as keyof typeof translations] || translations.en;
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    welcomeMessage ? [{ text: welcomeMessage, isUser: false }] : [],
  );
  const [activeTab, setActiveTab] = useState("chat");

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

    // Simulate AI response after a longer delay to show typing indicator
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "This is a simulated response from the AI assistant. The actual response would be generated based on your AI model configuration and context rules.",
          isUser: false,
        },
      ]);
    }, 2000); // 2 second delay to show typing indicator
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
              <span className="font-medium">{t.chatTitle}</span>
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
              {/* Navigation Tabs */}
              <div
                style={{
                  borderBottom: "1px solid",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                  backgroundColor: darkMode ? "#1f2937" : "white",
                }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3 bg-transparent h-10">
                    <TabsTrigger
                      value="chat"
                      className={`data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "chat" ? "border-b-2" : ""}`}
                      style={{ borderColor: activeTab === "chat" ? widgetColor : "transparent" }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t.chatTab}
                    </TabsTrigger>
                    <TabsTrigger
                      value="help"
                      className={`data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "help" ? "border-b-2" : ""}`}
                      style={{ borderColor: activeTab === "help" ? widgetColor : "transparent" }}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      {t.helpTab}
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className={`data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "settings" ? "border-b-2" : ""}`}
                      style={{ borderColor: activeTab === "settings" ? widgetColor : "transparent" }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t.settingsTab}
                    </TabsTrigger>
                    <TabsTrigger
                      value="insights"
                      className={`data-[state=active]:bg-transparent data-[state=active]:shadow-none ${activeTab === "insights" ? "border-b-2" : ""}`}
                      style={{ borderColor: activeTab === "insights" ? widgetColor : "transparent" }}
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      AI Insights
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Tab Content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Chat Tab */}
                {activeTab === "chat" && (
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
                          className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
                        >
                          {!msg.isUser && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                              AI
                            </div>
                          )}
                          <div
                            className={`relative max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm ${
                              msg.isUser
                                ? `bg-${widgetColor.replace("#", "")} text-white`
                                : darkMode
                                  ? "bg-gray-700 text-white"
                                  : "bg-white text-gray-800 border border-gray-200"
                            } ${msg.isUser ? "rounded-tr-none" : "rounded-tl-none"}`}
                            style={{
                              backgroundColor: msg.isUser
                                ? widgetColor
                                : darkMode
                                  ? "#374151"
                                  : "white",
                            }}
                          >
                            {/* Bubble pointer */}
                            <div
                              className={`absolute top-0 ${msg.isUser ? "right-0 -mr-2" : "left-0 -ml-2"} w-4 h-4 transform rotate-45`}
                              style={{
                                backgroundColor: msg.isUser
                                  ? widgetColor
                                  : darkMode
                                    ? "#374151"
                                    : "white",
                              }}
                            ></div>
                            <p className="text-sm relative z-10">{msg.text}</p>
                            <div className="text-xs mt-1 opacity-70 text-right">
                              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>

                            {/* AI Insights Panel - only show for AI messages */}
                            {showAIInsights && !msg.isUser && (
                              <div className="mt-3">
                                <AIInsightsPanel compact={true} messageId={`msg-${index}`} />
                              </div>
                            )}
                          </div>
                          {msg.isUser && (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold ml-2 flex-shrink-0">
                              You
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Quick Response Buttons - Show only after first bot message and no user messages yet */}
                      {messages.length === 1 && !messages.some(msg => msg.isUser) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {quickResponses.map((response, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setMessage(response);
                                setMessages([...messages, { text: response, isUser: true }]);

                                // Simulate AI response after a delay to show typing indicator
                                setTimeout(() => {
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      text: `Thanks for asking about "${response}". Here's some information that might help...`,
                                      isUser: false,
                                    },
                                  ]);
                                }, 2000); // 2 second delay to show typing indicator
                              }}
                              className="text-xs py-1.5 px-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                              style={{ borderColor: darkMode ? "#4b5563" : "#e5e7eb" }}
                            >
                              {response}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Typing indicator - show when AI is "thinking" */}
                      {messages.length > 0 && messages[messages.length-1].isUser && (
                        <div className="flex justify-start animate-fadeIn">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                            AI
                          </div>
                          <div
                            className={`relative max-w-[80%] rounded-2xl px-4 py-2.5 rounded-tl-none shadow-sm ${darkMode ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                            style={{ backgroundColor: darkMode ? "#374151" : "white" }}
                          >
                            {/* Bubble pointer */}
                            <div
                              className="absolute top-0 left-0 -ml-2 w-4 h-4 transform rotate-45"
                              style={{ backgroundColor: darkMode ? "#374151" : "white" }}
                            ></div>
                            <div className="flex space-x-1 items-center h-5 relative z-10">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "300ms" }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input Area */}
                    <div
                      style={{
                        borderTop: "1px solid",
                        borderColor: darkMode ? "#374151" : "#e5e7eb",
                        padding: "12px 16px",
                        backgroundColor: darkMode ? "#1f2937" : "white",
                      }}
                      className="flex flex-col"
                    >
                      {/* Accessibility note */}
                      <div className="flex items-center mb-2">
                        <button
                          type="button"
                          className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                          aria-label="Accessibility options"
                          onClick={() => setActiveTab("settings")}
                        >
                          <span className="sr-only">{t.accessibilityLabel}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"></path>
                          </svg>
                          <span>{t.accessibilityText}</span>
                        </button>
                      </div>

                      {/* Input and buttons */}
                      <div className="flex items-center w-full">
                        <button
                          type="button"
                          className="mr-2 text-gray-500 hover:text-gray-700"
                          aria-label="Upload file"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </button>
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
                          placeholder={t.inputPlaceholder}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          aria-label="Message input"
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
                          aria-label="Send message"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Help Tab */}
                {activeTab === "help" && (
                  <div
                    style={{
                      flex: 1,
                      padding: "16px",
                      overflowY: "auto",
                      backgroundColor: darkMode ? "#111827" : "#f9fafb",
                    }}
                    className="space-y-4"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-2 flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" style={{ color: widgetColor }} />
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-medium">How can I ask a question?</p>
                          <p className="text-gray-600">Simply type your question in the chat box and press Enter or click the send button.</p>
                        </div>
                        <div>
                          <p className="font-medium">What kind of questions can I ask?</p>
                          <p className="text-gray-600">You can ask anything related to our products, services, or general information about our company.</p>
                        </div>
                        <div>
                          <p className="font-medium">Is my conversation private?</p>
                          <p className="text-gray-600">Yes, your conversation is private and secure. We only use it to improve our service.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" style={{ color: widgetColor }} />
                        Tips for Better Results
                      </h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Be specific with your questions</li>
                        <li>Provide context when needed</li>
                        <li>Ask one question at a time</li>
                        <li>Use clear and simple language</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div
                    style={{
                      flex: 1,
                      padding: "16px",
                      overflowY: "auto",
                      backgroundColor: darkMode ? "#111827" : "#f9fafb",
                    }}
                    className="space-y-4"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-3 flex items-center">
                        <Settings className="h-4 w-4 mr-2" style={{ color: widgetColor }} />
                        Chat Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Dark Mode</p>
                            <p className="text-xs text-gray-500">Switch between light and dark themes</p>
                          </div>
                          <Switch checked={darkMode} onCheckedChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Sound Notifications</p>
                            <p className="text-xs text-gray-500">Play sound when receiving messages</p>
                          </div>
                          <Switch checked={true} onCheckedChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Save Chat History</p>
                            <p className="text-xs text-gray-500">Save conversations for future reference</p>
                          </div>
                          <Switch checked={true} onCheckedChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Larger Text</p>
                            <p className="text-xs text-gray-500">Increase text size for better readability</p>
                          </div>
                          <Switch checked={false} onCheckedChange={() => {}} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Screen Reader Support</p>
                            <p className="text-xs text-gray-500">Enhanced compatibility with screen readers</p>
                          </div>
                          <Switch checked={true} onCheckedChange={() => {}} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-2">About</h3>
                      <p className="text-sm text-gray-600 mb-2">AI Chat Assistant v1.0</p>
                      <p className="text-xs text-gray-500">Powered by advanced AI technology to provide helpful and accurate responses.</p>
                    </div>
                  </div>
                )}

                {/* AI Insights Tab */}
                {activeTab === "insights" && (
                  <div
                    style={{
                      flex: 1,
                      padding: "16px",
                      overflowY: "auto",
                      backgroundColor: darkMode ? "#111827" : "#f9fafb",
                    }}
                    className="space-y-4"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-2 flex items-center">
                        <Brain className="h-4 w-4 mr-2" style={{ color: widgetColor }} />
                        AI Performance Metrics
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Response Confidence</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Knowledge Relevance</span>
                            <span className="font-medium">87%</span>
                          </div>
                          <Progress value={87} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Response Time</span>
                            <span className="font-medium">0.8s</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" style={{ color: widgetColor }} />
                        Knowledge Sources
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Product Documentation</span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">95% Match</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Technical Guides</span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">76% Match</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>FAQ Database</span>
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">54% Match</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="font-medium text-base mb-2 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" style={{ color: widgetColor }} />
                        Conversation Stats
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 rounded text-center">
                          <div className="text-2xl font-bold text-primary">4</div>
                          <div>Total Messages</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded text-center">
                          <div className="text-2xl font-bold text-primary">480</div>
                          <div>Total Tokens</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded text-center">
                          <div className="text-2xl font-bold text-primary">2</div>
                          <div>User Questions</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded text-center">
                          <div className="text-2xl font-bold text-primary">2</div>
                          <div>AI Responses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { EmbeddedWidgetPreview };
export default EmbeddedWidgetPreview;
