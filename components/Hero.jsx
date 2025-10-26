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

/** Frases MOBILE: comenzamos por el eslogan y luego rotamos */
const MOBILE_PHRASES = [
  "Más de 25 años de experiencia.",
  ...PHRASES,
];

/** cambia a true si prefieres pegar una imagen recortada del flyer */
const USE_IMAGE_FOLD = true; // <- si pones true, agrega /public/mobile/fold.png

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
  className="relative overflow-hidden md:border-b"
  style={{ minHeight: "calc(100svh - 64px)" }}
>
  {/* Capa base: “papel” con degradado sutil (desktop y mobile) */}
  <div
    aria-hidden
    className="absolute inset-0 -z-20"
    style={{ background: "var(--paper-grad)" }}
  />

  {/* Franja roja (solo desktop): degradado + brillo */}
  <div
    aria-hidden
    className="absolute right-0 top-0 -z-10 hidden md:block"
    style={{
      height: "calc(100svh - 64px)",
      width: "33.333vw",
      background: "var(--brand-grad)",
    }}
  />


      

      {/* ================= MOBILE (flyer-like) ================ */}

      
      <div className="md:hidden px-5 pt-6 h-full flex flex-col pb-[120px]">
        {/* Dobléz superior derecha: SVG (A) o PNG recortado (B) */}
        {USE_IMAGE_FOLD ? (
          <Image
            src="/mobile/fold.png"  // sube aquí el recorte del flyer
            alt=""
            width={600}
            height={320}
            priority
            className="absolute right-0 top-0 w-[58vw] h-auto pointer-events-none select-none"
          />
        ) : (
          <FoldSvg />
        )}

        {/* Contenido principal mobile */}
        <div
          className={`mt-8 text-center transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Logo más grande y un poco más abajo */}
          <div className="mt-14 px-2"> 
  <div className="relative mx-auto w-[96%] max-w-[920px] h-[34svh] max-h-[340px]">
    <Image
      src="/logo-aseo-market.png"
      alt="Aseo Market"
      fill
      priority
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</div>


          {/* Typewriter en mobile (sustituye eslogan estático) */}
          <div className="mt-12">
            <MobileTypewriter phrases={MOBILE_PHRASES} />
          </div>

          {/* CTAs centrados */}
          <div className="mt-6 flex flex-col gap-3 items-center">
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

        {/* Footer del Hero (rojo) en grid 2×2 */}
        <MobileHeroFooter />
      </div>

      {/* ================= DESKTOP (SIN CAMBIOS) ================ */}
      <div className="hidden md:grid mx-auto max-w-7xl px-4 h-full grid-cols-2 items-center">
        <div
          className={`flex flex-col justify-center items-center text-center gap-5 transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
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

      {/* Typewriter escritorio centrado en la banda roja */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[33.333vw] z-10">
        <div className="grid place-items-center w-full px-[3vw] h-full">
          <DesktopTypewriter phrases={PHRASES} />
        </div>
      </div>
    </section>
  );
}

/* ============ COMPONENTES MOBILE =============== */

/** Footer rojo 2×2 como en el flyer */
function MobileHeroFooter() {
  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-20"
      // respeta notch en iOS y no pisa el sistema:
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="w-full pt-4 pb-5 px-5 bg-brand text-white rounded-none border-t border-white/15">

        {/* GRID 2×2 como en el flyer */}
        <div className="grid grid-cols-2 gap-3 text-[10px]">
          <ContactCell
            icon={<Phone className="w-4 h-4" />}
            label="+56 9 9555 42422"
            href="tel:+56995542422"
          />
        {/* derecha fila 1 */}
          <ContactCell
            icon={<Globe className="w-4 h-4" />}
            label="aseomarket.com"
            href="https://aseomarket.com"
          />
        {/* izquierda fila 2 */}
          <ContactCell
            icon={<MapPin className="w-4 h-4" />}
            label="Los Militares 5620 Of. 905"
            href="https://maps.google.com/?q=Los%20Militares%205620%20Of.%20905"
          />
        {/* derecha fila 2 */}
          <ContactCell
            icon={<Mail className="w-4 h-4" />}
            label="aseomarketspa@gmail.com"
            href="mailto:aseomarketspa@gmail.com"
          />
        </div>
      </div>
    </div>
  );
}


function ContactCell({ icon, label, href }) {
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

/** Typewriter mobile */
function MobileTypewriter({ phrases }) {
  return (
    <TypewriterBase
  phrases={phrases}
  classNameTitle="text-[24px] font-semibold tracking-wide text-brand uppercase"
  classNameLine="mt-3 text-[16px] text-gray-800"
  showStaticTitle={true}
  staticTitle="Aseo y Mantención Industrial"
  maxWidth="90%"
/>

  );
}

/** Dobléz superior (SVG escalable) */
function FoldSvg() {
  return (
    <svg viewBox="0 0 100 60" className="absolute right-0 top-0 w-[58vw] h-auto">
      <defs>
        <linearGradient id="foldGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-dark)" />
          <stop offset="100%" stopColor="var(--brand)" />
        </linearGradient>
        <radialGradient id="foldSh" cx="65%" cy="25%" r="60%">
          <stop offset="0%" stopColor="rgba(0,0,0,.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* capa principal */}
      <path d="M100,0 L100,60 C65,40 35,25 0,0 Z" fill="url(#foldGrad)" />
      {/* sombra interior sutil para simular papel doblado */}
      <path d="M100,0 L100,60 C65,40 35,25 0,0 Z" fill="url(#foldSh)" opacity=".18" />
    </svg>
  );
}

/* ============ TYPEWRITER BASE (reutilizable) ============= */

function DesktopTypewriter({ phrases }) {
  return (
    <TypewriterBase
      phrases={phrases}
      classNameTitle="font-serif text-5xl xl:text-6xl font-bold text-white text-center"
      classNameLine="mt-5 text-2xl xl:text-3xl font-semibold tracking-tight text-white text-center"
      showStaticTitle={true}
      staticTitle="Aseo y Mantención Industrial"
      maxWidth="28vw"
    />
  );
}

function TypewriterBase({
  phrases,
  typingSpeed = 45,
  holdTime = 1300,
  eraseSpeed = 35,
  showStaticTitle = false,
  staticTitle = "",
  classNameTitle = "",
  classNameLine = "",
  maxWidth = "100%",
}) {
  const [pi, setPi] = useState(0);
  const [txt, setTxt] = useState("");
  const [mode, setMode] = useState("type"); // "type" | "hold" | "erase"
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
    <div className="w-full" style={{ maxWidth, margin: "0 auto" }}>
      {showStaticTitle && (
        <h2 className={classNameTitle}>{staticTitle}</h2>
      )}
      <div className={`${classNameLine} flex items-center gap-2 justify-center`}>
        <span className="inline-block min-h-[1.9rem]">{txt}</span>
        <span className="w-[2px] h-[1.7rem] bg-current animate-pulse" />
      </div>
    </div>
  );
}
