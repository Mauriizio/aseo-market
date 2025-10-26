import { SERVICES } from "@/data/services";
import CTAButtons from "@/components/CTAButtons";

export const metadata = {
  title: "Servicios — ASEO MARKET",
  description: "Servicios de aseo para empresas: industrial, oficinas, vidrios en altura, lavado de alfombras y más."
};

export default function Page(){
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Servicios</h1>
      <p className="text-gray-600 mt-2">Soluciones a medida para empresas e instituciones.</p>

      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(s => (
          <article key={s.slug} className="border rounded-xl p-5 hover:shadow-sm transition">
            <h2 className="font-semibold">{s.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{s.blurb}</p>
            <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
              {(s.bullets || []).slice(0,3).map((b,i)=>(<li key={i}>{b}</li>))}
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <a className="text-sm underline" href={`/servicios/${s.slug}`}>Ver detalle</a>
              <CTAButtons service={s.title}/>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
