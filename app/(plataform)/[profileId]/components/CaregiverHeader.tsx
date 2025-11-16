import { Badge } from "@/components/ui/badge";
import { CaregiverProfileInfo } from "@/interfaces/caregiver";
import { Calendar, MapPin, PawPrint, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function CaregiverHeader({
  profile,
}: {
  profile: CaregiverProfileInfo;
}) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 md:w-16 md:h-16 rounded-2xl bg-muted overflow-hidden">
          <Image
            src={profile.imageUrl}
            alt={profile.name}
            width={64}
            height={64}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{profile.name}</h1>
            {profile.verified && (
              <Badge variant="sky" className="gap-1 mt-1">
                <ShieldCheck className="w-3 h-3" />
                Verificado
              </Badge>
            )}
          </div>

          <div className="hidden md:flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Desde {profile.memberSince}
            </span>
            <span className="flex items-center gap-1">
              <PawPrint className="w-4 h-4" />
              {profile.animalsCount} animais
            </span>
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {profile.location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Desde {profile.memberSince}
        </span>
        <span className="flex items-center gap-1">
          <PawPrint className="w-4 h-4" />
          {profile.animalsCount} animais
        </span>
      </div>
    </div>
  );
}

export default CaregiverHeader;
