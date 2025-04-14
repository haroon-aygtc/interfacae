import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Brain,
  MessageSquare,
  Database,
  Settings,
  Sparkles,
  Zap,
  BookOpen,
  FileText,
  MessageCircle,
  LayoutTemplate,
  Play,
  Save,
  Plus,
  Trash2,
  Edit,
  Copy,
  Check,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Prompt {
  id: string;
  name: string;
  content: string;
  description: string;
  category: string;
  isDefault?: boolean;
}

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  lastUpdated: string;
  size: string;
}

interface ContextRule {
  id: string;
  name: string;
  description: string;
  type: "document" | "website" | "custom";
  content: string;
  priority: number;
  isActive: boolean;
}

interface FollowUpQuestion {
  id: string;
  question: string;
  context: string;
  isDefault?: boolean;
}

interface ResponseFormat {
  id: string;
  name: string;
  description: string;
  template: string;
  isDefault?: boolean;
}

interface AIConfig {
  name: string;
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  selectedPromptId: string;
  selectedKnowledgeBaseIds: string[];
  selectedContextRuleIds: string[];
  enableFollowUpQuestions: boolean;
  selectedFollowUpQuestionIds: string[];
  selectedResponseFormatId: string;
  customInstructions: string;
}

const AIIntegrationPanel: React.FC = () => {
  // Mock data
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "p1",
      name: "Customer Support Agent",
      content:
        "You are a helpful customer support agent for our company. Answer customer questions accurately based on the provided knowledge base. If you don't know the answer, politely say so and offer to connect them with a human agent.",
      description: "Friendly customer support agent for general inquiries",
      category: "Support",
      isDefault: true,
    },
    {
      id: "p2",
      name: "Technical Documentation Assistant",
      content:
        "You are a technical documentation assistant. Provide clear, concise explanations of technical concepts and guide users through implementation steps based on our documentation.",
      description:
        "Technical assistant focused on documentation and implementation",
      category: "Documentation",
    },
    {
      id: "p3",
      name: "Product Recommendation Agent",
      content:
        "You are a product recommendation specialist. Based on the customer's needs and preferences, recommend the most suitable products from our catalog.",
      description: "Helps customers find the right products",
      category: "Sales",
    },
  ]);

  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    {
      id: "kb1",
      name: "Product Documentation",
      description: "Official documentation for all our products and services",
      documentCount: 128,
      lastUpdated: "2023-06-15",
      size: "24.5 MB",
    },
    {
      id: "kb2",
      name: "FAQ Database",
      description: "Frequently asked questions and their answers",
      documentCount: 75,
      lastUpdated: "2023-06-10",
      size: "8.2 MB",
    },
    {
      id: "kb3",
      name: "Technical Guides",
      description: "Step-by-step technical guides and tutorials",
      documentCount: 42,
      lastUpdated: "2023-06-05",
      size: "15.7 MB",
    },
  ]);

  const [contextRules, setContextRules] = useState<ContextRule[]>([
    {
      id: "cr1",
      name: "Product Specifications",
      description: "Technical specifications for all products",
      type: "document",
      content: "product_specs.pdf",
      priority: 1,
      isActive: true,
    },
    {
      id: "cr2",
      name: "Pricing Information",
      description: "Current pricing and discount policies",
      type: "website",
      content: "https://example.com/pricing",
      priority: 2,
      isActive: true,
    },
    {
      id: "cr3",
      name: "Company Policies",
      description: "Return, refund, and shipping policies",
      type: "custom",
      content: "Our company has a 30-day return policy for all products...",
      priority: 3,
      isActive: false,
    },
  ]);

  const [followUpQuestions, setFollowUpQuestions] = useState<
    FollowUpQuestion[]
  >([
    {
      id: "fq1",
      question: "Would you like more details about this product?",
      context: "product_inquiry",
      isDefault: true,
    },
    {
      id: "fq2",
      question: "Do you need help with installation?",
      context: "technical_support",
      isDefault: true,
    },
    {
      id: "fq3",
      question: "Would you like to know about our pricing options?",
      context: "pricing",
      isDefault: false,
    },
  ]);

  const [responseFormats, setResponseFormats] = useState<ResponseFormat[]>([
    {
      id: "rf1",
      name: "Standard Response",
      description: "Clear, concise responses with a friendly tone",
      template: "{{greeting}}\n\n{{answer}}\n\n{{closing}}",
      isDefault: true,
    },
    {
      id: "rf2",
      name: "Technical Documentation",
      description: "Structured technical responses with code examples",
      template:
        "## {{title}}\n\n{{explanation}}\n\n```\n{{code_example}}\n```\n\n**Note:** {{note}}",
      isDefault: false,
    },
    {
      id: "rf3",
      name: "Step-by-Step Guide",
      description: "Numbered steps for processes and tutorials",
      template:
        "# {{title}}\n\n{{introduction}}\n\n1. {{step1}}\n2. {{step2}}\n3. {{step3}}\n\n{{conclusion}}",
      isDefault: false,
    },
  ]);

  // State for the current configuration
  const [currentConfig, setCurrentConfig] = useState<AIConfig>({
    name: "Default Configuration",
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1024,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    selectedPromptId: "p1",
    selectedKnowledgeBaseIds: ["kb1"],
    selectedContextRuleIds: ["cr1", "cr2"],
    enableFollowUpQuestions: true,
    selectedFollowUpQuestionIds: ["fq1", "fq2"],
    selectedResponseFormatId: "rf1",
    customInstructions: "",
  });

  // State for the test area
  const [testQuery, setTestQuery] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("configuration");
  const [configName, setConfigName] = useState("Default Configuration");
  const [isSaving, setIsSaving] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<AIConfig[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPromptDialog, setNewPromptDialog] = useState(false);
  const [newPrompt, setNewPrompt] = useState<{
    name: string;
    description: string;
    category: string;
    content: string;
  }>({
    name: "",
    description: "",
    category: "General",
    content: "",
  });

  // Function to handle saving a configuration
  const handleSaveConfig = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      const configToSave = { ...currentConfig, name: configName };
      setSavedConfigs([...savedConfigs, configToSave]);
      setIsSaving(false);
      setShowSaveDialog(false);
      setConfigName("Default Configuration");
    }, 1000);
  };

  // Function to handle loading a configuration
  const handleLoadConfig = (config: AIConfig) => {
    setCurrentConfig(config);
  };

  // Function to handle creating a new prompt
  const handleCreatePrompt = () => {
    const newPromptObj: Prompt = {
      id: `p${prompts.length + 1}`,
      ...newPrompt,
    };
    setPrompts([...prompts, newPromptObj]);
    setCurrentConfig({
      ...currentConfig,
      selectedPromptId: newPromptObj.id,
    });
    setNewPrompt({
      name: "",
      description: "",
      category: "General",
      content: "",
    });
    setNewPromptDialog(false);
  };

  // Function to handle generating a test response
  const handleGenerateResponse = () => {
    if (!testQuery.trim()) return;

    setIsGenerating(true);
    setTestResponse("");

    // Simulate API call with typing effect
    let response = "";
    if (currentConfig.selectedPromptId === "p1") {
      response =
        "Thank you for your question! Based on our product documentation, the feature you're asking about is available in the Pro and Enterprise plans. The setup process is straightforward - you can access it from your account settings under 'Advanced Features'. If you need any help with the setup, our support team is available 24/7 through the chat widget on our website.";
    } else if (currentConfig.selectedPromptId === "p2") {
      response =
        "# Setting Up API Integration\n\n## Prerequisites\n- Valid API key (generate from your dashboard)\n- Account with Developer access or higher\n\n## Implementation Steps\n1. Install our SDK using npm: `npm install @example/sdk`\n2. Initialize the client with your API key\n3. Make your first API call using the provided examples\n\n**Note:** Rate limits apply based on your subscription tier.";
    } else {
      response =
        "Based on your requirements, I recommend our Enterprise Solution package. It includes all the features you mentioned, plus dedicated support and custom integration options. The pricing starts at $499/month with annual billing, which gives you a 20% discount compared to monthly billing. Would you like me to connect you with a sales representative to discuss custom pricing options?";
    }

    let i = 0;
    const interval = setInterval(() => {
      setTestResponse(response.substring(0, i));
      i++;
      if (i > response.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  // Function to handle changes to the current configuration
  const handleConfigChange = (key: keyof AIConfig, value: any) => {
    setCurrentConfig({
      ...currentConfig,
      [key]: value,
    });
  };

  // Function to toggle a knowledge base selection
  const toggleKnowledgeBase = (id: string) => {
    const currentSelection = [...currentConfig.selectedKnowledgeBaseIds];
    const index = currentSelection.indexOf(id);
    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }
    handleConfigChange("selectedKnowledgeBaseIds", currentSelection);
  };

  // Function to toggle a context rule selection
  const toggleContextRule = (id: string) => {
    const currentSelection = [...currentConfig.selectedContextRuleIds];
    const index = currentSelection.indexOf(id);
    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }
    handleConfigChange("selectedContextRuleIds", currentSelection);
  };

  // Function to toggle a follow-up question selection
  const toggleFollowUpQuestion = (id: string) => {
    const currentSelection = [...currentConfig.selectedFollowUpQuestionIds];
    const index = currentSelection.indexOf(id);
    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }
    handleConfigChange("selectedFollowUpQuestionIds", currentSelection);
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 h-6 w-6 text-primary" />
            AI Integration
          </h1>
          <p className="text-muted-foreground">
            Configure and test your AI assistant
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
            <Save className="mr-2 h-4 w-4" /> Save Configuration
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Load Configuration</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Saved Configurations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {savedConfigs.length === 0 ? (
                <DropdownMenuItem disabled>
                  No saved configurations
                </DropdownMenuItem>
              ) : (
                savedConfigs.map((config) => (
                  <DropdownMenuItem
                    key={config.name}
                    onClick={() => handleLoadConfig(config)}
                  >
                    {config.name}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="configuration">
            <Settings className="mr-2 h-4 w-4" /> Configuration
          </TabsTrigger>
          <TabsTrigger value="test">
            <Play className="mr-2 h-4 w-4" /> Test Response
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prompt Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Prompt Template
                </CardTitle>
                <CardDescription>
                  Select a prompt template or create a custom one
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Select
                    value={currentConfig.selectedPromptId}
                    onValueChange={(value) =>
                      handleConfigChange("selectedPromptId", value)
                    }
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select a prompt template" />
                    </SelectTrigger>
                    <SelectContent>
                      {prompts.map((prompt) => (
                        <SelectItem key={prompt.id} value={prompt.id}>
                          {prompt.name}
                          {prompt.isDefault && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Default)
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNewPromptDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> New
                  </Button>
                </div>

                {prompts.find(
                  (p) => p.id === currentConfig.selectedPromptId,
                ) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {
                        prompts.find(
                          (p) => p.id === currentConfig.selectedPromptId,
                        )?.description
                      }
                    </p>
                    <Label className="text-sm font-medium mt-4">
                      Prompt Content
                    </Label>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <pre className="whitespace-pre-wrap">
                        {
                          prompts.find(
                            (p) => p.id === currentConfig.selectedPromptId,
                          )?.content
                        }
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Knowledge Base Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Select knowledge bases to include in responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeBases.map((kb) => (
                    <div
                      key={kb.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        currentConfig.selectedKnowledgeBaseIds.includes(kb.id)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{kb.name}</h3>
                            {currentConfig.selectedKnowledgeBaseIds.includes(
                              kb.id,
                            ) && (
                              <Badge className="ml-2 bg-primary">
                                Selected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {kb.description}
                          </p>
                        </div>
                        <Button
                          variant={
                            currentConfig.selectedKnowledgeBaseIds.includes(
                              kb.id,
                            )
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleKnowledgeBase(kb.id)}
                        >
                          {currentConfig.selectedKnowledgeBaseIds.includes(
                            kb.id,
                          ) ? (
                            <>
                              <Check className="h-4 w-4 mr-1" /> Selected
                            </>
                          ) : (
                            "Select"
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2 space-x-4">
                        <span>{kb.documentCount} documents</span>
                        <span>Last updated: {kb.lastUpdated}</span>
                        <span>{kb.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Context Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  Context Rules
                </CardTitle>
                <CardDescription>
                  Select context rules to guide AI responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contextRules.map((rule) => (
                    <div
                      key={rule.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        currentConfig.selectedContextRuleIds.includes(rule.id)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{rule.name}</h3>
                            <Badge
                              className="ml-2"
                              variant={rule.isActive ? "default" : "outline"}
                            >
                              {rule.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rule.description}
                          </p>
                        </div>
                        <Button
                          variant={
                            currentConfig.selectedContextRuleIds.includes(
                              rule.id,
                            )
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleContextRule(rule.id)}
                        >
                          {currentConfig.selectedContextRuleIds.includes(
                            rule.id,
                          ) ? (
                            <>
                              <Check className="h-4 w-4 mr-1" /> Selected
                            </>
                          ) : (
                            "Select"
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2 space-x-4">
                        <span>
                          Type:{" "}
                          {rule.type === "document"
                            ? "Document"
                            : rule.type === "website"
                              ? "Website"
                              : "Custom"}
                        </span>
                        <span>Priority: {rule.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Follow-up Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                  Follow-up Questions
                </CardTitle>
                <CardDescription>
                  Configure suggested follow-up questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="follow-up-questions"
                      checked={currentConfig.enableFollowUpQuestions}
                      onCheckedChange={(checked) =>
                        handleConfigChange("enableFollowUpQuestions", checked)
                      }
                    />
                    <Label htmlFor="follow-up-questions">
                      Enable follow-up questions
                    </Label>
                  </div>
                </div>

                <div
                  className={`space-y-3 ${
                    !currentConfig.enableFollowUpQuestions && "opacity-50"
                  }`}
                >
                  {followUpQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentConfig.selectedFollowUpQuestionIds.includes(
                          question.id,
                        ) && currentConfig.enableFollowUpQuestions
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`question-${question.id}`}
                            checked={currentConfig.selectedFollowUpQuestionIds.includes(
                              question.id,
                            )}
                            onCheckedChange={() =>
                              toggleFollowUpQuestion(question.id)
                            }
                            disabled={!currentConfig.enableFollowUpQuestions}
                          />
                          <Label
                            htmlFor={`question-${question.id}`}
                            className="font-medium"
                          >
                            {question.question}
                          </Label>
                          {question.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="ml-6 mt-1 text-xs text-muted-foreground">
                        Context: {question.context}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Format */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LayoutTemplate className="mr-2 h-5 w-5 text-primary" />
                  Response Format
                </CardTitle>
                <CardDescription>
                  Select how AI responses should be formatted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select
                    value={currentConfig.selectedResponseFormatId}
                    onValueChange={(value) =>
                      handleConfigChange("selectedResponseFormatId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a response format" />
                    </SelectTrigger>
                    <SelectContent>
                      {responseFormats.map((format) => (
                        <SelectItem key={format.id} value={format.id}>
                          {format.name}
                          {format.isDefault && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Default)
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {responseFormats.find(
                    (f) => f.id === currentConfig.selectedResponseFormatId,
                  ) && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground">
                        {
                          responseFormats.find(
                            (f) =>
                              f.id === currentConfig.selectedResponseFormatId,
                          )?.description
                        }
                      </p>
                      <Label className="text-sm font-medium mt-4">
                        Template
                      </Label>
                      <div className="bg-muted p-3 rounded-md text-sm font-mono">
                        <pre className="whitespace-pre-wrap">
                          {
                            responseFormats.find(
                              (f) =>
                                f.id === currentConfig.selectedResponseFormatId,
                            )?.template
                          }
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Model Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  Model Settings
                </CardTitle>
                <CardDescription>Configure AI model parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="model">AI Model</Label>
                    </div>
                    <Select
                      value={currentConfig.model}
                      onValueChange={(value) =>
                        handleConfigChange("model", value)
                      }
                    >
                      <SelectTrigger id="model">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">
                          GPT-3.5 Turbo
                        </SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="claude-2">Claude 2</SelectItem>
                        <SelectItem value="llama-2">Llama 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="temperature">
                        Temperature: {currentConfig.temperature}
                      </Label>
                    </div>
                    <Slider
                      id="temperature"
                      min={0}
                      max={2}
                      step={0.1}
                      value={[currentConfig.temperature]}
                      onValueChange={(value) =>
                        handleConfigChange("temperature", value[0])
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Controls randomness: Lower values are more deterministic,
                      higher values more creative
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="max-tokens">
                        Max Tokens: {currentConfig.maxTokens}
                      </Label>
                    </div>
                    <Slider
                      id="max-tokens"
                      min={100}
                      max={4000}
                      step={100}
                      value={[currentConfig.maxTokens]}
                      onValueChange={(value) =>
                        handleConfigChange("maxTokens", value[0])
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum length of the generated response
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advanced-settings">
                      <AccordionTrigger>Advanced Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="top-p">
                                Top P: {currentConfig.topP}
                              </Label>
                            </div>
                            <Slider
                              id="top-p"
                              min={0.1}
                              max={1}
                              step={0.05}
                              value={[currentConfig.topP]}
                              onValueChange={(value) =>
                                handleConfigChange("topP", value[0])
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Controls diversity via nucleus sampling
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="frequency-penalty">
                                Frequency Penalty:{" "}
                                {currentConfig.frequencyPenalty}
                              </Label>
                            </div>
                            <Slider
                              id="frequency-penalty"
                              min={0}
                              max={2}
                              step={0.1}
                              value={[currentConfig.frequencyPenalty]}
                              onValueChange={(value) =>
                                handleConfigChange("frequencyPenalty", value[0])
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Reduces repetition of token sequences
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="presence-penalty">
                                Presence Penalty:{" "}
                                {currentConfig.presencePenalty}
                              </Label>
                            </div>
                            <Slider
                              id="presence-penalty"
                              min={0}
                              max={2}
                              step={0.1}
                              value={[currentConfig.presencePenalty]}
                              onValueChange={(value) =>
                                handleConfigChange("presencePenalty", value[0])
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Increases likelihood of new topics
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>

            {/* Custom Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Custom Instructions
                </CardTitle>
                <CardDescription>
                  Add additional instructions for the AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter any additional instructions for the AI..."
                    className="min-h-[150px]"
                    value={currentConfig.customInstructions}
                    onChange={(e) =>
                      handleConfigChange("customInstructions", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    These instructions will be appended to the prompt template
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Test Your AI Configuration
                </CardTitle>
                <CardDescription>
                  Enter a test query to see how your AI would respond with the
                  current configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-query">Test Query</Label>
                    <div className="flex gap-2">
                      <Textarea
                        id="test-query"
                        placeholder="Enter a test query here..."
                        className="flex-1"
                        value={testQuery}
                        onChange={(e) => setTestQuery(e.target.value)}
                      />
                      <Button
                        className="self-end"
                        onClick={handleGenerateResponse}
                        disabled={isGenerating || !testQuery.trim()}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" /> Generate Response
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="response">AI Response</Label>
                      {testResponse && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigator.clipboard.writeText(testResponse)
                          }
                        >
                          <Copy className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-lg border min-h-[300px] ${testResponse ? "bg-muted/50" : "bg-muted/20"}`}
                    >
                      {isGenerating ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating response...</span>
                        </div>
                      ) : testResponse ? (
                        <div className="whitespace-pre-wrap">
                          {testResponse}
                        </div>
                      ) : (
                        <div className="text-muted-foreground flex flex-col items-center justify-center h-full">
                          <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
                          <p>AI response will appear here</p>
                          <p className="text-sm">
                            Try generating a response with your current
                            configuration
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Using model:{" "}
                  <span className="font-medium">{currentConfig.model}</span>{" "}
                  with temperature{" "}
                  <span className="font-medium">
                    {currentConfig.temperature}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTestQuery("");
                    setTestResponse("");
                  }}
                  disabled={!testQuery && !testResponse}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Configuration Summary</CardTitle>
                <CardDescription>
                  Overview of your current AI configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Prompt Template
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {prompts.find(
                        (p) => p.id === currentConfig.selectedPromptId,
                      )?.name || "None selected"}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Model Settings</h3>
                    <div className="text-sm text-muted-foreground">
                      Model: {currentConfig.model}
                      <br />
                      Temperature: {currentConfig.temperature}
                      <br />
                      Max Tokens: {currentConfig.maxTokens}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Knowledge Bases
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {currentConfig.selectedKnowledgeBaseIds.length > 0
                        ? currentConfig.selectedKnowledgeBaseIds
                            .map(
                              (id) =>
                                knowledgeBases.find((kb) => kb.id === id)?.name,
                            )
                            .join(", ")
                        : "None selected"}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Context Rules</h3>
                    <div className="text-sm text-muted-foreground">
                      {currentConfig.selectedContextRuleIds.length > 0
                        ? currentConfig.selectedContextRuleIds
                            .map(
                              (id) =>
                                contextRules.find((rule) => rule.id === id)
                                  ?.name,
                            )
                            .join(", ")
                        : "None selected"}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Follow-up Questions
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {currentConfig.enableFollowUpQuestions
                        ? currentConfig.selectedFollowUpQuestionIds.length > 0
                          ? `${currentConfig.selectedFollowUpQuestionIds.length} questions selected`
                          : "Enabled, but none selected"
                        : "Disabled"}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Response Format
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {responseFormats.find(
                        (f) => f.id === currentConfig.selectedResponseFormatId,
                      )?.name || "None selected"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Configuration Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Configuration</DialogTitle>
            <DialogDescription>
              Save your current AI configuration for future use
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="config-name">Configuration Name</Label>
              <Input
                id="config-name"
                placeholder="e.g., Customer Support Bot"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveConfig}
              disabled={!configName.trim() || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Configuration
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Prompt Dialog */}
      <Dialog open={newPromptDialog} onOpenChange={setNewPromptDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Prompt Template</DialogTitle>
            <DialogDescription>
              Create a custom prompt template for your AI assistant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prompt-name">Prompt Name</Label>
                <Input
                  id="prompt-name"
                  placeholder="e.g., Technical Support Agent"
                  value={newPrompt.name}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompt-category">Category</Label>
                <Select
                  value={newPrompt.category}
                  onValueChange={(value) =>
                    setNewPrompt({ ...newPrompt, category: value })
                  }
                >
                  <SelectTrigger id="prompt-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt-description">Description</Label>
              <Input
                id="prompt-description"
                placeholder="Brief description of what this prompt does"
                value={newPrompt.description}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt-content">Prompt Content</Label>
              <Textarea
                id="prompt-content"
                placeholder="You are a helpful assistant..."
                className="min-h-[200px] font-mono text-sm"
                value={newPrompt.content}
                onChange={(e) =>
                  setNewPrompt({ ...newPrompt, content: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Write the full prompt template. You can use variables like
                {{ context }} that will be replaced with actual content.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPromptDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreatePrompt}
              disabled={
                !newPrompt.name.trim() ||
                !newPrompt.description.trim() ||
                !newPrompt.content.trim()
              }
            >
              Create Prompt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIIntegrationPanel;
