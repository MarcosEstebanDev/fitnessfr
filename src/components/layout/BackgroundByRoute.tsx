"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_BACKGROUNDS } from "../../theme/brand";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1600&auto=format&fit=crop";

function resolveImage(pathname: string) {
  if (ROUTE_BACKGROUNDS[pathname]) return ROUTE_BACKGROUNDS[pathname];
  const first = "/" + pathname.split("/").filter(Boolean)[0];
  return ROUTE_BACKGROUNDS[first] ?? ROUTE_BACKGROUNDS["/"] ?? DEFAULT_BG;
}

export function BackgroundByRoute() {
  const pathname = usePathname() || "/";
  const resolved = resolveImage(pathname);
  const [image, setImage] = useState(resolved);

  useEffect(() => {
    const url = resolveImage(pathname);
    // Preload y fallback si falla
    const img = new Image();
    img.onload = () => setImage(url);
    img.onerror = () => setImage(DEFAULT_BG);
    img.src = url;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          // Tinte oscuro rojizo + imagen
          backgroundImage: `linear-gradient(180deg, rgba(20,10,10,0.76), rgba(12,4,4,0.88)), url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}