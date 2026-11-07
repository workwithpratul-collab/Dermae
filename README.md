# DERMAÉ: a scroll-film website for a dermatology clinic

**Live demo:** https://workwithpratul-collab.github.io/Dermae/

DERMAÉ is a **fictional** premium dermatology clinic. This site is a design demo: it shows what a calm, high-end clinic website can feel like when the first screen is a slow, cinematic "camera move" instead of a stack of banners. It is not a real business. Every clinic detail, the doctor, the quotes and the contact details are illustrative and clearly labelled as such, and nothing on the site is medical advice.

---

## What you'll see

1. **The scroll film.** Five scenes (a serum drop on skin, the treatment room, treatments, the doctor and the care journey) play as one slow camera move that you drive with your scroll.
2. **Treatments.** A library of 11 medical and aesthetic treatments with filters, search and a detail view for each. Every treatment has its own shareable link (for example `#treatment-acne`).
3. **Approach and technology.** The four steps of care, the diagnostics and equipment in plain language, and safety and hygiene.
4. **Doctor.** A fictional, clearly labelled profile of the lead dermatologist.
5. **Patient guide.** What to expect before, during and after a visit.
6. **FAQ.** 25 questions, grouped by category in an accessible accordion.
7. **FAQ assistant.** A small chat window that answers only from the FAQ. It uses no AI service and stores nothing. If a message mentions symptoms, medicines or anything urgent, it always replies with a safety message instead of an answer.
8. **Contact.** Demo address, hours and call, WhatsApp, email and directions links. The map loads only when the visitor asks for it.
9. **Booking.** A short consultation request form with no medical-history questions. It is deliberately **not connected** yet, and says so.

## Features

- **Calm motion.** Only `transform` and `opacity` animate, the easing is slow and soft, and nothing bounces or spins.
- **Reduced motion.** If the visitor's device asks for less motion, the film becomes a normal page with gentle fades only.
- **Works everywhere.**
  - Tested on phones, tablets (in both orientations), phones held sideways and large desktops.
  - Respects notches and rounded corners.
  - Uses the device's own touch scrolling.
- **Accessible.**
  - Semantic landmarks, one clear heading structure, visible focus, full keyboard use and labelled form fields.
  - Every tap target is at least 44x44px.
  - Animated text stays readable by screen readers.
- **Fast.**
  - Images are WebP with JPEG fallbacks, sized for each screen.
  - The opening image is preloaded and the rest load quietly in the background.
  - Fonts are trimmed to the weights in use, and there is no framework.
- **Share-ready.** Title, description, a share image, icons, structured data and a 404 page. It is kept out of search results on purpose, because it is a demo.

## Tech

| Use | Tool |
| --- | --- |
| Page | Plain HTML, CSS and JavaScript, with no build step and no framework |
| Scroll animation | [GSAP](https://gsap.com/) 3.13 + ScrollTrigger |
| Line-by-line text reveals | GSAP SplitText |
| Smooth wheel scrolling | [Lenis](https://lenis.darkroom.engineering/) 1.1.13 |
| Booking form | [Formspree](https://formspree.io/) (not connected yet) |
| Fonts | Cormorant Garamond and Inter (Google Fonts) |
| Hosting | GitHub Pages |

All libraries load from a CDN at exact, pinned versions.

## How the scroll film works

There is no 3D and no video. The "camera move" is a small set of tricks layered together:

- **Pinning.** The film section stays fixed on screen while you scroll through a long stretch of page. Your scroll position becomes the film's playhead.
- **One timeline.** Every movement in the film sits on a single GSAP timeline, and a beat table in `js/scenes.js` says when each scene starts, holds and leaves. Scrolling forwards plays it, and scrolling back rewinds it.
- **Fake depth.** Each scene is built from layered images. The layers move and zoom very slowly at slightly different speeds, which reads as depth.
- **Crossfades and soft blur.** Scenes dissolve into each other. The blur comes from a second, pre-blurred copy of the image fading in, so the browser never has to blur a large photo live.
- **Text reveals.** Headings and paragraphs are split into lines that rise into view, one scene at a time. The full text always stays in the page for screen readers.
- **A safety check.** If a screen is too small for a scene's text, the film quietly switches to a normal scrolling page instead of cramping it.

## Run it locally

View it through a simple local web server, so it behaves exactly like the live site (opening `index.html` straight from the folder mostly works, but browsers treat local files differently). Use any one of these:

- **Python:** `python -m http.server 8000`, then open http://localhost:8000
- **Node:** `npx serve`, then open the address it prints
- **VS Code:** install the *Live Server* extension, then click **Go Live**

There is nothing to install for the site itself, so no `npm install` is needed.

## Project structure

```
index.html            the whole page
404.html              "page not found" page
css/styles.css        all styles (design tokens at the top)
js/                   one small file per feature (film, header, treatments, FAQ, assistant, contact, form)
images/web/           optimised scene images (WebP + JPEG)
images/share/         share image and icons
CONTENT.md            all approved copy, word for word
STORYBOARD.md         how each scene looks and moves
CASE-STUDY.md         the design thinking behind the project
CLAUDE.md             working notes and decisions
```

## Using this for a real clinic

The demo is built to be re-skinned for a real clinic. Before going live, the clinic would provide its real details, photos, doctor profiles and approved treatment wording. Someone would also need to connect the form (steps in `CLAUDE.md`, "Connecting the form") and remove the `noindex` line so search engines can list the site. `CASE-STUDY.md` has the full list.

---

*DERMAÉ is a fictional concept website. Its clinic details, doctor, and quotes are illustrative and aren't medical advice.*
