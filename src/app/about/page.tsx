import { SectionFoundation } from "@/components/shell/section-foundation";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <SectionFoundation
      id="ABOUT"
      title="Understand the system first."
      description="I build software by turning ambiguous operational reality into boundaries, models, decisions, implementation, and verification. Machines are another expression of the same curiosity about interacting parts."
      status="SLICE 06 / NOT YET BUILT"
    />
  );
}
