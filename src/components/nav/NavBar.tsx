"use client";
import { useState, useEffect } from "react";
import { navItems } from "../../constants/navItems";
import { NavLink } from "./NavLink";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const filtered = navItems.filter(i => {
    if (i.auth && !user) return false;
    if (i.guestOnly && user) return false;
    return true;
  });

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 h-14 flex items-center
                 bg-[linear-gradient(90deg,rgba(28,29,60,0.85),rgba(24,24,50,0.78),rgba(20,22,48,0.85))]
                 backdrop-blur-md border-b border-indigo-400/15"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-2 sm:px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-100 min-w-max">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold shadow">
            FF
          </span>
          <span className="hidden sm:inline bg-gradient-to-r from-indigo-200 to-blue-300 bg-clip-text text-transparent">
            FitnessFR
          </span>
        </Link>

        {/* Scrollable nav links for desktop */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-400/30 max-w-[70vw] min-w-0">
          {filtered.map(item => (
            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
          ))}
          {!loading && user && (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition whitespace-nowrap"
            >
              Salir
            </button>
          )}
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          className="lg:hidden inline-flex items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-700/40 text-indigo-100 px-3 py-2 hover:bg-indigo-600/50 transition"
          aria-label="Menú"
          aria-expanded={open}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? <path d="M4 4L18 18M18 4L4 18" /> : <path d="M3 6h16M3 12h16M3 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-14 inset-x-0 bg-[rgba(20,22,48,0.92)] backdrop-blur-xl border-b border-indigo-400/10">
          <div className="px-4 py-4 flex flex-col gap-2">
            {filtered.map(item => (
              <NavLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            {!loading && user && (
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="px-3 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Salir
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};