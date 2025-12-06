import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "../components";

export default function ConfiguracoesPage() {
  return (
    <>
      <DashboardHeader title="Configurações" />

      <div className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-8 md:pt-0">
        <div className="mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-red-900">
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4 md:gap-8">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-stone-900">
                  Desativar conta
                </h4>
                <p className="text-sm text-stone-600">
                  Sua página ficará invisível e você não poderá receber novas
                  doações. Esta ação é reversível.
                </p>
              </div>
              <Button variant="destructive">Desativar Conta</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
