"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BedDouble,
  Check,
  CheckCircle2,
  Circle,
  Copy,
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
  const { billingInfo } = useCaregiverProfile();
  const canAcceptSubscriptions =
    billingInfo.subscriptionPaymentStatus === "READY";

  const [donationType, setDonationType] = useState<"monthly" | "once">(
    canAcceptSubscriptions ? "monthly" : "once"
  );

  return (
    <Card className="relative overflow-hidden border-0 sm:border sm:border-border shadow-none py-0 sm:rounded-4xl">
      {/* Decorative blobs */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-fourth/10 rounded-full blur-2xl opacity-60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-0 sm:p-6 space-y-6">
        <div className="hidden sm:flex justify-center">
          <h2 className="text-lg font-semibold tracking-tight">
            Apoie este projeto
          </h2>
        </div>

        {canAcceptSubscriptions ? (
          <>
            <div className="bg-muted p-1 rounded-2xl flex relative">
              <button
                onClick={() => setDonationType("monthly")}
                className={`flex-1 py-1 text-sm font-medium rounded-xl transition-all ${
                  donationType === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setDonationType("once")}
                className={`flex-1 py-1 text-sm font-medium rounded-xl transition-all ${
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
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="flex items-baseline space-x-1">
            <span className="text-md sm:text-xl font-light text-muted-foreground tracking-tight">
              R$
            </span>
            <span className="text-4xl font-medium tracking-tighter">
              {amount}
            </span>
          </div>
        </div>

        <div className="relative w-full flex items-center px-1">
          <Slider
            value={[sliderIndex]}
            onValueChange={(value) => setSliderIndex(value[0])}
            min={0}
            max={DONATION_VALUES.length - 1}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium px-1">
          <span>R$ {MIN_VALUE}</span>
          <span>R$ {MAX_VALUE}+</span>
        </div>
      </div>
      {/* Impact Scale */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 pl-1">
          Seu Impacto
        </p>

        {impactTiers.map((tier) => {
          const isActive = amount >= tier.threshold;
          const Icon = tier.icon;
          const CheckIcon = isActive ? CheckCircle2 : Circle;

          return (
            <div
              key={tier.label}
              className={`flex items-center justify-between p-2 rounded-md border transition-all ${
                isActive
                  ? "bg-primary/5 border-primary/30"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-all ${
                    isActive
                      ? "text-primary opacity-100"
                      : "text-muted-foreground/30 opacity-50"
                  }`}
                />
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {tier.label}
                </span>
              </div>
              <CheckIcon
                className={`w-4 h-4 transition-all ${
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
      <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3 border border-border/50">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">
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
          className="w-full group cursor-pointer"
          onClick={handleDonation}
        >
          <span>Confirmar Apoio Mensal</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>

        <div className="text-center">
          <button className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
            Cancele ou gerencie a qualquer momento
          </button>
        </div>
      </div>
    </>
  );
};

export const OneTimeDonation = () => {
  const [pixCopied, setPixCopied] = useState(false);
  const {
    billingInfo: { pixKey },
  } = useCaregiverProfile();

  const handleCopyPix = () => {
    if (!pixKey) return;
    navigator.clipboard.writeText(pixKey);
    // feedback to user that the pix key was copied
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col space-y-2 md:space-y-0">
        <h1 className="text-md font-semibold tracking-tight">Chave Pix</h1>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
          Use a chave abaixo no app do seu banco para enviar qualquer valor.
        </p>
      </div>

      <div>
        <InputGroup onClick={handleCopyPix}>
          <InputGroupInput value={pixKey} readOnly />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copiar chave PIX"
              title="Copiar chave PIX"
              size="icon-xs"
              onClick={handleCopyPix}
            >
              {pixCopied ? <Check /> : <Copy />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <span
          className={cn(
            "text-xs text-muted-foreground flex items-center mt-2 gap-1",
            {
              "text-green-600": pixCopied,
            }
          )}
        >
          {pixCopied ? (
            <>
              <CheckCircle2 className="w-3 h-3" /> Chave PIX copiada com
              sucesso!
            </>
          ) : (
            <>
              <Info className="w-3 h-3" /> Clique para copiar
            </>
          )}
        </span>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3 border border-border/50">
        <Heart className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">
            PIX direto ao cuidador
          </span>{" "}
          Doações via PIX vão 100% direto para a conta do cuidador, sem taxas. A
          plataforma não retém nenhum valor.
        </p>
      </div>
    </>
  );
};
