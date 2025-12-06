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
    <div className="absolute top-1/2 right-4 flex -translate-y-1/2 gap-2">
      {brands.slice(0, 2).map((b) => (
        <div
          key={b.name}
          className={cn(
            "flex h-5 w-8 items-center justify-center rounded text-[8px] font-bold transition-all",
            b.active
              ? "bg-primary/20 text-primary ring-primary/50 ring-1"
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
