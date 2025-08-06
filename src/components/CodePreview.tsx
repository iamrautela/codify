
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, ExternalLink, CheckCircle } from "lucide-react";
import { useState } from "react";

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) {
    return (
      <Card className="glass h-[500px] p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-muted/30 flex items-center justify-center">
            <code className="text-2xl">{'{ }'}</code>
          </div>
          <div>
            <h3 className="font-semibold">No Code Generated Yet</h3>
            <p className="text-muted-foreground text-sm">Generate an app to see the code here</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="glass">
            React + TypeScript
          </Badge>
          <span className="text-sm text-muted-foreground">App.tsx</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="glass border-white/10"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
          
          <Button variant="ghost" size="sm" className="glass border-white/10">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          
          <Button variant="ghost" size="sm" className="glass border-white/10">
            <ExternalLink className="h-4 w-4 mr-1" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm leading-relaxed font-mono">
          <code className="text-foreground">
            {code}
          </code>
        </pre>
      </div>
    </Card>
  );
};

export default CodePreview;
