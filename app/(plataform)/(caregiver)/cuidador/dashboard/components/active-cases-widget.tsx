import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CampaignData } from "@/interfaces/dashboard";
import Image from "next/image";
import Link from "next/link";

interface ActiveCasesWidgetProps {
  cases: CampaignData[];
}

export function ActiveCasesWidget({ cases }: ActiveCasesWidgetProps) {
  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Casos Ativos</CardTitle>
        <Link
          href="/cuidador/dashboard/casos"
          className="text-xs font-medium text-lime-700 hover:text-lime-800"
        >
          Ver todos
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {cases.map((caseItem) => {
          return (
            <div
              key={caseItem.id}
              className="space-y-3 rounded-lg border border-stone-100 bg-stone-50 p-3"
            >
              {caseItem.imageUrl && (
                <div className="relative h-32 w-full overflow-hidden rounded-md">
                  <Image
                    src={caseItem.imageUrl}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="mb-1 text-sm font-medium text-stone-900">
                  {caseItem.title}
                </h4>
                <p className="line-clamp-2 text-xs text-stone-600">
                  {caseItem.description}
                </p>
              </div>
              <div className="space-y-2">
                <Progress value={caseItem.percentAchieved} className="h-1.5" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600">
                    {caseItem.formattedCurrentAmount}
                  </span>
                  <span className="text-stone-500">
                    Meta: {caseItem.formattedTargetAmount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
