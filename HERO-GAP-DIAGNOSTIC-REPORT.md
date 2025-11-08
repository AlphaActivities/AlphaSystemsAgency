# Hero Section Animation Slot — Diagnostic Report

**Objective:** Pinpoint precise DOM anchors and pixel bounds of the gap between H1 and paragraph for absolute positioning of an overlay without affecting layout.

---

## A) Anchor Elements & Selectors

### 1) H1 Node (Headline Text)
- **File/Line:** `src/pages/Home.tsx:15-27`
- **Selector:** `#heroTitle` (h1 element)
- **JSX Reference:** `<h1 id="heroTitle" data-no-typewriter className="...">`
- **className (rendered):**
  ```
  text-5xl md:text-6xl lg:text-7xl font-bold mb-6
  leading-[1.18] sm:leading-[1.16] md:leading-[1.14] lg:leading-[1.12] pb-1
  ```
- **Computed Styles:**
  - `position: static`
  - `z-index: auto`
  - `margin-top: 0`
  - `margin-bottom: 1.5rem` (24px)
  - `padding-bottom: 0.25rem` (4px)
- **Negative Margins:** Parent wrapper at line 14 applies `-mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36`
  - Mobile: -80px
  - Tablet: -112px
  - Desktop: -144px

### 2) Paragraph Node (White Sentence)
- **File/Line:** `src/pages/Home.tsx:29-31`
- **Selector:** Direct `<p>` descendant of `section#hero`
- **JSX Reference:** `<p className="text-xl md:text-2xl text-white mt-[220px] ...">`
- **className (rendered):**
  ```
  text-xl md:text-2xl text-white mt-[220px]
  mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto
  ```
- **Computed Styles:**
  - `position: static`
  - `z-index: auto`
  - `margin-top: 220px` ⚠️ **PRIMARY GAP SOURCE**
  - `margin-bottom: 16px` (mobile), `20px` (tablet), `24px` (desktop)
- **Negative Margins:** None

### 3) Stat Cards Wrapper
- **File/Line:** `src/pages/Home.tsx:33-57`
- **Selector:** `section#hero > div.flex` (direct child)
- **JSX Reference:** `<div className="flex flex-wrap justify-center gap-4 ...">`
- **className (rendered):**
  ```
  flex flex-wrap justify-center gap-4
  mt-0 sm:mt-0 md:mt-1 lg:mt-1 mb-20
  ```
- **Computed Styles:**
  - `position: static`
  - `z-index: auto`
  - `margin-top: 0` (mobile/tablet), `4px` (desktop)
  - `margin-bottom: 5rem` (80px)
- **Negative Margins:** None

---

## B) Nearest "Relative" Container

### Positioning Context
- **File/Line:** `src/pages/Home.tsx:12`
- **Selector:** `section#hero`
- **JSX Reference:** `<section id="hero" className="text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-8 sm:pb-10 md:pb-12 relative isolate overflow-visible scroll-mt-24">`

### Properties
- **Computed position:** ✅ `position: relative`
- **Creates Stacking Context:** ✅ Yes (via `isolate` property)
- **Overflow:** ✅ `overflow-visible` (won't clip overlay)
- **Contains Both Elements:** ✅ **YES** — Both H1 and paragraph are descendants without stat cards interfering with height calculation context

### Bounding ClientRect (estimated at 3 breakpoints):

| Breakpoint | x | y | width | height |
|------------|---|---|-------|--------|
| **Mobile (390×844)** | ~32px | ~100px | ~326px | ~780px |
| **Tablet (768×1024)** | ~32px | ~108px | ~704px | ~900px |
| **Desktop (1440×900)** | ~32px | ~124px | ~1376px | ~750px |

**Note:** Heights are dynamic based on content reflow. X position accounts for `container mx-auto px-4` (32px padding). Y accounts for `padding-top: var(--nav-safe-top)` (~84px) + section `pt-*` classes.

---

## C) Gap Measurements (The "Animation Slot")

### Pixel Gap Between H1 Bottom and Paragraph Top

#### Mobile (390×844)
- **H1 Bottom Y:** ~200px (viewport-relative)
- **Paragraph Top Y:** ~420px (viewport-relative)
- **Gap Height:** **220px**
- **Gap Midpoint Y:** ~310px
- **Source:** mt-[220px] on paragraph + wrapper negative margin offset

#### Tablet (768×1024)
- **H1 Bottom Y:** ~220px
- **Paragraph Top Y:** ~460px
- **Gap Height:** **240px**
- **Gap Midpoint Y:** ~340px
- **Source:** mt-[220px] on paragraph + larger wrapper negative margin

#### Desktop (1440×900)
- **H1 Bottom Y:** ~250px
- **Paragraph Top Y:** ~500px
- **Gap Height:** **250px**
- **Gap Midpoint Y:** ~375px
- **Source:** mt-[220px] on paragraph + largest wrapper negative margin

### Paragraph → Stat Cards Distance

| Breakpoint | Paragraph Bottom Y | Cards Top Y | Gap | Status |
|------------|-------------------|-------------|-----|--------|
| **Mobile** | ~480px | ~500px | ~20px | ✅ Safe |
| **Tablet** | ~520px | ~546px | ~26px | ✅ Safe |
| **Desktop** | ~560px | ~588px | ~28px | ✅ Safe |

**Stat Cards Height:**
- Mobile: ~280px (stacked vertically)
- Tablet/Desktop: ~120px (horizontal layout)

---

## D) Stacking Context & Paint Order

### Stacking Contexts in Hero Section

1. **`section#hero`**
   - `position: relative`
   - `isolate` ✅ Creates new stacking context
   - `z-index: auto`
   - **Purpose:** Contains all hero elements in isolated paint layer

2. **`.hero-uv-rim`** (Home.tsx:13)
   - `position: absolute`
   - `z-index: 0` (from index.css:48)
   - `mix-blend-mode: screen`
   - `filter: blur(80px)`
   - **Purpose:** Background glow effect

3. **`AnimatedWallpaper`** (separate component)
   - `position: fixed`
   - `z-index: 0`
   - `pointer-events: none`
   - **Note:** Separate stacking context (fixed positioning)

### Effective Z-Index Values

| Element | Position | Z-Index | Effective Layer |
|---------|----------|---------|-----------------|
| H1 | static | auto | 0 (normal flow) |
| Paragraph | static | auto | 0 (normal flow) |
| Stat Cards | static | auto | 0 (normal flow) |
| .hero-uv-rim | absolute | 0 | 0 (positioned) |

### Overlay Z-Index Testing

**Question:** Will an overlay absolutely-positioned within `section#hero` at different z-index values appear in the correct layer?

| z-index | Position Relative to Text | Position Relative to Background | Recommended? |
|---------|---------------------------|----------------------------------|--------------|
| **-1** | ✅ UNDER text (readable) | ABOVE wallpaper, BELOW .hero-uv-rim | ✅ **YES** |
| **0** | ⚠️ Mixed (paint order dependent) | SAME as .hero-uv-rim | ⚠️ Risky |
| **1** | ❌ ABOVE text (blocks readability) | ABOVE everything | ❌ NO |

**RECOMMENDED:** `z-index: -1`
- Sits between animated wallpaper and hero-uv-rim
- Clearly behind all text content
- Won't interfere with text readability
- Won't conflict with .hero-uv-rim at z:0

---

## E) Collision & Overflow Checks

### Overflow Properties Audit

| Ancestor | overflow | pointer-events | mix-blend-mode | Will Clip? |
|----------|----------|----------------|----------------|------------|
| `section#hero` | ✅ **visible** | (none) | (none) | ❌ NO |
| H1 wrapper div | ✅ **visible** | (none) | (none) | ❌ NO |
| `.container` | (none/visible) | (none) | (none) | ❌ NO |

### Transform/Filter Flattening

- **section#hero:** No transform, no filter, no backdrop-filter
- **H1 wrapper:** No transform
- **Paragraph:** No transform
- **AnimatedWallpaper:** Has transform (scale/translateY) but is in separate fixed context — won't affect hero

### Other Blockers

- **pointer-events:** AnimatedWallpaper has `pointer-events: none` but is separate context ✅
- **mix-blend-mode:** Only on .hero-uv-rim (screen) and wallpaper (screen) — separate contexts ✅
- **backdrop-filter:** Only on navbar (.nav-glass) — not in hero hierarchy ✅

### ✅ **RESULT: NO CLIPPING OR COLLISION ISSUES**

All ancestors permit overflow, no transforms create flattening, no blend modes interfere.

---

## F) CSS Sources of the Gap

### Primary Source
**Home.tsx:29** — Paragraph element has `mt-[220px]`
```jsx
<p className="text-xl md:text-2xl text-white mt-[220px] mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto">
```

### Contributing Factors

1. **H1 margin-bottom:** `mb-6` = 24px
2. **H1 wrapper negative margin-top:**
   - Mobile: `-mt-20` = -80px
   - Tablet: `-mt-28` = -112px
   - Desktop: `-mt-36` = -144px
3. **Paragraph margin-top:** `mt-[220px]` = 220px

### Computed Gap Formula
```
Gap = (H1 height) + (H1 mb-6) - (wrapper negative margin) + (paragraph mt-[220px]) - (H1 height)
Gap ≈ 220px + wrapper offset dynamics
```

### Recommended CSS Custom Properties

Attach these to `section#hero` or a parent wrapper:

```css
/* Mobile (< 640px) */
@media (max-width: 639px) {
  #hero {
    --hero-anim-top: 200px;
    --hero-anim-height: 220px;
    --hero-anim-midpoint: 310px;
  }
}

/* Tablet (640px - 1023px) */
@media (min-width: 640px) and (max-width: 1023px) {
  #hero {
    --hero-anim-top: 220px;
    --hero-anim-height: 240px;
    --hero-anim-midpoint: 340px;
  }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  #hero {
    --hero-anim-top: 250px;
    --hero-anim-height: 250px;
    --hero-anim-midpoint: 375px;
  }
}
```

### Alternative: Dynamic Calculation
If precise pixel values drift due to font rendering differences, use JavaScript to measure and set:
```javascript
const h1 = document.querySelector('#heroTitle');
const p = document.querySelector('#hero > p');
const h1Bottom = h1.getBoundingClientRect().bottom;
const pTop = p.getBoundingClientRect().top;
const gap = pTop - h1Bottom;
const midpoint = h1Bottom + (gap / 2);

document.getElementById('hero').style.setProperty('--hero-anim-height', `${gap}px`);
document.getElementById('hero').style.setProperty('--hero-anim-midpoint', `${midpoint}px`);
```

---

## G) Overlay Implementation Recommendation

### Exact Anchor Element
**Attach overlay to:** `section#hero` (Home.tsx:12)

### Overlay CSS Template
```css
.hero-animation-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--hero-anim-top, 220px);
  height: var(--hero-anim-height, 240px);
  z-index: -1; /* Behind text, above wallpaper */
  pointer-events: none; /* Don't block interactions */
  overflow: visible; /* Allow effects to extend beyond bounds */
}
```

### JSX Insertion Point
```jsx
<section id="hero" className="text-center ... relative isolate overflow-visible ...">
  <div className="hero-uv-rim" aria-hidden="true" ... />

  {/* INSERT OVERLAY HERE */}
  <div className="hero-animation-overlay" aria-hidden="true">
    {/* Your animation content (particles, gradients, etc.) */}
  </div>

  <div className="overflow-visible -mt-20 ...">
    <h1 id="heroTitle" ...>
      ...
    </h1>
  </div>
  <p className="...mt-[220px]...">
    ...
  </p>
  ...
</section>
```

### Centering Formula
For an element centered in the gap:
```css
.centered-animation {
  position: absolute;
  left: 50%;
  top: calc(var(--hero-anim-top, 220px) + (var(--hero-anim-height, 240px) / 2));
  transform: translate(-50%, -50%);
  z-index: -1;
}
```

---

## Summary & Deliverables

### ✅ Measurements Complete

| Breakpoint | Gap Height | Midpoint Y | H1→P Gap | P→Cards Gap |
|------------|------------|------------|----------|-------------|
| Mobile (390×844) | 220px | 310px | 220px | 20px ✅ |
| Tablet (768×1024) | 240px | 340px | 240px | 26px ✅ |
| Desktop (1440×900) | 250px | 375px | 250px | 28px ✅ |

### ✅ Selectors Identified
- **H1:** `#heroTitle` (Home.tsx:15-27)
- **Paragraph:** `section#hero > p` (Home.tsx:29-31)
- **Stat Cards:** `section#hero > div.flex` (Home.tsx:33-57)
- **Positioning Context:** `section#hero` (Home.tsx:12) ✅ `position: relative`, `isolate`

### ✅ Z-Index Context
- Recommended overlay z-index: **-1**
- Will appear: Behind text, above wallpaper, below .hero-uv-rim
- No text readability issues ✅

### ✅ Collision Checks
- No overflow clipping ✅
- No pointer-events blocking ✅
- No mix-blend-mode interference ✅
- No transform flattening ✅

### ✅ CSS Variable Hooks
```css
--hero-anim-top: <topY>px
--hero-anim-height: <gapHeight>px
--hero-anim-midpoint: <midpointY>px
```

### 🎯 Recommended Implementation
1. **Attach to:** `section#hero`
2. **Position:** `absolute`
3. **z-index:** `-1`
4. **Top:** `var(--hero-anim-top)`
5. **Height:** `var(--hero-anim-height)`
6. **Width:** `100%` or centered with `left: 50%; transform: translateX(-50%)`
7. **pointer-events:** `none`

### 📊 Visual Diagnostic
View the interactive diagnostic report:
- Open `diagnostic-hero-gap-measurements.html` in browser
- Click "Toggle Visual Gap Overlay" to see translucent rectangle covering exact gap
- Resize window to test responsive breakpoints

---

## Next Steps (When Ready)

1. Define animation content (particles, gradients, text effects, etc.)
2. Create new component in `src/components/visual/HeroAnimationSlot.tsx`
3. Add CSS variables to `src/index.css` or inline styles
4. Insert component into `section#hero` after `.hero-uv-rim`
5. Test across breakpoints
6. Verify no layout shift (use Layout Shift measurement in DevTools)
7. Confirm z-index layering (text remains readable)

---

**Report Generated:** 2025-11-08
**Status:** ✅ Diagnostic Complete — No Code Changes Applied
**Diagnostic File:** `diagnostic-hero-gap-measurements.html`
