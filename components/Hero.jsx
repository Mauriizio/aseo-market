"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/** Frases cortas que rotan sobre la banda roja (desktop) */
const PHRASES = [
  "Aseo industrial certificado",
  "Vidrios en altura",
  "Mantención de oficinas",
  "Lavado de alfombras",
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ minHeight: "calc(100svh - 64px)" }} // 64px ≈ header
    >
      {/* Banda roja vertical */}
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-10"
        style={{
          height: "calc(100svh - 64px)",
          width: "33.333vw",               // 1/3 de ancho (ajusta a 30vw si la quieres más delgada)
          background: "linear-gradient(180deg,var(--brand) 0%, var(--brand-dark) 100%)",
        }}
      />
      {/* Banda roja móvil (un poco más estrecha) */}
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-10 md:hidden"
        style={{
          height: "calc(100svh - 64px)",
          width: "42vw",
          background: "linear-gradient(180deg,var(--brand) 0%, var(--brand-dark) 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 h-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* IZQUIERDA: Logo + eslogan + CTAs */}
        <div className="flex flex-col justify-center py-8 md:py-10">
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0, transition:{duration:.45}}}>
            <Image
              src="/logo-aseo-market.png"
              alt="Aseo Market"
              width={1200}
              height={340}
              priority
              className="w-[94%] md:w-[96%] h-auto mx-auto md:mx-0"
            />
          </motion.div>

          <motion.p
            initial={{opacity:0, y:8}}
            animate={{opacity:1, y:0, transition:{duration:.45, delay:.05}}}
            className="text-gray-700 max-w-xl mt-4 md:mt-6"
          >
            15+ años de experiencia. Protocolos claros y respuesta rápida.
          </motion.p>

          <motion.div
            initial={{opacity:0, y:8}}
            animate={{opacity:1, y:0, transition:{duration:.45, delay:.1}}}
            className="mt-4 flex flex-wrap gap-3"
          >
            <a href="#contacto" className="btn bg-brand text-white hover:bg-brandDark">
              Agendar visita
            </a>
            <a href="tel:+56923927777" className="btn border border-neutral-300 hover:bg-neutral-50">
              Llamar
            </a>
          </motion.div>
        </div>

        {/* DERECHA: Desktop → typewriter; Mobile → oculto */}
        <div className="hidden md:flex h-full items-center justify-center">
          <TypewriterPanel phrases={PHRASES} />
        </div>
      </div>
    </section>
  );
}

/** Panel sobre la banda roja con typewriter limpio y sin parpadeos */
function TypewriterPanel({ phrases, typingSpeed = 45, holdTime = 1300, eraseSpeed = 35 }) {
  const [pi, setPi] = useState(0);        // índice de frase
  const [txt, setTxt] = useState("");     // texto visible
  const [mode, setMode] = useState("type"); // "type" | "hold" | "erase"
  const raf = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    let last = performance.now();

    const step = (now) => {
      const dt = now - last;
      last = now;

      // respeta usuarios que prefieren menos movimiento
      const prefersReduced = typeof window !== "undefined" &&
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        // solo muestra la primera frase estática
        setTxt(phrases[0]);
        cancelAnimationFrame(raf.current);
        return;
      }

      if (mode === "type") {
        tRef.current += dt;
        if (tRef.current >= typingSpeed) {
          tRef.current = 0;
          const full = phrases[pi];
          const nextLen = txt.length + 1;
          const next = full.slice(0, nextLen);
          setTxt(next);
          if (nextLen >= full.length) {
            setMode("hold");
            tRef.current = 0;
          }
        }
      } else if (mode === "hold") {
        tRef.current += dt;
        if (tRef.current >= holdTime) {
          setMode("erase");
          tRef.current = 0;
        }
      } else if (mode === "erase") {
        tRef.current += dt;
        if (tRef.current >= eraseSpeed) {
          tRef.current = 0;
          const next = txt.slice(0, -1);
          setTxt(next);
          if (next.length === 0) {
            setMode("type");
            setPi((i) => (i + 1) % phrases.length);
          }
        }
      }

      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, pi, txt, phrases]);

  return (
    <div className="w-full pr-[4vw]">
      <div className="text-white">
        <h2 className="font-serif text-4xl lg:text-5xl font-bold drop-shadow">
          Aseo y Mantención Industrial
        </h2>

        <div className="mt-5 text-2xl lg:text-3xl font-semibold tracking-tight flex items-center gap-2">
          <span className="inline-block min-h-[1.8rem] lg:min-h-[2rem]">
            {txt}
          </span>
          {/* cursor */}
          <span className="w-[2px] h-[1.6rem] lg:h-[1.9rem] bg-white animate-pulse" />
        </div>
      </div>
    </div>
  );
}
