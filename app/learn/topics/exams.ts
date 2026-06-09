// app/learn/topics/exams.ts — remaining licensing & admissions exams
import type { TopicData } from './types'

export const examTopics: Record<string, TopicData> = 
{
  "usmle-step-2": {
    "meta": {
      "title": "USMLE Step 2 CK Study Plan, AI-Built | Learnpath",
      "description": "Get a USMLE Step 2 CK study plan in seconds — medicine, surgery, peds, OB/GYN, and more — with high-yield lessons, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for USMLE Step 2 CK",
      "description": "A Step 2 CK plan in seconds — organized by discipline, with high-yield lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for USMLE Step 2 CK",
      "sub": "Tell it your test date or a discipline, and get a Step 2 CK plan in seconds — organized by the clinical disciplines, high-yield first, with lessons, flashcards, and a tutor for when you're stuck."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "High-yield, clinical first.",
        "desc": "Lessons focus on the management and diagnosis the exam tests, organized the way the test is."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for Step 2 CK?",
        "a": "Most students give it a few focused weeks alongside rotations. Learnpath back-schedules from your test date to fit the time you have."
      },
      {
        "q": "Can I build a Step 2 CK plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Step 2 CK cover?",
        "a": "Clinical knowledge across internal medicine, surgery, pediatrics, obstetrics and gynecology, psychiatry, and neurology, plus ethics and biostatistics."
      },
      {
        "q": "Does it replace a Step 2 CK prep course?",
        "a": "No. It handles planning and daily practice and works alongside any prep course, book, or question bank you're using."
      }
    ],
    "curriculum": {
      "title": "USMLE Step 2 CK — 3-Week High-Yield Plan",
      "subtitle": "Organized by clinical discipline",
      "overview": "A focused three-week plan across the highest-yield Step 2 CK content — medicine, then surgery, pediatrics, and OB/GYN, then psychiatry, neurology, and ethics — with checkpoint quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Advanced",
      "weeks": [
        {
          "week": 1,
          "theme": "Internal medicine",
          "milestone": "Manage the high-yield medicine presentations",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cardiology",
              "description": "High-yield cardiac diagnosis and management.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Pulmonology & GI",
              "description": "Common respiratory and GI presentations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Endocrine, renal & heme",
              "description": "Endocrine, renal, and hematologic essentials.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Internal medicine.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's management.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Surgery, peds & OB/GYN",
          "milestone": "Manage surgical, pediatric, and OB cases",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Surgery & trauma",
              "description": "Surgical and trauma management.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Pediatrics",
              "description": "High-yield peds presentations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "OB/GYN",
              "description": "Obstetrics and gynecology essentials.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Surgery, peds, and OB/GYN.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Psych, neuro & ethics",
          "milestone": "Manage psych and neuro, plus ethics and biostats",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Psychiatry",
              "description": "High-yield psychiatric diagnosis and treatment.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Neurology",
              "description": "Common neurologic presentations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Ethics & biostatistics",
              "description": "Medical ethics and exam biostatistics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Step 2 CK.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "teas": {
    "meta": {
      "title": "TEAS Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized TEAS study plan — reading, math, science, and English — with high-yield lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the TEAS",
      "description": "A TEAS plan in seconds — all four sections, with lessons, flashcards, and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the TEAS",
      "sub": "Tell it your test date, and get a TEAS plan in seconds — reading, math, science, and English — built around the time you have, with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "All four sections covered.",
        "desc": "Reading, math, science, and English and language usage — the plan balances your time across them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the TEAS?",
        "a": "A few focused weeks is realistic for many students. Learnpath back-schedules from your test date to fit the time you have."
      },
      {
        "q": "Can I build a TEAS plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the TEAS?",
        "a": "Four sections: Reading, Mathematics, Science (including anatomy and physiology), and English and Language Usage."
      },
      {
        "q": "Does it replace a TEAS prep course?",
        "a": "No. It handles planning and daily practice and works alongside any prep course, book, or question bank you're using."
      }
    ],
    "curriculum": {
      "title": "TEAS — 3-Week Focused Plan",
      "subtitle": "All four sections",
      "overview": "A three-week plan across the TEAS — reading and English, then math, then science — with checkpoint quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Reading & English",
          "milestone": "Master reading and language usage",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Reading comprehension",
              "description": "Main idea, detail, and inference.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Text structure & purpose",
              "description": "Author's purpose and using sources.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "English & language usage",
              "description": "Grammar, punctuation, and vocabulary.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Reading and English.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's skills.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Mathematics",
          "milestone": "Handle the TEAS math",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Numbers & operations",
              "description": "Fractions, decimals, percentages, and ratios.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Algebra & equations",
              "description": "Solving equations and word problems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Measurement & data",
              "description": "Units, conversions, and interpreting data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Mathematics.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Science",
          "milestone": "Cover the high-yield science",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Anatomy & physiology",
              "description": "The high-yield body systems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Biology & chemistry",
              "description": "Cells, genetics, and basic chemistry.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Scientific reasoning",
              "description": "Designing and interpreting experiments.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of TEAS content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "dat": {
    "meta": {
      "title": "DAT Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized DAT study plan — sciences, perceptual ability, reading, and quant — with high-yield lessons, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for the DAT",
      "description": "A DAT plan in seconds — all four sections, with high-yield lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the DAT",
      "sub": "Tell it your test date, and get a DAT plan in seconds — natural sciences, perceptual ability, reading, and quant — built around the time you have, with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "High-yield sciences first.",
        "desc": "Biology, general chemistry, and organic chemistry are the bulk of the DAT — the plan front-loads them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the DAT?",
        "a": "Many students give it a few focused months. Learnpath back-schedules from your test date to fit your timeline."
      },
      {
        "q": "Can I build a DAT plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the DAT?",
        "a": "A Survey of Natural Sciences (biology, general chemistry, organic chemistry), Perceptual Ability, Reading Comprehension, and Quantitative Reasoning."
      },
      {
        "q": "Does it replace a DAT prep course?",
        "a": "No. It handles planning and daily practice and works alongside any prep course, book, or question bank you're using."
      }
    ],
    "curriculum": {
      "title": "DAT — 3-Week High-Yield Plan",
      "subtitle": "All four sections",
      "overview": "A three-week plan across the DAT — natural sciences, then perceptual ability, then reading and quant — with checkpoint quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Advanced",
      "weeks": [
        {
          "week": 1,
          "theme": "Natural sciences",
          "milestone": "Cover the high-yield sciences",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Biology",
              "description": "High-yield biology for the DAT.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "General chemistry",
              "description": "Core general chemistry.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Organic chemistry",
              "description": "Reactions and mechanisms.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Natural sciences.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's content.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Perceptual ability",
          "milestone": "Build the PAT skills",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Keyholes & TFE",
              "description": "Apertures and top-front-end views.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Angle ranking & folding",
              "description": "Angle discrimination and paper folding.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Cube counting & patterns",
              "description": "Cube counting and pattern folding.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Perceptual ability.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Reading & quant",
          "milestone": "Sharpen reading and quantitative reasoning",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Reading comprehension",
              "description": "Strategy for dense science passages.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Quantitative reasoning",
              "description": "Algebra, word problems, and data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Mixed timing practice",
              "description": "Pacing across the sections.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of DAT content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "pcat": {
    "meta": {
      "title": "PCAT Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized PCAT study plan — biology, chemistry, critical reading, and quant — with lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the PCAT",
      "description": "A PCAT plan in seconds — sciences to writing, with high-yield lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the PCAT",
      "sub": "Tell it your test date, and get a PCAT plan in seconds — biology, chemistry, critical reading, and quant — built around the time you have, with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Sciences front and center.",
        "desc": "Biological and chemical processes carry the most weight — the plan prioritizes them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the PCAT?",
        "a": "A few focused weeks to a couple of months is typical. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build a PCAT plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the PCAT?",
        "a": "Biological Processes, Chemical Processes, Critical Reading, Quantitative Reasoning, and a Writing section. (Confirm current format with your testing program.)"
      },
      {
        "q": "Does it replace a PCAT prep course?",
        "a": "No. It handles planning and daily practice and works alongside any prep course, book, or question bank you're using."
      }
    ],
    "curriculum": {
      "title": "PCAT — 3-Week High-Yield Plan",
      "subtitle": "Sciences to writing",
      "overview": "A three-week plan across the PCAT — biological processes, then chemical processes, then critical reading, quant, and writing — with checkpoint quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Advanced",
      "weeks": [
        {
          "week": 1,
          "theme": "Biological processes",
          "milestone": "Cover high-yield biology",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cell & molecular biology",
              "description": "Cells, energy, and genetics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Anatomy & physiology",
              "description": "The body systems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Microbiology & health",
              "description": "Microbes and human health.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Biological processes.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's content.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Chemical processes",
          "milestone": "Cover general and organic chemistry",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "General chemistry",
              "description": "Atoms, reactions, and stoichiometry.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Organic chemistry",
              "description": "Structure and reactions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Basic biochemistry",
              "description": "High-yield biochemistry.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Chemical processes.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Reading, quant & writing",
          "milestone": "Sharpen reading, quant, and writing",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Critical reading",
              "description": "Strategy for science passages.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Quantitative reasoning",
              "description": "Algebra, calculus basics, and stats.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Writing",
              "description": "Building a clear argumentative essay.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of PCAT content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "cpa-exam": {
    "meta": {
      "title": "CPA Exam Study Plan, AI-Built | Learnpath",
      "description": "Get a CPA Exam study plan in seconds — FAR, AUD, and REG — with lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the CPA Exam",
      "description": "A CPA Exam plan in seconds — the core sections, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the CPA Exam",
      "sub": "Tell it your test date or a section, and get a CPA Exam plan in seconds — built around the core sections, with lessons, flashcards, and a tutor for when you're stuck."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Section by section.",
        "desc": "The CPA is taken in parts — tell it which section and the plan focuses there."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How is the CPA Exam structured?",
        "a": "It has core sections — Auditing (AUD), Financial Accounting and Reporting (FAR), and Regulation (REG) — plus a discipline section under the current model. Confirm the current format with your board."
      },
      {
        "q": "Can I build a CPA study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "Which section should I start with?",
        "a": "Many candidates start with FAR because it's broad and foundational. Tell Learnpath your plan and it builds around your order."
      },
      {
        "q": "Does it replace a CPA review course?",
        "a": "No. It handles planning and daily practice and works alongside your review course and materials."
      }
    ],
    "curriculum": {
      "title": "CPA Exam — 3-Week Core Plan",
      "subtitle": "FAR, AUD, and REG",
      "overview": "A three-week plan across the CPA core — financial accounting and reporting, auditing, then regulation — with checkpoint quizzes and spaced review. Confirm the current exam format with your board.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Advanced",
      "weeks": [
        {
          "week": 1,
          "theme": "FAR",
          "milestone": "Cover high-yield financial accounting",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Financial statements",
              "description": "The statements and the framework.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Assets & liabilities",
              "description": "Accounting for key accounts.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Revenue & advanced topics",
              "description": "Revenue recognition and more.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "FAR.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's content.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "AUD",
          "milestone": "Cover auditing essentials",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Audit process",
              "description": "Planning and risk assessment.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Internal control & evidence",
              "description": "Controls and gathering evidence.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Reports & ethics",
              "description": "Audit reports and professional ethics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "AUD.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "REG",
          "milestone": "Cover regulation and tax",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Individual taxation",
              "description": "Federal taxation of individuals.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Business taxation",
              "description": "Entity taxation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Business law & ethics",
              "description": "Commercial law and responsibilities.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of CPA core.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "bar-exam": {
    "meta": {
      "title": "Bar Exam Study Plan, AI-Built | Learnpath",
      "description": "Get a Bar Exam study plan in seconds — the MBE subjects, essays, and performance test — with lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the Bar Exam",
      "description": "A Bar Exam plan in seconds — MBE subjects to essays, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the Bar Exam",
      "sub": "Tell it your test date, and get a Bar Exam plan in seconds — the MBE subjects, essays, and performance test — built around the time you have, with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Covers the MBE subjects.",
        "desc": "The plan works through the heavily tested doctrinal subjects, then essay and performance skills."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the bar?",
        "a": "Most candidates dedicate a focused study period after graduation. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build a bar prep plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "Does it cover my state's rules?",
        "a": "It covers the widely tested doctrinal subjects and skills; for state-specific law, use your jurisdiction's materials alongside it."
      },
      {
        "q": "Does it replace a bar review course?",
        "a": "No. It handles planning and daily practice and works alongside your bar review course and outlines."
      }
    ],
    "curriculum": {
      "title": "Bar Exam — 3-Week Core Plan",
      "subtitle": "MBE subjects to essays",
      "overview": "A three-week plan across widely tested bar content — foundational MBE subjects, more MBE subjects and essay skills, then essays and the performance test — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Advanced",
      "weeks": [
        {
          "week": 1,
          "theme": "Core MBE subjects",
          "milestone": "Master the foundational doctrine",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Constitutional law",
              "description": "High-yield con law doctrine.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Contracts",
              "description": "Formation, performance, and remedies.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Criminal law & procedure",
              "description": "Crimes and constitutional procedure.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Core MBE subjects.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's rules.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "More MBE & essays",
          "milestone": "Cover the rest of the MBE and essay skills",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Civil procedure",
              "description": "Jurisdiction, pleadings, and trial.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Evidence & torts",
              "description": "Evidence rules and tort doctrine.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Property",
              "description": "Real and personal property.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "More MBE subjects.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Essays & performance test",
          "milestone": "Build essay and performance skills",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Essay strategy",
              "description": "Issue-spotting and IRAC structure.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Essay practice",
              "description": "Write and review a timed essay.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Performance test",
              "description": "Working from a closed-universe file.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of bar content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "pmp": {
    "meta": {
      "title": "PMP Exam Study Plan, AI-Built | Learnpath",
      "description": "Get a PMP Exam study plan in seconds — people, process, and business environment — with lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the PMP",
      "description": "A PMP plan in seconds — the three exam domains, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the PMP",
      "sub": "Tell it your test date, and get a PMP plan in seconds — built around the three exam domains, with lessons, flashcards, and a tutor for when you're stuck."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Built around the domains.",
        "desc": "The plan mirrors the exam's People, Process, and Business Environment domains across predictive and agile approaches."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the PMP?",
        "a": "A few focused weeks is realistic for many candidates. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build a PMP plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does the PMP exam cover?",
        "a": "Three domains — People, Process, and Business Environment — across predictive, agile, and hybrid project approaches."
      },
      {
        "q": "Does it replace a PMP prep course?",
        "a": "No. It handles planning and daily practice and works alongside your prep course and the PMBOK materials."
      }
    ],
    "curriculum": {
      "title": "PMP — 3-Week Focused Plan",
      "subtitle": "The three exam domains",
      "overview": "A three-week plan across the PMP — the People domain, the Process domain, then Business Environment plus agile and exam strategy — with checkpoint quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "People",
          "milestone": "Lead and manage teams",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Building a team",
              "description": "Forming, leading, and empowering teams.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Conflict & stakeholders",
              "description": "Managing conflict and stakeholders.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Servant leadership",
              "description": "Coaching and removing blockers.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "The People domain.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's concepts.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Process",
          "milestone": "Plan and execute the work",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Planning",
              "description": "Scope, schedule, and budget.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Risk & quality",
              "description": "Managing risk and quality.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Execution & monitoring",
              "description": "Delivering and tracking value.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "The Process domain.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Business environment & agile",
          "milestone": "Connect projects to strategy and agile",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Business environment",
              "description": "Compliance, value, and organizational change.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Agile & hybrid",
              "description": "Agile frameworks and hybrid delivery.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Exam strategy",
              "description": "Situational questions and timing.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of PMP content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "lsat": {
    "meta": {
      "title": "LSAT Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized LSAT study plan — logical reasoning and reading comprehension — with lessons, drills, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the LSAT",
      "description": "An LSAT plan in seconds — logical reasoning and reading comp, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the LSAT",
      "sub": "Tell it your test date, and get an LSAT plan in seconds — logical reasoning and reading comprehension — built around the time you have, with lessons, drills, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Built on the question types.",
        "desc": "The plan teaches each logical reasoning and reading question type and drills the patterns behind them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the LSAT?",
        "a": "Many students study for a few focused months. Learnpath back-schedules from your test date to fit your timeline."
      },
      {
        "q": "Can I build an LSAT plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the current LSAT?",
        "a": "Logical Reasoning and Reading Comprehension scored sections, plus an unscored experimental section. Confirm the current format with LSAC."
      },
      {
        "q": "Does it replace an LSAT prep course?",
        "a": "No. It handles planning and daily practice and works alongside any course and official practice tests."
      }
    ],
    "curriculum": {
      "title": "LSAT — 3-Week Focused Plan",
      "subtitle": "Logical reasoning and reading comprehension",
      "overview": "A three-week plan across the LSAT — logical reasoning fundamentals, the logical reasoning question types, then reading comprehension and timing — with drills and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Advanced",
      "weeks": [
        {
          "week": 1,
          "theme": "Logical reasoning fundamentals",
          "milestone": "Break down argument structure",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Argument structure",
              "description": "Conclusions, premises, and assumptions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Strengthen & weaken",
              "description": "The most common question types.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Assumptions & flaws",
              "description": "Necessary/sufficient assumptions and flaws.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Logical reasoning fundamentals.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's types.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Logical reasoning mastery",
          "milestone": "Handle the harder question types",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Inference & must-be-true",
              "description": "Drawing valid conclusions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Parallel & principle",
              "description": "Parallel reasoning and principles.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Timed LR drill",
              "description": "A timed logical reasoning set.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Logical reasoning mastery.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Reading comprehension & timing",
          "milestone": "Master reading comp and pacing",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Reading comprehension",
              "description": "Structure, viewpoints, and questions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Comparative passages",
              "description": "Handling the dual-passage set.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Full-section timing",
              "description": "Pacing across a section.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of LSAT content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "gre": {
    "meta": {
      "title": "GRE Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized GRE study plan — verbal, quant, and analytical writing — with lessons, drills, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the GRE",
      "description": "A GRE plan in seconds — verbal, quant, and writing, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the GRE",
      "sub": "Tell it your test date, and get a GRE plan in seconds — verbal, quant, and analytical writing — built around the time you have, with lessons, drills, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "All three measures.",
        "desc": "Verbal reasoning, quantitative reasoning, and analytical writing — the plan balances your time across them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the GRE?",
        "a": "A few focused weeks to a couple of months is common. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build a GRE plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the GRE?",
        "a": "Verbal Reasoning, Quantitative Reasoning, and Analytical Writing."
      },
      {
        "q": "Does it replace a GRE prep course?",
        "a": "No. It handles planning and daily practice and works alongside any course and official practice tests."
      }
    ],
    "curriculum": {
      "title": "GRE — 3-Week Focused Plan",
      "subtitle": "Verbal, quant, and writing",
      "overview": "A three-week plan across the GRE — verbal reasoning, quantitative reasoning, then analytical writing and mixed practice — with drills and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Verbal reasoning",
          "milestone": "Sharpen reading and vocabulary",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Reading comprehension",
              "description": "Strategy for dense passages.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Text completion",
              "description": "Using context to fill blanks.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Sentence equivalence & vocab",
              "description": "High-frequency vocabulary.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Verbal reasoning.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's vocab and skills.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Quantitative reasoning",
          "milestone": "Cover the GRE math",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Arithmetic & algebra",
              "description": "Numbers, equations, and word problems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Geometry & data",
              "description": "Geometry and data interpretation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Quantitative comparison",
              "description": "The GRE-specific question type.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Quantitative reasoning.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Writing & practice",
          "milestone": "Build the essay and pacing",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Analytical writing",
              "description": "Structuring the issue essay.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Essay practice",
              "description": "Write and review a timed essay.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Mixed timing practice",
              "description": "Pacing across sections.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of GRE content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "gmat": {
    "meta": {
      "title": "GMAT Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized GMAT study plan — quant, verbal, and data insights — with lessons, drills, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the GMAT",
      "description": "A GMAT plan in seconds — quant, verbal, and data insights, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the GMAT",
      "sub": "Tell it your test date, and get a GMAT plan in seconds — quantitative reasoning, verbal reasoning, and data insights — built around the time you have, with lessons, drills, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Built for the Focus Edition.",
        "desc": "Quantitative reasoning, verbal reasoning, and data insights — the plan covers all three sections."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the GMAT?",
        "a": "A few focused weeks to a couple of months is typical. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build a GMAT plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the GMAT?",
        "a": "Quantitative Reasoning, Verbal Reasoning, and Data Insights. Confirm the current format with the test maker."
      },
      {
        "q": "Does it replace a GMAT prep course?",
        "a": "No. It handles planning and daily practice and works alongside any course and official practice tests."
      }
    ],
    "curriculum": {
      "title": "GMAT — 3-Week Focused Plan",
      "subtitle": "Quant, verbal, and data insights",
      "overview": "A three-week plan across the GMAT — quantitative reasoning, verbal reasoning, then data insights and pacing — with drills and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Quantitative reasoning",
          "milestone": "Cover the GMAT math",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Arithmetic & number properties",
              "description": "Core number concepts.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Algebra",
              "description": "Equations, inequalities, and word problems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Problem solving practice",
              "description": "Timed quant set.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Quantitative reasoning.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's methods.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Verbal reasoning",
          "milestone": "Sharpen reading and reasoning",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Reading comprehension",
              "description": "Strategy for business passages.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Critical reasoning",
              "description": "Evaluating arguments.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Timed verbal drill",
              "description": "A timed verbal set.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Verbal reasoning.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Data insights & pacing",
          "milestone": "Master data insights and timing",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Data interpretation",
              "description": "Tables, graphs, and multi-source data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Two-part & data sufficiency",
              "description": "The reasoning question types.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Full-length timing",
              "description": "Pacing across the sections.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of GMAT content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "sat-math": {
    "meta": {
      "title": "SAT Math Study Plan, AI-Built | Learnpath",
      "description": "Get an SAT Math study plan in seconds — algebra, advanced math, and geometry — with worked examples, drills, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for SAT Math",
      "description": "An SAT Math plan in seconds — algebra to geometry, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for SAT Math",
      "sub": "Tell it your test date, and get an SAT Math plan in seconds — algebra, advanced math, and geometry — built around the time you have, with worked examples, drills, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Built on the SAT's math.",
        "desc": "The plan follows the SAT's own categories — algebra, advanced math, problem solving, and geometry."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for SAT Math?",
        "a": "A few focused weeks is realistic. Learnpath back-schedules from your test date to fit your timeline."
      },
      {
        "q": "Can I build an SAT Math plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does SAT Math cover?",
        "a": "Heart of algebra, advanced math (including functions and nonlinear equations), problem solving and data analysis, and some geometry and trigonometry."
      },
      {
        "q": "Does it replace an SAT prep course?",
        "a": "No. It handles planning and daily practice and works alongside any course and official practice tests."
      }
    ],
    "curriculum": {
      "title": "SAT Math — 3-Week Focused Plan",
      "subtitle": "Algebra to geometry",
      "overview": "A three-week plan across SAT Math — algebra, advanced math and data, then geometry, trig, and timing — with worked examples, drills, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Algebra",
          "milestone": "Master linear algebra on the SAT",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Linear equations",
              "description": "Solving and interpreting linear equations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Systems & inequalities",
              "description": "Systems and linear inequalities.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Word problems",
              "description": "Translating and modeling.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Algebra.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's methods.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Advanced math & data",
          "milestone": "Handle nonlinear math and data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Quadratics & functions",
              "description": "Quadratic and exponential functions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Nonlinear equations",
              "description": "Working with nonlinear relationships.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Problem solving & data",
              "description": "Ratios, percentages, and data analysis.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Advanced math and data.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Geometry & timing",
          "milestone": "Cover geometry and pacing",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Geometry",
              "description": "Lines, angles, triangles, and circles.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Trigonometry",
              "description": "Right-triangle trig on the SAT.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Timed section",
              "description": "Pacing across a math module.",
              "type": "exercise",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of SAT Math.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "sat-reading-and-writing": {
    "meta": {
      "title": "SAT Reading & Writing Plan, AI-Built | Learnpath",
      "description": "Get an SAT Reading and Writing study plan in seconds — comprehension, evidence, and grammar — with lessons, drills, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for SAT Reading & Writing",
      "description": "An SAT Reading & Writing plan in seconds — reading to grammar, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for SAT Reading & Writing",
      "sub": "Tell it your test date, and get an SAT Reading and Writing plan in seconds — comprehension, evidence, and grammar — built around the time you have, with lessons, drills, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Built for the digital format.",
        "desc": "The plan follows the SAT's Reading and Writing categories and its short-passage, question-by-question style."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for SAT Reading and Writing?",
        "a": "A few focused weeks is realistic. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build an SAT Reading and Writing plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does the section cover?",
        "a": "Reading skills (comprehension, evidence, and inferences) and writing skills (expression of ideas and standard English conventions)."
      },
      {
        "q": "Does it replace an SAT prep course?",
        "a": "No. It handles planning and daily practice and works alongside any course and official practice tests."
      }
    ],
    "curriculum": {
      "title": "SAT Reading & Writing — 3-Week Focused Plan",
      "subtitle": "Reading to grammar",
      "overview": "A three-week plan across SAT Reading and Writing — reading and evidence, writing and grammar, then mixed practice and timing — with drills and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Reading",
          "milestone": "Master comprehension and evidence",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Main idea & detail",
              "description": "Understanding short passages.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Command of evidence",
              "description": "Textual and quantitative evidence.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Inferences & vocabulary",
              "description": "Words in context and inferences.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Reading.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's skills.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Writing",
          "milestone": "Master grammar and expression",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Standard English conventions",
              "description": "Grammar, punctuation, and structure.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Expression of ideas",
              "description": "Concision, transitions, and rhetoric.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Editing practice",
              "description": "Applying the rules in context.",
              "type": "exercise",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Writing.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Mixed practice & timing",
          "milestone": "Put it together under time",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Mixed question sets",
              "description": "Reading and writing together.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Timed module",
              "description": "Pacing across a module.",
              "type": "exercise",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Reviewing mistakes",
              "description": "Learning from missed questions.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Reading and Writing.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "psat": {
    "meta": {
      "title": "PSAT Study Plan, AI-Built | Learnpath",
      "description": "Get a PSAT/NMSQT study plan in seconds — reading, writing, and math — with lessons, drills, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for the PSAT",
      "description": "A PSAT plan in seconds — reading, writing, and math, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for the PSAT",
      "sub": "Tell it your test date, and get a PSAT plan in seconds — reading and writing plus math — built around the time you have, with lessons, drills, and a tutor."
    },
    "benefits": [
      {
        "title": "Back-scheduled to your test date.",
        "desc": "Tell it when you test and the plan works backward, fitting the highest-yield material into the weeks you have."
      },
      {
        "title": "Practice for the SAT, too.",
        "desc": "The PSAT mirrors the SAT, so this plan builds the same skills — useful for National Merit and SAT prep alike."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface your toughest concepts on a schedule so they're there on test day."
      }
    ],
    "faq": [
      {
        "q": "How long should I study for the PSAT?",
        "a": "A few focused weeks is realistic. Learnpath back-schedules from your test date."
      },
      {
        "q": "Can I build a PSAT plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What's on the PSAT?",
        "a": "A Reading and Writing section and a Math section, in the same digital, adaptive format as the SAT."
      },
      {
        "q": "Does it replace a prep course?",
        "a": "No. It handles planning and daily practice and works alongside any course and official practice materials."
      }
    ],
    "curriculum": {
      "title": "PSAT — 3-Week Focused Plan",
      "subtitle": "Reading, writing, and math",
      "overview": "A three-week plan across the PSAT — reading and writing, math, then mixed practice and timing — with drills and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Reading & writing",
          "milestone": "Master the verbal section",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Reading comprehension",
              "description": "Main idea, evidence, and inference.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Grammar & conventions",
              "description": "Standard English conventions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Expression of ideas",
              "description": "Concision and transitions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Reading and writing.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's skills.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Math",
          "milestone": "Cover the PSAT math",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Algebra",
              "description": "Linear equations and systems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Advanced math & data",
              "description": "Functions, nonlinear math, and data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Geometry",
              "description": "Lines, triangles, and circles.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Math.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Mixed recall across weeks one and two.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 3,
          "theme": "Mixed practice & timing",
          "milestone": "Put it together under time",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Mixed question sets",
              "description": "Verbal and math together.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Timed modules",
              "description": "Pacing across modules.",
              "type": "exercise",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Reviewing mistakes",
              "description": "Learning from missed questions.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of PSAT content.",
              "type": "quiz",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged card.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  }
}