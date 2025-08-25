"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_BACKGROUNDS } from "../../theme/brand";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1600&q=80";

// Guarda la imagen seleccionada por ruta durante la sesión
const selectedImages: Record<string, string> = {};

function resolveImage(pathname: string) {
  const bg = ROUTE_BACKGROUNDS[pathname as keyof typeof ROUTE_BACKGROUNDS];
  if (Array.isArray(bg)) {
    if (!selectedImages[pathname]) {
      selectedImages[pathname] = bg[Math.floor(Math.random() * bg.length)];
    }
    return selectedImages[pathname];
  }
  if (bg) return bg;
  return DEFAULT_BG;
}

export function BackgroundByRoute() {
  const pathname = usePathname() || "/";
  const [image, setImage] = useState(resolveImage(pathname));
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false); // inicia fade-out
    const url = resolveImage(pathname);
    const img = new Image();
    img.onload = () => {
      setTimeout(() => {
        setImage(url);
        setFade(true); // inicia fade-in
      }, 300); // duración fade-out
    };
    img.onerror = () => setImage(DEFAULT_BG);
    img.src = url;
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    >
      <div
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(20,10,10,0.45), rgba(12,4,4,0.55)), url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}