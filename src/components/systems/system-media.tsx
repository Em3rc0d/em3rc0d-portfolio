import Image from "next/image";
import type { SystemCase } from "@/content/systems/types";
import type { Locale } from "@/i18n/config";

const copy: Record<Locale, { eyebrow: string; title: string; lead: string; labels: Record<"live" | "report" | "product", string>; boundary: string }> = {
  en: {
    eyebrow: "Product reality",
    title: "See the system in use.",
    lead: "Real product material sits beside the conceptual models so the implementation is visible, not just described.",
    labels: { live: "Live system", report: "Recorded report", product: "Product surface" },
    boundary: "Captured from the working product. The case-study claims remain limited by the evidence stated on this page.",
  },
  es: {
    eyebrow: "Realidad del producto",
    title: "Mira el sistema en uso.",
    lead: "Material real del producto acompaña a los modelos conceptuales para que la implementación pueda verse, no solo describirse.",
    labels: { live: "Sistema en vivo", report: "Reporte registrado", product: "Interfaz del producto" },
    boundary: "Capturado desde el producto funcional. Las afirmaciones del caso siguen limitadas por la evidencia indicada en esta página.",
  },
  pt: {
    eyebrow: "Realidade do produto",
    title: "Veja o sistema em uso.",
    lead: "Material real do produto acompanha os modelos conceituais para que a implementação possa ser vista, não apenas descrita.",
    labels: { live: "Sistema ao vivo", report: "Relatório registrado", product: "Interface do produto" },
    boundary: "Capturado do produto funcional. As afirmações do case continuam limitadas pelas evidências indicadas nesta página.",
  },
};

export function SystemMedia({ system, locale = "en" }: { system: SystemCase; locale?: Locale }) {
  if (!system.media?.length) return null;
  const t = copy[locale];

  return <section className="system-media section container" id="product-reality">
    <div className="section-head system-media-head"><div><p className="eyebrow accent">{t.eyebrow}</p><h2>{t.title}</h2></div><p>{t.lead}</p></div>
    <div className={`system-media-grid media-count-${system.media.length}`}>
      {system.media.map((item) => <figure className={`system-media-card media-${item.kind}`} key={item.src}>
        <div className="system-media-frame">
          {item.kind === "video" ? <video muted loop autoPlay playsInline preload="metadata" poster={item.poster} width={item.width} height={item.height} aria-label={item.alt}><source src={item.src} type="video/mp4"/></video> : <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) 100vw, 900px"/>}
        </div>
        <figcaption><span className="eyebrow">{t.labels[item.label]}</span><strong>{system.name}</strong></figcaption>
      </figure>)}
    </div>
    <p className="system-media-boundary">{t.boundary}</p>
  </section>;
}
