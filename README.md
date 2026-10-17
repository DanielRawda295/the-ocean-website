# The Ocean — Unofficial Concept

A frontend-only, unofficial concept MVP for **The Ocean**, a seafood restaurant in Remhala, Lebanon. It is a pitch prototype, not a live restaurant ordering service.

## Guardrails

- This project does not accept or transmit orders.
- It has no backend, database, authentication, payment processing, analytics, or external integrations.
- A future demo checkout will generate a copyable sample message only; it will not open or send a WhatsApp order.
- Prices and menu presentation require restaurant-owner approval before any production use.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 via the Vite plugin
- Motion for React (reserved for later phases)
- Lucide React

## Local development

Prerequisite: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Vite prints the local address in the terminal (normally `http://localhost:5173`).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Asset organization

The original supplied assets remain untouched in the repository root:

- `brand/`
- `sandwiches/`
- `seafood/`

Their application-ready copies live at `public/assets/{brand,sandwiches,seafood}/`. Future generated media must be placed in `public/assets/generated/` and clearly labelled as generated; no Higgsfield assets are generated or used in this phase.

## Menu data model

`src/types/menu.ts` supports localized Arabic/English names and three price forms—fixed USD, USD per kilogram, and price on request. The current data remains intentionally limited to the eight confirmed sandwich items and their supplied fixed USD prices in `src/data/menu.ts`.

## Before production

Restaurant-owner approval is required for final menu names, Arabic translations, item/photo mapping, all prices, availability, delivery policies, WhatsApp workflow, address/map details, and any production claims or integrations.
