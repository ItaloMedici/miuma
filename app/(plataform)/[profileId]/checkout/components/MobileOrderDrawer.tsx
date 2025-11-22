"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CheckoutPageProps } from "@/interfaces/checkout";
import { formatCurrency } from "@/lib/utils/currency";
import { ChevronUp, Info } from "lucide-react";
import { useState } from "react";
import { OrderSummaryContent } from "./OrderSummaryContent";

export const MobileOrderDrawer = ({
  orderSummary,
}: {
  orderSummary: CheckoutPageProps["orderSummary"];
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-background/20 backdrop-blur-[2px] z-40 md:hidden" />
      )}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Detalhes do Pedido</DrawerTitle>
            </DrawerHeader>
            <div className="pb-8 px-4">
              <OrderSummaryContent orderSummary={orderSummary} />
            </div>
          </div>
        </DrawerContent>

        <div className="fixed bottom-0 left-0 right-0 w-full bg-background/95 backdrop-blur-sm border-t border-border p-3 sm:p-4 md:hidden z-40 shadow-lg">
          <div className="flex items-center justify-between max-w-md mx-auto gap-3">
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] uppercase tracking-wider font-medium text-muted-foreground">
                Total
              </span>
              <span className="text-base sm:text-lg font-bold text-foreground leading-none mt-0.5">
                {formatCurrency(orderSummary.total)}{" "}
                <span className="text-xs font-light text-muted-foreground">
                  /mês
                </span>
              </span>
            </div>

            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium shrink-0 h-9"
              >
                <Info className="w-3 h-3 mr-1.5" />
                Ver Pedido
                <ChevronUp className="w-3 h-3 ml-1.5" />
              </Button>
            </DrawerTrigger>
          </div>
        </div>
      </Drawer>
    </>
  );
};
