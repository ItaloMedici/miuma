import Image from "next/image";

import type { CheckoutPageProps } from "@/interfaces/checkout";
import { formatCurrency } from "@/lib/utils/currency";
import { Info } from "lucide-react";

export function OrderSummaryContent({
  orderSummary,
}: {
  orderSummary: CheckoutPageProps["orderSummary"];
}) {
  return (
    <div className="relative z-10 w-full h-full">
      <div className="hidden sm:flex items-center mb-6 md:mb-10">
        <Image
          src="/logo-horizontal.svg"
          alt="Logo"
          width={100}
          height={28}
          className="h-7 md:h-8 w-auto"
        />
      </div>

      <div className="space-y-8">
        <p className="hidden sm:block text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3 md:mb-4">
          Resumo do Pedido
        </p>

        <div className="pt-6 space-y-4">
          <div className="flex justify-between text-sm ">
            <span>Valor escolhido</span>
            <span className="font-medium">
              {formatCurrency(orderSummary.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm ">
            <span>
              Taxa provedor pagamento (
              {orderSummary.gatewayFeePercent.toFixed(2)}%)
            </span>
            <span className="font-medium">
              {formatCurrency(orderSummary.gatewayFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm ">
            <span>Taxa Operacional</span>
            <span className="font-medium">
              {formatCurrency(orderSummary.platformFee)}
            </span>
          </div>
          <div className="text-xs mt-2 md:mt-3 text-muted-foreground">
            <Info className="w-3 h-3 inline-block mr-1 mb-0.5" />
            As taxas cobrem os custos de processamento seguro do pagamento e
            manutenção da plataforma.
          </div>
        </div>

        {/* Total in Drawer (Mobile Only duplicate for context) */}
        <div className="border-t border-border pt-4 md:hidden">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium ">Total a pagar</span>
            <span className="text-xl font-bold tracking-tight text-foreground">
              {formatCurrency(orderSummary.total)}{" "}
              <span className="text-sm font-normal ">/mês</span>
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Total Section */}
      <div className="hidden md:block mt-auto">
        <div className="border-t border-border pt-6">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-muted-foreground">
              Total a pagar
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              {formatCurrency(orderSummary.total)}{" "}
              <span className="text-sm font-medium">/mês</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
