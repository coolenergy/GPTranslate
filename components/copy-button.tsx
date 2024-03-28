"use client";
import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  text: string;
} & React.ComponentProps<typeof Button>;

export default function CopyButton({ className, text }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <Button onClick={copy} className={className} variant="outline" size="icon">
      {isCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Clipboard className="h-4 w-4" />
      )}
    </Button>
  );
}
