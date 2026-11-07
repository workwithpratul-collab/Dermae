# CONTENT.md — DERMAÉ

The approved on-page copy for each scene. Use this wording exactly when building the site. See `STORYBOARD.md` for visuals and motion, and `CLAUDE.md` for content rules.

**Status:** the Days 6–10 copy was approved. The Day 6 rewrite is live in the sections below; the later sections are added to the site as each day is built (see Progress in `CLAUDE.md`).

---

## Brand voice

**Tone:** a calm, precise, warm specialist. Plain English, short sentences, no hype. We explain rather than sell, and we're honest about limits ("results vary", "it may take several months").

**How we write:**

- Speak to the reader as "you". Explain any medical term the first time it appears.
- Be specific about what happens (what you'll feel, how long recovery may take), never about outcomes.
- Name the dermatologist's role: "your dermatologist will assess", "will advise", "will explain".
- Keep every fictional detail labelled, e.g. *(fictional demo profile)*, *(Illustrative quote)*.

**Words to use:** may help, designed to, can, suitable, results vary, gradual, gentle, assess, explain, advise, plan, follow-up, your dermatologist will advise.

**Words to avoid:** miracle, flawless, perfect, guaranteed, cure, permanent, painless, best, instant, risk-free, no downtime, transform, erase, eliminate, revolutionary, cutting-edge, clinically proven, youthful, or any similar promise.

**Never include:** statistics or percentages, prices, drug or brand names, doses, before-and-after claims, or real people's credentials.

**Medical note:** wherever medical information appears, add:
*General information only, not medical advice. A dermatologist will assess your individual needs.*

---

## Page-wide (added Days 1–2)

**Skip link** (shows on keyboard focus): Skip to the booking form

**Loading screen:** DERMAÉ (revealed letter by letter)

**Scroll hint:** Scroll to enter

**Header:**

- Wordmark: DERMAÉ (screen readers also hear ", back to the start")
- Links: Treatments · Approach · Doctor · Book
- Button (desktop): Book a consultation
- Menu button (mobile): Menu, which reads Close while the menu is open

**Mobile bottom bar:** Book a consultation

---

## Scene 1: Opening

**Name:** DERMAÉ

**Tagline:** Specialist skin care, carefully considered.

---

## Scene 2: Treatment room

**Heading:** Clinical care, without the rush.

**Body:** Unhurried appointments with a dermatologist, in a quiet room designed around your comfort and your skin.

---

## Scene 3: Treatments

**Heading:** Medical and aesthetic dermatology, in one place.

**Card — Medical dermatology:** Acne, eczema, psoriasis, pigmentation concerns, hair loss, and skin examinations.

**Card — Aesthetic dermatology:** Chemical peels, laser treatments, microneedling, scar treatments, and skin rejuvenation.

**Note:** Your dermatologist will explain which options may suit your skin, and why.

**Medical note:** General information only, not medical advice. A dermatologist will assess your individual needs.

---

## Scene 4: Doctor

**Heading:** Specialist care, shaped by your goals.

**Name and role:** Dr. Mira Sen, Lead Dermatologist *(fictional demo profile)*

**Body:** Each consultation starts with listening. Your options are then explained clearly, and together you agree a plan that fits your skin and your routine.

---

## Scene 5: Your care journey

**Heading:** Clear steps, from first visit to follow-up.

**Steps:**

1. **Consult:** Tell us what concerns you, and what you hope for.
2. **Plan:** Talk through suitable options, recovery time and realistic expectations.
3. **Care:** Get clear advice before and after each treatment.

**Quote:** "For the first time, I understood my skin and what to do next." *(Illustrative quote)*

---

## Scene 6: Booking

**Heading:** Begin with a conversation.

**Body:** Request a consultation, and we'll contact you to confirm a time that suits you.

**Form fields:**

- Name
- Phone
- Email
- Appointment type
- Preferred date
- Preferred time

Phone and Preferred time are labelled *(optional)*. Appointment type starts on "Choose a type", then offers: Medical dermatology / Aesthetic dermatology / Not sure yet.

**Button:** Request Consultation

**Demo note (under the button):** Demo form: not connected yet, so requests won't be sent.

**Field error messages:**

- Name: Please enter your name.
- Email (empty): Please enter your email address.
- Email (not valid): Please enter a full email address, like name@example.com.
- Appointment type: Please choose an appointment type.
- Preferred date (empty): Please choose a preferred date.
- Preferred date (in the past): Please choose a date from today onwards.
- Preferred date (not valid): Please enter a valid date.
- Preferred time (not valid): Please enter a valid time.
- Anything else: Please check this field.

**Form status messages:**

- Some fields need fixing: Some details need checking. Please see the highlighted fields.
- Valid, but Formspree isn't connected yet: Thank you. This is a demo form, so nothing has been sent.
- Sending (real Formspree ID only): Sending…
- Sent (real Formspree ID only): Thank you. Your request has been sent, and our team will contact you to confirm the details.
- Failed (real Formspree ID only): Sorry, your request couldn't be sent. Please try again, or email hello@dermae.example.

**Contact details:**

- Address: Demo address
- Phone: +00 00000 00000
- Email: hello@dermae.example

**Footer note:** DERMAÉ is a fictional concept website. Its clinic details, doctor, and quotes are illustrative and aren't medical advice.

---

## Footer (added Day 5)

- Wordmark: DERMAÉ (screen readers also hear ", back to the start")
- Links: Treatments · Approach · Doctor · Book
- Note: the footer note above, word for word
- Copyright: © 2026 DERMAÉ, design demo

---
---

# Approved additions (Days 6–10)

Approved by the user. Each part goes on the site on its build day (Phase 2).

## Day 6: Copy rewrite

Applied on Day 6: the live copy in the sections above uses the approved wording. The previous wording and the side-by-side comparison are in commit 6d47ef3 ("Days 6-10: copy draft"). Items fixed by `CLAUDE.md` (form fields, button label, contact details, footer note, demo-form message) were kept.

---

## Day 7: Treatment library

Each entry has a one-line summary (for the cards) and a full description (for each treatment's detail view). Every entry ends with the medical note.

**On the site (Day 8):** this text lives in `js/treatments-data.js`, the one file the Treatments section reads from. It was generated from this section word for word. If you change the wording, change it in both places.

### Medical dermatology

#### Acne

**Summary:** Blocked, inflamed pores that cause spots. Care focuses on calming breakouts and lowering the chance of marks.

**What it is:** A common skin condition. Pores become blocked with oil and dead skin cells, and can then become inflamed. It often starts in the teenage years, but many adults have it too.

**Common signs:**

- Blackheads and whiteheads
- Red bumps and pus-filled spots
- Deeper, painful lumps under the skin
- Dark marks or scars where spots have healed
- Usually on the face, chest, shoulders or back

**How a dermatologist assesses it:** By looking closely at the type of spots, where they are and how widespread they are, and checking for marks or scarring. They will ask about your skincare and make-up, any medicines you take, hormonal patterns such as your menstrual cycle, and how acne affects your daily life.

**General treatment approaches:**

- A simple skincare routine suited to acne-prone skin
- Treatments applied to the skin
- Medicines taken by mouth, for some people
- Hormonal approaches, for some people
- In-clinic treatments, such as chemical peels, alongside the main plan

Improvement is usually gradual and can take several months. Treating acne early may help lower the chance of scarring. Your dermatologist will advise what may suit you.

**When to seek care:** If spots are deep or painful, if they leave marks or scars, if pharmacy products haven't helped after a few months, if acne starts suddenly in adulthood, or if it is affecting your confidence or mood.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Eczema

**Summary:** Dry, itchy, inflamed skin that comes and goes. Care focuses on soothing flares and protecting the skin barrier.

**What it is:** A long-term condition in which the skin's protective barrier is weaker than usual, so it loses moisture and reacts more easily. It tends to flare and settle. It isn't contagious.

**Common signs:**

- Dry, rough patches
- Itching, often worse at night
- Redness on lighter skin, or darker brown, purple or grey patches on darker skin
- Thickened skin where it has been scratched
- Cracking, or weeping during a flare
- Often on the hands, inner elbows, backs of the knees and face

**How a dermatologist assesses it:** By examining your skin and asking when flares happen and what seems to trigger them, such as soaps, fabrics, heat, stress or allergies. If a contact allergy is suspected, they may suggest patch testing.

**General treatment approaches:**

- Gentle skincare and regular moisturising
- Finding and avoiding triggers where possible
- Anti-inflammatory creams or ointments during flares
- Treatment for infection, if present
- Light therapy (phototherapy) or other medical treatments for eczema that doesn't settle

Eczema can't always be prevented, but it can often be brought under better control. Your dermatologist will advise what may suit you.

**When to seek care:** If itching disturbs your sleep, if moisturising isn't helping, or if eczema affects your daily life. Seek medical advice promptly if the skin becomes weepy, crusted or painful, or if you feel unwell, as these can be signs of infection. If painful blisters spread quickly, get same-day medical help.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Psoriasis

**Summary:** Raised, scaly patches caused by skin renewing too quickly. Care focuses on long-term control.

**What it is:** A long-term condition linked to the immune system, which makes skin cells build up faster than usual. It tends to come and go. It isn't contagious.

**Common signs:**

- Raised, clearly defined patches with silvery-white scale
- On darker skin, patches may look purple, grey or dark brown
- Itching or soreness
- Scaling on the scalp
- Pitted, thickened or discoloured nails
- Stiff or painful joints, in some people

**How a dermatologist assesses it:** By examining your skin, scalp and nails, and asking about your joints, family history, general health and possible triggers such as stress, infections or certain medicines. Occasionally a small skin sample (a biopsy) helps confirm the diagnosis.

**General treatment approaches:**

- Creams, ointments and scalp treatments
- Light therapy (phototherapy)
- Medicines that work throughout the body, for more widespread psoriasis
- Advice on triggers and general health

The plan may change over time as your skin responds. Your dermatologist will advise what may suit you.

**When to seek care:** If patches are widespread, sore or affecting your daily life, or if you have joint pain or stiffness. If large areas of skin suddenly become red and inflamed, get urgent medical help.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Pigmentation concerns

**Summary:** Patches of skin that are darker or lighter than usual, assessed carefully before any treatment is chosen.

**What it is:** Changes in skin colour. Darker patches (hyperpigmentation) include melasma, sun spots and marks left after inflammation such as acne. Lighter patches can have other causes, such as vitiligo.

**Common signs:**

- Flat patches darker or lighter than the surrounding skin
- Melasma often appears evenly on both cheeks, the forehead or above the upper lip
- Patches that darken after time in the sun

**How a dermatologist assesses it:** By examining the skin in good light, often with a dermatoscope (a skin magnifier) or a Wood's lamp (a special ultraviolet light). They will ask about sun exposure, hormones, skincare and medicines. An important part of the visit is checking that no spot needs a closer look for other reasons.

**General treatment approaches:**

- Daily broad-spectrum sun protection, the foundation of any plan
- Treating the underlying cause where possible
- Treatments applied to the skin
- Chemical peels or laser treatments, in carefully selected cases

Pigmentation usually improves slowly and can return. Some treatments carry extra risk on darker skin tones, so the choice needs care. Results vary, and your dermatologist will advise what may suit you.

**When to seek care:** Have any new, changing, irregular, bleeding or itchy dark spot checked promptly. Also seek advice for sudden loss of skin colour, or if pigmentation is affecting your confidence.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Hair loss

**Summary:** Thinning, shedding or patches of hair loss, investigated to find the cause before a plan is made.

**What it is:** Hair loss has many possible causes, including inherited thinning, temporary shedding after illness, stress or childbirth, patchy hair loss linked to the immune system, scalp conditions, and some health or nutritional issues.

**Common signs:**

- A widening parting or a receding hairline
- More hair than usual on your pillow or hairbrush
- Smooth, round bald patches
- Redness, scaling, itching or soreness of the scalp
- Thinning eyebrows or eyelashes

**How a dermatologist assesses it:** With a detailed history (when it started, family history, general health, medicines, diet and recent life events) and a close examination of the scalp and hair, often with a dermatoscope. Sometimes blood tests or a small scalp biopsy are suggested.

**General treatment approaches:**

- Treating the underlying cause, where one is found
- Treatments applied to the scalp
- Medicines taken by mouth, for some people
- In-clinic treatments for some types of patchy hair loss
- Support and advice on gentle hair care

Hair grows slowly, so any change takes months to judge, and results vary. Your dermatologist will advise what may suit you.

**When to seek care:** If hair loss is sudden or patchy, if the scalp is painful, red or scarred, or if hair loss comes with other symptoms such as tiredness or weight change.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Skin examinations

**Summary:** A careful head-to-toe check of your skin and moles, with any spot of concern looked at closely.

**What it is:** A full skin check by a dermatologist, looking at moles and other spots, including places that are hard to see yourself.

**What is checked:**

- Moles and spots across the body, including the scalp, back and between the toes
- Anything new, changing, or that looks different from your other moles
- A helpful guide: **A**symmetry, uneven **B**orders, several **C**olours, a growing **D**iameter, or any **E**volving (changing) spot

**How a dermatologist assesses it:** By examining the skin closely and using a dermatoscope to see patterns beneath the surface. With your consent, photographs may be taken to compare over time. You can keep your underwear on, and you can ask for a chaperone.

**What may happen next:**

- Reassurance, if nothing needs attention
- Regular monitoring, sometimes with photographs
- Removing a spot, or taking a small sample, for laboratory testing

A check may be especially useful if you have many moles, a family history of skin cancer, fair skin that burns easily, or a history of sunburn.

**When to seek care:** Don't wait for a routine check if you notice a new spot, a mole that changes in shape, size or colour, a sore that doesn't heal, or a spot that bleeds or itches. Book an appointment promptly.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

### Aesthetic dermatology

#### Chemical peels

**Summary:** A carefully chosen solution applied to the skin, which may help with dullness, uneven texture, uneven tone and mild acne.

**What it is:** A treatment in which a solution, usually containing gentle acids, is applied to the skin for a set time to loosen and lift its outer layers.

**How it works:** As the outer layer loosens and sheds, the skin renews itself. Peels come in different depths. Superficial (lighter) peels act on the surface only; medium peels reach a little deeper and need more recovery. Your dermatologist chooses the type and strength for your skin.

**What to expect at the appointment:** Your skin is cleansed and sensitive areas are protected. The solution is applied and left for a timed period while you may feel warmth, tingling or stinging. It is then removed or neutralised, and a soothing cream and sunscreen are applied. The treatment itself is usually short.

**Typical number of sessions:** Lighter peels are often given as a course, a few weeks apart. Deeper peels are given less often. Your dermatologist will advise.

**Downtime:** After a lighter peel, redness and light flaking for a few days. After a medium peel, more noticeable redness and peeling, often for a week or longer.

**Who it may suit:** People with dull or uneven skin, mild pigmentation, rough texture, or some types of acne.

**Who should discuss it with the doctor first:** Anyone who is pregnant or breastfeeding, has a history of cold sores, has a recent tan, has eczema, rosacea or very sensitive skin, has a darker skin tone (peels can change pigment, so the choice needs care), has recently taken acne medicine by mouth, or has had recent waxing or other procedures in the area.

**Possible side effects:** Redness, stinging, dryness and peeling. Less commonly, temporary darkening or lightening of the skin, a cold sore flare, infection or scarring.

**Preparation:** A patch test may be suggested. You may be asked to pause some active skincare products for a few days beforehand, and to avoid sun, tanning and waxing.

**Aftercare:** Use a gentle cleanser and moisturiser, wear broad-spectrum sunscreen every day, and let peeling skin come away on its own. Avoid exfoliating products until your skin has settled.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Laser treatments

**Summary:** Precise beams of light that may help with pigment, visible blood vessels, redness, uneven texture or fine lines.

**What it is:** A group of treatments that use concentrated light. Different lasers are designed for different concerns, so the right one depends on your skin and your goals.

**How it works:** The laser's light is absorbed by a chosen target, such as pigment, blood vessels or water in the skin. This creates controlled heat that treats the target while the surrounding skin is protected. Some lasers work beneath the surface; others gently remove very thin layers of skin.

**What to expect at the appointment:** You will wear eye protection. Your skin is cleansed, and a numbing cream or cooling may be used. Many people describe a snapping or warm sensation. Afterwards the skin is cooled and protected. How long it takes depends on the area and the laser.

**Typical number of sessions:** Often a course of sessions spaced some weeks apart. The number varies with the laser and the concern. Your dermatologist will advise.

**Downtime:** Ranges from little or none (some redness for a day or two) to a week or more with redness and crusting after resurfacing treatments.

**Who it may suit:** People with sun spots, redness or visible vessels, uneven texture, fine lines or some types of scarring.

**Who should discuss it with the doctor first:** Anyone with a darker skin tone or a recent tan, who is pregnant, who takes medicines that make the skin sensitive to light, who has a history of cold sores or raised (keloid) scars, or who has an active skin infection.

**Possible side effects:** Redness, swelling and tenderness. Temporary darkening or lightening of the skin, and crusting. Less commonly, blistering, longer-lasting pigment change or scarring.

**Preparation:** Avoid sun, tanning and self-tan in the weeks before. A patch test may be suggested, and you may be asked to pause some skincare products.

**Aftercare:** Cool the area as advised, care for the skin gently, avoid picking any crusts, and protect it from the sun with broad-spectrum sunscreen every day.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Microneedling

**Summary:** Very fine needles make tiny, controlled channels in the skin, which may help with texture and some scarring.

**What it is:** A treatment that uses a device with very fine, sterile, single-use needles passed gently over the skin.

**How it works:** The tiny channels prompt the skin's natural repair process, which encourages new collagen (the protein that gives skin its structure). Changes build gradually.

**What to expect at the appointment:** Your skin is cleansed and a numbing cream is usually applied first. The device is passed over the area, which may feel like light scratching or vibration. Afterwards the skin looks pink or red.

**Typical number of sessions:** Usually a course of sessions spaced some weeks apart, with changes building over several months. Your dermatologist will advise.

**Downtime:** Redness similar to mild sunburn for a day or a few days, with possible slight swelling, dryness or flaking.

**Who it may suit:** People with some types of acne scarring, uneven texture or the appearance of enlarged pores.

**Who should discuss it with the doctor first:** Anyone with active acne or a skin infection in the area, a history of cold sores or raised (keloid) scars, a bleeding disorder or who takes blood-thinning medicine, eczema or psoriasis in the area, who is pregnant, or who has recently taken acne medicine by mouth.

**Possible side effects:** Redness, swelling, pinpoint bleeding, dryness and small breakouts. Less commonly, temporary pigment change or infection.

**Preparation:** Pause irritating skincare products for a few days beforehand as advised, and avoid sunburn.

**Aftercare:** Keep the skin clean and simple, avoid make-up, heat and heavy exercise for about a day as advised, don't pick, and use broad-spectrum sunscreen every day.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Scar treatments

**Summary:** A tailored combination of treatments that may help soften, flatten or blend scars.

**What it is:** Care for scars from acne, injury or surgery, including indented scars and raised scars (hypertrophic or keloid scars). The approach depends on the type, age and colour of the scar.

**How it works:** Different methods suit different scars. Resurfacing treatments such as laser, peels or microneedling can soften the texture of indented scars. Raised scars may be flattened with silicone dressings or treatments injected into the scar. Some tethered, indented scars may be lifted with a minor in-clinic procedure.

**What to expect at the appointment:** Your dermatologist examines each scar and explains which methods may help. A plan often combines more than one approach over time.

**Typical number of sessions:** Usually several sessions over a number of months. Improvement is gradual. Scars can often be softened, but they don't disappear completely. Your dermatologist will advise.

**Downtime:** Depends on the method, from very little to around a week.

**Who it may suit:** People with settled scars that bother them. Newer scars often improve on their own, so timing matters.

**Who should discuss it with the doctor first:** Anyone who tends to form raised (keloid) scars, has a darker skin tone, has active acne, is pregnant, or has recently taken acne medicine by mouth.

**Possible side effects:** Depend on the method. They can include redness, swelling and temporary pigment change, and, after injections into a scar, local thinning or lightening of the skin.

**Preparation:** Depends on the method chosen. Avoid sun and tanning beforehand. Your dermatologist will give you specific instructions.

**Aftercare:** Follow the instructions for your treatment, protect the area from the sun, and be patient: scars change slowly.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

#### Skin rejuvenation

**Summary:** A considered plan that may improve dullness, uneven tone, fine lines and texture linked to sun and time.

**What it is:** An umbrella term for treatments that support the skin's renewal. A plan may combine a medical skincare routine with in-clinic treatments such as peels, laser or light treatments, or microneedling.

**How it works:** These treatments encourage the skin to renew its surface and build collagen, while daily sun protection helps prevent further sun damage.

**What to expect at the appointment:** A consultation to understand your goals and set realistic expectations, followed by a plan that may combine home care with treatments in clinic.

**Typical number of sessions:** Often a course of treatments, sometimes followed by occasional maintenance sessions. Your dermatologist will advise.

**Downtime:** Varies with the treatment, from none to around a week.

**Who it may suit:** People with sun-related changes, dullness, fine lines or uneven texture who want a gradual, natural-looking improvement.

**Who should discuss it with the doctor first:** Anyone who is pregnant or breastfeeding, has a darker skin tone or a recent tan, has a history of cold sores, has active skin conditions, or takes medicines that make the skin sensitive to light.

**Possible side effects:** Depend on the treatments chosen. They can include redness, flaking and temporary pigment change.

**Preparation:** Daily broad-spectrum sunscreen, and any specific instructions for each treatment.

**Aftercare:** Gentle skincare and daily sun protection. Results vary and build gradually.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

---

## Day 9: Approach and technology

**Fictional-clinic label (shown with this section):** DERMAÉ is a fictional clinic. This section describes the standards a real dermatology clinic should meet; it is not a claim about a real clinic.

### Your care, step by step

Scene 5 gives the short version (Consult, Plan, Care). This is the fuller picture, in four steps.

**1. Consultation**
Time set aside to talk, without rushing. Your dermatologist asks about your concerns and goals, your skin history, your general health, any medicines and allergies, and the products you use. Bring a list of your medicines and anything you've already tried. There is always time for your questions.

**2. Skin assessment**
A close look at your skin in good light, often with a dermatoscope, and with a Wood's lamp when it helps. With your consent, photographs may be taken to compare progress later. Sometimes a test is suggested, such as a patch test, a swab, a blood test or a small skin sample. Each one is explained before it happens.

**3. Personalised plan**
Your dermatologist explains what they think is happening and the options that may help, including the option of simply waiting and watching. For each option you hear the likely benefits, the risks, the recovery time, how many visits may be needed and the cost. You get a written summary and time to decide.

**4. Treatment and follow-up**
Treatment is carried out by trained clinicians, with written aftercare instructions. A follow-up visit reviews how your skin is responding and adjusts the plan if needed. If anything worries you between visits, you'll know how to reach the clinic.

### Diagnostics and equipment, in plain language

**Dermatoscopy**
A dermatoscope is a handheld magnifier with its own light. It lets your dermatologist see patterns and colours beneath the skin's surface that the eye alone can't. It is used to look at moles, pigmentation, the scalp and hair. You may feel the lens resting lightly on your skin, and it takes only moments for each spot.

**Wood's lamp examination**
A Wood's lamp gives off a gentle ultraviolet light in a darkened room. Some pigment changes and some skin infections show up more clearly under it, which helps with diagnosis and with choosing a suitable treatment.

**Skin imaging**
Standardised photographs, taken with your consent, record how your skin or moles look on a given day. Comparing them over time helps show change, whether that is a mole being monitored or progress during treatment.

**Lasers: the main types**

- **Pigment lasers** target brown pigment, for some sun spots and pigmentation.
- **Vascular lasers** target blood vessels, for some redness and visible vessels.
- **Resurfacing lasers** work on texture. *Non-ablative* types heat the skin beneath an intact surface, with shorter recovery. *Ablative* types gently remove very thin layers of skin, with longer recovery.

Not every laser suits every skin tone. Your dermatologist chooses the type and settings for your skin.

**Chemical peels: the main types**

- **Superficial peels** act on the outermost layer, with little recovery time.
- **Medium peels** reach a little deeper, with several days to a week or more of recovery.
- **Deep peels** are much more intensive, need significant recovery, and are rarely the first choice.

The depth and solution are matched to your skin type and your goals.

*General information only, not medical advice. A dermatologist will assess your individual needs.*

### Safety and hygiene

**Sterilisation:** Reusable instruments are cleaned and sterilised between every patient, following a recorded, checked process.

**Single-use items:** Needles, microneedling tips, gloves and applicators are used once where appropriate, then disposed of safely.

**Clean rooms:** Treatment rooms and equipment are cleaned between appointments, with hand hygiene before and after each patient.

**Patch tests:** Before some peels and laser treatments, a small test area shows how your skin responds, before a full treatment.

**Laser safety:** Everyone in the room wears eye protection suited to the laser, and lasers are used only by trained staff.

**Informed consent:** Before any treatment, you'll be told in plain language what it involves, its benefits, its risks and the alternatives. You can ask questions, take time to decide, and change your mind at any point.

**Your privacy:** Your records are kept confidential and stored securely. Photographs are taken only with your consent, used only for your care, and never shared or used for marketing without your separate, written permission. You can ask for a chaperone at any appointment.

---

## Day 10: Doctor profile

**Dr. Mira Sen**, Lead Dermatologist *(fictional demo profile)*

*Dr. Sen is a fictional person created for this design demo. Her name, photograph, qualifications and note are illustrative and do not describe a real doctor.*

### Qualifications (fictional)

- Medical degree *(fictional demo credential)*
- Specialist training in dermatology *(fictional demo credential)*
- Further training in dermatoscopy and skin checks *(fictional demo credential)*
- Further training in laser and aesthetic dermatology *(fictional demo credential)*
- Member of a professional dermatology association *(fictional demo credential)*

### Areas of focus

- Acne and acne scarring
- Eczema and sensitive skin
- Pigmentation, including melasma
- Mole checks and skin examinations
- Peels and laser treatments for tone and texture
- Care for all skin tones

### Consultation philosophy

Dr. Sen starts by listening. She wants to understand what bothers you about your skin, how it affects your day, and what you hope for. She explains what she sees in plain language, sets out every reasonable option (including doing less, or nothing yet) and is honest about what each one may and may not achieve. Decisions are made together, at your pace, and followed up so the plan can change if your skin needs it to.

### A note from Dr. Sen *(Illustrative note, fictional)*

"Good skin care starts with understanding. I would rather spend time explaining what is happening in your skin than hurry towards a treatment. Together, we'll find an approach that feels right for you, and we'll adjust it as we go."

---

## Phase 2: new section labels and interface text

**Treatments section** (live since Day 8)

- Eyebrow: Treatments
- Heading: A closer look at each treatment.
- Intro: Clear, general information about the conditions we see and the treatments we offer. Your dermatologist will advise what may suit you.
- Filter label (for screen readers): Show treatments
- Filters: All · Medical · Aesthetic
- Search label: Search treatments
- Search placeholder: For example, acne or peels
- Results (for screen readers): Showing [number] treatments (or "Showing 1 treatment")
- Without JavaScript: The treatment guide needs JavaScript. The treatments we offer are listed in the section above.
- No results: No treatments match your search. Try another word, or show all treatments.
- Card link: Read more (screen readers also hear "about [treatment name]")
- Card tags: Medical · Aesthetic
- Detail view close button: Close
- Detail view link to the booking form: Book a consultation
- Medical note: General information only, not medical advice. A dermatologist will assess your individual needs.

**Approach and technology section**

- Eyebrow: Approach and technology
- Heading: Careful at every step.
- Intro: How a visit works, the equipment we use, and the standards that keep you safe.
- Subheadings: Your care, step by step · Diagnostics and equipment · Safety and hygiene

**Doctor section**

- Eyebrow: Your dermatologist
- Heading: Meet Dr. Mira Sen.
- Subheadings: Qualifications · Areas of focus · How she works · A note from Dr. Sen
