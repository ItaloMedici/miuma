import type { CardBrand } from "@/interfaces/checkout";
import creditCardType from "credit-card-type";

/**
 * Map credit-card-type brands to CardBrand type
 */
export function mapCardType(type: string): CardBrand {
  const typeMap: Record<string, CardBrand> = {
    visa: "visa",
    mastercard: "mastercard",
    "american-express": "amex",
    discover: "discover",
    elo: "elo",
  };

  return typeMap[type] || "unknown";
}

/**
 * Detect card brand using credit-card-type library
 */
export function detectCardBrand(cardNumber: string): CardBrand {
  const cleanNumber = cardNumber.replace(/\s/g, "");
  const cards = creditCardType(cleanNumber);

  if (cards.length > 0) {
    return mapCardType(cards[0].type);
  }

  return "unknown";
}

/**
 * Get card info from credit-card-type library
 */
export function getCardInfo(cardNumber: string) {
  const cards = creditCardType(cardNumber);

  if (cards.length > 0) {
    return cards[0];
  }

  return null;
}

/**
 * Get CVC length for detected card (3 or 4 digits)
 */
export function getCvcLength(cardNumber: string): number {
  const cardInfo = getCardInfo(cardNumber);
  if (cardInfo && cardInfo.code) {
    return cardInfo.code.size;
  }
  // Default: 3 digits
  return 3;
}

/**
 * Format card number with brand-specific spacing
 */
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const cardInfo = getCardInfo(cleaned);

  if (cardInfo && cardInfo.gaps) {
    const chunks: string[] = [];
    let lastIndex = 0;

    for (const gap of cardInfo.gaps) {
      if (gap <= cleaned.length) {
        chunks.push(cleaned.substring(lastIndex, gap));
        lastIndex = gap;
      }
    }
    if (lastIndex < cleaned.length) {
      chunks.push(cleaned.substring(lastIndex));
    }

    return chunks.filter((c) => c).join(" ");
  }

  // Default formatting (4-4-4-4)
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(" ");
}

/**
 * Validate card number using Luhn algorithm
 */
export function isValidCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, "");
  if (cleaned.length < 13) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Format expiration date as MM / YY
 */
export function formatExpirationDate(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.substring(0, 2)} / ${cleaned.substring(2, 4)}`;
  }
  return cleaned;
}
