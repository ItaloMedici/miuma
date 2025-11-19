import { Badge } from "@/components/ui/badge";
import { CaregiverProfileInfo } from "@/interfaces/profile";
import { Calendar, MapPin, PawPrint, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { SocialMediaLink } from "./SocialMediaLink";

export function CaregiverHeader({
  profile,
  socialMedia,
}: {
  profile: CaregiverProfileInfo;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };
}) {
  return (
    <div className="flex flex-col gap-2 mb-8 md:mb-12">
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

          <div className="hidden md:flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Calendar className="w-4 h-4" />
              Desde {profile.memberSince}
            </span>
            <span className="flex items-center gap-1">
              <PawPrint className="w-4 h-4" />
              {profile.animalsCount}{" "}
              {profile.animalsCount === 1 ? "animal" : "animais"}
            </span>
            {socialMedia?.whatsapp && (
              <SocialMediaLink
                platform="whatsapp"
                url={socialMedia.whatsapp}
                variant="icon-only"
                size="sm"
              />
            )}
            {socialMedia?.instagram && (
              <SocialMediaLink
                platform="instagram"
                url={socialMedia.instagram}
                variant="icon-only"
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {profile.location}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <Calendar className="w-4 h-4" />
          {profile.shortMemberSince}
        </span>
        <span className="flex items-center gap-1">
          <PawPrint className="w-4 h-4" />
          {profile.animalsCount}{" "}
          {profile.animalsCount === 1 ? "animal" : "animais"}{" "}
        </span>
        {socialMedia?.whatsapp && (
          <SocialMediaLink
            platform="whatsapp"
            url={socialMedia.whatsapp}
            variant="icon-only"
            size="sm"
          />
        )}
        {socialMedia?.instagram && (
          <SocialMediaLink
            platform="instagram"
            url={socialMedia.instagram}
            variant="icon-only"
            size="sm"
          />
        )}
      </div>
    </div>
  );
}

export default CaregiverHeader;
