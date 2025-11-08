# Stat Cards Purple Glow Effect — Analysis Report

**Objective:** Pinpoint exact CSS configuration used for navbar glow effect and identify safest injection point to replicate on stat cards.

---

## 1️⃣ Navbar Glow Effect — Exact CSS Configuration

### Source Location
**File:** `src/index.css:324-336`

### Implementation Technique
The navbar uses a **`::after` pseudo-element** overlay to create the glow effect without affecting layout or causing overflow issues.

### Exact CSS Values

```css
.nav-glass::after {
  content: "";
  position: absolute;
  inset: 0;                    /* Covers entire parent */
  border-radius: inherit;       /* Matches parent's border-radius */
  pointer-events: none;         /* Doesn't block interactions */
  z-index: 1;                   /* Above background, below content */

  /* GLOW EFFECT VALUES */
  border: 1px solid rgba(122, 44, 255, 0.95);  /* Purple border */
  box-shadow:
    0 0 10px rgba(122, 44, 255, 0.55),         /* Inner glow */
    0 0 22px rgba(122, 44, 255, 0.28);         /* Outer glow */
  background: transparent;
}
```

### Color Breakdown
- **RGB:** `122, 44, 255` (purple/UV color)
- **Hex Equivalent:** `#7A2CFF`
- **Tailwind Equivalent:** `uv-700` (close match: `#4c3bd6`) or custom `rgb(122, 44, 255)`

### Shadow Anatomy

| Layer | Offset-X | Offset-Y | Blur | Spread | Color | Opacity | Purpose |
|-------|----------|----------|------|--------|-------|---------|---------|
| **Inner Glow** | 0 | 0 | 10px | 0 | rgb(122,44,255) | 0.55 | Tight glow near edges |
| **Outer Glow** | 0 | 0 | 22px | 0 | rgb(122,44,255) | 0.28 | Diffused outer halo |

### Border Configuration
- **Width:** 1px
- **Color:** `rgba(122, 44, 255, 0.95)` (95% opacity)
- **Purpose:** Sharp purple outline that enhances glow definition

### Z-Index Context
- **Pseudo-element z-index:** 1
- **Parent content z-index:** Content has `position: relative; z-index: 1` (see index.css:339)
- **Effective Stacking:** Glow sits between background layers and content, doesn't obscure text/icons

### Additional Properties
- **pointer-events: none** — Ensures glow doesn't intercept clicks/hovers
- **border-radius: inherit** — Automatically matches parent's rounded corners
- **overflow:** Parent has `overflow: visible` (index.css:321) to prevent clipping

---

## 2️⃣ Stat Cards Structure & Selectors

### Current Implementation
**File:** `src/pages/Home.tsx:33-57`

### Container
```jsx
<div className="flex flex-wrap justify-center gap-4 mt-0 sm:mt-0 md:mt-1 lg:mt-1 mb-20">
```
- **Purpose:** Flexbox wrapper for all three cards
- **Layout:** Horizontal on desktop, wraps on mobile
- **Gap:** 16px (gap-4) between cards

### Individual Card Structure
```jsx
<div className="tile px-8 py-6">
  <div className="flex items-center gap-3 mb-2">
    {/* Icon + Label */}
  </div>
  <div className="text-4xl font-semibold">
    {/* Stat Value */}
  </div>
</div>
```

### Selector Details

| Element | Selector | File/Line | Count |
|---------|----------|-----------|-------|
| **Card Container** | `div.tile` | Home.tsx:34, 42, 50 | 3 instances |
| **All Cards (group)** | `section#hero > div.flex > .tile` | Home.tsx:33-57 | Descendant selector |

### Current `.tile` Class Configuration
**File:** `src/index.css:92-119`

**Base Styles:**
```css
.tile {
  position: relative;           /* ✅ Required for ::after positioning */
  overflow: hidden;             /* ⚠️ Currently clips overflow */
  background: radial-gradient(120% 140% at 20% 0%, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 60%);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 240ms ease;
}
```

**Existing `::after` Pseudo-element:**
```css
.tile::after {
  content: "";
  position: absolute;
  inset: -20%;                   /* ⚠️ Already extends beyond bounds */
  background: radial-gradient(40% 20% at 0% 0%, rgba(255,255,255,0.10), transparent 60%);
  transform: translateX(-120%) rotate(8deg);  /* Hidden by default */
  transition: transform 1000ms ease;
  pointer-events: none;
}
```

**Hover State:**
```css
.tile:hover {
  border-color: rgba(255,255,255,0.12);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);  /* Shadow lift effect */
}

.tile:hover::after {
  transform: translateX(120%) rotate(8deg);   /* Shine sweep animation */
}
```

### Current Z-Index Context
- `.tile` has `position: relative` ✅
- `.tile::after` doesn't specify z-index (defaults to auto/0)
- Content inside `.tile` has no explicit z-index

### ⚠️ **Conflict Alert**
**`.tile::after` is ALREADY IN USE** for the hover "shine sweep" animation. We **CANNOT** reuse `::after` for the glow effect without breaking existing animation.

---

## 3️⃣ Safest Class Injection Point & Implementation Strategy

### Problem
- `.tile::after` is occupied by shine animation
- `.tile::before` is available for glow effect

### Recommended Approach

#### **Option A: Use `::before` Pseudo-element** (SAFEST)

Create a new class `.tile-uv-glow` that adds the glow via `::before`:

```css
.tile-uv-glow::before {
  content: "";
  position: absolute;
  inset: 0;                    /* Covers entire tile */
  border-radius: inherit;       /* Matches tile's 16px radius */
  pointer-events: none;
  z-index: 0;                   /* Behind content, above background */

  /* EXACT NAVBAR GLOW VALUES */
  border: 1px solid rgba(122, 44, 255, 0.95);
  box-shadow:
    0 0 10px rgba(122, 44, 255, 0.55),
    0 0 22px rgba(122, 44, 255, 0.28);
  background: transparent;
}
```

**Why z-index: 0?**
- `.tile::after` (shine) has no explicit z-index (renders above due to DOM order)
- Content has no explicit z-index (renders in normal flow above positioned elements)
- `z-index: 0` ensures glow sits behind content and shine animation

**Overflow Consideration:**
The current `.tile` has `overflow: hidden`, which **WILL CLIP** the glow blur extending beyond bounds. We need to:

1. **Remove `overflow: hidden`** from `.tile` base class, OR
2. **Add `overflow: visible`** to `.tile-uv-glow` variant

**Recommended CSS:**
```css
/* Update base tile to allow glow extension */
.tile-uv-glow {
  overflow: visible;  /* Override base tile's overflow: hidden */
}

.tile-uv-glow::before {
  content: "";
  position: absolute;
  inset: -2px;        /* Slight expansion to accommodate blur */
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
  border: 1px solid rgba(122, 44, 255, 0.95);
  box-shadow:
    0 0 10px rgba(122, 44, 255, 0.55),
    0 0 22px rgba(122, 44, 255, 0.28);
  background: transparent;
}

/* Ensure content renders above glow */
.tile-uv-glow > * {
  position: relative;
  z-index: 1;
}
```

#### **Option B: Nested Wrapper Element** (MORE FLEXIBLE)

If we want to avoid modifying `.tile` class structure:

```jsx
<div className="tile px-8 py-6">
  <div className="tile-glow-wrapper">
    {/* Existing content */}
  </div>
</div>
```

```css
.tile-glow-wrapper {
  position: relative;
}

.tile-glow-wrapper::before {
  content: "";
  position: absolute;
  inset: -8px;       /* Extends beyond tile padding */
  border-radius: 16px;
  pointer-events: none;
  z-index: -1;       /* Behind content */
  border: 1px solid rgba(122, 44, 255, 0.95);
  box-shadow:
    0 0 10px rgba(122, 44, 255, 0.55),
    0 0 22px rgba(122, 44, 255, 0.28);
}
```

**Pros:**
- Doesn't modify existing `.tile` class
- No risk of breaking shine animation
- Easier to remove/toggle without affecting layout

**Cons:**
- Adds extra DOM wrapper
- Requires JSX changes to all 3 cards

---

## Implementation Injection Points

### Point 1: CSS Addition (index.css)
**Location:** After `.tile` block (around line 120)

```css
/* Add after .tile:active block */

/* Purple UV glow effect for stat cards */
.tile-uv-glow {
  overflow: visible;  /* Allow glow blur to extend beyond bounds */
}

.tile-uv-glow::before {
  content: "";
  position: absolute;
  inset: -2px;        /* Slight outset to accommodate blur */
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;

  /* Exact navbar glow values */
  border: 1px solid rgba(122, 44, 255, 0.95);
  box-shadow:
    0 0 10px rgba(122, 44, 255, 0.55),
    0 0 22px rgba(122, 44, 255, 0.28);
  background: transparent;
}

/* Ensure tile content renders above glow */
.tile-uv-glow > * {
  position: relative;
  z-index: 1;
}
```

### Point 2: JSX Class Addition (Home.tsx)
**Location:** Lines 34, 42, 50

**Before:**
```jsx
<div className="tile px-8 py-6">
```

**After:**
```jsx
<div className="tile tile-uv-glow px-8 py-6">
```

---

## Responsive Behavior

### Breakpoint Testing Required

| Breakpoint | Layout | Potential Issues |
|------------|--------|------------------|
| **Mobile (< 640px)** | Stacked vertical | Glow may merge if cards are close |
| **Tablet (640px-1023px)** | 2-3 column wrap | Gap-4 (16px) sufficient clearance |
| **Desktop (≥ 1024px)** | Horizontal row | Gap-4 sufficient, glow won't overlap |

### Gap Analysis
- Current gap: `gap-4` = 16px
- Outer glow blur: 22px total (11px each direction)
- **Potential Overlap:** Glows may visually merge on mobile if cards stack closely

**Solution:** Glow opacity (0.28 on outer layer) is low enough that overlap should be subtle and aesthetically acceptable.

---

## Z-Index Stacking Summary

### Before Glow Addition
| Element | z-index | Layer |
|---------|---------|-------|
| `.tile` | (relative) | Container |
| `.tile::after` (shine) | auto/0 | Hover sweep effect |
| Content (icons/text) | auto/0 | Normal flow |

### After Glow Addition
| Element | z-index | Layer |
|---------|---------|-------|
| `.tile-uv-glow::before` (glow) | 0 | Behind content, above bg |
| `.tile-uv-glow > *` (content) | 1 | Above glow |
| `.tile::after` (shine) | auto/0 | Above glow (DOM order) |

**Result:** Glow sits behind all content and shine animation, visible only at edges.

---

## Overflow & Clipping Analysis

### Current State
- `.tile` has `overflow: hidden` (index.css:94)
- **Effect:** Clips the shine animation `::after` to tile bounds
- **Problem:** Will also clip glow blur extending beyond tile

### Required Change
```css
.tile-uv-glow {
  overflow: visible;  /* Override base tile overflow */
}
```

### Alternative (Minimal Overflow)
If we want to minimize glow extension (e.g., for very tight mobile layouts):
```css
.tile-uv-glow::before {
  inset: 0;           /* No outset */
  border-radius: 16px;
  /* Glow will be slightly more contained */
}
```

**Trade-off:** Glow will be slightly less visible but won't extend as far beyond tile bounds.

---

## Layout Shift Prevention

### Risk Assessment
- **Low Risk:** Adding `::before` pseudo-element with `position: absolute` and `inset` doesn't affect document flow
- **No Layout Shift:** Element is removed from normal flow and positioned relative to parent
- **Content Overlap:** Setting child content to `z-index: 1` ensures no visual overlap

### Validation Steps (When Implementing)
1. Check tile dimensions before/after in DevTools (should be identical)
2. Verify no cumulative layout shift (CLS) in Lighthouse
3. Test hover states (shine animation should still work)
4. Confirm no scrollbar appearance due to overflow

---

## Summary & Recommendations

### ✅ Exact Navbar Glow Values (Copy-Paste Ready)
```css
border: 1px solid rgba(122, 44, 255, 0.95);
box-shadow:
  0 0 10px rgba(122, 44, 255, 0.55),
  0 0 22px rgba(122, 44, 255, 0.28);
```

### ✅ Stat Card Selectors
- **Individual Cards:** `.tile` (3 instances at Home.tsx:34, 42, 50)
- **Group Selector:** `section#hero > div.flex > .tile`

### ✅ Safest Implementation Strategy
**Option A (Recommended):** Add `.tile-uv-glow` class using `::before` pseudo-element
- **CSS Injection Point:** `src/index.css:120` (after `.tile:active`)
- **JSX Injection Point:** Add `tile-uv-glow` class to each `.tile` div in Home.tsx

**Key Requirements:**
1. Use `::before` (not `::after`, which is occupied)
2. Set `overflow: visible` on `.tile-uv-glow`
3. Set `z-index: 0` on `::before` pseudo-element
4. Set `z-index: 1` on child content (`> *`)
5. Use `inset: -2px` for slight glow extension
6. Copy exact box-shadow and border values from navbar

### ⚠️ Warnings
- **Don't use `::after`** — already occupied by shine animation
- **Must override `overflow: hidden`** — base `.tile` class clips content
- **Mobile gap check** — verify 16px gap prevents excessive glow merge

### 📊 Expected Visual Result
Each stat card will have:
- Sharp 1px purple border (95% opacity)
- 10px inner purple glow (55% opacity)
- 22px outer purple glow halo (28% opacity)
- Glow sits behind content, visible at edges
- Shine animation (hover sweep) unaffected

---

**Report Generated:** 2025-11-08
**Status:** ✅ Analysis Complete — No Code Changes Applied
**Ready for Implementation:** YES (exact values and injection points documented)
