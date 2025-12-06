"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const CaregiverAvatarAccount = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <CaregiverAvatarAccount.Skeleton />;
  }

  if (!data?.user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar className="bg-muted flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
        <AvatarImage src={data.user.image ?? undefined} />
        <AvatarFallback>{data.user.name?.[0] ?? "?"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col overflow-hidden">
        <span className="text-foreground truncate text-sm font-medium">
          {data.user.name}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {data.user.email}
        </span>
      </div>
    </div>
  );
};

const CaregiverAvatarAccountSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-col overflow-hidden">
        <Skeleton className="mb-2 h-4 w-20 rounded" />
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </div>
  );
};

CaregiverAvatarAccount.Skeleton = CaregiverAvatarAccountSkeleton;
