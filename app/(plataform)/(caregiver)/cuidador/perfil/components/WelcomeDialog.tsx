"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, PartyPopper } from "lucide-react";
import { useState } from "react";
import { useOnboarding } from "../context";

export const WelcomeDialog = () => {
  const { inititalCaregiver, user } = useOnboarding();
  const [open, setOpen] = useState(true);

  if (inititalCaregiver || !open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className="w-[90vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-start text-lg sm:text-2xl">
            <PartyPopper className="text-muted-foreground mr-2 inline-block h-4 w-4 sm:mr-3" />
            Bem-vindo {user.name}!
          </DialogTitle>
          <DialogDescription className="text-start">
            Configure seu perfil e conte sobre os animais que você cuida.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-muted-foreground mb-3 text-sm font-medium">
              Como funciona:
            </h3>
            <ol className="text-muted-foreground space-y-2.5 text-sm">
              <li className="flex gap-2">
                <span className="text-muted-foreground font-medium">1.</span>
                <span>
                  Adicione informações sobre os animais sob seu cuidado
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground font-medium">2.</span>
                <span>
                  Complete seu perfil com experiência e disponibilidade
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground font-medium">3.</span>
                <span>Após validação, você ficará visível para apoiadores</span>
              </li>
            </ol>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="w-full sm:w-auto">
            Começar agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
