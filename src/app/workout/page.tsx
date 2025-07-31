"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	Legend,
	BarChart,
	Bar,
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from "recharts";

const data = [
	{ name: "Mensual", value: 14, total: 20, fill: "#6366f1" },
	{ name: "Semanal", value: 4, total: 10, fill: "#3b82f6" },
	{ name: "Anual", value: 85, total: 100, fill: "#a78bfa" },
];

const radarData = [
	{ category: "Mensual", progreso: 70, fullMark: 100 },
	{ category: "Semanal", progreso: 40, fullMark: 100 },
	{ category: "Anual", progreso: 85, fullMark: 100 },
];

const lineData = [
	{ name: "Enero", Mensual: 10, Semanal: 2, Anual: 60 },
	{ name: "Febrero", Mensual: 14, Semanal: 4, Anual: 65 },
	{ name: "Marzo", Mensual: 12, Semanal: 3, Anual: 70 },
	{ name: "Abril", Mensual: 16, Semanal: 5, Anual: 75 },
	{ name: "Mayo", Mensual: 18, Semanal: 6, Anual: 80 },
];

export default function Workout() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<main className="relative min-h-screen flex items-center justify-center">
			{/* Fondo igual que en home */}
			<div className="absolute inset-0 -z-10">
				<Image
					src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80"
					alt="Fondo gimnasio"
					fill
					style={{ objectFit: "cover" }}
					className="opacity-40"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/70 to-blue-700/80" />
			</div>
			{/* Tarjeta contenedor grande */}
			<div className="relative w-full max-w-[98vw] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-indigo-200 flex flex-col md:flex-row gap-10 px-4 md:px-12 py-8 md:py-14 overflow-hidden min-h-[92vh]">
				{/* Calendario lateral */}
				<div className="w-full md:w-[340px] flex flex-col items-center mb-8 md:mb-0">
					<h3 className="text-2xl font-bold text-indigo-700 mb-4">
						Calendario
					</h3>
					<div className="bg-white/90 rounded-2xl shadow-md border border-indigo-100 p-4">
						<Calendar
							date={selectedDate}
							onChange={setSelectedDate}
							color="#6366f1"
							showMonthAndYearPickers={true}
							weekdayDisplayFormat="EEEEEE"
						/>
					</div>
					<span className="mt-4 text-indigo-700 font-semibold text-center">
						Día seleccionado:{" "}
						<span className="font-bold">
							{selectedDate.toLocaleDateString()}
						</span>
					</span>
					{/* Gráfico de entrenamientos profesional (LineChart) */}
					<div className="w-full mt-8">
						<div className="bg-white/90 rounded-2xl shadow-md border border-indigo-100 p-6">
							<h4 className="text-lg font-bold text-indigo-700 mb-4 text-center">
								Progreso por temporalidad
							</h4>
							<ResponsiveContainer width="100%" height={260}>
								<LineChart
									data={lineData}
									margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" tick={{ fill: "#6366f1", fontWeight: 700 }} />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line
										type="monotone"
										dataKey="Mensual"
										stroke="#6366f1"
										strokeWidth={3}
										dot={{ r: 5 }}
										name="Mensual"
										activeDot={{ r: 8 }}
									/>
									<Line
										type="monotone"
										dataKey="Semanal"
										stroke="#3b82f6"
										strokeWidth={3}
										dot={{ r: 5 }}
										name="Semanal"
										activeDot={{ r: 8 }}
									/>
									<Line
										type="monotone"
										dataKey="Anual"
										stroke="#a78bfa"
										strokeWidth={3}
										dot={{ r: 5 }}
										name="Anual"
										activeDot={{ r: 8 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
				{/* Rutinas tipo lista mejoradas */}
				<div className="flex-1 flex flex-col">
					<div className="flex items-center justify-between mb-10">
						<h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700 bg-clip-text text-transparent animate-gradient-move drop-shadow">
							Workout
						</h2>
						<button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-blue-800 transition-all duration-200 hover:scale-105 text-lg">
							<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
								<rect x="10" y="4" width="4" height="16" rx="2" fill="currentColor" />
								<rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" />
							</svg>
							Agregar
						</button>
					</div>
					<div className="flex flex-col gap-6 w-full">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="flex items-center gap-5 bg-white/95 border border-indigo-100 rounded-2xl shadow-lg px-6 py-4 hover:shadow-2xl transition group"
							>
								<div className="relative flex items-center justify-center w-16 h-16 rounded-xl border-2 border-indigo-200 bg-indigo-50 group-hover:border-indigo-400 transition">
									{/* Icono de ejercicio */}
									<svg width="32" height="32" fill="none" viewBox="0 0 24 24">
										<rect x="2" y="9" width="3" height="6" rx="1" fill="#6366f1" />
										<rect x="19" y="9" width="3" height="6" rx="1" fill="#6366f1" />
										<rect x="7" y="11" width="10" height="2" rx="1" fill="#6366f1" />
										<rect x="5" y="7" width="2" height="10" rx="1" fill="#6366f1" />
										<rect x="17" y="7" width="2" height="10" rx="1" fill="#6366f1" />
									</svg>
									<span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow group-hover:bg-indigo-700 transition">
										Día {i + 1}
									</span>
								</div>
								<div className="flex-1">
									<span className="block text-lg font-bold text-indigo-700 mb-1 group-hover:text-indigo-900 transition">
										Rutina de entrenamiento
									</span>
									<span className="block text-gray-700 text-base">
										Descripción breve del entrenamiento o rutina para este día.
									</span>
								</div>
								<button className="ml-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition shadow group-hover:scale-105">
									Ver
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Animación gradiente título */}
			<style jsx>{`
				.animate-gradient-move {
					background-size: 200% 200%;
					animation: gradient-move 3s ease-in-out infinite;
				}
				@keyframes gradient-move {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			`}</style>
		</main>
	);
}