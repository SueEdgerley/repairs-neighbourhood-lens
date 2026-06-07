import Image from "next/image";

type CroydonHousingLogoProps = {
  className?: string;
  priority?: boolean;
};

export function CroydonHousingLogo({
  className = "h-16 w-auto max-w-full",
  priority = false,
}: CroydonHousingLogoProps) {
  return (
    <Image
      src="/croydon-housing-logo.png"
      alt="Croydon Housing"
      width={640}
      height={160}
      priority={priority}
      className={className}
    />
  );
}
