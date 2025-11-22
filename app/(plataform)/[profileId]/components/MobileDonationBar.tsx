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

export function MobileDonationBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed bottom bar - visible only on mobile/tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Faça a diferença</p>
              <p className="text-lg font-bold truncate">Apoie este projeto</p>
            </div>
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="shrink-0"
            >
              <Heart className="w-4 h-4 mr-2" />
              Doar
            </Button>
          </div>
        </div>
      </div>

      {/* Full screen donation modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lg:hidden max-w-full w-full h-full max-h-screen p-0 m-0">
          <DialogHeader className="px-4 py-2 h-14 border-b flex items-center justify-center">
            <DialogTitle className="text-xl">Escolha como apoiar</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto h-screen px-4 pb-6">
            <DonationCard />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
