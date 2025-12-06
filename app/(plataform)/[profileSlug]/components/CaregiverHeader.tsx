"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, PawPrint, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { SocialMediaLink } from "./SocialMediaLink";
import { useCaregiverProfile } from "./context";

export function CaregiverHeader() {
  const { profile, socialMedia } = useCaregiverProfile();

  return (
    <div className="mb-8 flex flex-col gap-2 md:mb-12">
      <div className="flex items-start gap-4">
        <div className="bg-muted h-8 w-8 overflow-hidden rounded-2xl md:h-16 md:w-16">
          <Image
            src={profile.imageUrl}
            alt={profile.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h1 className="text-2xl font-bold md:text-3xl">{profile.name}</h1>
            {profile.verified && (
              <Badge variant="sky" className="mt-1 gap-1">
                <ShieldCheck className="h-3 w-3" />
                Verificado
              </Badge>
            )}
          </div>

          <div className="text-muted-foreground hidden flex-wrap items-center gap-3 text-sm md:flex">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Calendar className="h-4 w-4" />
              Desde {profile.memberSince}
            </span>
            <span className="flex items-center gap-1">
              <PawPrint className="h-4 w-4" />
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
      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs md:hidden">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {profile.location}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <Calendar className="h-4 w-4" />
          {profile.shortMemberSince}
        </span>
        <span className="flex items-center gap-1">
          <PawPrint className="h-4 w-4" />
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
