import { Check } from "lucide-react";

export function StepsIndicator() {
  return (
    <div className="relative mb-6 flex items-center justify-between px-2 md:mb-10">
      <div className="bg-muted absolute top-1/2 left-0 -z-10 -mt-0.5 h-0.5 w-full" />

      {/* Step 1: Details (Done) */}
      <div className="bg-background flex flex-col items-center gap-1 px-1 md:gap-2 md:px-2">
        <div className="bg-primary text-primary-foreground shadow-primary/20 flex h-6 w-6 items-center justify-center rounded-full shadow-sm md:h-7 md:w-7">
          <Check className="h-3 w-3 md:h-4 md:w-4" />
        </div>
        <span className="text-foreground text-[10px] font-medium md:text-xs">
          Detalhes
        </span>
      </div>

      {/* Step 2: Payment (Active) */}
      <div className="bg-background flex flex-col items-center gap-1 px-1 md:gap-2 md:px-2">
        <div className="bg-foreground text-background ring-muted flex h-6 w-6 items-center justify-center rounded-full ring-2 md:h-7 md:w-7 md:ring-4">
          <span className="text-[10px] font-medium md:text-xs">2</span>
        </div>
        <span className="text-foreground text-[10px] font-medium md:text-xs">
          Pagamento
        </span>
      </div>

      {/* Step 3: Review (Pending) */}
      <div className="bg-background flex flex-col items-center gap-1 px-1 md:gap-2 md:px-2">
        <div className="bg-background border-border text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full border-2 md:h-7 md:w-7">
          <span className="text-[10px] font-medium md:text-xs">3</span>
        </div>
        <span className="text-muted-foreground text-[10px] font-medium md:text-xs">
          Revisão
        </span>
      </div>
    </div>
  );
}
