"use client";
import Image from "next/image";

interface Props {
  image: string;
  // si true, el fondo inicia debajo del nav (h-14 = 56px)
  startBelowNav?: boolean;
  // 0-100 (solo controla intensidad final del overlay)
  overlayOpacity?: number;
  // paleta del overlay
  overlayTint?: "light" | "dark";
}

export function PageBackground({
  image,
  startBelowNav = true,
  overlayOpacity = 55,
  overlayTint = "light",
}: Props) {
  // alto del NavBar: h-14 = 56px
  const top = startBelowNav ? "56px" : "0px";
  const styleOpacity = Math.min(Math.max(overlayOpacity, 0), 100) / 100;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0" style={{ top }}>
      <Image src={image} alt="background" fill className="object-cover" priority />
      <div
        className={
          overlayTint === "light"
            ? "absolute inset-0 bg-gradient-to-b from-indigo-800/40 via-indigo-900/45 to-indigo-950/60"
            : "absolute inset-0 bg-gradient-to-b from-indigo-950/55 via-indigo-950/65 to-black/75"
        }
        style={{ opacity: styleOpacity }}
      />
    </div>
  );
}