"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group corner-squircle bg-background"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "corner-squircle",
        },
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-2xl)",

          "--success-border": "var(--border)",
          "--success-bg": "var(----background-to-green)",
          "--success-text": "var(--color-green-700)",

          "--error-border": "var(--border)",
          "--error-bg": "var(--background-to-red)",
          "--error-text": "var(--color-red-700)",

          "--warning-border": "var(--border)",
          "--warning-bg": "var(----background-to-warning)",
          "--warning-text": "var(--color-yellow-700)",

          "--info-border": "var(--border)",
          "--info-bg": "var(--background)",
          "--info-text": "var(--color-blue-800)",

          "--loading-border": "var(--border)",
          "--loading-bg": "var(--background)",
          "--loading-text": "var(--foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
