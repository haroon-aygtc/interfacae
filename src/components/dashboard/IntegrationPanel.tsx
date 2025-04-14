import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Code, Copy, ExternalLink, Check } from "lucide-react";
import EmbeddedWidgetPreview from "./EmbeddedWidgetPreview";

const IntegrationPanel = () => {
  const [widgetColor, setWidgetColor] = useState("#7c3aed");
  const [widgetSize, setWidgetSize] = useState([60]);
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [autoOpen, setAutoOpen] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hello! How can I help you today?",
  );
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState<{
    iframe: boolean;
    webComponent: boolean;
  }>({ iframe: false, webComponent: false });

  const iframeCode = `<iframe
  src="https://your-domain.com/chat-widget"
  width="0"
  height="0"
  style="border:none;position:absolute"
  allow="microphone"
  title="AI Chat Widget"
></iframe>`;

  const webComponentCode = `<script src="https://your-domain.com/chat-widget.js"></script>
<ai-chat-widget
  position="${widgetPosition}"
  color="${widgetColor}"
  size="${widgetSize[0]}"
  auto-open="${autoOpen}"
  welcome-message="${welcomeMessage}"
  dark-mode="${darkMode}"
></ai-chat-widget>`;

  const handleCopyCode = (type: "iframe" | "webComponent") => {
    const codeToCopy = type === "iframe" ? iframeCode : webComponentCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleResetDefaults = () => {
    setWidgetColor("#7c3aed");
    setWidgetSize([60]);
    setWidgetPosition("bottom-right");
    setAutoOpen(true);
    setWelcomeMessage("Hello! How can I help you today?");
    setDarkMode(false);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Integration Settings</h1>
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
      </div>

      <Tabs defaultValue="widget" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="widget">Widget Configuration</TabsTrigger>
          <TabsTrigger value="code">Integration Code</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TabsContent value="widget" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Widget Appearance</CardTitle>
                  <CardDescription>
                    Customize how your chat widget looks on your website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="widget-color">Widget Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="widget-color"
                        type="color"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Widget Size</Label>
                    <Slider
                      value={widgetSize}
                      min={40}
                      max={80}
                      step={1}
                      onValueChange={setWidgetSize}
                    />
                    <div className="text-sm text-muted-foreground">
                      {widgetSize[0]}px
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Widget Position</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          widgetPosition === "top-left" ? "default" : "outline"
                        }
                        onClick={() => setWidgetPosition("top-left")}
                        className="justify-start"
                      >
                        Top Left
                      </Button>
                      <Button
                        variant={
                          widgetPosition === "top-right" ? "default" : "outline"
                        }
                        onClick={() => setWidgetPosition("top-right")}
                        className="justify-end"
                      >
                        Top Right
                      </Button>
                      <Button
                        variant={
                          widgetPosition === "bottom-left"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setWidgetPosition("bottom-left")}
                        className="justify-start"
                      >
                        Bottom Left
                      </Button>
                      <Button
                        variant={
                          widgetPosition === "bottom-right"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setWidgetPosition("bottom-right")}
                        className="justify-end"
                      >
                        Bottom Right
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-open">Auto-open on page load</Label>
                    <Switch
                      id="auto-open"
                      checked={autoOpen}
                      onCheckedChange={setAutoOpen}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea
                      id="welcome-message"
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Enter a welcome message for your visitors"
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetDefaults}>
                    Reset to Defaults
                  </Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>iFrame Embed</CardTitle>
                  <CardDescription>
                    Add this code to your website to embed the chat widget.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                      {iframeCode}
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode("iframe")}
                    >
                      {copied.iframe ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Web Component</CardTitle>
                  <CardDescription>
                    Use this code for a more customizable integration.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                      {webComponentCode}
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode("webComponent")}
                    >
                      {copied.webComponent ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-2">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Test on Demo Page
                  </Button>
                  <Button size="sm">
                    <Code className="mr-2 h-4 w-4" />
                    Advanced Configuration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Configuration</CardTitle>
                  <CardDescription>
                    Fine-tune widget behavior and performance settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Animation Speed</Label>
                    <Slider
                      defaultValue={[300]}
                      min={100}
                      max={500}
                      step={10}
                    />
                    <div className="text-sm text-muted-foreground">
                      300ms (Default)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Z-Index</Label>
                    <Input type="number" defaultValue="9999" />
                    <div className="text-sm text-muted-foreground">
                      Controls the stacking order of the widget
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mobile Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        Adjust widget size and position on mobile devices
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Persistent Chat History</Label>
                      <p className="text-sm text-muted-foreground">
                        Save chat history between sessions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Typing Indicators</Label>
                      <p className="text-sm text-muted-foreground">
                        Show typing animation when AI is responding
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom CSS</CardTitle>
                  <CardDescription>
                    Add custom CSS to further style your widget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="font-mono text-sm min-h-[200px]"
                    placeholder="/* Add your custom CSS here */
.ai-chat-widget {
  /* Custom styles */
}"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See how your chat widget will appear on websites
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[600px] overflow-hidden">
                <EmbeddedWidgetPreview
                  widgetColor={widgetColor}
                  widgetSize={widgetSize[0]}
                  widgetPosition={widgetPosition}
                  autoOpen={autoOpen}
                  welcomeMessage={welcomeMessage}
                  darkMode={darkMode}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default IntegrationPanel;
