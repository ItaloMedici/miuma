import { CheckoutOrderSummary } from "@/interfaces/checkout";

interface CreateCheckoutInput {
  type: "one-time" | "recurring";
  amount: number;
  title: string;
  description: string;
}

// Platform fee: 5% + Gateway fee: 3.99% + R$0.40
const PLATFORM_FEE_PERCENT = 0.05;
const GATEWAY_FEE_PERCENT = 0.0399;
const GATEWAY_FIXED_FEE = 0.4;

function calculateOrderSummary(
  input: CreateCheckoutInput
): CheckoutOrderSummary {
  const subtotal = input.amount;
  const platformFee = subtotal * PLATFORM_FEE_PERCENT;
  const gatewayFee = subtotal * GATEWAY_FEE_PERCENT + GATEWAY_FIXED_FEE;
  const totalFee = platformFee + gatewayFee;
  const total = subtotal + totalFee;

  return {
    title: input.title,
    description: input.description,
    type: input.type,
    subtotal,
    platformFee,
    gatewayFee,
    gatewayFeePercent: GATEWAY_FEE_PERCENT * 100,
    totalFee,
    total,
  };
}

async function getCheckoutByProfileSlug(
  profileSlug: string,
  donationType: "one-time" | "recurring",
  amount: number
): Promise<CheckoutOrderSummary> {
  // In the future, fetch caregiver data and create personalized checkout
  // For now, return a calculated order summary

  const title = donationType === "recurring" ? "Doação Mensal" : "Doação Única";
  const description =
    donationType === "recurring"
      ? "Apoio recorrente para ajudar pets resgatados"
      : "Doação pontual para ajudar pets resgatados";

  return calculateOrderSummary({
    type: donationType,
    amount,
    title,
    description,
  });
}

export const checkoutUseCases = {
  getCheckoutByProfileSlug,
  calculateOrderSummary,
};
