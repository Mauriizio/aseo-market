"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Globe, Mail } from "lucide-react";

/** Frases escritorio (typewriter en franja roja) */
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ minHeight: "calc(100svh - 64px)" }}
    >
      {/* ====== BANDAS / FONDOS ====== */}
      {/* Rojo desktop (1/3) */}
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-10 hidden md:block"
        style={{
          height: "calc(100svh - 64px)",
          width: "33.333vw",
          background:
            "linear-gradient(180deg,var(--brand) 0%, var(--brand-dark) 100%)",
        }}
      />
      {/* Highlight radial sobre rojo (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none hidden md:block absolute right-0 inset-y-0 -z-10"
        style={{
          width: "33.333vw",
          background:
            "radial-gradient(120% 80% at 70% 30%, rgba(255,255,255,.12), rgba(255,255,255,0) 60%)",
        }}
      />
      {/* (IMPORTANTE) Quitamos la banda roja vertical en mobile */}

      {/* Vignette sutil en blanco (todo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10"
        style={{
          height: "calc(100svh - 64px)",
          width: "100vw",
          background:
            "radial-gradient(80% 60% at 40% 50%, rgba(0,0,0,.04), rgba(0,0,0,0) 60%)",
        }}
      />

      {/* ====== MOBILE HERO (flyer-like) ====== */}
      <div className="md:hidden px-5 pt-6 h-full flex flex-col">
        {/* Esquina doblada superior derecha */}
        <div className="absolute right-0 top-0 w-[55vw] h-[30vw]">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <defs>
              <linearGradient id="fold" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-dark)" />
                <stop offset="100%" stopColor="var(--brand)" />
              </linearGradient>
            </defs>
            <path d="M100,0 L100,60 C65,40 35,25 0,0 Z" fill="url(#fold)" />
          </svg>
        </div>

        {/* Contenido principal mobile */}
        <div
          className={`mt-8 text-center transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/logo-aseo-market.png"
            alt="Aseo Market"
            width={1400}
            height={420}
            priority
            className="mx-auto h-auto w-[88%] max-w-[680px]"
          />

          <h1 className="mt-6 text-[17px] font-semibold tracking-wide text-brand uppercase">
            Aseo y Mantención Industrial
          </h1>
          <p className="mt-2 text-gray-700">
            Empresa con más de 25 años de experiencia en el rubro.
          </p>

          <div className="mt-5 flex flex-col gap-3 items-center">
            <a
              href="#contacto"
              className="btn w-[88%] bg-brand text-white hover:bg-brandDark"
            >
              Agendar visita
            </a>
            <a
              href="tel:+56995542422"
              className="btn w-[88%] border border-neutral-300 hover:bg-neutral-50"
            >
              Llamar
            </a>
          </div>
        </div>

        {/* Franja inferior con datos e íconos (solo mobile) */}
        <MobileContactStrip />
      </div>

      {/* ====== DESKTOP HERO (columna blanca centrada) ====== */}
      <div className="hidden md:grid mx-auto max-w-7xl px-4 h-full grid-cols-2 items-center">
        <div
          className={`flex flex-col justify-center items-center text-center gap-5 transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Logo más grande con leve scale */}
          <div className="md:scale-[1.15] origin-center">
            <Image
              src="/logo-aseo-market.png"
              alt="Aseo Market"
              width={2000}
              height={600}
              priority
              className="mx-auto h-auto w-full max-w-[1400px]"
            />
          </div>

          <p className="text-gray-700 max-w-2xl px-2">
            Empresa con más de 25 años de experiencia en el rubro.
          </p>

          <div className="mt-1 flex gap-3">
            <a href="#contacto" className="btn bg-brand text-white hover:bg-brandDark">
              Agendar visita
            </a>
            <a
              href="tel:+56995542422"
              className="btn border border-neutral-300 hover:bg-neutral-50"
            >
              Llamar
            </a>
          </div>
        </div>
      </div>

      {/* ====== TYPEWRITER SOLO ESCRITORIO ====== */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[33.333vw] z-10">
        <div className="grid place-items-center w-full px-[3vw] h-full">
          <TypewriterPanel phrases={PHRASES} centered />
        </div>
      </div>
    </section>
  );
}

/* ---------- Tira de contacto inferior (mobile) ---------- */
function MobileContactStrip() {
  return (
    <div className="mt-auto pb-5">
      <div className="mx-[-20px] pt-4 pb-5 px-5 bg-brand text-white rounded-t-2xl shadow-[0_-6px_20px_rgba(0,0,0,.08)]">
        <div className="grid grid-cols-1 gap-3 text-[13px]">
          <ContactRow
            icon={<Phone className="w-4 h-4" />}
            label="+56 9 9555 42422"
            href="tel:+56995542422"
          />
          <ContactRow
            icon={<MapPin className="w-4 h-4" />}
            label="Los Militares 5620 Of. 905"
            href="https://maps.google.com/?q=Los%20Militares%205620%20Of.%20905"
          />
          <ContactRow
            icon={<Globe className="w-4 h-4" />}
            label="aseomarket.com"
            href="https://aseomarket.com"
          />
          <ContactRow
            icon={<Mail className="w-4 h-4" />}
            label="aseomarketspa@gmail.com"
            href="mailto:aseomarketspa@gmail.com"
          />
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon, label, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition rounded-lg px-3 py-2"
      aria-label={label}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </a>
  );
}

/* ---------- Typewriter rojo (desktop) ---------- */
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
      const dt = now - last;
      last = now;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        setTxt(phrases[0]);
        cancelAnimationFrame(raf.current);
        return;
      }

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
        if (tRef.current >= holdTime) {
          tRef.current = 0;
          setMode("erase");
        }
      } else {
        tRef.current += dt;
        if (tRef.current >= eraseSpeed) {
          tRef.current = 0;
          const next = txt.slice(0, -1);
          setTxt(next);
          if (!next.length) {
            setPi((i) => (i + 1) % phrases.length);
            setMode("type");
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
