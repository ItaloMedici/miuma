import { Globe } from "lucide-react";
import {
  siFacebook,
  siInstagram,
  siTiktok,
  siWhatsapp,
  siYoutube,
} from "simple-icons";

type SocialPlatform =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "youtube"
  | "tiktok"
  | "website";

interface SocialMediaLinkProps {
  platform: SocialPlatform;
  url: string;
  variant?: "icon-only" | "with-label";
  size?: "sm" | "md";
}

const buildIconComponent = (path: string) => {
  return function BsseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d={path} />
      </svg>
    );
  };
};

const siInstagramIcon = buildIconComponent(siInstagram.path);
const siFacebookIcon = buildIconComponent(siFacebook.path);
const siWhatsappIcon = buildIconComponent(siWhatsapp.path);
const siYoutubeIcon = buildIconComponent(siYoutube.path);
const siTiktokIcon = buildIconComponent(siTiktok.path);

const socialMediaConfig = {
  instagram: {
    icon: siInstagramIcon,
    label: "Instagram",
    color: "hover:border-pink-300 hover:text-pink-600",
  },
  facebook: {
    icon: siFacebookIcon,
    label: "Facebook",
    color: "hover:border-blue-300 hover:text-blue-600",
  },
  whatsapp: {
    icon: siWhatsappIcon,
    label: "WhatsApp",
    color: "hover:border-green-300 hover:text-green-600",
  },
  youtube: {
    icon: siYoutubeIcon,
    label: "YouTube",
    color: "hover:border-red-300 hover:text-red-600",
  },
  tiktok: {
    icon: siTiktokIcon,
    label: "TikTok",
    color: "hover:border-gray-900 hover:text-gray-900 dark:hover:text-white",
  },
  website: { icon: Globe, label: "Website", color: "hover:text-blue-500" },
};

export function SocialMediaLink({
  platform,
  url,
  variant = "icon-only",
  size = "sm",
}: SocialMediaLinkProps) {
  const config = socialMediaConfig[platform];
  if (!config) return null;

  const Icon = config.icon;
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  if (variant === "icon-only") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-muted-foreground transition-colors ${config.color}`}
        aria-label={`Visitar ${config.label}`}
      >
        <Icon className={iconSize} />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`corner-squircle border-border text-muted-foreground flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition-colors ${config.color}`}
      aria-label={`Visitar ${config.label}`}
    >
      <Icon className={iconSize} />
      <span>{config.label}</span>
    </a>
  );
}
