import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { callCodeCopilot } from "@/lib/copilots";

export default function Copilots() {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    const userMessage = message.trim();
    setMessage("");
    setLoading(true);

    // Add user message to conversation
    const newConversation = [...conversation, { role: 'user' as const, content: userMessage }];
    setConversation(newConversation);

    try {
      const result = await callCodeCopilot(userMessage);

      if (result.success) {
        const assistantResponse = result.response;
        setResponse(assistantResponse);
        setConversation([...newConversation, { role: 'assistant' as const, content: assistantResponse }]);
        toast({
          title: "Success",
          description: "AI Copilot responded!",
        });
      } else {
        const errorMsg = result.error || "Failed to get response";
        throw new Error(errorMsg);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to call copilot";
      // Better error message for OpenAI API issues
      let errorResponse = `❌ Error: ${errorMsg}\n\n`;
      
      if (errorMsg.includes('API key') || errorMsg.includes('OPENAI_API_KEY')) {
        errorResponse += `Make sure your OpenAI API key is set in server/.env file:\nOPENAI_API_KEY=your_api_key_here\n\n`;
        errorResponse += `Get your API key from: https://platform.openai.com/api-keys\n\n`;
      }
      
      errorResponse += `Make sure the backend server is running on port 3001.\n\nTo start the server, run:\ncd server\nnpm start`;
      
      setResponse(errorResponse);
      setConversation([...newConversation, { role: 'assistant' as const, content: errorResponse }]);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearConversation = () => {
    setConversation([]);
    setResponse("");
    setMessage("");
  };

  return (
    <div className="min-h-screen p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] flex items-center justify-center shadow-glow-purple">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
            AI Copilot
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Your intelligent assistant for code, meetings, design, learning, and workflow
        </p>
      </div>

      <GlassCard className="p-6 space-y-4 max-w-4xl mx-auto">
        {/* Conversation History */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {conversation.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] flex items-center justify-center mx-auto shadow-glow-purple">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                <p className="text-muted-foreground">
                  Ask me anything about coding, design, workflows, meetings, or learning.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {[
                  "How do I create a React component?",
                  "Suggest a color palette for dark theme",
                  "Explain JavaScript closures",
                  "Plan a sprint for a web app",
                ].map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => setMessage(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            conversation.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white'
                      : 'bg-secondary/50 border border-border'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {msg.role === 'assistant' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">
                        {msg.role === 'user' ? 'You' : 'AI Copilot'}
                      </div>
                      <div className="text-sm whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-secondary/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask your AI Copilot anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={loading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !message.trim()}
              className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:opacity-90"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
            {conversation.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearConversation}
                disabled={loading}
              >
                Clear
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </GlassCard>

      <Footer />
    </div>
  );
}
