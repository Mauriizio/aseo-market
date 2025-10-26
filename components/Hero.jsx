"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PHRASES = [
  "Aseo industrial certificado",
  "Tratamientos Acrilicos",
  "Vidrios en altura",
  "Electricidad Certificada",
  "Gasfiteria Industrial",
  "Soldadura Certificada",
  "Aseo de grandes superficies",
  "Mantención de oficinas",
  "Limpieza y desinfeccion",
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ minHeight: "calc(100svh - 64px)" }}
    >
      {/* Franjas rojas */}
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-10 hidden md:block"
        style={{
          height: "calc(100svh - 64px)",
          width: "33.333vw",
          background: "linear-gradient(180deg,var(--brand) 0%, var(--brand-dark) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-10 md:hidden"
        style={{
          height: "calc(100svh - 64px)",
          width: "42vw",
          background: "linear-gradient(180deg,var(--brand) 0%, var(--brand-dark) 100%)",
        }}
      />

      {/* Columna izquierda (centrada) */}
      <div className="mx-auto max-w-7xl px-4 h-full grid md:grid-cols-2 items-center">
        <div className="flex flex-col justify-center items-center text-center py-8 md:py-10 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
            className="w-full"
          >
            {/* LOGO 50–60% MÁS GRANDE */}
            <Image
              src="/logo-aseo-market.png"
              alt="Aseo Market"
              width={1800}
              height={520}
              priority
              className="mx-auto w-[98%] md:w-[100%] max-w-[1200px] h-auto"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.05 } }}
            className="text-gray-700 max-w-2xl"
          >
            Empresa con más de 25 años de experiencia en el rubro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.1 } }}
            className="mt-2 flex flex-wrap justify-center gap-3"
          >
            <a href="#contacto" className="btn bg-brand text-white hover:bg-brandDark">
              Agendar visita
            </a>
            <a href="tel:+56923927777" className="btn border border-neutral-300 hover:bg-neutral-50">
              Llamar
            </a>
          </motion.div>
        </div>
      </div>

      {/* Panel de frases ABSOLUTO y CENTRADO dentro de la franja roja */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[33.333vw] z-10">
        <div className="grid place-items-center w-full px-[3vw] h-full">
          <TypewriterPanel phrases={PHRASES} centered />
        </div>
      </div>
    </section>
  );
}

/* ========== Typewriter ========== */
function TypewriterPanel({
  phrases,
  typingSpeed = 45,
  holdTime = 1300,
  eraseSpeed = 35,
  centered = false,
}) {
  const [pi, setPi] = useState(0);
  const [txt, setTxt] = useState("");
  const [mode, setMode] = useState("type");
  const raf = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    let last = performance.now();
    const step = (now) => {
      const dt = now - last; last = now;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setTxt(phrases[0]); cancelAnimationFrame(raf.current); return; }

      if (mode === "type") {
        tRef.current += dt;
        if (tRef.current >= typingSpeed) {
          tRef.current = 0;
          const full = phrases[pi];
          const next = full.slice(0, txt.length + 1);
          setTxt(next);
          if (next.length >= full.length) setMode("hold");
        }
      } else if (mode === "hold") {
        tRef.current += dt;
        if (tRef.current >= holdTime) { tRef.current = 0; setMode("erase"); }
      } else {
        tRef.current += dt;
        if (tRef.current >= eraseSpeed) {
          tRef.current = 0;
          const next = txt.slice(0, -1);
          setTxt(next);
          if (!next.length) { setPi((i) => (i + 1) % phrases.length); setMode("type"); }
        }
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, pi, txt, phrases]);

  return (
    <div
      className={`text-white drop-shadow w-full max-w-[28vw] ${
        centered ? "text-center" : ""
      }`}
    >
      <h2 className="font-serif text-5xl xl:text-6xl font-bold">
        Aseo y Mantención Industrial
      </h2>

      <div className="mt-5 text-2xl xl:text-3xl font-semibold tracking-tight flex items-center gap-2 justify-center">
        <span className="inline-block min-h-[2rem] xl:min-h-[2.2rem]">
          {txt}
        </span>
        <span className="w-[2px] h-[1.9rem] xl:h-[2.2rem] bg-white animate-pulse" />
      </div>
    </div>
  );
}
