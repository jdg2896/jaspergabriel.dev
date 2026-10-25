---
target: src/layouts/BlogPostLayout.astro
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/jaspergabriel/Workspace/personal/jaspergabriel.dev/src/layouts/BlogPostLayout.astro"
target_fingerprint: "sha256:c94c8dfe259d6f3ba83fa6747f0e4bc9a267eb8f3a3d0446ad271bf4c0005fe0"
target_path: /Users/jaspergabriel/Workspace/personal/jaspergabriel.dev/src/layouts/BlogPostLayout.astro
timestamp: 2026-10-24T15-00-25Z
slug: src-layouts-blogpostlayout-astro
closed: true
---
Method: dual-agent

## Design Health Score — 28/40 (Good)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Count announced at random on load |
| 2 | Match System / Real World | 3 | "Toast" ambiguous to engineers; legacy "feel free to comment" |
| 3 | User Control and Freedom | 3 | Un-toast not discoverable; no back-to-top on long mobile posts |
| 4 | Consistency and Standards | 3 | Sign-off new-tab links lack external cue |
| 5 | Error Prevention | 3 | In-flight guard works |
| 6 | Recognition Rather Than Recall | 3 | TOC only at top, collapsed |
| 7 | Flexibility and Efficiency | 2 | No copy-code; anchors hover-only |
| 8 | Aesthetic and Minimalist | 3 | End zone crowded; contacts 3x |
| 9 | Error Recovery | 3 | 500 says "check your connection" |
| 10 | Help and Documentation | 2 | Toast meaning unexplained |

## Design Specificity Verdict
Well built, still category-generic; Lab Notebook not visible on screen. Detector: all clean except advisory flat-type-hierarchy on twelve-factor post (false positive vs documented h4 run-in).

## Priority Issues
1. [P1] No author context above the fold (byline + description lede) — layout
2. [P1] End-of-post double sign-off: 11 posts have legacy "feel free to comment" closers; contacts 3x; ~10 choices — distill, clarify
3. [P2] Toast: no row-gap (focus ring overlaps error), "0 toasts", load-time live announcement, 500 vs offline copy — harden
4. [P2] Sign-off GitHub/LinkedIn new-tab links unannounced (BlogPostLayout.astro:145-146) — polish
5. [P3] TOC on short posts (needs reading-time gate); balance wrap on card titles — polish

## Persona Red Flags
Jordan: toast/0 unexplained; comments dead end. Sam: 62 tab stops, 11 identical anchor names, random announcement. Casey: long scroll, no back-to-top. Hiring manager: no role above fold, "0 toasts", stale dates.

## Minor Observations
No-JS theme toggle; toast label static; OG description clip no ellipsis; tech-only related; top whitespace; code chip on muted 4.4:1.

## Questions
Byline cost? Toast pun? Notebook mark / post age notice?
