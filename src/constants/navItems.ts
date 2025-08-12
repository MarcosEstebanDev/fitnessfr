export interface NavItem {
  label: string;
  href: string;
  auth?: boolean;
  guestOnly?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Progreso", href: "/progress", auth: true },
  { label: "Workouts", href: "/workouts", auth: true },
  { label: "Login", href: "/login", guestOnly: true },
  { label: "Registro", href: "/register", guestOnly: true },
];