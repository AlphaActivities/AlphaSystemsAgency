# PHASE 3.6 DIAGNOSTICS — GOLD DIVIDER PARITY & VISUAL WEIGHT LOCK

## SECTION A — CLIENT OUTCOME DIVIDER VISUAL WEIGHT REGRESSION

### ROOT CAUSE ANALYSIS

**Issue:** The Client Outcome divider appears visually "thinner" after hover-out compared to during hover.

**Location:** `src/pages/work/Aksarben.tsx` line 405

**Affected Element:**
```html
<div className="h-[2px] w-full max-w-md mx-auto my-4 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
```

**Parent Container:** Line 391-393
```html
<div
  style={{ overflow: 'visible' }}
  className="tile tile-outcome-glow p-8 mb-16 luxury-lazy-container transition-transform duration-300 hover:scale-105 max-w-3xl mx-auto relative"
>
```

### INHERITANCE ANALYSIS

The divider inherits the following from parent elements:

1. **Transform (CRITICAL):**
   - Parent has `hover:scale-105` (Tailwind utility)
   - On hover: entire container scales to 105%, divider scales with it
   - On hover-out: scale returns to 100% over 300ms (`transition-transform duration-300`)

2. **Box-shadow/Glow (CRITICAL):**
   - Parent uses `.tile-outcome-glow` class (index.css lines 905-923)
   - **Non-hover state:**
     ```css
     box-shadow:
       0 0 10px rgba(212, 175, 55, 0.55),
       0 0 22px rgba(212, 175, 55, 0.28);
     ```
   - **Hover state:**
     ```css
     box-shadow:
       0 0 16px rgba(212, 175, 55, 0.70),
       0 0 32px rgba(212, 175, 55, 0.40),
       0 0 48px rgba(212, 175, 55, 0.20);
     ```
   - The box-shadow transitions over 300ms (`box-shadow 300ms ease`)

3. **Border-color:**
   - Non-hover: `rgba(212, 175, 55, 0.95)`
   - Hover: `rgba(244, 208, 63, 1)` (brighter gold)
   - Also transitions over 300ms

4. **No filters applied** to the divider itself
5. **No will-change** on the divider
6. **No explicit transition** on the divider element

### GPU COMPOSITION ANALYSIS

**During Hover:**
- The `transform: scale(1.05)` triggers GPU composition for the entire tile
- The divider gets rasterized as part of the GPU-accelerated layer
- The intense box-shadow creates ambient glow around the entire container
- This glow "bleeds" onto the gold divider, making it appear brighter and thicker
- The scale-up physically enlarges the 2px height to ~2.1px

**After Hover-Out:**
- Scale returns to 1.0 (divider returns to exactly 2px)
- Box-shadow intensity reduces significantly (from 48px max blur to 22px max blur)
- Border glow reduces (brighter gold returns to standard gold)
- Ambient light around the divider decreases dramatically
- The divider relies on its own gradient only, with no ambient enhancement

### VISUAL WEIGHT REGRESSION MECHANISM

The perceived "thinning" is caused by **THREE simultaneous losses**:

1. **Physical size loss:** 5% scale-down (2.1px → 2.0px)
2. **Ambient glow loss:** Box-shadow radius reduces by ~54% (48px → 22px)
3. **Ambient brightness loss:** Box-shadow opacity reduces by ~31% (0.70 → 0.55 on brightest ring)

The divider itself has **no intrinsic glow, shadow, or brightness boost**. It depends entirely on:
- Its own gradient (`via-[#d4af37]`)
- Ambient light from the parent's box-shadow

When the parent's glow collapses, the divider loses its visual "support structure" and appears thinner.

### TRANSITION TIMING ANALYSIS

- `transition-transform duration-300` = 300ms settle time
- `box-shadow 300ms ease` = 300ms glow fade
- Both effects compound: the divider appears to "deflate" over ~700-800ms total perceived duration
- This creates a noticeable visual regression that draws user attention

---

## SECTION B — DESKTOP VS MOBILE GOLD DIVIDER FADE DISCREPANCY

### ROOT CAUSE ANALYSIS

**Issue:** Gold dividers using `.page-tone-line-soft` have different visual fade lengths on desktop vs mobile.

**Affected Elements:**
- Project Timeline section (line 259): `<div className="page-tone-line-soft" />`
- Stack & Services section (line 316): `<div className="page-tone-line-soft" />`

**CSS Definition:** `src/index.css` lines 25-38

```css
.page-tone-line-soft {
  width: 400px;
  max-width: 90vw;
  height: 3px;
  background: linear-gradient(90deg,
    rgba(212, 175, 55, 0.8) 0%,
    rgba(212, 175, 55, 0.6) 30%,
    rgba(212, 175, 55, 0.2) 55%,
    transparent 75%
  );
  border-radius: 2px;
  margin-top: 12px;
  transition: background 400ms ease;
}
```

### COMPUTED WIDTH ANALYSIS

**Desktop (viewport > ~444px):**
- Computed width: `400px` (fixed)
- Parent tile width: ~900px (estimated based on max-w-6xl container with padding)
- Divider occupies: ~44% of tile width
- Gradient transparent stop at: 75% of 400px = **300px absolute**
- Fade reaches: 300px / 900px = **33% of tile width visually**

**Mobile (viewport = 375px example):**
- Computed width: `90vw = 337.5px` (fluid)
- Parent tile width: ~343px (container with minimal padding)
- Divider occupies: ~98% of tile width
- Gradient transparent stop at: 75% of 337.5px = **253px absolute**
- Fade reaches: 253px / 343px = **74% of tile width visually**

### GRADIENT MATH DISCREPANCY

The gradient stops are **percentage-based relative to the divider's own width**, not the container width.

**Desktop perception:**
- Start: 0px (0%)
- Peak: 0px-120px (0%-30%)
- Mid-fade: 120px-220px (30%-55%)
- Full transparent: 220px-300px (55%-75%)
- Remaining 100px (75%-100%) is fully transparent but still rendered

The 300px fade on a 900px tile creates a **short, left-aligned accent** appearance.

**Mobile perception:**
- Start: 0px (0%)
- Peak: 0px-101px (0%-30%)
- Mid-fade: 101px-185px (30%-55%)
- Full transparent: 185px-253px (55%-75%)
- Remaining 84px (75%-100%) is fully transparent

The 253px fade on a 343px tile creates a **full-width sweeping** appearance.

### BREAKPOINT THRESHOLD

- Crossover occurs at viewport width: `400px / 0.9 = ~444px`
- Below 444px: divider is fluid (90vw)
- Above 444px: divider is fixed (400px)

As viewport increases beyond 444px, the **tile grows but the divider does not**, creating increasing visual disparity.

### CONTAINER WIDTH COMPARISON

**Desktop tile containers:**
- Max width constrained by `max-w-6xl` (1152px with Tailwind default)
- With padding: ~900-1000px effective width
- Divider at 400px appears as a **left-aligned decorative element**

**Mobile tile containers:**
- Full viewport width minus padding
- ~343-360px effective width at 375px viewport
- Divider at 90vw appears as a **full-width structural element**

---

## RECOMMENDED FIX STRATEGIES

### SECTION A FIXES — Client Outcome Divider Visual Weight Lock

**Strategy 1: Add Intrinsic Glow to Divider**
- Add `box-shadow` directly to the divider element
- Make the glow independent of parent hover state
- Ensures consistent visual weight in all states

**Strategy 2: Apply Constant Filter**
- Add `filter: drop-shadow(...)` to the divider
- Prevents reliance on ambient parent glow
- Creates self-illuminated appearance

**Strategy 3: Isolate from Parent Transform**
- Set `transform: scale(1)` on divider explicitly
- Prevents inheritance of parent's scale-up
- Maintains constant physical size (but may look odd during parent animation)

**Strategy 4: Increase Base Gradient Opacity**
- Change `via-[#d4af37]` to include explicit alpha above 1.0 via filter
- Add `filter: brightness(1.15)` to compensate for ambient loss
- Makes divider "self-luminous" regardless of surroundings

**RECOMMENDED:** Strategy 1 (Intrinsic Glow)
- Cleanest solution
- Maintains design language consistency
- No layout side effects

### SECTION B FIXES — Desktop vs Mobile Fade Parity

**Strategy 1: Fluid Width with Percentage Gradient**
- Remove fixed 400px width
- Use `width: 60%` or similar relative unit
- Maintains consistent proportional appearance across breakpoints

**Strategy 2: Viewport-Responsive Gradient Stops**
- Use CSS `@media` queries to adjust gradient stops at different breakpoints
- Desktop: extend gradient stops (e.g., transparent at 85% instead of 75%)
- Mobile: keep current stops
- Equalizes visual fade perception

**Strategy 3: Fixed Absolute Width Gradient**
- Convert gradient to use fixed pixel positions via CSS Houdini or SVG
- Not recommended due to browser support limitations

**Strategy 4: Separate Mobile/Desktop Divider Classes**
- Create `.page-tone-line-soft-mobile` and `.page-tone-line-soft-desktop`
- Apply via Tailwind responsive classes
- Full control over each breakpoint's appearance

**RECOMMENDED:** Strategy 2 (Viewport-Responsive Gradient Stops)
- Maintains fixed width on desktop for design consistency
- Adjusts gradient math to equalize visual perception
- No layout changes required

---

## SUMMARY

**Section A — Client Outcome Divider:**
- Root cause: Divider loses ambient glow and physical scale when parent hover ends
- Three simultaneous losses: size (5%), glow radius (54%), glow brightness (31%)
- Fix: Add intrinsic box-shadow to divider for visual weight independence

**Section B — Desktop vs Mobile Fade:**
- Root cause: Fixed 400px width creates 33% visual fade on desktop but 74% on mobile
- Gradient percentage math is relative to divider width, not container width
- Fix: Extend gradient transparent stop to 85-90% on desktop to equalize perception

END DIAGNOSTIC REPORT
