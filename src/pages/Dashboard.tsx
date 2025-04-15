import React from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/dashboard/Sidebar";
import { ROUTES } from "../routes";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  MessageSquare,
  Database,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const location = useLocation();

  // Determine if we're on the main dashboard page
  const isOverview = location.pathname === ROUTES.DASHBOARD;

  const renderContent = () => {
    // Only render dashboard content on the main dashboard page
    if (isOverview) {
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Conversations
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="flex items-center text-xs text-green-600">
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    +12% from last month
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <div className="flex items-center text-xs text-green-600">
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    +5.2% from last month
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Response Time
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2s</div>
                  <div className="flex items-center text-xs text-green-600">
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 7L17 17M17 17V8M17 17H8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    -0.1s from last month
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Data Sources
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Database className="h-4 w-4 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center text-xs text-green-600">
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    +2 from last month
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Usage Overview</CardTitle>
                      <CardDescription>
                        Chat interactions over the past 30 days
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        Daily
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        Weekly
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        Monthly
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-start p-4">
                      <div className="w-full h-[180px] flex items-end space-x-2">
                        {[
                          35, 45, 30, 65, 40, 80, 60, 75, 65, 85, 90, 75, 70,
                          65, 80, 95, 85, 90, 75, 85, 65, 75, 85, 90, 85, 80,
                          90, 70, 80, 65,
                        ].map((height, i) => (
                          <div
                            key={i}
                            className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Model Performance</CardTitle>
                      <CardDescription>
                        Response quality by model
                      </CardDescription>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      Live Data
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-center p-6 space-y-4">
                      {[
                        { name: "GPT-4", score: 92, color: "bg-emerald-500" },
                        { name: "Claude 3", score: 88, color: "bg-green-500" },
                        { name: "Llama 3", score: 82, color: "bg-teal-500" },
                        {
                          name: "Custom Model",
                          score: 76,
                          color: "bg-cyan-500",
                        },
                      ].map((model, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span>{model.name}</span>
                            <span className="font-semibold">
                              {model.score}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${model.color} rounded-full`}
                              style={{ width: `${model.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Query Categories</CardTitle>
                  <CardDescription>
                    Distribution of user queries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px] w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[180px] h-[180px] rounded-full">
                        <div
                          className="absolute inset-0 rounded-full border-8 border-purple-500"
                          style={{
                            clipPath:
                              "polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 50%)",
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full border-8 border-pink-500"
                          style={{
                            clipPath:
                              "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full border-8 border-indigo-500"
                          style={{
                            clipPath:
                              "polygon(50% 50%, 50% 100%, 0 100%, 0 50%)",
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center">
                            <Sparkles className="h-8 w-8 text-purple-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 w-full flex justify-around text-xs font-medium">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>{" "}
                        Product (40%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>{" "}
                        Support (35%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>{" "}
                        General (25%)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>Latest system events</CardDescription>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      Live Feed
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        time: "2 minutes ago",
                        event: "New scraping job completed",
                        status: "success",
                        icon: <Database className="h-4 w-4" />,
                      },
                      {
                        time: "1 hour ago",
                        event: "AI model configuration updated",
                        status: "info",
                        icon: <Sparkles className="h-4 w-4" />,
                      },
                      {
                        time: "3 hours ago",
                        event: "New prompt template created",
                        status: "info",
                        icon: <MessageSquare className="h-4 w-4" />,
                      },
                      {
                        time: "1 day ago",
                        event: "System maintenance performed",
                        status: "warning",
                        icon: <Activity className="h-4 w-4" />,
                      },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                            activity.status === "success"
                              ? "bg-green-100 text-green-600"
                              : activity.status === "warning"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.event}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          View
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard Overview
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
