---
name: Civic Crimson Directory
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5b403d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#906f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#bb171c'
  primary: '#b7131a'
  on-primary: '#ffffff'
  primary-container: '#db322f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ac'
  secondary: '#b6171e'
  on-secondary: '#ffffff'
  secondary-container: '#da3433'
  on-secondary-container: '#fffbff'
  tertiary: '#675859'
  on-tertiary: '#ffffff'
  tertiary-container: '#817171'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930010'
  tertiary-fixed: '#f2dede'
  tertiary-fixed-dim: '#d5c2c2'
  on-tertiary-fixed: '#241919'
  on-tertiary-fixed-variant: '#514344'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a welcoming, dependable civic directory aesthetic centered around high legibility, local trust, and effortless navigation. It marries structural clarity with energetic crimson accents to spotlight local businesses, amenities, and community favorites.

The design philosophy combines clean modernism with tactile warmth:
- **Tone & Mood:** Trustworthy, civic-minded, optimistic, and organized.
- **Visual Stance:** Crisp white surfaces elevated with ultra-subtle warm crimson undertones and distinct card grouping.
- **Style Blend:** Modern directory utility with gentle geometric curves, maintaining clear informational hierarchy without visual fatigue.

## Colors

The palette leverages a civic crimson core against high-key, pristine white grounds:
- **Primary (`#E53935`):** The signature badge crimson, reserved for key actions, verified markers, ratings, and active filter states.
- **Secondary (`#D32F2F`):** Deepened crimson for hover states, focus rings, and high-emphasis text links requiring greater contrast.
- **Tertiary (`#FFEAEA`):** Soft rose tint for badge fills, category pill backgrounds, and subtle highlight containers.
- **Neutral Palette:** Neutral charcoal (`#212121`) for high-contrast headlines, supported by slate gray (`#616161`) for secondary metadata and border gray (`#EEEEEE`) for subtle structural dividers.
- **Backgrounds:** Pure white (`#FFFFFF`) for primary cards and light background (`#FAFAFA`) to frame content zones cleanly.

## Typography

The pairing combines the warm geometric curves of **Plus Jakarta Sans** for headlines with the functional precision of **Inter** for data-heavy directory content.

- **Headlines:** Use Plus Jakarta Sans to deliver an approachable, human, yet premium local editorial character. Keep tracking slightly snug (`-0.01em` to `-0.02em`) on larger scales to ensure tight visual grouping.
- **Body & Captions:** Inter ensures crisp readability for listing descriptions, operating hours, phone numbers, and street addresses.
- **Labels:** Keep badge, tag, and rating labels bold and distinct, with gentle tracking for fast scanning in dense card matrices.

## Layout & Spacing

A structured 12-column responsive layout anchors the directory grid, switching to 4 columns on mobile and 8 columns on tablet devices.

- **Desktop (1024px+):** 12-column container capped at 1280px maximum width. Listings render across 3 or 4-column spans. Gutter space stays fixed at `1.5rem`.
- **Tablet (768px - 1023px):** 8-column layout with 2-column card configurations and persistent horizontal filter bars.
- **Mobile (< 768px):** Single-column stacked cards with edge-to-edge scrolling for category tags, relying on `1rem` safe margins.
- **Vertical Spacing:** Section spacing alternates strictly between `space-lg` (`1.5rem`) for tightly related modules and `space-xl` (`2.5rem`) between distinct directory categories and map integrations.

## Elevation & Depth

Visual hierarchy is maintained through high-key surface separation and ultra-fine ambient shadows rather than heavy structural borders.

- **Level 0 (Flat Canvas):** Clean off-white surface (`#FAFAFA`) establishing the ground layer.
- **Level 1 (Listing Cards):** Pure white fill (`#FFFFFF`) with a micro outline (`1px solid #F0F0F0`) and an ambient drop shadow: `0 2px 8px -2px rgba(229, 57, 53, 0.04), 0 4px 16px -4px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Hover & Active States):** Elevated card state with subtle upward translation (-2px) and shadow bloom: `0 8px 24px -4px rgba(229, 57, 53, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.06)`.
- **Level 3 (Modals & Search Dropdowns):** Floating panels and omnibox results using `0 16px 36px -6px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)`.

## Shapes

The shape system adopts a balanced roundedness (`roundedness: 2`) that feels welcoming without sacrificing directory data density:

- **Base Radius (`0.5rem` / 8px):** Form inputs, standard buttons, badge tags, and search bars.
- **Container Radius (`1rem` / 16px):** Listing directory cards, modal containers, and map previews.
- **Featured Radius (`1.5rem` / 24px):** Hero promotional banners and editorial spotlights.
- **Pill Utility:** Rating badges and category quick-filter tags may use complete pill rounding (`9999px`) to emphasize interactability.

## Components

### Buttons
- **Primary Button:** Solid primary crimson fill (`#E53935`), text in pure white, `0.5rem` border radius, medium label weight. Hover shifts to `#D32F2F` with subtle shadow elevation.
- **Secondary Button:** White surface, `1px solid #E0E0E0`, text `#212121`. On hover, border turns `#E53935` and text shifts to `#E53935`.
- **Ghost/Tertiary Button:** Transparent background, crimson label, rose hover background (`#FFEAEA`).

### Listing Cards
- Built on white background with `1rem` corner rounding.
- Features high-resolution cover image ratio (16:10) clipped to upper card radius.
- Embedded rating badge pinned over or beside title with crimson background and star icon.
- Bottom actions: Quick call, direct map links, and save button spaced using `space-sm`.

### Chips & Filters
- **Default State:** Light gray background (`#F5F5F5`), charcoal label, pill shape, no outline.
- **Active State:** Tertiary rose background (`#FFEAEA`), primary crimson label, and `1px solid #E53935`.

### Input Fields & Search Bars
- Pure white fill, `1px solid #E0E0E0` default outline, `0.5rem` corner radius.
- Focus state: Outline highlights to `#E53935` with `0 0 0 3px rgba(229, 57, 53, 0.15)`.
- Icon prefixes (e.g., location marker, magnifying glass) styled in slate gray (`#757575`).

### Checkboxes & Radios
- Square with `4px` radius for checkboxes; circular for radios.
- Inactive state: `2px solid #BDBDBD`.
- Checked state: Filled with primary crimson (`#E53935`), containing white SVG check indicator.

### Badges & Verification Seals
- **Verified Badge:** Compact crimson shield or circular badge with white checkmark.
- **Status Indicator (Open Now):** Soft green pill (`#E8F5E9` background, `#2E7D32` label).