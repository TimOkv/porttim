import { useId } from "react";
// Значок MAX в линейном стиле сайта: кольцо с хвостиком реплики, как у фирменного знака.
// gradient — обводка с переливом от акцента к сиреневому, иначе цвет текста.
export function MaxIcon({
  size = 24,
  gradient = false,
}: {
  size?: number;
  gradient?: boolean;
}) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={gradient ? `url(#${id})` : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {gradient && (
        <defs>
          <linearGradient
            id={id}
            x1="3"
            y1="21"
            x2="21"
            y2="3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5b72ff" />
            <stop offset="1" stopColor="#b49dff" />
          </linearGradient>
        </defs>
      )}
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <circle cx="12" cy="12" r="3.6" />
    </svg>
  );
}
