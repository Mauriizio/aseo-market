export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ASEO MARKET. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <a href="/politica-de-privacidad" className="hover:underline">Privacidad</a>
          <a href="/contacto" className="hover:underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
