# Constitución del Proyecto — ASEO MARKET
**Versión:** 1.0 • **Fecha:** 2025-10-06  
**Responsable:** Maurizio José Caballero Contreras — Desarrollador Web (RUT 25.630.085-0)  
**Contacto:** livemauriz@gmail.com • +56 9 2392 7777

---

## 1) Resumen Ejecutivo
Sitio web corporativo y landings orientadas a captación de leads para ASEO MARKET (servicios de aseo industrial) con medición end-to-end (Google Ads → Web → n8n → Visita en terreno). Se prioriza tiempo de salida, bajo costo y escalabilidad.

**Principios:** Mobile-first • Velocidad • Trazabilidad • Seguridad • Bajo costo operativo.

---

## 2) Objetivos
1. **Generar leads calificados** (llamadas, WhatsApp, formularios).  
2. **Medir y optimizar** campañas (CPL, CVR, fuentes, servicios y comunas).  
3. **Automatizar respuestas** con n8n para filtrar y calentar prospectos.  
4. **Escalar** con páginas específicas por servicio y por zona cuando convenga.

**KPIs núcleo:** Conversion Rate (CVR) • Costo por Lead (CPL) • Número de leads/día • % de respuesta en < 15 min • Tiempo de carga (LCP < 2.5s, INP < 200ms, CLS < 0.1).

---

## 3) Alcance (MVP)
- **Sitio web** (Next.js) con Home, Servicios (páginas específicas), Clientes, Nosotros, Contacto, Política de Privacidad, robots.txt, sitemap.xml, manifest.
- **Landings** por servicio (y/o por comuna en fase posterior).
- **Formularios** conectados a **n8n** (Webhook) + thank-you page.
- **Eventos** y **conversión** en GA4 y Google Ads via GTM.
- **Automatización n8n**: Recepción de leads, validación básica, respuestas automáticas por email/WhatsApp, creación de tarea/agenda cuando el prospecto pide visita.
- **Dashboard** gratuito en **Looker Studio** con datos de GA4/Ads y (opcional) Google Sheets de n8n.

**Fuera de alcance MVP:** Blog, intranet, pagos online, CRM propio, multilenguaje. (Se pueden agregar por change request).

---

## 4) Requerimientos del Cliente (insumos)
1. **Logo** (PNG o SVG) y **paleta de colores**.  
2. **Lista final de servicios** (nombres comerciales y descripciones breves).  
3. **Cobertura geográfica** (regiones/comunas).  
4. **Clientes y permisos** para mostrar **logos** (prueba social).  
5. **Historia/diferenciales** (15+ años, protocolos, certificaciones, seguridad).  
6. **Contacto** (teléfono/WhatsApp principal, correo corporativo).  
7. **Fotos** propias (si existen). En su defecto: **stock/IA** + mockups con logo.  
8. **Dominio** (ej.: aseomarket.cl) y acceso DNS (si se registra).

---

## 5) Arquitectura Técnica (alineada al stack del proyecto devmauricv)
- **Framework:** Next.js **15.3.5** (App Router) • **React 19.x** • **Node ≥18.18**  
- **Estilos:** Tailwind CSS **3.x**  
- **Animaciones/UI:** Framer Motion **12.x** • lucide-react **0.525.x**  
- **Imágenes:** `next/image` + assets en `public/`  
- **Email:** **Resend ^4.6.0** (envío de acuse/alertas)  
- **Automatización:** **n8n** self-host (Docker)  
- **Medición:** Google Tag Manager + **GA4** + **Google Ads**  
- **Dashboard:** **Looker Studio** (gratuito)  
- **Captcha:** hCaptcha o reCAPTCHA (gratuitos para este uso)  
- **Hosting sugerido:** Vercel (plan gratuito inicial).  
- **Opcional IA local:** **Ollama** con modelo liviano (p. ej., Llama 3.x 3B/8B o Phi-3 Mini) para clasificación/redacción corta en n8n.

**Variables de entorno (env):**  
- `RESEND_API_KEY` (obligatoria)  
- `GTM_ID`  
- `GA_MEASUREMENT_ID` (si se inyecta directo)  
- `ADS_CONVERSION_ID` (si aplica)  
- `N8N_WEBHOOK_URL` (endpoint de recepción de leads)  
- `WHATSAPP_API_URL` / `WHATSAPP_API_TOKEN` (fase API)  
- `EMAIL_FROM`, `EMAIL_TO` (notificaciones)

---

## 6) Estructura de Información (Sitemap)
- `/` — **Landing principal** (ads genéricos “aseo industrial”, “aseo empresas”).  
- `/servicios/` — índice.  
  - `/servicios/aseo-industrial`  
  - `/servicios/limpieza-vidrios-altura`  
  - `/servicios/mantencion-oficinas`  
  - `/servicios/ducteria-clima`  
  - `/servicios/lavado-alfombras`  
  - `/servicios/electricidad-certificada`  
  - `/servicios/gas-certificada`  
- `/clientes/` — logos con permiso + mini casos.  
- `/nosotros/` — historia, equipo, protocolos, coberturas.  
- `/contacto/` — formulario + WhatsApp + mapa.  
- `/gracias/` — confirmación de envío (marca conversión).  
- `/politica-de-privacidad`  
- `robots.txt` • `sitemap.xml` • `manifest.webmanifest` • favicon/og.

---

## 7) UX de Alta Conversión (plantilla)
**Hero (above the fold):** Título claro, subtítulo con propuesta de valor (15+ años, equipos certificados), **CTA triple** (Cotizar, Llamar, WhatsApp), pruebas de confianza (logos, certificaciones).  
**Cuerpo:** Servicios destacados con enlaces, diferenciadores, carrusel de clientes, mini-casos, **form corto** con consentimiento y thank-you page, **FAQ** (5–7).  
**Footer:** Datos completos, mapa, horario, razón social/RUT (si lo comparten).

---

## 8) Eventos de Medición (dataLayer / GTM)
- `cta_click` (ubicación: hero, navbar, secciones)  
- `phone_click` (links `tel:`)  
- `whatsapp_click` (links `wa.me` con prefill)  
- `form_view` (cuando el form entra al viewport)  
- `form_submit` (éxito → redirect a `/gracias`)  
- `service_view` (cuando se visita una página de servicio)
- **Atributos comunes:** `page`, `service`, `source`, `campaign`, `term`, `gclid`, `wbraid`, `pathname`, `timestamp`, `device`.

---

## 9) Integración con n8n (MVP)
**Entradas:**  
- Formulario web → `POST` JSON a **`N8N_WEBHOOK_URL`**.  
- WhatsApp: **Fase 1 (gratis)** con `wa.me` (sin API). **Fase 2** (pagada) con proveedor de WhatsApp Business API para webhooks.  
- Email (opcional): Bandeja “cotizaciones@” vía IMAP.

**Proceso n8n:** validación + scoring, enriquecimiento (comuna/utm/gclid), persistencia (Google Sheets o DB), auto-respuestas (email + WhatsApp), ruteo a visita (crear evento/alerta), notificación interna (correo/Slack), deduplicación por hash (email+tel+timestamp), límites anti-spam.

**IA en n8n:** vía **Ollama local** (preferido, costo 0) o proveedor económico. Usos: clasificar intención/servicio, redactar respuesta breve, nunca decisiones críticas.

---

## 10) Políticas y Cumplimiento
- **Privacidad (Chile — Ley 19.628):** checkbox de consentimiento, aviso de privacidad, finalidad y conservación de datos.  
- **Permisos de logos**: autorización escrita para mostrar clientes.  
- **WhatsApp TOS:** no usar automatizaciones que violen términos (no scraping/puppeteer de WhatsApp Web).  
- **Seguridad:** HTTPS, rate limit, honeypot, captcha, sanitización inputs.

---

## 11) Roadmap y Entregables
**Fase 0 — Kickoff (Día 0–1)**  
- Validación de sitemap, servicios prioritarios, cobertura y CTA.  
- Crear contenedor GTM, propiedad GA4, proyecto Looker Studio (plantilla).

**Fase 1 — Wireframes + Copy (Día 1–3)**  
- Wireframes Home + 2 servicios + Contacto.  
- Redacción base de titulares, bullets y FAQs.

**Fase 2 — Implementación (Día 3–7)**  
- Páginas, formularios, eventos GTM/GA4/Ads, thank-you.  
- Integración n8n (webhook + email).  
- Resend para avisos (acuse + notificación interna).

**Fase 3 — QA & Go-Live (Día 7–9)**  
- QA móvil/desktop, Core Web Vitals, pruebas de conversión y webhook.  
- Publicar y verificar conversiones en Ads.

**Fase 4 — Optimización Inicial (Día 10–30)**  
- A/B (titular/CTA), revisión palabras negativas, tuning de n8n e IA.  
- Reporte en Looker Studio semanal.

**Entregables:** sitio productivo, contenedor GTM, propiedad GA4, panel Looker, flujo n8n, documentación `.env` y manual de uso rápido.

---

## 12) Costos Variables (orientativo — minimizar gasto)
- **Dominio**: pago anual (según registrador).  
- **Hosting Vercel**: plan gratuito suficiente al inicio.  
- **GTM/GA4/Looker Studio**: **gratis**.  
- **n8n**: **gratis** si se **autohospeda** (Docker en PC propia o VPS).  
- **IA local (Ollama)**: **gratis** (requiere equipo encendido y recursos).  
- **WhatsApp Fase 1**: `wa.me` **gratis**, sin automatización.  
- **WhatsApp Business API (Fase 2)**: **de pago** (tarifa por conversación + posible fee del proveedor).  
- **Resend (emails)**: tiene **plan gratuito limitado**; si se excede, se paga.  
- **hCaptcha/reCAPTCHA**: **gratuitos** para este escenario.

**Nota:** Autohospedar en laptop vieja reduce costos, pero implica **uptime**, **electricidad**, **IP dinámica** y **mantenimiento**. Para exposición segura se recomienda **Cloudflare Tunnel**. Producción estable = **VPS** económico (~USD 5/mes) cuando crezcan los volúmenes.

---

## 13) Riesgos & Mitigación
- **Disponibilidad** (servidor casero): usar SAI/batería, monitor de uptime y reinicio automático; evaluar VPS si aumenta el tráfico.  
- **Spam**: captcha + honeypot + rate-limit y validaciones en n8n.  
- **IA inconsistente**: prompts acotados y reglas; handover a humano si hay ambigüedad.  
- **Falta de permisos para logos**: obtener autorización escrita antes de publicar.  
- **Desalineación Ads ↔ Landing**: crear landings por servicio/keyword y mantener coherencia de mensajes.

---

## 14) Definición de Hecho (DoD)
- Core Web Vitals dentro de objetivo.  
- Eventos verificados en GA4 y conversiones en Ads.  
- Formularios entregando a n8n y correos automáticos funcionando.  
- Looker Studio mostrando KPIs clave.  
- Páginas de servicio indexables con metadatos correctos.  
- Política de privacidad publicada y consentimiento operativo.

---

## 15) Gobernanza del Proyecto
- Este documento es la **base**. Cambios relevantes de alcance/arquitectura → **Addendum** con versión nueva.  
- Todo ajuste de contenidos (servicios, zonas, logotipos) se gestiona por correo para dejar **trazabilidad**.

---

## 16) Anexos Técnicos
**Campos del formulario (POST JSON a n8n):**  
```json
{
  "name": "string",
  "company": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "comuna": "string",
  "message": "string",
  "gclid": "string",
  "wbraid": "string",
  "utm_source": "string",
  "utm_medium": "string",
  "utm_campaign": "string",
  "utm_term": "string",
  "utm_content": "string",
  "pathname": "string",
  "timestamp": "ISO8601",
  "device": "mobile|desktop",
  "consent": true
}
```

**Eventos GA4 (nombres recomendados):** `cta_click`, `phone_click`, `whatsapp_click`, `form_view`, `form_submit`, `service_view`.

---

**Fin del documento.**
