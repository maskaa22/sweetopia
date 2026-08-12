# Sweetopia

Single-page candy-kingdom landing. React 18 + TypeScript + Vite, SCSS modules,
no router, no backend. Alias `@/` → `src/`.

```
npm run dev      # vite (port drifts: 5173 or 5174 — read the startup output, don't assume)
npm run build    # tsc -b && vite build
npx tsc -b --noEmit
```

## Layout of the thing

`App.tsx` = Header → 10 sections → Footer → CartDrawer. Section order:
Hero, Kingdom, Citizens, Ruler, Adventure, Characters, Garden, House, Shop, Contact.

- One folder per component: `Name.tsx` + `Name.module.scss` + `index.ts`.
- `lib/constants.ts` — `SECTION_IDS`, `BRAND`, `CURRENCY` (`$`), `NAV_LINKS`.
- `context/CartContext.ts` + `CartProvider.tsx`, hook `hooks/useCart.ts`.
- `styles/` — `tokens.scss` (palette, fluid type, spacing), `mixins.scss`
  (`sm/md/lg/xl` = 480/768/1024/1280 **min-width**, `gradient-text`, `motion-safe`),
  `global.scss`, `fonts.scss`.
- Icons: one sprite at `public/sprite.svg`, used via `<SvgIcon id="icon-…">`.

Copy is English throughout, brand `Sweetopia`. Display font Podarok (fallback
Oswald), body Oswald.

### Shared section pieces

`StorySection` is the original generic layout (title + copy + `MediaFrame`
placeholder). Sections get rebuilt off it one by one into bespoke layouts —
Kingdom, Citizens and Ruler are already off it. `SectionTitle` takes
`kicker / variant(outline|filled) / tone / kickerTone / align / className`.
Kicker default is the pink→blue gradient; Garden overrides to `white` because its
title sits on artwork.

## Traps that cost real time

**`global.scss` caps media at `max-width: 100%`.** Anything deliberately wider
than its container — an SVG that overhangs, an image scaled past its column —
needs `max-width: none` or it silently snaps back to 100%, and any negative
offset paired with it then drags the element off-centre instead of centring it.
Hit this twice (Citizens orbit, Ruler king).

**Supplied art sometimes has a transparency checkerboard baked into RGB.**
Check `PixelFormat` and corner alpha before trusting a PNG. Recovered two that
way: the checkerboard's two greys give two known backdrops under the same
artwork, so `a = 1 − (obs_light − obs_dark)/Δ` recovers alpha without knowing the
colour. Fitting the grid needs each axis fitted separately or the phase drifts.
Ask for a clean export first — it is usually one message away.

**Art carries large transparent margins.** Measure the content bbox before
sizing or centring; the visual centre is rarely the frame centre (the Ruler king
sits at 55.6% of his frame, the Kingdom cart at 56%).

**Section seams.** Sample the *rendered* boundary colour, not the CSS token —
`object-fit: cover` and radial gradients mean the edge is not what the token
says. Then open the next section on exactly that colour and fade out over
~20–30%. Fade to *the same RGB at zero alpha*, never `transparent` (that is
black at zero alpha and greys the ramp). Pink→blue needs a near-white waypoint
or the middle goes muddy.

**SVG `textPath`:**
- Arc direction sets glyph rotation. On the lower half of a ring, an arc swept
  the wrong way puts the text past 180° and it renders upside down. Left and
  right side runs sweep opposite ways.
- `stroke-dasharray` + `pathLength` is measured *after* `preserveAspectRatio="none"`
  stretches the box, so gaps wander. Cut gaps into the geometry (separate paths)
  instead.
- A mask is evaluated in the coordinate space of the element it sits on. Put it
  on a group *outside* any CSS-transformed one, or it scales with the transform
  and cuts in the wrong place.
- Text length vs arc length is fixed by the viewBox font-size, so it is
  breakpoint-independent. To make ring text readable on phones the *frame* has
  to grow, not the font.

## Screenshots

Chrome here refuses to go below ~504 CSS px, so `--window-size=390` renders at
504 and crops the bitmap — it looks like horizontal overflow but isn't. (I
wrongly reported an overflow bug on this basis once.) For true narrow viewports
write a temporary `mobile-preview.html` at the repo root with fixed-width
iframes of `/`, screenshot that, crop each column, then delete the file.

```
chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --user-data-dir=<scratch> --virtual-time-budget=16000 \
  --window-size=1440,5400 --screenshot=<out> http://localhost:<port>/
```

The file is written asynchronously — retry opening it in a loop, or the first
`Bitmap` load throws. Anchors (`/#ruler`) do not scroll inside headless iframes;
capture tall and crop by offset.

## Git

Branch per section, chained off the previous one (not off `main`), because each
builds on shared changes from the last: `feat/kingdom-section` →
`feat/citizens-section` → `feat/ruler-section` → `feat/adventure-section`.
Conventional commits, body explains *why*. Remote `origin` = maskaa22/sweetopia.

## Working style the user expects

Ukrainian replies. They iterate visually — expect several rounds of "трохи вище /
менше / ближче" per section, and screenshot after each change rather than
guessing. They send annotated screenshots (red boxes/lines) marking what to move.
They supply artwork mid-task, sometimes replacing a file silently — re-check
asset mtime/size when something looks different. Ask before large asset surgery.

## Settled — do not reopen

- `hero-2.png` is the alpha I recovered, not a fresh export, and that is fine:
  no checkerboard survives and the clear zone measures dead flat at alpha 0.
- The Adventure window's close control and its accept/decline buttons are
  decorative `span`s on purpose, so nothing announces itself as operable or
  takes focus. The copy inside is real text.
- Adventure's hearts stay flat sprite hearts rather than 3D art.

## Open threads

- Sparkle colour `#4a3f8c` (Citizens) is the only colour outside the tokens.
- Seams Kingdom↔Citizens, Citizens↔Ruler and Ruler↔Adventure are done; the
  remaining boundaries are still hard cuts.
- Characters onward still sit on `StorySection` with `MediaFrame` placeholders.
- Nothing is merged to `main` yet — the four section branches are chained, so a
  PR for the newest shows all of them. Merge bottom-up to split them.
