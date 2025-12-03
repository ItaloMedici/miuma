"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { formatCurrency } from "@/lib/utils/currency";
import { QrCode, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  BillingAndExpensesFormData,
  ExpenseFormData,
  OngoingCaseFormData,
} from "../schemas";
import { AddExpenseDialog } from "./AddExpenseDialog";
import { AddOngoingCaseDialog } from "./AddOngoingCaseDialog";

export function BillingAndExpenses() {
  const form = useFormContext<BillingAndExpensesFormData>();

  const expenses = form.watch("expenses") || [];
  const ongoingCases = form.watch("ongoingCases") || [];

  const handleAddExpense = (expense: ExpenseFormData) => {
    const currentExpenses = form.getValues("expenses") || [];
    form.setValue("expenses", [...currentExpenses, expense]);
  };

  const handleRemoveExpense = (id: string) => {
    const currentExpenses = form.getValues("expenses") || [];
    form.setValue(
      "expenses",
      currentExpenses.filter((e) => e.id !== id)
    );
  };

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Informações Financeiras
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          A transparência constrói confiança. Adicione suas chaves de pagamento
          e custos recorrentes.
        </p>
      </div>

      <div className="space-y-8">
        {/* Pix Key */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary w-9 h-9">
              <Icons.Pix className="text-primary" />
            </div>
            <h3 className="font-medium text-foreground">
              Sua Chave Pix (Recebedor)
            </h3>
          </div>

          <FormField
            control={form.control}
            name="pixKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Chave</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <QrCode className="w-4 h-4" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="email@exemplo.com, CPF, telefone ou chave aleatória"
                      {...field}
                    />
                  </InputGroup>
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  Esta chave será mostrada aos doadores para transferências
                  diretas.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Monthly Expenses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">
              Despesas Mensais
            </h3>
            <AddExpenseDialog onAdd={handleAddExpense} />
          </div>

          {expenses.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-muted rounded-full text-muted-foreground">
                  <svg
                    className="w-6 h-6"
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
                <p className="text-sm text-muted-foreground">
                  Nenhuma despesa adicionada ainda
                </p>
                <p className="text-xs text-muted-foreground">
                  Clique em &quot;Adicionar Despesa&quot; para começar
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <Card key={expense.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded text-muted-foreground">
                      <svg
                        className="w-5 h-5"
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
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {expense.category}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {expense.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {formatCurrency(expense.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">/mês</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveExpense(expense.id!)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Ongoing Cases */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">
              Casos de Arrecadação Ativos
            </h3>
            <AddOngoingCaseDialog onAdd={handleAddOngoingCase} />
          </div>

          {ongoingCases.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-muted rounded-full text-muted-foreground">
                  <svg
                    className="w-6 h-6"
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
                <p className="text-sm text-muted-foreground">
                  Nenhum caso de arrecadação ativo
                </p>
                <p className="text-xs text-muted-foreground">
                  Clique em &quot;Adicionar Caso&quot; para começar
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
                          className="w-16 h-16 rounded bg-muted shrink-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${ongoingCase.photo})`,
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded bg-muted shrink-0 flex items-center justify-center text-muted-foreground">
                          <svg
                            className="w-8 h-8"
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
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-1">
                          {ongoingCase.title} - {ongoingCase.petName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>
                            Meta: {formatCurrency(ongoingCase.targetAmount)}
                          </span>
                          <span>•</span>
                          <span>
                            Arrecadado:{" "}
                            {formatCurrency(ongoingCase.currentAmount)}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
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
                        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => handleRemoveOngoingCase(ongoingCase.id!)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
