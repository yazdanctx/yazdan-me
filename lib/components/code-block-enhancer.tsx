"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function CodeBlockEnhancer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll<HTMLPreElement>("pre");
    pres.forEach((pre) => {
      if (pre.dataset.enhanced) return;
      pre.dataset.enhanced = "true";

      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement("button");
      btn.className =
        "absolute top-1.5 right-1.5 z-9 h-7 w-7 inline-flex items-center justify-center whitespace-nowrap text-xs transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground";
      btn.setAttribute("aria-label", "Copy code");
      const copyIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
      const checkIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
      btn.innerHTML = copyIcon;

      let copied = false;
      btn.addEventListener("click", async () => {
        if (copied) return;
        const text = pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
          btn.innerHTML = checkIcon;
          setTimeout(() => {
            copied = false;
            btn.innerHTML = copyIcon;
          }, 3000);
        } catch {}
      });

      wrapper.appendChild(btn);
    });
  }, []);

  return <div ref={ref} className="overflow-hidden">{children}</div>;
}
