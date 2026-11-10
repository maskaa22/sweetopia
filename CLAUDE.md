# Sweetopia

Candy-kingdom site: a landing page plus a few inner pages. React 18 +
TypeScript + Vite, SCSS modules, `react-router-dom` 7, no backend. Alias `@/` →
`src/`.

```
npm run dev      # vite (port drifts: 5173 or 5174 — read the startup output, don't assume)
npm run build    # tsc -b && vite build
npx tsc -b --noEmit
```

## Layout of the thing

`main.tsx` wraps `App` in `CartProvider`. `App.tsx` is only the routes, all
inside `components/Layout` (ScrollManager → Header → `<main><Outlet/></main>` →
Footer → CartDrawer — the cart lives in the layout so it survives navigation).

| Route | Page |
|---|---|
| `/` | `pages/Home` — the landing, 10 sections in this order: Hero, Kingdom, Citizens, **Shop**, Ruler, Adventure, Characters, Garden, House, Contact |
| `/products`, `/products/:id` | `Products`, `ProductDetail` (unknown id renders `NotFound`) |
| `/about` | `About` (placeholder copy) |
| `/login` | `Auth` — sign in / register, real validation, nothing behind it yet |
| `*` | `NotFound` |

- One folder per component/page: `Name.tsx` + `Name.module.scss` + `index.ts`
  (`Layout` has no stylesheet).
- `lib/constants.ts` — `SECTION_IDS`, `BRAND`, `CURRENCY` (`$`), `ROUTES`,
  `productPath()`, `NAV_LINKS`. Nav anchors are written `/#id`, never bare `#id`,
  so they work from any page.
- `lib/products.ts` (catalogue), `lib/characters.ts`, types in `types/content.ts`.
- `context/CartContext.ts` + `CartProvider.tsx`, hook `hooks/useCart.ts`. Only
  `id` + `quantity` go to `localStorage` (`sweetopia.cart`); name/price/image are
  looked up from `PRODUCTS` on the way back in.
- `PageShell` — frame shared by the inner pages (field, title block, measure).
- `hooks/useParallax.ts` + `styles/motion.scss` — ambient motion, see below.
- `styles/` — `tokens.scss` (palette, fluid type, spacing), `mixins.scss`
  (`sm/md/lg/xl` = 480/768/1024/1280 **min-width**, `gradient-text`, `motion-safe`,
  and the `sway/bob/approach/breathe` motion mixins), `motion.scss`,
  `global.scss`, `fonts.scss`.
- Icons: one sprite at `public/sprite.svg`, used via `<SvgIcon id="icon-…">`.
- Art: **WebP** in `public/images` (~5 MB total). See "Assets" below.

### Ambient motion

Scenery drifts via `translate`, not `transform` — most of it is already placed
with `transform`, and an animation on that would overwrite the placement.
`--drift/--rise/--breath/--tilt` are registered with `@property` so they
interpolate. The animation name goes through `--kf` on purpose: CSS Modules
rewrites any `animation-name` it sees, so a plain name compiled to a hashed one
that matched nothing. `useParallax(distance, axis)` writes `--parallax(-y)` from
the *section's* box (never the element's — it is transformed, and feeding that
back jitters), one scroll listener for the whole page. Keep `distance` inside the
overhang of the cloud bank it moves, or an edge shows.

Copy is English throughout, brand `Sweetopia`. Display font Podarok (fallback
Oswald), body Oswald.

### Character cards (Characters section)

`CharacterCard` takes `shape` + `layout`; the data in `lib/characters.ts` stays
free of presentation, and which card gets which shape/slot lives in a `CARDS`
map in `Characters.tsx`. Shapes are `arch` (break on the right shoulder),
`arch-mirror` (same path under `x' = 320 - x`, break on the left), `pill`
(break on the right, plus an offset second outline) and `wide` (break low right,
and its star is the one drawn as an outline). Each shape's break is cut into the
geometry and carries a `gapStar` positioned on that break.

Two things that are load-bearing here:

- The card is a **query container** and the copy sizes in `cqw`. Viewport-based
  type stayed nearly the same whether the card was a fifth of the collage or a
  full stacked column, which pushed text straight through the outline on the
  narrow ones.
- `.art` is `flex: 1 1 0` + `object-fit: contain`, not width-driven. Sizing by
  width alone spills the portrait assets (the queen is 1024x1536) past the
  outline top and bottom.

### Shared section pieces

Every section is a bespoke layout now; the generic `StorySection` is gone (it
was unused once Garden and House were rebuilt — it is in git history if wanted).
`MediaFrame` survives only as the placeholder for a product with no photo yet.
`SectionTitle` takes `kicker / variant(outline|filled) / tone / kickerTone /
align / as / className`. Kicker default is the pink→blue gradient; Garden
overrides to `white` because its title sits on artwork. `ArchPanel` is the shared
arch outline (Citizens, and the arch character cards).

### Cart drawer

A real modal: takes focus when it opens, Tab/Shift+Tab wrap inside it, Escape
closes, focus returns to whatever opened it, and after Checkout focus lands on
the panel (the Checkout button unmounts under it). The "back to idle" timer after
`close()` is held in a ref and cancelled by `open`/`add` — reopening inside its
350 ms used to flip the confirmation to "empty".

### Assets

Everything in `public/images` is `.webp`, converted from the supplied PNGs at
quality 90, `alphaQuality` 100, effort 6, `smartSubsample` — alpha came out
**bit-identical** (max Δ 0), RGB mean Δ ≈ 2/255, 38.8 MB → 4.9 MB. Dimensions are
unchanged. When new art arrives as PNG, convert it the same way and point the
reference at `.webp`; do not drop the PNG in next to a `.webp` reference (the old
PNGs are in git history, so a silent replacement will not show up in the page).
Check the alpha first (see the checkerboard trap below). Sections below the fold
use `loading="lazy" decoding="async"`; Hero's art and the product-detail art stay
eager because they are what the page opens on.

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

**Specificity in the collage.** Card slots are written `.stage > .id`, not
`.id` — the shared `.stage > article` rule is a class *plus* an element, so a
bare class loses to it and every card keeps the shared width. Cost an hour when
each card sized itself to its own artwork.

**SVG arcs silently rescale.** If an arc's endpoint is unreachable with the
radii given, the spec says to scale the radii up rather than error — the curve
then takes a different route and tears a gap somewhere you did not ask for. Hit
this when a capsule's walls sat at `x=1..99` but its caps were `rx=48` about
`x=50`, which spans only `2..98`. Make the wall and cap geometry agree.

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

**`--virtual-time-budget` does not advance the animation clock.** Anything with
a CSS `transition` on the property you are looking at renders — and reports
through `getComputedStyle` — the value it held *before* the class changed, and
stays there however long you wait. Spent a while chasing a tab control whose
classes were provably correct while both the paint and the computed style
showed the previous state. Inject `* { transition: none !important }` into the
frame before reading or capturing anything that has just changed.

## Git

Everything is merged into `main` (`93825fe`: candy bar, cart logic, routes and
pages). The old per-section branches (`feat/kingdom-section` … `feat/router-pages`)
still exist locally and can be deleted. Branch off `main` for new work.
Conventional commits, body explains *why*. Remote `origin` = maskaa22/sweetopia.

## Working style the user expects

Ukrainian replies. They iterate visually — expect several rounds of "трохи вище /
менше / ближче" per section, and screenshot after each change rather than
guessing. They send annotated screenshots (red boxes/lines) marking what to move.
They supply artwork mid-task, sometimes replacing a file silently — re-check
asset mtime/size when something looks different. Ask before large asset surgery.

## Settled — do not reopen

- `hero-2` (now `.webp`) is the alpha I recovered, not a fresh export, and that is fine:
  no checkerboard survives and the clear zone measures dead flat at alpha 0.
- The Adventure window's close control and its accept/decline buttons are
  decorative `span`s on purpose, so nothing announces itself as operable or
  takes focus. The copy inside is real text.
- Adventure's hearts stay flat sprite hearts rather than 3D art.

## Where this was left

On `main`, clean tree, `tsc` and `vite build` both pass. All ten landing
sections, the cart and the inner pages exist and render; a full-page screenshot
at 1440 shows every section populated.

**Characters was last reviewed card by card, mobile-first — and the notes below
are from that review, not re-checked since.** At 1440 the queen sits inside her
arch in a full-page screenshot, so item 4 may already be fixed; confirm at phone
width before treating either as open.

Reviewed and signed off, mobile-first, card by card:

1. **Sugar Tree** — arch narrowed and pinned to `3/4`, break and star mirrored
   to the left, artwork centred with `margin-block: auto`. Done.
2. **Dark Chocolate** — capsule tipped `-8°` (card and content together, the
   user corrected an early attempt that tilted only the outline), the sweet
   itself counter-turned to `26°`, ratio `4/5`, break and star on the right
   shoulder, second outline offset `-6% / 4%`. Done.
3. **Sugar Thief** — break low on the right; its star is the outlined one.
   `SvgIcon` sets `fill: currentColor` on itself, so both `fill` and `stroke`
   have to be reset to get an outline. Done.
4. **Sugar Queen** — in progress. Switched to `arch` so the break sits right,
   given her own `5/8` ratio because her art is portrait. Last screenshot still
   showed her overflowing the arch at the bottom — **start here**.
5. **Mr. Marshmallow** — untouched. He is a `pill`, so he currently inherits the
   break, star and doubled outline meant for Dark Chocolate. The board shows his
   card plainer; ask before splitting the shape.

Also unreviewed: the whole collage from `lg` up (slot positions are first-pass
guesses), and the section's own title/lollipop/orbit placement.

## Open threads

- Sparkle colour `#4a3f8c` (Citizens, Characters) is the only colour outside the
  tokens.
- Seams: recent commits dissolved Hero↔Kingdom, the cloud banks, Shop and the
  Adventure foot. Check any boundary by eye before assuming it is still a hard cut.
- `Auth` has nowhere to send the form (a note says so); the comment points at
  Supabase as the intended backend.
- `About` copy is placeholder, written to be replaced. The footer year comes from
  `new Date().getFullYear()` (it was a hard-coded 2027 until the user corrected it).
- `font-weight: 400 700` on Podarok is one `.ttf`, so bold is synthesised.
- Product images are 1024–1536 px and shown in small cards; if weight matters
  again, a `srcset` with a ~600 px size is the next step.

## Deploy

Live at https://sweetopia-flame.vercel.app/ (Vercel). `BrowserRouter` needs every
path to fall back to `index.html`, so `vercel.json` carries a single rewrite —
without it `/products`, `/about`, `/login` and `/products/:id` all returned 404
on reload (found by curl, not by looking). Vercel serves real files before
rewrites, so `/images/*` and `/fonts/*` are unaffected. Static files come back
`max-age=0, must-revalidate`; fine while art is still being swapped.

## Backend decision

**Supabase is enough — no custom server.** Postgres + Auth + Storage + Row Level
Security covers catalogue, accounts, orders and product photos. Anything that
must not trust the browser (order total, stock check, payment webhook) goes in a
Postgres function or a Supabase Edge Function, not in React. Planned shape:

- `products` (id, name, description, image, price, tag, stock) — replaces
  `lib/products.ts`; photos in Storage; public read, no client write.
- `profiles` (id → auth.users, name).
- `orders` + `order_items` — the server prices the order from `products`; the
  client only sends ids and quantities. RLS: a user reads only their own.
- Cart: guest in `localStorage` as now; after sign-in merge into a server cart.
- Payment is a separate decision (Stripe Checkout + an Edge Function webhook, or
  pay-on-delivery with the order as a request). Nothing is blocked on it.
- Free tier pauses an idle project — fine for a demo, not for a shop.

## Roadmap (agreed with the user, not started)

Foundations first, because nothing is tested or checked on PRs yet:

1. CI (GitHub Actions: `npx tsc -b --noEmit` + `npm run build` on every PR).
2. ESLint + Prettier + `.editorconfig` + `.gitattributes` (git warns about
   LF→CRLF on every touched `.tsx` on this machine).
3. Tests: Vitest for `CartProvider` (merge, decrement-to-zero, stale stored ids,
   the 350 ms settle timer); Playwright for the drawer's focus behaviour and
   navigation. A throwaway script for the drawer exists in the old scratchpad —
   rewrite it, do not look for it.
4. SEO per route: `<title>`/description, OG image, sitemap.
5. A11y finish: focus and heading on route change, skip link, body scroll lock
   under the drawer.
6. Backend in three steps — catalogue, then auth (`Auth.tsx` already validates;
   the submit handler is the one place to wire), then orders.
7. Perf if it matters: `React.lazy` on pages, ~600 px `srcset` for product cards,
   preload Hero's art.

Product ideas the user liked (build after the foundations):

- **Wishlist / favourites** — sits naturally on the account.
- **Search and filters** by `hit`/`new` and price, once there are more than six.
- **"Build a gift box"** — pick 3–4 sweets into one box; very on-brand.
- **Characters as guides** — "Sugar Queen recommends…" linking to products.
- **A real About page** in place of the placeholder copy.

Housekeeping: old local branches (`feat/*`, `chore/webp-cart-a11y-cleanup`) can go.
