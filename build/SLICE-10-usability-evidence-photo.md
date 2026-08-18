# SLICE-10 — Usability, Evidence Readability & Portrait Quality

**Status:** Implemented on `develop`
**Source:** Browser acceptance feedback after Visual Material v2
**Production:** Not promoted by this slice

## Why this slice exists

Visual Material v2 established the intended identity, but browser review exposed two concrete problems:

1. the About portrait was being served from an aggressively compressed source and looked visibly pixelated at the chosen display size;
2. Evidence records exposed forensic provenance too early, forcing ordinary visitors to parse repository paths and blob SHAs before understanding the engineering claim.

The correction does not reopen the visual system. It makes the existing system easier to trust and easier to understand.

## Objective

Preserve THE BUILD ROOM's evidence-first character while enforcing this public hierarchy:

`UNDERSTAND THE CLAIM → SEE THE LIMIT → INSPECT THE SOURCE → OPEN FORENSIC PROVENANCE IF NEEDED`

A recruiter or client should be able to understand an evidence record without knowing Git internals. A technical reviewer should still be able to inspect the exact source revision when that depth is useful.

## Changes

### About / human presence

- replaced the ~6 KB temporary portrait source with a higher-quality WebP derived from the supplied real photograph;
- retained responsive `next/image` delivery;
- changed the portrait container to the source's natural vertical proportion;
- adjusted object position and caption treatment so the portrait reads as human context rather than another HUD panel;
- simplified the caption language.

### Evidence record

The default record now prioritizes:

1. human-readable evidence title;
2. exact claim — **What this proves**;
3. evidence state and an expandable explanation of that state;
4. context — **Why this record exists**;
5. claim ceiling — **What this does not prove**;
6. source cards with a direct GitHub route;
7. optional **Technical provenance**.

`path`, `ref` and reviewed blob SHA remain retained but are collapsed by default.

### Evidence library

- changed the lead from inspection jargon to `See what backs the work.`;
- added a small expandable guide explaining how to read evidence;
- made filter labels human-readable;
- retained evidence status and publicability without making them the first thing a visitor must decode;
- preserved semantic links and keyboard focus.

## Why SHA still exists

A reviewed blob SHA provides a durable identity for the exact source revision audited. A branch such as `main` can move after review; a blob identifier does not.

Therefore SHA remains useful for reproducibility and provenance, but it is **not primary portfolio content**. It belongs behind progressive disclosure for visitors who explicitly want forensic depth.

## Interaction principle established by this slice

Interaction is added when it reduces cognitive load or enables deeper inspection.

This slice adds native, keyboard-compatible progressive disclosure through `<details>/<summary>` for:

- evidence-state meaning;
- technical provenance;
- related engineering references;
- evidence-library reading guidance.

It does not add ornamental motion or interaction merely to make the interface feel busy.

## Performance note

The pre-merge performance baseline remained inside all frozen budgets. Home is currently close to its DOM ceiling, so future Home interaction must preferably transform or replace existing markup rather than simply append new layers.

## Gate result before develop merge

- Portfolio CI — PASS
- Release Quality — PASS after restoring stable evidence metadata identity
- Performance Baseline — PASS
- Vercel Preview — READY

Accessibility Quality is configured to execute on pushes to `develop`; its post-merge result remains a separate release gate before this correction is considered production-ready.

## Result

The portfolio keeps technical traceability without requiring every visitor to read like a repository auditor.

The governing usability law from this slice is:

> **Public understanding first. Forensic depth on demand.**
