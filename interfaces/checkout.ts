export interface CheckoutOrderSummary {
  title: string;
  description: string;
  type: "one-time" | "recurring";
  subtotal: number;
  totalFee: number;
  platformFee: number;
  gatewayFee: number;
  gatewayFeePercent: number;
  total: number;
}

export interface CheckoutPageProps {
  id: string;
  orderSummary: CheckoutOrderSummary;
  caregiverName?: string;
  returnUrl?: string;
}

export interface PaymentFormData {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardholderName: string;
  document: string;
  saveCard: boolean;
}

export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "elo"
  | "unknown";
