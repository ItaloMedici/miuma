import { CaregiverProfileBillingInfo } from "@/interfaces/profile";

export function BillingProgress({
  billingInfo,
}: {
  billingInfo: CaregiverProfileBillingInfo;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {billingInfo.supporters} apoiadores
        </span>
        <span className="font-medium">
          {billingInfo.currentMonthlySupport} / {billingInfo.monthlyGoal}
          <span className="text-muted-foreground ml-1 text-xs font-light">
            /mês
          </span>
        </span>
      </div>
      <div className="bg-muted/60 h-2 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${billingInfo.percentAchieved}%` }}
        />
      </div>
    </div>
  );
}

export default BillingProgress;
