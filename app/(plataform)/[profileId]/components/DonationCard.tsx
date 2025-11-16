"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Heart, Shield } from "lucide-react";
import { useState } from "react";

export function DonationCard({
  profileId,
  compact,
}: {
  profileId?: string;
  compact?: boolean;
}) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [pixAmount, setPixAmount] = useState("");

  const subscriptionPlans = [
    {
      id: "basic",
      name: "Apoiador",
      value: 30,
      description: "Ajuda com ração e cuidados básicos",
    },
    {
      id: "standard",
      name: "Protetor",
      value: 50,
      description: "Garante alimentação e consultas",
    },
    {
      id: "premium",
      name: "Guardião",
      value: 100,
      description: "Cobre medicamentos e emergências",
    },
  ];

  const handleSubscription = (planId: string) => {
    setSelectedPlan(planId);
    // TODO: implement subscription flow (connect to payments)
  };

  const handlePixDonation = () => {
    // TODO: implement PIX donation flow (generate QR / open modal)
  };

  return (
    <Card className="p-6 space-y-4 shadow-none">
      <div>
        <h2 className="text-2xl font-bold mb-2">Apoie</h2>
        <p className="text-muted-foreground text-sm">
          Escolha como você quer ajudar
        </p>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">Mensal</TabsTrigger>
          <TabsTrigger value="pix">PIX único</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4 mt-6">
          <div className="space-y-3">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedPlan === plan.id
                    ? "border-primary bg-accent"
                    : "border-border hover:border-accent-foreground/20"
                }`}
                onClick={() => handleSubscription(plan.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{plan.name}</h3>
                      {selectedPlan === plan.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {plan.description}
                    </p>
                    <p className="text-2xl font-bold">
                      R$ {plan.value}
                      <span className="text-sm font-normal text-muted-foreground">
                        /mês
                      </span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Sobre as taxas
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Uma pequena taxa é cobrada apenas para cobrir custos do
              processador de pagamento e manutenção da plataforma. Não temos
              fins lucrativos. A maior parte do valor vai direto para o
              cuidador.
            </p>
          </div>

          <Button size="lg" className="w-full" disabled={!selectedPlan}>
            Confirmar assinatura mensal
          </Button>
        </TabsContent>

        <TabsContent value="pix" className="space-y-4 mt-6">
          <div className="space-y-3">
            <div>
              <Label htmlFor="amount">Valor da doação</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50,00"
                  className="pl-10"
                  value={pixAmount}
                  onChange={(e) => setPixAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4" />
                PIX direto ao cuidador
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Doações via PIX vão 100% direto para a conta do cuidador, sem
                taxas. A plataforma não retém nenhum valor.
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handlePixDonation}
            disabled={!pixAmount || parseFloat(pixAmount) <= 0}
          >
            Gerar QR Code PIX
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
