import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { DashboardHeader } from "../components";
import { getOngoingCases } from "./actions";
import { CaseCard, CaseDialog } from "./components";

export default async function CasosPage() {
  const cases = await getOngoingCases();

  return (
    <>
      <DashboardHeader title="Casos de Arrecadação" />

      <div className="bg-background flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header com ação */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Seus Casos</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Gerencie campanhas específicas de arrecadação
              </p>
            </div>
            <CaseDialog />
          </div>

          {/* Lista de casos */}
          {cases.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((caseData) => (
                <CaseCard key={caseData.id} case={caseData} />
              ))}
            </div>
          ) : (
            <Card className="border-border shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mx-auto max-w-md space-y-4">
                  <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                    <Package className="text-muted-foreground h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 text-lg font-semibold">
                      Nenhum caso cadastrado
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Crie seu primeiro caso de arrecadação para compartilhar
                      necessidades específicas dos seus pets com os apoiadores.
                    </p>
                  </div>
                  <div className="pt-4">
                    <CaseDialog />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
