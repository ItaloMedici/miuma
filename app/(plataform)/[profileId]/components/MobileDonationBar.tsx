"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";
import { useState } from "react";
import { DonationCard } from "./DonationCard";
import { useCaregiverProfile } from "./context";

export function MobileDonationBar() {
  const [open, setOpen] = useState(false);
  const { billingInfo } = useCaregiverProfile();

  if (!billingInfo.isReadyForDonations) {
    return null;
  }

  return (
    <>
      {/* Fixed bottom bar - visible only on mobile/tablet */}
      <div className="bg-background border-border fixed right-0 bottom-0 left-0 z-50 border-t shadow-lg lg:hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-sm">Faça a diferença</p>
              <p className="truncate text-lg font-bold">Apoie este projeto</p>
            </div>
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="shrink-0"
            >
              <Heart className="mr-2 h-4 w-4" />
              Doar
            </Button>
          </div>
        </div>
      </div>

      {/* Full screen donation modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="m-0 h-full max-h-screen w-full max-w-full p-0 lg:hidden">
          <DialogHeader className="flex h-14 items-center justify-center border-b px-4 py-2">
            <DialogTitle className="text-xl">Escolha como apoiar</DialogTitle>
          </DialogHeader>
          <div className="h-screen overflow-y-auto px-4 pb-6">
            <DonationCard />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
