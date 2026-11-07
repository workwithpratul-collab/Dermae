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

The scroll film (Scenes 1–5), then **Treatments**, **Approach and technology**, **Doctor**, **Patient guide** (Day 12), **FAQ** (Day 11), **Contact** (Day 12), and finally **Booking** (Scene 6, the forest-green finale) and the footer. The sections after the film scroll normally; only the film is pinned. The header is kept short: Treatments, Doctor, FAQ, Contact and Book.

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

## Doctor section (added Day 10)

- **Image:** Scene 4's style: the same soft-lit clinic photo of the fictional doctor (the portrait version, so on desktop it differs from the film's shot), in a tall frame with a soft window light. A slow zoom eases the photo from slightly close to its natural framing as it scrolls through (transform only; none with reduced motion). A visible caption labels it as illustrative.
- **Layout:** phones: eyebrow and heading, then the photo, then the profile. Desktop: the photo on the left (staying in view while the profile scrolls past, on screens at least 760px tall), heading and profile on the right.
- **Profile:** the name line with *(fictional demo profile)* and a short italic disclaimer; Qualifications (each marked *(fictional demo credential)*) and Areas of focus as two hairline lists; How she works; and the note from Dr. Sen in the film's quote style with *(Illustrative note, fictional)*.
- **Motion:** heading rises line by line; the photo and each part fade up softly.

## Patient guide section (added Day 12)

- **Look:** the same open, editorial style as the Approach section, on the deeper ivory: heading block, then three blocks (Before your first visit, During your visit, After your visit), each opening with a hairline, the subheading on the left (desktop) and small uppercase labels over short lists or paragraphs on the right.
- **Urgent care:** "When to seek urgent care" has a thin forest rule down its left side so it stands out calmly. The medical note closes the section.
- **Motion:** heading rises line by line; subheadings and items fade up softly; short fades only with reduced motion.

## Contact section (added Day 12)

- **Look:** deeper ivory, between the FAQ and Booking. Heading block with the italic demo label; then the address, phone, email and demo opening hours under small uppercase labels and hairlines; then four action links (Call, WhatsApp, Email, Directions), each a serif line marked *(demo)* with a thin arrow that moves on hover. Desktop: details on the left, map on the right; phones: stacked.
- **Map:** a quiet placeholder (a faint grid, a forest dot, "Demo location", and a "Show map" button) until the visitor clicks. Only then does the OpenStreetMap map load, with a small "Demo location" badge on top. Nothing loads from OpenStreetMap before that click.

## FAQ section (added Day 11)

- **Look:** ivory, like the Approach section: one block per category, each opening with a hairline, the category name on the left (desktop) or above (phones), and its questions on the right, divided by thin lines.
- **Accordion:** each question is a serif line with a thin plus on the right that turns into a minus when open. The answer rises in softly (opacity and a small upward move only); with reduced motion it simply appears. Several answers can be open at once.
- **Links:** treatment names in an answer ("See: …") open that treatment's detail view right where you are.

## FAQ assistant (added Day 11)

- **Launcher:** a small ivory pill, "Questions?", in the bottom-right corner; on phones and tablets it sits just above the "Book a consultation" bar.
- **Panel:** a calm ivory card (a full-width sheet on phones) over a light dimming: title, the label "Automated FAQ assistant, not a doctor", the privacy line, the conversation, and a question box with an underline and a forest "Send" button.
- **Conversation:** replies sit on a soft deeper-ivory card; the visitor's messages on forest green, right-aligned. Suggested questions are small outlined pills.
- **Motion:** the panel fades and rises gently into place; nothing moves with reduced motion.

## Header over the sections (Day 9)

Over the film the header stays transparent with a soft fade. Over the sections after the film it gets a solid backdrop in that section's own colour, fading out below, so text scrolling underneath never shows through.

## Scene 6: Booking

- **Image:** Deep forest green background with a subtle soft-light texture.
- **Movement:** Very slight drift, then stillness so the form is easy to use.
- **Text (redesigned Day 5; contact details moved to the Contact section on Day 12):** The heading and intro rise in line by line with the scroll. On desktop, the heading and intro sit on the left and the form on the right; on mobile they stack (heading, intro, form). The form fades in once, never tied to the scroll, so it is never half-faded while in use.
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
