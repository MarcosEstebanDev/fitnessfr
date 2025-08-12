"use client";
import { navItems } from "../../constants/navItems";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const isAuth = false;
  const filtered = navItems.filter(i => {
    if (i.auth && !isAuth) return false;
    if (i.guestOnly && isAuth) return false;
    return true;
  });

  return (
    <div className="lg:hidden fixed bottom-4 left-0 right-0 z-50">
      <div className="mx-auto max-w-sm px-4">
        <div className="flex backdrop-blur-xl bg-indigo-900/70 border border-indigo-400/30 rounded-2xl shadow-2xl px-2 py-2 justify-around">
          {filtered.map(i => {
            const active = pathname === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-xs font-medium transition ${
                  active ? "text-white bg-indigo-600/70 shadow" : "text-indigo-200 hover:text-white"
                }`}
              >
                <span>{i.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};