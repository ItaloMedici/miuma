import { cn } from "@/lib/utils";
import { Check, CheckCircle2, Copy, Info } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";

type CopyFieldProps = {
  value: string;
  title: string;
  supportMessage?:
    | {
        copied: string;
        default: string;
      }
    | "hide";
};

export const CopyField = ({
  value,
  title,
  supportMessage = { copied: "Copiado", default: "Clique para copiar" },
}: CopyFieldProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <InputGroup onClick={handleCopy}>
        <InputGroupInput value={value} readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={title}
            title={title}
            size="icon-xs"
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {supportMessage !== "hide" && (
        <span
          className={cn(
            "text-muted-foreground mt-2 flex items-center gap-1 text-xs",
            {
              "text-green-600": copied,
            }
          )}
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-3 w-3" /> {supportMessage.copied}
            </>
          ) : (
            <>
              <Info className="h-3 w-3" /> {supportMessage.default}
            </>
          )}
        </span>
      )}
    </div>
  );
};
