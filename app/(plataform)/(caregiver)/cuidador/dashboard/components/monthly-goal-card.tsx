import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MonthlyGoalData } from "@/interfaces/dashboard";

interface MonthlyGoalCardProps {
  goal: MonthlyGoalData;
}

export function MonthlyGoalCard({ goal }: MonthlyGoalCardProps) {
  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Meta Mensal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-600">Progresso</span>
            <span className="font-bold text-stone-900">
              {goal.percentAchieved}%
            </span>
          </div>
          <Progress value={goal.percentAchieved} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-600">Arrecadado</span>
            <span className="text-base font-bold text-lime-700">
              {goal.formattedCurrentAmount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-600">Meta</span>
            <span className="text-sm text-stone-500">
              {goal.formattedMonthlyGoal}
            </span>
          </div>
        </div>

        <div className="border-t border-stone-100 pt-4">
          <p className="text-xs text-stone-500">
            Apoiadores mensais ativos: {goal.totalMonthlySupporters}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Doações recorrentes: {goal.formattedMonthlyRecurring}/mês
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
