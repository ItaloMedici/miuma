import { Check } from "lucide-react";

export function StepsIndicator() {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-10 relative px-2">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10 -mt-0.5" />

      {/* Step 1: Details (Done) */}
      <div className="flex flex-col items-center gap-1 md:gap-2 bg-background px-1 md:px-2">
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm shadow-primary/20">
          <Check className="w-3 h-3 md:w-4 md:h-4" />
        </div>
        <span className="text-[10px] md:text-xs font-medium text-foreground">
          Detalhes
        </span>
      </div>

      {/* Step 2: Payment (Active) */}
      <div className="flex flex-col items-center gap-1 md:gap-2 bg-background px-1 md:px-2">
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-foreground text-background flex items-center justify-center ring-2 md:ring-4 ring-muted">
          <span className="text-[10px] md:text-xs font-medium">2</span>
        </div>
        <span className="text-[10px] md:text-xs font-medium text-foreground">
          Pagamento
        </span>
      </div>

      {/* Step 3: Review (Pending) */}
      <div className="flex flex-col items-center gap-1 md:gap-2 bg-background px-1 md:px-2">
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-background border-2 border-border text-muted-foreground flex items-center justify-center">
          <span className="text-[10px] md:text-xs font-medium">3</span>
        </div>
        <span className="text-[10px] md:text-xs font-medium text-muted-foreground">
          Revisão
        </span>
      </div>
    </div>
  );
}
