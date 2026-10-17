# THE OCEAN — Codex implementation brief (concept MVP)

## Role and objective
You are a senior frontend engineer and motion designer. Build a polished, responsive, runnable frontend-only concept website for **The Ocean**, a seafood restaurant in Remhala, Lebanon. This is an **unofficial pitch prototype**, not a production ordering service. Prioritize quality, accessibility, performance, and faithful use of the supplied brand assets. Do not imply endorsement by the restaurant.

## Technical constraints
- React + TypeScript + Vite, Tailwind CSS, Motion for React (`motion`), Lucide React.
- No Next.js, backend, database, authentication, payment gateway, API keys, external CMS, server endpoints or analytics.
- Menu data in a typed local module. Cart state in React; optionally persist cart to localStorage (no customer personal details in storage).
- All demo checkout actions are simulated; **never send real orders**. Do not open a live restaurant WhatsApp order URL from this concept. Display a formatted message preview and a 'Copy sample order' control instead.
- Use supplied images from `public/assets/` with descriptive filenames. No hotlinking, no invented actual menu photography. Provide image alt text and optimize loading. Maintain original logo proportions.
- Make an attractive, functional UI rather than a static screenshot. Use semantic HTML, keyboard support, visible focus, reduced-motion support and WCAG AA-conscious contrast.

## Branding and art direction
- Use uploaded The Ocean fish mark as the brand icon, and if available use the wordmark in an uploaded image as a visual reference, not an inaccurate cutout.
- Base colors: deep navy #273947, pearl cream #F2EFE4. Proposed accent colors: sand gold #B99A69 and coral #C66D50. Use coral sparingly.
- Sophisticated Mediterranean seafood identity: editorial serif display type paired with readable sans-serif UI type, restrained gold lines, subtle paper textures, nautical curves and generous whitespace. Avoid cartoonish/childish aesthetics, loud gradients, clutter, and stock-like fake seafood photos.
- Brand copy may use 'The Ocean' and 'Served at your plate' from supplied brand imagery. Label all unconfirmed claims and information as placeholder, avoid fabricated guarantees, opening hours, delivery promises, review counts or menu descriptions.
- Prominent discreet 'UNOFFICIAL CONCEPT — NOT ACCEPTING ORDERS' banner on every page/state.

## Pages / sections
1. Responsive sticky header: fish logo, The Ocean, Home, Menu, Our Catch, Contact, animated boat/cart indicator; mobile menu.
2. Hero: dramatic authentic supplied seafood photo, dark overlay for readability, 'From the sea. To your plate.' heading, subheading, 'Explore the menu' and 'See our catch' CTAs; subtle wave movement and graceful entrance animations.
3. Trust / story: short non-factual marketing copy grounded in the fresh-seafood theme, no invented business claims.
4. Featured photography gallery: authentic supplied fish and shrimp imagery, tasteful asymmetric responsive grid, captions such as 'Seafood selection' rather than species claims.
5. Menu book: elegant nautical book cover opens on interaction (3D CSS transform with Motion orchestrating state). On desktop, a two-page spread; on mobile, a readable single-page/stacked layout with equivalent reveal, not a tiny scaled book. Include tab navigation between Shrimp and Felleh, and accessible list/grid fallback if 3D unsupported or reduced motion requested. Menu cards show name, USD price, one of the three supplied sandwich images where suitable, and Add button. Never imply a photo definitely represents a named item without confirmation. Include close/reopen book behavior.
6. Fishing boat cart: small illustrated boat near cart controls, designed as SVG or CSS. When 'Add' is clicked, animate a small seafood token along a short arc into the boat, boat rocks slightly, count updates, and show a screen-reader-friendly status. Respect prefers-reduced-motion, avoid layout shift and animation blocking rapid clicks. The token can be an abstract fish/shrimp symbol, not an actual ingredient claim. Boat is decorative; functional cart is a conventional accessible button.
7. Cart drawer/modal: items, quantity +/- controls, remove, empty cart, subtotal and total. Do not invent delivery fees; show 'Delivery fees confirmed by restaurant' as explanatory text and label amount as 'Subtotal' rather than final payable total. Price math must be correct and derived from local menu data.
8. Demo checkout: name, phone, address (optional pickup/delivery toggle only if clearly labeled demo), form validation, generated WhatsApp-style formatted order preview including item unit prices, line totals, subtotal, customer info, and a note 'Delivery fee and availability to be confirmed'. Provide 'Copy sample order' but no send-order action. Mark sample as DEMO / NOT SENT. No user personal details saved or transmitted.
9. Footer: Instagram link https://www.instagram.com/theocean.lb/, displayed business number 71 242 240, location 'Remhala, Lebanon' (supplied Google Maps information); no made-up hours. Contact links may be informational, but avoid an order CTA that could be mistaken for a real functioning order system. Include concept disclaimer.

## Menu — exact data, USD
Shrimp Fajita — 10
Shrimp Grilled — 7
Shrimp Mexican — 7
Shrimp Crispy — 6
Felleh Philadelphia — 10
Felleh Grilled — 8
Felleh Mexican — 8
Felleh Crispy — 8

Do not add other menu items or invent descriptions, toppings, allergens, discounts, tax, or delivery costs. All prices are preliminary and require owner verification before launch.

## Animation specification
- Page entrance: subtle opacity/translate; 300–600ms; no scroll-jacking.
- Hero: delicate wave line / masked reveal; static fallback.
- Menu book: cover rotation from closed to open, 3D perspective, paper shading, slight stagger of cards. Make open/close reversible and accessible; prevent text from mirroring, flickering or clipping. Prefer a robust simplified effect over brittle realism.
- Boat: tiny bobbing motion at rest, token follows curved trajectory on Add, boat tilts briefly, badge updates. Cap concurrent effects and remove animation nodes after completion.
- Cart drawer: quick slide and focus management; Escape closes, restore focus to trigger, body scroll lock if needed.
- Microinteractions: buttons, card hover, menu category transition; never sacrifice touch usability.
- Use Higgsfield **only if an authorized working integration is available**, and only for optional, pre-rendered atmospheric hero video or subtle ocean loop. Never make live UI interactions depend on Higgsfield. If unavailable, use CSS/SVG/Motion and continue. Any generated assets should be clearly separated from authentic restaurant photos and not misrepresented as restaurant products or premises. Do not ask for or embed secret API keys in client code.

## File structure suggestion
src/components/{Header,Hero,PhotoGallery,MenuBook,MenuCard,BoatCart,CartDrawer,CheckoutPreview,Footer}.tsx
src/data/menu.ts
src/types/menu.ts
src/hooks/useCart.ts
src/lib/orderPreview.ts
src/styles/*
public/assets/{brand,seafood,sandwiches}/...
README.md

## Image assets supplied in the project package
- `brand/the-ocean-logo.jpg`: fish mark on navy background.
- `sandwiches/sandwich-1.webp`, `sandwich-2.webp`, `sandwich-3.webp`: three actual sandwich photos; exact item mapping unverified.
- `seafood/*`: actual uploaded fish, shrimp, display and plate photos; preserve original source, crop intentionally and do not imply species identification.

## Build sequence (work in small reviewable steps)
1. Initialize Vite React TS, Tailwind, Motion, Lucide; set design tokens and fonts; document run commands.
2. Build responsive header, hero, photo gallery, footer using local assets. Verify mobile and desktop.
3. Add typed eight-item menu and accessible book reveal. Verify responsive/reduced motion.
4. Add cart state, quantity calculations and cart drawer; test calculations.
5. Add fishing boat animation triggered by Add, with reduced-motion fallback and no race conditions.
6. Add demo checkout preview, copy function, validation, concept disclaimers.
7. Polish accessibility, keyboard interaction, mobile performance, image loading, lint/build, README and screenshots if tooling available.

## Acceptance criteria
- `npm install` and `npm run dev` work; `npm run build` succeeds; no TypeScript errors.
- All eight exact menu items and prices present; quantities and subtotal always correct.
- Mobile widths 320, 375, 430px, tablet 768px, desktop 1280px have no horizontal overflow or overlapping controls.
- Book works via mouse, touch, keyboard, and reduced-motion preference.
- Add-to-cart fishing animation plays gracefully and cart remains functional without animation.
- Cart, checkout preview and copy work; **no order is transmitted** and no personal data is persisted.
- Image assets are local; meaningful alt text; decorative graphics hidden from assistive tech.
- Clear concept-only disclaimer; no false claims about the restaurant.
- Provide concise README with how to replace sample assets, verify prices, configure production WhatsApp flow later (without implementing it now), and list owner approvals needed before launch.

## Instructions to Codex
First inspect the repository and assets. Summarize your implementation plan and any ambiguous image mappings. Then implement in stages, running the build/tests after each major stage. Do not delete supplied assets or alter their source content. Favor maintainable code over novelty. When a Higgsfield tool is not accessible, do not block; use Motion/CSS/SVG.
