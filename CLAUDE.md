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
| Smooth scrolling | **Lenis** (synced to ScrollTrigger) |
| Booking form | **Formspree** (plain HTML form POST, enhanced with `fetch`) |

**Do not use:** React, TypeScript, Next.js, any framework or build step, or a database.

- Load GSAP, ScrollTrigger and Lenis from a CDN with **exact pinned versions** (for example `gsap@3.12.5`, never just `gsap`).
- Keep the site runnable by opening it through a simple local server. No `npm install` is required to view it.
- Lenis + ScrollTrigger wiring: call `ScrollTrigger.update` on Lenis scroll and drive Lenis from `gsap.ticker`.

### Planned file structure

```
/
├── index.html
├── css/
│   └── styles.css        # design tokens (CSS variables) at the top
├── js/
│   ├── main.js           # setup: Lenis, GSAP registration, reduced-motion check
│   ├── scenes.js         # one function per section's animation
│   ├── nav.js            # fixed header, mobile menu, "Book consultation" bar
│   ├── intro.js          # loading screen + "Scroll to begin" hint
│   └── form.js           # booking form submit + messages
├── assets/
│   ├── images/           # optimised WebP/AVIF + JPG fallback
│   └── fonts/            # only if self-hosting
└── CLAUDE.md
```

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

## Working style (the user is learning)

- **Explain what you're doing and why in simple, plain language.** Avoid jargon, or explain it when you use it.
- **Work in small steps.** Build one piece at a time (for example: page skeleton, then styles, then one scene, then the next).
- **Test after each change:** run a local server (for example `python -m http.server 8000` or `npx serve`), check the browser console for errors, and check mobile widths and reduced motion (Chrome DevTools → Rendering → "Emulate prefers-reduced-motion").
- Tell the user honestly what was tested and what wasn't.
- **Commit after each working milestone** with a clear, descriptive message. Don't commit broken work.
- Don't build ahead of what was asked. Check in at natural milestones.

## Git

- Small, focused commits with messages that describe the change (for example "Add page skeleton with six sections").
- Never commit secrets. A Formspree form ID is public and fine to commit, but nothing else sensitive should go in the repo.
