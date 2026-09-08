import type { Metadata } from "next";
import { absoluteSiteUrl } from "./site-config";
export function pageMetadata(title: string, description: string, path: string, imagePath = "/opengraph-image"): Metadata {
  const canonical = absoluteSiteUrl(path); const image = absoluteSiteUrl(imagePath);
  const socialTitle = path === "/" ? title : `${title} — Eduardo Merino`;
  return { title, description, ...(canonical ? { alternates: { canonical } } : {}), openGraph: { type: path.startsWith("/systems/") || path.startsWith("/notes/") ? "article" : "website", siteName: "THE BUILD ROOM", title: socialTitle, description, ...(canonical ? { url: canonical } : {}), images: image ? [{ url: image, width: 1200, height: 630, alt: socialTitle }] : [] }, twitter: { card: "summary_large_image", title: socialTitle, description, images: image ? [image] : [] } };
}
