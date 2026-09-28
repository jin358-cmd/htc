import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function svgProps(props: IconProps): IconProps {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20 20.5" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c1.4-3 3.6-4.4 6.5-4.4s5.1 1.4 6.5 4.4" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M12 19.2s-6.4-3.9-6.4-8.1A3.5 3.5 0 0 1 12 8.3a3.5 3.5 0 0 1 6.4 2.8c0 4.2-6.4 8.1-6.4 8.1Z" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M6.5 8.5h11l-.8 10.2a1 1 0 0 1-1 .8H8.3a1 1 0 0 1-1-.8L6.5 8.5Z" />
      <path d="M9 8.5V7.2A3 3 0 0 1 12 4a3 3 0 0 1 3 3.2v1.3" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}
