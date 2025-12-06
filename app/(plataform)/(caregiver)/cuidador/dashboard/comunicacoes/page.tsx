"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CaregiverDataJson } from "@/interfaces/caregiver";
import { caregivers } from "@/lib/mock/caregiver";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Image as ImageIcon, Send, Users } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "../components";

export default function ComunicacoesPage() {
  const caregiver = caregivers[0];
  const data: CaregiverDataJson = JSON.parse(caregiver.data);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "all",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Sending update:", formData);
  };

  return (
    <>
      <DashboardHeader title="Comunicações" />

      <div className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Send Update Form */}
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-200 bg-stone-50/50">
              <CardTitle className="text-base font-semibold">
                Enviar Atualização
              </CardTitle>
              <p className="mt-1 text-sm text-stone-500">
                Mantenha seus apoiadores informados sobre o progresso
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="audience">Destinatários</Label>
                  <Select
                    value={formData.audience}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, audience: value })
                    }
                  >
                    <SelectTrigger id="audience">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            Todos os apoiadores ({data.stats.totalSupporters})
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="monthly">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            Apoiadores mensais (
                            {data.stats.totalMonthlySupporters})
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="newsletter">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            Newsletter ({data.newsletterSubscribers.length})
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título da Atualização</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Luna passou pela consulta veterinária!"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="border-stone-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Compartilhe as novidades com seus apoiadores..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="resize-none border-stone-200"
                  />
                  <p className="text-xs text-stone-500">
                    Seja claro e objetivo. Compartilhe fotos e vídeos para
                    engajar mais.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Anexar Imagens (opcional)</Label>
                  <div className="cursor-pointer rounded-lg border-2 border-dashed border-stone-200 p-8 text-center transition-colors hover:border-stone-300">
                    <ImageIcon className="mx-auto mb-2 h-8 w-8 text-stone-400" />
                    <p className="mb-1 text-sm text-stone-600">
                      Clique para adicionar imagens
                    </p>
                    <p className="text-xs text-stone-500">
                      PNG, JPG até 10MB cada
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Salvar Rascunho
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-lime-600 hover:bg-lime-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Atualização
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recent Communications */}
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-200 bg-stone-50/50">
              <CardTitle className="text-base font-semibold">
                Atualizações Enviadas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-stone-100">
                {data.communications.map((comm) => (
                  <div
                    key={comm.id}
                    className="p-6 transition-colors hover:bg-stone-50/50"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h4 className="mb-1 font-semibold text-stone-900">
                            {comm.title}
                          </h4>
                          <p className="line-clamp-2 text-sm text-stone-600">
                            {comm.message}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {comm.sentTo === "all"
                            ? "Todos"
                            : comm.sentTo === "monthly"
                              ? "Mensais"
                              : "Newsletter"}
                        </Badge>
                      </div>

                      {comm.images && comm.images.length > 0 && (
                        <div className="flex gap-2">
                          <div className="flex items-center gap-1 text-xs text-stone-500">
                            <ImageIcon className="h-3 w-3" />
                            <span>{comm.images.length} imagens</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-stone-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {format(new Date(comm.date), "dd 'de' MMMM, yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{comm.recipientCount} destinatários</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
