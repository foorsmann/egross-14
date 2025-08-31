# Project Plan

## Overview

This repository hosts a custom Shopify Online Store 2.0 theme built from scratch. The goal is to reproduce the existing storefront's look and behaviour with original, clean and accessible code.

## File Responsibilities

- `layout/theme.liquid` – Base HTML skeleton. Loads global CSS/JS and prints `content_for_layout`.
- `config/settings_schema.json` – Theme settings grouped by feature areas: colors, typography, header, mega menu, product, collection, cart, footer and experiments.
- `sections/header.liquid` – Theme header with desktop hover mega‑menu and mobile off‑canvas navigation. Includes links to `mega-menu.css` and `mega-menu.js`.
- `assets/mega-menu.css` – Styling for header and mega menu (responsive columns, overflow handling).
- `assets/mega-menu.js` – Interactive behaviour: open/close, focus trap, ESC and outside‑click handling, mobile toggle.
- `assets/base.css` – Global minimal stylesheet (placeholder, expanded in future commits).
- `assets/app.js` – Global minimal script (placeholder for future modules).
- `README.md` – Short instructions to install and work with the theme.

## Component Diagram

```
layout/theme.liquid
└── sections/header.liquid
    ├── assets/mega-menu.css
    └── assets/mega-menu.js
```

The layout loads `base.css` and `app.js` globally. The header section imports its own CSS/JS for the mega menu. Future sections and snippets will follow a similar pattern.
