"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CTAButtons from "./CTAButtons";
import { HERO_ITEMS } from "@/data/heroItems";

/**
 * Requisitos:
 * - /public/logo-aseo-market.png  (logo ancho ~600–800px)
 * - HERO_ITEMS con rutas válidas (jpg/png) en /public/hero/
 */

export default function Hero() {
  // índice actual y anterior para crossfade limpio
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const timerRef = useRef(null);
  const LEN = HERO_ITEMS.length;

  useEffect(() => {
    // Single interval (robusto frente a StrictMode)
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPrevIdx((p) => {
        const next = (idx + 1) % LEN;
        return idx; // el anterior pasa a ser el actual
      });
      setIdx((i) => (i + 1) % LEN);
    }, 4500);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LEN, idx]);

  const current = HERO_ITEMS[idx];
  const previous = HERO_ITEMS[prevIdx];

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ minHeight: "calc(100svh - 64px)" }} // 64px ~ header h-16
    >
      {/* Geometría roja: superior derecha */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15vw] top-[10vh] w-[80vw] h-[70vh] -z-10"
        style={{
          background:
            "linear-gradient(180deg,var(--brand) 0%, var(--brand-dark) 100%)",
          clipPath: "polygon(28% 0, 100% 0, 72% 100%, 0 100%)",
          boxShadow: "0 28px 90px -30px rgba(226,30,43,.35)",
        }}
      />
      {/* Geometría roja: inferior izquierda (también visible en mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-25vw] bottom-[-10vh] w-[70vw] h-[35vh] -z-10"
        style={{
          background:
            "linear-gradient(180deg,var(--brand-dark) 0%, var(--brand) 100%)",
          clipPath: "polygon(0 0, 65% 0, 100% 100%, 0 100%)",
          boxShadow: "0 -20px 80px -40px rgba(226,30,43,.25)",
        }}
      />

      <div className="container h-full py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* IZQUIERDA: LOGO grande + copy + CTAs (sin título adicional) */}
        <div className="relative flex flex-col justify-center">
          {/* Logo visible en mobile y desktop */}
          <div className="mb-6">
            <Image
              src="/logo-aseo-market.png"
              alt="Aseo Market"
              width={720}           // ↑ 50% más grande
              height={220}
              priority
              className="w-auto h-auto max-w-[90%] md:max-w-[720px]"
            />
          </div>

          <p className="text-gray-700 max-w-xl">
            15+ años de experiencia. Protocolos claros y respuesta rápida.
            Cotiza hoy y programa una visita técnica.
          </p>

          <div className="mt-6">
            <CTAButtons />
          </div>
        </div>

        {/* DERECHA: SLIDER (crossfade 2 capas: prev → current) */}
        <div className="relative h-[42vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-soft bg-neutral-100">
          {/* Preload silencioso (evita flashes al primer cambio) */}
          {HERO_ITEMS.map((it) => (
            <Image
              key={`pre-${it.id}`}
              src={it.img}
              alt=""
              width={1}
              height={1}
              priority
              className="hidden"
            />
          ))}

          {/* Capa anterior (se desvanece) */}
          <FadeImage
            key={`prev-${previous.id}-${prevIdx}`}
            src={previous.img}
            title={previous.title}
            subtitle={previous.subtitle}
            show={true}
            opacity={0} // destino
          />
          {/* Capa actual (aparece) */}
          <FadeImage
            key={`curr-${current.id}-${idx}`}
            src={current.img}
            title={current.title}
            subtitle={current.subtitle}
            show={true}
            opacity={1} // destino
          />
        </div>
      </div>
    </section>
  );
}

function FadeImage({ src, title, subtitle, opacity }) {
  return (
    <div
      className="absolute inset-0 will-change-opacity transition-opacity duration-700 ease-in-out"
      style={{ opacity }}
    >
      <Image
        src={src}
        alt={title}
        fill
        sizes="(min-width: 768px) 45vw, 95vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 text-white drop-shadow">
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-white/90">{subtitle}</p>
      </div>
    </div>
  );
}
