import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { findSystem } from "@/content/systems/index";
import { SocialCard } from "@/components/systems/social-card";
export const size={width:1200,height:630};
export const contentType="image/png";
export const alt="Software system — Eduardo Merino";
export default async function Image({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const system=findSystem(slug);if(!system)notFound(); return new ImageResponse(<SocialCard system={system}/>,size); }
