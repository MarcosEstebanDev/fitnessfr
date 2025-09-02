import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { BackgroundByRoute } from "../components/layout/BackgroundByRoute";
import "../styles/global.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitnessFR",
  description: "Entrena mejor. Vive mejor. Coaching, planes y comunidad en un solo lugar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <NavBar />
          <div className="flex-1 min-h-0">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
