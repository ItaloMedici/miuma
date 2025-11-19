/**
 * Formats a number as Brazilian Real currency.
 * @param amount - The numeric amount to format
 * @returns A string representing the formatted currency
 * @example
 * formatCurrency(1500); // R$ 1.500,00
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};
