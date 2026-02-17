export default function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon - stylized "S" road/path */}
      <rect width="36" height="36" x="2" y="2" rx="10" fill="url(#sewain-grad)" />
      <path
        d="M13 14c0-2 1.5-3 3.5-3h5c2.5 0 4.5 2 4.5 4.5S24 20 21.5 20h-5C14 20 12 22 12 24.5S14 29 16.5 29h5c2 0 3.5-1 3.5-3"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Car icon hint */}
      <circle cx="16" cy="26" r="1.2" fill="white" opacity="0.7" />
      <circle cx="23" cy="26" r="1.2" fill="white" opacity="0.7" />

      {/* Text */}
      <text x="46" y="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="26" fill="currentColor">
        Sewain
      </text>

      <defs>
        <linearGradient id="sewain-grad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
