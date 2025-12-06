"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function useBeforeUnload(
  hasUnsavedChanges: boolean,
  message = "Você tem alterações não salvas no formulário. Deseja realmente sair?",
  enabled = true
) {
  const router = useRouter();
  const messageRef = useRef(message);

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  useEffect(() => {
    if (!hasUnsavedChanges || !enabled) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return "";
    };

    const handlePopState = () => {
      if (confirm(messageRef.current)) {
        return;
      }

      window.history.pushState(null, "", window.location.href);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href && !anchor.target) {
        const url = new URL(anchor.href, window.location.origin);

        if (url.origin === window.location.origin) {
          e.preventDefault();

          if (confirm(messageRef.current)) {
            window.location.href = anchor.href;
          }
        }
      }
    };

    window.history.pushState(null, "", window.location.href);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick, true);
    };
  }, [hasUnsavedChanges, enabled]);

  const safeNavigate = (href: string) => {
    if (hasUnsavedChanges) {
      if (confirm(messageRef.current)) {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return { safeNavigate };
}
