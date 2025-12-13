"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronUp, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDashboard } from "../context";

export const CaregiverAvatarAccount = () => {
  const { data, isPending } = authClient.useSession();
  const {
    caregiver: { caregiverImageUrl },
  } = useDashboard();
  const router = useRouter();
  const [isSignOutPending, startTransition] = useTransition();

  if (isPending) {
    return <CaregiverAvatarAccount.Skeleton />;
  }

  if (!data?.user) {
    return null;
  }

  const handleSignOut = () => {
    startTransition(() => {
      authClient.signOut().then(() => {
        router.push("/");
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-sm p-2">
          <Avatar className="bg-muted flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
            <AvatarImage
              src={data.user.image ?? caregiverImageUrl ?? undefined}
            />
            <AvatarFallback>{data.user.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="text-foreground truncate text-sm font-medium">
              {data.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {data.user.email}
            </span>
          </div>
          <div className="px-2">
            <ChevronUp className="text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[90dvw] sm:w-62">
        <DropdownMenuItem onClick={handleSignOut} disabled={isSignOutPending}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
