export const problemPaths = [
  { id: "build", title: "Build", summary: "You have an idea. It needs to become a product.", detail: "Turn a product idea, operational need or manual workflow into usable software, with clear priorities and an end-to-end implementation path." },
  { id: "improve", title: "Improve", summary: "Something works. It could work a lot better.", detail: "Understand the existing product, find what makes it difficult to use or maintain, and improve the parts that matter." },
  { id: "automate", title: "Automate", summary: "Your team keeps doing the same work by hand.", detail: "Connect tools and data, remove repetitive steps, and make exceptions visible so people stay in control." },
  { id: "apply-ai", title: "Apply AI", summary: "AI could help. You need it to be dependable.", detail: "Put AI inside a useful workflow with clear inputs, verification, failure boundaries and human review where decisions matter." },
] as const;

export const capabilities = [
  { title: "AI & automation", description: "Workflows that use context, preserve decisions and keep people in control.", href: "/systems/prodagentic" },
  { title: "Decision systems", description: "Turn fragmented evidence and real constraints into options people can compare.", href: "/systems/vigia" },
  { title: "Connected software", description: "Bring physical signals into products that handle missing data and interruptions.", href: "/systems/autopulse" },
  { title: "Full-stack products", description: "Connect the interface, application behavior and durable data into one coherent product.", href: "/systems/gpets" },
] as const;

export const workingModel = [
  { title: "Understand", detail: "Start with the people, the problem and what already exists." },
  { title: "Structure", detail: "Make the scope, decisions and success criteria explicit." },
  { title: "Build", detail: "Connect the pieces into a complete, useful path." },
  { title: "Verify", detail: "Test the behavior and keep the limitations visible." },
  { title: "Evolve", detail: "Improve the system as real evidence changes the picture." },
] as const;
