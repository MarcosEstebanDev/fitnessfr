export const BRAND = {
  name: "FitnessFR",
  colors: {
    primary: "#16a34a",
    accent: "#22c55e",
    dark: "#0b0f12",
  },
  overlay: {
    opacity: 50 as const,    // consistente en todas las pantallas
    tint: "light" as const,  // mismo tinte para la misma línea visual
  },
};

// Ajusta las claves a tus rutas reales
export const ROUTE_BACKGROUNDS: Record<string, string> = {
  "/": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
  "/planes": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
  "/comunidad": "https://images.unsplash.com/photo-1519311965067-36d3e5f28774?q=80&w=1600&auto=format&fit=crop",
  "/workout": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1600&auto=format&fit=crop",
};