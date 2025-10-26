import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { serif, sans } from "./fonts";

export const metadata = {
  title: "ASEO MARKET — Aseo y Mantención Industrial",
  description: "Servicios de aseo industrial para empresas — 15+ años de experiencia.",
  openGraph: {
    title: "ASEO MARKET — Aseo y Mantención Industrial",
    description: "Servicios de aseo industrial para empresas.",
    images: ["/og/og-1200x630.png"], // ya lo tienes en /public/og/
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/icons/apple-touch-icon-180.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-white text-gray-900 font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
