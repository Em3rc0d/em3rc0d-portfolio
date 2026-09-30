const encoder = new TextEncoder();

function escapePdf(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function text(font: "F1" | "F2", size: number, x: number, y: number, value: string) {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdf(value)}) Tj ET`;
}

function buildCvPdf() {
  const lines: string[] = [];
  lines.push(text("F2", 22, 48, 795, "Eduardo Farid Merino Cordova"));
  lines.push(text("F1", 11, 48, 775, "Software Engineer | Full Stack | Applied AI | Systems"));
  lines.push(text("F1", 8.5, 48, 756, "Lima, Peru | linkedin.com/in/emerinoc | github.com/Em3rc0d | farid.merino1673@gmail.com"));

  let y = 724;
  const section = (title: string) => {
    lines.push(text("F2", 10, 48, y, title));
    y -= 18;
  };
  const body = (value: string, indent = 48, font: "F1" | "F2" = "F1", size = 9) => {
    lines.push(text(font, size, indent, y, value));
    y -= 14;
  };
  const gap = (amount = 6) => { y -= amount; };

  section("PROFILE");
  body("Software Engineer building end-to-end products across backend, frontend, mobile, data,");
  body("automation and applied AI. I work from requirements and architecture through implementation,");
  body("integration, deployment and production evolution.");
  gap();

  section("PROFESSIONAL EXPERIENCE");
  body("Full Stack Developer - Thradex Tech", 48, "F2", 10);
  body("Lima, Peru | Feb 2025 - Present", 48, "F1", 8.5);
  body("End-to-end software development spanning APIs, web interfaces, SQL/NoSQL persistence,");
  body("integrations, performance, automation, applied AI, testing, CI/CD and containerization.");
  gap();

  section("EDUCATION");
  body("Universidad Nacional Mayor de San Marcos (UNMSM)", 48, "F2", 10);
  body("Systems & Informatics Engineering | Mar 2022 - Present | Final stage | Top third");
  gap();

  section("SELECTED ENGINEERING WORK");
  body("AutoPulse", 48, "F2", 10);
  body("Android vehicle intelligence with live OBD-II telemetry and local-first driving sessions.", 62);
  body("VIGIA", 48, "F2", 10);
  body("Geospatial planning and fixed-budget territorial scenario comparison.", 62);
  body("prodAgentic", 48, "F2", 10);
  body("Governed content workflow with editorial memory, novelty controls and human approval.", 62);
  body("CV Engine", 48, "F2", 10);
  body("ATS and career opportunity intelligence with evidence-first CV generation.", 62);
  body("TALOS", 48, "F2", 10);
  body("Source-aware process intelligence with semantic validation and durable execution.", 62);
  body("FinanceSensor", 48, "F2", 10);
  body("Privacy-first financial telemetry R&D with canonical events and E2EE architecture.", 62);
  gap();

  section("TECHNICAL SCOPE");
  body("Java | Spring Boot | Python | FastAPI | Node.js | TypeScript | Next.js | React | Angular");
  body("React Native | PostgreSQL/PostGIS | MongoDB | SQLite | Docker | GitHub Actions | AWS");
  body("Applied AI | OAuth/JWT/RLS | BLE/OBD-II");

  const stream = lines.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [5 0 R] /Count 1 >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents 6 0 R >>",
    `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(encoder.encode(pdf).length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return encoder.encode(pdf);
}

export async function GET() {
  const pdf = buildCvPdf();
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Eduardo-Merino-CV.pdf"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
