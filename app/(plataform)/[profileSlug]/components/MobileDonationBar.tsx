"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { DonationCard } from "./DonationCard";
import { ShareProfileDrawer } from "./ShareProfile";
import { useCaregiverProfile } from "./context";

export function MobileDonationBar() {
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
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
              <p className="text-muted-foreground text-xs">Faça a diferença</p>
              <p className="text-md truncate font-bold">Apoie este projeto</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => setShareOpen(true)}
                aria-label="Compartilhar perfil"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button onClick={() => setOpen(true)} className="shrink-0">
                <Heart className="mr-1 h-4 w-4" />
                Doar
              </Button>
            </div>
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

      {/* Share Profile Component */}
      <ShareProfileDrawer open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
