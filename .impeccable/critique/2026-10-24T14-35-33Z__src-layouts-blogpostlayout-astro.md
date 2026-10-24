---
target: src/layouts/BlogPostLayout.astro
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/jaspergabriel/Workspace/personal/jaspergabriel.dev/src/layouts/BlogPostLayout.astro"
target_fingerprint: "sha256:c0337e6e4a206b6e9ee4833d6fc8eafe356d4a5b12b527b52c2a42882fc7acc8"
target_path: /Users/jaspergabriel/Workspace/personal/jaspergabriel.dev/src/layouts/BlogPostLayout.astro
timestamp: 2026-10-24T14-35-33Z
slug: src-layouts-blogpostlayout-astro
---
Method: dual-agent

## Design Health Score — 22/40 (Acceptable)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Toast GET failure leaves count blank (ToastButton.astro:106); no progress on long posts |
| 2 | Match System / Real World | 2 | "Toast" unexplained; double-chevron reads as back-to-top/upvote |
| 3 | User Control and Freedom | 3 | Toast reversible; nav normal |
| 4 | Consistency and Standards | 3 | "Originally published" link grey not cobalt |
| 5 | Error Prevention | 3 | No in-flight guard on toast POST/DELETE |
| 6 | Recognition Rather Than Recall | 2 | No TOC; hover-only anchors; tags not rendered |
| 7 | Flexibility and Efficiency | 2 | Anchors aria-hidden/tabIndex -1; no copy-code |
| 8 | Aesthetic and Minimalist | 3 | Post end = three near-empty ruled bands |
| 9 | Error Recovery | 1 | Failed toast POST reverts silently |
| 10 | Help and Documentation | 1 | Toast has no label/hint |

## Design Specificity Verdict
System specific, page generic (starter-blog anatomy). ~6/10. Detector: source clean; built page 1 advisory flat-type-hierarchy (h4 = body size, real, low). Overlay (headless): no anti-patterns.

## Priority Issues
1. [P1] Post is a dead end for cold visitors (no author sign-off, related posts) — layout, clarify
2. [P1] Toast wordless, fails silently, no-JS dead, a11y name hides count — harden, clarify
3. [P1] Mobile anchor jumps hidden under 105px sticky header (scroll-margin-top 5rem, global.css:292) — adapt
4. [P2] No TOC/wayfinding; anchors unreachable; h4 = body size — layout, typeset
5. [P2] og:type website, no OG image/article meta; "© 2026" over 2023 posts — polish

## Persona Red Flags
Jordan: chevron/author unknown; date-ordered nav. Sam: toast name hides count; anchors unreachable; non-focusable scrolling pre. Casey: sticky header covers anchors; narrow toast target. Hiring manager: no positioning, no About prompt.

## Minor Observations
formatDate no UTC timeZone; empty span when no older post; toast nudge not reduced-motion gated; toast hover ≈ toasted color; new-tab link unannounced.

## Questions
Why is the signature toast the quietest element? Should post end be the landing page? Is Lab Notebook a style or a structure?
