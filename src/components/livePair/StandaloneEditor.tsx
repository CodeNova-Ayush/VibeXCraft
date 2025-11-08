import { useState, useEffect } from 'react';
import { FileTabs } from './FileTabs';
import { Code2, Play, FilePlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  filename: string;
  file_content: string;
  language: string;
}

interface StandaloneEditorProps {
  projectId?: string;
  projectName?: string;
}

export const StandaloneEditor = ({ projectId, projectName }: StandaloneEditorProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const { toast } = useToast();

  const STORAGE_KEY = projectId ? `project_files_${projectId}` : 'workspace_files';

  // Load files from localStorage
  useEffect(() => {
    const loadFiles = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedFiles = JSON.parse(stored);
          setFiles(parsedFiles);
          
          // Auto-open first file if files exist
          if (parsedFiles.length > 0) {
            const firstFile = parsedFiles[0];
            setOpenFiles([firstFile]);
            setActiveFileId(firstFile.id);
            setCode(firstFile.file_content || '');
            setLanguage(firstFile.language || 'javascript');
          }
        } else {
          // Create default files for new project
          const defaultFiles: FileItem[] = [
            {
              id: '1',
              filename: 'main.js',
              file_content: `// Welcome to ${projectName || 'Your Project'}\n\nconsole.log('Hello, World!');`,
              language: 'javascript'
            },
            {
              id: '2',
              filename: 'README.md',
              file_content: `# ${projectName || 'My Project'}\n\n## Description\n\nStart coding here!`,
              language: 'markdown'
            }
          ];
          setFiles(defaultFiles);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFiles));
          
          // Open first file
          setOpenFiles([defaultFiles[0]]);
          setActiveFileId(defaultFiles[0].id);
          setCode(defaultFiles[0].file_content);
          setLanguage(defaultFiles[0].language);
        }
      } catch (error) {
        console.error('Error loading files:', error);
        toast({
          title: 'Error',
          description: 'Failed to load files',
          variant: 'destructive'
        });
      }
    };

    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  // Save files to localStorage
  const saveFiles = (newFiles: FileItem[]) => {
    setFiles(newFiles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
  };

  // Save current file content
  const saveCurrentFile = () => {
    if (!activeFileId) return;

    const updatedFiles = files.map(file => 
      file.id === activeFileId 
        ? { ...file, file_content: code, language }
        : file
    );
    
    saveFiles(updatedFiles);
    
    // Update open files
    setOpenFiles(prev => 
      prev.map(file => 
        file.id === activeFileId 
          ? { ...file, file_content: code, language }
          : file
      )
    );
  };

  // Auto-save on code change
  useEffect(() => {
    if (activeFileId && code !== undefined) {
      const timeoutId = setTimeout(() => {
        saveCurrentFile();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language, activeFileId]);

  const handleFileSelect = (file: FileItem) => {
    // Save current file before switching
    saveCurrentFile();
    
    // Check if file is already open
    const isAlreadyOpen = openFiles.some(f => f.id === file.id);
    
    if (!isAlreadyOpen) {
      setOpenFiles([...openFiles, file]);
    }
    
    setActiveFileId(file.id);
    setCode(file.file_content || '');
    setLanguage(file.language || 'javascript');
  };

  const handleFileClose = (fileId: string) => {
    const fileToClose = openFiles.find(f => f.id === fileId);
    if (fileToClose) {
      // Save before closing
      const updatedFiles = files.map(file => 
        file.id === fileId 
          ? { ...file, file_content: fileToClose.file_content, language: fileToClose.language }
          : file
      );
      saveFiles(updatedFiles);
    }

    const newOpenFiles = openFiles.filter(f => f.id !== fileId);
    setOpenFiles(newOpenFiles);

    if (activeFileId === fileId) {
      if (newOpenFiles.length > 0) {
        const nextFile = newOpenFiles[newOpenFiles.length - 1];
        setActiveFileId(nextFile.id);
        setCode(nextFile.file_content || '');
        setLanguage(nextFile.language || 'javascript');
      } else {
        setActiveFileId(null);
        setCode('');
      }
    }
  };

  const handleCreateFile = (filename: string, fileContent: string = '', fileLanguage: string = 'javascript') => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      filename,
      file_content: fileContent,
      language: fileLanguage
    };

    const updatedFiles = [...files, newFile];
    saveFiles(updatedFiles);
    
    // Open the new file
    setOpenFiles([...openFiles, newFile]);
    setActiveFileId(newFile.id);
    setCode(newFile.file_content);
    setLanguage(newFile.language);

    toast({
      title: 'Success',
      description: `File "${filename}" created`
    });
  };

  const handleDeleteFile = (fileId: string, filename: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return;

    const updatedFiles = files.filter(f => f.id !== fileId);
    saveFiles(updatedFiles);
    
    // Close if open
    handleFileClose(fileId);

    toast({
      title: 'Success',
      description: `File "${filename}" deleted`
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (activeFileId) {
      const updatedFiles = files.map(file => 
        file.id === activeFileId 
          ? { ...file, language: newLanguage }
          : file
      );
      saveFiles(updatedFiles);
    }
  };

  const runCode = async () => {
    if (!activeFileId || !code.trim()) {
      toast({
        title: 'Error',
        description: 'No code to run',
        variant: 'destructive'
      });
      return;
    }

    setIsRunning(true);
    setOutput('Running...\n');

    try {
      // Simple code execution simulation
      // In a real app, this would call a backend API
      setTimeout(() => {
        setOutput(`Code executed successfully!\nLanguage: ${language}\n\nOutput:\n${code}`);
        setIsRunning(false);
      }, 1000);
    } catch (error) {
      setOutput(`Error: ${error}`);
      setIsRunning(false);
    }
  };

  const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'javascript',
      'tsx': 'javascript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'html': 'html',
      'css': 'css',
      'md': 'markdown',
      'json': 'json',
    };
    return langMap[ext || ''] || 'javascript';
  };

  const handleCreateFileClick = () => {
    setIsCreating(true);
  };

  const handleCreateFileSubmit = () => {
    if (!newFileName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a filename',
        variant: 'destructive'
      });
      return;
    }

    const language = getLanguageFromFilename(newFileName);
    handleCreateFile(newFileName, '', language);
    setNewFileName('');
    setIsCreating(false);
  };

  const activeFile = openFiles.find(f => f.id === activeFileId);

  return (
    <div className="flex-1 flex h-full">
      <div className="w-56">
        <div className="h-full bg-secondary/20 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Files</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={handleCreateFileClick}
              title="New File"
            >
              <FilePlus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {isCreating && (
              <div className="mb-2 flex gap-1">
                <Input
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="filename.ext"
                  className="h-7 text-xs"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateFileSubmit();
                    if (e.key === 'Escape') {
                      setIsCreating(false);
                      setNewFileName('');
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={handleCreateFileSubmit}
                >
                  <FilePlus className="h-3 w-3" />
                </Button>
              </div>
            )}

            {files.length === 0 && !isCreating && (
              <div className="text-xs text-muted-foreground text-center py-4">
                No files yet. Click + to create one.
              </div>
            )}

            {files.map((file) => (
              <div
                key={file.id}
                className={`group flex items-center justify-between px-2 py-1.5 rounded hover:bg-secondary/50 cursor-pointer mb-1 ${
                  activeFileId === file.id ? 'bg-secondary' : ''
                }`}
                onClick={() => handleFileSelect(file)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Code2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs truncate">{file.filename}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file.id, file.filename);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-secondary/30 border-b border-border">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {projectName || 'Workspace'} {activeFile ? `- ${activeFile.filename}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={handleLanguageChange} disabled={!activeFileId}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={runCode} disabled={isRunning || !activeFileId} size="sm" className="h-8">
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
          </div>
        </div>

        <FileTabs
          openFiles={openFiles}
          activeFile={activeFileId}
          onFileSelect={handleFileSelect}
          onFileClose={handleFileClose}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {activeFileId ? (
            <>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-sm bg-background text-foreground border-0 resize-none focus:outline-none"
                placeholder="Start typing your code here..."
                spellCheck={false}
              />
              {output && (
                <div className="border-t border-border bg-secondary/20 p-4">
                  <div className="text-sm font-mono whitespace-pre-wrap text-foreground">
                    {output}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a file to start editing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

