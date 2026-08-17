# Feature cards as a sideways carousel

Turn the "What the scanner does" section on the homepage from a vertical grid into a horizontal sliding carousel on every screen size.

## Behaviour

- Cards sit in one horizontal track that slides sideways.
- Auto-scrolls continuously; pauses while the user is dragging/swiping or hovering, then resumes.
- Manual swipe and trackpad scrolling still work at any time.
- Pagination dots underneath show the active card and jump to it when tapped. No arrows.
- Heading and existing entry animation stay as they are.

## Technical notes

- New component `src/components/site/FeatureCarousel.tsx`: scroll-snap track (`overflow-x-auto`, `snap-x snap-mandatory`, hidden scrollbar) with one snap item per card.
- Auto-advance via an interval calling `scrollTo` on the track; cleared on `pointerdown`, hover, and unmount, restarted after idle.
- Active dot derived from a scroll listener comparing `scrollLeft` to item offsets.
- Card widths: ~80% viewport on mobile, ~45% on tablet, ~32% on desktop, so the next card peeks.
- `src/routes/index.tsx` swaps the features grid for `<FeatureCarousel>`; monochrome tokens and existing card styling reused unchanged.
