type CroydonHousingLogoProps = {
  className?: string;
};

export function CroydonHousingLogo({ className = "h-14 w-auto" }: CroydonHousingLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 56"
      role="img"
      aria-label="Croydon Housing"
    >
      <title>Croydon Housing</title>
      <rect x="0" y="8" width="40" height="40" rx="8" fill="#1a365d" />
      <path
        d="M20 18 L28 24 V34 H24 V28 H16 V34 H12 V24 Z"
        fill="#ffffff"
      />
      <text x="50" y="26" fill="#1a365d" fontSize="15" fontWeight="700" fontFamily="system-ui, sans-serif">
        Croydon
      </text>
      <text x="50" y="44" fill="#0d9488" fontSize="15" fontWeight="700" fontFamily="system-ui, sans-serif">
        Housing
      </text>
    </svg>
  );
}
