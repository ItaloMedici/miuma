"use client";

import { SocialMediaLink } from "./SocialMediaLink";
import { useCaregiverProfile } from "./context";

type SocialPlatform =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "youtube"
  | "tiktok"
  | "website";

export function SocialMedia() {
  const { socialMedia } = useCaregiverProfile();

  if (!socialMedia) return null;

  const socialLinks = Object.entries(socialMedia).filter(([, url]) => url) as [
    SocialPlatform,
    string,
  ][];

  if (socialLinks.length === 0) return null;

  return (
    <section className="pt-4 md:pt-8">
      <h2 className="mb-4 text-lg font-semibold">Redes Sociais</h2>
      <div className="flex flex-wrap gap-3">
        {socialLinks.map(([platform, url]) => (
          <SocialMediaLink
            key={platform}
            platform={platform}
            url={url}
            variant="with-label"
            size="sm"
          />
        ))}
      </div>
    </section>
  );
}
