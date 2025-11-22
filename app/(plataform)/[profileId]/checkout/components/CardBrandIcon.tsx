import type { CardBrand } from "@/interfaces/checkout";
import { cn } from "@/lib/utils";

export function CardBrandIcon({ brand }: { brand: CardBrand }) {
  const brands = [
    { name: "visa", active: brand === "visa" },
    { name: "mastercard", active: brand === "mastercard" },
    { name: "amex", active: brand === "amex" },
    { name: "discover", active: brand === "discover" },
  ];

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
      {brands.slice(0, 2).map((b) => (
        <div
          key={b.name}
          className={cn(
            "w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold transition-all",
            b.active
              ? "bg-primary/20 text-primary ring-1 ring-primary/50"
              : "bg-muted text-muted-foreground opacity-40"
          )}
        >
          {b.name === "visa" && "VISA"}
          {b.name === "mastercard" && "MC"}
        </div>
      ))}
    </div>
  );
}
