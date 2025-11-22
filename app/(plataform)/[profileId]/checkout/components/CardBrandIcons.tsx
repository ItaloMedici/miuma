import type { CardBrand } from "@/interfaces/checkout";
import { siAmericanexpress, siDiscover, siVisa } from "simple-icons";

// Custom Elo icon (not available in simple-icons)
const eloIcon = {
  path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7 0c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
  hex: "FFCB05",
  title: "Elo",
};

interface CardBrandIconsProps {
  brand: CardBrand;
  className?: string;
}

export function CardBrandIcons({ brand, className = "" }: CardBrandIconsProps) {
  if (brand === "unknown") {
    return null;
  }

  // Custom Mastercard with overlapping circles
  if (brand === "mastercard") {
    return (
      <div className={`w-12 h-8 flex items-center justify-center ${className}`}>
        <svg
          role="img"
          viewBox="0 0 48 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <title>Mastercard</title>
          <rect width="48" height="32" rx="4" fill="transparent" />
          <circle cx="18" cy="16" r="9" fill="#EB001B" />
          <circle cx="30" cy="16" r="9" fill="#F79E1B" />
        </svg>
      </div>
    );
  }

  const iconMap = {
    visa: {
      path: siVisa.path,
      hex: siVisa.hex,
      title: siVisa.title,
    },
    amex: {
      path: siAmericanexpress.path,
      hex: siAmericanexpress.hex,
      title: siAmericanexpress.title,
    },
    discover: {
      path: siDiscover.path,
      hex: siDiscover.hex,
      title: siDiscover.title,
    },
    elo: eloIcon,
  };

  const icon = iconMap[brand as keyof typeof iconMap];

  if (!icon) {
    return null;
  }

  return (
    <div className={`w-12 h-8 flex items-center justify-center ${className}`}>
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        fill={`#${icon.hex}`}
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    </div>
  );
}
