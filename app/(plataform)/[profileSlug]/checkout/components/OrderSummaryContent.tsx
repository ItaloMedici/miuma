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
    <div className="relative z-10 h-full w-full">
      <div className="mb-6 hidden items-center sm:flex md:mb-10">
        <Image
          src="/logo-horizontal.svg"
          alt="Logo"
          width={100}
          height={28}
          className="h-7 w-auto md:h-8"
        />
      </div>

      <div className="space-y-8">
        <p className="text-muted-foreground mb-3 hidden text-[10px] font-medium tracking-widest uppercase sm:block md:mb-4 md:text-xs">
          Resumo do Pedido
        </p>

        <div className="space-y-4 pt-6">
          <div className="flex justify-between text-sm">
            <span>Valor escolhido</span>
            <span className="font-medium">
              {formatCurrency(orderSummary.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>
              Taxa provedor pagamento (
              {orderSummary.gatewayFeePercent.toFixed(2)}%)
            </span>
            <span className="font-medium">
              {formatCurrency(orderSummary.gatewayFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa Operacional</span>
            <span className="font-medium">
              {formatCurrency(orderSummary.platformFee)}
            </span>
          </div>
          <div className="text-muted-foreground mt-2 text-xs md:mt-3">
            <Info className="mr-1 mb-0.5 inline-block h-3 w-3" />
            As taxas cobrem os custos de processamento seguro do pagamento e
            manutenção da plataforma.
          </div>
        </div>

        {/* Total in Drawer (Mobile Only duplicate for context) */}
        <div className="border-border border-t pt-4 md:hidden">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">Total a pagar</span>
            <span className="text-foreground text-xl font-bold tracking-tight">
              {formatCurrency(orderSummary.total)}{" "}
              <span className="text-sm font-normal">/mês</span>
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Total Section */}
      <div className="mt-auto hidden md:block">
        <div className="border-border border-t pt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground text-sm font-medium">
              Total a pagar
            </span>
            <span className="text-foreground text-xl font-semibold tracking-tight">
              {formatCurrency(orderSummary.total)}{" "}
              <span className="text-sm font-medium">/mês</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
