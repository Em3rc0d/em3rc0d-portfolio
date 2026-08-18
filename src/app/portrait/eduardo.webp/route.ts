import { PORTRAIT_PART_01 } from "@/content/portrait-data/part-01";
import { PORTRAIT_PART_02 } from "@/content/portrait-data/part-02";
import { PORTRAIT_PART_03 } from "@/content/portrait-data/part-03";
import { PORTRAIT_PART_04 } from "@/content/portrait-data/part-04";
import { PORTRAIT_PART_05 } from "@/content/portrait-data/part-05";

export const runtime = "nodejs";
export const dynamic = "force-static";

const portraitBase64 = [
  PORTRAIT_PART_01,
  PORTRAIT_PART_02,
  PORTRAIT_PART_03,
  PORTRAIT_PART_04,
  PORTRAIT_PART_05,
].join("");

const portraitBytes = Buffer.from(portraitBase64, "base64");

export function GET() {
  return new Response(portraitBytes, {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(portraitBytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
