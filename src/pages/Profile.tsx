import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
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
import Footer from "@/components/Footer";
import {
  Users,
  FolderGit2,
  Award,
  Settings,
  Github,
  PlusCircle,
  Zap,
  Edit3,
  Trophy,
  Star,
  Trash2,
  X,
  MapPin,
  Search,
  GitFork,
  Eye,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Archive,
  Sparkles,
  UserPlus,
  Globe,
  MessageCircle,
  Send,
  Heart,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

interface GitHubProject {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  status: "synced" | "in-progress" | "needs-review" | "archived";
  githubUrl: string;
  lastSynced?: string;
  collaborators?: Array<{ name: string; avatar: string }>;
}

interface NearbyCoder {
  id: string;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  skills: string[];
  distance: number;
}

const STORAGE_KEY = "user_profile_data";
const GITHUB_PROJECTS_KEY = "github_projects";
const LOCATION_KEY = "user_location";

interface ProfileData {
  bio: string;
  achievements: Array<{ id: string; title: string; desc: string }>;
  badges: Array<{ id: string; emoji: string; title: string }>;
  followers: number;
  location?: { lat: number; lng: number; city: string };
}

export default function Profile() {
  const { user: currentUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewUserId = searchParams.get('user'); // User ID from URL parameter
  
  // Check if viewing own profile or another user's profile
  const isOwnProfile = !viewUserId || viewUserId === currentUser?.id;
  
  // For now, if viewing another user, we'll use mock data
  // In production, you'd fetch this from an API based on viewUserId
  const getViewingUser = () => {
    if (isOwnProfile) {
      return currentUser;
    }
    // Mock user data for other users (in production, fetch from API)
    const mockUsers: Record<string, any> = {
      '1': {
        id: '1',
        fullName: "Sara Lee",
        username: "saralee",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        primaryEmailAddress: { emailAddress: "sara.lee@example.com" }
      },
      '2': {
        id: '2',
        fullName: "Mike Chen",
        username: "mikechen",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
        primaryEmailAddress: { emailAddress: "mike.chen@example.com" }
      },
      '3': {
        id: '3',
        fullName: "Emma Wilson",
        username: "emmawilson",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        primaryEmailAddress: { emailAddress: "emma.wilson@example.com" }
      },
    };
    return mockUsers[viewUserId || ''] || {
      id: viewUserId,
      fullName: "Alex Duran",
      username: "alexduran",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      primaryEmailAddress: { emailAddress: "alex.duran@vibex.ai" }
    };
  };
  
  const viewingUser = getViewingUser();
  const userName = viewingUser?.fullName || viewingUser?.username || viewingUser?.primaryEmailAddress?.emailAddress?.split('@')[0] || "User";
  const userEmail = viewingUser?.primaryEmailAddress?.emailAddress || "";
  const userImageUrl = viewingUser?.imageUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${userName}`;
  const monthsAgo = viewingUser?.createdAt ? Math.floor((Date.now() - new Date(viewingUser.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;
  
  // Load profile data - moved after viewingUser is defined
  const loadProfileData = (userId?: string, ownProfile?: boolean): ProfileData => {
    try {
      // If viewing another user's profile, load their data
      if (!ownProfile && userId) {
        const userProfileKey = `profile_data_${userId}`;
        const stored = localStorage.getItem(userProfileKey);
        if (stored) {
          return JSON.parse(stored);
        }
        // Return default for other users
        return {
          bio: "",
          achievements: [],
          badges: [],
          followers: Math.floor(Math.random() * 100) + 10, // Mock follower count
        };
      }
      // Load current user's profile data
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
    return {
      bio: "",
      achievements: [],
      badges: [],
      followers: 0,
    };
  };

  // Load GitHub projects
  const loadGitHubProjects = (): GitHubProject[] => {
    try {
      const stored = localStorage.getItem(GITHUB_PROJECTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading GitHub projects:", error);
    }
    return [];
  };

  // Load nearby coders (mock data for now)
  const loadNearbyCoders = (): NearbyCoder[] => {
    // In production, this would fetch from an API based on user location
    return [
      { id: "1", name: "Sara Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", location: { lat: 37.7749, lng: -122.4194 }, skills: ["React", "Python"], distance: 0.5 },
      { id: "2", name: "Mike Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", location: { lat: 37.7849, lng: -122.4094 }, skills: ["TypeScript", "Node.js"], distance: 1.2 },
      { id: "3", name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", location: { lat: 37.7649, lng: -122.4294 }, skills: ["Vue", "Go"], distance: 0.8 },
    ];
  };

  // Initialize profile data
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // Initial load will be updated in useEffect
    return {
      bio: "",
      achievements: [],
      badges: [],
      followers: 0,
    };
  });
  
  // Reload profile data when viewing different user
  useEffect(() => {
    const newData = loadProfileData(viewingUser?.id, isOwnProfile);
    setProfileData(newData);
  }, [viewUserId, isOwnProfile, viewingUser?.id]);
  const [githubProjects, setGithubProjects] = useState<GitHubProject[]>(loadGitHubProjects);
  const [nearbyCoders, setNearbyCoders] = useState<NearbyCoder[]>(loadNearbyCoders);
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [editingBio, setEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState("");
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageRecipient, setMessageRecipient] = useState<{id: string; name: string; avatar?: string} | null>(null);
  const [connections, setConnections] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<{to: string; from: string; message: string; timestamp: string}>>([]);
  
  // Load connections and following from localStorage
  useEffect(() => {
    const savedConnections = localStorage.getItem('user_connections');
    const savedFollowing = localStorage.getItem('user_following');
    if (savedConnections) {
      setConnections(JSON.parse(savedConnections));
    }
    if (savedFollowing) {
      setFollowing(JSON.parse(savedFollowing));
    }
  }, []);
  
  // Check if viewing user is followed/connected
  useEffect(() => {
    if (!isOwnProfile && viewingUser?.id) {
      setIsFollowing(following.includes(viewingUser.id));
      setIsConnected(connections.includes(viewingUser.id));
    }
  }, [viewingUser?.id, following, connections, isOwnProfile]);

  // GitHub connection handler
  const handleConnectGitHub = async () => {
    // Check for Personal Access Token first (quick setup option)
    const personalToken = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem('github_personal_token');
    
    if (personalToken && personalToken !== 'your_github_token_here') {
      // Use personal token directly
      localStorage.setItem('github_token', personalToken);
      setIsGitHubConnected(true);
      toast({
        title: 'GitHub Connected',
        description: 'Using Personal Access Token. You can now sync your repositories.',
      });
      handleSyncGitHub();
      return;
    }

    // Try OAuth flow
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
    
    // Debug: Log environment variables
    console.log('Environment check:', {
      hasClientId: !!clientId,
      hasPersonalToken: !!personalToken,
      clientIdLength: clientId.length,
      origin: window.location.origin,
      allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
    });
    
    if (!clientId || clientId === 'your_github_client_id_here' || clientId.trim() === '') {
      toast({
        title: 'GitHub OAuth not configured',
        description: 'Quick fix: Add VITE_GITHUB_TOKEN=ghp_your_token to .env (get token from github.com/settings/tokens). Or set up OAuth with VITE_GITHUB_CLIENT_ID. See GITHUB_QUICK_FIX.md',
        variant: 'destructive',
        duration: 15000,
      });
      return;
    }

    const redirectUri = `${window.location.origin}/auth/github/callback`;
    const scope = 'repo read:user';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    
    console.log('Redirecting to GitHub:', {
      clientId: clientId.substring(0, 10) + '...',
      redirectUri,
      githubAuthUrl: githubAuthUrl.substring(0, 100) + '...',
    });
    
    window.location.href = githubAuthUrl;
  };

  // Sync GitHub repositories
  const handleSyncGitHub = async () => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem('github_token') || import.meta.env.VITE_GITHUB_TOKEN;
      if (!token || token === 'your_github_token_here' || token.trim() === '') {
        toast({
          title: 'Not connected',
          description: 'Please connect your GitHub account first. Add VITE_GITHUB_TOKEN to .env or use OAuth.',
          variant: 'destructive',
        });
        setIsSyncing(false);
        return;
      }

      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=20', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Invalid token. Please check your GitHub token.');
        } else if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else {
          throw new Error(errorData.message || 'Failed to fetch repositories');
        }
      }

      const repos = await response.json();
      const projects: GitHubProject[] = repos.map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || '',
        language: repo.language || 'Other',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        status: repo.archived ? 'archived' : 'synced' as const,
        githubUrl: repo.html_url,
        lastSynced: new Date().toISOString(),
        collaborators: [],
      }));

      localStorage.setItem(GITHUB_PROJECTS_KEY, JSON.stringify(projects));
      setGithubProjects(projects);
      
      toast({
        title: 'Synced successfully',
        description: `Found ${projects.length} repositories from GitHub`,
      });
    } catch (error) {
      console.error('Error syncing GitHub:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync repositories from GitHub';
      toast({
        title: 'Sync failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Check GitHub connection on mount
  useEffect(() => {
    // Check for token in localStorage or environment
    const token = localStorage.getItem('github_token');
    const personalToken = import.meta.env.VITE_GITHUB_TOKEN;
    const code = localStorage.getItem('github_code');
    
    // If we have a personal token in env but not in localStorage, use it
    if (personalToken && personalToken !== 'your_github_token_here' && personalToken.trim() !== '' && !token) {
      localStorage.setItem('github_token', personalToken);
      setIsGitHubConnected(true);
      // Auto-sync if we have a token
      const syncRepos = async () => {
        try {
          const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=20', {
            headers: {
              'Authorization': `token ${personalToken}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });
          if (response.ok) {
            const repos = await response.json();
            const projects: GitHubProject[] = repos.map((repo: any) => ({
              id: repo.id.toString(),
              name: repo.name,
              description: repo.description || '',
              language: repo.language || 'Other',
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              status: repo.archived ? 'archived' : 'synced' as const,
              githubUrl: repo.html_url,
              lastSynced: new Date().toISOString(),
              collaborators: [],
            }));
            localStorage.setItem(GITHUB_PROJECTS_KEY, JSON.stringify(projects));
            setGithubProjects(projects);
          }
        } catch (error) {
          console.error('Auto-sync error:', error);
        }
      };
      syncRepos();
    } else {
      setIsGitHubConnected(!!token);
    }
    
    // Debug: Check environment
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const hasToken = import.meta.env.VITE_GITHUB_TOKEN;
    
    if (!clientId && !hasToken) {
      console.warn('⚠️ GitHub not configured');
      console.warn('💡 Options:');
      console.warn('   1. Add VITE_GITHUB_TOKEN=ghp_your_token to .env (Quick)');
      console.warn('   2. Add VITE_GITHUB_CLIENT_ID=your_client_id to .env (OAuth)');
      console.warn('   3. Restart dev server after adding');
    } else if (hasToken) {
      console.log('✅ GitHub Personal Token found in environment');
    } else {
      console.log('✅ GitHub Client ID found:', clientId?.substring(0, 10) + '...');
    }
    
    const currentToken = localStorage.getItem('github_token');
    if (currentToken && githubProjects.length === 0) {
      // Only sync if we have a token and no projects
      handleSyncGitHub();
    }
    
    // If we have a code but no token, show message
    if (code && !currentToken) {
      toast({
        title: 'Authorization code received',
        description: 'Please exchange the code for a token. You can also use a Personal Access Token for quick setup.',
        duration: 5000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save profile data
  const saveProfileData = (data: ProfileData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setProfileData(data);
      toast({
        title: "Profile updated",
        description: "Your profile data has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile data:", error);
      toast({
        title: "Error",
        description: "Failed to save profile data.",
        variant: "destructive",
      });
    }
  };

  // Bio handlers
  const handleBioEdit = () => {
    setTempBio(profileData.bio);
    setEditingBio(true);
  };

  const handleBioCancel = () => {
    setEditingBio(false);
    setTempBio("");
  };

  const handleBioSave = () => {
    saveProfileData({ ...profileData, bio: tempBio });
    setEditingBio(false);
    setTempBio("");
  };

  // Filter projects
  const filteredProjects = githubProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    const matchesLanguage = filterLanguage === "all" || project.language === filterLanguage;
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges = {
      synced: { label: "Synced", className: "bg-green-500/20 text-green-500 border-green-500/30" },
      "in-progress": { label: "In Progress", className: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
      "needs-review": { label: "Needs Review", className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
      archived: { label: "Archived", className: "bg-gray-500/20 text-gray-500 border-gray-500/30" },
    };
    return badges[status as keyof typeof badges] || badges.synced;
  };

  // Request location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: "San Francisco", // In production, reverse geocode
          };
          localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
          setProfileData({ ...profileData, location });
          toast({
            title: "Location updated",
            description: "Your location has been saved for the directory",
          });
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please enable location access to see nearby coders",
            variant: "destructive",
          });
        }
      );
    }
  };

  // Social actions
  const handleFollow = () => {
    if (isOwnProfile) {
      toast({
        title: "Cannot follow yourself",
        description: "You cannot follow your own profile",
        variant: "destructive",
      });
      return;
    }
    
    const userId = viewingUser?.id || userName;
    const newFollowing = !isFollowing 
      ? [...following, userId]
      : following.filter(u => u !== userId);
    
    setFollowing(newFollowing);
    setIsFollowing(!isFollowing);
    localStorage.setItem('user_following', JSON.stringify(newFollowing));
    
    if (!isFollowing) {
      // Update follower count for the user being viewed
      const userProfileKey = `profile_data_${userId}`;
      const userProfile = JSON.parse(localStorage.getItem(userProfileKey) || '{}');
      userProfile.followers = (userProfile.followers || 0) + 1;
      localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
      
      toast({
        title: "Following",
        description: `You're now following ${userName}`,
      });
    } else {
      const userProfileKey = `profile_data_${userId}`;
      const userProfile = JSON.parse(localStorage.getItem(userProfileKey) || '{}');
      userProfile.followers = Math.max(0, (userProfile.followers || 0) - 1);
      localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
      
      toast({
        title: "Unfollowed",
        description: `You unfollowed ${userName}`,
      });
    }
  };

  const handleConnect = () => {
    if (isOwnProfile) {
      toast({
        title: "Cannot connect to yourself",
        description: "You cannot connect to your own profile",
        variant: "destructive",
      });
      return;
    }
    
    const userId = viewingUser?.id || userName;
    const newConnections = !isConnected
      ? [...connections, userId]
      : connections.filter(u => u !== userId);
    
    setConnections(newConnections);
    setIsConnected(!isConnected);
    localStorage.setItem('user_connections', JSON.stringify(newConnections));
    
    toast({
      title: !isConnected ? "Connected" : "Disconnected",
      description: !isConnected 
        ? `You're now connected with ${userName}`
        : `Connection removed with ${userName}`,
    });
  };

  const handleSendMessage = (recipient?: {id: string; name: string}) => {
    const targetRecipient = recipient || messageRecipient || (isOwnProfile ? null : { id: viewingUser?.id || userName, name: userName });
    
    if (!targetRecipient) {
      toast({
        title: "No recipient",
        description: "Please select a user to message",
        variant: "destructive",
      });
      return;
    }
    
    if (targetRecipient.id === currentUser?.id) {
      toast({
        title: "Cannot message yourself",
        description: "You cannot send messages to your own profile",
        variant: "destructive",
      });
      return;
    }
    
    if (!messageText.trim()) {
      toast({
        title: "Message empty",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }
    
    const fromUser = currentUser?.fullName || currentUser?.username || "You";
    
    // Save message to localStorage (in production, this would go to a backend/API)
    const message = {
      to: targetRecipient.id,
      toName: targetRecipient.name,
      from: currentUser?.id || "current_user",
      fromName: fromUser,
      message: messageText,
      timestamp: new Date().toISOString(),
    };
    
    const savedMessages = JSON.parse(localStorage.getItem('user_messages') || '[]');
    savedMessages.push(message);
    localStorage.setItem('user_messages', JSON.stringify(savedMessages));
    setMessages(savedMessages);
    
    toast({
      title: "Message sent",
      description: `Message sent to ${targetRecipient.name}: "${messageText.substring(0, 50)}${messageText.length > 50 ? '...' : ''}"`,
    });
    setMessageText("");
    setMessageRecipient(null);
    setIsMessageDialogOpen(false);
  };

  const handleConnectCoder = (coderId: string, coderName: string) => {
    if (!connections.includes(coderId)) {
      setConnections([...connections, coderId]);
      toast({
        title: "Connected",
        description: `You're now connected with ${coderName}`,
      });
    } else {
      toast({
        title: "Already connected",
        description: `You're already connected with ${coderName}`,
      });
    }
  };

  const handleMessageCoder = (coderId: string, coderName: string, coderAvatar?: string) => {
    // Set the message recipient and open dialog
    setMessageRecipient({ id: coderId, name: coderName, avatar: coderAvatar });
    setMessageText("");
    setIsMessageDialogOpen(true);
  };
  
  const handleOpenMessageDialog = () => {
    if (isOwnProfile) {
      toast({
        title: "Cannot message yourself",
        description: "You cannot send messages to your own profile",
        variant: "destructive",
      });
      return;
    }
    setMessageRecipient({ id: viewingUser?.id || userName, name: userName, avatar: userImageUrl });
    setMessageText("");
    setIsMessageDialogOpen(true);
  };
  
  // Load messages for current user
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('user_messages') || '[]');
    setMessages(savedMessages);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6"
    >
      {/* Profile Header */}
      <GlassCard className="p-6 bg-background/60 backdrop-blur-xl border border-border/60">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] p-[2px] shadow-[0_0_25px_rgba(0,224,255,0.3)]">
            <img
              src={userImageUrl}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
              {userName}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              @{userName.toLowerCase().replace(/\s+/g, '')} • Joined {monthsAgo > 0 ? `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago` : 'recently'}
            </p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              {[
                { icon: Users, label: "Followers", value: profileData.followers >= 1000 ? `${(profileData.followers/1000).toFixed(1)}K` : String(profileData.followers) },
                { icon: FolderGit2, label: "Projects", value: githubProjects.length },
                { icon: Award, label: "Badges", value: profileData.badges.length },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <stat.icon className="w-3 h-3" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {isOwnProfile ? (
              // Own profile - show edit/settings options
              <>
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </Button>
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <Settings className="w-4 h-4" /> Settings
                </Button>
                {!isGitHubConnected ? (
                  <Button
                    onClick={handleConnectGitHub}
                    size="sm"
                    className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" /> Connect GitHub
                  </Button>
                ) : (
                  <Button
                    onClick={handleSyncGitHub}
                    disabled={isSyncing}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Syncing...' : 'Sync'}
                  </Button>
                )}
              </>
            ) : (
              // Other user's profile - show social options
              <>
                <Button 
                  onClick={handleFollow}
                  size="sm" 
                  variant={isFollowing ? "default" : "outline"}
                  className={`flex items-center gap-1 ${isFollowing ? 'bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]' : ''}`}
                >
                  {isFollowing ? <UserCheck className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button 
                  onClick={handleConnect}
                  size="sm" 
                  variant={isConnected ? "default" : "outline"}
                  className={`flex items-center gap-1 ${isConnected ? 'bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]' : ''}`}
                >
                  {isConnected ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isConnected ? 'Connected' : 'Connect'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={handleOpenMessageDialog}
                >
                  <MessageCircle className="w-4 h-4" /> Message
                </Button>
              </>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Two Section Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT SECTION: Profile Info */}
        <div className="space-y-6">
          {/* Bio Section */}
          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> About {isOwnProfile ? 'Me' : userName}
              </h2>
              {isOwnProfile && (
                !editingBio ? (
                  <Button size="sm" variant="secondary" onClick={handleBioEdit}>
                    Edit Bio
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleBioCancel}>
                      Cancel
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]" onClick={handleBioSave}>
                      Save
                    </Button>
                  </div>
                )
              )}
            </div>
            {isOwnProfile && editingBio ? (
              <Textarea
                className="w-full rounded-xl border border-border bg-background/50 p-3 text-sm focus:ring-2 ring-primary outline-none"
                rows={4}
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-muted-foreground min-h-[60px]">
                {profileData.bio || (isOwnProfile ? "No bio added yet. Click 'Edit Bio' to add one." : "No bio available.")}
              </p>
            )}
          </GlassCard>

          {/* Achievements */}
          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" /> Achievements
              </h2>
            </div>
            {profileData.achievements.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No achievements yet</p>
            ) : (
              <div className="space-y-3">
                {profileData.achievements.slice(0, 3).map((a) => (
                  <div key={a.id} className="p-3 bg-background/50 rounded-lg border border-border/40">
                    <h3 className="font-semibold text-sm">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Badges */}
          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Badges
              </h2>
            </div>
            {profileData.badges.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No badges yet</p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {profileData.badges.slice(0, 8).map((b) => (
                  <div key={b.id} className="text-center p-2 bg-background/50 rounded-lg border border-border/40">
                    <div className="text-2xl mb-1">{b.emoji}</div>
                    <p className="text-xs font-medium">{b.title}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* RIGHT SECTION: Projects & Location */}
        <div className="space-y-6">
          {/* GitHub Projects Section */}
          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-primary" /> {isOwnProfile ? 'Your Creations' : 'Projects'}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">{isOwnProfile ? 'Synced with the Cloud. Powered by AI.' : `${userName}'s projects`}</p>
              </div>
              {isOwnProfile && isGitHubConnected && (
                <Button
                  onClick={handleSyncGitHub}
                  disabled={isSyncing}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  Sync
                </Button>
              )}
            </div>

            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects from GitHub, local files, or Replit..."
                  className="pl-10 bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px]">
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
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Language: All</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Go">Go</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Projects Grid */}
            {!isGitHubConnected ? (
              <div className="text-center py-12">
                <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Connect GitHub to see your projects</p>
                <Button onClick={handleConnectGitHub} className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]">
                  <Github className="w-4 h-4 mr-2" /> Connect GitHub
                </Button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <FolderGit2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No projects found. Sync to load your repositories.</p>
                <Button onClick={handleSyncGitHub} disabled={isSyncing} variant="outline">
                  <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredProjects.map((project) => {
                  const statusBadge = getStatusBadge(project.status);
                  return (
                    <div
                      key={project.id}
                      className="p-4 bg-background/50 rounded-xl border border-border/40 hover:shadow-[0_0_25px_rgba(155,92,245,0.2)] transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{project.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge.className}`}>
                              {statusBadge.label}
                            </span>
                            <span className="text-xs text-muted-foreground">{project.language}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description || "No description"}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
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
                            0
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white"
                            onClick={() => window.open(project.githubUrl, "_blank")}
                          >
                            Open
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.githubUrl, "_blank")}
                          >
                            <GitFork className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Sparkles className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>

          {/* Location Directory - Snapchat Style */}
          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Nearby Coders
              </h2>
              {!profileData.location && (
                <Button size="sm" variant="outline" onClick={requestLocation}>
                  <Globe className="w-4 h-4 mr-1" /> Enable Location
                </Button>
              )}
            </div>

            {!profileData.location ? (
              <div className="text-center py-12">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
                  <MapPin className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-muted-foreground text-sm mb-2 font-medium">Discover Coders Near You</p>
                <p className="text-xs text-muted-foreground mb-4">Enable location to see developers in your area</p>
                <Button onClick={requestLocation} className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]">
                  <Globe className="w-4 h-4 mr-2" /> Enable Location
                </Button>
              </div>
            ) : (
              <>
                {/* Snapchat-style Map View */}
                <div className="mb-4 h-56 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border-2 border-primary/20 relative overflow-hidden cursor-pointer hover:border-primary/40 transition-colors">
                  {/* Map-like background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Street lines */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-primary/20 transform -rotate-6" />
                    <div className="absolute top-2/4 left-0 right-0 h-0.5 bg-primary/20 transform rotate-3" />
                    <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-primary/20 transform -rotate-2" />
                    <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-primary/20 transform rotate-12" />
                    <div className="absolute left-2/4 top-0 bottom-0 w-0.5 bg-primary/20 transform -rotate-6" />
                    <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-primary/20 transform rotate-9" />
                  </div>

                  {/* User location (center) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" style={{ width: '40px', height: '40px', margin: '-20px' }} />
                      <div className="relative w-6 h-6 bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <p className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap bg-background/90 px-2 py-1 rounded border border-border/40 shadow-sm">
                      You
                    </p>
                  </div>

                  {/* Nearby coders as pins */}
                  {nearbyCoders.map((coder, i) => {
                    const positions = [
                      { left: '25%', top: '30%' },
                      { left: '70%', top: '35%' },
                      { left: '45%', top: '65%' },
                    ];
                    const pos = positions[i] || { left: '50%', top: '50%' };
                    return (
                      <div
                        key={coder.id}
                        className="absolute z-10 group"
                        style={pos}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-500/30 rounded-full animate-pulse" style={{ width: '32px', height: '32px', margin: '-16px' }} />
                          <div className="relative w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                            <img
                              src={coder.avatar}
                              alt={coder.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-background/95 px-2 py-1 rounded text-xs font-medium whitespace-nowrap border border-border/40 shadow-lg">
                              {coder.name}
                              <div className="text-[10px] text-muted-foreground">{coder.distance} km</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Location label */}
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium">{profileData.location.city}</p>
                        <p className="text-[10px] text-muted-foreground">{nearbyCoders.length} coders nearby</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nearby Coders List */}
                <div className="space-y-3">
                  {nearbyCoders.map((coder) => {
                    const isCoderConnected = connections.includes(coder.id);
                    return (
                      <div
                        key={coder.id}
                        className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/40 hover:bg-background/70 transition-colors cursor-pointer group"
                        onClick={() => {
                          // Navigate to coder's profile
                          navigate(`/ai/profile?user=${coder.id}`);
                        }}
                      >
                        <img
                          src={coder.avatar}
                          alt={coder.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">{coder.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{coder.distance} km away</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <div className="flex gap-1">
                              {coder.skills.slice(0, 2).map((skill, i) => (
                                <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            size="sm" 
                            variant={isCoderConnected ? "default" : "outline"}
                            className={`flex items-center gap-1 ${isCoderConnected ? 'bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnectCoder(coder.id, coder.name);
                            }}
                          >
                            {isCoderConnected ? <UserCheck className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
                            {isCoderConnected ? 'Connected' : 'Connect'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMessageCoder(coder.id, coder.name, coder.avatar);
                            }}
                          >
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </GlassCard>
        </div>
      </div>

      {/* Message Dialog - Shared for all messaging */}
      <Dialog open={isMessageDialogOpen} onOpenChange={(open) => {
        setIsMessageDialogOpen(open);
        if (!open) {
          setMessageText("");
          setMessageRecipient(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message {messageRecipient ? `to ${messageRecipient.name}` : ''}</DialogTitle>
            <DialogDescription>
              {messageRecipient 
                ? `Send a message to start a conversation with ${messageRecipient.name}`
                : 'Select a user to message'}
            </DialogDescription>
          </DialogHeader>
          {messageRecipient && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <img
                  src={messageRecipient.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${messageRecipient.name}`}
                  alt={messageRecipient.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{messageRecipient.name}</p>
                  <p className="text-sm text-muted-foreground">@{messageRecipient.name.toLowerCase().replace(/\s+/g, '')}</p>
                </div>
              </div>
              <Textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Type your message to ${messageRecipient.name}...`}
                rows={5}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.metaKey) {
                    handleSendMessage(messageRecipient);
                  }
                }}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsMessageDialogOpen(false);
              setMessageText("");
              setMessageRecipient(null);
            }}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSendMessage(messageRecipient || undefined)}
              className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
              disabled={!messageText.trim() || !messageRecipient}
            >
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </motion.div>
  );
}
