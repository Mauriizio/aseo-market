export const metadata = {
  title: "Clientes — ASEO MARKET",
  description: "Algunas marcas y organizaciones atendidas por ASEO MARKET."
};

const CLIENTS = [
  // Usa logos reales en /public/logos/ cuando los tengas y permisos
  { name: "Santa Isabel", logo: "/logos/santa-isabel.png" },
  { name: "Club Aéreo de Chile", logo: "/logos/club-aereo.png" },
];

export default function Page(){
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
      <p className="text-gray-600 mt-2">Muestras representativas (se publican con autorización).</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
        {CLIENTS.map(c=>(
          <div key={c.name} className="border rounded-xl p-4 grid place-items-center h-28 bg-white">
            {/* Reemplaza por <Image> cuando tengas assets */}
            <img src={c.logo} alt={`Logo ${c.name}`} className="max-h-14 object-contain"/>
          </div>
        ))}
      </div>
    </main>
  );
}
