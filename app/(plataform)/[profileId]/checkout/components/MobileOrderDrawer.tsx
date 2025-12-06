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
        <div className="bg-background/20 fixed inset-0 z-40 backdrop-blur-[2px] md:hidden" />
      )}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Detalhes do Pedido</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8">
              <OrderSummaryContent orderSummary={orderSummary} />
            </div>
          </div>
        </DrawerContent>

        <div className="bg-background/95 border-border fixed right-0 bottom-0 left-0 z-40 w-full border-t p-3 shadow-lg backdrop-blur-sm sm:p-4 md:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col">
              <span className="text-muted-foreground text-[9px] font-medium tracking-wider uppercase">
                Total
              </span>
              <span className="text-foreground mt-0.5 text-base leading-none font-bold sm:text-lg">
                {formatCurrency(orderSummary.total)}{" "}
                <span className="text-muted-foreground text-xs font-light">
                  /mês
                </span>
              </span>
            </div>

            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 shrink-0 text-xs font-medium"
              >
                <Info className="mr-1.5 h-3 w-3" />
                Ver Pedido
                <ChevronUp className="ml-1.5 h-3 w-3" />
              </Button>
            </DrawerTrigger>
          </div>
        </div>
      </Drawer>
    </>
  );
};
