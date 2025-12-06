import { Card, CardContent } from "@/components/ui/card";
import { DashboardAnalytics } from "@/interfaces/dashboard";
import { DollarSign, Eye, TrendingUp, Users } from "lucide-react";

interface AnalyticsCardsProps {
  analytics: DashboardAnalytics;
}

export function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  const cards = [
    {
      title: "Arrecadação Total",
      value: analytics.formattedTotalRevenue,
      subtitle: `Doação média: ${analytics.formattedAverageDonation}`,
      icon: DollarSign,
      color: "text-lime-600",
      bgColor: "bg-lime-50",
    },
    {
      title: "Apoiadores Ativos",
      value: analytics.totalSupporters.toString(),
      subtitle: `${analytics.monthlySupporters} mensais`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Crescimento",
      value: `+${analytics.growthRate}%`,
      subtitle: "vs. mês anterior",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Visualizações",
      value: analytics.pageViews.toLocaleString("pt-BR"),
      subtitle: `${analytics.uniqueVisitors} visitantes únicos`,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="border-stone-200 shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-stone-500">
                  {card.title}
                </span>
                <div className={`rounded-lg p-2 ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-stone-900">
                  {card.value}
                </p>
                <p className="text-xs text-stone-500">{card.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
