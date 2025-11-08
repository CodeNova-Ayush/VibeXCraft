// In App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuth } from "@clerk/clerk-react";

// In App.tsx
import {  Outlet } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Projects from "./pages/Projects";
import Copilots from "./pages/Copilots";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Agent from "./pages/Agent";
import Query from "./pages/Query";
import Events from "./pages/Events";
import LivePair from "./pages/LivePair";
import GitHubCallback from "./pages/GitHubCallback";

const queryClient = new QueryClient();

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth/github/callback" element={<GitHubCallback />} />
            
            {/* Protected Routes */}
            <Route
              path="/ai/*"
              element={isSignedIn ? <MainLayout /> : <Navigate to="/" replace />}
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="workspace" element={<Workspace />} />
              <Route path="projects" element={<Projects />} />
              <Route path="copilots" element={<Copilots />} />
              <Route path="copilot" element={<Copilots />} />
              <Route path="community" element={<Community />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="agent" element={<Agent />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="query" element={<Query />} />
              <Route path="live-pair" element={<LivePair />} />
              <Route path="events" element={<Events />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Main layout without sidebar
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16"> {/* pt-16 to account for fixed navbar */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
