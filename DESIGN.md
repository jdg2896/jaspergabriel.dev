---
name: Jasper Gabriel
description: A working engineer's lab notebook, calm, plain, and technical.
colors:
  cobalt-ink: "#60a5fa"
  cobalt-ink-hover: "#93c5fd"
  cobalt-ink-light: "#2563eb"
  cobalt-ink-light-hover: "#1d4ed8"
  graphite-night: "#111113"
  graphite-surface: "#18181b"
  graphite-rule: "#27272a"
  chalk-text: "#e4e4e7"
  pencil-muted: "#8b8b94"
  paper-bg: "#fafafa"
  paper-surface: "#ffffff"
  paper-rule: "#e5e7eb"
  paper-code: "#f3f4f6"
  ink-text: "#1a1a1a"
  graphite-muted: "#6b7280"
  code-block-bg: "#18181b"
  code-block-bg-light: "#ffffff"
typography:
  display:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "Lora, Lora Fallback, Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 500
    letterSpacing: "0.08em"
  section-label:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  heading-2:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  heading-3:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.3
  prose-heading-2:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  nav-title:
    fontFamily: "Inter, Inter Fallback, system-ui, -apple-system, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
  mono:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace"
    fontSize: "0.875em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "0.25rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "1.75rem"
  xl: "2.5rem"
  2xl: "3rem"
  3xl: "4rem"
components:
  link:
    textColor: "{colors.cobalt-ink}"
  link-hover:
    textColor: "{colors.cobalt-ink-hover}"
  nav-link:
    textColor: "{colors.pencil-muted}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.chalk-text}"
  site-header:
    backgroundColor: "{colors.graphite-surface}"
    padding: "1.25rem 0"
  post-card-title:
    textColor: "{colors.chalk-text}"
    typography: "{typography.title}"
  toast-button:
    textColor: "{colors.pencil-muted}"
  toast-button-hover:
    textColor: "{colors.chalk-text}"
  toast-button-active:
    textColor: "{colors.cobalt-ink}"
  code-inline:
    backgroundColor: "{colors.graphite-rule}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "0.15em 0.4em"
  code-block:
    backgroundColor: "{colors.code-block-bg}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  skip-link:
    backgroundColor: "{colors.graphite-surface}"
    textColor: "{colors.chalk-text}"
    padding: "0.5rem 1rem"
---

# Design System: Jasper Gabriel

## Overview

**Creative North Star: "The Lab Notebook"**

The site is a working engineer's notebook: dated entries, plain margins, and a single pen color. Calm, plain, technical. The interface (header, meta lines, lists, navigation) is set in Inter and stays quiet in graphite neutrals so the entries themselves carry the page. Inside a post, the voice switches to Lora: the serif is where the thinking happens, the sans is the binding and the ruled lines around it.

Density is low and single-column. Content sits in a 680px reading column; only the header and footer chrome stretch to 900px. Structure comes from 1px rules and whitespace, never from cards, fills, or shadows. Color is nearly absent. Cobalt Ink is the one pen, used for links and the toasted state, so that anything blue means "you can act on this."

Dark is the default world. Light mirrors it token for token and follows the OS until the reader picks a theme with the toggle.

**Key Characteristics:**
- Single 680px reading column; 900px chrome.
- Two typefaces with distinct jobs: Inter for interface, Lora for prose.
- One accent (Cobalt Ink); everything else is graphite neutrals.
- Flat: 1px hairline rules and whitespace instead of elevation.
- Dark-first, with a full light mirror and a manual toggle.
- Motion is limited to 0.1–0.15s color and opacity transitions.

## Colors

A near-monochrome graphite palette with a single cobalt pen.

### Primary
- **Cobalt Ink** (`cobalt-ink` dark / `cobalt-ink-light` light): every link, the toasted state of the toast button, heading-anchor hover, and the blockquote rule. It's the only hue on the page.
- **Cobalt Ink, pressed harder** (`cobalt-ink-hover` / `cobalt-ink-light-hover`): the hover state of anything in Cobalt Ink. In dark mode it lightens; in light mode it deepens.

### Neutral
- **Graphite Night / Paper** (`graphite-night` / `paper-bg`): page background.
- **Graphite Surface / Paper Surface** (`graphite-surface` / `paper-surface`): the header (sticky above 640px) and the footer. It's a barely-there lift that marks the chrome off from the page.
- **Graphite Rule / Paper Rule** (`graphite-rule` / `paper-rule`): every 1px divider (header, footer, hero, post header, post footer, post nav, contents-list spine, `hr`, social-cluster separator). Dark mode also uses it as the inline-code background; light uses `paper-code`.
- **Chalk / Ink** (`chalk-text` / `ink-text`): body text, headings, the site name, active nav, post titles in lists.
- **Pencil / Graphite Muted** (`pencil-muted` / `graphite-muted`): meta lines (dates, reading time), inactive nav, icons, section eyebrows, the hero bio, and the resting toast button.
- **Code Block** (`code-block-bg` / `code-block-bg-light`): fenced code blocks, highlighted by Shiki's GitHub Dark Default / GitHub Light Default pair. They follow the theme toggle, sit on the surface color with a 1px rule, and every token clears 4.5:1 in both themes.

### Named Rules
**The One Pen Rule.** Cobalt Ink is the only hue. If something is blue, it's interactive or it's been acted on. Never use it for decoration, backgrounds, or emphasis text.

**The Mirror Rule.** Every color token is a `light-dark(light, dark)` pair on `:root`, so light and dark are defined together in one place. `color-scheme` follows the OS, and the toggle pins it via `data-theme`. Syntax colors use the same function over Shiki's `--shiki-light` / `--shiki-dark`.

**The Contrast Floor Rule.** Every text/background pairing must meet WCAG 2.2 AA (4.5:1 for body text) in both themes. Check muted text especially, because it's the pairing most likely to fall short.

## Typography

**Display Font:** Inter (with system-ui, -apple-system, sans-serif)
**Body Font:** Inter for interface; Lora (with Georgia, serif) for post prose
**Label/Mono Font:** SFMono-Regular (with Consolas, Liberation Mono, Menlo, monospace)

**Character:** A neutral grotesque for the notebook's binding and a bookish serif for its entries. The pairing tells the reader without words when they're browsing and when they're reading.

**Loading:** both faces come from Google Fonts with `display=swap`. Until they arrive, metric-matched local fallbacks (`Lora Fallback` built from Georgia, `Inter Fallback` from Arial, defined in `global.css`) hold the same line boxes, so the swap doesn't move text. If you change either face or its weights, re-measure those overrides.

### Hierarchy
- **Display** (600, clamp(2rem, 5vw, 3rem), 1.2): the name on the home hero. Used once on the site.
- **Headline** (600, clamp(1.75rem, 4vw, 2.25rem), 1.3): page `h1`s and post titles.
- **Title** (600, 1.15rem, 1.3): post-list titles. The rest of the heading scale steps from there: global `h2` 1.5rem and `h3` 1.2rem; inside prose, `h2` 1.5rem, `h3` 1.25rem and `h4` 1rem (just under body size, read as a run-in label within a section), all Inter. Prev/next titles are 0.95rem / 500.
- **Body** (400, 16px, 1.6): interface text, About page (at 1.05rem / 1.8).
- **Prose** (400, 1.05rem, 1.8): post body in Lora. Paragraph spacing is 1.4rem, inside the 680px column (~70ch).
- **Label** (400, 0.8rem): meta lines with middot separators, footer, prev/next labels.
- **Eyebrow** (500, 0.9rem, 0.08em, uppercase): the hero greeting, plus section headers ("Recent posts") at 1.1rem / 0.06em. Always muted.

### Named Rules
**The Two Voices Rule.** Lora appears only inside `.prose` (post bodies). Everything around it, including headings inside a post, is Inter. Headings stay sans so the reader can scan.

**The Small Caps-Lock Rule.** Uppercase letterspaced text is reserved for eyebrows and section labels, always in the muted color, and never more than one line.

## Layout

A centered single column. `.container` is 680px max with a 1.25rem side gutter; `.container--wide` and the header/footer containers are 900px. `main` gets 3rem vertical padding (2rem under 640px). The body is a flex column so the footer sits at the bottom on short pages.

The spacing rhythm is rem-based and loose: 0.25rem for meta to title, 0.75rem for meta gaps, 1.75rem between list items and nav links, 2.5–3rem between major blocks, and 4rem above the hero. The header is sticky above 640px; anchored headings use `scroll-margin-top: 5rem` to clear it.

One breakpoint, at 640px. Below it the header stacks (name above nav and social links) and stops being sticky, since at ~105px it would cover too much of a phone screen (anchored headings drop to a 1.5rem offset), the footer centers, the hero tightens to 2.5rem/2rem, and prev/next post navigation collapses from two columns to one, left-aligned.

Every page reflows at 320px with no horizontal scroll. Prose wraps long words (`overflow-wrap: break-word`) and inline code breaks anywhere, since addresses, URLs, and file paths have no natural break points. Only fenced code blocks scroll sideways.

### Named Rules
**The 320 Rule.** Nothing but a fenced code block may scroll horizontally at a 320px viewport.

## Elevation & Depth

None. The system is flat: no `box-shadow` anywhere. Depth comes only from the slight surface lift of the header and footer over the page background, plus 1px hairline rules. On wide screens the sticky header separates from scrolling content with its bottom rule, not a shadow.

### Named Rules
**The Ruled Page Rule.** Separate sections with a 1px `graphite-rule` line and whitespace. Don't add cards, panels, or shadows to group content.

## Shapes

Mostly square. Corners appear only on code and images: 4px on inline code, 8px on code blocks and post images. Links, buttons, and list items have no boxes at all. Icons are 18px Lucide-style strokes (2px, round caps and joins) in the header and 24px in the toast button. The GitHub and LinkedIn marks are filled. Links outside the header that open a new tab carry a 12px arrow-up-right and visually hidden "(opens in a new tab)" text.

## Components

### Links
Plain Cobalt Ink with no underline in the interface. Hover shifts to the hover shade and adds an underline. Inside prose, links are always underlined with a 3px offset so they're findable when reading.

### Navigation
Inter 0.9rem / 500 in Pencil. Hover and `aria-current="page"` both switch to Chalk with no underline. Nav links sit 1.75rem apart. A 1px vertical rule separates them from an icon cluster (GitHub, LinkedIn, Email, theme toggle), which is muted and goes to Chalk on hover with a 0.15s color transition. Icon hit areas are padded to about 30px with a matching negative margin, so they grow without moving.

### Page Lede
The muted line under a page `h1` (the post count on the blog index, the 404 explanation): 0.75rem below the heading, 2.5rem above the content.

### Post List
Unboxed entries stacked 1.75rem apart. Each entry is a muted 0.8rem meta line (date · reading time) above a Title-weight link in Chalk that turns Cobalt Ink on hover. The same pattern is used on the home page (3 recent posts) and the blog index.

### Post Header and Prev/Next
The post title (Headline) sits above the post's description as a muted 1.05rem Inter lede, then a wrapped meta line, closed off by a 1px bottom rule. There is no byline: the site name in the header already says whose notebook this is, and the sign-off at the end introduces him. Prev/next is the last thing on the page: a two-column grid below a rule, with a muted label ("← Older post" / "Newer post →", arrows hidden from screen readers) above a 0.95rem/500 title that turns Cobalt Ink on hover. Newer always takes the right column, even when there's no older post.

### Contents List
Posts with four or more `h2`/`h3` sections and at least a 6-minute read get an "On this page" disclosure under the post header, closed by default. The summary is Inter 600 in Chalk with a drawn chevron and a muted section count, 44px tall. Open, it's an ordered list on a 1px rule spine, `h3` entries indented, links in Pencil going to Chalk on hover, like the nav. Over twelve sections, it lists `h2`s only.

### Post Footer and Keep Reading
The end of each post is its front door for readers who arrived cold. Below a rule: the toast, then a one-paragraph author sign-off in muted Inter (the name in Chalk 600, linking to About) with a row of text links (GitHub, LinkedIn, Email, RSS feed). The name is the About link, so there's no separate "More about me". Posts end on their own thank-you line in Lora, with no comment invitation (there are no comments) and no contact links of their own; the sign-off carries those. Below that, "Keep reading" (the section-label style) lists up to three related posts in the Post List pattern. Related posts are ranked by shared tags, each tag weighted by how rare it is, and leave out the prev/next posts so nothing repeats.

### Heading Anchors
A `#` appended to each prose heading, labelled "Link to section: <heading text>" so they're distinguishable in a screen reader's link list. It's muted and invisible until the heading is hovered or the anchor gets keyboard focus.

### Code
Inline code uses the mono stack at 0.875em on the rule-color background with a 4px radius, and wraps anywhere. Inside a blockquote it keeps the full text color, because muted text on the code chip drops below 4.5:1. Fenced blocks sit on `code-block-bg` with a 1px rule, an 8px radius, 1.25rem padding, horizontal scroll, and 1.7 line-height. They take `tabindex="0"` (a Shiki transformer) so keyboard users can focus and scroll them. Shiki emits both GitHub Default palettes as custom properties, and `global.css` picks one per site theme, through `light-dark()`, like the color tokens.

### Toast Button (signature)
The notebook's one marginal mark: a double up-chevron with the label "Raise a toast" (Inter 0.9rem / 500), and a muted count beside it ("7 toasts", or "8 toasts, including yours" once toasted). A count of zero shows nothing rather than "0 toasts". It's unboxed, 44px tall, and opens the post footer. At rest it's Pencil; hover goes to Chalk; once toasted it stays Cobalt Ink with `aria-pressed="true"`, so blue only ever means toasted. Pressing nudges the icon up 2px (0.1s), only without reduced motion. The count becomes an `aria-live="polite"` region only after the first count loads, so loading it isn't announced mid-read.

The button ships `disabled` and is enabled by its script, so it never looks live without JS. Toggling updates immediately; clicks are ignored while a request is in flight. If the request fails, the toggle rolls back and a muted `role="status"` line explains it, telling a network failure ("Check your connection and try again.") apart from a server error ("something went wrong on the server. Try again in a bit."). A 0.5rem row gap keeps the button's focus ring clear of that line. If the count can't load, the button still works and simply shows no number.

### Theme Toggle
An unboxed icon button in the header's icon cluster, labelled "Dark mode" with `aria-pressed` reflecting the current theme. It shows the icon of the theme a click switches *to* (moon in light, sun in dark). An inline script applies the stored or OS theme before first paint. Without JS, a `<noscript>` style hides the toggle instead of showing a control that does nothing.

### Focus
One ring for every control: a 2px solid Cobalt Ink outline with a 2px offset on `:focus-visible`. It's square like the rest of the interface. `<main>` suppresses it when it receives focus from the skip link.

### Skip Link
"Skip to content" is the first focusable element on every page. It's hidden above the viewport until focused, then appears at the top left on the surface color with a 1px rule and moves focus to `<main>`.

## Do's and Don'ts

### Do:
- **Do** keep Cobalt Ink for links and the toasted state only (The One Pen Rule).
- **Do** define every new color as a `light-dark()` pair on `:root` (The Mirror Rule).
- **Do** use Lora only for post prose; keep headings, meta, and chrome in Inter.
- **Do** separate sections with 1px rules and whitespace.
- **Do** keep transitions to color and opacity at 0.1–0.15s, and gate anything larger (like smooth scrolling) behind `prefers-reduced-motion: no-preference`.
- **Do** verify 4.5:1 text contrast in both themes before shipping a color change.
- **Do** check new content at 320px (The 320 Rule).

### Don't:
- **Don't** add box-shadows, cards, or filled panels to group content.
- **Don't** introduce a second accent hue.
- **Don't** widen the reading column past 680px; only chrome uses 900px.
- **Don't** round buttons, links, or list items; corners are for code and images.
- **Don't** hard-code syntax colors; code blocks take their palette from Shiki's per-theme custom properties.
