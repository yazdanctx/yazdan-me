import { Globe, Radio } from "lucide-react";
import { SiApplepodcasts, SiSpotify, SiYoutube } from "react-icons/si";

interface LinkIconProps {
  hostname: string;
  className?: string;
}

/** Brand mark for a link, picked from its hostname. */
export function LinkIcon({ hostname, className }: LinkIconProps) {
  if (hostname.endsWith("youtube.com") || hostname === "youtu.be")
    return <SiYoutube className={className} />;
  if (hostname.endsWith("spotify.com"))
    return <SiSpotify className={className} />;
  if (hostname.endsWith("apple.com"))
    return <SiApplepodcasts className={className} />;
  if (hostname.endsWith("fm") || hostname.endsWith("changelog.com"))
    return <Radio className={className} />;
  return <Globe className={className} />;
}

/** Tailwind text colour matching the brand mark above. */
export function linkIconColor(hostname: string): string {
  if (hostname.endsWith("youtube.com") || hostname === "youtu.be")
    return "text-red-500";
  if (hostname.endsWith("spotify.com")) return "text-green-500";
  if (hostname.endsWith("apple.com")) return "text-purple-400";
  return "text-secondary-foreground";
}
