export const SERVICES = [
  {
    slug: "aseo-industrial",
    title: "Aseo Industrial",
    blurb: "Turnos y protocolos para plantas, centros logísticos y retail.",
    bullets: [
      "Programas diarios, semanales y turnos nocturnos",
      "Protocolos de seguridad y EPP",
      "Inspecciones y reporte fotográfico"
    ],
    faqs: [
      { q: "¿Trabajan en horario nocturno o fines de semana?", a: "Sí, coordinamos turnos según la operación del cliente." },
      { q: "¿Pueden emitir informes de mantención?", a: "Sí, con checklist, fotos y métricas básicas." }
    ]
  },
  {
    slug: "mantencion-oficinas",
    title: "Mantención de Oficinas",
    blurb: "Limpieza programada, reposición de insumos y desinfección.",
    bullets: [
      "Planes mensuales con SLA",
      "Reposición de insumos (papelería, jabón, etc.)",
      "Desinfección periódica"
    ],
    faqs: [
      { q: "¿Incluye insumos?", a: "Podemos incluirlos o trabajar con insumos del cliente." },
      { q: "¿Realizan control de calidad?", a: "Sí, con visitas y checklist de supervisión." }
    ]
  },
  {
    slug: "limpieza-vidrios-altura",
    title: "Limpieza de Vidrios en Altura",
    blurb: "Técnicas certificadas, equipos y procedimientos de seguridad.",
    bullets: [
      "Personal certificado y asegurado",
      "Líneas de vida, arneses y anclajes",
      "Permisos y documentación al día"
    ],
    faqs: [
      { q: "¿Trabajan con líneas de vida?", a: "Sí, y contamos con los equipos y protocolos requeridos." },
      { q: "¿Pueden coordinar fuera del horario laboral?", a: "Sí, para no interrumpir la operación." }
    ]
  },
  {
    slug: "lavado-alfombras",
    title: "Lavado de Alfombras",
    blurb: "Limpieza profunda en sitio o con retiro y entrega.",
    bullets: [
      "Equipos de inyección y extracción",
      "Secado rápido",
      "Tratamiento de manchas"
    ],
    faqs: [
      { q: "¿Cuánto tarda el secado?", a: "Depende del metraje y ventilación, normalmente 4–8 horas." },
      { q: "¿Atienden urgencias?", a: "Sí, según agenda disponible." }
    ]
  }
];

export function getServiceBySlug(slug){
  return SERVICES.find(s => s.slug === slug);
}
