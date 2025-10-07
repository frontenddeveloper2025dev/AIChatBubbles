import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MessageBubble } from "@/components/ui/message-bubble";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@shared/schema";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages", sessionId],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/messages", {
        content,
        role: "user",
        sessionId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", sessionId] });
      setMessage("");
      adjustTextareaHeight();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message"
      });
    }
  });

  const clearChatMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", `/api/messages/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", sessionId] });
      toast({
        title: "Success",
        description: "Chat history cleared"
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear chat history"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sendMessageMutation.isPending]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-chat-gradient flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <i className="fas fa-robot text-white text-2xl animate-pulse"></i>
          </div>
          <p className="text-white text-lg font-medium">Connecting to AI...</p>
          <div className="flex justify-center space-x-1 mt-3">
            <div 
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce" 
              style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce" 
              style={{ animationDelay: '150ms', animationDuration: '1.4s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce" 
              style={{ animationDelay: '300ms', animationDuration: '1.4s' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chat-gradient relative overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto bg-white/10 backdrop-blur-sm">
        {/* Header */}
        <header className="bg-white/20 backdrop-blur-md border-b border-white/20 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-message-gradient rounded-xl flex items-center justify-center">
                <i className="fas fa-robot text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-white text-lg font-semibold">AI Assistant</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-sm">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => clearChatMutation.mutate()}
                disabled={clearChatMutation.isPending}
              >
                <i className="fas fa-trash text-white/80"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-start space-x-3 animate-slide-in-left">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-robot text-gray-600 text-sm"></i>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-md shadow-lg">
                <p className="text-gray-800">Hello! I'm your AI assistant. How can I help you today?</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {sendMessageMutation.isPending && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 md:p-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
              <div className="flex items-end space-x-2 p-2">
                <button 
                  type="button"
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <i className="fas fa-paperclip text-gray-500"></i>
                </button>
                
                <div className="flex-1 relative">
                  <textarea 
                    ref={textareaRef}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    rows={1}
                    className="w-full resize-none border-0 outline-none bg-transparent text-gray-800 placeholder-gray-500 py-3 px-2 max-h-32"
                    style={{ minHeight: '24px' }}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="bg-message-gradient hover:opacity-90 disabled:opacity-50 p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <i className="fas fa-paper-plane text-white"></i>
                </button>
              </div>
              
              {/* Character Counter and Status */}
              <div className="px-4 pb-2 flex items-center justify-between text-xs text-gray-500">
                <span>{message.length}</span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Connected</span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
