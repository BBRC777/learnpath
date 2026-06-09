// app/learn/topics/languages.ts — conversational languages
import type { TopicData } from './types'

export const languageTopics: Record<string, TopicData> = 
{
  "french-conversational": {
    "meta": {
      "title": "Conversational French Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational French — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational French",
      "description": "Get a plan to actually speak everyday French — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational French",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak French — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in French — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a French study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with greetings and the present tense, building toward everyday conversations."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational French — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday French — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Greetings & courtesies",
              "description": "Hello and goodbye, please and thank you, and formal vs. informal 'you'.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and asking in return.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & the present tense",
              "description": "Counting plus regular -er, -ir, and -re verbs.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "italian-conversational": {
    "meta": {
      "title": "Conversational Italian Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational Italian — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational Italian",
      "description": "Get a plan to actually speak everyday Italian — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational Italian",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak Italian — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in Italian — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a Italian study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with greetings and the present tense, building toward everyday conversations."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational Italian — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday Italian — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Greetings & courtesies",
              "description": "Hello and goodbye, please and thank you, and formal vs. informal 'you'.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and asking in return.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & the present tense",
              "description": "Counting plus regular -are, -ere, and -ire verbs.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "german": {
    "meta": {
      "title": "Conversational German Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational German — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational German",
      "description": "Get a plan to actually speak everyday German — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational German",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak German — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in German — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a German study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with greetings and the present tense, building toward everyday conversations."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational German — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday German — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Greetings & courtesies",
              "description": "Hello and goodbye, please and thank you, and formal vs. informal 'you'.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and asking in return.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & the present tense",
              "description": "Counting plus regular present-tense verbs and word order.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "japanese": {
    "meta": {
      "title": "Conversational Japanese Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational Japanese — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational Japanese",
      "description": "Get a plan to actually speak everyday Japanese — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational Japanese",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak Japanese — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with. It introduces the kana scripts as you go."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in Japanese — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a Japanese study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with the kana and basic greetings, building toward everyday conversations."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational Japanese — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday Japanese — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Hiragana & greetings",
              "description": "The hiragana script and essential greetings.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and polite phrases.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & basic sentences",
              "description": "Counting and simple sentence structure (verb at the end).",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "mandarin-chinese": {
    "meta": {
      "title": "Conversational Mandarin Chinese Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational Mandarin Chinese — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational Mandarin Chinese",
      "description": "Get a plan to actually speak everyday Mandarin Chinese — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational Mandarin Chinese",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak Mandarin Chinese — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with. It uses pinyin and introduces characters gradually."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in Mandarin Chinese — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a Mandarin Chinese study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with pinyin, the tones, and basic greetings."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational Mandarin Chinese — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday Mandarin Chinese — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Pinyin & tones",
              "description": "The pinyin system and the four tones.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Greetings & introducing yourself",
              "description": "Essential greetings and saying your name.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & basic sentences",
              "description": "Counting and simple sentence structure.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "korean": {
    "meta": {
      "title": "Conversational Korean Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational Korean — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational Korean",
      "description": "Get a plan to actually speak everyday Korean — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational Korean",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak Korean — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with. It introduces Hangul early so you can read as you learn."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in Korean — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a Korean study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with Hangul and basic greetings."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational Korean — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday Korean — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Hangul & greetings",
              "description": "The Hangul alphabet and essential greetings.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and polite phrases.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & basic sentences",
              "description": "Counting and simple sentence structure (verb at the end).",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "portuguese": {
    "meta": {
      "title": "Conversational Portuguese Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational Portuguese — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational Portuguese",
      "description": "Get a plan to actually speak everyday Portuguese — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational Portuguese",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak Portuguese — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in Portuguese — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a Portuguese study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with greetings and the present tense, building toward everyday conversations."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational Portuguese — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday Portuguese — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Greetings & courtesies",
              "description": "Hello and goodbye, please and thank you, and formal vs. informal 'you'.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and asking in return.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & the present tense",
              "description": "Counting plus regular -ar, -er, and -ir verbs.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "arabic": {
    "meta": {
      "title": "Conversational Arabic Plan, AI-Built | Learnpath",
      "description": "Get a personalized plan for everyday conversational Arabic — practical lessons, spaced vocab, and an AI tutor to practice with. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for conversational Arabic",
      "description": "Get a plan to actually speak everyday Arabic — practical lessons, spaced vocab, and an AI tutor to practice with."
    },
    "hero": {
      "h1": "Your AI study partner for conversational Arabic",
      "sub": "Tell it your level or a situation you want to handle, and get a plan to actually speak Arabic — practical phrases, spaced-repetition vocab, and an AI tutor you can practice with. It focuses on everyday Modern Standard Arabic and introduces the script as you go."
    },
    "benefits": [
      {
        "title": "Built for real conversations.",
        "desc": "Lessons center on the phrases and patterns you'd actually use in Arabic — introductions, ordering, directions — not grammar drills in isolation."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back the words you're about to forget, so your everyday vocabulary keeps growing."
      },
      {
        "title": "Practice with a patient tutor.",
        "desc": "Ask the AI tutor to explain a tense, rephrase a sentence, or run through a scenario with you — as many times as you need."
      }
    ],
    "faq": [
      {
        "q": "How long until I can hold a basic conversation?",
        "a": "With consistent daily practice, a few weeks is enough to handle simple exchanges. Learnpath fits the plan to your level and the time you have each day."
      },
      {
        "q": "Can I build a Arabic study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. Tell it you're starting from zero and the plan begins with the script and basic greetings."
      },
      {
        "q": "Does it have audio or replace a class?",
        "a": "The lessons and tutor are text-based, so pair it with listening practice or a conversation partner for pronunciation. It handles your daily vocabulary and grammar and works alongside any class or app."
      }
    ],
    "curriculum": {
      "title": "Conversational Arabic — 3-Week Starter Plan",
      "subtitle": "From greetings to everyday situations",
      "overview": "A three-week plan focused on speaking everyday Arabic — greetings and introductions, then getting around and ordering, then past and future so you can tell simple stories — with vocabulary review and checkpoint quizzes.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Greetings & introductions",
          "milestone": "Introduce yourself and ask simple questions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The alphabet & greetings",
              "description": "The Arabic script and essential greetings.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Introducing yourself",
              "description": "Your name, where you're from, and polite phrases.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & basic phrases",
              "description": "Counting and simple everyday phrases.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Short exchanges using greetings and the present.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Getting around & everyday needs",
          "milestone": "Order food and ask for directions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Food & ordering",
              "description": "Reading a menu, ordering politely, and common dishes.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Directions & places",
              "description": "Asking where things are and understanding the answer.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Everyday verbs",
              "description": "The high-frequency verbs you'll use most.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Role-play ordering and asking for directions.",
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
          "theme": "Past, future & telling stories",
          "milestone": "Talk about what you did and what you'll do",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The past",
              "description": "Talking about completed actions.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "The future",
              "description": "Saying what you're going to do.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Putting it together",
              "description": "Linking sentences to tell a short story.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks in short conversations.",
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
  "american-sign-language": {
    "meta": {
      "title": "ASL Study Plan, AI-Built | Learnpath",
      "description": "Get an American Sign Language study plan in seconds — the manual alphabet, core vocabulary, ASL grammar, and Deaf culture — with lessons, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for American Sign Language",
      "description": "An ASL plan in seconds — the alphabet to grammar and Deaf culture, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for American Sign Language",
      "sub": "Tell it your level, and get an ASL plan in seconds — the manual alphabet, core vocabulary, ASL grammar, and Deaf culture — with lessons, flashcards, and a tutor. Because ASL is a visual language, pair it with video or a class for the signs themselves."
    },
    "benefits": [
      {
        "title": "Builds the foundation.",
        "desc": "Lessons cover the manual alphabet, core vocabulary, ASL grammar, and Deaf culture — the structure behind the signs."
      },
      {
        "title": "Vocabulary that sticks.",
        "desc": "Spaced-repetition flashcards bring back concepts and vocabulary you're about to forget."
      },
      {
        "title": "Honest about its limits.",
        "desc": "ASL is visual and gestural, so the plan builds your understanding and points you to video and in-person practice for the actual signing."
      }
    ],
    "faq": [
      {
        "q": "Can a text-based tool really teach ASL?",
        "a": "It teaches the foundation — vocabulary, grammar, and Deaf culture — but ASL is visual, so you'll need video resources or a class to learn the signs themselves. Learnpath is designed to work alongside those."
      },
      {
        "q": "Can I build an ASL study plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials."
      },
      {
        "q": "I'm a complete beginner — is that okay?",
        "a": "Absolutely. The plan starts with the manual alphabet and core vocabulary, building toward simple sentences and Deaf-culture basics."
      },
      {
        "q": "Does it replace a class or a Deaf instructor?",
        "a": "No — and for a visual language, learning from Deaf instructors and signers matters. It handles your study planning and vocabulary and works alongside any class."
      }
    ],
    "curriculum": {
      "title": "American Sign Language — 3-Week Starter Plan",
      "subtitle": "From the alphabet to simple sentences",
      "overview": "A three-week plan focused on the foundation of ASL — the manual alphabet and core vocabulary, everyday vocabulary and grammar, then sentence structure and Deaf culture — with flashcards and quizzes. Pair it with video or a class for the signs themselves.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "20 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Alphabet & first vocabulary",
          "milestone": "Fingerspell and learn core signs",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "The manual alphabet",
              "description": "Fingerspelling and when it's used.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Greetings & introductions",
              "description": "Core greeting vocabulary and concepts.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Numbers & everyday words",
              "description": "Counting and high-frequency vocabulary.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "The alphabet and first vocabulary.",
              "type": "quiz",
              "duration": "15 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Flashcard recall on the week's vocabulary.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Vocabulary & grammar",
          "milestone": "Build vocabulary and ASL grammar",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Everyday vocabulary",
              "description": "Family, food, and common topics.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "ASL grammar basics",
              "description": "Word order and the role of space.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Facial grammar",
              "description": "How expression carries meaning.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Vocabulary and grammar.",
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
          "theme": "Sentences & Deaf culture",
          "milestone": "Form sentences and learn the culture",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Building sentences",
              "description": "Putting signs together in ASL order.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 2,
              "title": "Asking questions",
              "description": "Question structure in ASL.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 3,
              "title": "Deaf culture",
              "description": "Community, etiquette, and history.",
              "type": "lesson",
              "duration": "20 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of ASL foundations.",
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