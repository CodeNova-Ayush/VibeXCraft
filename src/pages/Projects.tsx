import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  GitFork,
  Eye,
  Plus,
  Github,
  FolderOpen,
  Code,
  Upload,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Archive,
  Globe,
  Share2,
  FileCode,
  Loader2,
  X,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

interface Project {
  id: string;
  name: string;
  description: string;
  lang: string;
  stars: number;
  forks: number;
  views: number;
  githubLink?: string;
  status: "synced" | "in-progress" | "needs-review" | "archived";
  source: "github" | "local" | "replit" | "created";
  lastUpdated: string;
  collaborators?: Array<{ name: string; avatar: string }>;
}

const PROJECTS_STORAGE_KEY = "user_projects";

export default function Projects() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  
  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("updated");
  const [visibleProjectsCount, setVisibleProjectsCount] = useState<number>(6);
  
  // Dialog states
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isForkDialogOpen, setIsForkDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  
  // Import states
  const [importSource, setImportSource] = useState<"github" | "local" | "replit">("github");
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [replitUrl, setReplitUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  
  // Fork states
  const [forkSearchQuery, setForkSearchQuery] = useState("");
  const [forkResults, setForkResults] = useState<any[]>([]);
  const [isSearchingFork, setIsSearchingFork] = useState(false);
  const [isForking, setIsForking] = useState(false);
  
  // Post states
  const [selectedProjectToPost, setSelectedProjectToPost] = useState<Project | null>(null);
  const [postDescription, setPostDescription] = useState("");
  const [postTags, setPostTags] = useState<string[]>([]);
  
  // Default projects (12 total)
  const getDefaultProjects = (): Project[] => [
            {
              id: "1",
              name: "VibeXCraft-UI",
              description: "Modern UI components library built with React and TypeScript",
              lang: "React",
              stars: 42,
              forks: 12,
              views: 234,
              githubLink: "https://github.com/jharajiv16/VibeXCraft",
              status: "synced",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "2",
              name: "AI-Data-Processor",
              description: "Advanced AI-powered data processing pipeline",
              lang: "Python",
              stars: 89,
              forks: 23,
              views: 567,
              githubLink: "https://github.com/jharajiv16/AI-Data-Processor",
              status: "in-progress",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "3",
              name: "QuantumLeap-API",
              description: "High-performance API server with quantum computing features",
              lang: "Go",
              stars: 67,
              forks: 19,
              views: 445,
              githubLink: "https://github.com/jharajiv16/QuantumLeap-API",
              status: "needs-review",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "4",
              name: "Project-Nebula",
              description: "Cloud-based project management system",
              lang: "TypeScript",
              stars: 123,
              forks: 34,
              views: 678,
              githubLink: "https://github.com/jharajiv16/Project-Nebula",
              status: "synced",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "5",
              name: "Code-Analyzer-Bot",
              description: "Automated code analysis and quality checker",
              lang: "Python",
              stars: 34,
              forks: 8,
              views: 198,
              githubLink: "https://github.com/jharajiv16/Code-Analyzer-Bot",
              status: "archived",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "6",
              name: "React-Native-Mobile-App",
              description: "Cross-platform mobile application with React Native and Expo",
              lang: "React Native",
              stars: 156,
              forks: 42,
              views: 892,
              githubLink: "https://github.com/jharajiv16/React-Native-Mobile-App",
              status: "synced",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "7",
              name: "Blockchain-Wallet",
              description: "Secure cryptocurrency wallet with multi-chain support",
              lang: "TypeScript",
              stars: 234,
              forks: 56,
              views: 1234,
              githubLink: "https://github.com/jharajiv16/Blockchain-Wallet",
              status: "in-progress",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "8",
              name: "Machine-Learning-Dashboard",
              description: "Interactive dashboard for ML model training and visualization",
              lang: "Python",
              stars: 178,
              forks: 31,
              views: 756,
              githubLink: "https://github.com/jharajiv16/Machine-Learning-Dashboard",
              status: "synced",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "9",
              name: "E-Commerce-Platform",
              description: "Full-stack e-commerce solution with payment integration",
              lang: "Next.js",
              stars: 267,
              forks: 78,
              views: 1456,
              githubLink: "https://github.com/jharajiv16/E-Commerce-Platform",
              status: "needs-review",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "10",
              name: "Real-Time-Chat-App",
              description: "WebSocket-based real-time chat application with rooms",
              lang: "Node.js",
              stars: 145,
              forks: 38,
              views: 623,
              githubLink: "https://github.com/jharajiv16/Real-Time-Chat-App",
              status: "synced",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "11",
              name: "DevOps-Automation",
              description: "CI/CD pipeline automation with Docker and Kubernetes",
              lang: "YAML",
              stars: 98,
              forks: 25,
              views: 412,
              githubLink: "https://github.com/jharajiv16/DevOps-Automation",
              status: "in-progress",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "12",
              name: "Data-Visualization-Tool",
              description: "Advanced data visualization library with D3.js integration",
              lang: "JavaScript",
              stars: 201,
              forks: 49,
              views: 987,
              githubLink: "https://github.com/jharajiv16/Data-Visualization-Tool",
              status: "synced",
              source: "github",
              lastUpdated: new Date().toISOString(),
            },
  ];

  // Load projects from localStorage
  useEffect(() => {
    const loadProjects = () => {
      try {
        const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
        const defaultProjects = getDefaultProjects();
        
        if (stored) {
          const parsedProjects = JSON.parse(stored);
          // Always ensure the 12 default projects are included
          // Merge: keep defaults and add any additional projects from storage that don't conflict
          const defaultIds = new Set(defaultProjects.map(p => p.id));
          const additionalProjects = parsedProjects.filter((p: Project) => !defaultIds.has(p.id));
          const mergedProjects = [...defaultProjects, ...additionalProjects];
          
          // Update if we have new defaults or additional projects
          if (mergedProjects.length !== parsedProjects.length || 
              !defaultProjects.every(dp => parsedProjects.some((p: Project) => p.id === dp.id && p.name === dp.name))) {
            setProjects(mergedProjects);
            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(mergedProjects));
          } else {
            setProjects(parsedProjects);
          }
        } else {
          // Initialize with default 12 projects
          setProjects(defaultProjects);
          localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(defaultProjects));
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        // On error, use defaults
        const defaultProjects = getDefaultProjects();
        setProjects(defaultProjects);
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(defaultProjects));
      }
    };
    
    loadProjects();
  }, []);
  
  // Save projects to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(newProjects));
  };
  
  // Get status badge
  const getStatusBadge = (status: Project["status"]) => {
    const badges = {
      synced: { label: "Synced", className: "bg-green-500/20 text-green-500 border-green-500/30" },
      "in-progress": { label: "In Progress", className: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
      "needs-review": { label: "Needs Review", className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
      archived: { label: "Archived", className: "bg-gray-500/20 text-gray-500 border-gray-500/30" },
    };
    return badges[status];
  };
  
  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource = filterSource === "all" || project.source === filterSource;
      const matchesLanguage = filterLanguage === "all" || project.lang.toLowerCase() === filterLanguage.toLowerCase();
      const matchesStatus = filterStatus === "all" || project.status === filterStatus;
      return matchesSearch && matchesSource && matchesLanguage && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "updated":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "stars":
          return b.stars - a.stars;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  
  // Import from GitHub
  const handleImportFromGitHub = async () => {
    if (!githubRepoUrl.trim()) {
      toast({
        title: "Repository URL required",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    try {
      // Extract owner and repo from URL
      const urlMatch = githubRepoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!urlMatch) {
        throw new Error("Invalid GitHub repository URL");
      }
      
      const [, owner, repo] = urlMatch;
      const token = localStorage.getItem('github_token') || import.meta.env.VITE_GITHUB_TOKEN;
      
      // Fetch repository details
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: token ? {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        } : {
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch repository');
      }
      
      const repoData = await response.json();
      
      // Create new project
      const newProject: Project = {
        id: Date.now().toString(),
        name: repoData.name,
        description: repoData.description || "",
        lang: repoData.language || "Other",
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        views: repoData.watchers_count || 0,
        githubLink: repoData.html_url,
        status: "synced",
        source: "github",
        lastUpdated: new Date().toISOString(),
      };
      
      saveProjects([...projects, newProject]);
      
      toast({
        title: "Project imported",
        description: `Successfully imported ${repoData.name} from GitHub`,
      });
      
      setIsImportDialogOpen(false);
      setGithubRepoUrl("");
    } catch (error) {
      console.error("Error importing from GitHub:", error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import repository from GitHub",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Import from local file
  const handleImportFromLocal = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    try {
      // Read file as text (assuming it's a project config file)
      const text = await file.text();
      
      // Create project from file
      const newProject: Project = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        description: `Imported from local file: ${file.name}`,
        lang: "Other",
        status: "synced",
        source: "local",
        stars: 0,
        forks: 0,
        views: 0,
        lastUpdated: new Date().toISOString(),
      };
      
      saveProjects([...projects, newProject]);
      
      toast({
        title: "Project imported",
        description: `Successfully imported ${file.name}`,
      });
    } catch (error) {
      console.error("Error importing from local:", error);
      toast({
        title: "Import failed",
        description: "Failed to import project from local file",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Import from Replit
  const handleImportFromReplit = async () => {
    if (!replitUrl.trim()) {
      toast({
        title: "Replit URL required",
        description: "Please enter a Replit project URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    try {
      // Extract project name from Replit URL
      const urlMatch = replitUrl.match(/replit\.com\/@([^\/]+)\/([^\/]+)/);
      const projectName = urlMatch ? urlMatch[2] : "Replit Project";
      
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName,
        description: `Imported from Replit: ${replitUrl}`,
        lang: "Other",
        status: "synced",
        source: "replit",
        stars: 0,
        forks: 0,
        views: 0,
        lastUpdated: new Date().toISOString(),
      };
      
      saveProjects([...projects, newProject]);
      
      toast({
        title: "Project imported",
        description: `Successfully imported ${projectName} from Replit`,
      });
      
      setIsImportDialogOpen(false);
      setReplitUrl("");
    } catch (error) {
      console.error("Error importing from Replit:", error);
      toast({
        title: "Import failed",
        description: "Failed to import project from Replit",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Search GitHub repositories for forking
  const handleSearchForkRepos = async () => {
    if (!forkSearchQuery.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a repository name to search",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearchingFork(true);
    try {
      const token = localStorage.getItem('github_token') || import.meta.env.VITE_GITHUB_TOKEN;
      
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(forkSearchQuery)}&sort=stars&order=desc&per_page=10`,
        {
          headers: token ? {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          } : {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to search repositories');
      }
      
      const data = await response.json();
      setForkResults(data.items || []);
    } catch (error) {
      console.error("Error searching repositories:", error);
      toast({
        title: "Search failed",
        description: "Failed to search GitHub repositories",
        variant: "destructive",
      });
    } finally {
      setIsSearchingFork(false);
    }
  };
  
  // Fork repository
  const handleForkRepository = async (repo: any) => {
    setIsForking(true);
    try {
      const token = localStorage.getItem('github_token') || import.meta.env.VITE_GITHUB_TOKEN;
      
      if (!token) {
        toast({
          title: "GitHub token required",
          description: "Please connect your GitHub account first",
          variant: "destructive",
        });
        setIsForking(false);
        return;
      }
      
      // Fork the repository
      const forkResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/forks`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      if (!forkResponse.ok) {
        const errorData = await forkResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fork repository');
      }
      
      const forkedRepo = await forkResponse.json();
      
      // Add forked project to projects list
      const newProject: Project = {
        id: Date.now().toString(),
        name: forkedRepo.name,
        description: forkedRepo.description || "",
        lang: forkedRepo.language || "Other",
        stars: forkedRepo.stargazers_count || 0,
        forks: forkedRepo.forks_count || 0,
        views: forkedRepo.watchers_count || 0,
        githubLink: forkedRepo.html_url,
        status: "synced",
        source: "github",
        lastUpdated: new Date().toISOString(),
      };
      
      saveProjects([...projects, newProject]);
      
      toast({
        title: "Repository forked",
        description: `Successfully forked ${repo.name} to your account`,
      });
      
      setIsForkDialogOpen(false);
      setForkSearchQuery("");
      setForkResults([]);
    } catch (error) {
      console.error("Error forking repository:", error);
      toast({
        title: "Fork failed",
        description: error instanceof Error ? error.message : "Failed to fork repository",
        variant: "destructive",
      });
    } finally {
      setIsForking(false);
    }
  };
  
  // Post project to community
  const handlePostProject = () => {
    if (!selectedProjectToPost) {
      toast({
        title: "Project required",
        description: "Please select a project to post",
        variant: "destructive",
      });
      return;
    }
    
    // Save post to localStorage (in production, this would go to a backend/API)
    const posts = JSON.parse(localStorage.getItem('community_posts') || '[]');
    const newPost = {
      id: Date.now().toString(),
      user: user?.fullName || user?.username || "Anonymous",
      project: selectedProjectToPost.name,
      lang: selectedProjectToPost.lang,
      desc: postDescription || selectedProjectToPost.description,
      likes: 0,
      comments: 0,
      image: "🆕",
      tag: postTags.join(", ") || "General",
      projectLink: selectedProjectToPost.githubLink,
      timestamp: new Date().toISOString(),
    };
    
    posts.unshift(newPost);
    localStorage.setItem('community_posts', JSON.stringify(posts));
    
    toast({
      title: "Project posted",
      description: `Successfully posted ${selectedProjectToPost.name} to the community`,
    });
    
    setIsPostDialogOpen(false);
    setSelectedProjectToPost(null);
    setPostDescription("");
    setPostTags([]);
    
    // Navigate to community page
    setTimeout(() => {
      navigate("/ai/community");
    }, 1000);
  };
  
  // Get unique languages
  const languages = Array.from(new Set(projects.map(p => p.lang))).sort();
  
  // Reset visible count when filters change
  useEffect(() => {
    setVisibleProjectsCount(6);
  }, [searchQuery, filterSource, filterLanguage, filterStatus, sortBy]);

  return (
    <div className="min-h-screen p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Your Creations
          </h1>
          <p className="text-muted-foreground mt-1">Synced with the Cloud. Powered by AI.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow-purple transition-all">
                <Upload className="w-4 h-4 mr-2" />
                Import Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Import Project</DialogTitle>
                <DialogDescription>
                  Import a project from GitHub, local files, or Replit
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="github" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="github" onClick={() => setImportSource("github")}>
                    <Github className="w-4 h-4 mr-2" /> GitHub
                  </TabsTrigger>
                  <TabsTrigger value="local" onClick={() => setImportSource("local")}>
                    <FolderOpen className="w-4 h-4 mr-2" /> Local
                  </TabsTrigger>
                  <TabsTrigger value="replit" onClick={() => setImportSource("replit")}>
                    <Code className="w-4 h-4 mr-2" /> Replit
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="github" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Repository URL</label>
                    <Input
                      placeholder="https://github.com/owner/repo"
                      value={githubRepoUrl}
                      onChange={(e) => setGithubRepoUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleImportFromGitHub}
                    disabled={isImporting || !githubRepoUrl.trim()}
                    className="w-full"
                  >
                    {isImporting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Github className="w-4 h-4 mr-2" />
                        Import from GitHub
                      </>
                    )}
                  </Button>
                </TabsContent>
                <TabsContent value="local" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Project File</label>
                    <Input
                      type="file"
                      accept=".zip,.tar,.gz,.json"
                      onChange={handleImportFromLocal}
                      disabled={isImporting}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: ZIP, TAR, GZ, JSON
                  </p>
                </TabsContent>
                <TabsContent value="replit" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Replit Project URL</label>
                    <Input
                      placeholder="https://replit.com/@username/project-name"
                      value={replitUrl}
                      onChange={(e) => setReplitUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleImportFromReplit}
                    disabled={isImporting || !replitUrl.trim()}
                    className="w-full"
                  >
                    {isImporting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Code className="w-4 h-4 mr-2" />
                        Import from Replit
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => navigate("/ai/workspace")}
            variant="outline"
            className="bg-gradient-primary/10 hover:bg-gradient-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Workspace
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects from GitHub, local files, or Replit..."
            className="pl-10 bg-secondary/50 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={filterSource} onValueChange={setFilterSource}>
            <SelectTrigger className="w-[140px]">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Source: All</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="replit">Replit</SelectItem>
              <SelectItem value="created">Created</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterLanguage} onValueChange={setFilterLanguage}>
            <SelectTrigger className="w-[140px]">
              <FileCode className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Language: All</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang.toLowerCase()}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <AlertCircle className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status: All</SelectItem>
              <SelectItem value="synced">Synced</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="needs-review">Needs Review</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <RefreshCw className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Sort By: Updated</SelectItem>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Count Display */}
      {filteredProjects.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{Math.min(visibleProjectsCount, filteredProjects.length)}</span> of <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No projects found. Import a project to get started.</p>
          <Button onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Import Project
          </Button>
        </div>
      ) : (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, visibleProjectsCount).map((project) => {
              const statusBadge = getStatusBadge(project.status);
              return (
                <GlassCard key={project.id} hover className="p-6 space-y-4 group">
            <div className="flex items-start justify-between">
                    <div className="flex-1">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge.className}`}>
                          {statusBadge.label}
                        </span>
                        <span className="text-sm text-muted-foreground">{project.lang}</span>
                      </div>
              </div>
            </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                {project.stars}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.forks}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.views}
              </div>
            </div>

                  {project.collaborators && project.collaborators.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {project.collaborators.slice(0, 3).map((collab, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background"
                            title={collab.name}
                          />
                        ))}
                      </div>
                      {project.collaborators.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.collaborators.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t border-border/40">
              <Button 
                    onClick={() => navigate(`/ai/workspace?project=${project.id}`)}
                size="sm" 
                className="flex-1 bg-primary/10 hover:bg-primary/20"
              >
                    Open
                  </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        if (project.githubLink) {
                          window.open(project.githubLink, '_blank');
                        }
                      }}
                      title="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                      onClick={() => setIsForkDialogOpen(true)}
                      title="Fork from GitHub"
                    >
                      <GitFork className="w-4 h-4" />
                    </Button>
                    <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedProjectToPost(project)}
                          title="Post to Community"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Post Project to Community</DialogTitle>
                          <DialogDescription>
                            Share your project with the community
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Project</label>
                            <Input value={selectedProjectToPost?.name || ""} disabled />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Description</label>
                            <Textarea
                              value={postDescription}
                              onChange={(e) => setPostDescription(e.target.value)}
                              placeholder="Describe your project..."
                              rows={4}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                            <Input
                              placeholder="React, TypeScript, AI"
                              value={postTags.join(", ")}
                              onChange={(e) => setPostTags(e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handlePostProject} className="bg-gradient-primary">
                            <Share2 className="w-4 h-4 mr-2" />
                            Post to Community
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Explore More Button */}
          {filteredProjects.length > visibleProjectsCount && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setVisibleProjectsCount(filteredProjects.length)}
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white hover:opacity-90 transition-all shadow-lg"
              >
                Explore More Projects ({filteredProjects.length - visibleProjectsCount} remaining) ↓
              </Button>
            </div>
          )}

          {/* Show Less Button (when all projects are visible) */}
          {visibleProjectsCount > 6 && visibleProjectsCount >= filteredProjects.length && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => {
                  setVisibleProjectsCount(6);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                ↑ Show Less (Show only 6)
              </Button>
            </div>
          )}
        </>
      )}

      {/* Fork Dialog */}
      <Dialog open={isForkDialogOpen} onOpenChange={setIsForkDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Fork from GitHub</DialogTitle>
            <DialogDescription>
              Search and fork repositories from GitHub
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search repositories (e.g., react, vue, typescript)"
                value={forkSearchQuery}
                onChange={(e) => setForkSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchForkRepos();
                  }
                }}
              />
              <Button
                onClick={handleSearchForkRepos}
                disabled={isSearchingFork || !forkSearchQuery.trim()}
              >
                {isSearchingFork ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
            {forkResults.length > 0 && (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {forkResults.map((repo) => (
                  <div
                    key={repo.id}
                    className="p-4 border border-border rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{repo.full_name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {repo.description || "No description"}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {repo.stargazers_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            {repo.forks_count}
                          </div>
                          <span>{repo.language || "Other"}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleForkRepository(repo)}
                        disabled={isForking}
                        className="ml-4"
                      >
                        {isForking ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <GitFork className="w-4 h-4 mr-2" />
                            Fork
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {forkResults.length === 0 && forkSearchQuery && !isSearchingFork && (
              <p className="text-center text-muted-foreground py-4">No repositories found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button for Fork */}
      <div className="fixed bottom-8 right-8">
        <Dialog open={isForkDialogOpen} onOpenChange={setIsForkDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-gradient-primary hover:shadow-glow-purple shadow-lg"
            >
              <GitFork className="w-6 h-6" />
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}
