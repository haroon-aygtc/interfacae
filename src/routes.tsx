import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AIModelConfig from "./components/dashboard/AIModelConfig";
import AIIntegrationPanel from "./components/dashboard/AIIntegrationPanel";
import ContextRulesPanel from "./components/dashboard/ContextRulesPanel";
import PromptTemplatesPanel from "./components/dashboard/PromptTemplatesPanel";
import AnalyticsPanel from "./components/dashboard/AnalyticsPanel";
import WebScrapingPanel from "./components/dashboard/WebScrapingPanel";
import IntegrationPanel from "./components/dashboard/IntegrationPanel";
import SystemConfigPanel from "./components/dashboard/SystemConfigPanel";
import KnowledgeBasePanel from "./components/dashboard/KnowledgeBasePanel";
import UserManagementPanel from "./components/dashboard/UserManagementPanel";
import Home from "./components/landgingpage/home";
import DashboardLayout from "./components/layouts/DashboardLayout";
import SelectorGroupManager from "./components/dashboard/SelectorGroupManager";
import ChatWidgetTestPage from "./components/dashboard/ChatWidgetTestPage";
import AIInsightsPanel from "./components/dashboard/AIInsightsPanel";

// Define route paths as constants for easy reference
export const ROUTES = {
  // Main routes
  HOME: "/",
  DASHBOARD: "/dashboard",

  // AI Models routes
  AI_MODELS: "/dashboard/ai-models",
  AI_MODELS_GENERAL: "/dashboard/ai-models/general",
  AI_MODELS_ADVANCED: "/dashboard/ai-models/advanced",
  AI_MODELS_TESTING: "/dashboard/ai-models/testing",

  // AI Integration routes
  AI_INTEGRATION: "/dashboard/ai-integration",
  AI_INTEGRATION_CONFIG: "/dashboard/ai-integration/configuration",
  AI_INTEGRATION_TEST: "/dashboard/ai-integration/test",

  // Context Rules routes
  CONTEXT_RULES: "/dashboard/context-rules",
  CONTEXT_RULES_LIST: "/dashboard/context-rules/list",
  CONTEXT_RULES_CREATE: "/dashboard/context-rules/create",
  CONTEXT_RULES_EDIT: "/dashboard/context-rules/edit",
  CONTEXT_RULES_TEST: "/dashboard/context-rules/test",

  // Prompt Templates routes
  PROMPT_TEMPLATES: "/dashboard/prompt-templates",
  PROMPT_TEMPLATES_LIST: "/dashboard/prompt-templates/list",
  PROMPT_TEMPLATES_CREATE: "/dashboard/prompt-templates/create",
  PROMPT_TEMPLATES_EDIT: "/dashboard/prompt-templates/edit",
  PROMPT_TEMPLATES_TEST: "/dashboard/prompt-templates/test",

  // Analytics routes
  ANALYTICS: "/dashboard/analytics",
  ANALYTICS_OVERVIEW: "/dashboard/analytics/overview",
  ANALYTICS_ENGAGEMENT: "/dashboard/analytics/engagement",
  ANALYTICS_PERFORMANCE: "/dashboard/analytics/performance",
  ANALYTICS_CONTENT: "/dashboard/analytics/content",

  // Web Scraping routes
  WEB_SCRAPING: "/dashboard/web-scraping",
  WEB_SCRAPING_JOBS: "/dashboard/web-scraping/jobs",
  WEB_SCRAPING_CREATE: "/dashboard/web-scraping/create",
  WEB_SCRAPING_EDIT: "/dashboard/web-scraping/edit",
  WEB_SCRAPING_PREVIEW: "/dashboard/web-scraping/preview",
  WEB_SCRAPING_SELECTORS: "/dashboard/web-scraping/selectors",
  WEB_SCRAPING_DATA: "/dashboard/web-scraping/data",
  WEB_SCRAPING_SETTINGS: "/dashboard/web-scraping/settings",
  SELECTOR_GROUPS: "/dashboard/web-scraping/selector-groups",

  // Integration routes
  INTEGRATION: "/dashboard/integration",
  INTEGRATION_WIDGET: "/dashboard/integration/widget",
  INTEGRATION_CODE: "/dashboard/integration/code",
  INTEGRATION_ADVANCED: "/dashboard/integration/advanced",
  CHAT_WIDGET_TEST: "/dashboard/chat-widget-test",
  AI_INSIGHTS: "/dashboard/ai-insights",

  // System Config routes
  SYSTEM_CONFIG: "/dashboard/system-config",
  SYSTEM_CONFIG_AUTH: "/dashboard/system-config/authentication",
  SYSTEM_CONFIG_API: "/dashboard/system-config/api-connections",
  SYSTEM_CONFIG_SESSIONS: "/dashboard/system-config/sessions",
  SYSTEM_CONFIG_STORAGE: "/dashboard/system-config/storage",

  // Knowledge Base routes
  KNOWLEDGE_BASE: "/dashboard/knowledge-base",
  KNOWLEDGE_BASE_ITEMS: "/dashboard/knowledge-base/items",
  KNOWLEDGE_BASE_CATEGORIES: "/dashboard/knowledge-base/categories",
  KNOWLEDGE_BASE_CREATE: "/dashboard/knowledge-base/create",
  KNOWLEDGE_BASE_EDIT: "/dashboard/knowledge-base/edit",
  KNOWLEDGE_BASE_IMPORT: "/dashboard/knowledge-base/import-export",

  // User Management routes
  USER_MANAGEMENT: "/dashboard/user-management",
  USER_MANAGEMENT_USERS: "/dashboard/user-management/users",
  USER_MANAGEMENT_ROLES: "/dashboard/user-management/roles",
  USER_MANAGEMENT_ADD_USER: "/dashboard/user-management/add-user",
  USER_MANAGEMENT_EDIT_USER: "/dashboard/user-management/edit-user",
  USER_MANAGEMENT_ADD_ROLE: "/dashboard/user-management/add-role",
  USER_MANAGEMENT_EDIT_ROLE: "/dashboard/user-management/edit-role",

  // Redirects - Main sections
  ADMIN: "/admin",
  MODELS: "/models",
  CONFIG: "/config",
  RULES: "/rules",
  TEMPLATES: "/templates",
  STATS: "/stats",
  SCRAPING: "/scraping",
  INTEGRATE: "/integrate",
  SETTINGS: "/settings",
  USERS: "/users",
  KNOWLEDGE: "/knowledge",

  // Redirects - Specific tabs
  ANALYTICS_STATS: "/analytics/stats",
  ANALYTICS_USERS: "/analytics/users",
  ANALYTICS_METRICS: "/analytics/metrics",
  ANALYTICS_REPORTS: "/analytics/reports",

  MODEL_SETTINGS: "/model-settings",
  MODEL_ADVANCED: "/model-advanced",
  MODEL_TEST: "/model-test",

  INTEGRATION_SETUP: "/integration-setup",
  INTEGRATION_EMBED: "/integration-embed",

  RULES_LIST: "/rules-list",
  RULES_CREATE: "/rules-create",
  RULES_TEST: "/rules-test",

  TEMPLATES_LIST: "/templates-list",
  TEMPLATES_CREATE: "/templates-create",
  TEMPLATES_TEST: "/templates-test",

  SCRAPING_JOBS: "/scraping-jobs",
  SCRAPING_CREATE: "/scraping-create",
  SCRAPING_PREVIEW: "/scraping-preview",
  SCRAPING_SELECTORS: "/scraping-selectors",

  SYSTEM_AUTH: "/system-auth",
  SYSTEM_API: "/system-api",
  SYSTEM_STORAGE: "/system-storage",
};

// Define the routes configuration
const routes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.AI_MODELS,
    element: <DashboardLayout title="AI Model Configuration"><AIModelConfig /></DashboardLayout>,
  },
  {
    path: ROUTES.AI_INTEGRATION,
    element: <DashboardLayout title="AI Integration"><AIIntegrationPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.CONTEXT_RULES,
    element: <DashboardLayout title="Context Rules Management"><ContextRulesPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.PROMPT_TEMPLATES,
    element: <DashboardLayout title="Prompt Templates"><PromptTemplatesPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.ANALYTICS,
    element: <DashboardLayout title="Analytics Dashboard"><AnalyticsPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING,
    element: <DashboardLayout title="Web Scraping Management"><WebScrapingPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.INTEGRATION,
    element: <DashboardLayout title="Integration Settings"><IntegrationPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.SYSTEM_CONFIG,
    element: <DashboardLayout title="System Configuration"><SystemConfigPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.KNOWLEDGE_BASE,
    element: <DashboardLayout title="Knowledge Base Management"><KnowledgeBasePanel /></DashboardLayout>,
  },
  {
    path: ROUTES.USER_MANAGEMENT,
    element: <DashboardLayout title="User Management"><UserManagementPanel /></DashboardLayout>,
  },

  // Analytics sub-routes
  {
    path: ROUTES.ANALYTICS_OVERVIEW,
    element: <DashboardLayout title="Analytics Overview"><AnalyticsPanel defaultTab="overview" /></DashboardLayout>,
  },
  {
    path: ROUTES.ANALYTICS_ENGAGEMENT,
    element: <DashboardLayout title="Engagement Analytics"><AnalyticsPanel defaultTab="engagement" /></DashboardLayout>,
  },
  {
    path: ROUTES.ANALYTICS_PERFORMANCE,
    element: <DashboardLayout title="Performance Analytics"><AnalyticsPanel defaultTab="performance" /></DashboardLayout>,
  },
  {
    path: ROUTES.ANALYTICS_CONTENT,
    element: <DashboardLayout title="Content Analytics"><AnalyticsPanel defaultTab="content" /></DashboardLayout>,
  },

  // AI Models sub-routes
  {
    path: ROUTES.AI_MODELS_GENERAL,
    element: <DashboardLayout title="AI Model General Settings"><AIModelConfig defaultTab="general" /></DashboardLayout>,
  },
  {
    path: ROUTES.AI_MODELS_ADVANCED,
    element: <DashboardLayout title="AI Model Advanced Settings"><AIModelConfig defaultTab="advanced" /></DashboardLayout>,
  },
  {
    path: ROUTES.AI_MODELS_TESTING,
    element: <DashboardLayout title="AI Model Testing"><AIModelConfig defaultTab="testing" /></DashboardLayout>,
  },

  // AI Integration sub-routes
  {
    path: ROUTES.AI_INTEGRATION_CONFIG,
    element: <DashboardLayout title="AI Integration Configuration"><AIIntegrationPanel defaultTab="configuration" /></DashboardLayout>,
  },
  {
    path: ROUTES.AI_INTEGRATION_TEST,
    element: <DashboardLayout title="AI Integration Testing"><AIIntegrationPanel defaultTab="test" /></DashboardLayout>,
  },

  // Context Rules sub-routes
  {
    path: ROUTES.CONTEXT_RULES_LIST,
    element: <DashboardLayout title="Context Rules List"><ContextRulesPanel defaultTab="rules-list" /></DashboardLayout>,
  },
  {
    path: ROUTES.CONTEXT_RULES_CREATE,
    element: <DashboardLayout title="Create Context Rule"><ContextRulesPanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.CONTEXT_RULES_EDIT,
    element: <DashboardLayout title="Edit Context Rule"><ContextRulesPanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.CONTEXT_RULES_TEST,
    element: <DashboardLayout title="Test Context Rules"><ContextRulesPanel defaultTab="test-rules" /></DashboardLayout>,
  },

  // Prompt Templates sub-routes
  {
    path: ROUTES.PROMPT_TEMPLATES_LIST,
    element: <DashboardLayout title="Prompt Templates Library"><PromptTemplatesPanel defaultTab="templates-list" /></DashboardLayout>,
  },
  {
    path: ROUTES.PROMPT_TEMPLATES_CREATE,
    element: <DashboardLayout title="Create Prompt Template"><PromptTemplatesPanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.PROMPT_TEMPLATES_EDIT,
    element: <DashboardLayout title="Edit Prompt Template"><PromptTemplatesPanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.PROMPT_TEMPLATES_TEST,
    element: <DashboardLayout title="Test Prompt Template"><PromptTemplatesPanel defaultTab="test-template" /></DashboardLayout>,
  },

  // Web Scraping sub-routes
  {
    path: ROUTES.WEB_SCRAPING_JOBS,
    element: <DashboardLayout title="Web Scraping Jobs"><WebScrapingPanel defaultTab="jobs-list" /></DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING_CREATE,
    element: <DashboardLayout title="Create Scraping Job"><WebScrapingPanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING_EDIT,
    element: <DashboardLayout title="Edit Scraping Job"><WebScrapingPanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING_PREVIEW,
    element: <DashboardLayout title="Live Scraping Preview"><WebScrapingPanel defaultTab="live-preview" /></DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING_SELECTORS,
    element: <DashboardLayout title="Selector Groups"><WebScrapingPanel defaultTab="selector-groups" /></DashboardLayout>,
  },
  {
    path: ROUTES.SELECTOR_GROUPS,
    element: <DashboardLayout title="Selector Groups">
      <SelectorGroupManager
        selectorGroups={[]}
        onCreateGroup={() => {}}
        onUpdateGroup={() => {}}
        onDeleteGroup={() => {}}
        onCreateSelector={() => {}}
        onUpdateSelector={() => {}}
        onDeleteSelector={() => {}}
      />
    </DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING_DATA,
    element: <DashboardLayout title="Scraped Data Review"><WebScrapingPanel defaultTab="data-review" /></DashboardLayout>,
  },
  {
    path: ROUTES.WEB_SCRAPING_SETTINGS,
    element: <DashboardLayout title="Web Scraping Settings"><WebScrapingPanel defaultTab="settings" /></DashboardLayout>,
  },

  // Integration sub-routes
  {
    path: ROUTES.CHAT_WIDGET_TEST,
    element: <DashboardLayout title="Chat Widget Test"><ChatWidgetTestPage /></DashboardLayout>,
  },
  {
    path: ROUTES.AI_INSIGHTS,
    element: <DashboardLayout title="AI Insights"><AIInsightsPanel /></DashboardLayout>,
  },
  {
    path: ROUTES.INTEGRATION_WIDGET,
    element: <DashboardLayout title="Widget Configuration"><IntegrationPanel defaultTab="widget" /></DashboardLayout>,
  },
  {
    path: ROUTES.INTEGRATION_CODE,
    element: <DashboardLayout title="Integration Code"><IntegrationPanel defaultTab="code" /></DashboardLayout>,
  },
  {
    path: ROUTES.INTEGRATION_ADVANCED,
    element: <DashboardLayout title="Advanced Integration Settings"><IntegrationPanel defaultTab="advanced" /></DashboardLayout>,
  },

  // System Config sub-routes
  {
    path: ROUTES.SYSTEM_CONFIG_AUTH,
    element: <DashboardLayout title="Authentication Settings"><SystemConfigPanel defaultTab="authentication" /></DashboardLayout>,
  },
  {
    path: ROUTES.SYSTEM_CONFIG_API,
    element: <DashboardLayout title="API Connections"><SystemConfigPanel defaultTab="api-connections" /></DashboardLayout>,
  },
  {
    path: ROUTES.SYSTEM_CONFIG_SESSIONS,
    element: <DashboardLayout title="Session Management"><SystemConfigPanel defaultTab="sessions" /></DashboardLayout>,
  },
  {
    path: ROUTES.SYSTEM_CONFIG_STORAGE,
    element: <DashboardLayout title="Storage Settings"><SystemConfigPanel defaultTab="storage" /></DashboardLayout>,
  },

  // Knowledge Base sub-routes
  {
    path: ROUTES.KNOWLEDGE_BASE_ITEMS,
    element: <DashboardLayout title="Knowledge Base Items"><KnowledgeBasePanel defaultTab="items" /></DashboardLayout>,
  },
  {
    path: ROUTES.KNOWLEDGE_BASE_CATEGORIES,
    element: <DashboardLayout title="Knowledge Base Categories"><KnowledgeBasePanel defaultTab="categories" /></DashboardLayout>,
  },
  {
    path: ROUTES.KNOWLEDGE_BASE_CREATE,
    element: <DashboardLayout title="Create Knowledge Item"><KnowledgeBasePanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.KNOWLEDGE_BASE_EDIT,
    element: <DashboardLayout title="Edit Knowledge Item"><KnowledgeBasePanel defaultTab="create-edit" /></DashboardLayout>,
  },
  {
    path: ROUTES.KNOWLEDGE_BASE_IMPORT,
    element: <DashboardLayout title="Import/Export Knowledge Base"><KnowledgeBasePanel defaultTab="import-export" /></DashboardLayout>,
  },

  // User Management sub-routes
  {
    path: ROUTES.USER_MANAGEMENT_USERS,
    element: <DashboardLayout title="User List"><UserManagementPanel defaultTab="users" /></DashboardLayout>,
  },
  {
    path: ROUTES.USER_MANAGEMENT_ROLES,
    element: <DashboardLayout title="Roles & Permissions"><UserManagementPanel defaultTab="roles" /></DashboardLayout>,
  },
  {
    path: ROUTES.USER_MANAGEMENT_ADD_USER,
    element: <DashboardLayout title="Add User"><UserManagementPanel defaultTab="edit-user" /></DashboardLayout>,
  },
  {
    path: ROUTES.USER_MANAGEMENT_EDIT_USER,
    element: <DashboardLayout title="Edit User"><UserManagementPanel defaultTab="edit-user" /></DashboardLayout>,
  },
  {
    path: ROUTES.USER_MANAGEMENT_ADD_ROLE,
    element: <DashboardLayout title="Add Role"><UserManagementPanel defaultTab="edit-role" /></DashboardLayout>,
  },
  {
    path: ROUTES.USER_MANAGEMENT_EDIT_ROLE,
    element: <DashboardLayout title="Edit Role"><UserManagementPanel defaultTab="edit-role" /></DashboardLayout>,
  },

  // Main section redirects
  {
    path: ROUTES.ADMIN,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.MODELS,
    element: <Navigate to={ROUTES.AI_MODELS} replace />,
  },
  {
    path: ROUTES.CONFIG,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG} replace />,
  },
  {
    path: ROUTES.RULES,
    element: <Navigate to={ROUTES.CONTEXT_RULES} replace />,
  },
  {
    path: ROUTES.TEMPLATES,
    element: <Navigate to={ROUTES.PROMPT_TEMPLATES} replace />,
  },
  {
    path: ROUTES.STATS,
    element: <Navigate to={ROUTES.ANALYTICS} replace />,
  },
  {
    path: ROUTES.SCRAPING,
    element: <Navigate to={ROUTES.WEB_SCRAPING} replace />,
  },
  {
    path: ROUTES.INTEGRATE,
    element: <Navigate to={ROUTES.INTEGRATION} replace />,
  },
  {
    path: ROUTES.SETTINGS,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG} replace />,
  },
  {
    path: ROUTES.USERS,
    element: <Navigate to={ROUTES.USER_MANAGEMENT} replace />,
  },
  {
    path: ROUTES.KNOWLEDGE,
    element: <Navigate to={ROUTES.KNOWLEDGE_BASE} replace />,
  },

  // Specific tab redirects
  {
    path: ROUTES.ANALYTICS_STATS,
    element: <Navigate to={ROUTES.ANALYTICS_OVERVIEW} replace />,
  },
  {
    path: ROUTES.ANALYTICS_USERS,
    element: <Navigate to={ROUTES.ANALYTICS_ENGAGEMENT} replace />,
  },
  {
    path: ROUTES.ANALYTICS_METRICS,
    element: <Navigate to={ROUTES.ANALYTICS_PERFORMANCE} replace />,
  },
  {
    path: ROUTES.ANALYTICS_REPORTS,
    element: <Navigate to={ROUTES.ANALYTICS_CONTENT} replace />,
  },
  {
    path: ROUTES.MODEL_SETTINGS,
    element: <Navigate to={ROUTES.AI_MODELS_GENERAL} replace />,
  },
  {
    path: ROUTES.MODEL_ADVANCED,
    element: <Navigate to={ROUTES.AI_MODELS_ADVANCED} replace />,
  },
  {
    path: ROUTES.MODEL_TEST,
    element: <Navigate to={ROUTES.AI_MODELS_TESTING} replace />,
  },
  {
    path: ROUTES.INTEGRATION_SETUP,
    element: <Navigate to={ROUTES.INTEGRATION_WIDGET} replace />,
  },
  {
    path: ROUTES.INTEGRATION_EMBED,
    element: <Navigate to={ROUTES.INTEGRATION_CODE} replace />,
  },
  {
    path: ROUTES.RULES_LIST,
    element: <Navigate to={ROUTES.CONTEXT_RULES_LIST} replace />,
  },
  {
    path: ROUTES.RULES_CREATE,
    element: <Navigate to={ROUTES.CONTEXT_RULES_CREATE} replace />,
  },
  {
    path: ROUTES.RULES_TEST,
    element: <Navigate to={ROUTES.CONTEXT_RULES_TEST} replace />,
  },
  {
    path: ROUTES.TEMPLATES_LIST,
    element: <Navigate to={ROUTES.PROMPT_TEMPLATES_LIST} replace />,
  },
  {
    path: ROUTES.TEMPLATES_CREATE,
    element: <Navigate to={ROUTES.PROMPT_TEMPLATES_CREATE} replace />,
  },
  {
    path: ROUTES.TEMPLATES_TEST,
    element: <Navigate to={ROUTES.PROMPT_TEMPLATES_TEST} replace />,
  },
  {
    path: ROUTES.SCRAPING_JOBS,
    element: <Navigate to={ROUTES.WEB_SCRAPING_JOBS} replace />,
  },
  {
    path: ROUTES.SCRAPING_CREATE,
    element: <Navigate to={ROUTES.WEB_SCRAPING_CREATE} replace />,
  },
  {
    path: ROUTES.SCRAPING_PREVIEW,
    element: <Navigate to={ROUTES.WEB_SCRAPING_PREVIEW} replace />,
  },
  {
    path: ROUTES.SCRAPING_SELECTORS,
    element: <Navigate to={ROUTES.SELECTOR_GROUPS} replace />,
  },
  {
    path: ROUTES.SYSTEM_AUTH,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG_AUTH} replace />,
  },
  {
    path: ROUTES.SYSTEM_API,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG_API} replace />,
  },
  {
    path: ROUTES.SYSTEM_STORAGE,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG_STORAGE} replace />,
  },

  // Catch-all redirect to dashboard
  {
    path: "*",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
];

export default routes;
