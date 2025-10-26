import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contacto — ASEO MARKET",
  description: "Cotiza tu servicio de aseo para empresas. Respuesta rápida."
};

export default function Page(){
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Contacto</h1>
      <p className="text-gray-600 mt-2">Cuéntanos tu necesidad y te responderemos a la brevedad.</p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="font-semibold">ASEO MARKET</h2>
          <ul className="mt-2 text-gray-700 text-sm space-y-1">
            <li>Tel: <a className="underline" href="tel:+56923927777">+56 9 2392 7777</a></li>
            <li>WhatsApp: <a className="underline" href="https://wa.me/56923927777">wa.me/56923927777</a></li>
            <li>Correo: contacto@aseomarket.cl</li>
          </ul>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
