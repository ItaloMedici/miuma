import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaregiverDataJson } from "@/interfaces/caregiver";
import { caregivers } from "@/lib/mock/caregiver";
import { Mail, MapPin } from "lucide-react";
import { DashboardHeader } from "../components";

export default function DoadoresPage() {
  const caregiver = caregivers[0];
  const data: CaregiverDataJson = JSON.parse(caregiver.data);

  return (
    <>
      <DashboardHeader title="Gestão de Doadores" />

      <div className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-stone-500">Total de Apoiadores</p>
                  <p className="text-3xl font-bold text-stone-900">
                    {data.stats.totalSupporters}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-stone-500">Apoiadores Mensais</p>
                  <p className="text-3xl font-bold text-lime-700">
                    {data.stats.totalMonthlySupporters}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-stone-500">Newsletter</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {data.newsletterSubscribers.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Supporters Table */}
          <Card className="overflow-hidden border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-200 bg-stone-50/50">
              <CardTitle className="text-base font-semibold">
                Apoiadores Mensais Ativos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile View */}
              <div className="divide-y divide-stone-100 md:hidden">
                {data.monthlySupporters.map((supporter) => (
                  <div key={supporter.supporterId} className="space-y-3 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        {supporter.imageUrl && (
                          <AvatarImage src={supporter.imageUrl} />
                        )}
                        <AvatarFallback>
                          {supporter.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-stone-900">
                          {supporter.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{supporter.email}</span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {supporter.location.city},{" "}
                            {supporter.location.state}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-lime-100 text-lime-800 hover:bg-lime-200">
                        Mensal
                      </Badge>
                      <span className="text-base font-bold text-lime-700">
                        R$ {supporter.value.toLocaleString("pt-BR")}/mês
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Apoiador</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor Mensal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.monthlySupporters.map((supporter) => (
                      <TableRow key={supporter.supporterId}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {supporter.imageUrl && (
                                <AvatarImage src={supporter.imageUrl} />
                              )}
                              <AvatarFallback>
                                {supporter.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {supporter.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-stone-600">
                            {supporter.email}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-stone-600">
                            {supporter.location.city},{" "}
                            {supporter.location.state}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-lime-100 text-lime-800 hover:bg-lime-200">
                            Mensal
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-lime-700">
                          R$ {supporter.value.toLocaleString("pt-BR")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
