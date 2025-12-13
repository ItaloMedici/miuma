"use client";

import { CopyField } from "@/components/copy-field";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCaregiverProfile } from "./context";

interface ShareOption {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  ariaLabel: string;
}

interface ShareProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareProfileDrawer = ({
  open,
  onOpenChange,
}: ShareProfileProps) => {
  const { profile } = useCaregiverProfile();

  const profileUrl = `${env.NEXT_PUBLIC_URL}/${profile.id}`;
  const shareTitle = `${profile.name} — Cuidador de animais na Miuma`;
  const shareText = `Conheça ${profile.name}, cuidador de animais em ${profile.location}. Ajude a fazer a diferença!`;

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: profileUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Erro ao compartilhar");
        }
      }
    }
  };

  const shareOptions: ShareOption[] = [
    {
      name: "WhatsApp",
      icon: <Icons.Whatsapp className="h-5 w-5" />,
      onClick: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${profileUrl}`)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      color: "bg-green-50 text-green-600",
      ariaLabel: "Compartilhar no WhatsApp",
    },
    {
      name: "Facebook",
      icon: <Icons.Facebook className="h-5 w-5" />,
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      color: "bg-blue-50 text-blue-600",
      ariaLabel: "Compartilhar no Facebook",
    },
    {
      name: "Twitter",
      icon: <Icons.Twitter className="h-5 w-5" />,
      onClick: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      color: "bg-slate-50 text-black",
      ariaLabel: "Compartilhar no Twitter",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      onClick: () => {
        const subject = encodeURIComponent(shareTitle);
        const body = encodeURIComponent(`${shareText}\n\n${profileUrl}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
      },
      color: "bg-gray-50 text-gray-600",
      ariaLabel: "Compartilhar por Email",
    },
  ];

  // Check if Web Share API is available (mobile first)
  const hasWebShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Compartilhar perfil</DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto space-y-4 px-4 pb-6 md:pb-24">
          <CopyField
            value={profileUrl as string}
            title="Copiar URL do perfil"
            supportMessage={"hide"}
          />

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm font-medium">
              Compartilhar via
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.onClick}
                  className={cn(
                    "flex cursor-pointer flex-col items-center rounded-lg p-4",
                    option.color
                  )}
                  aria-label={option.ariaLabel}
                >
                  {option.icon}
                </button>
              ))}
            </div>
          </div>

          {hasWebShare && (
            <Button
              onClick={shareViaWebShare}
              variant="outline"
              className="w-full"
              aria-label="Abrir opções de compartilhamento do sistema"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Mais opções de compartilhamento
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const ShareButton = ({ className }: { className?: string }) => {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShareOpen(true)}
        aria-label="Compartilhar perfil"
        className={className}
      >
        <Share2 className="mr-2 h-4 w-4" /> Compartilhar
      </Button>
      <ShareProfileDrawer open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
};
