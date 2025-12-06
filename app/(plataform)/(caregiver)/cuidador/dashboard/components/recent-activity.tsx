import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonationActivity } from "@/interfaces/dashboard";

interface RecentActivityProps {
  activities: DonationActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={`${activity.donorId}-${index}`}
              className="flex items-start gap-3 border-b border-stone-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime-500"></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-stone-900">
                      {activity.donorName}
                    </p>
                    <p className="text-xs text-stone-500">
                      {activity.location.city}, {activity.location.state}
                    </p>
                  </div>
                  <Badge
                    variant={
                      activity.type === "monthly" ? "default" : "secondary"
                    }
                    className="shrink-0 text-xs"
                  >
                    {activity.type === "monthly" ? "Mensal" : "Única"}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-lime-700">
                    {activity.formattedAmount}
                  </span>
                  <span className="text-xs text-stone-400">
                    {activity.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
