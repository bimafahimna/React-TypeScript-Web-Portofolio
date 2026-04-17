# Portfolio — Customization Guide

A single-page portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion. Inspired by [danielsun.space](https://danielsun.space/).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Customize](#how-to-customize)
  - [1. Personal Info & Content (data file)](#1-personal-info--content-data-file)
  - [2. Section-by-Section Guide](#2-section-by-section-guide)
  - [3. Colors & Theme](#3-colors--theme)
  - [4. Fonts](#4-fonts)
  - [5. Animations](#5-animations)
  - [6. Page Metadata](#6-page-metadata)
  - [7. Adding / Removing / Reordering Sections](#7-adding--removing--reordering-sections)
  - [8. Navigation Links](#8-navigation-links)
- [Features & What They Do](#features--what-they-do)
- [Unused Dependencies](#unused-dependencies)
- [Deployment](#deployment)

---

## Tech Stack

| Tool              | Purpose                                    |
| ----------------- | ------------------------------------------ |
| **React 18**      | UI library                                 |
| **TypeScript**    | Type safety                                |
| **Vite**          | Dev server & build tool                    |
| **Tailwind CSS 3**| Utility-first styling                      |
| **Framer Motion** | Scroll animations & transitions            |
| **React Router 6**| Client-side routing (single route for SPA) |
| **ESLint**        | Code linting                               |
| **Prettier**      | Code formatting                            |
| **Husky**         | Git hooks (runs lint-staged on pre-commit) |

---

## Project Structure

```
front-end/src/
├── main.tsx                          # App entry point
├── index.css                         # Global styles & Tailwind layers
├── vite-env.d.ts                     # Vite type declarations
└── app/
    ├── router/index.tsx              # React Router setup (single "/" route)
    ├── layouts/MainLayout.tsx        # Composes Navbar + all sections
    ├── data/index.ts                 # ★ ALL your content lives here
    ├── components/
    │   ├── Navbar.tsx                # Floating pill navbar + mobile menu
    │   ├── ProjectCard.tsx           # Individual project card with hover effects
    │   └── AnimatedSection.tsx       # Reusable scroll-triggered fade wrapper
    └── sections/
        ├── Hero.tsx                  # Full-screen intro with tagline & CTAs
        ├── Work.tsx                  # Project portfolio grid
        ├── Experience.tsx            # Work history timeline
        ├── Story.tsx                 # Personal narrative (about me)
        ├── Process.tsx               # Collaboration process steps
        └── Connect.tsx               # Contact CTA, email, socials & footer
```

---

## Getting Started

```bash
cd front-end
npm install
npm run dev          # Starts dev server at http://localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint
```

---

## How to Customize

### 1. Personal Info & Content (data file)

**File:** `src/app/data/index.ts`

This is the single source of truth for all dynamic content. You only need to edit this file to swap out all placeholder data.

#### Projects

```typescript
export const projects: Project[] = [
  {
    title: 'My Real Project',          // Project name
    tags: ['React', 'TypeScript'],      // Technology/category tags
    description: 'What this project does...', // Short summary (optional)
    note: 'Built at Company X',         // Extra context shown in italic (optional)
    image: '/path/to/screenshot.png',   // Image path (optional, not wired to UI yet)
  },
  // Add, remove, or reorder entries freely
];
```

**You can:**
- Add unlimited projects — the grid auto-adjusts (1 col mobile, 2 col tablet, 3 col desktop)
- Remove projects by deleting entries
- Reorder by rearranging the array
- Modify any field (`title`, `tags`, `description`, `note`)

#### Work Experience

```typescript
export const experiences: Experience[] = [
  {
    company: 'Your Company',        // Company or org name
    role: 'Your Role',              // Job title
    period: '2023 — Present',       // Date range
  },
  // Add or remove freely
];
```

#### Social Links

```typescript
export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',               // Display name
    url: 'https://github.com/you', // Full URL
    category: 'Code',             // Small label shown above the link name
  },
  // Add or remove freely
];
```

#### Navigation Links

```typescript
export const navLinks = [
  { label: 'Work', href: '#work' },       // Must match section id
  { label: 'Story', href: '#story' },
  { label: 'Process', href: '#process' },
  { label: 'Connect', href: '#connect' },
];
```

**You can:** add, remove, or rename links. The `href` must match the `id` attribute on the corresponding section component.

---

### 2. Section-by-Section Guide

Each section is a standalone file in `src/app/sections/`. Edit the text directly in the JSX.

#### Hero (`Hero.tsx`)

| Element | What to change | Line area |
|---------|---------------|-----------|
| Greeting | `"Howdy! Meet your developer,"` | Line 21 |
| Main headline | `"crafting modern web experiences."` | Lines 30–33 |
| Gradient words | `"modern web"` inside `<span className="gradient-text">` | Line 31 |
| Subtitle | `"Building performant, beautiful interfaces..."` | Lines 42–43 |
| Primary CTA text | `"See my work"` | Line 56 |
| Secondary CTA text | `"Get in touch"` | Line 62 |

**You can:**
- Change all copy to match your own voice
- Remove the scroll indicator (the bouncing dot at the bottom, lines 67–80)
- Add your name as a large display heading
- Add a profile photo or avatar
- Remove or change the background glow shapes (lines 9–12)

#### Work (`Work.tsx`)

| Element | What to change |
|---------|---------------|
| Section heading | `"My latest work"` |
| Subheading | `"from 2020 'til today"` |
| Bottom message | `"New cases are on the way, slowly but surely"` |
| Grid columns | Change `lg:grid-cols-3` to `lg:grid-cols-2` for fewer columns |

**You can:**
- Change the grid layout by modifying the Tailwind grid classes
- Remove the bottom message entirely
- Content is driven by `projects` array in the data file

#### Experience (`Experience.tsx`)

| Element | What to change |
|---------|---------------|
| Section heading | `"Every experience is important"` |
| Subheading | `"and has taught me a lot"` |
| Background | `bg-surface-light` on the AnimatedSection gives it a slightly lighter band |

**You can:**
- Remove this entire section (delete import + `<Experience />` from `MainLayout.tsx`)
- Change the layout from list to grid or cards
- Content is driven by `experiences` array in the data file

#### Story (`Story.tsx`)

| Element | What to change |
|---------|---------------|
| Heading | `"I don't have dark secrets, only bright ones"` |
| All body paragraphs | The four `<motion.p>` blocks (lines 22–70) |
| Layout | Two-column grid on desktop, single column on mobile |

**You can:**
- Rewrite all paragraphs with your personal story
- Add images (e.g. a photo of yourself)
- Change from two columns to a single column by removing `lg:grid-cols-2`
- Add a resume download link

#### Process (`Process.tsx`)

| Element | What to change |
|---------|---------------|
| Heading | `"What my perfect collab looks like"` |
| Steps array | The `steps` const at the top of the file (lines 4–29) |

Each step has:
```typescript
{
  number: '01',                    // Step number
  title: 'Discovery',             // Step name
  description: 'We start with...' // Step detail
}
```

**You can:**
- Add, remove, or reorder steps
- Change to 1 column (`md:grid-cols-1`) or 3 columns (`md:grid-cols-3`)
- Move the `steps` array into the data file for consistency
- Rename the entire section (e.g. "How I Work", "My Approach")

#### Connect (`Connect.tsx`)

| Element | What to change |
|---------|---------------|
| CTA text | `"Tap this 'tiny' button to start your next project"` |
| Email address | `hello@example.com` — appears in **two** `mailto:` links (lines 20 and 41) |
| Button text | `"Connect"` |
| Copyright name | `"Bima"` on line 75 |

**You can:**
- Change the email to your real address
- Add more social links via the data file
- Remove the footer navigation links
- Add a contact form instead of the mailto button

---

### 3. Colors & Theme

**File:** `tailwind.config.js`

All colors are defined under `theme.extend.colors`:

```
surface.DEFAULT  = #0a0a0a    → Main background (near-black)
surface.light    = #141414    → Slightly lighter bg (cards, navbar, alternating sections)
surface.lighter  = #1e1e1e    → Hover states on cards

accent.DEFAULT   = #BBA58F    → Primary accent (buttons, highlights) — warm beige
accent.muted     = #959D90    → Secondary accent — muted green-grey
accent.warm      = #E8D9CD    → Hover/gradient accent — light beige

text.DEFAULT     = #EFEFE9    → Primary text — off-white
text.muted       = #8a8a80    → Secondary text — subdued grey
text.dark        = #223030    → Text on accent-colored backgrounds
```

**To switch to a light theme:** swap the surface colors with light values and the text colors with dark values.

**To change the accent color:** replace `#BBA58F` with your preferred color. The warm and muted variants should be lighter and more subdued variants of your accent.

---

### 4. Fonts

**Files:** `index.html` (Google Fonts import) + `tailwind.config.js` (font family)

Current fonts:
- **Syne** (`font-syne`) — used for headings, display text, navbar logo
- **Inter** (`font-inter`) — used for body text (set as default on `<body>`)

**To change fonts:**
1. Pick fonts from [Google Fonts](https://fonts.google.com)
2. Update the `<link>` tag in `index.html` (line 10)
3. Update `fontFamily` in `tailwind.config.js` (lines 8–9)
4. Use `font-yourfont` class wherever the old font class was used

---

### 5. Animations

**Library:** [Framer Motion](https://www.framer.com/motion/)

Animations used throughout:

| Animation | Where | How to modify |
|-----------|-------|--------------|
| Fade-in on load | Hero section — each element has staggered `delay` | Change `delay` and `duration` values |
| Slide-up on scroll | All sections via `whileInView` | Change `initial.y` value (e.g. `y: 40` → `y: 20` for subtler) |
| Fade on scroll | `AnimatedSection` wrapper | Change `margin` in `viewport` to trigger earlier/later |
| Navbar slide-down | Navbar entrance | Modify `initial.y` and `transition.duration` |
| Mobile menu overlay | AnimatePresence in Navbar | Modify enter/exit animations |
| Scroll indicator bounce | Hero bottom dot | Modify `animate.y` array and `transition.duration` |
| Button scale on hover/tap | Connect CTA | `whileHover.scale` and `whileTap.scale` |

**To disable all animations:** replace `motion.div` / `motion.p` / etc. with regular `div` / `p` tags and remove the animation props.

**To make animations faster:** reduce `duration` values (e.g. 0.5 → 0.3).

**To make animations only play once:** this is already the default (`viewport: { once: true }`).

---

### 6. Page Metadata

**File:** `index.html`

| What | Where |
|------|-------|
| Page title | `<title>Bima \| Portfolio</title>` (line 13) |
| Favicon | `href="./src/assets/solar-system-svgrepo-com.svg"` (line 5) — replace with your own icon |
| Language | `<html lang="en">` (line 2) |

**To add SEO meta tags,** add inside `<head>`:
```html
<meta name="description" content="Your portfolio description" />
<meta property="og:title" content="Your Name | Portfolio" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="/og-image.png" />
```

---

### 7. Adding / Removing / Reordering Sections

**File:** `src/app/layouts/MainLayout.tsx`

The page renders sections in this order:

```tsx
<Hero />
<Work />
<Experience />
<Story />
<Process />
<Connect />
```

**To remove a section:** delete its import line and its `<Component />` tag.

**To reorder sections:** rearrange the `<Component />` tags.

**To add a new section:**
1. Create a new file in `src/app/sections/` (e.g. `Skills.tsx`)
2. Use `AnimatedSection` as a wrapper for scroll animations
3. Give it a unique `id` (e.g. `id="skills"`)
4. Import and add it in `MainLayout.tsx`
5. Add a matching nav link in `data/index.ts`: `{ label: 'Skills', href: '#skills' }`

Example new section skeleton:

```tsx
import AnimatedSection from '../components/AnimatedSection';

const Skills = () => {
  return (
    <AnimatedSection id="skills" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-syne text-headline mb-16">My Skills</h2>
        {/* Your content here */}
      </div>
    </AnimatedSection>
  );
};

export default Skills;
```

---

### 8. Navigation Links

**Data-driven:** `navLinks` in `src/app/data/index.ts`

The navbar renders whatever is in the array. The "Start project" button always links to `#connect`.

**To change "Start project"** button text or link, edit `src/app/components/Navbar.tsx`:
- Desktop button: line 47–51
- Mobile button: lines 81–87

**To change the logo ("B."):** edit line 29 in `Navbar.tsx`.

---

## Features & What They Do

### Implemented Features

| Feature | Description | File(s) |
|---------|-------------|---------|
| **Floating pill navbar** | Stays fixed at top, changes opacity on scroll, centers horizontally | `Navbar.tsx` |
| **Mobile hamburger menu** | Full-screen overlay on small screens, animated with Framer Motion | `Navbar.tsx` |
| **Smooth scroll navigation** | Clicking nav links smoothly scrolls to section anchors | `index.css` (`scroll-behavior: smooth`) |
| **Scroll-triggered animations** | Elements fade/slide in as you scroll past them | All sections + `AnimatedSection.tsx` |
| **Responsive grid layout** | Project cards adapt: 1→2→3 columns across breakpoints | `Work.tsx` |
| **Gradient text effect** | Accent-colored gradient on key words | `index.css` (`.gradient-text`) |
| **Hover effects** | Cards, links, and buttons have transition effects on hover | Various components |
| **Custom scrollbar** | Thin accent-colored scrollbar (WebKit browsers) | `index.css` |
| **Text selection styling** | Custom accent color when selecting text | `index.css` (`::selection`) |
| **Scroll indicator** | Bouncing dot animation at bottom of hero section | `Hero.tsx` |
| **Dark theme** | Full dark background with warm accent palette | `tailwind.config.js` + `index.css` |

### Things You Could Add

| Feature | Complexity | Suggestion |
|---------|-----------|------------|
| **Project images** | Low | Add images to `src/assets/`, set the `image` field in project data, update `ProjectCard.tsx` to render an `<img>` |
| **Project detail pages** | Medium | Add individual routes in the router, create a `ProjectDetail` page component |
| **Dark/light mode toggle** | Medium | Add state to toggle between two Tailwind color sets, persist in localStorage |
| **Blog section** | Medium | Create a new section, or add routes for individual blog posts with markdown support |
| **Contact form** | Medium | Replace the mailto button with a form using a service like Formspree, EmailJS, or your own backend |
| **Skills/tech stack section** | Low | New section with a grid of technology icons or skill bars |
| **Testimonials section** | Low | New section with client/colleague quotes |
| **Resume/CV download** | Low | Add a PDF to `public/`, link to it from Hero or Story section |
| **Analytics** | Low | Add Google Analytics or Plausible script to `index.html` |
| **Page transitions** | Medium | Use Framer Motion `AnimatePresence` if you add multi-page routing |
| **Cursor trail / particle effects** | High | Add canvas-based animations behind the hero section |
| **Internationalization (i18n)** | Medium | Use `react-i18next` to support multiple languages |
| **CMS integration** | High | Connect to a headless CMS (Sanity, Contentful) to manage content dynamically |

---

## Unused Dependencies

These packages are installed but **not currently imported** anywhere in the code. You can safely remove them if not needed:

```bash
npm uninstall @reduxjs/toolkit redux react-helmet-async @types/js-cookie
```

| Package | Originally intended for |
|---------|----------------------|
| `@reduxjs/toolkit` + `redux` | State management (not needed for a static portfolio) |
| `react-helmet-async` | Dynamic `<head>` management (SEO meta tags per page) |
| `@types/js-cookie` | Cookie handling type definitions |

---

## Deployment

Build the production bundle:

```bash
npm run build
```

The output goes to `front-end/dist/`. Deploy this folder to any static hosting:

- **Vercel**: `npx vercel` from the `front-end` directory
- **Netlify**: drag & drop the `dist` folder or connect your repo
- **GitHub Pages**: use `gh-pages` package or GitHub Actions
- **Cloudflare Pages**: connect your repo, set build command to `npm run build` and output to `dist`

For SPA routing to work on refresh, configure your host to redirect all paths to `index.html`.
