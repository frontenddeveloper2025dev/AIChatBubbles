import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-gray-600 text-sm"></i>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg">
        <div className="flex space-x-1">
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
            style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
          ></div>
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
            style={{ animationDelay: '150ms', animationDuration: '1.4s' }}
          ></div>
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
            style={{ animationDelay: '300ms', animationDuration: '1.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
