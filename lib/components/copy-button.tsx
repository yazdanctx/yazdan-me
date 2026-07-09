"use client";

import { useState, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/lib/components/ui/button";

interface CopyButtonProps extends ComponentProps<typeof Button> {
  getText: () => string;
}

export function CopyButton({ getText, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      {...props}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}
