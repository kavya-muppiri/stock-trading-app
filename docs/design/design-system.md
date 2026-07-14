# Stock Trading App – Paper Trading Platform
## Design Specification v1.0

---

## 1. Design Rationale (Image Analysis Summary)

| Reference | Key Pattern Borrowed |
|---|---|
| Portify (dark stock dashboard) | Sidebar layout, sparkline stock cards, portfolio summary card — **primary structural reference** |
| Dark Green Fintech Mobile App | Hero portfolio value card with glowing line chart, allocation donut |
| Novera (pastel bento dashboard) | Bento-grid layout logic (not palette) |
| Floating Pill Navbar | Mobile bottom navigation pattern |
| Finexy / Transacta | Status-pill transaction tables, colored stat cards |
| Investment Analytics (laptop mockup) | Donut chart + adjacent breakdown table for allocation |
| Trade Panel (Buy/Sell toggle) | Segmented BUY/SELL control, time-range pill selector |
| Minimal B&W Auth Screens | Clean, restrained login/register layout |
| Finance Icon Set | Confirms thin-stroke line icon style |
| Pricing Cards (neon glow) | Hover glow / "Popular" ribbon — reused sparingly for leaderboard rank #1 |

**Discarded:** AI/orange branding, neumorphic cream cards, fanned physical card visuals, payment pricing-tier cards (content, not pattern).

---

## 2. Theme & Vibe

- **Theme:** Dark-first fintech trading terminal, with light-mode toggle
- **Design Style:** Modern SaaS-fintech minimalism — flat cards, hairline borders, generous whitespace, data-dense but uncluttered
- **Overall Vibe:** "Bloomberg Terminal meets Robinhood" — credible, confident, numeric, low-noise

---

## 3. Color Palette

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| Background (base) | `#0B0E11` | `#F7F8FA` | Page background |
| Surface (cards) | `#14181D` | `#FFFFFF` | Cards, panels |
| Border | `#232830` | `#E5E7EB` | Hairline dividers |
| Text Primary | `#F5F5F5` | `#111827` | Headings, values |
| Text Muted | `#9CA3AF` | `#6B7280` | Labels, secondary text |
| Accent / Growth | `#22C55E` → `#A3E635` | same | Buy, profit, positive trend |
| Danger | `#EF4444` | same | Sell, loss, delete |
| Secondary Accent | `#3B82F6` | same | Neutral CTAs, links, secondary chart series |

**Rule:** Green = positive/buy only. Red = negative/sell only. Never used decoratively elsewhere.

---

## 4. Typography

- **Font family:** Inter (body) + Space Grotesk or Inter (headings)
- **Numerals:** Tabular figures everywhere money/quantities appear, so columns align
- **Scale:** 32 / 24 / 18 / 14 / 12 px
- **Weight:** 600–700 for monetary values, 400 for labels

---

## 5. Iconography

- **Library:** Lucide React
- **Style:** Thin-stroke, monochrome, single accent-color fill only on active/selected states

---

## 6. Shape & Elevation

- **Card radius:** 16px
- **Button/input radius:** 10px
- **Pills/badges/nav:** 999px (full round)
- **Icon containers:** 12px
- **Elevation (dark):** 1px hairline border, no drop shadow; border-glow on hover
- **Elevation (light):** soft shadow `0 1px 3px rgba(0,0,0,0.06)`, no heavy border

---

## 7. Layout Components

### Sidebar
Fixed left, 240px (collapsible to 64px icon-only on tablet). Logo top → nav items (icon + label, active = solid rounded highlight pill) → user mini-profile pinned at bottom (avatar + balance).

### Navbar
Thin top bar (64px): page title/breadcrumb (left), global search (center-left), notification bell + theme toggle + avatar (right).

### Dashboard Layout (bento-grid)
1. **Row 1:** 4 stat cards — Virtual Balance, Total Portfolio Value, Today's P&L, Total P&L (icon + value + trend badge)
2. **Row 2:** Portfolio Value Over Time chart (2/3 width) + Asset Allocation donut (1/3 width)
3. **Row 3:** "Trending Stocks" horizontal card row
4. **Row 4:** Recent Transactions (compact, 5 rows + "View All")

### Stock Cards
Ticker + company name → large tabular price → colored % change pill → mini 7-day sparkline. Grid of 4 (desktop) / list (mobile).

### Portfolio Page
Left: Holdings table (ticker, qty, avg buy, current price, P&L $/%, sell action). Right: Allocation donut + breakdown table + invested/current value summary.

### Transaction Table
Searchable + filterable (date range, buy/sell, ticker). Columns: Date, Ticker, Type (colored pill), Qty, Price, Total, Status. Export CSV button top-right.

### Watchlist
Same card grid as Stock Cards + filled star toggle (top-right) + "Remove" affordance on hover.

### Leaderboard
Ranked list: rank badge (gold/silver/bronze for top 3, glow on #1), avatar + name, Portfolio Value, P&L %, highlighted row for logged-in user.

### Profile Page
Single column, card-sectioned: Header (avatar/name/email) → Account Settings → Danger Zone (Reset Balance, confirm modal) → Preferences (theme toggle).

---

## 8. Component Styles

### Buttons
| Type | Style | Usage |
|---|---|---|
| Primary | Solid green, white text, 10px radius | Buy, Confirm |
| Secondary | Outline/ghost, border color | Cancel, Filter |
| Danger | Solid red | Sell, Delete |

Height: 40px default, 32px inline/table actions.

### Forms
Top-label or floating-label inputs, bordered, 10px radius, accent-glow focus state. Buy/Sell forms use segmented BUY/SELL toggle + large numeric quantity input.

### Charts (Recharts)
- Line: gradient-fill area under line (green → transparent)
- Time-range pill selector above charts (1D/1W/1M/1Y/All)
- Donut: legend list beside chart, not below
- Bar: flat colored bars, no 3D/gradient noise

### Empty States
Centered muted line icon + short headline + one-line description + primary CTA (e.g., empty Watchlist → star icon → "No stocks watchlisted yet" → "Browse Stocks").

### Loading Skeletons
Shimmer-pulse blocks matching actual component shape (card/table-row/chart-area skeletons). Spinners reserved for button-level actions only.

### Toast Notifications
Stacked, top-right or bottom-right. Dark surface card, colored left-border accent (green/red/blue), icon + message + optional action, auto-dismiss 3–4s.

---

## 9. Mobile Responsiveness

- Sidebar → floating pill bottom nav below 768px (Dashboard / Stocks / Portfolio / Watchlist / Profile)
- Stat card row → horizontal scroll-snap carousel
- Tables → stacked cards below 640px
- Charts stay full-width, simplified gridlines on small screens

---

## 10. Recruiter-Appeal Notes

1. Strict, disciplined color semantics (green/red mean exactly one thing) signals product maturity, not decoration.
2. Tabular numerals + consistent card rhythm — small technical detail experienced reviewers notice.
3. Dark-mode-first matches real trading platform conventions (Zerodha, Groww, Robinhood).
4. Bento-grid dashboard + sparkline stock cards is the highest-leverage visual choice — turns a CRUD tracker into a "product."
5. Empty states, skeletons, and toasts are cheap to build but disproportionately raise perceived polish during a live demo.

---

**Status:** Approved design specification. No code, CSS, or HTML generated yet.
