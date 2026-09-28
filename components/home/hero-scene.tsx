export function HeroScene() {
  return (
    <svg viewBox="0 0 640 720" className="h-auto w-full" role="img" aria-label="生活場景逐步出現：桌面、花器、花束與日常用品">
      <rect width="640" height="720" fill="#E7E0D4" />
      <ellipse cx="470" cy="110" rx="190" ry="80" fill="#FBF7F0" opacity="0.85" />
      <path d="M0 560h640v160H0Z" fill="#DDD3C4" />
      <g className="scene-rise" style={{ animationDelay: "0.25s" }}>
        <rect x="78" y="468" width="484" height="16" fill="#C6B297" />
        <rect x="118" y="484" width="12" height="92" fill="#B7A286" />
        <rect x="510" y="484" width="12" height="92" fill="#B7A286" />
      </g>
      <g className="scene-rise" style={{ animationDelay: "0.85s" }}>
        <path d="M96 468c48-42 92-18 128 2-28-6-78 28-120 0Z" fill="#F6F1E8" />
        <path d="M108 466c36-24 70-8 92 4" stroke="#E4D3BC" strokeWidth="6" />
      </g>
      <g className="scene-rise" style={{ animationDelay: "1.15s" }}>
        <path d="M292 318h78l-14 54c30 20 48 62 40 118-8 58-34 96-72 102h-8c-38-6-64-44-72-102-8-56 10-98 40-118l-14-54h22z" fill="#D7D0C4" />
        <ellipse cx="331" cy="318" rx="42" ry="9" fill="#C9C2B4" />
      </g>
      <g className="scene-rise" style={{ animationDelay: "1.55s" }}>
        <path d="M318 318c-8-70-28-120-42-156" stroke="#3F4F3A" strokeWidth="2" fill="none" />
        <path d="M340 316c8-78 36-124 54-168" stroke="#2C3828" strokeWidth="2" fill="none" />
        <path d="M330 316c0-64-6-112-2-150" stroke="#5C6B54" strokeWidth="1.6" fill="none" />
      </g>
      <g className="scene-bloom" style={{ animationDelay: "1.9s" }}>
        <circle cx="274" cy="156" r="16" fill="#C96B5A" />
        <circle cx="274" cy="156" r="6" fill="#F3D2C6" />
      </g>
      <g className="scene-bloom" style={{ animationDelay: "2.1s" }}>
        <circle cx="396" cy="142" r="18" fill="#A56B4A" />
        <circle cx="396" cy="142" r="6" fill="#F0D7C4" />
      </g>
      <g className="scene-bloom" style={{ animationDelay: "2.28s" }}>
        <circle cx="328" cy="150" r="13" fill="#3F4F3A" />
        <circle cx="328" cy="150" r="4" fill="#E7E0D4" />
      </g>
      <g className="scene-bloom" style={{ animationDelay: "2.45s" }}>
        <ellipse cx="250" cy="188" rx="16" ry="7" fill="#6D7B5E" transform="rotate(-30 250 188)" />
        <ellipse cx="430" cy="176" rx="18" ry="7" fill="#6D7B5E" transform="rotate(28 430 176)" />
      </g>
      <g className="scene-rise" style={{ animationDelay: "2.15s" }}>
        <ellipse cx="470" cy="456" rx="46" ry="14" fill="#CDBEAA" />
        <path d="M428 456c6-28 22-40 42-40s36 12 42 40" fill="#E7DDD0" />
      </g>
      <g className="scene-rise" style={{ animationDelay: "2.4s" }}>
        <rect x="168" y="392" width="46" height="76" rx="23" fill="#F7F3EC" />
        <rect x="184" y="372" width="14" height="24" rx="4" fill="#B08958" />
        <path d="M191 356c6 6 8 10 8 16h-16c0-6 2-10 8-16z" fill="#C96B5A" />
      </g>
    </svg>
  );
}
