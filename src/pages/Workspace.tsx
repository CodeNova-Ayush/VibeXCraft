import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SessionControls from '@/components/livePair/SessionControls';
import MultiFileEditor from '@/components/livePair/MultiFileEditor';
import { StandaloneEditor } from '@/components/livePair/StandaloneEditor';
import VoiceChat from '@/components/livePair/VoiceChat';
import { Code2 } from 'lucide-react';

const PROJECTS_STORAGE_KEY = 'vibexcraft_projects';

export default function Workspace() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [peerId] = useState(() => Math.random().toString(36).substring(7));
  const [projectName, setProjectName] = useState<string>('');

  // Load project name from localStorage
  useEffect(() => {
    if (projectId) {
      try {
        const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
        if (stored) {
          const projects = JSON.parse(stored);
          const project = projects.find((p: any) => p.id === projectId);
          if (project) {
            setProjectName(project.name || '');
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
      }
    }
  }, [projectId]);

  const handleSessionJoined = (sessionCode: string, name: string) => {
    setCurrentSession(sessionCode);
    setUserName(name);
  };

  const handleSessionEnd = () => {
    setCurrentSession(null);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {projectName || 'Workspace'}
                {currentSession && (
                  <span className="ml-3 text-sm font-normal text-muted-foreground">
                    • Live Session: {currentSession}
                  </span>
                )}
              </h1>
            </div>

            <SessionControls
              onSessionJoined={handleSessionJoined}
              onSessionEnd={handleSessionEnd}
              currentSession={currentSession}
              userName={userName}
              onUserNameChange={setUserName}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentSession ? (
          <MultiFileEditor sessionCode={currentSession} />
        ) : (
          <StandaloneEditor projectId={projectId || undefined} projectName={projectName || undefined} />
        )}
      </main>

      {/* Footer / Status Bar with Video Call */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentSession ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Connected to session: <span className="text-foreground font-semibold">{currentSession}</span>
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {projectName ? `Editing: ${projectName}` : 'Standalone Workspace • Create or join a session for real-time collaboration'}
                </span>
              )}
            </div>

            {currentSession && <VoiceChat sessionCode={currentSession} peerId={peerId} />}
          </div>
        </div>
      </footer>
    </div>
  );
}
