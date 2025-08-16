"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/workout", label: "Workout" },
	{ href: "/progress", label: "Progreso" },
	{ href: "/login", label: "Iniciar sesión" },
	{ href: "/register", label: "Registrarse" },
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-rose-200 h-16">
			<nav className="mx-auto w-[min(1260px,95vw)] h-full flex items-center justify-between px-4">
				<Link
					href="/"
					className="font-extrabold text-lg bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent"
				>
					FitApp
				</Link>
				<ul className="flex items-center gap-4">
					{links.map((l) => {
						const active = pathname === l.href;
						return (
							<li key={l.href}>
								<Link
									href={l.href}
									className={[
										"px-3 py-1.5 rounded-xl text-sm font-semibold transition-colors",
										active
											? "text-rose-700 bg-rose-50 border border-rose-200"
											: "text-gray-700 hover:text-rose-700 hover:bg-rose-50",
									].join(" ")}
								>
									{l.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}