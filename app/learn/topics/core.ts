// app/learn/topics/core.ts — original 14 topics
import type { TopicData } from './types'

export const coreTopics: Record<string, TopicData> = {
  mcat: {
    meta: {
      title: "MCAT Study Plan: AI-Built in Seconds | Learnpath",
      description: "Paste your timeline or a topic and get a personalized MCAT study plan — high-yield lessons, flashcards, and an AI tutor. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for the MCAT",
      description: "Paste a topic or your exam date and get a high-yield MCAT study plan in seconds — lessons, flashcards, and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for the MCAT",
      sub: "Tell it your exam date or a single topic, and get a high-yield study plan in seconds — built around how much time you actually have, with lessons, flashcards, and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "Back-scheduled to your exam date.", desc: "Tell it when you test and your plan works backward, fitting the highest-yield topics into the weeks you have — with room left for full-lengths." },
      { title: "High-yield first.", desc: "Lessons focus on what the MCAT actually tests — biochem, physics, psych/soc — instead of everything in the textbook, so your time goes where it counts." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface your toughest concepts on a schedule, so what you learn in week one is still there on test day." },
    ],
    faq: [
      { q: "How long should I study for the MCAT?", a: "Most students give themselves three to six months. Learnpath back-schedules from your exam date, so however long you have, your plan fits the highest-yield topics into the time you've actually got." },
      { q: "Can I build an MCAT study plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It's a study partner that handles the planning and daily practice, and works alongside any course, book, or tutor you're already using." },
      { q: "What MCAT subjects does it cover?", a: "Any of them — biochemistry, biology, general and organic chemistry, physics, and psychology/sociology. Name a section or a specific topic and it builds a focused plan." },
    ],
    curriculum: {
      title: "MCAT Biochemistry — 3-Week High-Yield Sprint",
      subtitle: "Amino acids to metabolism, with spaced recall built in",
      overview: "A focused three-week plan covering the highest-yield biochemistry on the MCAT — protein structure, enzymes, and metabolism — with checkpoint quizzes and spaced review so it sticks.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Amino acids & protein structure", milestone: "Recognize all 20 amino acids and the four levels of protein structure", quizCount: 1, days: [
          { day: 1, title: "The 20 amino acids", description: "Structures, one- and three-letter codes, and side-chain classes: nonpolar, polar, acidic, basic.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Acid–base & the peptide bond", description: "pKa, isoelectric point, titration curves, and how peptide bonds form.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Protein structure levels", description: "Primary through quaternary, and the forces that stabilize each.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "High-yield questions on amino acids, charge, and structure.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's toughest cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Enzymes & bioenergetics", milestone: "Interpret enzyme-kinetics plots and predict the effect of each inhibitor type", quizCount: 1, days: [
          { day: 1, title: "Enzyme function & regulation", description: "Active sites, cofactors, allosteric regulation, and feedback inhibition.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Enzyme kinetics", description: "Michaelis–Menten, Km and Vmax, and reading Lineweaver–Burk plots.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Inhibition", description: "Competitive, noncompetitive, uncompetitive, and mixed — effects on Km and Vmax.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Kinetics plots and inhibitor identification.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across enzymes and week one.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Metabolism & integration", milestone: "Trace glucose through glycolysis and the TCA cycle and account for the ATP", quizCount: 1, days: [
          { day: 1, title: "Glycolysis", description: "Key regulated steps, net ATP and NADH, and where it happens.", type: "lesson", duration: "30 min" },
          { day: 2, title: "TCA cycle & oxidative phosphorylation", description: "Carbon flow, the electron transport chain, and chemiosmosis.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Metabolic integration", description: "Fed vs. fasted states, key hormones, and pathway crosstalk.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of biochem in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-biochemistry': {
    meta: {
      title: "MCAT Biochemistry Study Plan, AI-Built | Learnpath",
      description: "Get a high-yield MCAT biochemistry plan in seconds — amino acids, enzymes, and metabolism, with flashcards and an AI tutor. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT Biochemistry",
      description: "A high-yield MCAT biochem plan in seconds — amino acids to metabolism, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT Biochemistry",
      sub: "Tell it your exam date or a single topic, and get a high-yield biochemistry plan in seconds — protein structure, enzymes, and metabolism — with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "The highest-yield section.", desc: "Biochem shows up across both the bio/biochem and chem/physics sections, so it earns more points than almost anything else. Your plan front-loads it." },
      { title: "Pathways you can trace.", desc: "Lessons build glycolysis, the TCA cycle, and their regulation step by step, so you can reason through a passage instead of reciting it." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface enzymes, cofactors, and regulated steps on a schedule, so they're locked in by test day." },
    ],
    faq: [
      { q: "Why is biochemistry so high-yield on the MCAT?", a: "It's tested heavily on both the biology/biochemistry and chemistry/physics sections, so strong biochem pays off more than almost any other topic. Learnpath puts it first." },
      { q: "Can I build an MCAT biochem plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "What biochem topics does it cover?", a: "Amino acids and protein structure, enzymes and kinetics, bioenergetics, and the core metabolic pathways and how they're regulated." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It handles the planning and daily practice and works alongside any course, book, or tutor you're already using." },
    ],
    curriculum: {
      title: "MCAT Biochemistry — 3-Week High-Yield Sprint",
      subtitle: "Amino acids to metabolic regulation",
      overview: "A focused three-week plan covering the highest-yield MCAT biochemistry — protein structure, enzyme kinetics, and the major metabolic pathways and how they're regulated — with checkpoint quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Amino acids & proteins", milestone: "Recognize the 20 amino acids and predict protein behavior", quizCount: 1, days: [
          { day: 1, title: "The 20 amino acids", description: "Side-chain classes, charge, and one- and three-letter codes.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Protein structure", description: "Primary through quaternary structure and the bonds that stabilize each.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Acid–base & isoelectric point", description: "pKa, pI, and titration behavior.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Amino acid charge and protein structure.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Enzymes & energy", milestone: "Read kinetics plots and predict inhibitor effects", quizCount: 1, days: [
          { day: 1, title: "Enzyme function & regulation", description: "Active sites, cofactors, allosteric control, and feedback inhibition.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Enzyme kinetics", description: "Michaelis–Menten, Km and Vmax, and Lineweaver–Burk plots.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Inhibition & bioenergetics", description: "Competitive vs. noncompetitive inhibition, plus ATP and free energy.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Kinetics and inhibitor identification.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across enzymes and week one.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Metabolism & regulation", milestone: "Trace glucose through metabolism and account for the ATP", quizCount: 1, days: [
          { day: 1, title: "Glycolysis & gluconeogenesis", description: "Regulated steps, net yield, and reciprocal regulation.", type: "lesson", duration: "30 min" },
          { day: 2, title: "TCA cycle & oxidative phosphorylation", description: "Carbon flow, the electron transport chain, and chemiosmosis.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Metabolic integration", description: "Fed vs. fasted states, key hormones, and pathway crosstalk.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of biochem in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-biology': {
    meta: {
      title: "MCAT Biology Study Plan, AI-Built | Learnpath",
      description: "Get a high-yield MCAT biology plan in seconds — molecular biology, genetics, and the organ systems, with flashcards and an AI tutor. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT Biology",
      description: "A high-yield MCAT biology plan in seconds — molecular biology to organ systems, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT Biology",
      sub: "Tell it your exam date or a single topic, and get a high-yield biology plan in seconds — from molecular biology to the organ systems — with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "From molecules to systems.", desc: "The MCAT tests biology at every level, DNA to organ systems. Your plan connects them instead of treating each as a silo." },
      { title: "Physiology that makes sense.", desc: "Lessons build the logic of each system so you can predict how it responds — which is what passages actually ask." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface the details — hormones, pathways, structures — on a schedule so they stick." },
    ],
    faq: [
      { q: "What biology does the MCAT test?", a: "Molecular biology and genetics, cell biology, and the major organ systems — nervous, endocrine, cardiovascular, respiratory, renal, and more — plus reproduction and development." },
      { q: "Can I build an MCAT biology plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "I'm strong in some systems and weak in others — can it focus?", a: "Yes. Name the system or topic you're shaky on and it builds a plan around it instead of re-covering what you already know." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It handles the planning and daily practice and works alongside any course, book, or tutor you're already using." },
    ],
    curriculum: {
      title: "MCAT Biology — 3-Week High-Yield Sprint",
      subtitle: "Molecular biology to the organ systems",
      overview: "A focused three-week plan across the highest-yield MCAT biology — molecular biology and genetics, then cellular processes, then the major organ systems — with checkpoint quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Molecular biology & genetics", milestone: "Explain how genes become proteins and how that's regulated", quizCount: 1, days: [
          { day: 1, title: "DNA, replication & repair", description: "Structure, replication, and how errors are fixed.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Transcription & translation", description: "From gene to protein, and the players involved.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Gene regulation & genetics", description: "Operons, eukaryotic regulation, and Mendelian basics.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "The central dogma and inheritance.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Cells & energy", milestone: "Compare cellular processes and how cells communicate", quizCount: 1, days: [
          { day: 1, title: "Cell structure & membranes", description: "Organelles, membrane transport, and the cytoskeleton.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cell division & the cycle", description: "Mitosis, meiosis, and checkpoints.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Cell signaling", description: "Receptors, second messengers, and common pathways.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Cell processes and signaling.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Organ systems", milestone: "Predict how the major systems respond to a change", quizCount: 1, days: [
          { day: 1, title: "Nervous & endocrine", description: "Neurons, action potentials, and hormone control.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Cardiovascular & respiratory", description: "Circulation, gas exchange, and regulation.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Renal & digestive", description: "Filtration, balance, and absorption.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of biology in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-general-chemistry': {
    meta: {
      title: "MCAT General Chemistry Plan, AI-Built | Learnpath",
      description: "Get a high-yield MCAT general chemistry plan in seconds — stoichiometry, equilibrium, acids and bases, with flashcards and an AI tutor. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT General Chemistry",
      description: "A high-yield MCAT gen chem plan in seconds — equilibrium to electrochemistry, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT General Chemistry",
      sub: "Tell it your exam date or a single topic, and get a high-yield general chemistry plan in seconds — the reactions, equilibria, and calculations the MCAT actually tests — with flashcards and a tutor.",
    },
    benefits: [
      { title: "The reactions that show up.", desc: "Gen chem on the MCAT centers on a handful of high-yield areas — equilibrium, acids and bases, thermo. Your plan targets those." },
      { title: "Calculations without panic.", desc: "Lessons build the setup for each calculation so you can do it cleanly, without a calculator, under time." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface formulas, periodic trends, and constants on a schedule, so they're automatic by test day." },
    ],
    faq: [
      { q: "What general chemistry does the MCAT cover?", a: "Atomic structure and periodic trends, stoichiometry, gases, thermodynamics, kinetics, equilibrium, acids and bases, and electrochemistry." },
      { q: "Can I build an MCAT gen chem plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Is there a lot of math?", a: "Some, but it rewards clean setups over heavy computation. The plan focuses on recognizing the right relationship and doing the math without a calculator." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It handles the planning and daily practice and works alongside any course, book, or tutor you're already using." },
    ],
    curriculum: {
      title: "MCAT General Chemistry — 3-Week High-Yield Sprint",
      subtitle: "Stoichiometry to electrochemistry",
      overview: "A focused three-week plan covering the highest-yield MCAT general chemistry — atomic structure and stoichiometry, thermodynamics and kinetics, then equilibrium, acids and bases, and electrochemistry — with quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Atoms, bonding & stoichiometry", milestone: "Balance reactions and reason from periodic trends", quizCount: 1, days: [
          { day: 1, title: "Atomic structure & periodic trends", description: "Electron configuration and trends in size, ionization, and electronegativity.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Bonding & molecular geometry", description: "Ionic vs. covalent, Lewis structures, and VSEPR shapes.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Stoichiometry", description: "Moles, limiting reagents, and percent yield.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Periodic trends and stoichiometry.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Energy & rates", milestone: "Predict spontaneity and how fast a reaction goes", quizCount: 1, days: [
          { day: 1, title: "Thermodynamics", description: "Enthalpy, entropy, and Gibbs free energy.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Kinetics", description: "Rate laws, reaction order, and catalysts.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Gases & solutions", description: "The ideal gas law, partial pressures, and solution concentration.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Thermo and kinetics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Equilibrium & electrochemistry", milestone: "Work acid–base and redox problems under time", quizCount: 1, days: [
          { day: 1, title: "Equilibrium", description: "Le Châtelier's principle, Keq, and the reaction quotient.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Acids & bases", description: "pH, pKa, buffers, and titration curves.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Electrochemistry", description: "Redox, galvanic vs. electrolytic cells, and cell potential.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of gen chem in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-organic-chemistry': {
    meta: {
      title: "MCAT Organic Chemistry Plan, AI-Built | Learnpath",
      description: "Get a high-yield MCAT organic chemistry plan in seconds — the mechanisms, reactions, and spectroscopy the exam tests, with an AI tutor. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT Organic Chemistry",
      description: "A high-yield MCAT orgo plan in seconds — functional groups to spectroscopy, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT Organic Chemistry",
      sub: "Tell it your exam date or a single topic, and get a high-yield organic chemistry plan in seconds — the functional groups, mechanisms, and spectroscopy the MCAT actually tests — with flashcards and a tutor.",
    },
    benefits: [
      { title: "Less memorizing, more reasoning.", desc: "MCAT orgo rewards understanding why a reaction happens. Lessons build mechanisms so you can predict products instead of memorizing every reaction." },
      { title: "The high-yield slice.", desc: "The MCAT tests a focused set — functional groups, key reactions, and lab techniques. Your plan skips the rest of the orgo course." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface reactions, reagents, and spectra on a schedule so they stick." },
    ],
    faq: [
      { q: "How much organic chemistry is on the MCAT?", a: "Less than a full orgo course — it focuses on functional groups, a core set of reactions and mechanisms, stereochemistry, and spectroscopy and separation techniques." },
      { q: "Can I build an MCAT orgo plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Do I need to memorize every reaction?", a: "No. The exam rewards understanding mechanisms and recognizing how functional groups behave, which is what the lessons build." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It handles the planning and daily practice and works alongside any course, book, or tutor you're already using." },
    ],
    curriculum: {
      title: "MCAT Organic Chemistry — 3-Week High-Yield Sprint",
      subtitle: "Functional groups to spectroscopy",
      overview: "A focused three-week plan covering the highest-yield MCAT organic chemistry — structure and stereochemistry, the core reactions and mechanisms, then spectroscopy and lab techniques — with quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Structure & stereochemistry", milestone: "Assign stereochemistry and predict molecular behavior", quizCount: 1, days: [
          { day: 1, title: "Functional groups & nomenclature", description: "Recognizing the groups that matter and naming the molecules.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Stereochemistry", description: "Chirality, R/S, and enantiomers vs. diastereomers.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Resonance & acidity", description: "Stability, resonance, and what makes a proton acidic.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Functional groups and stereochemistry.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Reactions & mechanisms", milestone: "Predict products by reasoning through mechanisms", quizCount: 1, days: [
          { day: 1, title: "Nucleophiles & electrophiles", description: "SN1/SN2 and E1/E2, and what favors each.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Carbonyl chemistry", description: "Aldehydes, ketones, and nucleophilic addition.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Carboxylic acids & derivatives", description: "Esters, amides, and acyl substitution.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Mechanisms and product prediction.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Analysis & lab techniques", milestone: "Read spectra and choose the right separation", quizCount: 1, days: [
          { day: 1, title: "IR & NMR spectroscopy", description: "Reading IR peaks and ¹H NMR for structure.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Separations & purification", description: "Chromatography, distillation, and extraction.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Biomolecules through an orgo lens", description: "Carbohydrates, lipids, and amino acids.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of orgo in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-physics': {
    meta: {
      title: "MCAT Physics Study Plan, AI-Built | Learnpath",
      description: "Get a high-yield MCAT physics study plan in seconds — the formulas and concepts the exam actually tests, with flashcards and an AI tutor. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT Physics",
      description: "A high-yield MCAT physics plan in seconds — kinematics to circuits to optics, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT Physics",
      sub: "Tell it your exam date or a single topic, and get a high-yield physics plan in seconds — focused on the formulas and concepts the MCAT actually tests, with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "The formulas that actually show up.", desc: "Physics on the MCAT rewards a core set of relationships — kinematics, forces, energy, circuits, optics. Your plan drills those instead of every equation in the book." },
      { title: "Concepts over memorization.", desc: "Most passages test whether you understand a relationship, not whether you memorized a constant. Lessons build the intuition so you can reason through unfamiliar setups." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface the equations and units you're most likely to blank on, so they're automatic by test day." },
    ],
    faq: [
      { q: "Is MCAT physics math-heavy?", a: "Less than you'd think — it tests concepts and relationships more than heavy calculation. The plan focuses on understanding each formula and when it applies, with just enough no-calculator practice to stay sharp." },
      { q: "Can I build an MCAT physics plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "What physics topics does the MCAT cover?", a: "Mechanics, fluids, electricity and circuits, waves and sound, optics, and some thermodynamics. Name a topic you're shaky on and it builds a focused plan around it." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It handles the planning and daily practice and works alongside any course, book, or tutor you're already using." },
    ],
    curriculum: {
      title: "MCAT Physics — 3-Week High-Yield Sprint",
      subtitle: "Mechanics to optics, with the formulas that actually show up",
      overview: "A focused three-week plan covering the highest-yield MCAT physics — mechanics and energy, fluids and circuits, then waves, optics, and thermodynamics — with checkpoint quizzes and spaced review so it sticks.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Mechanics & energy", milestone: "Solve kinematics, force, and energy problems without a calculator", quizCount: 1, days: [
          { day: 1, title: "Kinematics", description: "Displacement, velocity, acceleration, the equations of motion, and projectile setups.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Forces & Newton's laws", description: "Free-body diagrams, friction, inclines, and the normal force.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Work, energy & power", description: "The work–energy theorem, conservation of energy, and power.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Mechanics problems in MCAT-style passages.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's formulas and units.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Fluids & electricity", milestone: "Apply continuity, Bernoulli, and Ohm's law to passage setups", quizCount: 1, days: [
          { day: 1, title: "Fluids & hydrostatics", description: "Density, pressure, buoyancy, continuity, and Bernoulli's equation.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Electrostatics", description: "Coulomb's law, electric fields, and electric potential.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Circuits", description: "Ohm's law, resistors in series and parallel, and capacitors.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Fluids and circuit problems, units included.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across fluids, circuits, and week one.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Waves, optics & thermo", milestone: "Trace light through lenses and reason about sound and heat", quizCount: 1, days: [
          { day: 1, title: "Waves & sound", description: "Frequency, wavelength, the Doppler effect, and intensity.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Geometric optics", description: "Mirrors and lenses, the thin-lens equation, and ray diagrams.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Thermodynamics", description: "Heat, the gas laws, and the first law of thermodynamics.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of physics in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-psychology-sociology': {
    meta: {
      title: "MCAT Psych/Soc Study Plan, AI-Built | Learnpath",
      description: "Get a high-yield MCAT psychology and sociology plan in seconds — the theories, terms, and concepts the exam tests, with flashcards and an AI tutor. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT Psych/Soc",
      description: "A high-yield MCAT psych/soc plan in seconds — from learning and cognition to social structures, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT Psychology & Sociology",
      sub: "Tell it your exam date or a single topic, and get a high-yield psych/soc plan in seconds — the theories, terms, and concepts the MCAT actually tests — with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "It's a vocabulary section — so own the vocab.", desc: "Psych/soc rewards recognizing terms and theories. Flashcards and lessons make sure the definitions are locked in." },
      { title: "Theories you can apply.", desc: "Lessons tie each theory to an example, so you can spot it in a passage instead of just defining it." },
      { title: "Spaced recall built in.", desc: "Hundreds of terms resurface on a schedule, so they're there on test day instead of half-remembered." },
    ],
    faq: [
      { q: "Why is psych/soc so term-heavy?", a: "It tests a wide vocabulary of theories and concepts, so consistent flashcard recall matters more here than almost anywhere else on the MCAT." },
      { q: "Can I build an MCAT psych/soc plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "What does this section cover?", a: "Sensation and perception, learning and memory, cognition, motivation and emotion, identity, social behavior, and social structures and inequality." },
      { q: "Does Learnpath replace a prep course or tutor?", a: "No. It handles the planning and daily practice and works alongside any course, book, or tutor you're already using." },
    ],
    curriculum: {
      title: "MCAT Psychology & Sociology — 3-Week High-Yield Sprint",
      subtitle: "From perception to social structure",
      overview: "A focused three-week plan covering the highest-yield MCAT psych/soc — the brain and behavior, cognition and identity, then social behavior and structure — with heavy flashcard recall and checkpoint quizzes.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Brain, behavior & the senses", milestone: "Connect biology to behavior and recognize key theories", quizCount: 1, days: [
          { day: 1, title: "Biology of behavior", description: "Neurons, brain regions, and the nervous and endocrine systems.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Sensation & perception", description: "Thresholds, signal detection, and how we process stimuli.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Learning & memory", description: "Classical and operant conditioning, and how memory works.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Behavior, perception, and learning.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's terms.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Cognition, motivation & identity", milestone: "Apply theories of thought, emotion, and the self", quizCount: 1, days: [
          { day: 1, title: "Cognition & language", description: "Problem solving, intelligence, and language development.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Motivation & emotion", description: "Drives, theories of emotion, and stress.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Identity & personality", description: "Self-concept, identity formation, and personality theories.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Cognition, emotion, and identity.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Social behavior & structure", milestone: "Reason about groups, institutions, and inequality", quizCount: 1, days: [
          { day: 1, title: "Social psychology", description: "Attitudes, group behavior, attribution, and bias.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Social structures & institutions", description: "Family, religion, education, and theoretical perspectives.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Demographics & inequality", description: "Social stratification, mobility, and health disparities.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of psych/soc in MCAT-style passages.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'mcat-cars': {
    meta: {
      title: "MCAT CARS Study Plan, AI-Built | Learnpath",
      description: "Get a structured MCAT CARS practice plan in seconds — passage strategy, question types, and a daily routine, with an AI tutor. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for MCAT CARS",
      description: "A structured MCAT CARS plan in seconds — strategy, question types, and a daily practice routine, with an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for MCAT CARS",
      sub: "CARS rewards practice and strategy, not memorization. Tell it your timeline and get a structured plan in seconds — passage approach, question types, and a daily routine — with a tutor to talk through your reasoning.",
    },
    benefits: [
      { title: "Built around daily practice.", desc: "CARS improves with consistent reps, not cramming. Your plan sets a daily rhythm and builds the strategy around it." },
      { title: "Strategy for every question type.", desc: "Lessons break down main-idea, inference, and reasoning-beyond-the-text questions so you know what each is really asking." },
      { title: "Talk through your reasoning.", desc: "Stuck on why an answer is right? The AI tutor walks the logic through with you — the part that's hard to self-teach." },
    ],
    faq: [
      { q: "Can you really study for CARS?", a: "Yes — not by memorizing, but by practicing daily and building a consistent approach to passages and question types. Learnpath structures that practice and routine for you." },
      { q: "Can I build a CARS plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "What does CARS actually test?", a: "Reading comprehension and reasoning — your ability to analyze an argument, draw inferences, and apply ideas, using only the passage in front of you." },
      { q: "Does it replace official practice passages?", a: "No — keep doing official AAMC practice. Learnpath gives you the strategy, schedule, and a tutor to review your reasoning alongside it." },
    ],
    curriculum: {
      title: "MCAT CARS — 3-Week Practice Plan",
      subtitle: "Strategy and a daily reading routine",
      overview: "A three-week plan to build a repeatable CARS approach — passage strategy and active reading, the question types, then timing and consistency — with daily practice and review built in.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "All levels",
      weeks: [
        { week: 1, theme: "Active reading & strategy", milestone: "Read a passage actively and map its argument", quizCount: 1, days: [
          { day: 1, title: "How CARS is built", description: "What the section tests and what a good approach looks like.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Active reading", description: "Reading for structure and argument, not details.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Mapping the passage", description: "Tracking the author's claim, tone, and reasoning.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Practice set", description: "Two passages with full review.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Spaced review", description: "Revisit the reasoning on missed questions.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Question types", milestone: "Recognize and attack each CARS question type", quizCount: 1, days: [
          { day: 1, title: "Main idea & detail", description: "Finding the central thesis and the details that support it.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Inference questions", description: "Drawing conclusions the passage implies.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Reasoning beyond the text", description: "Applying, strengthening, and weakening arguments.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Practice set", description: "A timed passage per question type, reviewed.", type: "exercise", duration: "40 min" },
          { day: 5, title: "Spaced review", description: "Re-attempt missed questions and name the trap.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Timing & consistency", milestone: "Hold a steady pace across a full section", quizCount: 1, days: [
          { day: 1, title: "Pacing & timing", description: "Budgeting time per passage and when to move on.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The hardest passages", description: "Dense philosophy and humanities, and how to handle them.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Building the daily habit", description: "A routine you can sustain to the test date.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Full practice set", description: "A timed multi-passage set with full review.", type: "exercise", duration: "50 min" },
          { day: 5, title: "Final review", description: "Patterns in your misses and how to fix them.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'usmle-step-1': {
    meta: {
      title: "USMLE Step 1 Study Plan, AI-Built | Learnpath",
      description: "Get a high-yield USMLE Step 1 study plan in seconds — organized by system, with flashcards and an AI tutor for your dedicated period. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for USMLE Step 1",
      description: "A high-yield Step 1 plan in seconds — built around your dedicated period, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for USMLE Step 1",
      sub: "Tell it your dedicated window or a system you're weak on, and get a high-yield Step 1 plan in seconds — organized by system and discipline, with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "Built around your dedicated period.", desc: "Tell it how many weeks you have and your plan fits the highest-yield material into the time you've actually got." },
      { title: "Organized how Step 1 tests.", desc: "Lessons integrate physiology, pathology, pharm, and micro by system — the way questions actually come." },
      { title: "Spaced recall built in.", desc: "Step 1 is a memory marathon. Flashcards resurface the highest-yield facts on a schedule so they hold to test day." },
    ],
    faq: [
      { q: "Step 1 is pass/fail now — how should I study?", a: "The goal is a confident pass and a strong foundation for Step 2. Learnpath builds a high-yield plan around your dedicated window and the systems you're weakest in." },
      { q: "Can I build a Step 1 plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Can it focus on my weak systems?", a: "Yes. Name a system or discipline — renal, cardio, pharm, micro — and it builds a focused plan instead of re-covering everything." },
      { q: "Does it replace my Qbank or main resources?", a: "No. It handles planning and daily review and works alongside your Qbank and primary resources." },
    ],
    curriculum: {
      title: "USMLE Step 1 — 3-Week High-Yield Sprint",
      subtitle: "Integrated, system-based review",
      overview: "A focused three-week example covering high-yield Step 1 — foundational sciences, then pharmacology and pathology principles, then system-based integration — with checkpoint quizzes and spaced review. Scales to your real dedicated window.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "40 min", level: "Advanced",
      weeks: [
        { week: 1, theme: "Foundations", milestone: "Lock in the highest-yield biochem, immuno, and micro", quizCount: 1, days: [
          { day: 1, title: "Biochemistry & genetics", description: "High-yield pathways, enzyme deficiencies, and inheritance patterns.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Immunology", description: "Innate vs. adaptive immunity, hypersensitivity, and immunodeficiencies.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Microbiology", description: "High-yield bacteria, viruses, and antimicrobial targets.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Foundations in vignette form.", type: "quiz", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's facts.", type: "review", duration: "30 min" },
        ]},
        { week: 2, theme: "Pharmacology & pathology", milestone: "Connect drug mechanisms and disease processes", quizCount: 1, days: [
          { day: 1, title: "Pharmacology principles", description: "Pharmacokinetics, receptors, and major drug classes.", type: "lesson", duration: "40 min" },
          { day: 2, title: "General pathology", description: "Cell injury, inflammation, and neoplasia.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Pathophysiology basics", description: "How disease disrupts normal physiology.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Pharm and path in vignettes.", type: "quiz", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "30 min" },
        ]},
        { week: 3, theme: "System integration", milestone: "Reason through multi-system clinical vignettes", quizCount: 1, days: [
          { day: 1, title: "Cardiovascular & renal", description: "Integrated physiology, pathology, and pharm by system.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Pulmonary & GI", description: "High-yield disease and drug connections.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Neuro & endocrine", description: "Key pathways, lesions, and hormone disorders.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of integrated vignettes.", type: "quiz", duration: "35 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "30 min" },
        ]},
      ],
    },
  },

  'nclex': {
    meta: {
      title: "NCLEX Study Plan, AI-Built in Seconds | Learnpath",
      description: "Get a high-yield NCLEX study plan in seconds — client-needs categories, pharmacology, and prioritization, with flashcards and an AI tutor. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for the NCLEX",
      description: "A high-yield NCLEX plan in seconds — client needs, pharm, and prioritization, with spaced recall and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for the NCLEX",
      sub: "Tell it your test date or a topic you're shaky on, and get a high-yield NCLEX plan in seconds — built around the client-needs categories, with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "Organized by client needs.", desc: "The NCLEX is built around client-needs categories. Your plan mirrors them so you study the way the exam is blueprinted." },
      { title: "Prioritization you can practice.", desc: "So much of the NCLEX is 'what do you do first.' Lessons build the safety and prioritization logic behind those questions." },
      { title: "Spaced recall built in.", desc: "Pharmacology and lab values resurface on a schedule, so the details are there when you need them." },
    ],
    faq: [
      { q: "How is the NCLEX structured?", a: "It's a computer-adaptive exam organized around client-needs categories — safe and effective care, health promotion, psychosocial integrity, and physiological integrity. Learnpath plans around those." },
      { q: "Can I build an NCLEX plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Can it focus on pharmacology or my weak areas?", a: "Yes. Name a topic — pharm, lab values, prioritization, a specific system — and it builds a focused plan around it." },
      { q: "Does it replace my Qbank or review course?", a: "No. It handles planning and daily review and works alongside your Qbank and review course." },
    ],
    curriculum: {
      title: "NCLEX — 3-Week High-Yield Plan",
      subtitle: "Client needs, pharm, and prioritization",
      overview: "A focused three-week plan across high-yield NCLEX content — fundamentals and safety, pharmacology and labs, then prioritization and system-based care — with checkpoint quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Intermediate",
      weeks: [
        { week: 1, theme: "Fundamentals & safety", milestone: "Apply safety and infection-control principles", quizCount: 1, days: [
          { day: 1, title: "Safe & effective care", description: "Delegation, infection control, and safety basics.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Health promotion", description: "Care across the lifespan, and prevention.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Psychosocial integrity", description: "Therapeutic communication and mental health basics.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Safety and fundamentals.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's cards.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Pharmacology & labs", milestone: "Recall key drug classes and critical lab values", quizCount: 1, days: [
          { day: 1, title: "Pharmacology essentials", description: "High-yield drug classes, side effects, and nursing considerations.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Lab values", description: "Normal ranges and what abnormal results mean.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Fluids & electrolytes", description: "Imbalances and the nursing response.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Pharm and labs.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Prioritization & systems", milestone: "Decide what to do first in a clinical scenario", quizCount: 1, days: [
          { day: 1, title: "Prioritization & the ABCs", description: "Maslow, ABCs, and the nursing process for ordering care.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Med-surg by system", description: "High-yield conditions and the nursing response.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Maternal & pediatric basics", description: "Core high-yield OB and peds content.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of NCLEX-style questions.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'sat': {
    meta: {
      title: "SAT Study Plan: AI-Built in Seconds | Learnpath",
      description: "Get a personalized SAT study plan in seconds — Reading, Writing, and Math practice with flashcards and an AI tutor, built around your test date. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for the SAT",
      description: "A personalized SAT plan in seconds — Reading, Writing, and Math, built around your test date, with an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for the SAT",
      sub: "Tell it your test date or a section you want to raise, and get a study plan in seconds — Reading and Writing and Math, built around the time you have — with flashcards and a tutor for when you're stuck.",
    },
    benefits: [
      { title: "Built around your test date.", desc: "Tell it when you test and the plan back-schedules, fitting practice into the weeks you have with review built in." },
      { title: "Both sections, balanced.", desc: "Reading and Writing and Math — the plan splits your time based on where you'll gain the most points." },
      { title: "Practice that sticks.", desc: "Flashcards and checkpoint quizzes resurface grammar rules, vocabulary, and math concepts on a schedule." },
    ],
    faq: [
      { q: "How long should I study for the SAT?", a: "It depends on your starting point and goal. Learnpath back-schedules from your test date and fits practice into the time you have, with review built in." },
      { q: "Can I build an SAT plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "Is this for the digital SAT?", a: "Yes — the plan covers the current digital SAT's Reading and Writing and Math sections and the question types you'll actually see." },
      { q: "Does it replace a tutor or prep course?", a: "No. It handles the planning and daily practice and works alongside any tutor, book, or course you're using." },
    ],
    curriculum: {
      title: "SAT — 3-Week Focused Plan",
      subtitle: "Reading, Writing, and Math, balanced",
      overview: "A three-week plan across the digital SAT — Reading and Writing fundamentals, the Math you'll see most, then mixed practice and timing — with checkpoint quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "40 min", level: "All levels",
      weeks: [
        { week: 1, theme: "Reading & Writing", milestone: "Handle the main R&W question types confidently", quizCount: 1, days: [
          { day: 1, title: "Reading: main idea & evidence", description: "Finding the point and the support for it.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Reading: inference & purpose", description: "Drawing conclusions and reading for function.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Writing: grammar & punctuation", description: "The rules the SAT tests most — commas, clauses, agreement.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Mixed Reading and Writing questions.", type: "quiz", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on rules and strategy.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Math", milestone: "Work algebra and data problems cleanly and fast", quizCount: 1, days: [
          { day: 1, title: "Heart of algebra", description: "Linear equations, systems, and inequalities.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Problem solving & data", description: "Ratios, percentages, and reading data.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Advanced math", description: "Quadratics, functions, and nonlinear models.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Mixed math, calculator and not.", type: "quiz", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across the math topics.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Timing & mixed practice", milestone: "Hold a steady pace across both sections", quizCount: 1, days: [
          { day: 1, title: "Pacing & strategy", description: "Time per question and when to skip and return.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Mixed R&W set", description: "Timed practice with full review.", type: "exercise", duration: "40 min" },
          { day: 3, title: "Mixed math set", description: "Timed practice with full review.", type: "exercise", duration: "40 min" },
          { day: 4, title: "Cumulative quiz", description: "A balanced set across both sections.", type: "quiz", duration: "35 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'act': {
    meta: {
      title: "ACT Study Plan: AI-Built in Seconds | Learnpath",
      description: "Get a personalized ACT study plan in seconds — English, Math, Reading, and Science practice with flashcards and an AI tutor, built around your test date. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for the ACT",
      description: "A personalized ACT plan in seconds — English, Math, Reading, and Science, built around your test date, with an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for the ACT",
      sub: "Tell it your test date or a section you want to raise, and get a study plan in seconds — English, Math, Reading, and Science, built around the time you have — with flashcards and a tutor.",
    },
    benefits: [
      { title: "All four sections, time-managed.", desc: "English, Math, Reading, and Science each need a different approach. The plan budgets your time across them based on where you'll gain most." },
      { title: "The ACT rewards pace.", desc: "It's a fast test. Lessons build the timing strategy for each section, not just the content." },
      { title: "Practice that sticks.", desc: "Flashcards and checkpoint quizzes resurface grammar, math, and strategy on a schedule." },
    ],
    faq: [
      { q: "How long should I study for the ACT?", a: "It depends on your starting point and goal. Learnpath back-schedules from your test date and fits practice into the time you have." },
      { q: "Can I build an ACT plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "What's on the ACT?", a: "Four sections — English, Math, Reading, and Science — plus an optional Writing essay. The plan covers each and the timing each one demands." },
      { q: "Does it replace a tutor or prep course?", a: "No. It handles the planning and daily practice and works alongside any tutor, book, or course you're using." },
    ],
    curriculum: {
      title: "ACT — 3-Week Focused Plan",
      subtitle: "English, Math, Reading, and Science",
      overview: "A three-week plan across all four ACT sections — English and Reading, then Math, then Science and timing — with checkpoint quizzes and spaced review.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "40 min", level: "All levels",
      weeks: [
        { week: 1, theme: "English & Reading", milestone: "Handle grammar and read for pace", quizCount: 1, days: [
          { day: 1, title: "English: grammar & usage", description: "Punctuation, sentence structure, and agreement.", type: "lesson", duration: "40 min" },
          { day: 2, title: "English: rhetoric", description: "Word choice, organization, and style questions.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Reading: strategy & pace", description: "Reading for the main idea fast and finding the detail.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "English and Reading questions.", type: "quiz", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on rules and strategy.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Math", milestone: "Cover the ACT math range with clean setups", quizCount: 1, days: [
          { day: 1, title: "Algebra & functions", description: "Equations, functions, and the algebra the ACT favors.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Geometry & trig", description: "Lines, angles, area, and basic trigonometry.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Numbers & data", description: "Ratios, statistics, and probability.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Checkpoint quiz", description: "Mixed ACT math.", type: "quiz", duration: "30 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across the math topics.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Science & timing", milestone: "Read figures fast and hold pace across the test", quizCount: 1, days: [
          { day: 1, title: "Science: reading figures", description: "Graphs, tables, and experiments — quickly.", type: "lesson", duration: "40 min" },
          { day: 2, title: "Science: conflicting viewpoints", description: "Comparing hypotheses and evidence.", type: "lesson", duration: "40 min" },
          { day: 3, title: "Full-test pacing", description: "Section timing and the order that works for you.", type: "lesson", duration: "40 min" },
          { day: 4, title: "Cumulative quiz", description: "A mixed set across all four sections.", type: "quiz", duration: "35 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  python: {
    meta: {
      title: "Python Study Plan: AI-Built in Seconds | Learnpath",
      description: "Tell it your goal or paste a topic and get a personalized Python learning plan — hands-on lessons, flashcards, and an AI tutor. Free to try, no signup.",
    },
    og: {
      title: "Your AI study partner for Python",
      description: "Tell it your goal or a topic and get a hands-on Python learning plan in seconds — lessons, practice, flashcards, and an AI tutor.",
    },
    hero: {
      h1: "Your AI study partner for Python",
      sub: "Tell it what you want to build or a topic to master, and get a structured learning plan in seconds — hands-on lessons, practice, flashcards, and a tutor for when you get stuck.",
    },
    benefits: [
      { title: "Learn by building.", desc: "Lessons pair each concept with small, runnable examples, so you're writing real Python from day one — not just reading about it." },
      { title: "Goes at your pace.", desc: "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed to match where you are." },
      { title: "Practice that sticks.", desc: "Flashcards and checkpoint quizzes resurface syntax and concepts on a schedule, so the fundamentals become second nature." },
    ],
    faq: [
      { q: "How long does it take to learn Python?", a: "It depends on your goal. For the fundamentals, a few focused weeks is realistic. Learnpath scales the plan to your timeline and how much time you can give it each day." },
      { q: "Can I build a Python study plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials, like a course PDF." },
      { q: "Do I need any programming experience to start?", a: "No. Tell it you're starting from zero and the plan begins with the fundamentals, building up to writing small programs on your own." },
      { q: "What can I learn besides the basics?", a: "Whatever you name — data analysis, web scraping, automation, or a specific library. Give it a goal or a topic and it builds a focused plan around it." },
    ],
    curriculum: {
      title: "Python Foundations — 3-Week Starter Plan",
      subtitle: "From variables to your first real program",
      overview: "A three-week plan that takes you from Python basics to writing small, working programs — syntax and control flow, functions and data structures, then files, errors, and a build.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Syntax & control flow", milestone: "Write programs that make decisions and repeat work", quizCount: 1, days: [
          { day: 1, title: "Variables & types", description: "Numbers, strings, booleans, and how Python stores and converts them.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Operators & input", description: "Arithmetic, comparisons, and reading input from the user.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Conditionals & loops", description: "if/elif/else, for and while, and when to reach for each.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Trace small programs and predict their output.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on syntax and control flow.", type: "review", duration: "20 min" },
        ]},
        { week: 2, theme: "Functions & data structures", milestone: "Organize code into functions and choose the right data structure", quizCount: 1, days: [
          { day: 1, title: "Functions", description: "Defining functions, arguments, return values, and scope.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Lists & dictionaries", description: "Storing and looking up data, and iterating over collections.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Strings & comprehensions", description: "Useful string methods and list/dict comprehensions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Write and read functions that work over lists and dicts.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "20 min" },
        ]},
        { week: 3, theme: "Files, errors & a build", milestone: "Build a small program that reads input and handles errors", quizCount: 1, days: [
          { day: 1, title: "Files & the filesystem", description: "Reading and writing text files, and working with paths.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Errors & exceptions", description: "try/except, common errors, and debugging basics.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Build a small CLI tool", description: "Combine variables, functions, files, and error handling into a working program.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Python in short coding problems.", type: "quiz", duration: "25 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "20 min" },
        ]},
      ],
    },
  },

  'spanish-conversational': {
    meta: {
      title: "Conversational Spanish Plan, AI-Built | Learnpath",
      description: "Get a personalized plan for everyday conversational Spanish — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup.",
    },
    og: {
      title: "Your AI study partner for conversational Spanish",
      description: "Get a plan to actually speak everyday Spanish — practical lessons, spaced vocab, and an AI tutor to practice with.",
    },
    hero: {
      h1: "Your AI study partner for conversational Spanish",
      sub: "Tell it your level or a situation you want to handle, and get a plan to actually speak — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with.",
    },
    benefits: [
      { title: "Built for real conversations.", desc: "Lessons center on the phrases and patterns you'd actually use — introductions, ordering, directions — not grammar drills in isolation." },
      { title: "Vocabulary that sticks.", desc: "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing instead of fading." },
      { title: "Practice with a patient tutor.", desc: "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need." },
    ],
    faq: [
      { q: "How long until I can hold a basic conversation?", a: "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day." },
      { q: "Can I build a Spanish study plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and the ability to upload your own materials." },
      { q: "I'm a complete beginner — is that okay?", a: "Absolutely. Tell it you're starting from zero and the plan begins with greetings and the present tense, building toward everyday conversations." },
      { q: "Does it replace a class or a tutor?", a: "No. It handles your daily practice and vocabulary, and works alongside any class, app, or conversation partner you already have." },
    ],
    curriculum: {
      title: "Conversational Spanish — 3-Week Starter Plan",
      subtitle: "From greetings to handling everyday situations",
      overview: "A three-week plan focused on speaking everyday Spanish — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories.",
      totalWeeks: 3, daysPerWeek: 5, sessionTime: "20 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Greetings & introductions", milestone: "Introduce yourself and ask simple questions", quizCount: 1, days: [
          { day: 1, title: "Greetings & courtesies", description: "Hello and goodbye, please and thank you, and formal vs. informal 'you'.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Introducing yourself", description: "Your name, where you're from, and asking the same in return.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Numbers & the present tense", description: "Counting, plus regular -ar, -er, and -ir verbs in the present.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Short exchanges using greetings and the present tense.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's vocabulary.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Getting around & everyday needs", milestone: "Order food and ask for directions", quizCount: 1, days: [
          { day: 1, title: "Food & ordering", description: "Reading a menu, ordering politely, and common dishes.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Directions & places", description: "Asking where things are and understanding the answer.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Ser vs. estar", description: "The two 'to be' verbs and when to use each.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Role-play ordering and asking for directions.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Past, future & telling stories", milestone: "Talk about what you did and what you'll do", quizCount: 1, days: [
          { day: 1, title: "The past (preterite)", description: "Talking about completed actions, plus a few common irregulars.", type: "lesson", duration: "20 min" },
          { day: 2, title: "The near future", description: "Using 'ir + a + infinitive' to say what you're going to do.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Putting it together", description: "Linking sentences to tell a short, simple story.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Spanish in short conversations.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card before you move on.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },
}