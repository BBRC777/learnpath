// app/learn/topics/college.ts — community-college / intro-college classes
import type { TopicData } from './types'

export const collegeTopics: Record<string, TopicData> = 
{
  "college-algebra": {
    "meta": {
      "title": "College Algebra Study Plan, AI-Built | Learnpath",
      "description": "Get a College Algebra study plan in seconds — equations, functions, and logarithms — with worked examples, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for College Algebra",
      "description": "A College Algebra plan in seconds — equations to logarithms, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for College Algebra",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a College Algebra plan in seconds — equations, functions, and logarithms — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Worked examples, every step.",
        "desc": "Each concept comes with a step-by-step example, so the methods actually click."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass College Algebra?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with worked examples and practice."
      },
      {
        "q": "Can I build a College Algebra plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does College Algebra cover?",
        "a": "Equations and inequalities, functions and their graphs, polynomial and rational functions, exponential and logarithmic functions, and systems of equations."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "College Algebra — 3-Week Focused Plan",
      "subtitle": "Equations to logarithms",
      "overview": "A three-week plan across College Algebra — equations and functions, polynomial and rational functions, then exponentials, logs, and systems — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Equations & functions",
          "milestone": "Solve equations and analyze functions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Equations & inequalities",
              "description": "Linear, quadratic, and absolute-value equations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Functions & graphs",
              "description": "Notation, domain/range, and transformations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Linear & quadratic functions",
              "description": "Lines and parabolas in depth.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Equations and functions.",
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
          "theme": "Polynomial & rational functions",
          "milestone": "Graph higher-degree and rational functions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Polynomial functions",
              "description": "Zeros, end behavior, and graphs.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Rational functions",
              "description": "Asymptotes and graphing.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Solving & inequalities",
              "description": "Polynomial and rational inequalities.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Polynomial and rational functions.",
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
          "theme": "Exponentials, logs & systems",
          "milestone": "Solve exponential, log, and system problems",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Exponential functions",
              "description": "Growth, decay, and graphs.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Logarithms",
              "description": "Log rules and solving log equations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Systems of equations",
              "description": "Solving systems and matrices.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of College Algebra.",
              "type": "quiz",
              "duration": "20 min"
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
  "calculus-1": {
    "meta": {
      "title": "Calculus 1 Study Plan, AI-Built | Learnpath",
      "description": "Get a Calculus 1 study plan in seconds — limits, derivatives, and integrals — with worked examples, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Calculus 1",
      "description": "A Calculus 1 plan in seconds — limits to integrals, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Calculus 1",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Calculus 1 plan in seconds — limits, derivatives, and integrals — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Understand it, don't just memorize.",
        "desc": "Lessons build the intuition behind derivatives and integrals so the rules make sense."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Calculus 1?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with worked examples and practice."
      },
      {
        "q": "Can I build a Calculus 1 plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Calculus 1 cover?",
        "a": "Limits and continuity, derivatives and differentiation rules, applications of derivatives, and an introduction to integration and the Fundamental Theorem."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Calculus 1 — 3-Week Focused Plan",
      "subtitle": "Limits to integrals",
      "overview": "A three-week plan across Calculus 1 — limits and derivatives, applications of derivatives, then integration and the Fundamental Theorem — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Limits & derivatives",
          "milestone": "Differentiate with all the major rules",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Limits & continuity",
              "description": "Evaluating limits and continuity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The derivative",
              "description": "Definition and basic rules.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Product, quotient & chain",
              "description": "Differentiating combined functions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Limits and derivatives.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the rules.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Applications of derivatives",
          "milestone": "Analyze and optimize with derivatives",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Curve analysis",
              "description": "Increasing/decreasing and concavity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Related rates",
              "description": "Rates in related quantities.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Optimization",
              "description": "Maxima, minima, and the MVT.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Applications of derivatives.",
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
          "theme": "Integration",
          "milestone": "Evaluate basic integrals and apply the FTC",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The integral & FTC",
              "description": "Antiderivatives and the Fundamental Theorem.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "u-substitution",
              "description": "Integrating by substitution.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Area & motion",
              "description": "Area under a curve and motion.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Calculus 1.",
              "type": "quiz",
              "duration": "20 min"
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
  "calculus-2": {
    "meta": {
      "title": "Calculus 2 Study Plan, AI-Built | Learnpath",
      "description": "Get a Calculus 2 study plan in seconds — integration techniques, sequences, and series — with worked examples, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Calculus 2",
      "description": "A Calculus 2 plan in seconds — integration techniques to series, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Calculus 2",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Calculus 2 plan in seconds — integration techniques, applications, and series — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Series, made manageable.",
        "desc": "Lessons build the convergence tests methodically — the part of Calc 2 that overwhelms most students."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "Why is Calculus 2 considered hard?",
        "a": "It packs in many integration techniques and the convergence tests for series. Learnpath's plan tackles them one at a time with worked examples."
      },
      {
        "q": "Can I build a Calculus 2 plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Calculus 2 cover?",
        "a": "Integration techniques, applications of integration like volume and arc length, sequences and series, and often parametric and polar functions."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Calculus 2 — 3-Week Focused Plan",
      "subtitle": "Integration techniques to series",
      "overview": "A three-week plan across Calculus 2 — integration techniques, applications of integration, then sequences and series — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Integration techniques",
          "milestone": "Integrate with multiple techniques",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Integration by parts",
              "description": "Choosing parts and applying the formula.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Trig integrals & substitution",
              "description": "Trigonometric integrals and substitution.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Partial fractions",
              "description": "Decomposing and integrating rationals.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Integration techniques.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the techniques.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Applications of integration",
          "milestone": "Compute volume, arc length, and more",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Volume",
              "description": "Disks, washers, and shells.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Arc length & surface area",
              "description": "Length of curves and surfaces of revolution.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Improper integrals",
              "description": "Integrals with infinite bounds or discontinuities.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Applications of integration.",
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
          "theme": "Sequences & series",
          "milestone": "Test series for convergence",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Sequences & series",
              "description": "Convergence and the basic series.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Convergence tests",
              "description": "Ratio, root, comparison, and integral tests.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Power & Taylor series",
              "description": "Power series and Taylor expansions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Calculus 2.",
              "type": "quiz",
              "duration": "20 min"
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
  "calculus-3": {
    "meta": {
      "title": "Calculus 3 Study Plan, AI-Built | Learnpath",
      "description": "Get a Calculus 3 study plan in seconds — vectors, partial derivatives, and multiple integrals — with worked examples, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Calculus 3",
      "description": "A Calculus 3 plan in seconds — vectors to vector calculus, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Calculus 3",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Calculus 3 plan in seconds — vectors, partial derivatives, and multiple integrals — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "See it in three dimensions.",
        "desc": "Lessons build the spatial intuition behind multivariable calculus, not just the formulas."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "What is Calculus 3?",
        "a": "Multivariable calculus — calculus extended to functions of several variables, including vectors, partial derivatives, multiple integrals, and vector calculus."
      },
      {
        "q": "Can I build a Calculus 3 plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Calculus 3 cover?",
        "a": "Vectors and 3D geometry, partial derivatives and gradients, multiple integrals, and vector calculus including line and surface integrals and Green's and Stokes' theorems."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Calculus 3 — 3-Week Focused Plan",
      "subtitle": "Vectors to vector calculus",
      "overview": "A three-week plan across Calculus 3 — vectors and partial derivatives, multiple integrals, then vector calculus — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Vectors & partial derivatives",
          "milestone": "Work in 3D and take partial derivatives",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Vectors & 3D space",
              "description": "Vectors, dot and cross products, and surfaces.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Partial derivatives",
              "description": "Functions of several variables and partials.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Gradients & optimization",
              "description": "Gradients, directional derivatives, and extrema.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Vectors and partial derivatives.",
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
          "theme": "Multiple integrals",
          "milestone": "Set up and evaluate double and triple integrals",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Double integrals",
              "description": "Over rectangles and general regions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Polar, cylindrical & spherical",
              "description": "Integrals in other coordinate systems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Triple integrals",
              "description": "Volume and mass in 3D.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Multiple integrals.",
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
          "theme": "Vector calculus",
          "milestone": "Apply the big theorems",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Vector fields & line integrals",
              "description": "Fields and integrating along curves.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Green's theorem",
              "description": "Connecting line and double integrals.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Surface integrals & Stokes",
              "description": "Surface integrals and the divergence and Stokes' theorems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Calculus 3.",
              "type": "quiz",
              "duration": "20 min"
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
  "statistics": {
    "meta": {
      "title": "Statistics Study Plan, AI-Built | Learnpath",
      "description": "Get an intro Statistics study plan in seconds — data, probability, and inference — with worked examples, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Statistics",
      "description": "An intro Statistics plan in seconds — data to inference, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Statistics",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an intro Statistics plan in seconds — data, probability, and inference — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Concepts plus the calculations.",
        "desc": "Lessons build what each statistic means and how to compute it, with worked examples."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass intro Statistics?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with worked examples and practice."
      },
      {
        "q": "Can I build a Statistics plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does intro Statistics cover?",
        "a": "Descriptive statistics, probability, random variables and distributions, sampling, and inference with confidence intervals and hypothesis tests."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Statistics — 3-Week Focused Plan",
      "subtitle": "Data to inference",
      "overview": "A three-week plan across introductory statistics — describing data, probability and distributions, then sampling and inference — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Describing data",
          "milestone": "Summarize and display data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Center & spread",
              "description": "Mean, median, and standard deviation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Displaying data",
              "description": "Histograms, box plots, and shape.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Correlation & regression",
              "description": "Relationships between two variables.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Describing data.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Probability & distributions",
          "milestone": "Use probability and the normal model",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Probability",
              "description": "Rules, conditional probability, and independence.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Random variables",
              "description": "Expected value and variance.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Normal & binomial",
              "description": "Key distributions and z-scores.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Probability and distributions.",
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
          "theme": "Sampling & inference",
          "milestone": "Build intervals and run tests",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Sampling distributions",
              "description": "The Central Limit Theorem.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Confidence intervals",
              "description": "Estimating means and proportions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Hypothesis tests",
              "description": "Significance tests and p-values.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of statistics.",
              "type": "quiz",
              "duration": "20 min"
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
  "anatomy-and-physiology": {
    "meta": {
      "title": "Anatomy & Physiology Plan, AI-Built | Learnpath",
      "description": "Get an Anatomy and Physiology study plan in seconds — cells, tissues, and the body systems — with flashcards and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Anatomy & Physiology",
      "description": "An A&P plan in seconds — cells and tissues to the body systems, with spaced recall and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Anatomy & Physiology",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an A&P plan in seconds — cells, tissues, and the body systems — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the system you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Built for a memory-heavy course.",
        "desc": "A&P is enormous. Spaced flashcards are the difference between knowing it on exam day and cramming."
      },
      {
        "title": "Structure and function together.",
        "desc": "Lessons connect each structure to what it does, so you understand instead of just memorizing."
      }
    ],
    "faq": [
      {
        "q": "Why is A&P so hard to study for?",
        "a": "It's a huge volume of terms and systems. Learnpath structures it system by system and uses spaced flashcards so it actually sticks."
      },
      {
        "q": "Can I build an A&P plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like your lab notes."
      },
      {
        "q": "What does Anatomy & Physiology cover?",
        "a": "Cells and tissues, then the body systems — integumentary, skeletal, muscular, nervous, endocrine, cardiovascular, respiratory, digestive, urinary, and reproductive."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Anatomy & Physiology — 3-Week Focused Plan",
      "subtitle": "Cells and tissues to the body systems",
      "overview": "A three-week plan across high-yield A&P — cells, tissues, and the support and movement systems, then control systems, then the maintenance systems — with heavy flashcard recall and quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Foundations & support",
          "milestone": "Connect cells and tissues to structure",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cells & tissues",
              "description": "Cell structure and the four tissue types.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Integumentary system",
              "description": "The skin and its functions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Skeletal & muscular",
              "description": "Bones, joints, and muscle contraction.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Foundations and support systems.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Control systems",
          "milestone": "Explain how the body coordinates itself",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Nervous system",
              "description": "Neurons, the brain, and the spinal cord.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Senses",
              "description": "Vision, hearing, and the other senses.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Endocrine system",
              "description": "Hormones and the glands that make them.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Control systems.",
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
          "theme": "Maintenance systems",
          "milestone": "Trace the systems that sustain the body",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cardiovascular & blood",
              "description": "The heart, vessels, and blood.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Respiratory & digestive",
              "description": "Gas exchange and digestion.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Urinary & reproductive",
              "description": "Filtration, balance, and reproduction.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of A&P.",
              "type": "quiz",
              "duration": "20 min"
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
  "microbiology": {
    "meta": {
      "title": "Microbiology Study Plan, AI-Built | Learnpath",
      "description": "Get a Microbiology study plan in seconds — microbial structure, genetics, and immunology — with flashcards and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Microbiology",
      "description": "A Microbiology plan in seconds — microbial cells to immunology, with spaced recall and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Microbiology",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Microbiology plan in seconds — microbial structure, genetics, and immunology — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Connects microbes to disease.",
        "desc": "Lessons tie structure and growth to how pathogens cause disease — the clinical payoff."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface terms and processes on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me study for a microbiology test?",
        "a": "Yes. Tell it the test date and topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build a Microbiology plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Microbiology cover?",
        "a": "Microbial cell structure, metabolism and growth, microbial genetics, controlling microbes, immunology, and pathogens and infectious disease."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Microbiology — 3-Week Focused Plan",
      "subtitle": "Microbial cells to immunology",
      "overview": "A three-week plan across Microbiology — microbial structure and growth, genetics and control, then immunology and disease — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Structure & growth",
          "milestone": "Describe microbial cells and how they grow",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Microbial cell structure",
              "description": "Prokaryotic and eukaryotic microbes.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Metabolism",
              "description": "How microbes make energy.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Microbial growth",
              "description": "Growth requirements and the growth curve.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Structure and growth.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Genetics & control",
          "milestone": "Explain microbial genetics and control",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Microbial genetics",
              "description": "Mutation and gene transfer.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Controlling microbes",
              "description": "Physical and chemical control methods.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Antimicrobials",
              "description": "Antibiotics and resistance.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Genetics and control.",
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
          "theme": "Immunology & disease",
          "milestone": "Connect immunity to infection",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Innate immunity",
              "description": "The body's first lines of defense.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Adaptive immunity",
              "description": "Antibodies and the immune response.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Pathogens & disease",
              "description": "How microbes cause and spread disease.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of microbiology.",
              "type": "quiz",
              "duration": "20 min"
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
  "general-chemistry": {
    "meta": {
      "title": "General Chemistry Study Plan, AI-Built | Learnpath",
      "description": "Get a General Chemistry study plan in seconds — atoms, stoichiometry, and equilibrium — with worked examples, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for General Chemistry",
      "description": "A General Chemistry plan in seconds — atoms to equilibrium, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for General Chemistry",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a General Chemistry plan in seconds — atoms, reactions, and equilibrium — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Stoichiometry, step by step.",
        "desc": "The mole math that trips people up gets worked examples until it clicks."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass General Chemistry?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with worked examples and practice."
      },
      {
        "q": "Can I build a General Chemistry plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does General Chemistry cover?",
        "a": "Atomic structure and the periodic table, bonding, stoichiometry, thermochemistry, gases, solutions, and an introduction to equilibrium and kinetics."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "General Chemistry — 3-Week Focused Plan",
      "subtitle": "Atoms to equilibrium",
      "overview": "A three-week plan across General Chemistry — atoms and stoichiometry, bonding and thermochemistry, then gases, solutions, and equilibrium — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Atoms & stoichiometry",
          "milestone": "Balance reactions and do mole math",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Atomic structure",
              "description": "Atoms, isotopes, and electron configuration.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The periodic table",
              "description": "Periodic trends.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Stoichiometry",
              "description": "Moles, equations, and limiting reagents.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Atoms and stoichiometry.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Bonding & energy",
          "milestone": "Predict bonding and reaction energy",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Bonding",
              "description": "Ionic and covalent bonds and Lewis structures.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Molecular geometry",
              "description": "VSEPR and molecular shapes.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Thermochemistry",
              "description": "Heat, enthalpy, and calorimetry.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Bonding and energy.",
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
          "theme": "Gases, solutions & equilibrium",
          "milestone": "Work with gases, solutions, and equilibrium",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Gases",
              "description": "The gas laws and the ideal gas law.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Solutions",
              "description": "Concentration, molarity, and properties.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Intro to equilibrium",
              "description": "Reversible reactions and Keq.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of General Chemistry.",
              "type": "quiz",
              "duration": "20 min"
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
  "organic-chemistry": {
    "meta": {
      "title": "Organic Chemistry Study Plan, AI-Built | Learnpath",
      "description": "Get an Organic Chemistry study plan in seconds — structure, mechanisms, and spectroscopy — with worked examples, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Organic Chemistry",
      "description": "An Organic Chemistry plan in seconds — structure to spectroscopy, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Organic Chemistry",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an Organic Chemistry plan in seconds — structure, mechanisms, and reactions — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Mechanisms over memorization.",
        "desc": "Lessons build the why behind reactions, so you can predict products instead of memorizing hundreds."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and quizzes resurface what you keep slipping on so it becomes automatic."
      }
    ],
    "faq": [
      {
        "q": "How do I survive Organic Chemistry?",
        "a": "By understanding mechanisms, not memorizing every reaction. Learnpath's lessons build the reasoning and the tutor can walk a mechanism through with you."
      },
      {
        "q": "Can I build an Organic Chemistry plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Organic Chemistry cover?",
        "a": "Structure, bonding, and stereochemistry, reaction mechanisms like substitution, elimination, and addition, and spectroscopy and functional-group chemistry."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Organic Chemistry — 3-Week Focused Plan",
      "subtitle": "Structure to spectroscopy",
      "overview": "A three-week plan across Organic Chemistry — structure and stereochemistry, reactions and mechanisms, then spectroscopy and functional groups — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Structure & stereochemistry",
          "milestone": "Assign stereochemistry and reason about structure",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Bonding & structure",
              "description": "Hybridization, resonance, and acidity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Functional groups & nomenclature",
              "description": "Recognizing and naming molecules.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Stereochemistry",
              "description": "Chirality, R/S, and isomers.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Structure and stereochemistry.",
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
          "theme": "Reactions & mechanisms",
          "milestone": "Predict products from mechanisms",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Substitution & elimination",
              "description": "SN1/SN2 and E1/E2.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Addition reactions",
              "description": "Alkene and alkyne reactions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Carbonyl chemistry",
              "description": "Aldehydes, ketones, and acids.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Reactions and mechanisms.",
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
          "theme": "Spectroscopy & synthesis",
          "milestone": "Read spectra and plan a synthesis",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "IR & NMR",
              "description": "Reading IR and NMR spectra.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Functional-group chemistry",
              "description": "Reactions of the major groups.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Synthesis strategy",
              "description": "Building multi-step syntheses.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Organic Chemistry.",
              "type": "quiz",
              "duration": "20 min"
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
  "biology-101": {
    "meta": {
      "title": "Biology 101 Study Plan, AI-Built | Learnpath",
      "description": "Get an intro Biology study plan in seconds — cells, genetics, and evolution — with flashcards and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Biology 101",
      "description": "An intro Biology plan in seconds — cells to ecology, with spaced recall and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Biology 101",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an intro Biology plan in seconds — cells, genetics, and evolution — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "The big picture, connected.",
        "desc": "Lessons tie cells, genes, and evolution together so biology is a story, not a vocab list."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface terms and processes on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass intro Biology?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build a Biology plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does intro Biology cover?",
        "a": "The chemistry of life and cells, cellular energy, genetics and molecular biology, evolution, and the diversity of life and ecology."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Biology 101 — 3-Week Focused Plan",
      "subtitle": "Cells to ecology",
      "overview": "A three-week plan across introductory biology — cells and energy, genetics and molecular biology, then evolution, diversity, and ecology — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Cells & energy",
          "milestone": "Explain how cells work and get energy",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Chemistry of life",
              "description": "Water, macromolecules, and enzymes.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Cell structure",
              "description": "Organelles and membranes.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Cellular energy",
              "description": "Photosynthesis and respiration.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Cells and energy.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Genetics & molecular biology",
          "milestone": "Explain inheritance and gene expression",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cell division",
              "description": "Mitosis and meiosis.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Genetics",
              "description": "Mendelian inheritance and Punnett squares.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "DNA & gene expression",
              "description": "Replication, transcription, and translation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Genetics and molecular biology.",
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
          "theme": "Evolution & ecology",
          "milestone": "Connect evolution to the diversity of life",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Evolution",
              "description": "Natural selection and evidence.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Diversity of life",
              "description": "How life is classified.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Ecology",
              "description": "Populations, communities, and ecosystems.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of biology.",
              "type": "quiz",
              "duration": "20 min"
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
  "intro-to-psychology": {
    "meta": {
      "title": "Intro to Psychology Plan, AI-Built | Learnpath",
      "description": "Get an Intro to Psychology study plan in seconds — the brain, learning, development, and disorders — with flashcards and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Intro to Psychology",
      "description": "An Intro to Psychology plan in seconds — the brain to social, with spaced recall and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Intro to Psychology",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an Intro to Psychology plan in seconds — the brain, learning, development, and disorders — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Theories tied to examples.",
        "desc": "Lessons connect each theory to a real example so you recognize it, not just define it."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface terms and theorists on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Intro to Psychology?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build a Psychology plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Intro to Psychology cover?",
        "a": "Research methods, the biology of behavior, sensation and perception, learning and memory, development, personality, psychological disorders, and social psychology."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Intro to Psychology — 3-Week Focused Plan",
      "subtitle": "The brain to social psychology",
      "overview": "A three-week plan across introductory psychology — research and the brain, learning, memory, and development, then personality, disorders, and social psychology — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Foundations & the brain",
          "milestone": "Connect biology and methods to behavior",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Research methods",
              "description": "How psychology is studied.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The brain & nervous system",
              "description": "Neurons and brain regions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Sensation & perception",
              "description": "How we sense and interpret the world.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Foundations and the brain.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Learning, memory & development",
          "milestone": "Apply learning and developmental theories",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Learning",
              "description": "Classical and operant conditioning.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Memory & cognition",
              "description": "How memory and thinking work.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Development",
              "description": "Change across the lifespan.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Learning, memory, and development.",
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
          "theme": "Personality, disorders & social",
          "milestone": "Recognize disorders and social influences",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Personality & motivation",
              "description": "Theories of personality and motivation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Disorders & treatment",
              "description": "Common disorders and therapies.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Social psychology",
              "description": "How others shape behavior.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of psychology.",
              "type": "quiz",
              "duration": "20 min"
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
  "intro-to-sociology": {
    "meta": {
      "title": "Intro to Sociology Plan, AI-Built | Learnpath",
      "description": "Get an Intro to Sociology study plan in seconds — culture, social structure, and inequality — with flashcards and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Intro to Sociology",
      "description": "An Intro to Sociology plan in seconds — the sociological perspective to inequality, with an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Intro to Sociology",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an Intro to Sociology plan in seconds — culture, social structure, and inequality — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Theories you can apply.",
        "desc": "Lessons tie the major perspectives to real examples so you can use them, not just name them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface theorists and terms on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Intro to Sociology?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build a Sociology plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Intro to Sociology cover?",
        "a": "The sociological perspective and theories, culture and socialization, social structure, groups, and deviance, and social stratification, inequality, and institutions."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Intro to Sociology — 3-Week Focused Plan",
      "subtitle": "The sociological perspective to inequality",
      "overview": "A three-week plan across introductory sociology — the perspective and culture, social structure and deviance, then stratification, inequality, and institutions — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Perspective & culture",
          "milestone": "Apply the major sociological theories",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The sociological perspective",
              "description": "How sociologists see the world.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Major theories",
              "description": "Functionalism, conflict, and interactionism.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Culture & socialization",
              "description": "Culture and how we become who we are.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Perspective and culture.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Structure & deviance",
          "milestone": "Explain social structure and deviance",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Social structure & interaction",
              "description": "Status, roles, and groups.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Groups & organizations",
              "description": "How groups and bureaucracies work.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Deviance & crime",
              "description": "Theories of deviance and social control.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Structure and deviance.",
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
          "theme": "Inequality & institutions",
          "milestone": "Analyze stratification and institutions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Social stratification",
              "description": "Class, mobility, and inequality.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Race, gender & inequality",
              "description": "How inequality is structured.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Social institutions",
              "description": "Family, religion, education, and the economy.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of sociology.",
              "type": "quiz",
              "duration": "20 min"
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
  "microeconomics": {
    "meta": {
      "title": "Microeconomics Study Plan, AI-Built | Learnpath",
      "description": "Get a Microeconomics study plan in seconds — supply and demand, costs, and market structures — with graph practice, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Microeconomics",
      "description": "A Microeconomics plan in seconds — supply and demand to market failure, with graph practice and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Microeconomics",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Microeconomics plan in seconds — supply and demand, costs, and market structures — with graph practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Graphs that make sense.",
        "desc": "Lessons build the supply-and-demand and cost-curve graphs step by step so you can read and draw them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface definitions and market conditions on a schedule so they stick."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Microeconomics?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with graph practice and quizzes."
      },
      {
        "q": "Can I build a Microeconomics plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Microeconomics cover?",
        "a": "Supply and demand, elasticity, consumer and producer theory, costs of production, market structures, factor markets, and market failure."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Microeconomics — 3-Week Focused Plan",
      "subtitle": "Supply and demand to market failure",
      "overview": "A three-week plan across Microeconomics — supply, demand, and elasticity, costs and market structures, then factor markets and market failure — with graph practice, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Supply, demand & elasticity",
          "milestone": "Find and shift market equilibrium",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Supply & demand",
              "description": "Markets, equilibrium, and shifts.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Elasticity",
              "description": "Price, income, and cross elasticity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Surplus & intervention",
              "description": "Surplus, taxes, and price controls.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Supply, demand, and elasticity.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Costs & market structures",
          "milestone": "Compare the market structures",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Production & costs",
              "description": "Cost curves and the short vs. long run.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Competition & monopoly",
              "description": "Perfect competition and monopoly.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Imperfect competition",
              "description": "Monopolistic competition and oligopoly.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Costs and market structures.",
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
          "theme": "Factor markets & market failure",
          "milestone": "Analyze factor markets and externalities",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Factor markets",
              "description": "Labor and resource markets.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Market failure",
              "description": "Externalities and public goods.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Government & equity",
              "description": "Income distribution and policy.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of microeconomics.",
              "type": "quiz",
              "duration": "20 min"
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
  "macroeconomics": {
    "meta": {
      "title": "Macroeconomics Study Plan, AI-Built | Learnpath",
      "description": "Get a Macroeconomics study plan in seconds — GDP, the AD-AS model, and policy — with graph practice, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Macroeconomics",
      "description": "A Macroeconomics plan in seconds — GDP to monetary policy, with graph practice and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Macroeconomics",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Macroeconomics plan in seconds — measurement, the AD-AS model, and policy — with graph practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Built around the models.",
        "desc": "Lessons build the AD-AS and money-market models so you can draw and shift them."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface formulas and cause-and-effect chains on a schedule."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Macroeconomics?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with graph practice and quizzes."
      },
      {
        "q": "Can I build a Macroeconomics plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Macroeconomics cover?",
        "a": "Economic measurement like GDP, inflation, and unemployment, the AD-AS model, fiscal and monetary policy, and international trade and finance."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Macroeconomics — 3-Week Focused Plan",
      "subtitle": "GDP to monetary policy",
      "overview": "A three-week plan across Macroeconomics — measurement, the AD-AS model and fiscal policy, then money, monetary policy, and the international sector — with graph practice, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Measurement",
          "milestone": "Calculate and interpret the indicators",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Basic concepts",
              "description": "Scarcity, the PPC, and trade-offs.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "GDP & growth",
              "description": "Measuring output and growth.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Inflation & unemployment",
              "description": "Price indices and unemployment.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Measurement.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "AD-AS & fiscal policy",
          "milestone": "Shift the AD-AS model and apply fiscal policy",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Aggregate demand & supply",
              "description": "Building and shifting AD-AS.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Fiscal policy",
              "description": "Spending, taxes, and multipliers.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Output gaps",
              "description": "Short run vs. long run.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "AD-AS and fiscal policy.",
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
          "theme": "Money & the world",
          "milestone": "Apply monetary policy and trade",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Money & banking",
              "description": "The money market and banking system.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Monetary policy",
              "description": "The central bank's tools.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "International trade",
              "description": "Exchange rates and trade.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of macroeconomics.",
              "type": "quiz",
              "duration": "20 min"
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
  "financial-accounting": {
    "meta": {
      "title": "Financial Accounting Plan, AI-Built | Learnpath",
      "description": "Get a Financial Accounting study plan in seconds — the accounting equation, journal entries, and the statements — with worked examples and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Financial Accounting",
      "description": "A Financial Accounting plan in seconds — the accounting equation to the statements, with an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Financial Accounting",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Financial Accounting plan in seconds — the accounting equation, journal entries, and the statements — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the chapter you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Debits and credits, demystified.",
        "desc": "Lessons build the logic of double-entry so journal entries and the statements finally connect."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards resurface accounts and rules on a schedule so they're automatic on an exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Financial Accounting?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with worked examples and practice."
      },
      {
        "q": "Can I build a Financial Accounting plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Financial Accounting cover?",
        "a": "The accounting equation and financial statements, recording transactions with journal entries and the ledger, adjusting and closing entries, and preparing the statements."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Financial Accounting — 3-Week Focused Plan",
      "subtitle": "The accounting equation to the statements",
      "overview": "A three-week plan across Financial Accounting — the accounting equation and statements, recording transactions, then adjusting entries and the financial statements — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "The accounting equation",
          "milestone": "Read the financial statements",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The accounting equation",
              "description": "Assets, liabilities, and equity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The financial statements",
              "description": "Income statement, balance sheet, and cash flow.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Debits & credits",
              "description": "The logic of double-entry accounting.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "The equation and statements.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Recording transactions",
          "milestone": "Journalize and post transactions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Journal entries",
              "description": "Recording transactions in the journal.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The ledger & trial balance",
              "description": "Posting and the trial balance.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Merchandising",
              "description": "Accounting for inventory and sales.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Recording transactions.",
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
          "theme": "Adjustments & statements",
          "milestone": "Adjust the books and build the statements",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Adjusting entries",
              "description": "Accruals, deferrals, and depreciation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Closing the books",
              "description": "Closing entries and the accounting cycle.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Preparing the statements",
              "description": "Building the financial statements.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of financial accounting.",
              "type": "quiz",
              "duration": "20 min"
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
  "managerial-accounting": {
    "meta": {
      "title": "Managerial Accounting Plan, AI-Built | Learnpath",
      "description": "Get a Managerial Accounting study plan in seconds — cost behavior, costing systems, and budgeting — with worked examples and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Managerial Accounting",
      "description": "A Managerial Accounting plan in seconds — cost concepts to decision-making, with an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Managerial Accounting",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Managerial Accounting plan in seconds — cost behavior, costing systems, and budgeting — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the chapter you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "The math, with worked examples.",
        "desc": "CVP, costing, and variances all come with step-by-step examples so the calculations click."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards resurface formulas and cost terms on a schedule so they're automatic."
      }
    ],
    "faq": [
      {
        "q": "How is managerial different from financial accounting?",
        "a": "Managerial accounting focuses on information for decisions inside the business — costs, budgets, and analysis — rather than external financial statements."
      },
      {
        "q": "Can I build a Managerial Accounting plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Managerial Accounting cover?",
        "a": "Cost concepts and behavior, job and process costing, cost-volume-profit analysis, budgeting, and using costs for decisions and variance analysis."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Managerial Accounting — 3-Week Focused Plan",
      "subtitle": "Cost concepts to decision-making",
      "overview": "A three-week plan across Managerial Accounting — cost concepts and behavior, costing systems and CVP, then budgeting and decision-making — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Cost concepts & behavior",
          "milestone": "Classify costs and predict behavior",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cost concepts",
              "description": "Direct, indirect, fixed, and variable costs.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Cost behavior",
              "description": "How costs change with activity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Cost flows",
              "description": "Product vs. period costs and flow.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Cost concepts and behavior.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Costing systems & CVP",
          "milestone": "Apply costing systems and CVP analysis",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Job-order costing",
              "description": "Costing custom jobs.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Process costing",
              "description": "Costing mass production.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Cost-volume-profit",
              "description": "Break-even and contribution margin.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Costing and CVP.",
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
          "theme": "Budgeting & decisions",
          "milestone": "Build budgets and analyze variances",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Budgeting",
              "description": "The master budget and its parts.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Variance analysis",
              "description": "Standard costs and variances.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Decision-making",
              "description": "Relevant costs for business decisions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of managerial accounting.",
              "type": "quiz",
              "duration": "20 min"
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
  "english-composition": {
    "meta": {
      "title": "English Composition Plan, AI-Built | Learnpath",
      "description": "Get an English Composition study plan in seconds — the writing process, argument, and research — with practice and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for English Composition",
      "description": "An English Composition plan in seconds — the writing process to research, with an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for English Composition",
      "sub": "Tell it what your course is covering or an essay you're working on, and get an English Composition plan in seconds — the writing process, argument, and research — with practice and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the assignment or unit and the plan covers the skills you need for it."
      },
      {
        "title": "A repeatable writing process.",
        "desc": "Lessons build a process — thesis, structure, draft, revise — you can use for any paper."
      },
      {
        "title": "Feedback on your writing.",
        "desc": "Draft a thesis or paragraph and ask the tutor to push your argument, evidence, and clarity."
      }
    ],
    "faq": [
      {
        "q": "Can it help me write a college essay?",
        "a": "Yes. Lessons build the thesis, structure, and evidence a strong paper needs, and the tutor can give feedback on your draft."
      },
      {
        "q": "Can I build an English Composition plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like an assignment prompt."
      },
      {
        "q": "What does English Composition cover?",
        "a": "The writing process, thesis and structure, argument and evidence, using and citing sources, research, and revision."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course and instructor."
      }
    ],
    "curriculum": {
      "title": "English Composition — 3-Week Focused Plan",
      "subtitle": "The writing process to research",
      "overview": "A three-week plan across English Composition — the writing process and structure, argument and evidence, then research, citation, and revision — with practice and review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "The writing process",
          "milestone": "Build a clear thesis and structure",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The writing process",
              "description": "Prewriting, drafting, and revising.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Thesis & structure",
              "description": "A strong thesis and paragraph structure.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Paragraphs & transitions",
              "description": "Topic sentences and flow.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Practice",
              "description": "Draft a thesis and outline with review.",
              "type": "exercise",
              "duration": "25 min"
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
          "theme": "Argument & evidence",
          "milestone": "Support a claim with evidence",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Building an argument",
              "description": "Claims, reasons, and logic.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Evidence & analysis",
              "description": "Using evidence and explaining it.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Counterarguments",
              "description": "Addressing other views.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Essay practice",
              "description": "A short argument essay with review.",
              "type": "exercise",
              "duration": "30 min"
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
          "theme": "Research & revision",
          "milestone": "Research, cite, and revise a paper",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Finding & using sources",
              "description": "Research and evaluating sources.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Citation",
              "description": "MLA and APA basics and avoiding plagiarism.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Revision & editing",
              "description": "Revising for clarity and correctness.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Essay practice",
              "description": "Revise a draft with review.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged note.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "public-speaking": {
    "meta": {
      "title": "Public Speaking Study Plan, AI-Built | Learnpath",
      "description": "Get a Public Speaking study plan in seconds — building, organizing, and delivering a speech — with practice and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Public Speaking",
      "description": "A Public Speaking plan in seconds — from topic to confident delivery, with an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Public Speaking",
      "sub": "Tell it what your course is covering or a speech you're preparing, and get a Public Speaking plan in seconds — building, organizing, and delivering a speech — with practice and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the assignment or unit and the plan covers the skills you need for it."
      },
      {
        "title": "From blank page to delivery.",
        "desc": "Lessons walk the whole arc — topic, structure, delivery — so a speech feels manageable."
      },
      {
        "title": "Calm the nerves.",
        "desc": "Lessons and the tutor help you manage speaking anxiety with practical techniques."
      }
    ],
    "faq": [
      {
        "q": "Can this help with speech anxiety?",
        "a": "Yes. The plan includes practical techniques for managing nerves, and the tutor can help you rehearse and refine."
      },
      {
        "q": "Can I build a Public Speaking plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a speech assignment."
      },
      {
        "q": "What does Public Speaking cover?",
        "a": "Choosing a topic and analyzing your audience, organizing a speech, delivery and managing anxiety, and the informative and persuasive speech types."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course and instructor."
      }
    ],
    "curriculum": {
      "title": "Public Speaking — 3-Week Focused Plan",
      "subtitle": "From topic to confident delivery",
      "overview": "A three-week plan across Public Speaking — speech basics and audience, organizing and delivering, then the informative and persuasive speech types — with practice and review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Foundations",
          "milestone": "Choose a topic and analyze your audience",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Speech basics",
              "description": "The communication process and ethics.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Audience analysis",
              "description": "Knowing and adapting to your audience.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Topic & purpose",
              "description": "Choosing a topic and a clear purpose.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Speech foundations.",
              "type": "quiz",
              "duration": "15 min"
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
          "theme": "Organizing & delivering",
          "milestone": "Structure a speech and deliver it well",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Organizing a speech",
              "description": "Introductions, structure, and conclusions.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Delivery",
              "description": "Voice, body language, and visual aids.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Managing anxiety",
              "description": "Practical techniques for nerves.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Practice",
              "description": "Outline and rehearse a short speech.",
              "type": "exercise",
              "duration": "25 min"
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
          "theme": "Speech types",
          "milestone": "Deliver an informative and a persuasive speech",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Informative speeches",
              "description": "Explaining clearly and memorably.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Persuasive speeches",
              "description": "Persuasion and appeals.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Special-occasion speeches",
              "description": "Toasts, tributes, and more.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Practice",
              "description": "Rehearse a persuasive speech with review.",
              "type": "exercise",
              "duration": "25 min"
            },
            {
              "day": 5,
              "title": "Final spaced review",
              "description": "Every flagged note.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        }
      ]
    }
  },
  "intro-to-philosophy": {
    "meta": {
      "title": "Intro to Philosophy Plan, AI-Built | Learnpath",
      "description": "Get an Intro to Philosophy study plan in seconds — logic, epistemology, metaphysics, and ethics — with flashcards and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Intro to Philosophy",
      "description": "An Intro to Philosophy plan in seconds — logic to ethics, with an AI tutor to think it through."
    },
    "hero": {
      "h1": "Your AI study partner for Intro to Philosophy",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an Intro to Philosophy plan in seconds — logic, knowledge, reality, and ethics — with lessons, flashcards, and a tutor to think it through."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Arguments you can analyze.",
        "desc": "Lessons build how to read and evaluate an argument — the core skill the course is teaching."
      },
      {
        "title": "Think it through with the tutor.",
        "desc": "Talk through a thought experiment or an argument and have the tutor push your reasoning."
      }
    ],
    "faq": [
      {
        "q": "Can this help me study for a philosophy exam?",
        "a": "Yes. Tell it the topics and it builds a plan, and the tutor can talk through the arguments and thinkers with you."
      },
      {
        "q": "Can I build a Philosophy plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Intro to Philosophy cover?",
        "a": "Logic and arguments, epistemology (knowledge), metaphysics and philosophy of mind, and ethics and political philosophy."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, readings, and instructor."
      }
    ],
    "curriculum": {
      "title": "Intro to Philosophy — 3-Week Focused Plan",
      "subtitle": "Logic to ethics",
      "overview": "A three-week plan across Intro to Philosophy — logic and epistemology, metaphysics and the mind, then ethics and political philosophy — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Logic & knowledge",
          "milestone": "Evaluate arguments and theories of knowledge",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Arguments & logic",
              "description": "Validity, soundness, and fallacies.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "What is knowledge?",
              "description": "Epistemology and justified belief.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Skepticism",
              "description": "Can we know anything for certain?",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Logic and knowledge.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Reality & the mind",
          "milestone": "Engage the big metaphysical questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Metaphysics",
              "description": "Free will, determinism, and identity.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Philosophy of mind",
              "description": "The mind-body problem.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Philosophy of religion",
              "description": "Arguments for and against.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Reality and the mind.",
              "type": "quiz",
              "duration": "15 min"
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
          "theme": "Ethics & politics",
          "milestone": "Compare the major ethical theories",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Ethical theories",
              "description": "Utilitarianism, deontology, and virtue ethics.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Applied ethics",
              "description": "Ethics in real-world cases.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Political philosophy",
              "description": "Justice, rights, and the state.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of philosophy.",
              "type": "quiz",
              "duration": "20 min"
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
  "political-science": {
    "meta": {
      "title": "Political Science Study Plan, AI-Built | Learnpath",
      "description": "Get a Political Science study plan in seconds — core concepts, institutions, and international relations — with flashcards and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Political Science",
      "description": "A Political Science plan in seconds — concepts to international relations, with an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Political Science",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Political Science plan in seconds — core concepts, institutions, and international relations — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Concepts you can apply.",
        "desc": "Lessons tie ideologies and institutions to real examples so you can analyze, not just define."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface theories and terms on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me study for a political science exam?",
        "a": "Yes. Tell it the topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build a Political Science plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does an intro Political Science course cover?",
        "a": "Core concepts and political ideologies, government institutions and systems, comparative politics, and international relations."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, readings, and instructor."
      }
    ],
    "curriculum": {
      "title": "Political Science — 3-Week Focused Plan",
      "subtitle": "Concepts to international relations",
      "overview": "A three-week plan across introductory political science — core concepts and ideologies, institutions and systems, then comparative politics and international relations — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Concepts & ideologies",
          "milestone": "Compare the major political ideologies",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "What is politics?",
              "description": "Power, the state, and legitimacy.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Political ideologies",
              "description": "Liberalism, conservatism, and others.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Democracy & regimes",
              "description": "Types of political systems.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Concepts and ideologies.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Institutions",
          "milestone": "Explain how governments are structured",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Constitutions & branches",
              "description": "How power is organized and divided.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "Elections & parties",
              "description": "Voting, parties, and representation.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Public policy",
              "description": "How policy is made.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Institutions.",
              "type": "quiz",
              "duration": "15 min"
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
          "theme": "Comparative & international",
          "milestone": "Compare states and analyze global politics",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Comparative politics",
              "description": "Comparing political systems.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 2,
              "title": "International relations",
              "description": "Theories of how states interact.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 3,
              "title": "Global issues",
              "description": "Conflict, cooperation, and institutions.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of political science.",
              "type": "quiz",
              "duration": "20 min"
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
  "nutrition": {
    "meta": {
      "title": "Nutrition Study Plan, AI-Built | Learnpath",
      "description": "Get a Nutrition study plan in seconds — macronutrients, micronutrients, and diet and health — with flashcards and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Nutrition",
      "description": "A Nutrition plan in seconds — macronutrients to diet and health, with spaced recall and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Nutrition",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get a Nutrition plan in seconds — macronutrients, micronutrients, and diet and health — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "Connects nutrients to the body.",
        "desc": "Lessons tie each nutrient to what it does in the body, so it's understanding, not memorizing."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface terms and processes on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass an intro Nutrition course?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build a Nutrition plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does an intro Nutrition course cover?",
        "a": "Macronutrients and energy, micronutrients (vitamins and minerals), digestion and metabolism, and diet, health, and making food choices."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Nutrition — 3-Week Focused Plan",
      "subtitle": "Macronutrients to diet and health",
      "overview": "A three-week plan across introductory nutrition — macronutrients and energy, micronutrients and digestion, then diet, metabolism, and health — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Macronutrients & energy",
          "milestone": "Explain the macronutrients and energy balance",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Carbohydrates",
              "description": "Simple and complex carbs and fiber.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Proteins & fats",
              "description": "Protein, amino acids, and dietary fats.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Energy balance",
              "description": "Calories, metabolism, and balance.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Macronutrients and energy.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Micronutrients & digestion",
          "milestone": "Connect vitamins, minerals, and digestion",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Vitamins",
              "description": "Water- and fat-soluble vitamins.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Minerals & water",
              "description": "Key minerals and hydration.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Digestion",
              "description": "How the body breaks down food.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Micronutrients and digestion.",
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
          "theme": "Diet & health",
          "milestone": "Apply nutrition to health and choices",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Healthy eating patterns",
              "description": "Dietary guidelines and balanced diets.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Nutrition & disease",
              "description": "Diet's role in chronic disease.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Weight & metabolism",
              "description": "Energy balance and healthy weight.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of nutrition.",
              "type": "quiz",
              "duration": "20 min"
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
  "intro-to-business": {
    "meta": {
      "title": "Intro to Business Study Plan, AI-Built | Learnpath",
      "description": "Get an Intro to Business study plan in seconds — business basics, management, marketing, and finance — with flashcards and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for Intro to Business",
      "description": "An Intro to Business plan in seconds — fundamentals to finance, with spaced recall and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Intro to Business",
      "sub": "Tell it what your course is covering or an exam you're prepping for, and get an Intro to Business plan in seconds — business basics, management, marketing, and finance — with lessons, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Keeps up with your course.",
        "desc": "Tell it the unit you're on and the plan covers exactly that, in the order your course moves."
      },
      {
        "title": "The whole business, connected.",
        "desc": "Lessons tie management, marketing, and finance together so you see how a business runs."
      },
      {
        "title": "Spaced recall built in.",
        "desc": "Flashcards resurface terms and processes on a schedule so they stick for the exam."
      }
    ],
    "faq": [
      {
        "q": "Can this help me pass Intro to Business?",
        "a": "Yes. Tell it your exam date and topics and it builds a focused plan with flashcards and quizzes."
      },
      {
        "q": "Can I build an Intro to Business plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "What does Intro to Business cover?",
        "a": "Business fundamentals and forms of ownership, the economic environment, management and marketing, and finance, accounting, and operations."
      },
      {
        "q": "Does it replace my professor or course?",
        "a": "No. It handles planning and practice and works alongside your course, textbook, and instructor."
      }
    ],
    "curriculum": {
      "title": "Intro to Business — 3-Week Focused Plan",
      "subtitle": "Fundamentals to finance",
      "overview": "A three-week plan across Intro to Business — business fundamentals and the environment, management and marketing, then finance, accounting, and operations — with flashcards, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "College",
      "weeks": [
        {
          "week": 1,
          "theme": "Fundamentals",
          "milestone": "Explain how businesses are organized",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "What is business?",
              "description": "Profit, value, and the role of business.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Forms of ownership",
              "description": "Sole proprietorships to corporations.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "The economic environment",
              "description": "Markets, competition, and the economy.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Business fundamentals.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's terms.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Management & marketing",
          "milestone": "Describe how businesses run and sell",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Management",
              "description": "Planning, organizing, and leading.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Human resources",
              "description": "Hiring, motivating, and managing people.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Marketing",
              "description": "The marketing mix and the customer.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Management and marketing.",
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
          "theme": "Finance & operations",
          "milestone": "Connect money and operations",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Accounting & finance",
              "description": "Statements, funding, and money management.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Operations",
              "description": "Producing goods and services.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Business in context",
              "description": "Ethics, technology, and the global market.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of business.",
              "type": "quiz",
              "duration": "20 min"
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