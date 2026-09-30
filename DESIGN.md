# Portfolio — cinematic field / system / product

## Design thesis
A dark editorial engineering portfolio: copper type, real work as the visual anchor, and a compact narrative from physical inputs to software outcomes. The user's supplied reference is the composition authority; the existing content remains the authority for project facts.

## Source and confidence
| Decision | Classification | Source | Confidence |
| --- | --- | --- | --- |
| Full-width cinematic hero; copper headline | OBSERVED | docs/design/portfolio-reference.png | High |
| PlacaClara full width, AutoPulse and ECHO paired | OBSERVED | User reference | High |
| Six compact supporting projects | OBSERVED | User reference | High |
| Portrait, principles and direct contact at bottom | OBSERVED | User reference | High |
| Project claims, email, CV and social URLs | OFFICIAL | Existing src/content modules | High |
| Breakpoints and mobile stacking | INFERRED | Content length and reference hierarchy | Medium; not rendered in this pass |
| Four photographic scene backgrounds | GENERATED | Built-in image_gen; docs/design/image-prompts.json | Illustrative only |

## Tokens
- Canvas #050a0d / #080d10; raised surface #11191c.
- Main text #f3f2ef; body #b9bdbc; copper #efa777.
- Borders #374042; soft divisions #202c30; 4px button corners.
- Existing local Instrument Sans and IBM Plex Mono fonts.
- Desktop gutters clamp(1.25rem, 4.8vw, 5rem), compact section spacing, no large blank intervals.
- Hero title 3.3–5.2rem; regular weight; copper second clause.

## Composition and behavior
1. Existing global navigation retains localized project, about, CV and contact routes. EM monogram follows the reference.
2. Hero: decorative workstation photograph behind semantic HTML text, real navigation CTAs and FIELD / SYSTEM / PRODUCT progression.
3. PlacaClara: full-width editorial panel; real product visual sits over a generated garage backdrop. Existing product asset retains its branding.
4. AutoPulse: generated vehicle setting with the existing real field-session screen. No generated measurements.
5. ECHO: generated microphone atmosphere and an explicitly conceptual HTML/SVG audio-to-event pipeline. No invented confidence score or accuracy claim.
6. Supporting work: TALOS, VIGIA, prodAgentic, CV Engine, FinanceSensor, Prompt Machine. Actual existing captures when available; existing conceptual system artifacts otherwise. Full catalog remains linked.
7. About retains the existing portrait route. Principles retain existing wording. Email uses mailto; LinkedIn/GitHub use existing profile URLs; CV retains /api/cv.

## Responsive rules
- Above 1100px: paired project panels, six supporting cards, three bottom columns.
- 761–1100px: bottom contact becomes a full-width row.
- At 760px: project panels stack, supporting cards use three columns, bottom sections stack.
- At 440px: supporting cards use two columns; portrait, principles and contact links stack.
- Navigation preserves the existing mobile toggle and Escape behavior.
- English, Spanish and Portuguese use the same layout and existing routing.

## Accessibility and motion
- Single h1, section headings, native links, existing skip link and focus outlines.
- Decorative image backgrounds use empty alt. The portrait retains its descriptive alt.
- Hover image scaling is CSS-only. prefers-reduced-motion disables transformations and transitions.
- No new JavaScript dependencies, client fetch loops, canvas or autoplay content.
- Only hero image has priority; remaining images use default lazy loading.

## Delivery boundary
User explicitly requested execution without tests or verification. No dependency installation, build, lint, typecheck, browser preview, screenshot run or automated test was executed. Responsive behavior and visual equivalence are implemented but not validated. Existing detailed case studies and their evidence boundaries remain authoritative.

## Case-study system identities — 2026-09-30

Scope: the right-hand panel in individual project pages, shared across EN/ES/PT. Homepage cards keep their existing rendering. The user-provided identity brief is OFFICIAL design direction; the new SVG compositions are handcrafted interpretations, not runtime evidence. Source coverage, matching cells, signals and maps are schematic and never assert measured results.

| Project | Base geometry / stroke | Visual tension | Semantic progression |
| --- | --- | --- | --- |
| PlacaClara | Radial source constellation / nodal | Convergence; dashed variable coverage | Plate → Sources → Evidence → Report → Decision |
| AutoPulse | Multichannel timeline / stepped traces | Partial capture gap over continuous stored history | Capture → Persist → Recover → Understand |
| ECHO | Acoustic corridor / waveform windows | Candidate becoming temporally confirmed event | Audio → Inference → Event → Publish |
| CV Engine | Comparison matrix / orthogonal cells | Aligned, partial and missing evidence | Evidence → Opportunity → Assessment → Application |
| TALOS | Vertical authority chain / rectilinear gates | G1–G3 preceding execution; durable runtime loop | Source → Review → Approve → Execute |
| VIGIA | Territory lattice / overlays | Alternative allocation scenarios | Territory → Constraints → Scenarios → Allocation |
| prodAgentic | Editorial memory loop / curved return | Novelty check and explicit human gate | Idea → Memory → Novelty → Draft → Approve |
| FinanceSensor | Layered signal stack / planes | Privacy boundary before observability | Signals → Normalize → Protect → Observe |

Materials: existing carbon and copper palette, bone labels, muted sand secondary copy, thin technical lines and a low-opacity 30-unit grid. Helpers share only primitive labels, connectors and nodes; each system owns its composition. No animation, imagery, fake dashboards, external requests or additional dependencies.

Responsive: SVG viewBox 600×420 preserves geometry; individual case heroes stack at 1100px and below to give diagrams more room. Small-screen captions provide readable explanations of the same flow. SVG title/description use unique IDs; prose is localized and technical diagram labels are marked English. Match states also use check, dash and dot shapes, not color alone. Mobile behavior is implemented, not visually validated.

Implementation: src/components/systems/project-identity.tsx; styles scoped to .project-identity in src/styles/components/project-identity.css. Unspecified projects retain their existing SystemArtifact through an explicit fallback. No changes to content claims, evidence, routing, project state or homepage composition.

Delivery: no tests, build, typecheck, lint, browser preview or deployment executed for this change, per request. Visual/runtime quality has not been verified in this pass.
