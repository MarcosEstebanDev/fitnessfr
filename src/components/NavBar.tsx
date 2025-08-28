"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, clearSession, type FitnessSession } from "@/lib/session";

export default function NavBar() {
	const router = useRouter();
	const [session, setSessionState] = useState<FitnessSession | null>(() => getSession());
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onChange = () => setSessionState(getSession());
		window.addEventListener("fitnessfr_session_changed", onChange);
		window.addEventListener("storage", onChange);
		return () => {
			window.removeEventListener("fitnessfr_session_changed", onChange);
			window.removeEventListener("storage", onChange);
		};
	}, []);

	function initials() {
		if (!session) return "";
		const { firstName, lastName, email } = session.user;
		if (firstName || lastName) {
			return `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase();
		}
		return (email || "").charAt(0).toUpperCase();
	}

	function displayName() {
		if (!session) return "";
		const { firstName, lastName, email } = session.user;
		return firstName ? `${firstName}${lastName ? " " + lastName : ""}` : email;
	}

	function handleSignOut() {
		clearSession();
		setOpen(false);
		router.replace("/");
	}

	// Nota: moví el comentario fuera del JSX para evitar errores de sintaxis
	// mover menú un poco más a la derecha para que no tape el contenido
	return (
		<nav className="w-full border-b border-rose-100 bg-white/60 backdrop-blur-sm">
			{/* contenedor relativo para poder posicionar el grupo de enlaces fuera del flujo */}
			<div className="max-w-6xl mx-auto px-6 py-3 flex items-center relative">
				<Link href="/" className="text-lg font-bold text-rose-700">
					FitnessFR
				</Link>

				{/* posiciono el bloque de navegación mucho más a la derecha */}
				<div className="absolute right-0 transform translate-x-48 md:translate-x-72 lg:translate-x-96 flex items-center gap-4 z-50">
					{!session ? (
						<>
							<Link href="/login" className="text-sm font-medium text-gray-700 hover:text-rose-700">
								Iniciar
							</Link>
							<Link
								href="/register"
								className="text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-red-700 px-3 py-1.5 rounded-lg shadow-sm hover:opacity-95"
							>
								Registro
							</Link>
						</>
					) : (
						<>
							<Link href="/workout" className="text-sm font-medium text-gray-700 hover:text-rose-700">
								Workout
							</Link>
							<Link href="/progress" className="text-sm font-medium text-gray-700 hover:text-rose-700">
								Progress
							</Link>

							<div className="relative">
								<button
									onClick={() => setOpen((s) => !s)}
									aria-label="Abrir menú de usuario"
									className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-rose-100 shadow-sm"
								>
									<span className="h-8 w-8 rounded-full bg-rose-600 text-white font-semibold flex items-center justify-center">
										{initials()}
									</span>
									<span className="hidden sm:inline text-sm font-medium text-gray-800">
										{displayName()}
									</span>
								</button>

								{open && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-rose-100 overflow-hidden z-50 transform translate-x-4 sm:translate-x-8 origin-top-right">
										<div className="px-4 py-2 text-sm text-gray-700 border-b border-rose-100">
											<div className="font-medium">{displayName()}</div>
											<div className="text-xs text-gray-500 mt-0.5">
												{session.user.email}
											</div>
										</div>
										<Link
											href="/workout"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
										>
											Mis workouts
										</Link>
										<Link
											href="/profile"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
										>
											Perfil
										</Link>
										<button
											onClick={handleSignOut}
											className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-50"
										>
											Cerrar sesión
										</button>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}