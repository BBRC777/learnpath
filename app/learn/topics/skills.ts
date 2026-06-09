// app/learn/topics/skills.ts — skills & interests
import type { TopicData } from './types'

export const skillsTopics: Record<string, TopicData> = {
  'personal-finance': {
    meta: { title: "Personal Finance Study Plan, AI-Built | Learnpath", description: "Get a Personal Finance learning plan in seconds — budgeting, debt, and investing basics — with lessons, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for personal finance", description: "A personal finance plan in seconds — budgeting to investing basics, with lessons and an AI tutor." },
    hero: { h1: "Your AI study partner for personal finance", sub: "Tell it where you're starting or what you want to figure out, and get a personal finance plan in seconds — budgeting, debt, and investing basics — with plain-English lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Starts wherever you are.", desc: "Tell it you're new to money management or brushing up, and the plan scales to match." },
      { title: "Plain English, no jargon.", desc: "Lessons explain the terms and trade-offs simply, so the concepts actually make sense." },
      { title: "Practice that sticks.", desc: "Flashcards resurface key ideas on a schedule so they become second nature." },
    ],
    faq: [
      { q: "Is this financial advice?", a: "No — it's educational. Learnpath explains how money concepts work; for decisions about your own situation, consult a qualified professional." },
      { q: "Can I build a personal finance plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "I'm starting from zero — is that okay?", a: "Absolutely. Tell it you're a beginner and the plan starts with the basics — budgeting and saving — before building up." },
      { q: "What does it cover?", a: "Budgeting and saving, credit and debt, and the basics of investing, retirement, and protecting your money." },
    ],
    curriculum: {
      title: "Personal Finance — 3-Week Starter Plan", subtitle: "Budgeting to investing basics", overview: "A three-week plan across personal finance fundamentals — budgeting and saving, credit and debt, then the basics of investing and planning — with lessons and spaced review. Educational only, not financial advice.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "20 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Budgeting & saving", milestone: "Build a budget and a savings habit", quizCount: 1, days: [
          { day: 1, title: "Money basics", description: "Income, expenses, and where your money goes.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Building a budget", description: "Simple budgeting methods that work.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Saving & emergency funds", description: "Paying yourself first and a safety net.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Budgeting and saving.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's ideas.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Credit & debt", milestone: "Understand credit and a debt plan", quizCount: 1, days: [
          { day: 1, title: "Credit scores", description: "What they are and what moves them.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Managing debt", description: "Payoff strategies and interest.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Loans & credit cards", description: "Using credit wisely.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Credit and debt.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Investing & planning", milestone: "Grasp the basics of growing your money", quizCount: 1, days: [
          { day: 1, title: "Investing basics", description: "Risk, return, and compound growth.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Retirement accounts", description: "How tax-advantaged accounts work.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Insurance & taxes", description: "Protecting your money and the basics of taxes.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of personal finance.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'investing-basics': {
    meta: { title: "Investing Basics Study Plan, AI-Built | Learnpath", description: "Get an Investing Basics learning plan in seconds — risk and return, asset classes, and building a portfolio — with lessons and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for investing basics", description: "An investing basics plan in seconds — risk and return to portfolios, with lessons and an AI tutor." },
    hero: { h1: "Your AI study partner for investing basics", sub: "Tell it where you're starting, and get an investing basics plan in seconds — risk and return, asset classes, and building a simple portfolio — with plain-English lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Starts from the ground up.", desc: "No background needed — the plan begins with what investing is and why it works." },
      { title: "Plain English, no hype.", desc: "Lessons explain the concepts and trade-offs calmly, without get-rich-quick noise." },
      { title: "Practice that sticks.", desc: "Flashcards resurface key terms and ideas on a schedule so they become second nature." },
    ],
    faq: [
      { q: "Is this investment advice?", a: "No — it's educational. Learnpath explains how investing concepts work; for decisions about your own money, consult a qualified professional." },
      { q: "Can I build an investing plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "Do I need money to start learning?", a: "No. This is about understanding the concepts — risk, diversification, and the main asset classes — before you ever invest a dollar." },
      { q: "What does it cover?", a: "Why people invest, risk and return, the main asset classes (stocks, bonds, and funds), and the basics of building a diversified portfolio." },
    ],
    curriculum: {
      title: "Investing Basics — 3-Week Starter Plan", subtitle: "Risk and return to a simple portfolio", overview: "A three-week plan across investing fundamentals — foundations and risk, the asset classes, then building a simple portfolio — with lessons and spaced review. Educational only, not investment advice.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "20 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Foundations", milestone: "Understand risk, return, and accounts", quizCount: 1, days: [
          { day: 1, title: "Why invest?", description: "Inflation, growth, and compounding.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Risk & return", description: "The core trade-off in investing.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Investment accounts", description: "Brokerage and retirement accounts.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Investing foundations.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Asset classes", milestone: "Tell the main asset classes apart", quizCount: 1, days: [
          { day: 1, title: "Stocks", description: "What owning a share means.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Bonds", description: "Lending, interest, and risk.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Funds & ETFs", description: "Mutual funds, index funds, and ETFs.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Asset classes.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Building a portfolio", milestone: "Understand diversification and getting started", quizCount: 1, days: [
          { day: 1, title: "Diversification", description: "Why you don't put it all in one place.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Index investing", description: "The case for low-cost, broad funds.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Getting started", description: "Putting the pieces together calmly.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of investing basics.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'music-theory': {
    meta: { title: "Music Theory Study Plan, AI-Built | Learnpath", description: "Get a Music Theory learning plan in seconds — notes and rhythm, scales and keys, and chords — with lessons, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for music theory", description: "A music theory plan in seconds — notes and rhythm to chords, with lessons and an AI tutor." },
    hero: { h1: "Your AI study partner for music theory", sub: "Tell it where you're starting, and get a music theory plan in seconds — notes and rhythm, scales and keys, and chords — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Starts wherever you are.", desc: "New to theory or filling gaps — tell it, and the plan scales to match." },
      { title: "Connects to real music.", desc: "Lessons tie each concept to how it sounds and how it's used, not just symbols on a page." },
      { title: "Practice that sticks.", desc: "Flashcards resurface notes, intervals, and chords on a schedule so they become automatic." },
    ],
    faq: [
      { q: "Do I need to read music already?", a: "No. The plan starts with the staff, notes, and rhythm, so you can begin from scratch." },
      { q: "Can I build a music theory plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "Will this teach me an instrument?", a: "It teaches the theory behind the music. It pairs well with learning an instrument but focuses on understanding notes, scales, and chords." },
      { q: "What does it cover?", a: "Reading notes and rhythm, scales, keys, and intervals, and building chords and understanding progressions." },
    ],
    curriculum: {
      title: "Music Theory — 3-Week Starter Plan", subtitle: "Notes and rhythm to chords", overview: "A three-week plan across music theory fundamentals — notes and rhythm, scales and keys, then chords and progressions — with lessons, flashcards, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "20 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Notes & rhythm", milestone: "Read notes and basic rhythms", quizCount: 1, days: [
          { day: 1, title: "The staff & notes", description: "Reading pitches on the staff.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Rhythm & note values", description: "Beats, note lengths, and time signatures.", type: "lesson", duration: "20 min" },
          { day: 3, title: "The keyboard & octaves", description: "How pitches are laid out and named.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Notes and rhythm.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's basics.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Scales & keys", milestone: "Build scales and read key signatures", quizCount: 1, days: [
          { day: 1, title: "Major scales", description: "How major scales are built.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Minor scales & keys", description: "Minor scales and key signatures.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Intervals", description: "The distance between notes.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Scales and keys.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Chords & progressions", milestone: "Build chords and read progressions", quizCount: 1, days: [
          { day: 1, title: "Triads", description: "Major, minor, and other triads.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Seventh chords", description: "Adding the seventh and chord quality.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Chord progressions", description: "How chords move and function.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of music theory.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'chess': {
    meta: { title: "Chess Study Plan, AI-Built | Learnpath", description: "Get a Chess learning plan in seconds — fundamentals, tactics, and endgames — with lessons, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for chess", description: "A chess plan in seconds — fundamentals to endgames, with lessons and an AI tutor." },
    hero: { h1: "Your AI study partner for chess", sub: "Tell it where you're starting, and get a chess plan in seconds — fundamentals, tactics, and endgames — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Starts wherever you are.", desc: "Brand new or rated and improving — tell it, and the plan scales to match." },
      { title: "Patterns over memorization.", desc: "Lessons build the tactical and positional patterns strong players actually recognize." },
      { title: "Practice that sticks.", desc: "Flashcards resurface tactics and ideas on a schedule so you spot them faster over the board." },
    ],
    faq: [
      { q: "I just learned the rules — is this for me?", a: "Yes. Tell it you're a beginner and the plan starts with fundamentals before moving to tactics and endgames." },
      { q: "Can I build a chess plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "Will this replace playing and analyzing games?", a: "No — playing is how you improve. This gives you the concepts and patterns to apply while you play and review your own games." },
      { q: "What does it cover?", a: "The fundamentals and basic checkmates, opening principles and common tactics, and positional ideas and essential endgames." },
    ],
    curriculum: {
      title: "Chess — 3-Week Starter Plan", subtitle: "Fundamentals to endgames", overview: "A three-week plan across chess improvement — fundamentals and checkmates, openings and tactics, then strategy and endgames — with lessons, flashcards, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "20 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Fundamentals", milestone: "Deliver basic checkmates confidently", quizCount: 1, days: [
          { day: 1, title: "Pieces & values", description: "How pieces move and what they're worth.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Check, checkmate & stalemate", description: "The goal and how games end.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Basic checkmates", description: "King and queen, king and rook.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Fundamentals.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's basics.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Openings & tactics", milestone: "Spot the common tactical patterns", quizCount: 1, days: [
          { day: 1, title: "Opening principles", description: "Center, development, and king safety.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Forks & pins", description: "Two of the most common tactics.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Skewers & discoveries", description: "More tactical patterns to recognize.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Checkpoint quiz", description: "Openings and tactics.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Strategy & endgames", milestone: "Apply positional ideas and key endgames", quizCount: 1, days: [
          { day: 1, title: "Positional ideas", description: "Pawn structure, weak squares, and plans.", type: "lesson", duration: "20 min" },
          { day: 2, title: "Essential endgames", description: "King and pawn endgames.", type: "lesson", duration: "20 min" },
          { day: 3, title: "Putting it together", description: "Thinking through a whole game.", type: "lesson", duration: "20 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of chess.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'digital-marketing': {
    meta: { title: "Digital Marketing Study Plan, AI-Built | Learnpath", description: "Get a Digital Marketing learning plan in seconds — strategy, channels, and analytics — with lessons, flashcards, and an AI tutor. Free to try, no signup." },
    og: { title: "Your AI study partner for digital marketing", description: "A digital marketing plan in seconds — strategy to analytics, with lessons and an AI tutor." },
    hero: { h1: "Your AI study partner for digital marketing", sub: "Tell it your goal or where you're starting, and get a digital marketing plan in seconds — strategy, channels, and analytics — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Starts wherever you are.", desc: "New to marketing or sharpening specific channels — tell it, and the plan scales to match." },
      { title: "Strategy before tactics.", desc: "Lessons build the audience and funnel thinking first, so the channel tactics actually have a purpose." },
      { title: "Practice that sticks.", desc: "Flashcards resurface terms and metrics on a schedule so they become second nature." },
    ],
    faq: [
      { q: "Is this for beginners or marketers?", a: "Both. Tell it you're starting out and it begins with fundamentals; tell it you want depth in a channel and it focuses there." },
      { q: "Can I build a digital marketing plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "Does it cover specific tools?", a: "It focuses on the concepts that carry across tools — SEO, content, social, email, ads, and analytics — so you can apply them in whatever platform you use." },
      { q: "What does it cover?", a: "Marketing strategy and the funnel, the major channels (SEO, content, social, and email), and paid ads and analytics." },
    ],
    curriculum: {
      title: "Digital Marketing — 3-Week Starter Plan", subtitle: "Strategy to analytics", overview: "A three-week plan across digital marketing — strategy and audience, the major channels, then paid ads and analytics — with lessons, flashcards, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Foundations & strategy", milestone: "Map an audience and a funnel", quizCount: 1, days: [
          { day: 1, title: "The marketing landscape", description: "The channels and how they fit together.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Audience & positioning", description: "Who you're talking to and why they care.", type: "lesson", duration: "25 min" },
          { day: 3, title: "The marketing funnel", description: "Awareness to conversion.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Strategy and the funnel.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Channels", milestone: "Understand the major organic channels", quizCount: 1, days: [
          { day: 1, title: "SEO & content", description: "Search and content marketing basics.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Social media", description: "Building and engaging an audience.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Email marketing", description: "Lists, sequences, and lifecycle.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "The channels.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Ads & analytics", milestone: "Read core metrics and optimize", quizCount: 1, days: [
          { day: 1, title: "Paid advertising", description: "Search and social ads basics.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Analytics & metrics", description: "The metrics that actually matter.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Testing & optimization", description: "A/B testing and improving over time.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of digital marketing.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },

  'project-management': {
    meta: { title: "Project Management Study Plan, AI-Built | Learnpath", description: "Get a Project Management learning plan in seconds — the project lifecycle, planning, and methodologies — with lessons, flashcards, and an AI tutor. Free, no signup." },
    og: { title: "Your AI study partner for project management", description: "A project management plan in seconds — the lifecycle to methodologies, with lessons and an AI tutor." },
    hero: { h1: "Your AI study partner for project management", sub: "Tell it your goal or where you're starting, and get a project management plan in seconds — the project lifecycle, planning, and methodologies — with lessons, flashcards, and a tutor." },
    benefits: [
      { title: "Starts wherever you are.", desc: "New to PM or formalizing what you already do — tell it, and the plan scales to match." },
      { title: "Concepts you can use Monday.", desc: "Lessons tie scope, schedule, and risk to real projects so the ideas are immediately practical." },
      { title: "Practice that sticks.", desc: "Flashcards resurface terms and processes on a schedule so they become second nature." },
    ],
    faq: [
      { q: "Is this for the PMP exam?", a: "It's a solid foundation in project management concepts. For the PMP exam specifically, try the PMP plan, which is built around the exam." },
      { q: "Can I build a project management plan for free?", a: "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials." },
      { q: "Do I need to be a project manager already?", a: "No. Tell it you're new and it starts with what a project is and the lifecycle, building toward planning and execution." },
      { q: "What does it cover?", a: "The project lifecycle and scope, planning the schedule, budget, and risk, and execution plus methodologies like Agile and waterfall." },
    ],
    curriculum: {
      title: "Project Management — 3-Week Starter Plan", subtitle: "The lifecycle to methodologies", overview: "A three-week plan across project management — foundations and the lifecycle, planning the schedule, budget, and risk, then execution and methodologies — with lessons, flashcards, and spaced review.", totalWeeks: 3, daysPerWeek: 5, sessionTime: "25 min", level: "Beginner",
      weeks: [
        { week: 1, theme: "Foundations", milestone: "Define a project's scope and lifecycle", quizCount: 1, days: [
          { day: 1, title: "What is project management?", description: "Projects, constraints, and the PM's role.", type: "lesson", duration: "25 min" },
          { day: 2, title: "The project lifecycle", description: "Initiating, planning, executing, and closing.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Scope & stakeholders", description: "Defining scope and managing stakeholders.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Foundations.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Recall on the week's terms.", type: "review", duration: "15 min" },
        ]},
        { week: 2, theme: "Planning", milestone: "Build a schedule, budget, and risk plan", quizCount: 1, days: [
          { day: 1, title: "Scheduling", description: "Tasks, dependencies, and timelines.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Budgeting & resources", description: "Estimating cost and assigning resources.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Risk management", description: "Identifying and planning for risks.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Checkpoint quiz", description: "Planning.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Spaced review", description: "Mixed recall across weeks one and two.", type: "review", duration: "15 min" },
        ]},
        { week: 3, theme: "Execution & methodologies", milestone: "Track work and compare methodologies", quizCount: 1, days: [
          { day: 1, title: "Agile vs. waterfall", description: "The major approaches and when to use each.", type: "lesson", duration: "25 min" },
          { day: 2, title: "Tracking & communication", description: "Keeping a project on course.", type: "lesson", duration: "25 min" },
          { day: 3, title: "Closing a project", description: "Delivery, review, and lessons learned.", type: "lesson", duration: "25 min" },
          { day: 4, title: "Cumulative quiz", description: "Three weeks of project management.", type: "quiz", duration: "15 min" },
          { day: 5, title: "Final spaced review", description: "Every flagged card.", type: "review", duration: "15 min" },
        ]},
      ],
    },
  },
}