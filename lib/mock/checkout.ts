import type { CheckoutOrderSummary } from "@/interfaces/checkout";

export const mockCheckoutData: CheckoutOrderSummary = {
  title: "Apoio Mensal",
  description: "Alimentação e cuidados semanais",
  type: "recurring",
  subtotal: 35.0,
  platformFee: 0.7,
  gatewayFee: 1.0,
  gatewayFeePercent: 2.86,
  totalFee: 1.7,
  total: 35.7,
};
