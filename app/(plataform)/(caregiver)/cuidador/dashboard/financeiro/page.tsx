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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { DashboardHeader } from "../components";

export default function FinanceiroPage() {
  const caregiver = caregivers[0];
  const data: CaregiverDataJson = JSON.parse(caregiver.data);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Concluída
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Processando
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Falhou
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DashboardHeader title="Financeiro" />

      <div className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Total Processado
                  </span>
                  <div className="rounded-lg bg-blue-50 p-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-stone-900">
                    R${" "}
                    {data.billing.summary.totalProcessed.toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                  <p className="text-xs text-stone-500">Todas as transações</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Total Transferido
                  </span>
                  <div className="rounded-lg bg-green-50 p-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-700">
                    R${" "}
                    {data.billing.summary.totalTransferred.toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                  <p className="text-xs text-stone-500">
                    Valor líquido recebido
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Pendente
                  </span>
                  <div className="rounded-lg bg-yellow-50 p-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-yellow-700">
                    R${" "}
                    {data.billing.summary.pendingTransfers.toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                  <p className="text-xs text-stone-500">Em processamento</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Tempo Médio
                  </span>
                  <div className="rounded-lg bg-purple-50 p-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-stone-900">
                    {data.billing.summary.averageTransferTime}
                  </p>
                  <p className="text-xs text-stone-500">Para transferência</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Split Payment Info */}
          <Card className="border-lime-200 bg-lime-50/30 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-lg bg-lime-100 p-2">
                  <CheckCircle2 className="h-5 w-5 text-lime-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-stone-900">
                    Sistema de Repasse Automático
                  </h3>
                  <p className="text-sm text-stone-600">
                    Todas as doações são processadas automaticamente através de
                    split de pagamentos. Os valores líquidos são transferidos
                    diretamente para sua conta em até{" "}
                    {data.billing.summary.averageTransferTime}, sem necessidade
                    de solicitação de saque.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-600">
                    <div>
                      <span className="font-medium">Taxa da plataforma:</span>{" "}
                      5%
                    </div>
                    <div>
                      <span className="font-medium">Taxa processamento:</span>{" "}
                      4.5%
                    </div>
                    <div>
                      <span className="font-medium">Repasse:</span> Automático
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions History */}
          <Card className="overflow-hidden border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-200 bg-stone-50/50">
              <CardTitle className="text-base font-semibold">
                Histórico de Transações
              </CardTitle>
              <p className="mt-1 text-sm text-stone-500">
                Todas as doações recebidas e repasses realizados
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile View */}
              <div className="divide-y divide-stone-100 md:hidden">
                {data.billing.transactions.map((transaction) => (
                  <div key={transaction.id} className="space-y-3 p-4">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-stone-900">
                          {transaction.donorName}
                        </p>
                        <p className="mt-0.5 text-xs text-stone-500">
                          {format(
                            new Date(transaction.date),
                            "dd/MM/yyyy 'às' HH:mm",
                            { locale: ptBR }
                          )}
                        </p>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Valor bruto:</span>
                        <span className="font-semibold">
                          R$ {transaction.amount.toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Taxa plataforma:</span>
                        <span>
                          -R${" "}
                          {transaction.splitDetails.platformFee.toLocaleString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Taxa processamento:</span>
                        <span>
                          -R${" "}
                          {transaction.splitDetails.paymentProcessorFee.toLocaleString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-stone-100 pt-2">
                        <span className="font-medium text-stone-900">
                          Valor líquido:
                        </span>
                        <span className="font-bold text-green-700">
                          R${" "}
                          {transaction.splitDetails.netAmount.toLocaleString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      {transaction.splitDetails.transferredAt && (
                        <p className="pt-1 text-xs text-stone-500">
                          Transferido em{" "}
                          {format(
                            new Date(transaction.splitDetails.transferredAt),
                            "dd/MM/yyyy 'às' HH:mm",
                            { locale: ptBR }
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Doador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor Bruto</TableHead>
                      <TableHead className="text-right">Taxas</TableHead>
                      <TableHead className="text-right">
                        Valor Líquido
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.billing.transactions.map((transaction) => {
                      const totalFees =
                        transaction.splitDetails.platformFee +
                        transaction.splitDetails.paymentProcessorFee;

                      return (
                        <TableRow key={transaction.id}>
                          <TableCell className="text-sm">
                            {format(new Date(transaction.date), "dd/MM/yyyy", {
                              locale: ptBR,
                            })}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">
                                {transaction.donorName}
                              </p>
                              {transaction.splitDetails.transferredAt && (
                                <p className="text-xs text-stone-500">
                                  Transferido em{" "}
                                  {format(
                                    new Date(
                                      transaction.splitDetails.transferredAt
                                    ),
                                    "dd/MM 'às' HH:mm",
                                    { locale: ptBR }
                                  )}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.type === "monthly"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {transaction.type === "monthly"
                                ? "Mensal"
                                : "Única"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            R$ {transaction.amount.toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-right text-sm text-stone-500">
                            -R$ {totalFees.toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-right font-bold text-green-700">
                            R${" "}
                            {transaction.splitDetails.netAmount.toLocaleString(
                              "pt-BR"
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(transaction.status)}
                              {getStatusBadge(transaction.status)}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
