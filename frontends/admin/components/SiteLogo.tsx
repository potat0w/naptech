import { siteLogo } from "@/lib/site-logo";
import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  inverted?: boolean;
  linked?: boolean;
  onClick?: () => void;
};

export default function SiteLogo({
  className = "h-14 w-auto",
  width = 320,
  height = 80,
  priority = false,
  inverted = false,
  linked = true,
  onClick,
}: SiteLogoProps) {
  const image = (
    <Image
      src={siteLogo.src}
      alt={siteLogo.alt}
      width={width}
      height={height}
      className={`object-contain ${inverted ? "brightness-0 invert" : ""} ${className}`}
      priority={priority}
    />
  );

  if (!linked) {
    return <span className="inline-flex shrink-0 items-center overflow-visible">{image}</span>;
  }

  return (
    <Link href="/" onClick={onClick} className="inline-flex shrink-0 items-center overflow-visible">
      {image}
    </Link>
  );
}
