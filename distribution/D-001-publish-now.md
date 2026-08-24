# D-001 — Immediate Publish Approval

**Distribution object:** `D-001`  
**Title:** `NO_DATA is not zero.`  
**State:** `APPROVED / READY TO PUBLISH`  
**Owner instruction:** `PUBLISH NOW`  
**Approval time:** `2026-08-24 08:52 PET`  
**Platform:** LinkedIn personal profile  
**Source authority:** AutoPulse / `N-01` / `E-AP-07`  
**Portfolio bridge:** `https://em3rc0d-portfolio.vercel.app/notes/no-data-is-not-zero`

## Publish copy

**NO_DATA is not zero.**

That sounds obvious until a telemetry UI has to render both of them.

Imagine an OBD request returns one of these outcomes:

- a valid value of `0`
- `NO_DATA`
- timeout
- adapter error
- disconnect

Flattening them all into `0` makes the UI easier to draw.

It also destroys information.

In AutoPulse I keep successful acquisition, NO_DATA, transport failure and disconnection as different states. Repeated NO_DATA can affect whether a PID remains in the active polling set, while a timeout or adapter failure follows a different path.

Why does that matter?

Because downstream logic should still be able to answer:

> Was the value actually zero, was the PID unsupported, or did acquisition fail?

If absence becomes a measurement too early, later summaries can no longer recover that distinction.

This is a small modeling decision, but I keep finding the same rule in different systems:

**missing information is often a state of its own.**

The cleaner-looking model is not always the more truthful one.

## Portfolio bridge

Use as the final line or first comment:

`I documented the AutoPulse boundary and its evidence here: https://em3rc0d-portfolio.vercel.app/notes/no-data-is-not-zero`

## Visual

Editable Figma authority:

`https://www.figma.com/design/3UGAtVONTzNphfIusCUDVN`

Frame:

`D-001 / node 1:2 / 1080×1350`

Visual acceptance already rendered successfully before the Figma Starter MCP quota was exhausted on later frames.

## Claim ceiling

The current AutoPulse evidence supports the explicit `NO_DATA` path and PID-retirement behavior represented by this post. Do not generalize a project-specific retirement threshold into an OBD standard requirement.

## Publication receipt rule

Do not mark `PUBLISHED` until the real LinkedIn post URL exists.

After owner publication, record:

```text
PUBLISHED_AT
LINKEDIN_URL
T+24H
T+72H
T+7D
QUALIFIED RESPONSES
LEARNING
```
