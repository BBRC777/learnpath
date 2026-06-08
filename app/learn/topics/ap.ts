// app/learn/topics/ap.ts — Batch 2a: AP exams
import type { TopicData } from './types'

export const apTopics: Record<string, TopicData> = {
  'ap-biology': {
    meta: { title: "AP Biology Study Plan, AI-Built | Learnpath", description: "Get a focused AP Biology study plan in seconds — the big ideas, units, and free-response skills the exam tests, with flashcards and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Biology", description: "A focused AP Biology plan in seconds — cells to ecology, with FRQ practice, spaced recall, and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Biology", sub: "Tell it your exam date or a unit you're stuck on, and get a focused AP Biology plan in seconds — from cell biology to ecology — with practice, flashcards, and a tutor for when you're stuck." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it when you test and the plan fits the units into the weeks you have, with review built in." },
      { title: "Built around the free-response.", desc: "AP Bio is won on the FRQs. Lessons build the data-analysis and experimental-design thinking the exam rewards." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface processes and vocabulary on a schedule, so they're there on test day." },
    ],
    faq: [
      { q: "When is the AP Biology exam?", a: "Early May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Biology plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Biology cover?", a: "Chemistry of life, cells, cellular energetics, cell communication and the cell cycle, heredity, gene expression, natural selection, and ecology." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Biology — 3-Week Focused Review", subtitle: "Cells to ecology, with FRQ practice", overview: "A three-week plan across the AP Biology units — chemistry of life and cells, energetics and genetics, then gene expression, evolution, and ecology — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Chemistry of life & cells", milestone: "Explain how cell structure supports function", quizCount: 1, days: [
          { day: 1, title: "Water, biomolecules & enzymes", description: "Properties of water, macromolecules, and enzyme function.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cell structure & transport", description: "Organelles, membranes, and how things cross them.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Cell communication", description: "Signaling pathways and feedback.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Cells, biomolecules, and signaling.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Energetics & genetics", milestone: "Trace energy and information through the cell", quizCount: 1, days: [
          { day: 1, title: "Photosynthesis & respiration", description: "Energy capture and release, and where each happens.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cell cycle & division", description: "Mitosis, meiosis, and regulation.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Heredity", description: "Mendelian genetics, probability, and pedigrees.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Energetics and inheritance.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Gene expression, evolution & ecology", milestone: "Connect molecular biology to populations", quizCount: 1, days: [
          { day: 1, title: "Gene expression & regulation", description: "Transcription, translation, and how it's controlled.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Natural selection & evolution", description: "Evidence, Hardy–Weinberg, and speciation.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Ecology", description: "Energy flow, populations, and ecosystems.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Data-analysis and experimental-design free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-chemistry': {
    meta: { title: "AP Chemistry Study Plan, AI-Built | Learnpath", description: "Get a focused AP Chemistry study plan in seconds — atomic structure, reactions, equilibrium, and FRQs, with flashcards and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Chemistry", description: "A focused AP Chemistry plan in seconds — atomic structure to equilibrium, with practice, spaced recall, and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Chemistry", sub: "Tell it your exam date or a unit you're stuck on, and get a focused AP Chemistry plan in seconds — atomic structure to equilibrium and acids/bases — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your test date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Reasoning, not just plugging in.", desc: "AP Chem rewards explaining why. Lessons build particle-level reasoning, the heart of the free-response." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface trends, formulas, and reaction types on a schedule so they stick." },
    ],
    faq: [
      { q: "When is the AP Chemistry exam?", a: "Early May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Chemistry plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Chemistry cover?", a: "Atomic structure and periodicity, bonding and molecular geometry, reactions and stoichiometry, thermodynamics, kinetics, equilibrium, acids and bases, and electrochemistry." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Chemistry — 3-Week Focused Review", subtitle: "Atomic structure to equilibrium", overview: "A three-week plan across AP Chemistry — atomic structure and bonding, reactions, stoichiometry and energy, then equilibrium, acids/bases, and electrochemistry — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Atomic structure & bonding", milestone: "Predict properties from structure", quizCount: 1, days: [
          { day: 1, title: "Atomic structure & spectroscopy", description: "Electron configuration, periodic trends, and PES.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Bonding", description: "Ionic, covalent, and metallic bonding and forces.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Molecular geometry & IMFs", description: "VSEPR shapes and intermolecular forces.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Structure, bonding, and trends.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Reactions & energy", milestone: "Quantify reactions and predict spontaneity", quizCount: 1, days: [
          { day: 1, title: "Reactions & stoichiometry", description: "Reaction types, moles, and limiting reagents.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Thermodynamics", description: "Enthalpy, entropy, and Gibbs free energy.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Kinetics", description: "Rate laws, mechanisms, and catalysts.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Stoichiometry, thermo, and kinetics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Equilibrium & electrochemistry", milestone: "Work equilibrium and acid–base problems", quizCount: 1, days: [
          { day: 1, title: "Equilibrium", description: "Keq, Q, and Le Châtelier's principle.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Acids & bases", description: "pH, Ka/Kb, buffers, and titrations.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Electrochemistry", description: "Redox, cells, and cell potential.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Particle-level explanations and calculations.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-physics-1': {
    meta: { title: "AP Physics 1 Study Plan, AI-Built | Learnpath", description: "Get a focused AP Physics 1 study plan in seconds — kinematics, forces, energy, and the free-response, with flashcards and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Physics 1", description: "A focused AP Physics 1 plan in seconds — kinematics to waves, with practice, spaced recall, and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Physics 1", sub: "Tell it your exam date or a unit you're stuck on, and get a focused AP Physics 1 plan in seconds — kinematics, forces, energy, and more — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Explain, don't just calculate.", desc: "AP Physics 1's free-response asks you to reason and justify. Lessons build that, not just the algebra." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface relationships and definitions on a schedule so they hold to test day." },
    ],
    faq: [
      { q: "Is AP Physics 1 algebra- or calculus-based?", a: "Algebra-based. Learnpath's plan focuses on understanding the relationships and justifying your reasoning, which is what the exam rewards." },
      { q: "Can I build an AP Physics 1 plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Physics 1 cover?", a: "Kinematics, dynamics, circular motion and gravitation, energy, momentum, rotation, simple harmonic motion, and fluids." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Physics 1 — 3-Week Focused Review", subtitle: "Kinematics to waves and fluids", overview: "A three-week plan across AP Physics 1 — kinematics and forces, then energy, momentum, and rotation, then oscillations, waves, and fluids — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Kinematics & forces", milestone: "Draw free-body diagrams and solve for motion", quizCount: 1, days: [
          { day: 1, title: "Kinematics", description: "Motion graphs and the equations of motion.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Newton's laws", description: "Forces, free-body diagrams, and friction.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Circular motion & gravitation", description: "Centripetal force and universal gravitation.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Kinematics and dynamics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Energy, momentum & rotation", milestone: "Apply conservation laws to a system", quizCount: 1, days: [
          { day: 1, title: "Work & energy", description: "The work–energy theorem and conservation.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Momentum & collisions", description: "Impulse, conservation, and collision types.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Rotation", description: "Torque, angular motion, and rotational inertia.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Energy, momentum, and rotation.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Oscillations, waves & fluids", milestone: "Reason about periodic motion and fluids", quizCount: 1, days: [
          { day: 1, title: "Simple harmonic motion", description: "Springs, pendulums, and period.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Waves & sound", description: "Wave properties, superposition, and standing waves.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Fluids", description: "Density, pressure, buoyancy, and continuity.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Paragraph-argument and lab free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-physics-c': {
    meta: { title: "AP Physics C Study Plan, AI-Built | Learnpath", description: "Get a focused AP Physics C study plan in seconds — calculus-based mechanics and E&M, with practice, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for AP Physics C", description: "A focused AP Physics C plan in seconds — calculus-based mechanics and E&M, with practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Physics C", sub: "Tell it your exam date or a unit you're stuck on, and get a focused AP Physics C plan in seconds — calculus-based mechanics and electricity and magnetism — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exams.", desc: "Mechanics and E&M are separate exams. Tell it your dates and the plan fits both into the time you have." },
      { title: "Calculus where it counts.", desc: "Lessons build the calculus reasoning — derivatives and integrals in physics — that separates Physics C from Physics 1." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface derivations and relationships on a schedule so they hold to test day." },
    ],
    faq: [
      { q: "How is AP Physics C different from Physics 1?", a: "It's calculus-based and split into two exams — Mechanics and Electricity & Magnetism. Learnpath plans for either or both." },
      { q: "Can I build an AP Physics C plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Physics C cover?", a: "Mechanics — kinematics, Newton's laws, energy, momentum, rotation, and oscillations — and Electricity & Magnetism — fields, potential, circuits, and induction, all with calculus." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Physics C — 3-Week Focused Review", subtitle: "Calculus-based mechanics and E&M", overview: "A three-week plan across AP Physics C — mechanics with calculus, then energy, momentum, and rotation, then the core of electricity and magnetism — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "40 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Mechanics: motion & forces", milestone: "Use calculus to relate position, velocity, and force", quizCount: 1, days: [
          { day: 1, title: "Kinematics with calculus", description: "Derivatives and integrals of motion.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Newton's laws", description: "Forces, including drag and variable forces.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Work & energy", description: "The work integral and conservation.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Calculus-based mechanics.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Mechanics: systems & rotation", milestone: "Apply momentum and rotational dynamics", quizCount: 1, days: [
          { day: 1, title: "Momentum & center of mass", description: "Impulse, collisions, and the center of mass.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Rotation", description: "Torque, moment of inertia, and angular momentum.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Oscillations & gravitation", description: "SHM and orbital mechanics.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Rotation and oscillations.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Electricity & magnetism", milestone: "Apply Gauss's law and analyze circuits", quizCount: 1, days: [
          { day: 1, title: "Electric fields & Gauss's law", description: "Fields, flux, and Gauss's law.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Potential & capacitance", description: "Electric potential and capacitors.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Circuits & magnetism", description: "RC circuits, magnetic fields, and induction.", type: "lesson", duration: "40 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Calculus-based mechanics and E&M free-response.", type: "exercise", duration: "35 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exams.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-calculus-ab': {
    meta: { title: "AP Calculus AB Study Plan, AI-Built | Learnpath", description: "Get a focused AP Calculus AB study plan in seconds — limits, derivatives, integrals, and FRQs, with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for AP Calculus AB", description: "A focused AP Calc AB plan in seconds — limits to integrals, with practice, spaced recall, and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Calculus AB", sub: "Tell it your exam date or a topic you're stuck on, and get a focused AP Calculus AB plan in seconds — limits, derivatives, and integrals — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the topics into the weeks you have, with review built in." },
      { title: "Built around the free-response.", desc: "Calc AB rewards showing work and justifying. Lessons build the notation and reasoning the FRQs want." },
      { title: "Practice that sticks.", desc: "Flashcards and quizzes resurface rules and theorems on a schedule so they're automatic." },
    ],
    faq: [
      { q: "When is the AP Calculus AB exam?", a: "Early-to-mid May. Learnpath back-schedules from your date and fits the topics into the time you have." },
      { q: "Can I build an AP Calc AB plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Calculus AB cover?", a: "Limits and continuity, derivatives and their applications, integrals and the Fundamental Theorem, and differential equations." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Calculus AB — 3-Week Focused Review", subtitle: "Limits to integrals", overview: "A three-week plan across AP Calculus AB — limits and derivatives, applications of derivatives, then integrals and their applications — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Limits & derivatives", milestone: "Differentiate using all the major rules", quizCount: 1, days: [
          { day: 1, title: "Limits & continuity", description: "Evaluating limits and where functions break.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The derivative", description: "Definition, power rule, and basic derivatives.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Product, quotient & chain rules", description: "Differentiating combinations of functions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Limits and differentiation.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's rules.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Applications of derivatives", milestone: "Solve optimization and related-rates problems", quizCount: 1, days: [
          { day: 1, title: "Curve analysis", description: "Increasing/decreasing, concavity, and extrema.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Related rates", description: "Differentiating relationships over time.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Optimization & the MVT", description: "Maxima, minima, and the Mean Value Theorem.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Applications of derivatives.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Integrals & applications", milestone: "Set up and evaluate definite integrals", quizCount: 1, days: [
          { day: 1, title: "The integral & FTC", description: "Antiderivatives and the Fundamental Theorem.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Techniques & u-substitution", description: "Evaluating integrals by substitution.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Area, volume & diff-eq", description: "Accumulation, volumes, and basic differential equations.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Calculator and no-calculator free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-calculus-bc': {
    meta: { title: "AP Calculus BC Study Plan, AI-Built | Learnpath", description: "Get a focused AP Calculus BC study plan in seconds — all of AB plus series, parametric, and polar, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Calculus BC", description: "A focused AP Calc BC plan in seconds — AB plus series and parametric/polar, with practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Calculus BC", sub: "Tell it your exam date or a topic you're stuck on, and get a focused AP Calculus BC plan in seconds — everything in AB plus series, parametric, and polar — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the topics into the weeks you have, with review built in." },
      { title: "The BC-only topics, prioritized.", desc: "Series, parametric, and polar carry the BC weight. The plan makes sure they get real time." },
      { title: "Practice that sticks.", desc: "Flashcards and quizzes resurface convergence tests and rules on a schedule so they're automatic." },
    ],
    faq: [
      { q: "How is BC different from AB?", a: "BC covers everything in AB plus sequences and series, parametric and polar functions, and more integration techniques. Learnpath plans for the full BC scope." },
      { q: "Can I build an AP Calc BC plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Calculus BC cover?", a: "All of Calculus AB, plus advanced integration, parametric, polar, and vector functions, and sequences and series including Taylor series." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Calculus BC — 3-Week Focused Review", subtitle: "AB essentials plus series and polar", overview: "A three-week plan across AP Calculus BC — derivatives and applications, integrals and advanced techniques, then parametric, polar, and series — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Derivatives & applications", milestone: "Differentiate and apply it fluently", quizCount: 1, days: [
          { day: 1, title: "Limits & derivatives", description: "Core differentiation rules, fast.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Applications of derivatives", description: "Curve analysis, related rates, optimization.", type: "lesson", duration: "30 min" },
          { day: 3, title: "L'Hôpital & advanced", description: "Indeterminate forms and implicit differentiation.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Derivatives and applications.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's rules.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Integrals & techniques", milestone: "Integrate with multiple techniques", quizCount: 1, days: [
          { day: 1, title: "Integrals & FTC", description: "Antiderivatives and accumulation.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Advanced techniques", description: "Parts, partial fractions, and improper integrals.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Applications", description: "Area, volume, arc length, and differential equations.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Integration techniques and applications.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Parametric, polar & series", milestone: "Test series for convergence and build Taylor series", quizCount: 1, days: [
          { day: 1, title: "Parametric & polar", description: "Calculus with parametric and polar curves.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Sequences & series", description: "Convergence tests and the big ones to know.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Taylor & Maclaurin series", description: "Power series and error bounds.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Calculator and no-calculator free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-statistics': {
    meta: { title: "AP Statistics Study Plan, AI-Built | Learnpath", description: "Get a focused AP Statistics study plan in seconds — data, probability, and inference, with free-response practice, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Statistics", description: "A focused AP Statistics plan in seconds — data to inference, with practice, spaced recall, and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Statistics", sub: "Tell it your exam date or a unit you're stuck on, and get a focused AP Statistics plan in seconds — exploring data, probability, and inference — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Built around explaining in context.", desc: "AP Stats is won by communicating, not just computing. Lessons build the 'in context' answers the FRQs demand." },
      { title: "Practice that sticks.", desc: "Flashcards resurface conditions, definitions, and which test to use on a schedule." },
    ],
    faq: [
      { q: "When is the AP Statistics exam?", a: "Early-to-mid May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Statistics plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Statistics cover?", a: "Exploring one- and two-variable data, collecting data through sampling and experiments, probability and distributions, and inference with confidence intervals and significance tests." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Statistics — 3-Week Focused Review", subtitle: "Data to inference", overview: "A three-week plan across AP Statistics — exploring data and study design, probability and distributions, then inference — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Data & design", milestone: "Describe distributions and design a study", quizCount: 1, days: [
          { day: 1, title: "Exploring data", description: "Shape, center, spread, and outliers.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Two-variable data", description: "Scatterplots, correlation, and regression.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Sampling & experiments", description: "Bias, sampling methods, and experimental design.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Data and study design.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Probability & distributions", milestone: "Work with random variables and the normal model", quizCount: 1, days: [
          { day: 1, title: "Probability rules", description: "Conditional probability and independence.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Random variables", description: "Means, variances, and combining variables.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Binomial & normal", description: "Binomial, geometric, and the normal distribution.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Probability and distributions.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Inference", milestone: "Build intervals and run significance tests", quizCount: 1, days: [
          { day: 1, title: "Sampling distributions", description: "The CLT and why inference works.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Confidence intervals", description: "Intervals for means and proportions.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Significance tests", description: "Hypothesis tests, including chi-square.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "The investigative task and inference in context.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-computer-science-a': {
    meta: { title: "AP Computer Science A Plan, AI-Built | Learnpath", description: "Get a focused AP Computer Science A study plan in seconds — Java, objects, arrays, and the FRQs, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP CS A", description: "A focused AP CS A plan in seconds — Java fundamentals to recursion, with practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Computer Science A", sub: "Tell it your exam date or a topic you're stuck on, and get a focused AP CS A plan in seconds — Java, objects, and arrays — with hands-on practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Built around the free-response code.", desc: "Half the exam is writing Java by hand. Lessons build the method- and class-writing the FRQs require." },
      { title: "Practice that sticks.", desc: "Flashcards resurface syntax and the Java library methods you're expected to know." },
    ],
    faq: [
      { q: "What language is AP CS A in?", a: "Java. Learnpath's plan builds the Java syntax and object-oriented thinking the exam tests, with hands-on practice." },
      { q: "Can I build an AP CS A plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP CS A cover?", a: "Primitive types, objects and classes, boolean logic and control flow, methods, arrays and ArrayLists, 2D arrays, inheritance, and recursion." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Computer Science A — 3-Week Focused Review", subtitle: "Java fundamentals to recursion", overview: "A three-week plan across AP CS A — Java basics and control flow, classes and arrays, then 2D arrays, inheritance, and recursion — with code practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Java basics & control flow", milestone: "Write methods with loops and conditionals", quizCount: 1, days: [
          { day: 1, title: "Primitives & objects", description: "Types, variables, and String methods.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Boolean logic & conditionals", description: "if/else and compound conditions.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Loops & methods", description: "for and while loops, and writing methods.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Trace and predict Java output.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on syntax.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Classes & arrays", milestone: "Design a class and process an array", quizCount: 1, days: [
          { day: 1, title: "Writing classes", description: "Constructors, instance variables, and methods.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Arrays", description: "Declaring, traversing, and modifying arrays.", type: "lesson", duration: "30 min" },
          { day: 3, title: "ArrayLists", description: "Dynamic lists and common operations.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Classes and arrays.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "2D arrays, inheritance & recursion", milestone: "Write FRQ-style methods over data", quizCount: 1, days: [
          { day: 1, title: "2D arrays", description: "Nested loops over a grid.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Inheritance & polymorphism", description: "Subclasses, overriding, and the Object class.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Recursion", description: "Base cases and recursive methods.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Write full methods and classes by hand.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-computer-science-principles': {
    meta: { title: "AP CS Principles Plan, AI-Built | Learnpath", description: "Get a focused AP Computer Science Principles study plan in seconds — data, algorithms, the internet, and impact, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP CSP", description: "A focused AP CSP plan in seconds — data and the internet to algorithms and impact, with an AI tutor." },
    hero: { h1: "Your AI study partner for AP Computer Science Principles", sub: "Tell it your exam date or a topic you're stuck on, and get a focused AP CSP plan in seconds — data, algorithms, the internet, and the impact of computing — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Concepts and the Create task.", desc: "CSP is a written exam plus a programming project. Lessons cover the big ideas and the reasoning the multiple-choice rewards." },
      { title: "Practice that sticks.", desc: "Flashcards resurface vocabulary — abstraction, the internet, data — on a schedule so it sticks." },
    ],
    faq: [
      { q: "Is AP CSP about one programming language?", a: "No — it's language-agnostic and broader than CS A, covering how computing works and its impact, plus a Create programming task. Learnpath plans around the exam's big ideas." },
      { q: "Can I build an AP CSP plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP CSP cover?", a: "Data and information, the internet, algorithms and programming, abstraction, and the impacts of computing — plus the Create performance task." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP CS Principles — 3-Week Focused Review", subtitle: "Data and the internet to impact", overview: "A three-week plan across AP CSP — data and the internet, algorithms and programming, then abstraction and the impact of computing — with practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Data & the internet", milestone: "Explain how data and networks work", quizCount: 1, days: [
          { day: 1, title: "Binary & data", description: "Bits, encoding, and data compression.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The internet", description: "Protocols, packets, and how networks scale.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Cybersecurity & data analysis", description: "Encryption, privacy, and drawing conclusions from data.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Data and the internet.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on vocabulary.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Algorithms & programming", milestone: "Trace algorithms and reason about code", quizCount: 1, days: [
          { day: 1, title: "Algorithms", description: "Sequencing, selection, iteration, and efficiency.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Programming concepts", description: "Variables, lists, procedures, and parameters.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Abstraction", description: "Procedural abstraction and managing complexity.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Algorithms and programming.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Impact & exam practice", milestone: "Reason about computing's effects and the Create task", quizCount: 1, days: [
          { day: 1, title: "Impact of computing", description: "Benefits, harms, bias, and the digital divide.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The Create task", description: "What graders look for in your project and writeup.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Exam strategy", description: "Reading the multiple-choice and code questions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Practice set & cumulative quiz", description: "Mixed multiple-choice across the big ideas.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-us-history': {
    meta: { title: "AP US History Study Plan, AI-Built | Learnpath", description: "Get a focused APUSH study plan in seconds — the time periods, themes, and DBQ/LEQ skills the exam tests, with flashcards and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP US History", description: "A focused APUSH plan in seconds — colonial era to the present, with essay practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP US History", sub: "Tell it your exam date or a period you're shaky on, and get a focused APUSH plan in seconds — 1491 to the present — with essay practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the time periods into the weeks you have, with review built in." },
      { title: "Built around the DBQ and LEQ.", desc: "APUSH is won on the essays. Lessons build the thesis, evidence, and complexity the rubrics reward." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface key events, causes, and effects on a schedule so the timeline holds." },
    ],
    faq: [
      { q: "When is the APUSH exam?", a: "Early-to-mid May. Learnpath back-schedules from your date and fits the time periods into the time you have." },
      { q: "Can I build an APUSH plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does APUSH cover?", a: "US history from 1491 to the present across nine time periods, organized by themes, plus document-based and long-essay writing skills." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP US History — 3-Week Focused Review", subtitle: "Colonial era to the present", overview: "A three-week plan across APUSH — the colonial era and early republic, expansion through the Gilded Age, then the modern era — with DBQ and LEQ practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Founding to early republic (1491–1800)", milestone: "Explain colonization and the new nation", quizCount: 1, days: [
          { day: 1, title: "Contact & colonization", description: "Periods 1–2: encounter, colonial regions, and society.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Revolution & Constitution", description: "Period 3: independence and the founding.", type: "lesson", duration: "30 min" },
          { day: 3, title: "DBQ skills", description: "Thesis, documents, and outside evidence.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Periods 1–3.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's events.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Expansion to Gilded Age (1800–1898)", milestone: "Connect expansion, conflict, and industry", quizCount: 1, days: [
          { day: 1, title: "Expansion & reform", description: "Period 4: democracy, markets, and reform.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Civil War & Reconstruction", description: "Period 5: sectionalism, war, and aftermath.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Industrialization", description: "Period 6: the Gilded Age and the West.", type: "lesson", duration: "30 min" },
          { day: 4, title: "LEQ skills", description: "Building an argument with continuity and change.", type: "lesson", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Modern US (1898–present)", milestone: "Trace the US through the twentieth century", quizCount: 1, days: [
          { day: 1, title: "Empire & the world wars", description: "Period 7: Progressivism, the wars, and the Depression.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cold War & rights", description: "Period 8: postwar America and civil rights.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Contemporary era", description: "Period 9: globalization and recent decades.", type: "lesson", duration: "30 min" },
          { day: 4, title: "DBQ/LEQ practice & quiz", description: "A timed essay with full review.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-world-history': {
    meta: { title: "AP World History Study Plan, AI-Built | Learnpath", description: "Get a focused AP World History: Modern study plan in seconds — 1200 to the present, with DBQ/LEQ practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP World History", description: "A focused AP World History plan in seconds — 1200 to the present, with essay practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP World History", sub: "Tell it your exam date or a unit you're shaky on, and get a focused AP World History: Modern plan in seconds — 1200 to the present — with essay practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the eras into the weeks you have, with review built in." },
      { title: "Built around the DBQ and LEQ.", desc: "Lessons build the thesis, evidence, and comparison across regions the rubrics reward." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface states, networks, and turning points on a schedule." },
    ],
    faq: [
      { q: "Which AP World History course is this?", a: "AP World History: Modern, covering 1200 CE to the present. Learnpath back-schedules from your date across the four time periods." },
      { q: "Can I build an AP World History plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP World History cover?", a: "Global history from 1200 to the present — empires and networks, land- and sea-based powers, revolutions and industrialization, and the modern globalized world." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP World History — 3-Week Focused Review", subtitle: "1200 to the present", overview: "A three-week plan across AP World History: Modern — the post-classical and early modern worlds, then revolutions and industrialization, then the twentieth century and globalization — with DBQ/LEQ practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Empires & networks (1200–1750)", milestone: "Compare states and trade networks", quizCount: 1, days: [
          { day: 1, title: "The post-classical world", description: "1200–1450: states, religions, and trade routes.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Land & maritime empires", description: "1450–1750: gunpowder empires and exploration.", type: "lesson", duration: "30 min" },
          { day: 3, title: "DBQ skills", description: "Thesis, documents, and sourcing.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "1200–1750.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's content.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Revolutions & industry (1750–1900)", milestone: "Connect revolutions and industrialization", quizCount: 1, days: [
          { day: 1, title: "Atlantic revolutions", description: "Political revolutions and their ideas.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Industrialization", description: "The Industrial Revolution and its effects.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Imperialism", description: "New imperialism and global responses.", type: "lesson", duration: "30 min" },
          { day: 4, title: "LEQ skills", description: "Argument, continuity, and change over time.", type: "lesson", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "The modern world (1900–present)", milestone: "Trace the global twentieth century", quizCount: 1, days: [
          { day: 1, title: "Global conflict", description: "The world wars and the interwar years.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cold War & decolonization", description: "Superpowers and new nations.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Globalization", description: "Technology, economics, and a connected world.", type: "lesson", duration: "30 min" },
          { day: 4, title: "DBQ/LEQ practice & quiz", description: "A timed essay with full review.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-european-history': {
    meta: { title: "AP European History Plan, AI-Built | Learnpath", description: "Get a focused AP European History study plan in seconds — 1450 to the present, with DBQ/LEQ practice and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for AP European History", description: "A focused AP Euro plan in seconds — Renaissance to the present, with essay practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP European History", sub: "Tell it your exam date or a period you're shaky on, and get a focused AP Euro plan in seconds — the Renaissance to the present — with essay practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the eras into the weeks you have, with review built in." },
      { title: "Built around the DBQ and LEQ.", desc: "Lessons build the thesis, evidence, and complexity the rubrics reward." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface movements, rulers, and turning points on a schedule." },
    ],
    faq: [
      { q: "What years does AP European History cover?", a: "Roughly 1450 to the present. Learnpath back-schedules from your date across the periods, from the Renaissance to the modern era." },
      { q: "Can I build an AP Euro plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP European History cover?", a: "The Renaissance and Reformation, exploration, absolutism and the Enlightenment, the French and Industrial Revolutions, and the nineteenth and twentieth centuries." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP European History — 3-Week Focused Review", subtitle: "Renaissance to the present", overview: "A three-week plan across AP Euro — the Renaissance, Reformation, and exploration, then absolutism through the revolutions, then industrialization to the present — with DBQ/LEQ practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Renaissance & Reformation (1450–1648)", milestone: "Explain the era's intellectual and religious change", quizCount: 1, days: [
          { day: 1, title: "Renaissance & exploration", description: "Humanism, the Renaissance, and the age of exploration.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Reformation", description: "Protestant and Catholic Reformations and the wars of religion.", type: "lesson", duration: "30 min" },
          { day: 3, title: "DBQ skills", description: "Thesis, documents, and sourcing.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "1450–1648.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's content.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Absolutism to revolution (1648–1815)", milestone: "Connect state power and Enlightenment ideas", quizCount: 1, days: [
          { day: 1, title: "Absolutism & constitutionalism", description: "State-building in France and England.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Scientific Revolution & Enlightenment", description: "New science and Enlightenment thought.", type: "lesson", duration: "30 min" },
          { day: 3, title: "French Revolution & Napoleon", description: "Revolution, terror, and empire.", type: "lesson", duration: "30 min" },
          { day: 4, title: "LEQ skills", description: "Argument and change over time.", type: "lesson", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Industrial to modern (1815–present)", milestone: "Trace Europe through the modern era", quizCount: 1, days: [
          { day: 1, title: "Industrialization & -isms", description: "Industry, nationalism, and nineteenth-century ideologies.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The world wars", description: "WWI, the interwar years, and WWII.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Cold War & contemporary Europe", description: "Division, integration, and the present.", type: "lesson", duration: "30 min" },
          { day: 4, title: "DBQ/LEQ practice & quiz", description: "A timed essay with full review.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-us-government': {
    meta: { title: "AP US Government Study Plan, AI-Built | Learnpath", description: "Get a focused AP US Government & Politics study plan in seconds — foundations, branches, and required cases, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP US Government", description: "A focused AP Gov plan in seconds — foundations to participation, with the required documents and cases, and an AI tutor." },
    hero: { h1: "Your AI study partner for AP US Government", sub: "Tell it your exam date or a unit you're shaky on, and get a focused AP Gov plan in seconds — foundations, the branches, and civil liberties — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "The required documents and cases.", desc: "AP Gov tests fifteen Supreme Court cases and nine foundational documents. The plan makes sure you know them." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface cases, clauses, and concepts on a schedule so they stick." },
    ],
    faq: [
      { q: "When is the AP Gov exam?", a: "Early May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Gov plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP US Government cover?", a: "Constitutional foundations, the branches of government, civil liberties and civil rights, political ideologies and beliefs, and participation — plus required documents and Supreme Court cases." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP US Government — 3-Week Focused Review", subtitle: "Foundations to participation", overview: "A three-week plan across AP US Government — constitutional foundations, the three branches and civil liberties/rights, then political beliefs and participation — with the required documents and cases and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Foundations of democracy", milestone: "Explain the Constitution and federalism", quizCount: 1, days: [
          { day: 1, title: "Founding ideals & documents", description: "Democratic ideals and the foundational documents.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The Constitution", description: "Separation of powers and checks and balances.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Federalism", description: "Federal vs. state power and key cases.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Foundations and federalism.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on documents and cases.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Branches, liberties & rights", milestone: "Connect the branches and the Bill of Rights", quizCount: 1, days: [
          { day: 1, title: "Legislative & executive", description: "Congress, the presidency, and the bureaucracy.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The judiciary", description: "The courts, judicial review, and key cases.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Civil liberties & civil rights", description: "The Bill of Rights and landmark cases.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Branches, liberties, and rights.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Beliefs & participation", milestone: "Analyze political behavior and the argument essay", quizCount: 1, days: [
          { day: 1, title: "Political ideologies & beliefs", description: "Ideology, polling, and political socialization.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Participation & elections", description: "Voting, parties, interest groups, and the media.", type: "lesson", duration: "30 min" },
          { day: 3, title: "The argument essay", description: "Using documents and evidence to make a claim.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Free-response including the argument essay.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-psychology': {
    meta: { title: "AP Psychology Study Plan, AI-Built | Learnpath", description: "Get a focused AP Psychology study plan in seconds — the units, theories, and terms the exam tests, with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for AP Psychology", description: "A focused AP Psych plan in seconds — biology of behavior to social, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Psychology", sub: "Tell it your exam date or a unit you're shaky on, and get a focused AP Psychology plan in seconds — from the biology of behavior to social psychology — with flashcards and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Own the vocabulary.", desc: "AP Psych rewards recognizing terms and theories. Flashcards and lessons lock the definitions in." },
      { title: "Spaced recall built in.", desc: "Hundreds of terms resurface on a schedule so they're there on test day, not half-remembered." },
    ],
    faq: [
      { q: "When is the AP Psychology exam?", a: "Mid May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Psych plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Psychology cover?", a: "The biological bases of behavior, sensation and perception, learning, cognition and memory, development, motivation and emotion, personality, clinical psychology, and social psychology." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Psychology — 3-Week Focused Review", subtitle: "Biology of behavior to social psychology", overview: "A three-week plan across AP Psychology — biological bases and sensation/cognition, learning, memory, and development, then clinical and social psychology — with heavy flashcard recall and checkpoint quizzes.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Biology, sensation & cognition", milestone: "Connect the brain to behavior and thought", quizCount: 1, days: [
          { day: 1, title: "Biological bases & research", description: "Neurons, the brain, and research methods.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Sensation & perception", description: "How we sense and interpret the world.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Cognition & memory", description: "Thinking, problem solving, and how memory works.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Biology, perception, and cognition.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's terms.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Learning, development & motivation", milestone: "Apply learning and developmental theories", quizCount: 1, days: [
          { day: 1, title: "Learning", description: "Classical and operant conditioning.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Development", description: "Cognitive, social, and moral development.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Motivation, emotion & personality", description: "Drives, emotion, and personality theories.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Learning, development, and personality.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Clinical & social", milestone: "Recognize disorders, treatments, and social effects", quizCount: 1, days: [
          { day: 1, title: "Psychological disorders", description: "Major categories and their symptoms.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Treatment", description: "Therapeutic approaches and biomedical treatment.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Social psychology", description: "Attitudes, conformity, and group behavior.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Applying concepts in the free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-macroeconomics': {
    meta: { title: "AP Macroeconomics Plan, AI-Built | Learnpath", description: "Get a focused AP Macroeconomics study plan in seconds — measurement, AD-AS, and policy, with graphs, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Macroeconomics", description: "A focused AP Macro plan in seconds — GDP to monetary policy, with graph practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Macroeconomics", sub: "Tell it your exam date or a unit you're shaky on, and get a focused AP Macro plan in seconds — measurement, the AD-AS model, and policy — with graph practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Built around the models.", desc: "Macro is won by drawing and shifting graphs. Lessons build the AD-AS and money-market models the FRQs demand." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface formulas and cause-and-effect chains on a schedule." },
    ],
    faq: [
      { q: "When is the AP Macroeconomics exam?", a: "Mid May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Macro plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Macroeconomics cover?", a: "Basic economic concepts, economic indicators like GDP and inflation, the AD-AS model, fiscal and monetary policy, and international trade and finance." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Macroeconomics — 3-Week Focused Review", subtitle: "GDP to monetary policy", overview: "A three-week plan across AP Macro — basic concepts and measurement, the AD-AS model and fiscal policy, then money, monetary policy, and the international sector — with graph practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Concepts & measurement", milestone: "Calculate and interpret the key indicators", quizCount: 1, days: [
          { day: 1, title: "Basic economic concepts", description: "Scarcity, the PPC, and comparative advantage.", type: "lesson", duration: "30 min" },
          { day: 2, title: "GDP & growth", description: "Measuring output and economic growth.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Inflation & unemployment", description: "Price indices, types of unemployment, and the trade-off.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Concepts and indicators.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's terms.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "AD-AS & fiscal policy", milestone: "Shift the AD-AS model and apply fiscal policy", quizCount: 1, days: [
          { day: 1, title: "Aggregate demand & supply", description: "Building and shifting the AD-AS model.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Fiscal policy", description: "Government spending, taxes, and multipliers.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Short run vs. long run", description: "Output gaps and self-correction.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "AD-AS and fiscal policy.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Money & the world", milestone: "Apply monetary policy and trade", quizCount: 1, days: [
          { day: 1, title: "Money & banking", description: "The money market and the banking system.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Monetary policy", description: "The central bank's tools and effects.", type: "lesson", duration: "30 min" },
          { day: 3, title: "International trade & finance", description: "Exchange rates and the balance of payments.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Graph-heavy free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-microeconomics': {
    meta: { title: "AP Microeconomics Plan, AI-Built | Learnpath", description: "Get a focused AP Microeconomics study plan in seconds — supply and demand, market structures, and factor markets, with graph practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Microeconomics", description: "A focused AP Micro plan in seconds — supply and demand to market failure, with graph practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Microeconomics", sub: "Tell it your exam date or a unit you're shaky on, and get a focused AP Micro plan in seconds — supply and demand, market structures, and factor markets — with graph practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Built around the graphs.", desc: "Micro is won by drawing cost curves and market structures. Lessons build the graphs the FRQs require." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface definitions and the conditions for each market on a schedule." },
    ],
    faq: [
      { q: "When is the AP Microeconomics exam?", a: "Mid May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP Micro plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Microeconomics cover?", a: "Supply and demand, elasticity, consumer and producer theory, costs of production, the four market structures, factor markets, and market failure." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Microeconomics — 3-Week Focused Review", subtitle: "Supply and demand to market failure", overview: "A three-week plan across AP Micro — supply, demand, and elasticity, then costs and market structures, then factor markets and market failure — with graph practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Supply, demand & elasticity", milestone: "Find and shift market equilibrium", quizCount: 1, days: [
          { day: 1, title: "Supply & demand", description: "Markets, equilibrium, and shifts.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Elasticity", description: "Price, income, and cross-price elasticity.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Surplus & government intervention", description: "Consumer/producer surplus, taxes, and price controls.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Supply, demand, and elasticity.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's terms.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Costs & market structures", milestone: "Draw and compare the four market structures", quizCount: 1, days: [
          { day: 1, title: "Production & costs", description: "Cost curves and the short vs. long run.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Perfect competition", description: "The competitive firm's decisions.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Monopoly & imperfect competition", description: "Monopoly, monopolistic competition, and oligopoly.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Costs and market structures.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Factor markets & market failure", milestone: "Analyze factor markets and externalities", quizCount: 1, days: [
          { day: 1, title: "Factor markets", description: "Demand for labor and other resources.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Market failure", description: "Externalities and public goods.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Equity & policy", description: "Income distribution and government's role.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Graph-heavy free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-english-language': {
    meta: { title: "AP English Language Plan, AI-Built | Learnpath", description: "Get a focused AP English Language study plan in seconds — rhetorical analysis, argument, and synthesis, with essay practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP English Language", description: "A focused AP Lang plan in seconds — rhetorical analysis to synthesis, with essay practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP English Language", sub: "Tell it your exam date or an essay you struggle with, and get a focused AP Lang plan in seconds — rhetorical analysis, argument, and synthesis — with essay practice, feedback from the tutor, and more." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits practice for all three essays into the weeks you have." },
      { title: "Built around the three essays.", desc: "AP Lang is rhetorical analysis, argument, and synthesis. Lessons build the moves each one rewards." },
      { title: "Practice with feedback.", desc: "Draft a thesis or a paragraph and ask the tutor to push your reasoning and evidence." },
    ],
    faq: [
      { q: "When is the AP English Language exam?", a: "Mid May. Learnpath back-schedules from your date and fits the reading and writing practice into the time you have." },
      { q: "Can I build an AP Lang plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP English Language test?", a: "Reading nonfiction rhetorically and writing three essays — a rhetorical analysis, an argument, and a synthesis essay — plus multiple-choice on reading and writing." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class and teacher." },
    ],
    curriculum: {
      title: "AP English Language — 3-Week Focused Review", subtitle: "Rhetorical analysis to synthesis", overview: "A three-week plan across AP Lang — rhetorical analysis, the argument essay, then synthesis and multiple-choice strategy — with essay practice and review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Rhetorical analysis", milestone: "Analyze an author's rhetorical choices", quizCount: 1, days: [
          { day: 1, title: "Rhetorical situation", description: "Speaker, audience, purpose, and context.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Rhetorical devices", description: "Appeals, diction, syntax, and tone.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Writing the analysis", description: "Thesis, line of reasoning, and commentary.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Essay practice", description: "A timed rhetorical-analysis essay with review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Spaced review", description: "Recall on devices and essay structure.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Argument", milestone: "Build a defensible argument with evidence", quizCount: 1, days: [
          { day: 1, title: "Claims & reasoning", description: "Defensible thesis and a clear line of reasoning.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Evidence & commentary", description: "Choosing evidence and explaining its weight.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Sophistication", description: "Nuance, counterargument, and the rubric's top row.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Essay practice", description: "A timed argument essay with review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Synthesis & multiple choice", milestone: "Synthesize sources into one argument", quizCount: 1, days: [
          { day: 1, title: "Synthesis essay", description: "Using and citing multiple sources for your claim.", type: "lesson", duration: "30 min" },
          { day: 2, title: "MCQ: reading", description: "Strategy for the rhetorical reading questions.", type: "lesson", duration: "30 min" },
          { day: 3, title: "MCQ: writing", description: "Strategy for the composition questions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Essay practice & quiz", description: "A timed synthesis essay with review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged note before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-english-literature': {
    meta: { title: "AP English Literature Plan, AI-Built | Learnpath", description: "Get a focused AP English Literature study plan in seconds — poetry, prose, and the open essay, with practice and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for AP English Literature", description: "A focused AP Lit plan in seconds — poetry to the open essay, with essay practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP English Literature", sub: "Tell it your exam date or an essay you struggle with, and get a focused AP Lit plan in seconds — poetry, prose, and the open question — with close-reading and essay practice." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits practice for all three essays into the weeks you have." },
      { title: "Built around the three essays.", desc: "AP Lit is poetry analysis, prose analysis, and the open essay. Lessons build the close reading each one rewards." },
      { title: "Practice with feedback.", desc: "Draft a thesis or a paragraph and ask the tutor to push your interpretation and evidence." },
    ],
    faq: [
      { q: "When is the AP Literature exam?", a: "Early May. Learnpath back-schedules from your date and fits the reading and writing practice into the time you have." },
      { q: "Can I build an AP Lit plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP English Literature test?", a: "Close reading of poetry, prose fiction, and drama, plus three essays — poetry analysis, prose analysis, and a literary-argument essay on a work of your choice — and multiple-choice." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class and teacher." },
    ],
    curriculum: {
      title: "AP English Literature — 3-Week Focused Review", subtitle: "Poetry, prose, and the open essay", overview: "A three-week plan across AP Lit — close reading and poetry analysis, prose fiction, then drama and the literary-argument essay — with essay practice and review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Close reading & poetry", milestone: "Analyze how a poem makes meaning", quizCount: 1, days: [
          { day: 1, title: "Close reading", description: "Diction, imagery, and figurative language.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Poetic structure", description: "Form, meter, and how structure shapes meaning.", type: "lesson", duration: "30 min" },
          { day: 3, title: "The poetry essay", description: "Thesis, line of reasoning, and evidence.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Essay practice", description: "A timed poetry-analysis essay with review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Spaced review", description: "Recall on terms and essay structure.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Prose fiction", milestone: "Analyze character, narration, and tone", quizCount: 1, days: [
          { day: 1, title: "Narrative & character", description: "Point of view, characterization, and narration.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Tone & technique", description: "Tone, irony, and an author's choices.", type: "lesson", duration: "30 min" },
          { day: 3, title: "The prose essay", description: "Building an interpretation with evidence.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Essay practice", description: "A timed prose-analysis essay with review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Drama & the open essay", milestone: "Argue an interpretation of a whole work", quizCount: 1, days: [
          { day: 1, title: "Drama & the whole work", description: "Reading a play and analyzing a full text.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The open (Q3) essay", description: "Choosing a work and answering the prompt.", type: "lesson", duration: "30 min" },
          { day: 3, title: "MCQ strategy", description: "Reading the multiple-choice passages closely.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Essay practice & quiz", description: "A timed open essay with review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged note before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-environmental-science': {
    meta: { title: "AP Environmental Science Plan, AI-Built | Learnpath", description: "Get a focused AP Environmental Science study plan in seconds — ecosystems, resources, pollution, and climate, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Environmental Science", description: "A focused APES plan in seconds — ecosystems to climate change, with practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Environmental Science", sub: "Tell it your exam date or a unit you're shaky on, and get a focused APES plan in seconds — ecosystems, resources, pollution, and climate — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Concepts plus the math.", desc: "APES mixes science with calculations. Lessons build both the systems thinking and the free-response math." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface cycles, laws, and case studies on a schedule." },
    ],
    faq: [
      { q: "When is the APES exam?", a: "Mid May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an APES plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Environmental Science cover?", a: "Ecosystems and biodiversity, populations, earth systems and resources, land and water use, energy, pollution, and global change including climate change." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Environmental Science — 3-Week Focused Review", subtitle: "Ecosystems to climate change", overview: "A three-week plan across APES — ecosystems and biodiversity, populations and resources, then pollution and global change — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Ecosystems & biodiversity", milestone: "Trace energy and matter through ecosystems", quizCount: 1, days: [
          { day: 1, title: "Ecosystems", description: "Energy flow, food webs, and biogeochemical cycles.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Biodiversity", description: "Ecosystem services, succession, and biomes.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Earth systems", description: "Soil, the atmosphere, and global water.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Ecosystems and earth systems.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on cycles and terms.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Populations & resources", milestone: "Analyze populations and resource use", quizCount: 1, days: [
          { day: 1, title: "Populations", description: "Growth models, carrying capacity, and human population.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Land & water use", description: "Agriculture, mining, and water resources.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Energy resources", description: "Fossil fuels, renewables, and energy use.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Populations and resources.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Pollution & global change", milestone: "Connect pollution, climate, and solutions", quizCount: 1, days: [
          { day: 1, title: "Pollution", description: "Air, water, and waste, plus human health.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Global change", description: "Ozone, climate change, and its impacts.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Laws & solutions", description: "Key environmental laws and sustainability.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Including the calculation and design free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-human-geography': {
    meta: { title: "AP Human Geography Plan, AI-Built | Learnpath", description: "Get a focused AP Human Geography study plan in seconds — population, culture, politics, and development, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Human Geography", description: "A focused AP HuG plan in seconds — population to development, with practice and an AI tutor." },
    hero: { h1: "Your AI study partner for AP Human Geography", sub: "Tell it your exam date or a unit you're shaky on, and get a focused AP Human Geography plan in seconds — population, culture, politics, agriculture, and development — with practice, flashcards, and a tutor." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits the units into the weeks you have, with review built in." },
      { title: "Think like a geographer.", desc: "AP HuG rewards applying models and concepts to cases. Lessons build that, not just definitions." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface models, terms, and theories on a schedule so they stick." },
    ],
    faq: [
      { q: "When is the AP Human Geography exam?", a: "Mid May. Learnpath back-schedules from your date and fits the units into the time you have." },
      { q: "Can I build an AP HuG plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Human Geography cover?", a: "Thinking geographically, population and migration, culture, political geography, agriculture, cities and urban land use, and development and industrialization." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "AP Human Geography — 3-Week Focused Review", subtitle: "Population to development", overview: "A three-week plan across AP HuG — thinking geographically and population, culture and political geography, then agriculture, cities, and development — with free-response practice and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Geography & population", milestone: "Apply population models to cases", quizCount: 1, days: [
          { day: 1, title: "Thinking geographically", description: "Maps, scale, and spatial concepts.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Population", description: "Distribution, density, and the demographic transition.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Migration", description: "Push and pull factors and migration types.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Geography and population.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on models and terms.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Culture & political geography", milestone: "Analyze cultural and political patterns", quizCount: 1, days: [
          { day: 1, title: "Culture", description: "Language, religion, and cultural landscapes.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Political geography", description: "States, boundaries, and devolution.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Diffusion & identity", description: "How culture and ideas spread.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Culture and political geography.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Agriculture, cities & development", milestone: "Apply land-use and development models", quizCount: 1, days: [
          { day: 1, title: "Agriculture", description: "Agricultural regions, revolutions, and land use.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Urban geography", description: "City models, urbanization, and challenges.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Development & industry", description: "Development measures and economic models.", type: "lesson", duration: "30 min" },
          { day: 4, title: "FRQ practice & cumulative quiz", description: "Applying models in the free-response.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'ap-spanish': {
    meta: { title: "AP Spanish Language Plan, AI-Built | Learnpath", description: "Get a focused AP Spanish Language & Culture study plan in seconds — the three communication modes and exam tasks, with practice and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for AP Spanish", description: "A focused AP Spanish plan in seconds — interpretive, interpersonal, and presentational practice, with an AI tutor." },
    hero: { h1: "Your AI study partner for AP Spanish Language & Culture", sub: "Tell it your exam date or a task you struggle with, and get a focused AP Spanish plan in seconds — the interpretive, interpersonal, and presentational tasks — with practice and a tutor to rehearse with." },
    benefits: [
      { title: "Back-scheduled to the May exam.", desc: "Tell it your date and the plan fits practice for each task into the weeks you have." },
      { title: "Built around the four tasks.", desc: "The exam is the email reply, the conversation, the persuasive essay, and the cultural comparison. Lessons drill each one." },
      { title: "Rehearse with the tutor.", desc: "Practice the conversation and get feedback on phrasing, tense, and register." },
    ],
    faq: [
      { q: "When is the AP Spanish exam?", a: "Mid May. Learnpath back-schedules from your date and fits practice for each task into the time you have." },
      { q: "Can I build an AP Spanish plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does AP Spanish Language test?", a: "Communication in three modes — interpretive, interpersonal, and presentational — through tasks like the email reply, the simulated conversation, the persuasive essay, and the cultural comparison." },
      { q: "Does it replace my class or teacher?", a: "No. It handles planning and daily practice and works alongside your class and teacher." },
    ],
    curriculum: {
      title: "AP Spanish Language — 3-Week Focused Review", subtitle: "The three modes of communication", overview: "A three-week plan across AP Spanish Language & Culture — interpretive reading and listening, interpersonal writing and speaking, then presentational essay and speaking — with task practice and review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Interpretive communication", milestone: "Read and listen for meaning under time", quizCount: 1, days: [
          { day: 1, title: "Interpretive reading", description: "Strategies for authentic texts.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Interpretive listening", description: "Audio and audiovisual sources.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Vocabulary & grammar in context", description: "High-frequency structures and tenses.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Practice set", description: "Timed interpretive multiple-choice.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on vocabulary.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Interpersonal communication", milestone: "Reply and converse appropriately", quizCount: 1, days: [
          { day: 1, title: "Email reply", description: "Register, structure, and answering all parts.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Simulated conversation", description: "Responding in the five exchanges.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Useful structures", description: "Connectors, the subjunctive, and politeness.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Practice with the tutor", description: "Rehearse a conversation and an email reply.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Presentational communication", milestone: "Write the essay and the cultural comparison", quizCount: 1, days: [
          { day: 1, title: "Persuasive essay", description: "Synthesizing three sources into an argument.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cultural comparison", description: "The presentational speaking task.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Culture & themes", description: "The six themes and Spanish-speaking cultures.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Practice set & quiz", description: "A timed essay and a recorded comparison.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before the exam.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },
}