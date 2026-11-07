# Case study: DERMAÉ

*A concept website for a fictional premium dermatology clinic.*

**Live demo:** https://workwithpratul-collab.github.io/Dermae/

> DERMAÉ is not a real clinic. This is a self-initiated design project, built to show clinics what their website could be. It has no clients, patients or results to report, so this case study describes the thinking and the build, not outcomes.

---

## The problem

Many clinic websites look and feel alike: a stock photo banner, a long list of treatments, a "Book now" button and a wall of text. For a premium clinic, that creates two problems.

- **The site doesn't match the visit.** A clinic may invest heavily in a calm, considered space and a careful consultation, but its website feels generic and rushed.
- **Medical information is hard to get right.** Visitors want clear answers, but health websites can easily drift into overpromising ("guaranteed results", "permanent", before-and-after photos). That is unhelpful for patients and risky for the clinic.

## The goal

Design a website that feels like walking into a calm, high-end clinic, and that is also:

- **Honest.** It informs without making medical claims, and it is clear about what it is.
- **Useful.** Treatments, practical answers, contact details and a simple way to ask for a consultation are all easy to find.
- **Inclusive and fast.** It works on any phone or computer, for keyboard and screen-reader users, and for people who prefer less motion.
- **Easy to hand over.** It is plain files with no framework or build step, so a clinic (or its next developer) can run and change it easily.

## Design approach

### One continuous camera move

The site opens with a short "film" that you drive with your scroll. A drop of serum on skin introduces the name. The camera then drifts into a quiet treatment room, and on through treatments, the doctor and the care journey. Instead of five separate banners, it reads as one slow, unbroken shot, closer to a brand film than a web page.

### Restraint

- **Colour.** The palette is four colours: ivory, sage, forest green and charcoal. Sage is used only for decoration, because it is too light for text.
- **Type.** An elegant serif (Cormorant Garamond) for headings, and a clean sans-serif (Inter) for reading.
- **Motion.** It is slow and soft, and never bounces, snaps or spins.
- **Space.** There is plenty of whitespace. Shadows are soft or absent, and there are no loud gradients.

### Calm after the film

The film ends in soft ivory and hands over to ordinary, readable sections: Treatments, Approach and technology, Doctor, Patient guide, FAQ, Contact and Booking. The cinematic part sets the mood; the rest of the page does the practical work quickly and plainly.

## Features

- **The scroll film:** five scenes with layered images, slow zooms, crossfades and line-by-line text reveals.
- **Treatment library:**
  - 11 medical and aesthetic treatments, with filters, search and an accessible detail view.
  - Each treatment has its own shareable link.
- **Approach and technology:** how care works step by step, the equipment in plain language, and safety and hygiene.
- **Doctor profile:** a fictional, clearly labelled lead dermatologist.
- **Patient guide:** before, during and after a visit.
- **FAQ:** 25 questions in an accessible accordion.
- **FAQ assistant:**
  - Answers only from the FAQ, with no AI service and nothing stored.
  - If a message mentions symptoms, medicines or anything urgent, it always gives a safety reply instead of an answer.
- **Contact:** details kept in one place. The map loads only when the visitor asks for it, so nothing is sent to a map service until then.
- **Booking request:** a short form that asks for no medical history. It shows clear messages and says honestly when it isn't connected.

## Technical decisions

| Decision | Why |
| --- | --- |
| Plain HTML, CSS and JavaScript, with no framework or build step | Easy to host anywhere, easy to hand over, and fast to load |
| GSAP + ScrollTrigger for the film | Reliable scroll-linked animation that rewinds smoothly when you scroll back |
| One timeline driven by a beat table | All the film's timing lives in one place, so adjusting the pace means editing a single table |
| Layered images instead of 3D or video | Gives a sense of depth for a fraction of the download, and keeps the motion gentle |
| Only `transform` and `opacity` animate | These are the cheapest properties for a browser to animate, so movement stays smooth on modest phones |
| Pre-blurred image copies | Live blur on large photos is slow, so a blurred copy fades in instead |
| Lenis for mouse-wheel smoothing only | Phones and tablets keep their own natural touch scrolling |
| A "does the text fit?" check | If a screen is too small for a scene, the film switches to a normal page instead of cramping or cutting off text |
| Reduced-motion version | Visitors who ask their device for less motion get the same content with gentle fades only |
| WebP images with JPEG fallbacks, sized per screen | Each device downloads only the image size it needs |
| Content in data files | Treatments and FAQ are written once and used everywhere they appear, including by the assistant |
| Progressive enhancement | The scenes, contact details and booking form still work without JavaScript (the interactive treatment guide and FAQ show a short note instead) |
| Formspree for the form | A clinic can receive requests by email without running a server or a database |

## Content and medical wording

Health content needs extra care, so the copy follows written rules (see the Brand voice section in `CONTENT.md`).

- **Inform, don't promise.** Treatments are described as what they are designed to do and who they may help. Phrases like "may help", "designed to" and "results vary" replace words like "cure", "guaranteed" or "permanent".
- **No numbers that imply evidence.** There are no success rates, percentages, star ratings or review counts.
- **No "results" imagery.** There are no before-and-after photos. Images are labelled as illustrative where needed.
- **A medical note wherever medical information appears:** *"General information only, not medical advice. A dermatologist will assess your individual needs."*
- **Clear labelling of everything fictional.** The doctor profile, the quotes (*Illustrative quote*), the contact details (*demo*), the map location and the footer note all say so plainly.
- **Privacy by design.**
  - The booking form asks only for name, contact details, appointment type and a preferred date and time, with no medical history.
  - The assistant stores nothing.
- **A safety net in the assistant.** Messages about symptoms, diagnoses, medicines or urgent problems are never answered from the FAQ. They are pointed towards a consultation or urgent care instead.

## What a real clinic would need to provide

To turn this demo into a live clinic website, the clinic would supply:

1. **Business details:** the clinic name, address, phone, email, WhatsApp number, opening hours and map location.
2. **Photography:** real photos of the clinic, rooms and team (or licensed images), shot in a consistent calm style for the film.
3. **Doctor and team profiles:** real names, photos, qualifications and registration details, all checked and approved by each person.
4. **Treatment list and wording:** the treatments actually offered, reviewed by the clinic's dermatologists for accuracy and for local advertising and medical regulations.
5. **FAQ answers:** real policies on fees, payments, cancellations, privacy and aftercare.
6. **Testimonials (optional):** only genuine ones, with the patient's written consent, and only where local rules allow.
7. **A form destination:** a Formspree account (or similar), and the email address that should receive booking requests.
8. **Legal pages:** a privacy policy, and a cookie notice if any tracking is added.
9. **A domain and hosting:** the clinic's own domain name, with the site hosted under it.
10. **Search visibility:** permission to remove the demo's `noindex` setting, and real details in the structured data, so search engines can list the clinic.

---

*DERMAÉ is a fictional concept website. Its clinic details, doctor, and quotes are illustrative and aren't medical advice.*
