---
name: ShopSphere Engine
colors:
  surface: '#f7fafa'
  surface-dim: '#d7dbdb'
  surface-bright: '#f7fafa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f4'
  surface-container: '#ebeeee'
  surface-container-high: '#e6e9e9'
  surface-container-highest: '#e0e3e3'
  on-surface: '#181c1d'
  on-surface-variant: '#45474b'
  inverse-surface: '#2d3131'
  inverse-on-surface: '#eef1f1'
  outline: '#75777c'
  outline-variant: '#c5c6cb'
  surface-tint: '#595f68'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#161c24'
  on-primary-container: '#7e848e'
  inverse-primary: '#c1c7d2'
  secondary: '#8a5100'
  on-secondary: '#ffffff'
  secondary-container: '#fe9800'
  on-secondary-container: '#643900'
  tertiary: '#6f5d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde3ee'
  primary-fixed-dim: '#c1c7d2'
  on-primary-fixed: '#161c24'
  on-primary-fixed-variant: '#414750'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#ffb86f'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#693c00'
  tertiary-fixed: '#ffe16b'
  tertiary-fixed-dim: '#e8c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#f7fafa'
  on-background: '#181c1d'
  surface-variant: '#e0e3e3'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  price-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 32px
  price-xl-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 26px
  price-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.5rem
  gutter-lg: 1.25rem
  margin: 1rem
  margin-md: 1.25rem
  margin-lg: 1.5rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system establishes an ultra-reliable, high-density, transaction-focused e-commerce experience designed for multi-category discovery, transparent pricing, and friction-free checkout. The visual language blends pragmatic modern utility with established global e-commerce mental models, ensuring immediate cognitive familiarity while maintaining crisp visual discipline.

### Design Principles
- **Absolute Trust & Legibility**: Critical data points—such as localized pricing (₹), delivery promises, stock guarantees, and customer ratings—take immediate visual priority with high-contrast text and disciplined spacing.
- **Controlled Density**: Interfaces present dense inventories without visual exhaustion. Structured content groupings, micro-dividers, and clear visual card bounds keep expansive catalogs parseable.
- **Conversion Certainty**: High-contrast action affordances distinguish urgent conversion paths ("Buy Now") from deliberate exploration paths ("Add to Cart").
- **Institutional Reliability**: Clean, flat surface elevations layered over a cool-neutral canvas emulate established enterprise marketplaces, minimizing visual distraction and highlighting product imagery.

## Colors

The palette balances authoritative deep navy-charcoal structural surfaces with vibrant amber and orange functional conversion accents, offset against an ergonomic, light-gray neutral canvas.

### Palette Architecture
- **Structural Shell**: `#131921` anchors the primary header bar, location selectors, and system-level utility navigation. `#232F3E` powers the secondary sub-navigation, department taxonomy bars, and deep footer anchors.
- **Conversion & Interaction Tokens**:
  - **Add to Cart (Exploratory CTA)**: `#FFD814` resting state with `#F7CA00` active/hover state.
  - **Buy Now (Direct Action CTA)**: `#FFA41C` resting state with `#FF8F00` active/hover state.
  - **Brand Accent & Focus Highlights**: `#FF9900` for active tab underscores, search trigger containers, and key badge accents, with `#F3A847` for secondary hover states.
- **Canvas & Surface Tiering**:
  - **Application Canvas**: `#EAEDED` provides subtle contrast beneath product grids and horizontal carousels.
  - **Cards & Data Surfaces**: `#FFFFFF` provides an uncompromised white canvas for authentic product color reproduction.
- **Typography & Content Hierarchy**:
  - **Primary Ink**: `#111111` for product titles, price tags, and high-priority metadata.
  - **Secondary Ink**: `#565959` for specifications, item counts, reviews count, and secondary descriptors.
- **Functional Semantics**:
  - **Validation & Inventory**: `#067D62` for in-stock indicators, deal savings badges, and delivery guarantees.
  - **Ratings**: `#FFA41C` for star icon fills and customer review aggregates.
  - **Borders & Dividers**: `#DDDDDD` for clean product card bounds, table cell borders, and facet dividers.

## Typography

The type system is powered entirely by Inter to maintain systematic clarity across extreme variations in data density.

### Editorial & Display Rules
- **Price Displays**: Currency symbols (`₹`) align to the top edge of fractional price amounts, rendered in medium weight to maintain clean legibility without distorting numerical layouts.
- **Product Titles**: Titles use `title-md` or `title-sm` with a strict two-line clamp (`line-clamp: 2`) across catalog grids to maintain clean horizontal baseline rhythms.
- **Badging & Meta Data**: Fast delivery tags, stock notes, and deal percentages rely on `label-sm` in bold weights (`600`) to guarantee legibility at small scale.
- **Numerical Figures**: Tabular numbers (`font-variant-numeric: tabular-nums`) must be used for tables, cart subtotals, and checkout breakdown ledgers to prevent optical alignment jitter.

## Layout & Spacing

This design system uses a fluid, density-aware grid optimized for responsive multi-column catalog layouts and persistent utility toolbars.

### Layout Mechanics
- **Max Content Bounding**: Max canvas width is capped at `1500px` on widescreen desktop monitors, centering content with fluid margins to preserve scan-path efficiency.
- **Breakpoints & Grids**:
  - **Desktop (≥ 1280px)**: 12-column grid system with `gutter-lg` (20px), accommodating a 260px sticky sidebar filter and a 4-to-5 item product card row.
  - **Tablet (768px – 1279px)**: 8-column layout with `gutter` (16px), off-canvas sliding filter drawers, and 3-column product cards.
  - **Mobile (< 768px)**: 4-column layout with `gutter-sm` (8px) and `margin` (16px) using 2-column compact grid rows or continuous horizontal carousels.
- **Vertical Rhythm**: Compact component padding (`space-xs` to `space-md`) ensures maximum vertical inventory exposure above the fold without sacrificing accessibility targets.

## Elevation & Depth

Visual hierarchy uses flat structural containment, low-contrast border definitions, and restrained ambient drops for interactive overlays.

### Surface Tiers & Layering
- **Level 0 (Base Canvas)**: `#EAEDED` serves as the canvas substrate.
- **Level 1 (Cards & Data Blocks)**: Pure white (`#FFFFFF`) containers framed with a hairline border (`1px solid #DDDDDD`). No shadows are applied in the default static state to prevent visual clutter in dense grids.
- **Level 1 Hover (Interactive Cards)**: Transition to an ambient elevation: `0 4px 12px rgba(0, 0, 0, 0.08)`, leaving the border crisp.
- **Level 2 (Sticky Elements & Sidebars)**: Persistent navigation bars and the sticky buy box use a clean lower edge border (`1px solid #DDDDDD`) paired with a soft ambient under-cast: `0 2px 8px rgba(0, 0, 0, 0.06)`.
- **Level 3 (Flyouts, Menus & Autocomplete)**: Dropdowns, search suggestion flyouts, and drawer menus apply a defined directional cast: `0 8px 24px rgba(0, 0, 0, 0.16)` with an inner `#DDDDDD` containment stroke.

## Shapes

The design system implements a disciplined soft corner profile (`0.25rem` / `4px`), projecting stability, geometric precision, and functional enterprise utility.

### Component Radii Mapping
- **Buttons & CTA Inputs**: `rounded` (`4px`) ensures clear target boundaries without reducing interior hit areas.
- **Cards & Data Modules**: `rounded` (`4px`) on outer bounds maintains a tidy grid layout across repeating catalog modules.
- **Form Controls & Search**: Primary inputs use `rounded` (`4px`). The desktop search bar uses a pill hybrid: `4px` left radius on the department dropdown, squared inner boundaries, and a `4px` right radius on the submit container.
- **Badges & Micro Chips**: `2px` micro-radius for discount tags, delivery status labels, and item counter badges.

## Components

### Header & Shell Architecture
- **Primary Header (`#131921`)**:
  - **Height**: 60px desktop. Contains brand mark, location/pincode modal trigger, central search bar, accounts & lists menu, returns & orders trigger, and cart badge.
  - **Search Bar Assembly**: Multi-part compound input featuring a `#EAEDED` department selector on the left, a white text input field with an amber focus halo (`#FF9900`), and a high-contrast `#FEB968` to `#F3A847` search submission button with an inline magnifier.
- **Secondary Sub-bar (`#232F3E`)**:
  - **Height**: 40px desktop. Houses the all-categories hamburger trigger alongside horizontal utility shortcuts (Best Sellers, Today's Deals, Mobiles, Customer Service). Links feature a subtle 1px transparent border that shifts to 1px solid white on hover.

### Product Cards
- **Structure**: Rendered over `#FFFFFF` with a `1px solid #DDDDDD` boundary.
- **Image Container**: Consistent 1:1 aspect ratio with `object-fit: contain` over a neutral `#FFFFFF` frame, with at least 12px inner padding to prevent clipped product bounds.
- **Pricing Cluster**: Current price rendered in `price-md` or `price-xl` with an upfront `₹` symbol, complemented by a strikethrough M.R.P. in `body-sm` (`#565959`) and an integrated percentage savings tag (`#067D62`).
- **Badges & Urgency**: "FREE Delivery by Tomorrow" rendered in `body-sm` bold with `#111111` or `#067D62`. Star ratings incorporate the `#FFA41C` five-star cluster alongside aggregate review counts wrapped in parentheses.

### Purchase Triggers & Action Buttons
- **Add to Cart**:
  - Background: `#FFD814`; Border: `1px solid #FCD200`; Text: `#111111`.
  - Hover: `#F7CA00`. Full width inside product drawers and buy boxes.
- **Buy Now**:
  - Background: `#FFA41C`; Border: `1px solid #FF8F00`; Text: `#111111`.
  - Hover: `#FA8900`.
- **Secondary / Utility Buttons**:
  - Background: `#FFFFFF`; Border: `1px solid #D5D9D9`; Text: `#111111`; Box-shadow: `0 2px 5px rgba(213, 217, 219, 0.5)`. Hover: `#F7FAFA`.

### Filter Sidebar & Facets
- Sticky desktop position (260px–280px). Sections divided by `1px solid #DDDDDD` hairline rules.
- Checkboxes use a `16px x 16px` square with `2px` corners; checked state uses `#007185` or `#131921` with a crisp white tick mark.
- Star rating filters render clickable star bars displaying "4★ & above" paired with active count tallies.

### Sticky Buy Box / Detail Widget
- Fixed right rail container (`300px`–`320px` width) bound by `1px solid #DDDDDD` on `#FFFFFF`.
- Displays dynamic stock availability ("In stock", "Only 2 left in stock"), delivery address location pin selector, quantity select dropdown, dual full-width CTAs ("Add to Cart" and "Buy Now"), and secure transaction trust badges with subtle lock icons.

### Cart & Multi-Step Checkout
- **Cart Table**: Itemized rows featuring thumbnail, expandable quantity controls (`+` / `-` / quantity dropdown), gift checkbox, and direct "Save for later" and "Delete" text triggers.
- **Checkout Accordion**: Linear, numbered card groups (1. Delivery address, 2. Payment method, 3. Items and delivery review). Active sections expand with clear input borders, while completed steps collapse to summary views with right-aligned "Change" links.

### Comprehensive Footer
- Multi-tiered structure:
  - **Back to Top**: Full-width `#37475A` neutral utility bar with centered text.
  - **Directory Links**: Deep `#232F3E` background containing 4-to-5 clean columns of utility and company links in `#DDD`.
  - **Localized Legal & Lineage**: `#131921` anchor band with currency toggle (`₹ INR`), language selector, and copyright notice.