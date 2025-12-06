import { Card, CardContent } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { DashboardHeader } from "../components";

export default function CasosPage() {
  return (
    <>
      <DashboardHeader title="Casos de Arrecadação" />

      <div className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Coming Soon Card */}
          <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="mx-auto max-w-md space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100">
                  <Rocket className="h-8 w-8 text-lime-600" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-stone-900">
                    Campanhas em Breve
                  </h3>
                  <p className="text-sm text-stone-500">
                    A funcionalidade de campanhas específicas estará disponível
                    em breve! Por enquanto, você pode receber doações gerais
                    através do seu perfil.
                  </p>
                </div>
                <div className="space-y-2 pt-4">
                  <p className="text-xs text-stone-400">Recursos planejados:</p>
                  <ul className="space-y-1 text-xs text-stone-600">
                    <li>• Criar campanhas específicas com metas</li>
                    <li>• Acompanhar progresso individual de cada campanha</li>
                    <li>• Enviar atualizações para doadores</li>
                    <li>• Gerenciar múltiplas campanhas simultaneamente</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
