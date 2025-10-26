"use client";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  return (
    <section id="contacto" className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Solicitar cotización</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault(); setLoading(true);
          const fd = new FormData(e.currentTarget);
          fd.append("pathname", window.location.pathname);
          const res = await fetch("/api/contact", { method:"POST", body: fd });
          if (res.ok) {
            window.dataLayer?.push({ event:"form_submit" });
            window.location.href = "/gracias";
          } else { setLoading(false); alert("Error al enviar. Intenta de nuevo."); }
        }}
        className="mt-4 grid gap-3"
      >
        <input name="name" placeholder="Nombre" required className="border p-3 rounded"/>
        <input name="company" placeholder="Empresa (opcional)" className="border p-3 rounded"/>
        <input name="email" type="email" placeholder="Correo" required className="border p-3 rounded"/>
        <input name="phone" placeholder="WhatsApp/Teléfono" required className="border p-3 rounded"/>
        <input name="service" placeholder="Servicio requerido" className="border p-3 rounded"/>
        <textarea name="message" placeholder="Cuéntanos tu necesidad" rows={4} className="border p-3 rounded"/>
        <label className="text-sm"><input type="checkbox" required className="mr-2"/>Acepto la Política de Privacidad</label>
        <button disabled={loading} className="px-4 py-3 rounded bg-blue-600 text-white hover:bg-blue-700">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
}
