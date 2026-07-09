"use client";

import { useRef, type ReactNode } from "react";
import { CopyButton } from "@/lib/components/copy-button";

interface PreProps {
  children: ReactNode;
}

export function Pre({ children }: PreProps) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <pre ref={ref}>
      <div className="absolute top-2 right-2 z-10">
        <CopyButton getText={() => ref.current?.textContent ?? ""} />
      </div>
      {children}
    </pre>
  );
}
