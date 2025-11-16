import { CaregiverProfileBillingInfo } from "@/interfaces/caregiver";

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
          {billingInfo.currentSupport} / {billingInfo.monthlyGoal}
          <span className="text-xs font-light text-muted-foreground ml-1">
            /mês
          </span>
        </span>
      </div>
      <div className="h-2 bg-muted/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${billingInfo.percentAchieved}%` }}
        />
      </div>
    </div>
  );
}

export default BillingProgress;
