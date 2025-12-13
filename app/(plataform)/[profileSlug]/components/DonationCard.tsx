"use client";

import { CopyField } from "@/components/copy-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Circle,
  HandHeart,
  Heart,
  Info,
  Pill,
  ShieldPlus,
  Stethoscope,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { subscribeMonthlySupporter } from "../action";
import { useCaregiverProfile } from "./context";

export function DonationCard() {
  const {
    billingInfo: { subscriptionPaymentStatus, isReadyForDonations },
  } = useCaregiverProfile();
  const canAcceptSubscriptions = subscriptionPaymentStatus === "READY";

  const [donationType, setDonationType] = useState<"monthly" | "once">(
    canAcceptSubscriptions ? "monthly" : "once"
  );

  if (!isReadyForDonations) {
    return null;
  }

  return (
    <Card className="sm:border-border relative overflow-hidden border-0 py-0 shadow-none sm:rounded-4xl sm:border">
      {/* Decorative blobs */}
      <div className="bg-primary/10 pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-60 blur-3xl" />
      <div className="bg-fourth/10 pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full opacity-60 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 space-y-6 p-0 sm:p-6">
        <div className="hidden justify-center sm:flex">
          <h2 className="text-lg font-semibold tracking-tight">
            Apoie este projeto
          </h2>
        </div>

        {canAcceptSubscriptions ? (
          <>
            <div className="bg-muted relative flex rounded-2xl p-1">
              <button
                onClick={() => setDonationType("monthly")}
                className={`flex-1 rounded-xl py-1 text-sm font-medium transition-all ${
                  donationType === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setDonationType("once")}
                className={`flex-1 rounded-xl py-1 text-sm font-medium transition-all ${
                  donationType === "once"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Única vez Pix
              </button>
            </div>

            {donationType === "monthly" ? (
              <MonthlyDonation />
            ) : (
              <OneTimeDonation />
            )}
          </>
        ) : (
          <OneTimeDonation />
        )}
      </div>
    </Card>
  );
}

const DONATION_VALUES = [2, 5, 10, 35, 65, 85, 125, 160, 200];
const MIN_VALUE = DONATION_VALUES[0];
const MAX_VALUE = DONATION_VALUES[DONATION_VALUES.length - 1];

const impactTiers = [
  {
    threshold: DONATION_VALUES[0], // 5
    label: "Carinho Diário",
    icon: HandHeart,
  },
  {
    threshold: DONATION_VALUES[3], // 35
    label: "Refeições Diárias",
    icon: Utensils,
  },
  {
    threshold: DONATION_VALUES[4], // 65
    label: "Cama Quente & Conforto",
    icon: BedDouble,
  },
  {
    threshold: DONATION_VALUES[5], // 85
    label: "Consultas Veterinárias",
    icon: Stethoscope,
  },
  {
    threshold: DONATION_VALUES[6], // 125
    label: "Remédios & Tratamentos",
    icon: Pill,
  },
  {
    threshold: DONATION_VALUES[8], // 200
    label: "Fundo de Emergência",
    icon: ShieldPlus,
  },
];

export const MonthlyDonation = () => {
  const { profile } = useCaregiverProfile();
  const [sliderIndex, setSliderIndex] = useState(4); // Default to 35 (index 3)
  const amount = DONATION_VALUES[sliderIndex];

  const handleDonation = async () => {
    // TODO: implement donation flow
    await subscribeMonthlySupporter({
      profileId: profile.id,
      value: amount,
    });
  };

  return (
    <>
      <div>
        <div className="mb-4 flex flex-col items-center sm:mb-6">
          <div className="flex items-baseline space-x-1">
            <span className="text-md text-muted-foreground font-light tracking-tight sm:text-xl">
              R$
            </span>
            <span className="text-4xl font-medium tracking-tighter">
              {amount}
            </span>
          </div>
        </div>

        <div className="relative flex w-full items-center px-1">
          <Slider
            value={[sliderIndex]}
            onValueChange={(value) => setSliderIndex(value[0])}
            min={0}
            max={DONATION_VALUES.length - 1}
            step={1}
            className="w-full"
          />
        </div>
        <div className="text-muted-foreground mt-2 flex justify-between px-1 text-xs font-medium">
          <span>R$ {MIN_VALUE}</span>
          <span>R$ {MAX_VALUE}+</span>
        </div>
      </div>
      {/* Impact Scale */}
      <div className="space-y-2">
        <p className="text-muted-foreground mb-2 pl-1 text-xs font-semibold tracking-widest uppercase">
          Seu Impacto
        </p>

        {impactTiers.map((tier) => {
          const isActive = amount >= tier.threshold;
          const Icon = tier.icon;
          const CheckIcon = isActive ? CheckCircle2 : Circle;

          return (
            <div
              key={tier.label}
              className={`flex items-center justify-between rounded-md border p-2 transition-all ${
                isActive
                  ? "bg-primary/5 border-primary/30"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 transition-all ${
                    isActive
                      ? "text-primary opacity-100"
                      : "text-muted-foreground/30 opacity-50"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors sm:text-sm ${
                    isActive ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {tier.label}
                </span>
              </div>
              <CheckIcon
                className={`h-4 w-4 transition-all ${
                  isActive
                    ? "text-primary opacity-100"
                    : "text-muted-foreground/30 opacity-50"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Fee Explanation */}
      <div className="bg-muted/50 border-border/50 flex items-start gap-3 rounded-xl border p-4">
        <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          <span className="text-foreground font-medium">
            100% Transparência:
          </span>{" "}
          Uma pequena taxa é cobrada apenas para cobrir custos do processador de
          pagamento e manutenção da plataforma.{" "}
          <span className="underline underline-offset-2">
            Não temos fins lucrativos.
          </span>
        </p>
      </div>

      {/* CTA Button */}
      <div className="space-y-2 md:space-y-4">
        <Button
          size="lg"
          className="group w-full cursor-pointer"
          onClick={handleDonation}
        >
          <span>Confirmar Apoio Mensal</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>

        <div className="text-center">
          <button className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
            Cancele ou gerencie a qualquer momento
          </button>
        </div>
      </div>
    </>
  );
};

export const OneTimeDonation = () => {
  const {
    billingInfo: { pixKey },
  } = useCaregiverProfile();

  return (
    <>
      <div className="flex flex-col space-y-2 md:space-y-0">
        <h1 className="text-md font-semibold tracking-tight">Chave Pix</h1>
        <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
          Use a chave abaixo no app do seu banco para enviar qualquer valor.
        </p>
      </div>

      <CopyField
        value={pixKey as string}
        title="Copiar chave PIX"
        supportMessage={{
          copied: "Chave PIX copiada com sucesso!",
          default: "Clique para copiar",
        }}
      />

      <div className="bg-muted/50 border-border/50 flex items-start gap-3 rounded-xl border p-4">
        <Heart className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          <span className="text-foreground font-medium">
            PIX direto ao cuidador
          </span>{" "}
          Doações via PIX vão 100% direto para a conta do cuidador, sem taxas. A
          plataforma não retém nenhum valor.
        </p>
      </div>
    </>
  );
};
