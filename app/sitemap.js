export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = ["/", "/servicios", "/contacto", "/gracias"].map(p => ({ url: `${base}${p}`, lastModified: new Date() }));
  return urls;
}
