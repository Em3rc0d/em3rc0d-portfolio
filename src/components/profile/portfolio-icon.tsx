type IconName = "mail" | "github" | "linkedin" | "pin" | "signal" | "document" | "chip" | "audio";

const paths: Record<IconName, string> = {
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  github: "M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.5-4 5.2 5.2 0 0 0-.1-4s-1.3-.4-4.2 1.5a14 14 0 0 0-7 0C5.1-.4 3.8 0 3.8 0a5.2 5.2 0 0 0-.1 4 5.7 5.7 0 0 0-1.5 4c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 8 18v4",
  linkedin: "M3 3h18v18H3z M7 10v7 M7 7v.01 M11 17v-7 M11 13a3 3 0 0 1 6 0v4",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  signal: "M4 17v3 M9 12v8 M14 7v13 M19 2v18",
  document: "M5 3h10l4 4v14H5z M14 3v5h5 M8 12h8 M8 16h6",
  chip: "M6 6h12v12H6z M9 9h6v6H9z M9 2v4 M15 2v4 M9 18v4 M15 18v4 M2 9h4 M2 15h4 M18 9h4 M18 15h4",
  audio: "M3 10v4 M7 6v12 M12 2v20 M17 6v12 M21 10v4",
};

export function PortfolioIcon({ name }: { name: IconName }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>;
}
