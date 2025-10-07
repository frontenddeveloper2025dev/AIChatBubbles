import { cn } from "@/lib/utils";
import { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export function MessageBubble({ message, className }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={cn(
        "flex items-start space-x-3 animate-slide-in",
        isUser ? "justify-end animate-slide-in-right" : "animate-slide-in-left",
        className
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-robot text-gray-600 text-sm"></i>
        </div>
      )}
      
      <div 
        className={cn(
          "rounded-2xl px-4 py-3 max-w-md shadow-lg",
          isUser 
            ? "bg-message-gradient rounded-tr-sm text-white" 
            : "bg-white/90 backdrop-blur-sm rounded-tl-sm text-gray-800"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span 
          className={cn(
            "text-xs mt-1 block",
            isUser ? "text-white/80 text-right" : "text-gray-500"
          )}
        >
          {timestamp}
        </span>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-white text-sm"></i>
        </div>
      )}
    </div>
  );
}
