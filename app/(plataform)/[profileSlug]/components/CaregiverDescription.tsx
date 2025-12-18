"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCaregiverProfile } from "./context";

const DESKTOP_MAX_HEIGHT = 400;
const MOBILE_MAX_HEIGHT = 250;

const MEDIUM_WINDOW_WIDTH = 768;

export function CaregiverDescription() {
  const { descriptionMarkdown } = useCaregiverProfile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const descriptionAlreadyHasTitle = descriptionMarkdown?.includes("# ");

  const checkHeight = useEffectEvent(() => {
    if (contentRef.current) {
      const maxHeight =
        window.innerWidth >= MEDIUM_WINDOW_WIDTH
          ? DESKTOP_MAX_HEIGHT
          : MOBILE_MAX_HEIGHT;

      setShowExpandButton(contentRef.current.scrollHeight > maxHeight);
    }
  });

  useEffect(() => {
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [descriptionMarkdown]);

  return (
    <section>
      {!descriptionAlreadyHasTitle && (
        <h2 className="mb-6 text-xl font-bold md:text-2xl">Sobre mim</h2>
      )}
      <div className="relative">
        <div
          ref={contentRef}
          className={cn("overflow-hidden transition-all duration-300", {
            "max-h-[1000px]": isExpanded,
            [`max-h-[${MOBILE_MAX_HEIGHT}px] md:max-h-[${DESKTOP_MAX_HEIGHT}px]`]:
              !isExpanded,
          })}
        >
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {descriptionMarkdown || ""}
            </ReactMarkdown>
          </div>
        </div>

        {!isExpanded && showExpandButton && (
          <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t to-transparent" />
        )}
      </div>

      {showExpandButton && (
        <div className="flex justify-start md:mt-4">
          <Button
            variant="link"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full gap-2 sm:w-fit"
          >
            {isExpanded ? (
              <>
                Ver menos
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver mais
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}

export default CaregiverDescription;
