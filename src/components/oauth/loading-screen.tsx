import { Loader2, MessageCircleCode } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
}

export function LoadingScreen({
  message = "处理中...",
  submessage,
}: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative">
        <MessageCircleCode className="text-muted-foreground h-12 w-12" />
        <Loader2 className="text-primary absolute -right-1 -bottom-1 h-6 w-6 animate-spin" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium">{message}</p>
        {submessage && (
          <p className="text-muted-foreground text-xs">{submessage}</p>
        )}
      </div>
    </div>
  );
}
