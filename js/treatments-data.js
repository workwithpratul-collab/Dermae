/* =========================================================
   DERMAÃ‰ â€” treatment library (the one place the site reads it from)
   The wording is the approved copy from CONTENT.md ("Day 7: Treatment
   library"). If you change one, change the other to match.
   Each treatment: id (used in links like #treatment-acne), name,
   category ("medical" or "aesthetic"), summary (for the card) and
   sections (for the detail view). A section can have text paragraphs,
   a bullet list, and paragraphs after the list. **Bold** is allowed.
   The medical note is added by js/treatments.js to every treatment.
   ========================================================= */
window.DermaeTreatments = [
  {
    id: "acne",
    name: "Acne",
    category: "medical",
    summary: "Blocked, inflamed pores that cause spots. Care focuses on calming breakouts and lowering the chance of marks.",
    sections: [
      { title: "What it is", text: ["A common skin condition. Pores become blocked with oil and dead skin cells, and can then become inflamed. It often starts in the teenage years, but many adults have it too."] },
      { title: "Common signs", list: ["Blackheads and whiteheads", "Red bumps and pus-filled spots", "Deeper, painful lumps under the skin", "Dark marks or scars where spots have healed", "Usually on the face, chest, shoulders or back"] },
      { title: "How a dermatologist assesses it", text: ["By looking closely at the type of spots, where they are and how widespread they are, and checking for marks or scarring. They will ask about your skincare and make-up, any medicines you take, hormonal patterns such as your menstrual cycle, and how acne affects your daily life."] },
      { title: "General treatment approaches", list: ["A simple skincare routine suited to acne-prone skin", "Treatments applied to the skin", "Medicines taken by mouth, for some people", "Hormonal approaches, for some people", "In-clinic treatments, such as chemical peels, alongside the main plan"], after: ["Improvement is usually gradual and can take several months. Treating acne early may help lower the chance of scarring. Your dermatologist will advise what may suit you."] },
      { title: "When to seek care", text: ["If spots are deep or painful, if they leave marks or scars, if pharmacy products haven't helped after a few months, if acne starts suddenly in adulthood, or if it is affecting your confidence or mood."] }
    ]
  },
  {
    id: "eczema",
    name: "Eczema",
    category: "medical",
    summary: "Dry, itchy, inflamed skin that comes and goes. Care focuses on soothing flares and protecting the skin barrier.",
    sections: [
      { title: "What it is", text: ["A long-term condition in which the skin's protective barrier is weaker than usual, so it loses moisture and reacts more easily. It tends to flare and settle. It isn't contagious."] },
      { title: "Common signs", list: ["Dry, rough patches", "Itching, often worse at night", "Redness on lighter skin, or darker brown, purple or grey patches on darker skin", "Thickened skin where it has been scratched", "Cracking, or weeping during a flare", "Often on the hands, inner elbows, backs of the knees and face"] },
      { title: "How a dermatologist assesses it", text: ["By examining your skin and asking when flares happen and what seems to trigger them, such as soaps, fabrics, heat, stress or allergies. If a contact allergy is suspected, they may suggest patch testing."] },
      { title: "General treatment approaches", list: ["Gentle skincare and regular moisturising", "Finding and avoiding triggers where possible", "Anti-inflammatory creams or ointments during flares", "Treatment for infection, if present", "Light therapy (phototherapy) or other medical treatments for eczema that doesn't settle"], after: ["Eczema can't always be prevented, but it can often be brought under better control. Your dermatologist will advise what may suit you."] },
      { title: "When to seek care", text: ["If itching disturbs your sleep, if moisturising isn't helping, or if eczema affects your daily life. Seek medical advice promptly if the skin becomes weepy, crusted or painful, or if you feel unwell, as these can be signs of infection. If painful blisters spread quickly, get same-day medical help."] }
    ]
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    category: "medical",
    summary: "Raised, scaly patches caused by skin renewing too quickly. Care focuses on long-term control.",
    sections: [
      { title: "What it is", text: ["A long-term condition linked to the immune system, which makes skin cells build up faster than usual. It tends to come and go. It isn't contagious."] },
      { title: "Common signs", list: ["Raised, clearly defined patches with silvery-white scale", "On darker skin, patches may look purple, grey or dark brown", "Itching or soreness", "Scaling on the scalp", "Pitted, thickened or discoloured nails", "Stiff or painful joints, in some people"] },
      { title: "How a dermatologist assesses it", text: ["By examining your skin, scalp and nails, and asking about your joints, family history, general health and possible triggers such as stress, infections or certain medicines. Occasionally a small skin sample (a biopsy) helps confirm the diagnosis."] },
      { title: "General treatment approaches", list: ["Creams, ointments and scalp treatments", "Light therapy (phototherapy)", "Medicines that work throughout the body, for more widespread psoriasis", "Advice on triggers and general health"], after: ["The plan may change over time as your skin responds. Your dermatologist will advise what may suit you."] },
      { title: "When to seek care", text: ["If patches are widespread, sore or affecting your daily life, or if you have joint pain or stiffness. If large areas of skin suddenly become red and inflamed, get urgent medical help."] }
    ]
  },
  {
    id: "pigmentation-concerns",
    name: "Pigmentation concerns",
    category: "medical",
    summary: "Patches of skin that are darker or lighter than usual, assessed carefully before any treatment is chosen.",
    sections: [
      { title: "What it is", text: ["Changes in skin colour. Darker patches (hyperpigmentation) include melasma, sun spots and marks left after inflammation such as acne. Lighter patches can have other causes, such as vitiligo."] },
      { title: "Common signs", list: ["Flat patches darker or lighter than the surrounding skin", "Melasma often appears evenly on both cheeks, the forehead or above the upper lip", "Patches that darken after time in the sun"] },
      { title: "How a dermatologist assesses it", text: ["By examining the skin in good light, often with a dermatoscope (a skin magnifier) or a Wood's lamp (a special ultraviolet light). They will ask about sun exposure, hormones, skincare and medicines. An important part of the visit is checking that no spot needs a closer look for other reasons."] },
      { title: "General treatment approaches", list: ["Daily broad-spectrum sun protection, the foundation of any plan", "Treating the underlying cause where possible", "Treatments applied to the skin", "Chemical peels or laser treatments, in carefully selected cases"], after: ["Pigmentation usually improves slowly and can return. Some treatments carry extra risk on darker skin tones, so the choice needs care. Results vary, and your dermatologist will advise what may suit you."] },
      { title: "When to seek care", text: ["Have any new, changing, irregular, bleeding or itchy dark spot checked promptly. Also seek advice for sudden loss of skin colour, or if pigmentation is affecting your confidence."] }
    ]
  },
  {
    id: "hair-loss",
    name: "Hair loss",
    category: "medical",
    summary: "Thinning, shedding or patches of hair loss, investigated to find the cause before a plan is made.",
    sections: [
      { title: "What it is", text: ["Hair loss has many possible causes, including inherited thinning, temporary shedding after illness, stress or childbirth, patchy hair loss linked to the immune system, scalp conditions, and some health or nutritional issues."] },
      { title: "Common signs", list: ["A widening parting or a receding hairline", "More hair than usual on your pillow or hairbrush", "Smooth, round bald patches", "Redness, scaling, itching or soreness of the scalp", "Thinning eyebrows or eyelashes"] },
      { title: "How a dermatologist assesses it", text: ["With a detailed history (when it started, family history, general health, medicines, diet and recent life events) and a close examination of the scalp and hair, often with a dermatoscope. Sometimes blood tests or a small scalp biopsy are suggested."] },
      { title: "General treatment approaches", list: ["Treating the underlying cause, where one is found", "Treatments applied to the scalp", "Medicines taken by mouth, for some people", "In-clinic treatments for some types of patchy hair loss", "Support and advice on gentle hair care"], after: ["Hair grows slowly, so any change takes months to judge, and results vary. Your dermatologist will advise what may suit you."] },
      { title: "When to seek care", text: ["If hair loss is sudden or patchy, if the scalp is painful, red or scarred, or if hair loss comes with other symptoms such as tiredness or weight change."] }
    ]
  },
  {
    id: "skin-examinations",
    name: "Skin examinations",
    category: "medical",
    summary: "A careful head-to-toe check of your skin and moles, with any spot of concern looked at closely.",
    sections: [
      { title: "What it is", text: ["A full skin check by a dermatologist, looking at moles and other spots, including places that are hard to see yourself."] },
      { title: "What is checked", list: ["Moles and spots across the body, including the scalp, back and between the toes", "Anything new, changing, or that looks different from your other moles", "A helpful guide: **A**symmetry, uneven **B**orders, several **C**olours, a growing **D**iameter, or any **E**volving (changing) spot"] },
      { title: "How a dermatologist assesses it", text: ["By examining the skin closely and using a dermatoscope to see patterns beneath the surface. With your consent, photographs may be taken to compare over time. You can keep your underwear on, and you can ask for a chaperone."] },
      { title: "What may happen next", list: ["Reassurance, if nothing needs attention", "Regular monitoring, sometimes with photographs", "Removing a spot, or taking a small sample, for laboratory testing"], after: ["A check may be especially useful if you have many moles, a family history of skin cancer, fair skin that burns easily, or a history of sunburn."] },
      { title: "When to seek care", text: ["Don't wait for a routine check if you notice a new spot, a mole that changes in shape, size or colour, a sore that doesn't heal, or a spot that bleeds or itches. Book an appointment promptly."] }
    ]
  },
  {
    id: "chemical-peels",
    name: "Chemical peels",
    category: "aesthetic",
    summary: "A carefully chosen solution applied to the skin, which may help with dullness, uneven texture, uneven tone and mild acne.",
    sections: [
      { title: "What it is", text: ["A treatment in which a solution, usually containing gentle acids, is applied to the skin for a set time to loosen and lift its outer layers."] },
      { title: "How it works", text: ["As the outer layer loosens and sheds, the skin renews itself. Peels come in different depths. Superficial (lighter) peels act on the surface only; medium peels reach a little deeper and need more recovery. Your dermatologist chooses the type and strength for your skin."] },
      { title: "What to expect at the appointment", text: ["Your skin is cleansed and sensitive areas are protected. The solution is applied and left for a timed period while you may feel warmth, tingling or stinging. It is then removed or neutralised, and a soothing cream and sunscreen are applied. The treatment itself is usually short."] },
      { title: "Typical number of sessions", text: ["Lighter peels are often given as a course, a few weeks apart. Deeper peels are given less often. Your dermatologist will advise."] },
      { title: "Downtime", text: ["After a lighter peel, redness and light flaking for a few days. After a medium peel, more noticeable redness and peeling, often for a week or longer."] },
      { title: "Who it may suit", text: ["People with dull or uneven skin, mild pigmentation, rough texture, or some types of acne."] },
      { title: "Who should discuss it with the doctor first", text: ["Anyone who is pregnant or breastfeeding, has a history of cold sores, has a recent tan, has eczema, rosacea or very sensitive skin, has a darker skin tone (peels can change pigment, so the choice needs care), has recently taken acne medicine by mouth, or has had recent waxing or other procedures in the area."] },
      { title: "Possible side effects", text: ["Redness, stinging, dryness and peeling. Less commonly, temporary darkening or lightening of the skin, a cold sore flare, infection or scarring."] },
      { title: "Preparation", text: ["A patch test may be suggested. You may be asked to pause some active skincare products for a few days beforehand, and to avoid sun, tanning and waxing."] },
      { title: "Aftercare", text: ["Use a gentle cleanser and moisturiser, wear broad-spectrum sunscreen every day, and let peeling skin come away on its own. Avoid exfoliating products until your skin has settled."] }
    ]
  },
  {
    id: "laser-treatments",
    name: "Laser treatments",
    category: "aesthetic",
    summary: "Precise beams of light that may help with pigment, visible blood vessels, redness, uneven texture or fine lines.",
    sections: [
      { title: "What it is", text: ["A group of treatments that use concentrated light. Different lasers are designed for different concerns, so the right one depends on your skin and your goals."] },
      { title: "How it works", text: ["The laser's light is absorbed by a chosen target, such as pigment, blood vessels or water in the skin. This creates controlled heat that treats the target while the surrounding skin is protected. Some lasers work beneath the surface; others gently remove very thin layers of skin."] },
      { title: "What to expect at the appointment", text: ["You will wear eye protection. Your skin is cleansed, and a numbing cream or cooling may be used. Many people describe a snapping or warm sensation. Afterwards the skin is cooled and protected. How long it takes depends on the area and the laser."] },
      { title: "Typical number of sessions", text: ["Often a course of sessions spaced some weeks apart. The number varies with the laser and the concern. Your dermatologist will advise."] },
      { title: "Downtime", text: ["Ranges from little or none (some redness for a day or two) to a week or more with redness and crusting after resurfacing treatments."] },
      { title: "Who it may suit", text: ["People with sun spots, redness or visible vessels, uneven texture, fine lines or some types of scarring."] },
      { title: "Who should discuss it with the doctor first", text: ["Anyone with a darker skin tone or a recent tan, who is pregnant, who takes medicines that make the skin sensitive to light, who has a history of cold sores or raised (keloid) scars, or who has an active skin infection."] },
      { title: "Possible side effects", text: ["Redness, swelling and tenderness. Temporary darkening or lightening of the skin, and crusting. Less commonly, blistering, longer-lasting pigment change or scarring."] },
      { title: "Preparation", text: ["Avoid sun, tanning and self-tan in the weeks before. A patch test may be suggested, and you may be asked to pause some skincare products."] },
      { title: "Aftercare", text: ["Cool the area as advised, care for the skin gently, avoid picking any crusts, and protect it from the sun with broad-spectrum sunscreen every day."] }
    ]
  },
  {
    id: "microneedling",
    name: "Microneedling",
    category: "aesthetic",
    summary: "Very fine needles make tiny, controlled channels in the skin, which may help with texture and some scarring.",
    sections: [
      { title: "What it is", text: ["A treatment that uses a device with very fine, sterile, single-use needles passed gently over the skin."] },
      { title: "How it works", text: ["The tiny channels prompt the skin's natural repair process, which encourages new collagen (the protein that gives skin its structure). Changes build gradually."] },
      { title: "What to expect at the appointment", text: ["Your skin is cleansed and a numbing cream is usually applied first. The device is passed over the area, which may feel like light scratching or vibration. Afterwards the skin looks pink or red."] },
      { title: "Typical number of sessions", text: ["Usually a course of sessions spaced some weeks apart, with changes building over several months. Your dermatologist will advise."] },
      { title: "Downtime", text: ["Redness similar to mild sunburn for a day or a few days, with possible slight swelling, dryness or flaking."] },
      { title: "Who it may suit", text: ["People with some types of acne scarring, uneven texture or the appearance of enlarged pores."] },
      { title: "Who should discuss it with the doctor first", text: ["Anyone with active acne or a skin infection in the area, a history of cold sores or raised (keloid) scars, a bleeding disorder or who takes blood-thinning medicine, eczema or psoriasis in the area, who is pregnant, or who has recently taken acne medicine by mouth."] },
      { title: "Possible side effects", text: ["Redness, swelling, pinpoint bleeding, dryness and small breakouts. Less commonly, temporary pigment change or infection."] },
      { title: "Preparation", text: ["Pause irritating skincare products for a few days beforehand as advised, and avoid sunburn."] },
      { title: "Aftercare", text: ["Keep the skin clean and simple, avoid make-up, heat and heavy exercise for about a day as advised, don't pick, and use broad-spectrum sunscreen every day."] }
    ]
  },
  {
    id: "scar-treatments",
    name: "Scar treatments",
    category: "aesthetic",
    summary: "A tailored combination of treatments that may help soften, flatten or blend scars.",
    sections: [
      { title: "What it is", text: ["Care for scars from acne, injury or surgery, including indented scars and raised scars (hypertrophic or keloid scars). The approach depends on the type, age and colour of the scar."] },
      { title: "How it works", text: ["Different methods suit different scars. Resurfacing treatments such as laser, peels or microneedling can soften the texture of indented scars. Raised scars may be flattened with silicone dressings or treatments injected into the scar. Some tethered, indented scars may be lifted with a minor in-clinic procedure."] },
      { title: "What to expect at the appointment", text: ["Your dermatologist examines each scar and explains which methods may help. A plan often combines more than one approach over time."] },
      { title: "Typical number of sessions", text: ["Usually several sessions over a number of months. Improvement is gradual. Scars can often be softened, but they don't disappear completely. Your dermatologist will advise."] },
      { title: "Downtime", text: ["Depends on the method, from very little to around a week."] },
      { title: "Who it may suit", text: ["People with settled scars that bother them. Newer scars often improve on their own, so timing matters."] },
      { title: "Who should discuss it with the doctor first", text: ["Anyone who tends to form raised (keloid) scars, has a darker skin tone, has active acne, is pregnant, or has recently taken acne medicine by mouth."] },
      { title: "Possible side effects", text: ["Depend on the method. They can include redness, swelling and temporary pigment change, and, after injections into a scar, local thinning or lightening of the skin."] },
      { title: "Preparation", text: ["Depends on the method chosen. Avoid sun and tanning beforehand. Your dermatologist will give you specific instructions."] },
      { title: "Aftercare", text: ["Follow the instructions for your treatment, protect the area from the sun, and be patient: scars change slowly."] }
    ]
  },
  {
    id: "skin-rejuvenation",
    name: "Skin rejuvenation",
    category: "aesthetic",
    summary: "A considered plan that may improve dullness, uneven tone, fine lines and texture linked to sun and time.",
    sections: [
      { title: "What it is", text: ["An umbrella term for treatments that support the skin's renewal. A plan may combine a medical skincare routine with in-clinic treatments such as peels, laser or light treatments, or microneedling."] },
      { title: "How it works", text: ["These treatments encourage the skin to renew its surface and build collagen, while daily sun protection helps prevent further sun damage."] },
      { title: "What to expect at the appointment", text: ["A consultation to understand your goals and set realistic expectations, followed by a plan that may combine home care with treatments in clinic."] },
      { title: "Typical number of sessions", text: ["Often a course of treatments, sometimes followed by occasional maintenance sessions. Your dermatologist will advise."] },
      { title: "Downtime", text: ["Varies with the treatment, from none to around a week."] },
      { title: "Who it may suit", text: ["People with sun-related changes, dullness, fine lines or uneven texture who want a gradual, natural-looking improvement."] },
      { title: "Who should discuss it with the doctor first", text: ["Anyone who is pregnant or breastfeeding, has a darker skin tone or a recent tan, has a history of cold sores, has active skin conditions, or takes medicines that make the skin sensitive to light."] },
      { title: "Possible side effects", text: ["Depend on the treatments chosen. They can include redness, flaking and temporary pigment change."] },
      { title: "Preparation", text: ["Daily broad-spectrum sunscreen, and any specific instructions for each treatment."] },
      { title: "Aftercare", text: ["Gentle skincare and daily sun protection. Results vary and build gradually."] }
    ]
  }
];
