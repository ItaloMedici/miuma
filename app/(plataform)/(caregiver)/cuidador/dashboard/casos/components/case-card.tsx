"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { OngoingCase } from "@/interfaces/caregiver";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteOngoingCase } from "../actions";
import { CaseDialog } from "./case-dialog";

interface CaseCardProps {
  case: OngoingCase;
}

export function CaseCard({ case: caseData }: CaseCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const percentAchieved = Math.min(
    Math.round((caseData.currentAmount / caseData.targetAmount) * 100),
    100
  );

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteOngoingCase(caseData.id);
        toast.success("Caso excluído com sucesso!");
        setShowDeleteDialog(false);
      } catch {
        toast.error("Erro ao excluir caso. Tente novamente.");
      }
    });
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Header com imagem */}
          {caseData.imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={caseData.imageUrl}
                alt={caseData.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Título e Descrição */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{caseData.title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {caseData.description}
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-semibold">{percentAchieved}%</span>
            </div>
            <Progress value={percentAchieved} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                R$ {caseData.currentAmount.toLocaleString("pt-BR")}
              </span>
              <span className="text-muted-foreground">
                de R$ {caseData.targetAmount.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <CaseDialog
              existingCase={caseData}
              trigger={
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              }
            />
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Excluir Caso?</DialogTitle>
                  <DialogDescription>
                    Esta ação não pode ser desfeita. O caso será removido
                    permanentemente do seu perfil.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(false)}
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    {isPending ? "Excluindo..." : "Excluir"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
