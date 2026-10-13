---
name: OSM Decals
description: Bonnyville oilfield labels and signs, navy and safety orange, prices on the page.
colors:
  navy: "#003366"
  navy-dark: "#002244"
  teal: "#008080"
  teal-type: "#115E59"
  safety-orange: "#FF6600"
  action-orange: "#C2410C"
  action-orange-hover: "#9A3412"
  mark-on-navy: "#FF8533"
  type-on-light: "#9A3412"
  nav-hover: "#FF7518"
  light-gray: "#F2F2F2"
  hairline: "#E5E7EB"
  stroke: "#D1D5DB"
  white: "#FFFFFF"
  body: "#1F2937"
  muted: "#4B5563"
typography:
  display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1.25
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.2
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.75
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.action-orange-hover}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.body}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  badge:
    backgroundColor: "rgba(0, 51, 102, 0.1)"
    textColor: "{colors.navy}"
    rounded: "{rounded.xs}"
    padding: "4px 8px"
---

# Design System: OSM Decals

## Overview

**Creative North Star: "The Bonnyville Counter"**

The page is a shop counter, not a campaign. Navy holds the header, the hero scrim, and the materials band. Safety orange marks the words that name the work, and a deeper orange is reserved for buttons and the process numbers so white type stays readable. Photography is the shop's own: a lease truck, labels, hard hats, signs, and the three Rasks.

Density is a catalog. Prices, minimums, and the quote action sit in the same scroll as the photos. Motion is limited to hover lift, the modal, and focus. There is no dark theme. The owner asked to keep this world.

**Key Characteristics:**

- Navy structure, orange action, teal as a second shop color
- Montserrat headings, Open Sans body, both self-hosted (woff2: Montserrat 700/900, Open Sans 300/400/600)
- Real product photos and a full-bleed lease-truck hero
- Rates and minimums visible before the form
- Soft corners: 4px badges, 8px controls, 12px cards, 16px contact and quote panels, full circles for process and team

## Colors

One navy, one safety orange, one teal. Orange and teal split by job so contrast holds.

### Primary
- **Shop Navy** (`navy`): Header, hero scrim, materials band, selection, focus on light buttons.
- **Night Navy** (`navy-dark`): Footer and modal scrim.

### Secondary
- **Shop Teal** (`teal`): Process step 7 fill and the form focus ring.
- **Type Teal** (`teal-type`): Small teal type on light gray, including contact links and the pricing badge. About 6.77:1 on Sheet. Same hue, darker so it clears 4.5:1.

### Tertiary
- **Safety Orange** (`safety-orange`): Large headline words on navy (about 4.29:1, large text), and the default focus ring. Not for small white-on-orange type.
- **Action Orange** (`action-orange`): Primary buttons and process-step numbers. White on this fill is about 5.18:1. Hover is **Pressed Orange** (`action-orange-hover`).
- **Mark Orange** (`mark-on-navy`): Small checks and icons on navy.
- **Rate Orange** (`type-on-light`): Small orange type on white or light gray, including team roles and pricing minimums.
- **Nav Orange** (`nav-hover`): Nav link hover and active state on navy.

### Neutral
- **Sheet** (`light-gray`): Product, process, team, and contact-panel ground.
- **White** (`white`): Pricing, FAQ, contact outer, and modal panels.
- **Hairline** (`hairline`): Pricing card borders and nested quote-detail borders. Tailwind gray-200.
- **Stroke** (`stroke`): Form field border at rest.
- **Body** (`body`): Default text (`text-gray-800` on the page).
- **Muted** (`muted`): Supporting copy, placeholders, and price notes. About 6.75:1 on light surfaces.

### Named Rules
**The Orange Job Rule.** #FF6600 is for large type on navy. Buttons and numbered steps use #C2410C. Small orange type on a light surface uses #9A3412.

**The Teal Job Rule.** #008080 is for fills and the focus ring. Small teal type on a light surface uses #115E59.

## Typography

**Display Font:** Montserrat (sans-serif)
**Body Font:** Open Sans (sans-serif)

**Character:** Heavy geometric headings over a plain workhorse body. The pairing is the one already on the site. Faces are local woff2 files, not a CDN.

### Hierarchy
- **Display** (900, 2.25rem, then 3rem at 768px, then 3.75rem at 1024px, leading 1.25): The H1 only.
- **Headline** (900, 1.875rem, then 2.25rem at 768px): Section titles.
- **Title** (700, 1.125rem, leading 1.75): Product, price, and person names.
- **Body** (400, 1rem, default leading): Paragraphs. Form controls are 1rem so iOS does not zoom.
- **Label** (600, 0.875rem): Form labels and price notes.

### Named Rules
**The Same Face Rule.** Do not swap Montserrat or Open Sans, and do not insert a serif for emphasis.

## Layout

A centered column at `max-w-7xl` (80rem) with 16px to 32px side padding. Sections use 80px vertical padding, 112px from 768px. The nav is fixed, 64px to 80px, and the desktop links start at 1024px. Below that, a single 44px menu button.

Products are 1 column, then 2 at 768px, then 3 at 1024px, then 5 at 1280px. Pricing is a 6-column grid from 1024px so the last two cards can sit centered. Process is one column until 1024px, then seven. The hero is at least one viewport tall, with the copy at the bottom over the truck photo.

Tap targets: quote buttons, the menu control, contact tel/mail/sample, and footer tel/mail are at least 44px tall.

## Elevation & Depth

Most surfaces are flat color. Cards lift only on hover. The hero is a photograph under a navy scrim (night-navy overlays), not a gradient mesh.

### Shadow Vocabulary
- **Card rest** (`0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)`): Product cards.
- **Card hover** (`0 20px 40px rgba(0, 51, 102, 0.15)`): Product card lift. Offset, navy tinted.
- **Price hover** (`0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`): Pricing cards.
- **Button hover** (`0 6px 14px rgba(154, 52, 18, 0.28)`): Primary button. Offset, brown tinted.
- **Modal** (`0 25px 60px rgba(0, 0, 0, 0.3)`): Quote panel.

### Named Rules
**The No Glow Rule.** Shadows are offset and navy or brown tinted. Do not add a zero-offset orange halo.

## Shapes

Badge spans such as UV-LAMINATED use a 4px radius (0.25rem). Controls and inputs use an 8px radius. Product and price cards use 12px. The contact panel and quote dialog use 16px. Process steps and team photos are circles. Do not mix pills into the button system. The pricing-all-in chip is a pill; that is a one-off, not the button shape.

The four materials cards on navy use a 4px left safety-orange edge. That rail stays on those cards. Do not spread it to product, price, or contact cards.

## Components

### Buttons
- **Shape:** Gently rounded (8px).
- **Primary:** Action orange background, white type, 16px by 32px on the hero. Hover darkens to pressed orange, lifts 2px, and uses the button-hover shadow. Active presses back.
- **Secondary:** White 2px outline on the hero. On light sections the secondary stroke and type go navy, fill navy on hover.
- **Focus:** 2px orange ring by default, white ring on navy (hero and nav quote), navy ring on the orange button on light.

### Cards / Containers
- **Corner Style:** 12px on product and price cards.
- **Background:** White product cards on Sheet. Price cards are Sheet on white, with a Hairline border.
- **Shadow Strategy:** Resting shadow-md, navy-tinted lift on product hover.
- **Internal Padding:** About 24px.

### Inputs / Fields
- **Style:** 1px Stroke (#D1D5DB), white fill, 8px radius, 1rem type.
- **Focus:** Teal border and a 3px teal ring at 15% opacity. The browser outline is removed only because that ring replaces it.
- **Error:** A pressed-orange message under the form, `role="alert"`. Success replaces the form inside the same panel.

### Navigation
- Fixed shop navy at 95% opacity. White wordmark, white links, nav-orange on hover and for the section in view. The quote button is the primary button and at least 44px tall. Below 1024px the links collapse into the 44px menu button.

### Quote dialog
- White panel, 16px radius, max 32rem, `role="dialog"`. The page behind (nav, main, footer) is inert.
- Close control is 44px.
- Escape, backdrop click, and Close all dismiss it and return focus.

### Badges
- UV-LAMINATED and similar product tags: 4px radius, navy at 10% fill, navy type, extra-small padding. Rate and rush tags on price cards use the same radius with Rate Orange or navy tints.

## Do's and Don'ts

### Do:
- **Do** keep the lease-truck photo behind the hero, with a navy scrim strong enough for the H1.
- **Do** keep one quote button label, "Request a Quote", and let each button open its own modal.
- **Do** use the deeper action orange wherever white type sits on orange.

### Don't:
- **Don't** add a dark mode or a second accent family.
- **Don't** rewrite the H1, prices, or team lines as part of a visual pass.
- **Don't** put small white type on #FF6600.
