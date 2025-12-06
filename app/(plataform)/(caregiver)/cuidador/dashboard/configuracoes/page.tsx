import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DashboardHeader } from "../components";

export default function ConfiguracoesPage() {
  return (
    <>
      <DashboardHeader title="Configurações" />

      <div className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Account Settings */}
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-200 bg-stone-50/50">
              <CardTitle className="text-base font-semibold">
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="pixKey">Chave PIX</Label>
                <Input
                  id="pixKey"
                  defaultValue="maria.silva@example.com"
                  className="border-stone-200"
                />
                <p className="text-xs text-stone-500">
                  Chave PIX para recebimento das doações
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiverId">ID do Recebedor</Label>
                <Input
                  id="receiverId"
                  defaultValue="receiver-001"
                  disabled
                  className="border-stone-200 bg-stone-50"
                />
                <p className="text-xs text-stone-500">
                  Identificador único da sua conta
                </p>
              </div>

              <Button className="bg-lime-600 hover:bg-lime-700">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-200 bg-stone-50/50">
              <CardTitle className="text-base font-semibold">
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novas doações</Label>
                  <p className="text-xs text-stone-500">
                    Receba notificações de novas doações
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Apoiadores mensais</Label>
                  <p className="text-xs text-stone-500">
                    Notificações de renovações mensais
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Resumo semanal</Label>
                  <p className="text-xs text-stone-500">
                    Receba um resumo semanal por e-mail
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações da plataforma</Label>
                  <p className="text-xs text-stone-500">
                    Novidades e melhorias da Miuma
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 shadow-sm">
            <CardHeader className="border-b border-red-200 bg-red-50/30">
              <CardTitle className="text-base font-semibold text-red-900">
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-stone-900">
                  Desativar conta
                </h4>
                <p className="text-sm text-stone-600">
                  Sua página ficará invisível e você não poderá receber novas
                  doações. Esta ação é reversível.
                </p>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  Desativar Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
