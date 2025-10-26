"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Coloca tu logo en /public/logo-aseo-market.png (180x180 que enviaste sirve) */}
          <Image src="/logo-aseo-market.png" alt="Aseo Market" width={36} height={36} className="rounded-sm" />
          <span className="font-semibold tracking-tight">Aseo Market</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/clientes" className="hover:underline">Clientes</Link>
          <Link href="/nosotros" className="hover:underline">Nosotros</Link>
          <Link href="/contacto" className="btn-brand">Cotizar</Link>
        </nav>

        <a href="tel:+56923927777" className="md:hidden btn-brand text-sm">Llamar</a>
      </div>
    </header>
  );
}
