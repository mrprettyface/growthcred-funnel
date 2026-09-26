/**
 * The AI Implementation Guide as a book, so the offer shows the thing rather
 * than describing it. Drawn as one SVG in the site's colours and fonts: sharp
 * at any size, nothing to download, and no photo of a book that does not
 * exist as a printed object. Static, so there is nothing to switch off under
 * reduced motion.
 */
export function GuideCover({ className = "w-28" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 136 172"
      role="img"
      aria-label="Cover of The AI Implementation Guide by GrowthCred"
      className={`shrink-0 drop-shadow-[0_18px_24px_rgba(26,26,36,0.35)] ${className}`}
    >
      <defs>
        <linearGradient id="gc-cover-spine" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="gc-cover-glow" cx="0.85" cy="0.95" r="0.7">
          <stop offset="0" stopColor="#c8a04a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c8a04a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The page block behind the cover. */}
      <rect x="9" y="7" width="122" height="161" rx="3" fill="#f4efe4" stroke="#d9d2c3" />
      <path d="M125 12v151M127.5 13v149M130 14v147" stroke="#d9d2c3" strokeWidth="0.8" />

      {/* The cover. */}
      <rect x="2" y="2" width="122" height="162" rx="3.5" fill="#1a1a24" />
      <rect x="2" y="2" width="122" height="162" rx="3.5" fill="url(#gc-cover-glow)" />
      <path d="M2 40h122M2 80h122M2 120h122M44 2v162M84 2v162" stroke="#e8e0d0" strokeOpacity="0.05" />
      <rect x="2" y="2" width="8" height="162" fill="url(#gc-cover-spine)" />

      <g fontFamily="var(--font-mono)" fill="#c8a04a" fontSize="6" letterSpacing="1.4">
        <text x="18" y="22">GROWTHCRED</text>
        <text x="18" y="152">7 STEPS · FREE GUIDE</text>
      </g>
      <path d="M18 30h22" stroke="#c8a04a" strokeWidth="1.2" />

      <g fontFamily="var(--font-display)" fontWeight="800" fontSize="13.5" letterSpacing="-0.4">
        <text x="18" y="58" fill="#e8e0d0">The AI</text>
        <text x="18" y="74" fill="#e8e0d0">Implementation</text>
        <text x="18" y="90" fill="#c8a04a">Guide.</text>
      </g>

      <g fontFamily="var(--font-body)" fontSize="7" fill="#e8e0d0" fillOpacity="0.72">
        <text x="18" y="110">Put AI to work without</text>
        <text x="18" y="120">changing how you work,</text>
        <text x="18" y="130">or the tools you work in.</text>
      </g>
    </svg>
  );
}
