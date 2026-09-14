# Green-Loop Workspace Rules & Project Memory

This repository contains **Green-Loop**, a Next.js and Tailwind CSS landing page built for a climate change & carbon footprint event.

## Core Rules & Context to ALWAYS remember:
1. **Language & Direction**:
   - The entire website is in **Arabic** (`dir="rtl"`, `lang="ar"`).
   - Use high-quality modern Arabic typography (e.g. Google Font `Alexandria` or `Cairo`).
2. **Design Aesthetic**:
   - Clean, airy eco-minimalism: pristine white background (`#ffffff`), fresh botanical emerald/forest green primary accents (`#16a34a`, `#15803d`), soft mint green glow and shadows (`rgba(34, 197, 94, 0.18)`).
   - Dynamic fluid geometric background shapes (connecting parallelogram / angled ribbon flowing from hero to sponsors section).
3. **Core Sections**:
   - **Dynamic Navbar**: Fixed at top, green background, white text. Three items: "الرئيسية" (Home), "احسب أثرك" (Start / Calculator), "تواصل معنا" (Contact). On scroll down, shrinks slightly in width to a floating rounded pill with light green shadow and slightly more height/padding.
   - **Hero Section**:
     - Right/Left split:
       - Text side: Big headline in Arabic about daily habits & carbon footprint, sub-caption, and "جرّب الآن" (Try Now) button.
       - Character side: **Mr. Carbo** (located at `/mrCarbo.png`), with smooth entrance animation and a speech bubble coming from his mouth explaining carbon footprint facts.
       - Background shape: Green angled polygon (~25% page width) with light green shadow, flowing into next section.
   - **Sponsors & Event Partners Section**:
     - Located below hero.
     - Features a reversed angled polygon on top-left to seamlessly continue the geometric line.
     - Showcases partner/sponsor companies supporting the climate event with clean cards.
4. **Character**:
   - **Mr. Carbo** is in `public/mrCarbo.png`. He is the central mascot and guide for the website.
5. **Tech Stack**:
   - Next.js (App Router), TypeScript, Tailwind CSS.
6. **Reference Document**:
   - Detailed specifications are kept in `PROJECT_CONTEXT.md`. Always keep this file updated if requirements evolve.
