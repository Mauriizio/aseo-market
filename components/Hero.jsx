"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButtons from "./CTAButtons";
import { HERO_ITEMS } from "@/data/heroItems";

export default function Hero() {
  const [idx, setIdx] = useState(0);

  // rotación suave sin desmontar el contenedor (evita flicker)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_ITEMS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const current = HERO_ITEMS[idx];

  return (
    <section className="border-b">
      <div className="container py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* IZQUIERDA: Logo grande + texto + CTA */}
        <div className="relative">
          {/* Marca de agua en MOBILE */}
          <div className="absolute -z-10 inset-0 md:hidden opacity-[0.06] bg-[url('/logo-aseo-market.png')] bg-contain bg-no-repeat bg-center" />
          <div className="hidden md:block mb-6">
            <Image
              src="/logo-aseo-market.png"
              alt="Aseo Market"
              width={420}
              height={120}
              priority
              className="w-auto h-auto"
            />
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
            Aseo y Mantención <span className="text-brand">Industrial</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            15+ años de experiencia. Protocolos claros y respuesta rápida. Cotiza hoy y programa una visita técnica.
          </p>

          <div className="mt-6">
            <CTAButtons />
          </div>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {["Respuesta en 1h hábil","Planes mensuales","Personal certificado","Cobertura nacional"].map((b,i)=>(
              <motion.li
                key={b}
                initial={{opacity:0, y:8}}
                whileInView={{opacity:1, y:0}}
                viewport={{ once: true }}
                transition={{ delay: i*0.05 }}
                className="rounded-lg border p-3"
              >
                {b}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* DERECHA: Slider crossfade sin parpadeo */}
        <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-soft bg-neutral-100">
          {/* Preload invisible (evita flash en primera carga) */}
          {HERO_ITEMS.map(item => (
            <Image
              key={`preload-${item.id}`}
              src={item.img}
              alt=""
              width={1}
              height={1}
              priority
              className="hidden"
            />
          ))}

          {/* Capa actual con crossfade */}
          {HERO_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 45vw, 95vw"
                priority={i === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 text-white drop-shadow">
                <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                <p className="text-white/90">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
