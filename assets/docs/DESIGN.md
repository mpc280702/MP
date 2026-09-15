---
name: Hieu Portfolio System
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ffb5a0'
  on-secondary: '#5f1500'
  secondary-container: '#d73b00'
  on-secondary-container: '#fffbff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#862200'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  headline-xl:
    fontFamily: Syne
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 2rem
  margin: 4rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 2rem
  space-lg: 4rem
  space-xl: 8rem
---

## Brand & Style

This design system establishes a sleek, high-end creative portfolio environment tailored for a graphic and creative designer. The brand personality is sophisticated, confident, and meticulously curated. It bridges artistic expression with digital precision.

The target audience consists of design directors, potential high-profile clients, and creative collaborators who appreciate restraint, intentionality, and visual impact. The UI evokes a sense of quiet luxury, curiosity, and professional mastery. 

We embrace a **Minimalism** style enhanced with high-contrast elements. The aesthetic relies on generous whitespace, sharp grid alignment, dramatic light and dark shifts, and electric accent moments that punctuate the monochrome foundation.

## Colors

The color architecture is built on a commanding dark foundation, offset by pristine light moments to create dramatic contrast. The palette relies on deep near-blacks and stark off-whites to establish structural clarity, letting the creative work take center stage.

- **Primary:** Electric Indigo (`#6366F1`) serves as the core interactive accent, denoting focus, links, and active states.
- **Secondary:** Vivid Orange (`#FF5722`) acts as a deliberate focal point for creative callouts, awards, and primary conversion triggers.
- **Neutrals:** Deep obsidian (`#0F0F11`) for immersive dark surfaces, paired with luminous paper white (`#FAFAFA`) for clean editorial breathing room.

## Typography

Typography acts as the primary vehicle for brand expression. We pair the expressive, architectural geometry of **Syne** for headlines with the neutral, invisible readability of **Inter** for body copy. **Space Grotesk** provides a technical, contemporary edge for metadata, tags, and navigation labels.

Headlines larger than 32px scale down gracefully on mobile viewports to prevent awkward wrapping, ensuring the typographic hierarchy remains disciplined across all screen sizes.

## Layout & Spacing

The layout philosophy relies on a **Fluid grid** system (12-column) with generous exterior margins and wide gutters to emphasize whitespace and curatorial elegance. Content blocks snap to strict vertical rhythms, allowing visual assets to breathe.

- **Breakpoints:** Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px).
- **Adaptation:** Outer margins scale down on mobile viewports to preserve screen estate, while internal component spacing maintains its rhythm using proportional relative units.

## Elevation & Depth

Depth is conveyed through **low-contrast outlines** and tonal surface juxtaposition rather than heavy drop shadows. 

Surfaces utilize subtle shifts in background luminescence combined with ultra-fine, 1px borders (`rgba(255, 255, 255, 0.08)` on dark surfaces) to establish boundaries. Interactive elements rely on clean scale transformations and border color transitions to indicate focus and elevation.

## Shapes

The shape language is sharp, crisp, and restrained. We utilize a **Soft** roundedness tier (`0.25rem` base) for minor UI containers, chips, and input fields, while major image containers and layout cards remain dead-sharp (`0px`) to reinforce the architectural, graphic-design-centric ethos of the portfolio.

## Components

- **Buttons:** High-impact, minimal padding. Primary buttons feature solid electric indigo or vivid orange fills with sharp typography; secondary options use transparent backgrounds with clean 1px borders that invert on hover.
- **Cards:** Project cards use edge-to-edge imagery with metadata cleanly floating below or overlaid with a subtle gradient scrim. Hover states trigger a slow zoom on the image asset and a crisp border highlight.
- **Chips / Tags:** Small, monospaced metadata pills using `label-sm` typography, bordered with subtle outlines to categorize project disciplines (e.g., *Brand Identity*, *Motion*).
- **Input Fields:** Borderless or single-bottom-border text areas that expand gracefully on focus, utilizing `body-md` text and high-contrast placeholder styling.
- **Navigation:** Fixed minimalist header featuring subtle backdrop blur, monogram branding, and clean link states accented by a sliding indicator dot.