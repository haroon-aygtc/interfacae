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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface AIModelConfigProps {
  onSave?: (config: any) => void;
}

const AIModelConfig: React.FC<AIModelConfigProps> = ({ onSave = () => {} }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [provider, setProvider] = useState("gemini");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [apiKey, setApiKey] = useState("");
  const [testStatus, setTestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [testPrompt, setTestPrompt] = useState(
    "Explain quantum computing in simple terms",
  );
  const [testResponse, setTestResponse] = useState("");

  const handleTestConnection = () => {
    setTestStatus("loading");

    // Simulate API call
    setTimeout(() => {
      if (apiKey.length > 10) {
        setTestStatus("success");
        setTestResponse(
          "Quantum computing uses quantum bits or qubits which can exist in multiple states simultaneously, unlike classical bits that are either 0 or 1. This property, called superposition, allows quantum computers to process vast amounts of information more efficiently for certain types of problems.",
        );
      } else {
        setTestStatus("error");
        setTestResponse(
          "Error: Invalid API key or connection failed. Please check your credentials and try again.",
        );
      }
    }, 1500);
  };

  const handleSaveConfig = () => {
    const config = {
      provider,
      temperature: temperature[0],
      maxTokens,
      apiKey,
    };
    onSave(config);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex flex-col space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI Model Configuration</h1>
          <Button onClick={handleSaveConfig}>Save Configuration</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Selection</CardTitle>
                <CardDescription>
                  Choose your AI model provider and configure basic settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="provider">AI Provider</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger id="provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Google Gemini</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="huggingface">Hugging Face</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="cohere">Cohere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">
                      Temperature: {temperature[0].toFixed(2)}
                    </Label>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.01}
                    value={temperature}
                    onValueChange={setTemperature}
                  />
                  <p className="text-sm text-muted-foreground">
                    Controls randomness: Lower values are more deterministic,
                    higher values more creative.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    min={1}
                    max={8192}
                    value={maxTokens}
                    onChange={(e) =>
                      setMaxTokens(parseInt(e.target.value) || 1024)
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum number of tokens to generate in the response.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Fine-tune model behavior with advanced parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model-version">Model Version</Label>
                  <Select defaultValue="latest">
                    <SelectTrigger id="model-version">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="legacy">Legacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="top-p">Top P</Label>
                  <Slider
                    id="top-p"
                    defaultValue={[0.9]}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                  <p className="text-sm text-muted-foreground">
                    Controls diversity via nucleus sampling.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency-penalty">Frequency Penalty</Label>
                  <Slider
                    id="frequency-penalty"
                    defaultValue={[0]}
                    min={-2}
                    max={2}
                    step={0.1}
                  />
                  <p className="text-sm text-muted-foreground">
                    Reduces repetition of token sequences.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="presence-penalty">Presence Penalty</Label>
                  <Slider
                    id="presence-penalty"
                    defaultValue={[0]}
                    min={-2}
                    max={2}
                    step={0.1}
                  />
                  <p className="text-sm text-muted-foreground">
                    Reduces repetition of topics.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="stream-response" />
                  <Label htmlFor="stream-response">Stream Response</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="log-requests" />
                  <Label htmlFor="log-requests">Log Requests</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Connection</CardTitle>
                <CardDescription>
                  Verify your configuration by testing the AI model connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="test-prompt">Test Prompt</Label>
                  <Textarea
                    id="test-prompt"
                    placeholder="Enter a test prompt"
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleTestConnection}
                  disabled={testStatus === "loading"}
                  className="w-full"
                >
                  {testStatus === "loading" ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Testing Connection...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>

                {testStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      Connection successful! The model is responding correctly.
                    </AlertDescription>
                  </Alert>
                )}

                {testStatus === "error" && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600">
                      Connection failed. Please check your API key and settings.
                    </AlertDescription>
                  </Alert>
                )}

                {(testStatus === "success" || testStatus === "error") && (
                  <div className="space-y-2">
                    <Label>Response</Label>
                    <div className="p-4 rounded-md bg-muted whitespace-pre-wrap">
                      {testResponse}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIModelConfig;
