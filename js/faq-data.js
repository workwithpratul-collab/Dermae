/* =========================================================
   DERMAÉ — FAQ (the one place the site reads it from)
   The wording is the approved copy from CONTENT.md ("Day 11: FAQ").
   If you change one, change the other to match.
   Each question: id (used in links like #faq-how-do-i-book-an-appointment),
   category, question, answer (paragraphs), see (treatment ids from
   js/treatments-data.js, shown as links) and keywords (extra words
   people may type; the FAQ assistant in js/assistant.js uses them).
   ========================================================= */
window.DermaeFAQ = [
  {
    id: "how-do-i-book-an-appointment",
    category: "Appointments",
    question: "How do I book an appointment?",
    answer: ["Use the booking form on this page to request a consultation. Choose the appointment type that fits most closely, or \"Not sure yet\", and the team will contact you to confirm a time that suits you. (This is a demo site, so the form doesn't send requests yet.)"],
    see: [],
    keywords: "book booking appointment appointments schedule reserve request consultation"
  },
  {
    id: "do-i-need-a-referral-from-my-doctor",
    category: "Appointments",
    question: "Do I need a referral from my doctor?",
    answer: ["You don't usually need a referral to book a private consultation. If you have a referral letter, please bring it, as it helps your dermatologist understand your history. Some insurers ask for a referral before they will cover a visit, so it's worth checking with yours."],
    see: [],
    keywords: "referral refer referred gp doctor letter"
  },
  {
    id: "how-long-does-a-first-appointment-take",
    category: "Appointments",
    question: "How long does a first appointment take?",
    answer: ["A first appointment is longer than a follow-up, because it includes a full conversation and a skin assessment. You'll be told how long to allow when your appointment is confirmed."],
    see: [],
    keywords: "long length duration minutes time take first appointment"
  },
  {
    id: "can-i-change-or-cancel-my-appointment",
    category: "Appointments",
    question: "Can I change or cancel my appointment?",
    answer: ["Yes. Please let the clinic know as early as you can, so the time can be offered to someone else. The clinic will explain its change and cancellation policy when your appointment is confirmed."],
    see: [],
    keywords: "change cancel cancellation reschedule move rearrange"
  },
  {
    id: "what-happens-at-my-first-consultation",
    category: "Consultations",
    question: "What happens at my first consultation?",
    answer: ["Your dermatologist will ask about your concerns, your skin history, your general health and the products you use, then examine your skin. They will explain what they see, talk through your options, and give you time to ask questions and decide. The Patient guide describes each step."],
    see: [],
    keywords: "happen happens expect first consultation visit"
  },
  {
    id: "what-should-i-bring-to-my-first-appointment",
    category: "Consultations",
    question: "What should I bring to my first appointment?",
    answer: ["Bring any previous reports or test results, a list of the medicines you take (including supplements), and a list or photos of the skincare and make-up you use. If your skin changes from day to day, photos of a flare-up can help. The Patient guide has a full list."],
    see: [],
    keywords: "bring take prepare preparation reports documents results"
  },
  {
    id: "should-i-wear-make-up-to-my-appointment",
    category: "Consultations",
    question: "Should I wear make-up to my appointment?",
    answer: ["Where possible, please arrive without make-up on the areas you'd like checked, so your skin can be seen clearly. If your concern involves your nails, please remove any nail polish."],
    see: [],
    keywords: "makeup make-up cosmetics nail polish wear"
  },
  {
    id: "can-i-bring-someone-with-me-or-ask-for-a-chaperone",
    category: "Consultations",
    question: "Can I bring someone with me, or ask for a chaperone?",
    answer: ["Yes. You're welcome to bring a family member or friend, and you can ask for a chaperone at any appointment."],
    see: [],
    keywords: "chaperone someone companion partner friend family parent accompany husband wife mum mom dad mother father carer"
  },
  {
    id: "will-i-have-treatment-on-the-same-day",
    category: "Consultations",
    question: "Will I have treatment on the same day?",
    answer: ["Sometimes, if it's suitable and you feel ready. Often the first visit is for assessment and planning, so you have time to consider your options before any treatment begins."],
    see: [],
    keywords: "same day immediately straight away first visit"
  },
  {
    id: "how-do-i-know-which-treatment-is-right-for-me",
    category: "Treatments",
    question: "How do I know which treatment is right for me?",
    answer: ["Your dermatologist will assess your skin and explain which options may suit you, and why. The Treatments section gives general information about each condition and treatment, to help you prepare your questions."],
    see: [],
    keywords: "which right suitable suit choose recommend best option"
  },
  {
    id: "do-treatments-hurt",
    category: "Treatments",
    question: "Do treatments hurt?",
    answer: ["It depends on the treatment, and everyone feels it differently. Many people describe warmth, tingling or a snapping sensation. A numbing cream or cooling is used for some treatments. Your dermatologist will explain what you may feel before you begin."],
    see: ["chemical-peels", "laser-treatments", "microneedling"],
    keywords: "hurt hurts pain painful sore uncomfortable discomfort numbing comfortable"
  },
  {
    id: "how-many-sessions-will-i-need",
    category: "Treatments",
    question: "How many sessions will I need?",
    answer: ["It varies with the treatment, your skin and your goals. Many aesthetic treatments are given as a course of sessions some weeks apart. Your dermatologist will advise."],
    see: ["chemical-peels", "laser-treatments", "microneedling", "skin-rejuvenation"],
    keywords: "sessions session many course times visits number"
  },
  {
    id: "is-there-any-downtime-after-treatment",
    category: "Treatments",
    question: "Is there any downtime after treatment?",
    answer: ["Some treatments have little or no recovery time; others can leave the skin red, flaking or peeling for several days or longer. You'll be told what to expect before you decide."],
    see: ["chemical-peels", "laser-treatments", "microneedling", "scar-treatments"],
    keywords: "downtime recovery recover red redness peeling work off heal healing"
  },
  {
    id: "are-treatments-suitable-for-darker-skin-tones",
    category: "Treatments",
    question: "Are treatments suitable for darker skin tones?",
    answer: ["Many treatments can be suitable, with care. Some peels and lasers carry a higher risk of pigment change on darker skin, so the type and settings are chosen carefully, and a patch test may be suggested first. Your dermatologist will advise."],
    see: ["pigmentation-concerns", "chemical-peels", "laser-treatments"],
    keywords: "dark darker skin tone tones black brown colour color melanin"
  },
  {
    id: "when-will-i-see-results",
    category: "Treatments",
    question: "When will I see results?",
    answer: ["Changes in the skin are usually gradual, often over weeks or months, and results vary from person to person. Your dermatologist will explain what may be realistic for you."],
    see: [],
    keywords: "results result see work working effect improvement"
  },
  {
    id: "how-much-does-a-consultation-cost",
    category: "Fees and payments",
    question: "How much does a consultation cost?",
    answer: ["Fees are explained at or before your consultation, so you'll know the cost before you commit. We don't list prices on this website."],
    see: [],
    keywords: "cost costs price prices fee fees much expensive charge pay consultation"
  },
  {
    id: "will-i-know-the-cost-of-treatment-before-i-agree-to-it",
    category: "Fees and payments",
    question: "Will I know the cost of treatment before I agree to it?",
    answer: ["Yes. Your treatment plan sets out the options, how many visits may be needed and the cost, in writing. You'll have time to decide, and you're never asked to commit on the spot."],
    see: [],
    keywords: "cost price fee quote plan upfront commit agree treatment much peel laser microneedling scar rejuvenation"
  },
  {
    id: "can-i-use-health-insurance",
    category: "Fees and payments",
    question: "Can I use health insurance?",
    answer: ["It depends on your insurer and the reason for your visit. Medical skin conditions are more often covered than aesthetic treatments. Please check with your insurer before your appointment; the clinic can provide the paperwork they may ask for."],
    see: [],
    keywords: "insurance insurer insured covered cover claim"
  },
  {
    id: "how-is-my-personal-information-kept-private",
    category: "Privacy and safety",
    question: "How is my personal information kept private?",
    answer: ["Your records are kept confidential and stored securely. They are used only for your care and shared only with your permission, or where the law requires it."],
    see: [],
    keywords: "privacy private data records information confidential personal safe secure security stored storage"
  },
  {
    id: "will-you-take-photographs-of-my-skin",
    category: "Privacy and safety",
    question: "Will you take photographs of my skin?",
    answer: ["Only with your consent. Photographs help compare progress over time and are used only for your care. They are never shared or used for marketing without your separate, written permission."],
    see: [],
    keywords: "photo photos photograph photographs pictures images camera"
  },
  {
    id: "how-do-you-keep-treatments-safe-and-hygienic",
    category: "Privacy and safety",
    question: "How do you keep treatments safe and hygienic?",
    answer: ["Reusable instruments are sterilised between every patient, single-use items are used where appropriate, and lasers are used only by trained staff with eye protection. The Approach and technology section explains these standards."],
    see: [],
    keywords: "hygiene hygienic clean sterile sterilised sterilized safe safety equipment"
  },
  {
    id: "what-is-a-patch-test-and-will-i-need-one",
    category: "Privacy and safety",
    question: "What is a patch test, and will I need one?",
    answer: ["A patch test treats a small area first, to see how your skin responds before a full treatment. It may be suggested before some peels and laser treatments, especially for sensitive skin or darker skin tones."],
    see: ["chemical-peels", "laser-treatments"],
    keywords: "patch test testing"
  },
  {
    id: "is-derma-a-real-clinic",
    category: "General",
    question: "Is DERMAÉ a real clinic?",
    answer: ["No. DERMAÉ is a fictional clinic created as a design demo. Its clinic details, doctor and quotes are illustrative, and nothing on this site is medical advice."],
    see: [],
    keywords: "real fictional fake demo exist genuine"
  },
  {
    id: "can-i-ask-a-medical-question-online",
    category: "General",
    question: "Can I ask a medical question online?",
    answer: ["We can't give medical advice online, because your skin needs to be seen and assessed in person. Please book a consultation. If you have severe or rapidly worsening symptoms, or you feel unwell, seek urgent medical care."],
    see: [],
    keywords: "online ask question advice chat email"
  },
  {
    id: "where-is-the-clinic-and-when-is-it-open",
    category: "General",
    question: "Where is the clinic, and when is it open?",
    answer: ["The Contact section shows the address, opening hours and ways to get in touch. All of these are fictional demo details."],
    see: [],
    keywords: "where address location open opening hours find directions map located"
  }
];
