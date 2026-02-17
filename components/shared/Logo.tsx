export default function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon - stylized "G" with motion */}
      <rect width="36" height="36" x="2" y="2" rx="10" fill="url(#gorent-grad)" />
      <path
        d="M25 20h-5m5 0a7 7 0 1 0-3.5 6.06"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Speed lines */}
      <line x1="10" y1="15" x2="14" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="9" y1="20" x2="13" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Text: "Go" bold + "Rent" regular */}
      <text x="46" y="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="26" fill="currentColor">
        Go
      </text>
      <text x="82" y="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" fontSize="26" fill="currentColor">
        Rent
      </text>

      <defs>
        <linearGradient id="gorent-grad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}
