"use client";
const push = (event, extra={}) => window?.dataLayer?.push({ event, ...extra });

export default function CTAButtons({ service }) {
  const phone = "+56923927777";
  const wa = `https://wa.me/56923927777?text=Hola%20quiero%20cotizar%20${encodeURIComponent(service || "servicio de aseo")}`;

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#contacto"
        onClick={()=>push("cta_click",{service})}
        className="btn bg-gradient-to-b from-brand to-brandDark text-white shadow-soft hover:brightness-110"
      >
        Cotizar ahora
      </a>
      <a
        href={wa}
        onClick={()=>push("whatsapp_click",{service})}
        className="btn border border-neutral-300 bg-white/80 backdrop-blur hover:bg-white shadow-soft"
      >
        WhatsApp
      </a>
      <a
        href={`tel:${phone}`}
        onClick={()=>push("phone_click",{service})}
        className="btn text-brand hover:bg-brand/10"
      >
        Llamar
      </a>
    </div>
  );
}
