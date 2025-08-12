"use client";
import Image from "next/image";

interface Props {
  image: string;
  startBelowNav?: boolean; // si true deja libre la franja del nav
  overlayOpacity?: number; // 0-100
  overlayTint?: "light" | "dark";
}

export const PageBackground = ({
  image,
  startBelowNav = true,
  overlayOpacity = 55,
  overlayTint = "dark",
}: Props) => {
  const o = Math.min(Math.max(overlayOpacity, 0), 100) / 100;
  // Alto del nav (h-14 = 56px)
  const top = startBelowNav ? "56px" : "0";

  return (
    <div
      className="pointer-events-none select-none fixed inset-x-0 bottom-0 z-0"
      style={{ top }}
    >
      <Image
        src={image}
        alt="background"
        fill
        className="object-cover"
        priority
      />
      <div
        className={`absolute inset-0 ${
          overlayTint === "light"
            ? "bg-gradient-to-b from-indigo-800/40 via-indigo-900/45 to-indigo-950/60"
            : "bg-gradient-to-b from-indigo-950/55 via-indigo-950/65 to-black/75"
        }`}
        style={{ opacity: o }}
      />
    </div>
  );
};