# CLAUDE.md — DERMAÉ

Guidance for Claude when working in this repository. Read this first, every session.

## Project overview

**DERMAÉ** is a **fictional** premium dermatology clinic. This website is a **demo used to pitch web design to real clinics**: it shows what a calm, luxury, scroll-driven site could feel like. It is not a real business and must never look like one that is pretending to be real.

## The experience

One long, immersive scrolling page that feels like **one continuous, slow camera move** through a calm, luxurious space.

### Six scenes (in order)

The exact on-page wording lives in **`CONTENT.md`** (the source of truth for copy; use it word for word). How each scene looks and moves lives in **`STORYBOARD.md`**.

1. **Opening**: serum drop on skin, then the DERMAÉ name and tagline. This is the "establishing shot".
2. **Treatment room**: the camera "drifts" into a serene clinic room.
3. **Treatments**: medical and aesthetic dermatology, described gently and factually.
4. **Doctor**: Dr. Mira Sen, Lead Dermatologist, labelled as a *fictional demo profile*.
5. **Your care journey**: Consult, Plan, Care, plus one quote labelled *(Illustrative quote)*.
6. **Booking**: booking form (Formspree), fictional contact details and the footer note.

### How the motion is achieved

- Fake depth with **layered images** (foreground, midground and background moving at different speeds), **slow zooms** (scale), **crossfades** between scenes, and **text that reveals scene by scene**.
- **No true 3D** (no Three.js or WebGL) and **no real video**.
- Motion should be slow, smooth and calm. Ease out softly and never bounce, snap or spin.
- Animate only `transform` and `opacity`. These are cheap for the browser to animate, so they stay smooth. Avoid animating `width`, `height`, `top`, `left` or filters on large images.

## Tech stack

| Use | Tool |
| --- | --- |
| Markup, styles, logic | Plain **HTML**, **CSS**, **JavaScript** (ES modules OK) |
| Scroll animation | **GSAP** + **ScrollTrigger** |
| Line-by-line text reveals | **GSAP SplitText** (free since GSAP 3.13) |
| Smooth scrolling | **Lenis** (synced to ScrollTrigger) |
| Booking form | **Formspree** (plain HTML form POST, enhanced with `fetch`) |

**Do not use:** React, TypeScript, Next.js, any framework or build step, or a database.

- Load GSAP, ScrollTrigger, SplitText and Lenis from a CDN with **exact pinned versions** (for example `gsap@3.13.0`, never just `gsap`).
- Currently pinned: GSAP, ScrollTrigger and SplitText **3.13.0** (cdnjs), Lenis **1.1.13** (jsDelivr). Fonts come from Google Fonts.
- Keep the site runnable by opening it through a simple local server. No `npm install` is required to view it.
- Lenis + ScrollTrigger wiring: call `ScrollTrigger.update` on Lenis scroll and drive Lenis from `gsap.ticker`.

### File structure

```
/
├── index.html
├── 404.html          # "page not found" page (GitHub Pages shows it for any missing address)
├── css/
│   └── styles.css        # design tokens (CSS variables) at the top
├── js/
│   ├── main.js           # setup: Lenis, GSAP registration, reduced-motion check, rebuilds on resize/fonts
│   ├── scenes.js         # the film timeline (beat table T), text splitting, booking, progress line
│   ├── nav.js            # fixed header, mobile menu, "Book consultation" bar
│   ├── intro.js          # loading screen + "Scroll to begin" hint
│   ├── treatments-data.js # all treatment content (the one place the site reads it from)
│   ├── treatments.js     # treatment cards, filters, search, detail view, #treatment-… links
│   ├── faq-data.js       # all FAQ questions and answers (the one place the site reads them from)
│   ├── faq.js            # FAQ accordion, grouped by category
│   ├── assistant.js      # FAQ assistant: answers only from faq-data.js, no API, nothing stored
│   ├── contact.js        # contact map that loads only when clicked
│   └── form.js           # booking form submit + messages
├── images/
│   ├── originals/        # full-size source images (not loaded by the site)
│   ├── web/              # optimised images, WebP + JPEG fallback (see "Images" in the decisions below)
│   └── share/            # share image (og-image.jpg, 1200x630), favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png
├── .nojekyll             # lets GitHub Pages serve files as-is
├── .gitignore        # keeps the private pitch/ folder out of git
├── README.md         # portfolio overview of the project
├── CASE-STUDY.md     # the design and technical thinking (no invented results)
├── CONTENT.md            # approved copy
├── STORYBOARD.md         # how each scene looks and moves
└── CLAUDE.md
```

(The earlier plan used `assets/images/` and `assets/fonts/`; the site uses `images/` and Google Fonts instead.)

Adjust this if the project grows, and update this file when it does.

## Design system

### Colours (define as CSS variables in `:root`)

| Token | Role | Starting value |
| --- | --- | --- |
| `--ivory` | Main background | `#F7F3EC` |
| `--sage` | Accents, dividers, soft fills | `#A3B09A` |
| `--forest` | Headings, buttons, dark sections | `#1F3A2E` |
| `--charcoal` | Body text | `#2B2B2B` |

### Contrast rules

- Body text must meet **WCAG AA**: at least **4.5:1** (3:1 for large headings).
- Charcoal or forest on ivory, and ivory on forest, are the safe pairings.
- **Sage is too light for text on ivory.** Use it only for decoration, borders and backgrounds.
- Text placed over images needs a scrim (a soft gradient overlay) so it stays readable at every point in the animation.
- Check new colour pairings with a contrast checker before committing.

### Typography

- **Headings:** an elegant serif (default: *Cormorant Garamond*).
- **Body:** a clean sans-serif (default: *Inter*).
- Load from Google Fonts with `display=swap`, and only the weights actually used.
- Body text should be at least 16px, with generous line-height (about 1.6) and comfortable line lengths (about 60–75 characters).

### Feel

Calm, airy and premium: lots of whitespace, restrained animation, soft shadows (if any) and no loud gradients.

## Requirements

### Responsive

- Mobile-first. Test at roughly **375px, 768px, 1280px and 1920px** wide.
- No horizontal scrolling at any width.
- Simplify layering and parallax on small screens if it feels busy or slow.

### Performance (fast-loading)

- Compress images (WebP/AVIF), size them for their use, and use `srcset`/`sizes`.
- `loading="lazy"` for images below the first screen. Preload the opening scene's key image.
- Load scripts with `defer`. Keep JavaScript small, with no unused libraries.
- Aim for good Lighthouse scores (Performance, Accessibility and Best Practices ≥ 90).

### Reduced motion (calmer version)

- Detect `prefers-reduced-motion: reduce` in both CSS and JS (`window.matchMedia`, or GSAP's `gsap.matchMedia()`).
- When it is set: **don't start Lenis**, don't scrub, pin or zoom, and don't use parallax. Show content in normal flow with simple, short fades at most.
- All content must be fully readable and usable with motion off and with JavaScript disabled.

### Accessibility

- Semantic HTML (`header`, `main`, `section`, `footer`, a logical heading order).
- Meaningful `alt` text, and `alt=""` for purely decorative layers.
- The form has proper `<label>`s, visible focus styles, keyboard access and clear error messages.
- Animated text must still be in the DOM and readable by screen readers.

## Content rules (important)

- **Every clinic detail is fictional and clearly so.** Use the details from `CONTENT.md`: address "Demo address", phone `+00 00000 00000`, email `hello@dermae.example`. Keep the footer note visible: *"DERMAÉ is a fictional concept website. Its clinic details, doctor, and quotes are illustrative and aren't medical advice."*
- **Follow the Brand voice section in `CONTENT.md`** (tone, words to use and avoid). Wherever medical information appears, show the note: *"General information only, not medical advice. A dermatologist will assess your individual needs."*
- **Patient quotes are illustrative.** Label each one visibly, as `CONTENT.md` does with *(Illustrative quote)*. Never present quotes as genuine reviews, and never add star ratings or review counts that imply real data.
- **No fake "results".** Don't show before/after photos presented as real outcomes. If imagery is AI-generated or stock, label it as illustrative.
- **No unsupported medical claims.** Avoid words like "cure", "guaranteed", "permanent", "clinically proven", or specific percentages and statistics. Prefer soft, honest wording such as "may help", "designed to" and "results vary". Suggest consulting a qualified dermatologist.
- The fictional doctor must not imitate a real person (name, photo or credentials).
- The booking form must not ask for sensitive medical history. Its fields are exactly:

  | Field | Required? | Notes |
  | --- | --- | --- |
  | Name | Required | |
  | Phone | Optional | |
  | Email | Required | |
  | Appointment type | Required | Medical dermatology / Aesthetic dermatology / Not sure yet |
  | Preferred date | Required | Today or later |
  | Preferred time | Optional | |

  There is no free-text message box. The button reads **Request Consultation**.

## Formspree

- The form `action` uses a placeholder endpoint like `https://formspree.io/f/YOUR_FORM_ID` until the user supplies a real ID. Never invent one.
- While the placeholder is in place, the form must **never pretend a request was sent**. It sends nothing, shows "Demo form: not connected yet, so requests won't be sent." under the button, and says so again after a valid submit.
- Progressive enhancement: the form works as a normal POST without JS. With JS, submit via `fetch` and show inline success and error messages.
- Add a honeypot field (`_gotcha`) for spam.

### Connecting the form

The form is **not connected yet** on purpose. The endpoint lives in **one place**: the `action` of the booking form in `index.html`, inside the comment marked **FORM ENDPOINT**. `js/form.js` reads it from there, so nothing else needs to change.

To connect it later:

1. Create a free account at formspree.io and make a new form. Formspree gives it an ID (the part after `/f/` in its address, e.g. `xyzabcde`).
2. In the Formspree form's settings, set the email address that should receive requests. If offered, add the site's domain to the allowed domains.
3. In `index.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with that ID. Change nothing else.
4. Reload the site. Because the address no longer contains `YOUR_FORM_ID`, `js/form.js` now hides the "Demo form: not connected yet…" note and sends requests for real, showing the "Thank you. Your request has been sent…" or "Sorry…" message.
5. Test it: send one request and check it arrives (Formspree may ask you to confirm the first one). Try a wrong email address, an empty required field and a past date too.
6. Commit with a clear message, e.g. "Connect the booking form to Formspree". The form ID is public and safe to commit.

Notes: the hidden `_subject` field sets the email subject, and `_gotcha` is the spam honeypot (leave both). Without JavaScript the form posts directly and Formspree shows its own thank-you page. Never invent a form ID; only use one the site owner has created.

## Working style (the user is learning)

- **Explain what you're doing and why in simple, plain language.** Avoid jargon, or explain it when you use it.
- **Work in small steps.** Build one piece at a time (for example: page skeleton, then styles, then one scene, then the next).
- **Test after each change:** run a local server (for example `python -m http.server 8000` or `npx serve`), check the browser console for errors, and check mobile widths and reduced motion (Chrome DevTools → Rendering → "Emulate prefers-reduced-motion").
- Tell the user honestly what was tested and what wasn't.
- **Commit after each working milestone** with a clear, descriptive message. Don't commit broken work.
- Don't build ahead of what was asked. Check in at natural milestones.

## SEO and sharing (Day 14)

- `index.html` has the title, meta description, a canonical link, Open Graph and Twitter tags, the icons and MedicalClinic structured data (JSON-LD) with the demo details. All share addresses are **absolute** and point at the live site, `https://workwithpratul-collab.github.io/Dermae/`. If the site moves, update them all (search for that address in `index.html` and `404.html`).
- The share image and icons live in `images/share/`. The share image must keep its "Fictional clinic · Design demo" label.
- `404.html` is self-contained (inline styles, absolute icon address) because GitHub Pages shows it at any depth. Its home link goes to `/Dermae/` live and `/` locally.
- **The demo stays out of search results:** `<meta name="robots" content="noindex, nofollow">` is in `index.html` and `404.html` on purpose. **For a real client site, remove the robots line from `index.html`** (and replace every demo detail in the structured data with the clinic's real, checked details), otherwise search engines will never list it.

## Pitch kit (Day 15)

- `pitch/` is **private**: it is listed in `.gitignore`, so it is never committed or published. It holds `pricing.html` (a printable A4 price sheet in the DERMAÉ style: open it in a browser and print or save as PDF) and `walkthrough-script.md` (a 60–90 second screen-recording script).
- Never move pricing or pitch notes into a tracked file. Before pushing, `git ls-files pitch` must print nothing.
- `README.md` and `CASE-STUDY.md` are public. Keep them honest: DERMAÉ is a fictional demo, so they describe the design and build and never invent clients, results or numbers.

## Git

- Small, focused commits with messages that describe the change (for example "Add page skeleton with six sections").
- Never commit secrets. A Formspree form ID is public and fine to commit, but nothing else sensitive should go in the repo.

## Decisions made so far (Days 1–5)

- **Film timing** lives in one beat table (`T`) in `js/scenes.js`; the film is 1.8 screen-heights per scene. Keep each scene's text fully readable for at least ~0.65 beats, and let it fully leave before the next picture fades in. Film moments have timeline labels named after the scene ids (`scene-treatments`, `scene-doctor`, `scene-journey`); a link whose `data-nav` is one of those glides to that moment, and any other `data-nav` glides to the element with that id. Move the labels if the timing changes.
- **Text reveals** use SplitText with masked lines. Split only after the web fonts have loaded, and split again whenever the screen width changes. Headings get their full text as an `aria-label`; other split text gets a visually hidden full copy, with the line pieces hidden from screen readers. With reduced motion, text is never split.
- **Blur transitions** use a pre-blurred copy of the image (`.scene__blur`) whose opacity fades. The blur itself is never animated.
- **The header** always has a soft ivory backdrop over the photos (some are too dark for the links on their own) and becomes ivory-on-forest over green. Re-check its contrast when images or timing change.
- **`[hidden]` always wins** (`display: none !important`). Elements that fade out must also ignore clicks (`pointer-events: none`), so nothing invisible can block the page.
- **The loading screen** has a CSS safety net that hides it after 4.5s even if JavaScript fails, so the site can never get stuck behind it.
- **After a resize or rotation**, the film is rebuilt and the visitor's place is restored from the last normal scroll.
- **The progress line** follows the scroll bar in every mode, including reduced motion (it shows position; it isn't decoration that moves on its own).
- **Longer copy and the film (Day 6):** new copy must still fit each scene above its subject. Phones (portrait, under 640px) have their own tighter rules for Scenes 3 and 5, and Scene 3's landscape column is wider so its heading stays on two lines. If text doesn't fit, the film silently falls back to the calm version, so check the mode after copy changes.
- **Page order (Day 8):** film → Treatments → Approach and technology → Doctor → Booking → footer. The film ends in soft ivory so it flows into the ivory sections; forest green is kept for the Booking finale. The new sections use the shared `.section` styles and `buildSections()` reveals in `js/scenes.js`.
- **Treatment content** lives on the site in one file, `js/treatments-data.js`, which `js/treatments.js` renders. It was generated word for word from the treatment library in `CONTENT.md`; keep the two identical. Bold uses `**…**`; the medical note is added automatically to every treatment.
- **Treatment detail view** is a native `<dialog>` opened with `showModal()`. Escape and Close close it, Tab is kept inside, focus returns to the card's link, and the panel scrolls on its own (`data-lenis-prevent`, Lenis stopped). Its address is set with `history.replaceState`, so opening and closing never jumps the page.
- **Shared links** (`#treatments`, `#treatment-acne`, `#scene-doctor`…) are handled in `js/nav.js`: the page lands on the target after loading, and `js/main.js` re-applies it after each rebuild until the visitor scrolls (`DermaeFilm.pendingTarget`).
- **Exception to "everything works without JavaScript":** the treatment guide needs JavaScript (its cards are built from the data file). Without it, the section shows a short note, and the treatment names stay readable in Scene 3.
- **Section backgrounds (Day 9):** sections alternate between `--ivory` and `--ivory-deep` (`#EFE9DF`). Each `.section` sets `--section-rgb` to its background colour; `js/nav.js` uses it to give the header a solid backdrop over that section (over the film the header stays see-through). A new section with a different background must set `--section-rgb` too.
- **Doctor photo (Day 10):** the section reuses `images/web/scene-4-portrait.jpg` (already optimised, loaded lazily), so desktop visitors see a different shot from the film. It must keep its visible "Illustrative image" caption. `[data-zoom]` images get the slow scroll zoom from `buildSections()`.
- **FAQ (Day 11)** lives in `js/faq-data.js`, generated word for word from the FAQ in `CONTENT.md` (keep them identical), plus a `keywords` list per question for the assistant. Answers that mention treatments link to them with `see` (treatment ids); any `#treatment-…` link on the page opens that treatment's detail view in place, and focus returns to the link afterwards. Like the treatment guide, the FAQ needs JavaScript (a short note shows without it).
- **FAQ accordion:** buttons with `aria-expanded`/`aria-controls`; answers open with a soft opacity and transform reveal (no height animation). After opening or closing, scroll animations re-measure.
- **FAQ assistant rules (Day 11):** it may only answer from `js/faq-data.js`: no API, no external service, nothing stored (no cookies or storage; the conversation is cleared on close). The safety check always runs first: any mention of symptoms, a diagnosis, medicines or anything urgent gets the safety reply, never an FAQ answer. Otherwise it scores questions by matching words (keywords count most, then question, then answer; rarer words weigh more) and only answers when the match is strong and covers most of the message, else it shows the fallback. It must keep the "Automated FAQ assistant, not a doctor" label, close with Escape, keep Tab inside, announce replies (`role="log"`), and sit above the mobile booking bar. When adding FAQ questions, add keywords and test typical phrasings.
- **Header (Day 11):** kept short: Treatments, Doctor, FAQ, Contact (Day 12) and Book. The Approach section is reached by scrolling.
- **Contact details (Day 12)** live in one place: the Contact section of `index.html` (address, phone, email, hours, the action links and the demo map location in `data-lat`/`data-lon`). They are kept in HTML, not a data file, so they stay readable without JavaScript. Don't repeat them elsewhere on the page (they were removed from the booking section). Every action link and the hours are labelled *(demo)*.
- **Map (Day 12):** nothing loads from OpenStreetMap until the visitor clicks "Show map" (`js/contact.js`); the loaded map keeps a "Demo location" badge. The location is open parkland (Hyde Park, London), so no real business is pinned.
- **Images (Day 13):** every scene image exists as WebP (served first) and JPEG (fallback for older browsers), in these sizes per scene N: `scene-N-desktop` (1672 wide), `scene-N-desktop-1280`, `scene-N-mobile` (900 wide, same landscape crop), `scene-N-portrait` (941 wide) and `scene-N-portrait-600`. Each `<picture>` has a portrait WebP + JPEG `<source>` (`sizes="max(100vw, 56.3vh)"`), a landscape WebP `<source>` and an `<img>` with JPEG `srcset` (`sizes="max(100vw, 177.8vh)"`, because the photos cover the screen), and every source and image has `width`/`height`. The pre-blurred copies use exactly the same `srcset`/`sizes` so the browser reuses the same file. WebP files were made with Chrome's own encoder (canvas, quality 0.8; JPEGs 0.82), so no extra tool was installed. New images should follow the same names and sizes.
- **Loading order (Day 13):** Scene 1's image is preloaded in the `<head>` at high priority (one hint per orientation). The other film images load in the background at low priority once the scripts run (`preloadImages()` in `js/main.js`), so the film never flickers. Images below the film (`loading="lazy"`) and the map (on click) load only when needed.
- **Fonts (Day 13):** only Cormorant Garamond 300, 500 and 500 italic, and Inter 400, 500, 600 (what actually renders; text set to 400 in Cormorant shows as 500, as it always has). `display=swap`, with a preconnect. The font stylesheet loads without blocking the first screen (`media="print"` switched to `all` on load, plus a `<noscript>` fallback); `js/intro.js` waits for it before revealing the name.
- **Animation lightness (Day 13):** `will-change` is applied only while the film is on screen (`html.film-live`, set by the film's ScrollTrigger); the light layers have none. The header checks what's behind it only on scroll, resize and ScrollTrigger refresh, not every frame. Off-screen parts don't animate: the film's timeline stops once you're past it, and reveals and the doctor zoom run only within their scroll ranges.
- **Measuring weight:** count requests and downloaded bytes with the browser cache disabled, on first load and after scrolling the whole page, at a desktop and a phone size. Day 13 numbers are in the Day 13 commit message.
- **Testing:** use real mouse clicks and key presses, not `element.click()`, so invisible overlays get caught. If Python and Node aren't installed, VS Code's Live Server extension works as the local server.
- **Touch scrolling (Day 14):** Lenis runs with `syncTouch: false`, so phones and tablets keep their own native scrolling (with its natural momentum); the film is still tied to the scroll position. Smooth scrolling only applies to mouse wheels.
- **Safe areas (Day 14):** the viewport tag has `viewport-fit=cover`, so the page draws under notches and rounded corners and moves its own content in with `env(safe-area-inset-*)`. Side padding uses `--pad-l` and `--pad-r` (the gutter or the inset, whichever is larger); the header adds the top inset to its padding and its minimum height; the book bar, launcher and scroll hint add the bottom inset. A rule that resets the header's padding must keep the top inset.
- **Tap targets (Day 14):** every link, button and field is at least 44x44px. Use **46px** for minimum heights, not 44px or 2.75rem, because sub-pixel rounding can measure 43.99px.
- **Short landscape (Day 14):** phones held sideways (`orientation: landscape` and under 500px tall, under 1024px wide) hide the bottom bar and show the header's Book button; the "Questions?" launcher hides while the film is live; Scene 3 uses a wider column and a 0.78 ivory haze (contrast 5.7:1). The launcher also hides while the booking section is on screen under 1024px, like the book bar.
- **Menu at 200% zoom (Day 14):** the full-screen menu uses `justify-content: safe center` and scrolls on its own (`data-lenis-prevent`), so its first link is never hidden under the header.

## Progress

- **Day 1:** Fixed header with film-aware links, mobile full-screen menu, and "Book consultation" button and bar.
- **Day 2:** Ivory loading screen with a letter-by-letter DERMAÉ reveal, and the "Scroll to begin" hint.
- **Day 3:** Line-by-line masked text reveals in every scene (GSAP upgraded to 3.13.0 for SplitText).
- **Day 4:** Scroll progress line, film grain, the Scene 1 → 2 camera move, and a full retiming of the film.
- **Day 5:** Redesigned booking scene (two columns on desktop, underline fields) and a full footer.
- **Days 6–10 copy (Phase 1):** brand voice, a rewrite of all site copy, the treatment library, approach and technology, and the expanded doctor profile were written in `CONTENT.md` and approved.
- **Day 6:** Approved copy applied across the site; Scene 3 gained the medical note; header and footer links became Treatments · Approach · Doctor · Book.
- **Day 8:** Treatments section after the film (cards built from `js/treatments-data.js`, filters, search, accessible detail view, shareable `#treatment-…` links); the film now ends in soft ivory; film scene ids renamed to `scene-…`. Approach and Doctor links still go to the film scenes until their sections are built.
- **Day 9:** Approach and technology section (four care steps, diagnostics and equipment, safety and hygiene, with the fictional-clinic label and the medical note); header and footer "Approach" go there; the header gets a solid backdrop over the sections.
- **Day 10:** Doctor section (fictional qualifications, areas of focus, how she works, illustrative note, labelled photo with Scene 4's slow zoom); header and footer "Doctor" go there. Phase 2 complete: page order is film → Treatments → Approach → Doctor → Booking → footer.
- **Days 11–12 copy (Phase 1):** FAQ (25 questions), patient guide, contact copy and FAQ assistant copy were written in `CONTENT.md` and approved.
- **Day 11:** FAQ section built from `js/faq-data.js` as an accessible accordion grouped by category, and a free FAQ assistant that answers only from that data (safety reply for medical messages, fallback otherwise, nothing stored). Header: Treatments, Doctor, FAQ, Book.
- **Day 12:** Patient guide (before, during and after your visit) in the Approach style; Contact section as the one place for the contact details, with demo hours, demo call/WhatsApp/email/directions links and a click-to-load demo map; contact details removed from the booking section. Header: Treatments, Doctor, FAQ, Contact, Book. Page order: film → Treatments → Approach → Doctor → Patient guide → FAQ → Contact → Booking → footer.
- **Day 13:** Speed and performance: WebP versions and right-sized images for every scene (`srcset`/`sizes`, width and height everywhere), Scene 1 preloaded at high priority and the rest in the background, fonts trimmed to what renders and loaded without blocking, `will-change` only while the film is on screen, header checks only on scroll, one unused CSS rule removed, and the form endpoint marked in one place with a "Connecting the form" guide. Page weight about 55–59% lower (see the Day 13 commit).
- **Day 14:** Mobile, tablet, accessibility and SEO: native touch scrolling, safe areas for notches (header, bar, launcher, side margins), no overlaps between the book bar, "Questions?" button and menu, a sideways-phone layout (Book in the header, Scene 3 widened and made more readable), every tap target at least 44x44, a menu that works at 200% zoom; keyboard, headings, landmarks, alt text and focus checked at every size; title, description, share image, Open Graph/Twitter tags, icons, MedicalClinic structured data with demo details, and a 404 page (noindex kept on purpose). Tested at 360x640, 390x844, 430x932, 844x390, 768x1024, 1024x768, 1366x768 and 1920x1080, scrolling down and back up.
- **Day 15:** Pitch kit: a portfolio README, a case study (problem, goal, design approach, features, technical decisions, content and medical wording, and what a real clinic must provide), and a private, git-ignored `pitch/` folder with a printable price sheet and a walkthrough script.
