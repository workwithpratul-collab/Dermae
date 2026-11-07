# STORYBOARD.md — DERMAÉ

How each scene looks and moves. The copy lives in `CONTENT.md`, and the technical rules live in `CLAUDE.md`.

## Overall feel

One slow, continuous camera move with soft light and no sudden jumps.

## Around the film (added Days 1–4)

- **Header:** fixed and transparent over the film. A soft ivory fade sits behind it over the photos; it switches to ivory text over forest green. Links glide to each scene at the moment its text is fully shown.
- **Progress line:** a 2px sage line down the right edge fills as you scroll the whole page.
- **Film grain:** a barely visible noise layer over the page that shifts a few times a second (transform only) and ignores clicks.

## Text reveals (all scenes, added Day 3)

- Text is split into lines. Each line rises into view from behind an invisible edge (its mask), one after another, in reading order.
- When a scene ends, its lines rise out through the top edge, and any small details (dividers, numbers) fade.
- Reveals are tied to the scroll, so they reverse exactly when scrolling back up.

---

## Opening moment: loading screen (added Day 2)

- **Look:** plain ivory, with "DERMAÉ" placed exactly where Scene 1's heading sits.
- **Movement:** once the heading font is ready, the letters rise one by one from behind an invisible edge.
- **Exit:** when the letters are done and the scene images have loaded (or failed), the ivory fades away. The name stays still and the photo appears around it. It never waits more than about 5 seconds.
- **Then:** "Scroll to begin" fades in near the bottom, with a thin line and a slow drop of light running down it. It fades out on the first scroll.

## Scene 1: Opening

- **Image:** Extreme close-up of a serum drop on healthy, natural-looking skin.
- **Movement:** Starts very close, then slowly pulls back.
- **Text:** The name comes from the loading screen; the tagline then rises in line by line.
- **Transition (one camera move, Day 4):** The camera pushes in toward the drop as it softens into a blur. The room fades in through it, still out of focus, and sharpens while the push carries on. Everything keeps moving forward, so nothing bounces back.

## Scene 2: Treatment room

- **Image:** Wide view of a calm ivory and sage treatment room with soft window light.
- **Movement:** Slow push forward, with foreground and background moving at different speeds.
- **Text:** Rises in line by line on the left, then rises out before the next scene.
- **Transition:** The camera drifts right into a detail of the room.

## Scene 3: Treatments

- **Image:** Close view of a clean treatment area with soft shadows and a sage wall.
- **Movement:** Slow sideways glide.
- **Text:** The heading appears first. Then the medical and aesthetic lists rise line by line, side by side, while the divider draws down between them, followed by a short rule, the closing note and the medical note (Day 6).
- **Transition:** The image softly crossfades into the doctor scene.

## Scene 4: Doctor

- **Image:** Fictional dermatologist examining a patient's cheek in the same clinic style.
- **Movement:** Slow zoom toward the doctor.
- **Text:** Appears on the left, in the image's empty space.
- **Transition:** The camera moves into the window light, and the screen brightens.

## Scene 5: Your care journey

- **Image:** Calm consultation corner with two chairs, a plant, and soft window light.
- **Movement:** Slow pull back.
- **Text:** Consult, Plan, and Care appear one at a time (each number fades in with its lines), followed by the illustrative quote, whose side rule grows down.
- **Transition (changed Day 8):** The image fades into soft ivory light. The film then releases, and the Treatments section (also ivory) scrolls up into view, so the film flows straight into the page.

---

## Page order (Day 8 onward)

The scroll film (Scenes 1–5), then **Treatments**, **Approach and technology**, **Doctor**, and finally **Booking** (Scene 6, the forest-green finale) and the footer. The sections after the film scroll normally; only the film is pinned.

## Treatments section (added Day 8)

- **Look:** ivory, editorial like Scene 3: an eyebrow, a large light serif heading, a short intro, then filter pills (All, Medical, Aesthetic) and an underline search box above a hairline. Cards sit in an open grid (one column on phones, two on tablets, three on desktop) separated by thin lines, with no boxes.
- **Card:** a small tag (Medical or Aesthetic), the treatment name in serif, the one-line summary, and "Read more" with a short line that draws out on hover. The whole card is clickable.
- **Motion:** the heading rises in line by line with the scroll; the intro, tools and cards fade up softly, one card after another. Filtering is instant (no page reload).
- **Detail view:** an ivory panel slides in gently from the right over a soft green-tinted dimming (full screen on phones). A sticky top bar holds the tag and a Close button; below come the name, the summary in italic serif, each part of the entry under a small uppercase label with a hairline, the medical note, and "Book a consultation".
- **Links:** each treatment has its own address (e.g. `#treatment-acne`); opening it goes to the card and opens its detail view.

## Approach and technology section (added Day 9)

- **Look:** a slightly deeper ivory than Treatments, editorial like Scene 3. The heading block carries the fictional-clinic label in small italics. Then three blocks, each opening with a hairline: the subheading on the left (desktop) or above (phones), the content on the right.
- **Your care, step by step:** four numbered steps (01–04) in two columns on tablets and desktop, each under its own thin line.
- **Diagnostics and equipment:** each term in small uppercase over its plain-language description, divided by hairlines; the laser and peel types as short lists; the medical note at the end.
- **Safety and hygiene:** seven short items in an open two-column grid, each under a thin line.
- **Motion:** the heading rises line by line with the scroll; subheadings, steps, terms and items fade up softly, one after another.

## Header over the sections (Day 9)

Over the film the header stays transparent with a soft fade. Over the sections after the film it gets a solid backdrop in that section's own colour, fading out below, so text scrolling underneath never shows through.

## Scene 6: Booking

- **Image:** Deep forest green background with a subtle soft-light texture.
- **Movement:** Very slight drift, then stillness so the form is easy to use.
- **Text (redesigned Day 5):** The heading and intro rise in line by line with the scroll. On desktop, the heading, intro and contact details sit on the left and the form on the right; on mobile they stack (heading, intro, form, contact details). The form and contact details fade in once, never tied to the scroll, so the form is never half-faded while in use.
- **Form:** Ivory underline fields on forest green. On focus, the line turns solid and thicker with a faint highlight; errors show a soft peach line and message.

## Footer (added Day 5)

- Deep forest green. Wordmark and the four links on top, a hairline, then the footer note and "© 2026 DERMAÉ, design demo". No animation.

---

## Timing (retimed Day 4)

- The film is about 9 screen-heights of scrolling (1.8 per scene) and is measured in "beats" (one beat is about 0.7 of a screen).
- Each scene's text stays fully on screen for about 0.8–1.1 beats (roughly 480–780px of scrolling), so there is time to read.
- A scene's text has fully left before the next picture starts to fade in, so text from two scenes is never on screen together.
- All the beat numbers live in one table (`T`) at the top of `js/scenes.js`.

## Mobile

Keep the same six scenes and order. Stack the text, use tighter image crops, and reduce movement.

- Under 1024px wide, the header links move into a full-screen ivory menu (Menu button), and a slim "Book consultation" bar sits at the bottom. Both "Book consultation" buttons hide while the booking section is on screen.
- The footer links form a two-by-two grid on phones.
- If a scene's text can't fit the screen (for example, a very short phone held sideways), the film switches to a normal scrolling page where lines still rise in with the scroll.

## Reduced motion

Turn off zooms and smooth scrolling, and use gentle fades only.

- Loading screen: no letter animation, just one short fade.
- No line splitting: text simply fades in.
- Header links jump instead of gliding. The grain stays still. The progress line just follows the scroll bar.
- Sections after the film: short fades only, with no movement. The treatment detail view opens and closes without sliding.

## Image rule

Reserve space for text, and use the same colors and lighting in every image.
