export const problemPaths = [
  { id: "build", title: "Build", summary: "You have an idea. It needs to become a product.", detail: "Turn a product idea, operational need or manual workflow into usable software, with clear priorities and an end-to-end implementation path." },
  { id: "improve", title: "Improve", summary: "Something works. It could work a lot better.", detail: "Understand the existing product, find what makes it difficult to use or maintain, and improve the parts that matter." },
  { id: "automate", title: "Automate", summary: "Your team keeps doing the same work by hand.", detail: "Connect tools and data, remove repetitive steps, and make exceptions visible so people stay in control." },
  { id: "apply-ai", title: "Apply AI", summary: "AI could help. You need it to be dependable.", detail: "Put AI inside a useful workflow with clear inputs, verification, failure boundaries and human review where decisions matter." },
] as const;

export const capabilities = [
  { title: "Automate work with AI", description: "Use AI inside bounded workflows that preserve context, verification and human control.", href: "/systems/prodagentic" },
  { title: "Compare options under real constraints", description: "Turn fragmented evidence and constraints into choices people can inspect and compare.", href: "/systems/vigia" },
  { title: "Connect real-world signals to software", description: "Capture physical signals, preserve history and handle missing data or interrupted connections.", href: "/systems/autopulse" },
  { title: "Build products end to end", description: "Connect interface, application behavior, data and delivery into one coherent product.", href: "/systems/gpets" },
] as const;

export const technicalRange = [
  { label: "Product & interfaces", detail: "Next.js · React · Android · end-to-end product delivery" },
  { label: "Backend & data", detail: "FastAPI · MongoDB · SQLite · durable persistence" },
  { label: "Applied AI", detail: "Bounded workflows · editorial memory · explainable checks · human review" },
  { label: "Systems", detail: "Integrations · recovery · geospatial decision support · explicit constraints" },
] as const;

export const workingModel = [
  { title: "Understand", detail: "Start with the people, the problem and what already exists." },
  { title: "Structure", detail: "Make the scope, decisions and success criteria explicit." },
  { title: "Build", detail: "Connect the pieces into a complete, useful path." },
  { title: "Verify", detail: "Test the behavior and keep the limitations visible." },
  { title: "Evolve", detail: "Improve the system as real evidence changes the picture." },
] as const;
