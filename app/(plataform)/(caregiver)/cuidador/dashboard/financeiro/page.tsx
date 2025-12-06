import { Badge } from "@/components/ui/badge";
import { FEATURE_FLAGS } from "@/lib/constants/feature-flags";
import { Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { DashboardHeader } from "../components";

export default function FinanceiroPage() {
  // Redirect if feature not enabled
  if (!FEATURE_FLAGS.ENABLE_BILLING) {
    redirect("/cuidador/dashboard");
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <DashboardHeader title="Financeiro" />

      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="max-w-md space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full text-4xl">
              💳
            </div>
          </div>

          <div>
            <h2 className="text-foreground text-2xl font-bold">
              Gestão Financeira
            </h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <p className="text-muted-foreground">
                Funcionalidade em Desenvolvimento
              </p>
            </div>
          </div>

          <Badge variant="secondary">Versão 2.2</Badge>

          <p className="text-muted-foreground text-sm">
            Em breve você terá acesso ao histórico completo de transações,
            repasses e relatórios financeiros.
          </p>
        </div>
      </div>
    </div>
  );
}
