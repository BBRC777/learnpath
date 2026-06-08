// app/learn/topics/highschool.ts — Batch 2b: core high-school classes
import type { TopicData } from './types'

export const highSchoolTopics: Record<string, TopicData> = {
  'algebra-1': {
    meta: { title: "Algebra 1 Study Plan, AI-Built | Learnpath", description: "Get an Algebra 1 study plan in seconds — equations, linear functions, and polynomials — with worked examples, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for Algebra 1", description: "An Algebra 1 plan in seconds — equations to polynomials, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for Algebra 1", sub: "Tell it what your class is covering or a test you're prepping for, and get an Algebra 1 plan in seconds — equations, lines, and polynomials — with worked examples, practice, and a tutor for when you're stuck." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Worked examples, not just rules.", desc: "Every concept comes with a step-by-step example, so you see how to actually solve the problem." },
      { title: "Practice that sticks.", desc: "Flashcards and quizzes resurface the steps you keep slipping on, so they become automatic." },
    ],
    faq: [
      { q: "Can this help me study for an Algebra 1 test?", a: "Yes. Tell it the test date and topics and it builds a focused plan with practice, so you walk in ready." },
      { q: "Can I build an Algebra 1 plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like your class notes." },
      { q: "What does Algebra 1 cover?", a: "Variables and expressions, solving equations and inequalities, linear functions and graphing, systems, exponents, and an introduction to polynomials and quadratics." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Algebra 1 — 3-Week Focused Plan", subtitle: "Equations to polynomials", overview: "A three-week plan across core Algebra 1 — expressions and equations, linear functions and systems, then exponents and polynomials — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Expressions & equations", milestone: "Solve linear equations and inequalities", quizCount: 1, days: [
          { day: 1, title: "Variables & expressions", description: "Evaluating and simplifying expressions.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Solving equations", description: "One- and multi-step linear equations.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Inequalities", description: "Solving and graphing inequalities.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Equations and inequalities.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's steps.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Linear functions & systems", milestone: "Graph lines and solve systems", quizCount: 1, days: [
          { day: 1, title: "Slope & graphing lines", description: "Slope, intercepts, and graphing.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Writing linear equations", description: "Slope-intercept and point-slope form.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Systems of equations", description: "Solving by graphing, substitution, and elimination.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Lines and systems.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Exponents & polynomials", milestone: "Multiply and factor polynomials", quizCount: 1, days: [
          { day: 1, title: "Exponent rules", description: "Properties of exponents and scientific notation.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Polynomials", description: "Adding, subtracting, and multiplying polynomials.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Factoring & quadratics", description: "Factoring and an intro to quadratic equations.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Algebra 1.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'algebra-2': {
    meta: { title: "Algebra 2 Study Plan, AI-Built | Learnpath", description: "Get an Algebra 2 study plan in seconds — functions, polynomials, and exponential and log functions — with worked examples, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for Algebra 2", description: "An Algebra 2 plan in seconds — quadratics to logarithms, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for Algebra 2", sub: "Tell it what your class is covering or a test you're prepping for, and get an Algebra 2 plan in seconds — functions, polynomials, and exponentials — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Worked examples, not just rules.", desc: "Every concept comes with a step-by-step example so the harder Algebra 2 topics actually click." },
      { title: "Practice that sticks.", desc: "Flashcards and quizzes resurface the methods you keep slipping on so they become automatic." },
    ],
    faq: [
      { q: "Can this help me study for an Algebra 2 test?", a: "Yes. Tell it the test date and topics and it builds a focused plan with practice." },
      { q: "Can I build an Algebra 2 plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does Algebra 2 cover?", a: "Functions and quadratics, complex numbers, polynomial, rational, and radical functions, and exponential and logarithmic functions, plus sequences and series." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Algebra 2 — 3-Week Focused Plan", subtitle: "Quadratics to logarithms", overview: "A three-week plan across core Algebra 2 — functions and quadratics, polynomial and rational functions, then exponentials, logs, and sequences — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Functions & quadratics", milestone: "Solve and graph quadratic functions", quizCount: 1, days: [
          { day: 1, title: "Functions & transformations", description: "Function notation, domain/range, and transformations.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Quadratic functions", description: "Graphing parabolas and the quadratic formula.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Complex numbers", description: "Imaginary and complex numbers.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Functions and quadratics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's methods.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Polynomials, rationals & radicals", milestone: "Work with higher-degree and rational functions", quizCount: 1, days: [
          { day: 1, title: "Polynomial functions", description: "Graphs, roots, and end behavior.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Rational expressions", description: "Simplifying and solving rational equations.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Radicals & exponents", description: "Radical expressions and rational exponents.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Polynomials, rationals, and radicals.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Exponentials, logs & sequences", milestone: "Solve exponential and logarithmic equations", quizCount: 1, days: [
          { day: 1, title: "Exponential functions", description: "Growth, decay, and graphing.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Logarithms", description: "Log rules and solving log equations.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Sequences & series", description: "Arithmetic and geometric sequences.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Algebra 2.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'geometry': {
    meta: { title: "Geometry Study Plan, AI-Built | Learnpath", description: "Get a Geometry study plan in seconds — proofs, triangles, circles, and area and volume — with worked examples, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for Geometry", description: "A Geometry plan in seconds — proofs to volume, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for Geometry", sub: "Tell it what your class is covering or a test you're prepping for, and get a Geometry plan in seconds — proofs, triangles, and circles — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Proofs made approachable.", desc: "Lessons build the reasoning behind proofs step by step — the part most students find hardest." },
      { title: "Practice that sticks.", desc: "Flashcards resurface theorems and formulas on a schedule so they're there on test day." },
    ],
    faq: [
      { q: "Can this help me with geometry proofs?", a: "Yes. Lessons break proofs into the postulates and theorems they use, and the tutor can walk through one with you step by step." },
      { q: "Can I build a Geometry plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does Geometry cover?", a: "Points, lines, and angles, reasoning and proof, parallel lines, triangles and congruence, similarity, right-triangle trigonometry, circles, and area and volume." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Geometry — 3-Week Focused Plan", subtitle: "Proofs to area and volume", overview: "A three-week plan across core Geometry — foundations and proofs, triangles and similarity, then right triangles, circles, and area and volume — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Foundations & proofs", milestone: "Write a basic geometric proof", quizCount: 1, days: [
          { day: 1, title: "Points, lines & angles", description: "Basic terms and angle relationships.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Reasoning & proof", description: "Conditional statements and two-column proofs.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Parallel lines", description: "Angles formed by transversals.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Foundations and proofs.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on definitions and theorems.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Triangles & similarity", milestone: "Prove triangles congruent or similar", quizCount: 1, days: [
          { day: 1, title: "Triangle basics", description: "Angle sums, types, and inequalities.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Congruence", description: "SSS, SAS, ASA, and CPCTC.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Similarity", description: "Similar triangles and proportions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Congruence and similarity.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Right triangles, circles & solids", milestone: "Apply the Pythagorean theorem and find volumes", quizCount: 1, days: [
          { day: 1, title: "Right triangles & trig", description: "Pythagorean theorem and basic trig ratios.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Circles", description: "Arcs, angles, and segments in circles.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Area & volume", description: "Area of polygons and volume of solids.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Geometry.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'trigonometry': {
    meta: { title: "Trigonometry Study Plan, AI-Built | Learnpath", description: "Get a Trigonometry study plan in seconds — right-triangle trig, the unit circle, and identities — with worked examples, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for Trigonometry", description: "A Trigonometry plan in seconds — right triangles to identities, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for Trigonometry", sub: "Tell it what your class is covering or a test you're prepping for, and get a Trigonometry plan in seconds — right-triangle trig, the unit circle, and identities — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "The unit circle, finally clear.", desc: "Lessons build the unit circle and how it ties the ratios, graphs, and identities together." },
      { title: "Practice that sticks.", desc: "Flashcards resurface identities and key values on a schedule so they're automatic." },
    ],
    faq: [
      { q: "Can this help me memorize the unit circle?", a: "Yes — flashcards drill the key angles and values, and lessons show how the unit circle connects the ratios you actually use." },
      { q: "Can I build a Trigonometry plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does Trigonometry cover?", a: "Right-triangle ratios, the unit circle and radians, graphing trig functions, identities, solving trig equations, and the laws of sines and cosines." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Trigonometry — 3-Week Focused Plan", subtitle: "Right triangles to identities", overview: "A three-week plan across core Trigonometry — right-triangle trig, the unit circle and graphs, then identities and equations — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Right-triangle trig", milestone: "Solve right triangles with the ratios", quizCount: 1, days: [
          { day: 1, title: "Sine, cosine & tangent", description: "The ratios and SOH-CAH-TOA.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Solving right triangles", description: "Finding missing sides and angles.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Applications", description: "Angles of elevation and depression.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Right-triangle trig.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on the ratios.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Unit circle & functions", milestone: "Use the unit circle and graph the functions", quizCount: 1, days: [
          { day: 1, title: "Radians & the unit circle", description: "Converting angles and the unit circle.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Graphing trig functions", description: "Amplitude, period, and shifts.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Inverse trig", description: "Inverse functions and their use.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Unit circle and graphs.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Identities & equations", milestone: "Prove identities and solve trig equations", quizCount: 1, days: [
          { day: 1, title: "Fundamental identities", description: "Pythagorean and reciprocal identities.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Solving trig equations", description: "Finding solutions over an interval.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Laws of sines & cosines", description: "Solving non-right triangles.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of trigonometry.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'precalculus': {
    meta: { title: "Precalculus Study Plan, AI-Built | Learnpath", description: "Get a Precalculus study plan in seconds — functions, exponentials and logs, and trig — with worked examples, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for Precalculus", description: "A Precalculus plan in seconds — functions to trig, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for Precalculus", sub: "Tell it what your class is covering or a test you're prepping for, and get a Precalculus plan in seconds — functions, exponentials and logs, and trig — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Builds the bridge to calculus.", desc: "Lessons connect functions, graphs, and trig so the jump to calculus feels natural." },
      { title: "Practice that sticks.", desc: "Flashcards resurface identities and function behavior on a schedule so they're automatic." },
    ],
    faq: [
      { q: "Will this prepare me for calculus?", a: "That's the point of precalc. The plan focuses on the functions, graphs, and trig you'll lean on most in calculus." },
      { q: "Can I build a Precalculus plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does Precalculus cover?", a: "Functions and their transformations, polynomial and rational functions, exponential and logarithmic functions, trigonometry, and often vectors, sequences, and an intro to limits." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Precalculus — 3-Week Focused Plan", subtitle: "Functions to trig", overview: "A three-week plan across core Precalculus — functions and their behavior, exponentials, logs, and trig, then identities, vectors, and an intro to limits — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Functions & their behavior", milestone: "Analyze and transform functions", quizCount: 1, days: [
          { day: 1, title: "Functions & transformations", description: "Notation, domain/range, and transformations.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Polynomial & rational functions", description: "Graphs, zeros, and asymptotes.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Composition & inverses", description: "Composing functions and finding inverses.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Function behavior.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's concepts.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Exponentials, logs & trig", milestone: "Work with exponential, log, and trig functions", quizCount: 1, days: [
          { day: 1, title: "Exponential & log functions", description: "Graphs, rules, and equations.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Trig functions", description: "The unit circle and graphing.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Trig applications", description: "Modeling with periodic functions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Exponentials, logs, and trig.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Identities, vectors & limits", milestone: "Prove identities and preview limits", quizCount: 1, days: [
          { day: 1, title: "Trig identities", description: "Proving and applying identities.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Vectors & sequences", description: "Vectors, sequences, and series.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Intro to limits", description: "What a limit is, ahead of calculus.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of precalculus.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-calculus': {
    meta: { title: "High School Calculus Plan, AI-Built | Learnpath", description: "Get a high school Calculus study plan in seconds — limits, derivatives, and integrals — with worked examples, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for high school Calculus", description: "A Calculus plan in seconds — limits to integrals, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for high school Calculus", sub: "Tell it what your class is covering or a test you're prepping for, and get a Calculus plan in seconds — limits, derivatives, and integrals — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Understand it, don't just memorize.", desc: "Lessons build the intuition behind derivatives and integrals so the rules actually make sense." },
      { title: "Practice that sticks.", desc: "Flashcards resurface rules and theorems on a schedule so they're automatic on a test." },
    ],
    faq: [
      { q: "Is this for AP Calculus?", a: "It works for any first calculus course. For the AP exams specifically, try the AP Calculus AB or BC plans, which are built around the exam." },
      { q: "Can I build a Calculus plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does high school Calculus cover?", a: "Limits and continuity, derivatives and their applications, integrals and the Fundamental Theorem, and applications like area and motion." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Calculus — 3-Week Focused Plan", subtitle: "Limits to integrals", overview: "A three-week plan across a first calculus course — limits and derivatives, applications of derivatives, then integrals and their applications — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Limits & derivatives", milestone: "Differentiate with the major rules", quizCount: 1, days: [
          { day: 1, title: "Limits & continuity", description: "Evaluating limits and continuity.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The derivative", description: "Definition and basic rules.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Product, quotient & chain", description: "Differentiating combined functions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Limits and derivatives.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on the rules.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Applications of derivatives", milestone: "Use derivatives to analyze and optimize", quizCount: 1, days: [
          { day: 1, title: "Curve analysis", description: "Increasing/decreasing and concavity.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Related rates", description: "Rates of change in related quantities.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Optimization", description: "Finding maxima and minima.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Applications of derivatives.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Integrals & applications", milestone: "Evaluate integrals and apply the FTC", quizCount: 1, days: [
          { day: 1, title: "The integral & FTC", description: "Antiderivatives and the Fundamental Theorem.", type: "lesson", duration: "30 min" },
          { day: 2, title: "u-substitution", description: "Integrating by substitution.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Area & motion", description: "Area under a curve and motion problems.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of calculus.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-biology': {
    meta: { title: "High School Biology Plan, AI-Built | Learnpath", description: "Get a high school Biology study plan in seconds — cells, genetics, evolution, and ecology — with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for high school Biology", description: "A Biology plan in seconds — cells to ecology, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for high school Biology", sub: "Tell it what your class is covering or a test you're prepping for, and get a Biology plan in seconds — cells, genetics, evolution, and ecology — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Connects the big picture.", desc: "Lessons tie cells, genes, and ecosystems together so biology is a story, not a vocab list." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface terms and processes on a schedule so they stick for the test." },
    ],
    faq: [
      { q: "Can this help me study for a biology test?", a: "Yes. Tell it the test date and topics and it builds a focused plan with flashcards and quizzes." },
      { q: "Can I build a Biology plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like your notes." },
      { q: "What does high school Biology cover?", a: "The chemistry of life and cells, cellular energy, genetics and DNA, evolution, and ecology." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "High School Biology — 3-Week Focused Plan", subtitle: "Cells to ecology", overview: "A three-week plan across core high school biology — cells and biochemistry, genetics, then evolution and ecology — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Cells & biochemistry", milestone: "Explain how cells work and get energy", quizCount: 1, days: [
          { day: 1, title: "Chemistry of life", description: "Water, macromolecules, and enzymes.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Cell structure", description: "Organelles and the cell membrane.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Cellular energy", description: "Photosynthesis and respiration.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Cells and energy.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Flashcard recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Genetics", milestone: "Predict inheritance and explain gene expression", quizCount: 1, days: [
          { day: 1, title: "DNA & replication", description: "Structure and how DNA copies itself.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Protein synthesis", description: "Transcription and translation.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Inheritance", description: "Mendelian genetics and Punnett squares.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Genetics.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Evolution & ecology", milestone: "Connect natural selection to ecosystems", quizCount: 1, days: [
          { day: 1, title: "Evolution", description: "Natural selection and evidence.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Ecology", description: "Food webs, cycles, and populations.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Human impact", description: "Biodiversity and ecosystems under pressure.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of biology.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-chemistry': {
    meta: { title: "High School Chemistry Plan, AI-Built | Learnpath", description: "Get a high school Chemistry study plan in seconds — atoms, reactions, and stoichiometry — with worked examples, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for high school Chemistry", description: "A Chemistry plan in seconds — atoms to acids and bases, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for high school Chemistry", sub: "Tell it what your class is covering or a test you're prepping for, and get a Chemistry plan in seconds — atoms, reactions, and stoichiometry — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Stoichiometry, step by step.", desc: "The math that trips people up gets worked examples, so the mole and balancing problems click." },
      { title: "Practice that sticks.", desc: "Flashcards resurface trends, formulas, and reaction types on a schedule." },
    ],
    faq: [
      { q: "Can this help with stoichiometry?", a: "Yes — it's one of the hardest parts of the course, so lessons walk through mole conversions and balancing with worked examples." },
      { q: "Can I build a Chemistry plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does high school Chemistry cover?", a: "Atomic structure and the periodic table, bonding, chemical reactions, stoichiometry, states of matter and gases, solutions, and acids and bases." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "High School Chemistry — 3-Week Focused Plan", subtitle: "Atoms to acids and bases", overview: "A three-week plan across core high school chemistry — atoms and the periodic table, reactions and stoichiometry, then states, solutions, and acids and bases — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Atoms & bonding", milestone: "Predict bonding from the periodic table", quizCount: 1, days: [
          { day: 1, title: "Atomic structure", description: "Protons, electrons, and isotopes.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The periodic table", description: "Organization and periodic trends.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Bonding", description: "Ionic and covalent bonds.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Atoms and bonding.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Reactions & stoichiometry", milestone: "Balance reactions and do mole math", quizCount: 1, days: [
          { day: 1, title: "Chemical reactions", description: "Reaction types and balancing equations.", type: "lesson", duration: "30 min" },
          { day: 2, title: "The mole", description: "Molar mass and conversions.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Stoichiometry", description: "Mole ratios and limiting reagents.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Reactions and stoichiometry.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "States, solutions & acids/bases", milestone: "Work with gases, solutions, and pH", quizCount: 1, days: [
          { day: 1, title: "Gases", description: "The gas laws and the ideal gas law.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Solutions", description: "Concentration and molarity.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Acids & bases", description: "pH, neutralization, and indicators.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of chemistry.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-physics': {
    meta: { title: "High School Physics Plan, AI-Built | Learnpath", description: "Get a high school Physics study plan in seconds — motion, forces, energy, and waves — with worked examples, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for high school Physics", description: "A Physics plan in seconds — motion to electricity, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for high school Physics", sub: "Tell it what your class is covering or a test you're prepping for, and get a Physics plan in seconds — motion, forces, and energy — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Concepts behind the equations.", desc: "Lessons build why each formula works, so you can set up a problem instead of guessing." },
      { title: "Practice that sticks.", desc: "Flashcards resurface relationships and units on a schedule so they're automatic." },
    ],
    faq: [
      { q: "Is this for AP Physics?", a: "It works for any first physics course. For the AP exams, try the AP Physics 1 or Physics C plans, which are built around the exam." },
      { q: "Can I build a Physics plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does high school Physics cover?", a: "Motion and kinematics, forces and Newton's laws, energy and momentum, and waves, sound, and basic electricity and magnetism." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "High School Physics — 3-Week Focused Plan", subtitle: "Motion to electricity", overview: "A three-week plan across core high school physics — motion and forces, energy and momentum, then waves and electricity — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "30 min", level: "High school",
      weeks: [
        { week: 1, theme: "Motion & forces", milestone: "Solve motion and force problems", quizCount: 1, days: [
          { day: 1, title: "Kinematics", description: "Speed, velocity, acceleration, and graphs.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Newton's laws", description: "Forces, free-body diagrams, and friction.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Projectile & 2D motion", description: "Motion in two dimensions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Motion and forces.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's relationships.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Energy & momentum", milestone: "Apply conservation of energy and momentum", quizCount: 1, days: [
          { day: 1, title: "Work & energy", description: "Work, kinetic and potential energy.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Conservation of energy", description: "Energy transformations and power.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Momentum", description: "Impulse, momentum, and collisions.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Checkpoint quiz", description: "Energy and momentum.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Waves & electricity", milestone: "Describe waves and simple circuits", quizCount: 1, days: [
          { day: 1, title: "Waves & sound", description: "Wave properties and sound.", type: "lesson", duration: "30 min" },
          { day: 2, title: "Light & optics", description: "Reflection, refraction, and lenses.", type: "lesson", duration: "30 min" },
          { day: 3, title: "Electricity", description: "Current, voltage, and simple circuits.", type: "lesson", duration: "30 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of physics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'earth-science': {
    meta: { title: "Earth Science Study Plan, AI-Built | Learnpath", description: "Get an Earth Science study plan in seconds — geology, weather, oceans, and astronomy — with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for Earth Science", description: "An Earth Science plan in seconds — geology to astronomy, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for Earth Science", sub: "Tell it what your class is covering or a test you're prepping for, and get an Earth Science plan in seconds — geology, weather, oceans, and space — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Connects the Earth's systems.", desc: "Lessons link the rocks, atmosphere, oceans, and sky so it's one system, not separate units." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface processes, cycles, and terms on a schedule so they stick for the test." },
    ],
    faq: [
      { q: "Can this help me study for an Earth Science test?", a: "Yes. Tell it the test date and topics and it builds a focused plan with flashcards and quizzes." },
      { q: "Can I build an Earth Science plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does Earth Science cover?", a: "Geology and plate tectonics, rocks and minerals, the atmosphere and weather, oceans, and astronomy and the Earth's history." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Earth Science — 3-Week Focused Plan", subtitle: "Geology to astronomy", overview: "A three-week plan across core Earth Science — geology and plate tectonics, weather and oceans, then astronomy and Earth's history — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Geology", milestone: "Explain plate tectonics and the rock cycle", quizCount: 1, days: [
          { day: 1, title: "Earth's structure", description: "Layers of the Earth and its interior.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Plate tectonics", description: "Plate boundaries, earthquakes, and volcanoes.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Rocks & minerals", description: "The rock cycle and mineral identification.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Geology.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Weather & oceans", milestone: "Explain weather patterns and the water cycle", quizCount: 1, days: [
          { day: 1, title: "The atmosphere", description: "Layers, composition, and the water cycle.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Weather", description: "Fronts, pressure systems, and storms.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Oceans & climate", description: "Currents, tides, and climate.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Weather and oceans.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Astronomy & Earth's history", milestone: "Describe the solar system and geologic time", quizCount: 1, days: [
          { day: 1, title: "The solar system", description: "The Sun, planets, and Earth-Moon system.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Stars & the universe", description: "Stars, galaxies, and the universe.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Earth's history", description: "Geologic time and fossils.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Earth Science.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-environmental-science': {
    meta: { title: "Environmental Science Plan, AI-Built | Learnpath", description: "Get a high school Environmental Science study plan in seconds — ecosystems, resources, and climate — with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for Environmental Science", description: "An Environmental Science plan in seconds — ecosystems to climate, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for Environmental Science", sub: "Tell it what your class is covering or a test you're prepping for, and get an Environmental Science plan in seconds — ecosystems, resources, and climate — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Connects science to real issues.", desc: "Lessons tie the concepts to the resource and climate questions the course is really about." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface cycles, terms, and case studies on a schedule so they stick." },
    ],
    faq: [
      { q: "Is this for AP Environmental Science?", a: "It works for any environmental science course. For the AP exam specifically, try the AP Environmental Science plan, which is built around the exam." },
      { q: "Can I build an Environmental Science plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does Environmental Science cover?", a: "Ecosystems and biogeochemical cycles, populations, natural resources and human use, pollution, and climate change and sustainability." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Environmental Science — 3-Week Focused Plan", subtitle: "Ecosystems to climate", overview: "A three-week plan across core environmental science — ecosystems and cycles, resources and human impact, then pollution, climate, and sustainability — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Ecosystems & cycles", milestone: "Trace energy and matter through ecosystems", quizCount: 1, days: [
          { day: 1, title: "Ecosystems", description: "Energy flow and food webs.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Biogeochemical cycles", description: "The carbon, nitrogen, and water cycles.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Biodiversity", description: "Biomes and why diversity matters.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Ecosystems and cycles.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Resources & human impact", milestone: "Analyze how humans use resources", quizCount: 1, days: [
          { day: 1, title: "Populations", description: "Population growth and carrying capacity.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Land & water", description: "Agriculture, land use, and water resources.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Energy", description: "Fossil fuels and renewable energy.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Resources and impact.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Pollution, climate & sustainability", milestone: "Connect pollution, climate, and solutions", quizCount: 1, days: [
          { day: 1, title: "Pollution", description: "Air, water, and waste.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Climate change", description: "Causes, effects, and the greenhouse effect.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Sustainability", description: "Conservation and sustainable choices.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of environmental science.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'us-history': {
    meta: { title: "US History Study Plan, AI-Built | Learnpath", description: "Get a US History study plan in seconds — founding to the present, organized by era — with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for US History", description: "A US History plan in seconds — founding to the present, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for US History", sub: "Tell it what your class is covering or a test you're prepping for, and get a US History plan in seconds — the founding to the present — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the era you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Cause and effect, not just dates.", desc: "Lessons connect events so the timeline makes sense instead of being a list to memorize." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface people, events, and turning points on a schedule so they stick." },
    ],
    faq: [
      { q: "Is this for AP US History?", a: "It works for any US History course. For the AP exam, try the AP US History plan, which is built around the periods and the essays." },
      { q: "Can I build a US History plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does US History cover?", a: "The colonial era and founding through the Civil War and Reconstruction, industrialization and the world wars, and the Cold War to the present." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "US History — 3-Week Focused Plan", subtitle: "Founding to the present", overview: "A three-week plan across US History — the founding through the Civil War, Reconstruction through World War II, then the Cold War to the present — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Founding to Civil War", milestone: "Explain the founding and the road to war", quizCount: 1, days: [
          { day: 1, title: "Colonial era & revolution", description: "Colonies, independence, and the war.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Constitution & new nation", description: "The founding and the early republic.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Expansion & Civil War", description: "Westward expansion, slavery, and the Civil War.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Founding to Civil War.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's events.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Reconstruction to WWII", milestone: "Connect industry, reform, and global conflict", quizCount: 1, days: [
          { day: 1, title: "Reconstruction & the Gilded Age", description: "Rebuilding and industrialization.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Progressive Era & WWI", description: "Reform and the First World War.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Depression & WWII", description: "The Great Depression and World War II.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Reconstruction to WWII.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Cold War to present", milestone: "Trace the US through the modern era", quizCount: 1, days: [
          { day: 1, title: "Cold War", description: "Containment, the Red Scare, and global conflict.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Civil Rights & the 1960s", description: "The movement and social change.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Modern America", description: "Recent decades to the present.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of US History.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'world-history': {
    meta: { title: "World History Study Plan, AI-Built | Learnpath", description: "Get a World History study plan in seconds — ancient civilizations to the present, organized by era — with flashcards and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for World History", description: "A World History plan in seconds — ancient times to the present, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for World History", sub: "Tell it what your class is covering or a test you're prepping for, and get a World History plan in seconds — ancient civilizations to the present — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the era you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Connections across regions.", desc: "Lessons link civilizations and turning points so world history is a story, not scattered facts." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface empires, events, and dates on a schedule so they stick." },
    ],
    faq: [
      { q: "Is this for AP World History?", a: "It works for any world history course. For the AP exam, try the AP World History plan, which is built around the periods and the essays." },
      { q: "Can I build a World History plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does World History cover?", a: "Early and classical civilizations, the medieval world, exploration and revolutions, industrialization and imperialism, and the twentieth century to the present." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "World History — 3-Week Focused Plan", subtitle: "Ancient civilizations to the present", overview: "A three-week plan across World History — ancient and classical civilizations, exploration through imperialism, then the twentieth century to the present — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Ancient & classical worlds", milestone: "Compare early civilizations and empires", quizCount: 1, days: [
          { day: 1, title: "Early civilizations", description: "River valley civilizations and their legacies.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Classical empires", description: "Greece, Rome, and classical Asia.", type: "lesson", duration: "25 min" },
          { day: 3, title: "The medieval world", description: "Post-classical empires and trade networks.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Ancient and classical eras.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's content.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Exploration to imperialism", milestone: "Connect revolutions and global expansion", quizCount: 1, days: [
          { day: 1, title: "Exploration & empires", description: "The age of exploration and early modern empires.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Revolutions", description: "Political and industrial revolutions.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Imperialism", description: "Industrialization and new imperialism.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Exploration to imperialism.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "The modern world", milestone: "Trace the global twentieth century", quizCount: 1, days: [
          { day: 1, title: "The world wars", description: "WWI, the interwar years, and WWII.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Cold War & decolonization", description: "Superpowers and new nations.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Globalization", description: "A connected, modern world.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of World History.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'english-literature': {
    meta: { title: "English Literature Study Plan, AI-Built | Learnpath", description: "Get an English Literature study plan in seconds — close reading, analysis, and writing about texts — with practice and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for English Literature", description: "An English Literature plan in seconds — close reading to the literary essay, with an AI tutor." },
    hero: { h1: "Your AI study partner for English Literature", sub: "Tell it what your class is reading or an essay you're working on, and get an English Literature plan in seconds — close reading, analysis, and writing — with practice and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit or the text and the plan covers the skills and concepts you need for it." },
      { title: "Analysis you can do yourself.", desc: "Lessons build close reading — theme, character, language — so you can analyze any text, not just the ones you've studied." },
      { title: "Better essays with feedback.", desc: "Draft a thesis or a paragraph and ask the tutor to push your argument and evidence." },
    ],
    faq: [
      { q: "Can it help me write a literary essay?", a: "Yes. Lessons build the thesis, evidence, and analysis a strong essay needs, and the tutor can give feedback on your draft." },
      { q: "Can I build an English Literature plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a text you're studying." },
      { q: "What does it cover?", a: "Close reading and literary elements, analyzing poetry, prose, and drama, and writing analytical essays about literature." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class and teacher." },
    ],
    curriculum: {
      title: "English Literature — 3-Week Focused Plan", subtitle: "Close reading to the literary essay", overview: "A three-week plan across English Literature skills — close reading and literary elements, analyzing poetry, prose, and drama, then writing about literature — with practice and review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Close reading & elements", milestone: "Identify and analyze literary elements", quizCount: 1, days: [
          { day: 1, title: "Theme & meaning", description: "Finding and tracing a theme.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Character & conflict", description: "Characterization and types of conflict.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Figurative language", description: "Metaphor, symbolism, and tone.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Literary elements.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on terms and devices.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Analyzing texts", milestone: "Analyze poetry, prose, and drama", quizCount: 1, days: [
          { day: 1, title: "Reading poetry", description: "Form, imagery, and meaning.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Reading prose", description: "Narration, point of view, and style.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Reading drama", description: "Dramatic structure and analysis.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Practice analysis", description: "A short analysis with review.", type: "exercise", duration: "25 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Writing about literature", milestone: "Write an analytical essay with evidence", quizCount: 1, days: [
          { day: 1, title: "Thesis & argument", description: "Building an arguable interpretation.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Evidence & analysis", description: "Using quotations and explaining them.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Structure & revision", description: "Organizing and polishing the essay.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Essay practice", description: "A short literary essay with review.", type: "exercise", duration: "30 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged note.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-statistics': {
    meta: { title: "Statistics Study Plan, AI-Built | Learnpath", description: "Get a high school Statistics study plan in seconds — data, probability, and inference — with worked examples, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for Statistics", description: "A Statistics plan in seconds — data to inference, with worked examples and an AI tutor." },
    hero: { h1: "Your AI study partner for Statistics", sub: "Tell it what your class is covering or a test you're prepping for, and get a Statistics plan in seconds — data, probability, and inference — with worked examples, practice, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Concepts plus the calculations.", desc: "Lessons build both what a statistic means and how to compute it, with worked examples." },
      { title: "Practice that sticks.", desc: "Flashcards resurface definitions and formulas on a schedule so they're automatic." },
    ],
    faq: [
      { q: "Is this for AP Statistics?", a: "It works for any first stats course. For the AP exam, try the AP Statistics plan, which is built around the exam." },
      { q: "Can I build a Statistics plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does the course cover?", a: "Exploring and describing data, probability, distributions, sampling, and an introduction to confidence intervals and hypothesis testing." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Statistics — 3-Week Focused Plan", subtitle: "Data to inference", overview: "A three-week plan across a first statistics course — describing data, probability and distributions, then sampling and basic inference — with worked examples, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Describing data", milestone: "Summarize and display a data set", quizCount: 1, days: [
          { day: 1, title: "Center & spread", description: "Mean, median, range, and standard deviation.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Displaying data", description: "Histograms, box plots, and shape.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Two-variable data", description: "Scatterplots and correlation.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Describing data.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Probability & distributions", milestone: "Use probability and the normal model", quizCount: 1, days: [
          { day: 1, title: "Probability basics", description: "Rules, conditional probability, and independence.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Random variables", description: "Expected value and variability.", type: "lesson", duration: "25 min" },
          { day: 3, title: "The normal distribution", description: "z-scores and normal calculations.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Probability and distributions.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Sampling & inference", milestone: "Understand sampling and basic inference", quizCount: 1, days: [
          { day: 1, title: "Sampling & surveys", description: "Sampling methods and bias.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Confidence intervals", description: "Estimating with intervals.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Hypothesis testing", description: "The idea behind significance tests.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of statistics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-economics': {
    meta: { title: "Economics Study Plan, AI-Built | Learnpath", description: "Get a high school Economics study plan in seconds — micro, macro, and personal finance — with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for Economics", description: "An Economics plan in seconds — micro and macro to personal finance, with an AI tutor." },
    hero: { h1: "Your AI study partner for Economics", sub: "Tell it what your class is covering or a test you're prepping for, and get an Economics plan in seconds — microeconomics, macroeconomics, and personal finance — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Graphs that make sense.", desc: "Lessons build supply-and-demand and other graphs step by step, so you can read and draw them." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface terms and concepts on a schedule so they stick for the test." },
    ],
    faq: [
      { q: "Is this for AP Economics?", a: "It works for any econ course. For the AP exams, try the AP Macroeconomics or AP Microeconomics plans, built around the exams." },
      { q: "Can I build an Economics plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does high school Economics cover?", a: "Basic economic concepts, microeconomics like supply and demand and markets, macroeconomics like GDP and policy, and often personal finance." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Economics — 3-Week Focused Plan", subtitle: "Micro and macro to personal finance", overview: "A three-week plan across high school economics — basic concepts and microeconomics, macroeconomics, then personal finance and the global economy — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Concepts & microeconomics", milestone: "Find market equilibrium with supply and demand", quizCount: 1, days: [
          { day: 1, title: "Basic concepts", description: "Scarcity, choice, and opportunity cost.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Supply & demand", description: "Markets, shifts, and equilibrium.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Markets & competition", description: "How different markets work.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Concepts and microeconomics.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Macroeconomics", milestone: "Explain GDP, inflation, and policy", quizCount: 1, days: [
          { day: 1, title: "Measuring the economy", description: "GDP, inflation, and unemployment.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Government & policy", description: "Fiscal and monetary policy basics.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Money & banking", description: "How money and banks work.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Macroeconomics.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Personal finance & the world", milestone: "Apply economics to money and trade", quizCount: 1, days: [
          { day: 1, title: "Personal finance", description: "Budgeting, saving, credit, and investing.", type: "lesson", duration: "25 min" },
          { day: 2, title: "International trade", description: "Trade, exchange rates, and globalization.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Economic systems", description: "Comparing economic systems.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of economics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'high-school-psychology': {
    meta: { title: "Psychology Study Plan, AI-Built | Learnpath", description: "Get a high school Psychology study plan in seconds — the brain, learning, development, and disorders — with flashcards and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for Psychology", description: "A Psychology plan in seconds — the brain to social psychology, with spaced recall and an AI tutor." },
    hero: { h1: "Your AI study partner for Psychology", sub: "Tell it what your class is covering or a test you're prepping for, and get a Psychology plan in seconds — the brain, learning, development, and disorders — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "Theories tied to examples.", desc: "Lessons connect each theory to a real example so you can recognize it, not just define it." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface terms and theorists on a schedule so they stick for the test." },
    ],
    faq: [
      { q: "Is this for AP Psychology?", a: "It works for any psychology course. For the AP exam, try the AP Psychology plan, which is built around the units." },
      { q: "Can I build a Psychology plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does high school Psychology cover?", a: "The biology of the brain, sensation and perception, learning and memory, development, personality, psychological disorders, and social psychology." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "Psychology — 3-Week Focused Plan", subtitle: "The brain to social psychology", overview: "A three-week plan across high school psychology — the brain and the senses, learning, memory, and development, then personality, disorders, and social psychology — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "The brain & the senses", milestone: "Connect the brain to behavior", quizCount: 1, days: [
          { day: 1, title: "Intro & research methods", description: "What psychology is and how it's studied.", type: "lesson", duration: "25 min" },
          { day: 2, title: "The brain & nervous system", description: "Neurons and brain regions.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Sensation & perception", description: "How we sense and interpret the world.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "The brain and the senses.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Learning, memory & development", milestone: "Apply learning and developmental theories", quizCount: 1, days: [
          { day: 1, title: "Learning", description: "Classical and operant conditioning.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Memory", description: "How memory is formed and lost.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Development", description: "How people change across the lifespan.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Learning, memory, and development.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Personality, disorders & social", milestone: "Recognize disorders and social influences", quizCount: 1, days: [
          { day: 1, title: "Personality", description: "Major theories of personality.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Disorders & treatment", description: "Common disorders and how they're treated.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Social psychology", description: "How others shape our behavior.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of psychology.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'us-government-and-civics': {
    meta: { title: "US Government & Civics Plan, AI-Built | Learnpath", description: "Get a US Government and Civics study plan in seconds — the Constitution, the branches, and your rights — with flashcards and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for US Government & Civics", description: "A US Government plan in seconds — the Constitution to participation, with an AI tutor." },
    hero: { h1: "Your AI study partner for US Government & Civics", sub: "Tell it what your class is covering or a test you're prepping for, and get a Government and Civics plan in seconds — the Constitution, the branches, and your rights — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Keeps up with your class.", desc: "Tell it the unit you're on and the plan covers exactly that, in the order your class moves." },
      { title: "How it actually works.", desc: "Lessons explain how the branches, elections, and rights connect, not just definitions to memorize." },
      { title: "Spaced recall built in.", desc: "Flashcards resurface the Constitution, cases, and terms on a schedule so they stick." },
    ],
    faq: [
      { q: "Is this for AP US Government?", a: "It works for any government or civics course. For the AP exam, try the AP US Government plan, which is built around the required documents and cases." },
      { q: "Can I build a Government plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "What does the course cover?", a: "The foundations of government and the Constitution, the three branches, federalism, civil liberties and rights, and citizenship and political participation." },
      { q: "Does it replace my teacher or class?", a: "No. It handles planning and practice and works alongside your class, textbook, and teacher." },
    ],
    curriculum: {
      title: "US Government & Civics — 3-Week Focused Plan", subtitle: "The Constitution to participation", overview: "A three-week plan across US Government and Civics — foundations and the Constitution, the branches of government, then rights, citizenship, and participation — with flashcards, quizzes, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "High school",
      weeks: [
        { week: 1, theme: "Foundations & the Constitution", milestone: "Explain the Constitution and its principles", quizCount: 1, days: [
          { day: 1, title: "Why government?", description: "Purposes of government and types of systems.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Founding & the Constitution", description: "The founding documents and their ideas.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Principles & federalism", description: "Separation of powers and federal vs. state.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Foundations and the Constitution.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "The branches", milestone: "Describe each branch and checks and balances", quizCount: 1, days: [
          { day: 1, title: "Legislative branch", description: "Congress and how laws are made.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Executive branch", description: "The presidency and the bureaucracy.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Judicial branch", description: "The courts and judicial review.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "The three branches.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Rights & participation", milestone: "Explain your rights and how to participate", quizCount: 1, days: [
          { day: 1, title: "Civil liberties & rights", description: "The Bill of Rights and key protections.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Citizenship", description: "Rights, duties, and responsibilities.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Elections & participation", description: "Voting, parties, and getting involved.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of Government and Civics.", type: "quiz", duration: "20 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },
}