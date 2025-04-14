import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Download,
  Edit,
  Eye,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";

interface ScrapingJob {
  id: string;
  name: string;
  url: string;
  status: "completed" | "in-progress" | "failed" | "scheduled";
  lastRun: Date | null;
  nextRun: Date | null;
  dataCount: number;
}

interface ScrapedData {
  id: string;
  title: string;
  content: string;
  url: string;
  timestamp: Date;
  jobId: string;
}

const WebScrapingPanel = () => {
  const [activeTab, setActiveTab] = useState("jobs-list");
  const [selectedJob, setSelectedJob] = useState<ScrapingJob | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isRunningJob, setIsRunningJob] = useState(false);

  // Mock data for jobs
  const mockJobs: ScrapingJob[] = [
    {
      id: "1",
      name: "Product Documentation",
      url: "https://example.com/docs",
      status: "completed",
      lastRun: new Date(2023, 5, 15),
      nextRun: new Date(2023, 6, 15),
      dataCount: 128,
    },
    {
      id: "2",
      name: "Blog Articles",
      url: "https://example.com/blog",
      status: "in-progress",
      lastRun: new Date(2023, 5, 10),
      nextRun: null,
      dataCount: 45,
    },
    {
      id: "3",
      name: "FAQ Pages",
      url: "https://example.com/faq",
      status: "scheduled",
      lastRun: null,
      nextRun: new Date(2023, 6, 20),
      dataCount: 0,
    },
    {
      id: "4",
      name: "Knowledge Base",
      url: "https://example.com/kb",
      status: "failed",
      lastRun: new Date(2023, 5, 8),
      nextRun: null,
      dataCount: 0,
    },
  ];

  // Mock data for scraped content
  const mockScrapedData: ScrapedData[] = [
    {
      id: "1",
      title: "Getting Started Guide",
      content:
        "This guide will help you get started with our product. Follow these steps to set up your account and configure your first project.",
      url: "https://example.com/docs/getting-started",
      timestamp: new Date(2023, 5, 15),
      jobId: "1",
    },
    {
      id: "2",
      title: "API Documentation",
      content:
        "Our API allows you to integrate our services with your existing systems. This documentation covers all available endpoints and parameters.",
      url: "https://example.com/docs/api",
      timestamp: new Date(2023, 5, 15),
      jobId: "1",
    },
    {
      id: "3",
      title: "How to Optimize Performance",
      content:
        "Learn how to optimize the performance of your applications when using our services. This guide covers caching strategies and best practices.",
      url: "https://example.com/blog/optimize-performance",
      timestamp: new Date(2023, 5, 10),
      jobId: "2",
    },
  ];

  const handleEditJob = (job: ScrapingJob) => {
    setSelectedJob(job);
    setActiveTab("create-edit");
  };

  const handleViewData = (job: ScrapingJob) => {
    setSelectedJob(job);
    setActiveTab("data-review");
  };

  const handleCreateNewJob = () => {
    setSelectedJob(null);
    setActiveTab("create-edit");
  };

  const handleRunJob = () => {
    setIsRunningJob(true);
    // Simulate job running
    setTimeout(() => {
      setIsRunningJob(false);
      // After job completes, show the data review tab
      setActiveTab("data-review");
    }, 2000);
  };

  const getStatusBadge = (status: ScrapingJob["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-500">Scheduled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Web Scraping Management</h1>
        <Button onClick={handleCreateNewJob}>
          <Plus className="mr-2 h-4 w-4" /> Create New Job
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="jobs-list">Jobs List</TabsTrigger>
          <TabsTrigger value="create-edit">
            {selectedJob ? "Edit Job" : "Create Job"}
          </TabsTrigger>
          <TabsTrigger value="data-review">Data Review</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scraping Jobs</CardTitle>
              <CardDescription>
                Manage your web scraping jobs and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Input
                  placeholder="Search jobs..."
                  className="max-w-sm mr-2"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Data Count</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.name}</TableCell>
                      <TableCell className="truncate max-w-xs">
                        {job.url}
                      </TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell>
                        {job.lastRun
                          ? format(job.lastRun, "MMM dd, yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {job.nextRun
                          ? format(job.nextRun, "MMM dd, yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell>{job.dataCount}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditJob(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewData(job)}
                            disabled={job.dataCount === 0}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-edit">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedJob ? "Edit Scraping Job" : "Create New Scraping Job"}
              </CardTitle>
              <CardDescription>
                {selectedJob
                  ? "Modify the configuration for this scraping job"
                  : "Configure a new web scraping job to extract data from websites"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="job-name" className="text-sm font-medium">
                    Job Name
                  </label>
                  <Input
                    id="job-name"
                    placeholder="e.g., Product Documentation"
                    defaultValue={selectedJob?.name || ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="base-url" className="text-sm font-medium">
                    Base URL
                  </label>
                  <Input
                    id="base-url"
                    placeholder="https://example.com/docs"
                    defaultValue={selectedJob?.url || ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="url-patterns" className="text-sm font-medium">
                  URL Patterns to Include (one per line)
                </label>
                <Textarea
                  id="url-patterns"
                  placeholder="/docs/*\n/blog/*\n/faq/*"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="exclude-patterns"
                  className="text-sm font-medium"
                >
                  URL Patterns to Exclude (one per line)
                </label>
                <Textarea
                  id="exclude-patterns"
                  placeholder="/docs/archived/*\n/blog/drafts/*"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scraping Depth</label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select depth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Base URLs only</SelectItem>
                      <SelectItem value="2">
                        2 - Follow one level of links
                      </SelectItem>
                      <SelectItem value="3">
                        3 - Follow two levels of links
                      </SelectItem>
                      <SelectItem value="4">
                        4 - Follow three levels of links
                      </SelectItem>
                      <SelectItem value="5">
                        5 - Deep crawl (use with caution)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Content Extraction
                  </label>
                  <Select defaultValue="main">
                    <SelectTrigger>
                      <SelectValue placeholder="Select content to extract" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main content only</SelectItem>
                      <SelectItem value="full">Full page content</SelectItem>
                      <SelectItem value="custom">
                        Custom CSS selectors
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Schedule</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Select defaultValue="manual">
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">
                          Manual (run on demand)
                        </SelectItem>
                        <SelectItem value="once">One time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex-1">
                    <Select defaultValue="09:00">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                        <SelectItem value="03:00">3:00 AM</SelectItem>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("jobs-list")}
              >
                Cancel
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={handleRunJob}
                  disabled={isRunningJob}
                >
                  {isRunningJob ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Run Now
                    </>
                  )}
                </Button>
                <Button>{selectedJob ? "Update Job" : "Create Job"}</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data-review">
          <Card>
            <CardHeader>
              <CardTitle>Scraped Data Review</CardTitle>
              <CardDescription>
                {selectedJob
                  ? `Reviewing data from "${selectedJob.name}" (${mockScrapedData.filter((d) => d.jobId === selectedJob.id).length} items)`
                  : "Review and export scraped data"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search in content..."
                    className="max-w-sm"
                    prefix={
                      <Search className="h-4 w-4 text-muted-foreground" />
                    }
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      {mockJobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Save as Context
                  </Button>
                  <Select defaultValue="json">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Export format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">Export as JSON</SelectItem>
                      <SelectItem value="csv">Export as CSV</SelectItem>
                      <SelectItem value="txt">Export as Text</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="border rounded-md">
                {mockScrapedData
                  .filter(
                    (data) => !selectedJob || data.jobId === selectedJob.id,
                  )
                  .map((data) => (
                    <div key={data.id} className="border-b p-4 last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-lg">{data.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          {format(data.timestamp, "MMM dd, yyyy")}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        {data.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <a
                          href={data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {data.url}
                        </a>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("jobs-list")}
              >
                Back to Jobs
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                {selectedJob
                  ? mockScrapedData.filter((d) => d.jobId === selectedJob.id)
                      .length
                  : mockScrapedData.length}{" "}
                items
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebScrapingPanel;
