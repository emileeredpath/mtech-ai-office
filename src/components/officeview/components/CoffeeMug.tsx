export function CoffeeMug() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
      {/* Mug body */}
      <path
        d="M 8 8 L 6 20 Q 6 24 10 24 L 18 24 Q 22 24 22 20 L 20 8 Z"
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="0.5"
      />

      {/* Mug rim */}
      <ellipse cx="14" cy="8" rx="6.5" ry="2.5" fill="#A0522D" stroke="#654321" strokeWidth="0.5" />
      <ellipse cx="14" cy="7.8" rx="6" ry="2" fill="#B8714F" opacity="0.6" />

      {/* Coffee inside */}
      <ellipse cx="14" cy="9" rx="5.5" ry="2" fill="#3D2817" opacity="0.9" />
      <path d="M 9 9 Q 14 10.5 19 9" stroke="#5C3D2E" strokeWidth="0.5" fill="none" opacity="0.6" />

      {/* Mug handle */}
      <path
        d="M 20 12 Q 25 12 25 16 Q 25 20 20 20"
        fill="none"
        stroke="#654321"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 20 13 Q 23.5 13 23.5 16 Q 23.5 19 20 19"
        fill="none"
        stroke="#8B4513"
        strokeWidth="0.8"
        opacity="0.7"
      />

      {/* Shine on mug */}
      <ellipse cx="10" cy="14" rx="2" ry="4" fill="#fff" opacity="0.15" />

      {/* Foam/head */}
      <ellipse cx="14" cy="7" rx="6" ry="1.5" fill="#F5DEB3" opacity="0.8" />
    </svg>
  );
}
