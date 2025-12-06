"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCaregiverProfile } from "./context";

export function CaregiverDescription() {
  const { descriptionMarkdown } = useCaregiverProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionAlreadyHasTitle = descriptionMarkdown?.includes("# ");

  return (
    <section>
      {!descriptionAlreadyHasTitle && (
        <h2 className="mb-6 text-xl font-bold md:text-2xl">Sobre mim</h2>
      )}
      <div className="relative">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-none" : "max-h-[250px] md:max-h-[400px]"
          }`}
        >
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {descriptionMarkdown || ""}
            </ReactMarkdown>
          </div>
        </div>

        {!isExpanded && (
          <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t to-transparent" />
        )}
      </div>

      <div className="flex justify-start md:mt-4">
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
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
    </section>
  );
}

export default CaregiverDescription;
