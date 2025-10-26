import { getServiceBySlug, SERVICES } from "@/data/services";
import CTAButtons from "@/components/CTAButtons";

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }){
  const s = getServiceBySlug(params.slug);
  if(!s) return { title: "Servicio no encontrado — ASEO MARKET" };
  return {
    title: `${s.title} — ASEO MARKET`,
    description: s.blurb
  };
}

export default function ServicePage({ params }){
  const s = getServiceBySlug(params.slug);
  if(!s){
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Servicio no encontrado</h1>
        <p className="mt-2 text-gray-600">Vuelve a la <a className="underline" href="/servicios">lista de servicios</a>.</p>
      </main>
    );
  }

  // JSON-LD básico (Service)
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": s.title,
    "description": s.blurb,
    "provider": { "@type": "Organization", "name": "ASEO MARKET" },
    "areaServed": "Chile",
    "serviceType": s.title
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="text-sm text-gray-500">
        <a className="underline" href="/servicios">Servicios</a> / <span>{s.title}</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight mt-2">{s.title}</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">{s.blurb}</p>

      {!!s.bullets?.length && (
        <ul className="list-disc pl-5 mt-5 text-gray-800 space-y-2">
          {s.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
        </ul>
      )}

      <div className="mt-6">
        <CTAButtons service={s.title}/>
      </div>

      {!!s.faqs?.length && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>
          <div className="mt-4 divide-y">
            {s.faqs.map((f,i)=>(
              <details key={i} className="py-3">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>

          {/* Schema FAQPage */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": s.faqs.map(x => ({
                "@type": "Question",
                "name": x.q,
                "acceptedAnswer": { "@type": "Answer", "text": x.a }
              }))
            })
          }} />
        </section>
      )}
    </main>
  );
}
