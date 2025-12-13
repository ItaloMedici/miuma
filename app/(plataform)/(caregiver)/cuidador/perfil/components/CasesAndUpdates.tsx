"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { Mailbox, Trash2 } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  CasesAndUpdatesFormData,
  OngoingCaseFormData,
  RecentUpdateFormData,
} from "../schemas";
import { AddOngoingCaseDialog } from "./AddOngoingCaseDialog";
import { AddRecentUpdateDialog } from "./AddRecentUpdateDialog";

export function CasesAndUpdates() {
  const form = useFormContext<CasesAndUpdatesFormData>();

  const ongoingCases = form.watch("ongoingCases") || [];
  const recentUpdates = form.watch("recentUpdates") || [];

  const handleAddOngoingCase = (ongoingCase: OngoingCaseFormData) => {
    const currentCases = form.getValues("ongoingCases") || [];
    form.setValue("ongoingCases", [...currentCases, ongoingCase]);
  };

  const handleRemoveOngoingCase = (id: string) => {
    const currentCases = form.getValues("ongoingCases") || [];
    form.setValue(
      "ongoingCases",
      currentCases.filter((c) => c.id !== id)
    );
  };

  const handleAddRecentUpdate = (update: RecentUpdateFormData) => {
    const currentUpdates = form.getValues("recentUpdates") || [];
    form.setValue("recentUpdates", [...currentUpdates, update]);
  };

  const handleRemoveRecentUpdate = (id: string) => {
    const currentUpdates = form.getValues("recentUpdates") || [];
    form.setValue(
      "recentUpdates",
      currentUpdates.filter((u) => u.id !== id)
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Casos e Atualizações
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Compartilhe casos de arrecadação e atualizações sobre seus pets. Você
          pode pular esta etapa e adicionar tudo isso depois no dashboard.
        </p>
      </div>

      <div className="space-y-8">
        {/* Info Card */}
        <Card className="border-amber-200 bg-amber-50/50 p-4">
          <div className="flex gap-3">
            <div className="shrink-0 text-amber-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-foreground mb-1 text-sm font-medium">
                Estas informações são opcionais
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Você pode deixar esta seção vazia por enquanto e gerenciar seus
                casos de arrecadação e atualizações diretamente no seu dashboard
                a qualquer momento. É mais fácil e prático!
              </p>
            </div>
          </div>
        </Card>

        {/* Ongoing Cases */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-sm font-medium">
                Casos de Arrecadação Ativos
              </h3>
              <p className="text-muted-foreground text-xs">
                Campanhas específicas para tratamentos ou necessidades
              </p>
            </div>
            <AddOngoingCaseDialog onAdd={handleAddOngoingCase} />
          </div>

          {ongoingCases.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-muted text-muted-foreground rounded-full p-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">
                  Nenhum caso adicionado
                </p>
                <p className="text-muted-foreground text-xs">
                  Você pode adicionar isso depois no dashboard
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {ongoingCases.map((ongoingCase) => {
                const percentage =
                  (ongoingCase.currentAmount / ongoingCase.targetAmount) * 100;
                return (
                  <Card key={ongoingCase.id} className="p-4">
                    <div className="flex gap-4">
                      {ongoingCase.photo ? (
                        <div
                          className="bg-muted h-16 w-16 shrink-0 rounded bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${ongoingCase.photo})`,
                          }}
                        />
                      ) : (
                        <div className="bg-muted text-muted-foreground flex h-16 w-16 shrink-0 items-center justify-center rounded">
                          <svg
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground mb-1 text-sm font-medium">
                          {ongoingCase.title} - {ongoingCase.petName}
                        </p>
                        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                          <span>
                            Meta: {formatCurrency(ongoingCase.targetAmount)}
                          </span>
                          <span>•</span>
                          <span>
                            Arrecadado:{" "}
                            {formatCurrency(ongoingCase.currentAmount)}
                          </span>
                        </div>
                        <div className="bg-muted h-2 w-full rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
                        onClick={() => handleRemoveOngoingCase(ongoingCase.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Updates */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-sm font-medium">
                Atualizações Recentes
              </h3>
              <p className="text-muted-foreground text-xs">
                Compartilhe novidades sobre seus pets e atividades
              </p>
            </div>
            <AddRecentUpdateDialog onAdd={handleAddRecentUpdate} />
          </div>

          {recentUpdates.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-muted text-muted-foreground rounded-full p-3">
                  <Mailbox className="h-6 w-6" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Nenhuma atualização adicionada
                </p>
                <p className="text-muted-foreground text-xs">
                  Você pode adicionar isso depois no dashboard
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentUpdates.map((update) => (
                <Card key={update.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary h-3 w-3 shrink-0 rounded-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-baseline justify-between gap-2">
                        <time className="text-muted-foreground text-xs font-semibold">
                          {formatDate(update.date)}
                        </time>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive -mt-1 h-8 w-8 shrink-0"
                          onClick={() => handleRemoveRecentUpdate(update.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed">
                        {update.message} {update.emoji}
                      </p>

                      {/* Imagens */}
                      {update.images && update.images.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {update.images.slice(0, 4).map((image, idx) => (
                            <div
                              key={idx}
                              className="relative h-16 w-16 overflow-hidden rounded-lg"
                            >
                              <Image
                                src={image.url}
                                alt={image.alt || `Foto ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {update.images.length > 4 && (
                            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-lg">
                              <span className="text-muted-foreground text-xs font-semibold">
                                +{update.images.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
