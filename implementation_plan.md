# Implementation Plan: Green-Loop Arabic Eco-Minimalist Landing Page

Build a modern, high-impact Arabic landing page for **Green-Loop**, a climate change and carbon footprint event project. The design follows an airy **eco-minimalism** aesthetic (pristine white backdrop, vibrant leaf-green accents, soft mint glows), featuring the **Mr. Carbo** mascot with an animated speech bubble, a scroll-reactive morphing navbar, and continuous geometric green polygons connecting the sections.

---

## User Review Required

> [!IMPORTANT]
> - **Tailwind CSS Version**: We will use **Next.js 14/15 + Tailwind CSS v3** for rock-solid stability with RTL text utilities and custom animations.
> - **Character Asset**: `public/mrCarbo.png` will be strictly preserved and integrated into the hero section with tailored positioning for the speech bubble.
> - **Language & Text Direction**: The interface will be built with native Arabic typography (`dir="rtl"`, Google Font `Alexandria`) while all code and documentation remain in English.

---

## Architecture & Visual Concept

### 1. Dynamic Scroll-Reactive Navbar
- **Initial State (Top of page)**:
  - Fixed at the top, spans 100% width.
  - Emerald green background (`#16a34a`), crisp white text (`#ffffff`).
  - Brand name: **Green Loop** (with a stylized leaf/loop icon).
  - Three navigation items:
    1. `الرئيسية` (Home)
    2. `احسب أثرك` (Start / Calculate)
    3. `تواصل معنا` (Contact)
- **Scrolled State (When scrolling down)**:
  - Dynamically narrows in width to a centered floating pill container (`max-w-4xl` or `max-w-5xl`).
  - Slightly increased vertical padding and rounded edges (`rounded-full` or `rounded-2xl`).
  - Adds a soft, glowing mint-green drop shadow (`box-shadow: 0 10px 30px rgba(34, 197, 94, 0.25)`).
  - Smooth CSS transition (`transition-all duration-300 ease-out`).

### 2. Hero Section
- **Right/Left Split Layout (RTL-adapted)**:
  - **Text Side (Right in RTL)**:
    - **Bold Headline**: *"أثرك البيئي يبدأ من عاداتك اليومية"* (Your environmental impact starts with your daily habits).
    - **Sub-caption**: An engaging explanation of tracking daily commute kilometers, food consumption, and energy use.
    - **Primary CTA Button**: **"جرّب الآن"** (Try Now) with an interactive hover effect, soft green pulse, and leaf icon.
  - **Mascot Side (Left in RTL)**:
    - **Mr. Carbo** (`/mrCarbo.png`) with a smooth fade-in entrance animation and subtle idle float.
    - **Speech Bubble (Chat Box)**: Styled speech bubble with an arrow pointing directly to Mr. Carbo's mouth. Features interactive eco-facts and tips (e.g., *"مرحباً! أنا مستر كاربو 🌱.. هل تعلم أن تغيير وسيلة تنقلك اليومية يمكن أن يوفر مئات الكيلوغرامات من الكربون سنوياً؟"*). Clicking Mr. Carbo or the bubble cycles through interactive facts.
- **Continuous Geometric Background Polygon**:
  - Positioned behind Mr. Carbo, occupying ~25% of the page width.
  - Green angled polygon/parallelogram with a soft mint drop shadow.
  - The bottom edge angles downward to visually guide the user's eye and connect directly to the next section.

### 3. Sponsors & Event Partners Section
- Positioned directly below the hero section.
- **Reversed Geometric Polygon**:
  - Features an inverted angled polygon with its base on the top-left to seamlessly continue the geometric line established in the hero section.
- **Section Content**:
  - Arabic section header: *"شكر خاص لشركاء النجاح والجهات الراعية"* (Special thanks to our partners and sponsors).
  - Clean, minimalist partner/sponsor cards with glassmorphism and subtle green hover accents.

### 4. Interactive Quick-Try Teaser (WOW Factor)
- When the user clicks **"جرّب الآن"** (Try Now), an interactive quick-estimate modal/drawer opens:
  - Simple slider for daily commute (e.g., 5 km - 50 km).
  - Quick transport selector (Car, Bus, Metro, Walking).
  - Instant live carbon estimation badge (e.g., *"ينتج تنقلك حوالي X كجم CO₂e أسبوعياً"*).
  - Demonstrates immediate value for hackathon judges and presentation video recording before the teammate integrates the full calculator backend.

---

## Proposed Changes

### Setup & Configuration
#### [NEW] Next.js App Router Scaffolding
- Initialize Next.js with TypeScript and Tailwind CSS (preserving `public/mrCarbo.png`).
- Configure `tailwind.config.ts` with custom eco colors:
  - `brand-green-50`: `#f0fdf4`
  - `brand-green-500`: `#22c55e`
  - `brand-green-600`: `#16a34a`
  - `brand-green-700`: `#15803d`
  - `mint-glow`: `rgba(34, 197, 94, 0.2)`
- Configure `app/layout.tsx`:
  - Set `<html lang="ar" dir="rtl">`.
  - Import Google Font `Alexandria` for clean modern Arabic typography.
  - Set SEO title and meta descriptions for Green-Loop.

---

### Components

#### [NEW] `components/Navbar.tsx`
- Scroll listener with throttle/state management.
- Dynamic transition classes between full-width header and floating pill with light green glow.
- Brand logo + 3 Arabic navigation links.

#### [NEW] `components/HeroSection.tsx`
- Two-column responsive RTL layout.
- Engaging Arabic typography and CTA.
- Mascot display (`public/mrCarbo.png`) with animated speech bubble.
- Green angled background shape behind Mr. Carbo (~25% width, mint glow).

#### [NEW] `components/SponsorsSection.tsx`
- Inverted polygon layout at the top-left.
- Grid of sponsor cards with logos/names and hover states.
- Event partner recognition text.

#### [NEW] `components/QuickTryModal.tsx`
- Interactive teaser modal triggered by "جرّب الآن".
- Live commute slider and carbon calculation preview.

#### [NEW] `components/Footer.tsx`
- Clean eco-minimalist footer with Green-Loop branding and event copyright.

---

## Verification Plan

### Automated Checks
- Run `npm run build` to verify Next.js compiles without TypeScript or JSX errors.
- Run `npm run lint` for code hygiene.

### Visual & Interactive Testing
- Run local dev server (`npm run dev`).
- Use the **browser subagent** to:
  1. Record a browser walkthrough video demonstrating the entire landing page.
  2. Verify navbar scroll behavior (narrows to floating pill with light green shadow upon scrolling).
  3. Verify Mr. Carbo's fade-in animation and speech bubble alignment.
  4. Verify the geometric polygon flow from the hero section to the sponsors section.
  5. Test clicking "جرّب الآن" to ensure the interactive teaser modal opens and reacts smoothly.
  6. Confirm proper RTL alignment on both desktop and mobile viewports.
