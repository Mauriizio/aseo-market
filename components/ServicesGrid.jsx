import { SERVICES } from "@/data/services";
import CTAButtons from "./CTAButtons";

export default function ServicesGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Servicios</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(s => (
          <article key={s.slug} className="border rounded-xl p-5 hover:shadow-sm transition">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{s.blurb}</p>
            <div className="mt-4">
              <CTAButtons service={s.title} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
