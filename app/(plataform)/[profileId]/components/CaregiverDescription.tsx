"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCaregiverProfile } from "./context";

export function CaregiverDescription() {
  const { descriptionMarkdown: description } = useCaregiverProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionAlreadyHasTitle = description?.includes("# ");

  return (
    <section>
      {!descriptionAlreadyHasTitle && (
        <h2 className="text-xl md:text-2xl font-bold mb-6">Sobre mim</h2>
      )}
      <div className="relative">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-none" : "max-h-[250px] md:max-h-[400px]"
          }`}
        >
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description || ""}
            </ReactMarkdown>
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      <div className="md:mt-4 flex justify-start">
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
