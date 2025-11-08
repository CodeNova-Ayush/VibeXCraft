import { Home, Code2, FolderGit2, Bot, Users, BarChart3, User, Settings, Zap } from "lucide-react";
import { NavLink } from "./NavLink";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Code2, label: "Workspace", path: "/workspace" },
  { icon: FolderGit2, label: "Projects", path: "/projects" },
  { icon: Bot, label: "AI Copilots", path: "/copilots" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-6">
      <div className="w-12 h-12 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow-purple">
        <Zap className="w-6 h-6 text-white" />
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
            activeClassName="bg-sidebar-accent text-primary shadow-glow-purple"
          >
            <item.icon className="w-5 h-5" />
          </NavLink>
        ))}
      </nav>
      
      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
        O
      </div>
    </aside>
  );
};
