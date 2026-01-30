export function MedalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="15"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 12L10.5 14L11 16L12 15.5L13 16L13.5 14L12 12Z"
        fill="currentColor"
      />
      <path
        d="M8.5 3L10 9M15.5 3L14 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
