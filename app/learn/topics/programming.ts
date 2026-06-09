// app/learn/topics/programming.ts — programming & computer science
import type { TopicData } from './types'

export const programmingTopics: Record<string, TopicData> = 
{
  "javascript": {
    "meta": {
      "title": "JavaScript Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized JavaScript learning plan — syntax, the DOM, and async — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for JavaScript",
      "description": "A JavaScript plan in seconds — syntax to async, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for JavaScript",
      "sub": "Tell it your goal or a topic to master, and get a JavaScript plan in seconds — syntax, the DOM, and async — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No. Tell it you're starting from zero and the plan begins with the fundamentals."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "JavaScript syntax and functions, arrays, objects, and the DOM, and modern features like async/await and ES6+ — building toward small projects."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "JavaScript Foundations — 3-Week Starter Plan",
      "subtitle": "From syntax to your first interactive page",
      "overview": "A three-week plan that takes you from JavaScript basics to interactive web pages — syntax and control flow, arrays, objects, and the DOM, then async and modern features — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Syntax & control flow",
          "milestone": "Write programs that make decisions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Variables & types",
              "description": "let, const, numbers, strings, and booleans.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Functions",
              "description": "Declaring, calling, and arrow functions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Conditionals & loops",
              "description": "if/else, for, and while.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Trace and predict output.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on syntax and control flow.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Arrays, objects & the DOM",
          "milestone": "Work with data and the page",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Arrays",
              "description": "Storing lists and array methods.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Objects",
              "description": "Properties, methods, and JSON.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "The DOM",
              "description": "Selecting and changing page elements.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Arrays, objects, and the DOM.",
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
          "theme": "Async & a build",
          "milestone": "Handle async and build something",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Events",
              "description": "Responding to clicks and input.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Async & fetch",
              "description": "Promises, async/await, and fetching data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Build an interactive widget",
              "description": "Combine it into a working feature.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of JavaScript.",
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
  "java": {
    "meta": {
      "title": "Java Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized Java learning plan — syntax, OOP, and collections — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Java",
      "description": "A Java plan in seconds — syntax to OOP, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Java",
      "sub": "Tell it your goal or a topic to master, and get a Java plan in seconds — syntax, object-oriented programming, and collections — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No. Tell it you're starting from zero and the plan begins with the fundamentals."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "Java syntax and control flow, object-oriented programming with classes and inheritance, collections, and exceptions and generics — building toward small programs."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "Java Foundations — 3-Week Starter Plan",
      "subtitle": "From syntax to object-oriented programs",
      "overview": "A three-week plan that takes you from Java basics to object-oriented programs — syntax and control flow, classes and inheritance, then collections, exceptions, and a build — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Syntax & control flow",
          "milestone": "Write and run basic Java programs",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Variables & types",
              "description": "Primitives, strings, and type rules.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Methods",
              "description": "Defining and calling methods.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Conditionals & loops",
              "description": "if/else, for, while, and switch.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Trace and predict output.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on syntax and control flow.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Object-oriented programming",
          "milestone": "Model the world with classes",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Classes & objects",
              "description": "Fields, constructors, and methods.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Inheritance",
              "description": "Extending classes and overriding.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Interfaces & polymorphism",
              "description": "Abstraction and polymorphism.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Object-oriented programming.",
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
          "theme": "Collections & a build",
          "milestone": "Use collections and handle errors",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Collections",
              "description": "Lists, maps, and sets.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Exceptions & generics",
              "description": "Handling errors and generic types.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Build a small program",
              "description": "Combine the pieces into a working app.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Java.",
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
  "c-plus-plus": {
    "meta": {
      "title": "C++ Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized C++ learning plan — syntax, pointers and memory, and the STL — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for C++",
      "description": "A C++ plan in seconds — syntax to the STL, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for C++",
      "sub": "Tell it your goal or a topic to master, and get a C++ plan in seconds — syntax, pointers and memory, and the STL — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No, though some programming background helps. The plan begins with the fundamentals if you tell it you're new."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "C++ syntax and control flow, pointers, references, and memory, object-oriented programming, and the Standard Template Library and templates."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "C++ Foundations — 3-Week Starter Plan",
      "subtitle": "From syntax to the STL",
      "overview": "A three-week plan that takes you from C++ basics through its defining features — syntax and control flow, pointers, memory, and OOP, then the STL and templates — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Syntax & control flow",
          "milestone": "Write and compile basic programs",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Variables & types",
              "description": "Types, I/O, and the compile cycle.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Functions",
              "description": "Parameters, return values, and overloading.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Conditionals & loops",
              "description": "Control flow in C++.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Trace and predict output.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on syntax and control flow.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Pointers, memory & OOP",
          "milestone": "Manage memory and model with classes",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Pointers & references",
              "description": "How pointers and references work.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Memory management",
              "description": "The stack, the heap, and new/delete.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Classes & OOP",
              "description": "Classes, constructors, and inheritance.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Pointers, memory, and OOP.",
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
          "theme": "The STL & templates",
          "milestone": "Use the standard library",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "STL containers",
              "description": "Vectors, maps, and iterators.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Templates",
              "description": "Writing generic functions and classes.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Build a small program",
              "description": "Combine the pieces into a working app.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of C++.",
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
  "sql": {
    "meta": {
      "title": "SQL Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized SQL learning plan — queries, joins, and aggregation — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for SQL",
      "description": "A SQL plan in seconds — queries to joins, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for SQL",
      "sub": "Tell it your goal or a topic to master, and get a SQL plan in seconds — queries, joins, and aggregation — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No. Tell it you're starting from zero and the plan begins with simple SELECT queries."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "Querying with SELECT, filtering and sorting, joins across tables, aggregation and grouping, subqueries, and modifying data — plus the basics of table design."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "SQL Foundations — 3-Week Starter Plan",
      "subtitle": "From SELECT to joins and aggregation",
      "overview": "A three-week plan that takes you from basic queries to real analysis — selecting and filtering, joins and aggregation, then subqueries, modifying data, and design — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Querying data",
          "milestone": "Select, filter, and sort",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "SELECT basics",
              "description": "Selecting columns from a table.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Filtering with WHERE",
              "description": "Conditions, operators, and patterns.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Sorting & limiting",
              "description": "ORDER BY and LIMIT.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Querying data.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's syntax.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Joins & aggregation",
          "milestone": "Combine and summarize data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Joins",
              "description": "INNER and LEFT joins across tables.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Aggregation",
              "description": "COUNT, SUM, AVG, and more.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "GROUP BY & HAVING",
              "description": "Grouping and filtering groups.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Joins and aggregation.",
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
          "theme": "Subqueries, writes & design",
          "milestone": "Go beyond reading data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Subqueries & CTEs",
              "description": "Nesting queries and common table expressions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Modifying data",
              "description": "INSERT, UPDATE, and DELETE.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Table design",
              "description": "Keys, relationships, and normalization.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of SQL.",
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
  "html-and-css": {
    "meta": {
      "title": "HTML & CSS Study Plan: AI-Built | Learnpath",
      "description": "Get a personalized HTML and CSS learning plan — structure, styling, and responsive layout — with hands-on lessons, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for HTML & CSS",
      "description": "An HTML and CSS plan in seconds — structure to responsive layout, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for HTML & CSS",
      "sub": "Tell it your goal or a topic to master, and get an HTML and CSS plan in seconds — structure, styling, and responsive layout — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No. This is a common first step into web development and the plan starts from scratch."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "HTML structure and semantics, CSS styling and the box model, and layout with flexbox and grid plus responsive design — building toward a real page."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "HTML & CSS Foundations — 3-Week Starter Plan",
      "subtitle": "From structure to a responsive page",
      "overview": "A three-week plan that takes you from a blank file to a responsive page — HTML structure, CSS styling and the box model, then layout and responsive design — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "HTML structure",
          "milestone": "Build a well-structured page",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "HTML basics",
              "description": "Elements, tags, and document structure.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Text & links",
              "description": "Headings, lists, links, and images.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Semantic HTML & forms",
              "description": "Semantic tags and basic forms.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "HTML structure.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's tags.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "CSS styling",
          "milestone": "Style a page with CSS",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Selectors & properties",
              "description": "Targeting elements and setting styles.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The box model",
              "description": "Margin, border, padding, and sizing.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Colors, fonts & spacing",
              "description": "Making a page look good.",
              "type": "lesson",
              "duration": "25 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "CSS styling.",
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
          "theme": "Layout & responsive",
          "milestone": "Lay out a responsive page",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Flexbox",
              "description": "Arranging elements in a row or column.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Grid",
              "description": "Two-dimensional layouts.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Responsive design",
              "description": "Media queries and a responsive build.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of HTML and CSS.",
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
  "react": {
    "meta": {
      "title": "React Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized React learning plan — components, state and hooks, and data fetching — with hands-on lessons, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for React",
      "description": "A React plan in seconds — components to hooks, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for React",
      "sub": "Tell it your goal or a topic to master, and get a React plan in seconds — components, state and hooks, and data fetching — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "What should I know before React?",
        "a": "Comfort with JavaScript fundamentals helps a lot. Tell Learnpath where you are and it adjusts — or start with the JavaScript plan first."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "Components and JSX, props, state and hooks, handling events, effects and data fetching — building toward a small working app."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "React Foundations — 3-Week Starter Plan",
      "subtitle": "From components to a small app",
      "overview": "A three-week plan that takes you from your first component to a working app — components, props, and JSX, state, hooks, and events, then effects, data fetching, and a build — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Components & props",
          "milestone": "Build and compose components",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Components & JSX",
              "description": "Your first component and JSX.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Props",
              "description": "Passing data into components.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Lists & conditional rendering",
              "description": "Rendering lists and conditions.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Components and props.",
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
          "theme": "State & hooks",
          "milestone": "Make components interactive",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "useState",
              "description": "Managing component state.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Events",
              "description": "Handling clicks and form input.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Lifting state up",
              "description": "Sharing state between components.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "State and hooks.",
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
          "theme": "Effects & a build",
          "milestone": "Fetch data and build an app",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "useEffect",
              "description": "Side effects and the dependency array.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Fetching data",
              "description": "Loading data from an API.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Build a small app",
              "description": "Combine the pieces into a working app.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of React.",
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
  "data-structures-and-algorithms": {
    "meta": {
      "title": "DSA Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized data structures and algorithms plan — big-O, core structures, and sorting and searching — with lessons, flashcards, and an AI tutor. Free, no signup."
    },
    "og": {
      "title": "Your AI study partner for data structures & algorithms",
      "description": "A DSA plan in seconds — big-O to graphs, with worked examples and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for data structures & algorithms",
      "sub": "Tell it your goal — interview prep or coursework — and get a data structures and algorithms plan in seconds — big-O, core structures, and sorting and searching — with worked examples, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Built for interviews and coursework.",
        "desc": "Tell it whether you're prepping for interviews or a class, and the plan emphasizes the right patterns."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Is this good for coding interviews?",
        "a": "Yes. The plan covers the structures, big-O analysis, and patterns that interviews lean on, with practice problems."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "Big-O analysis, arrays, strings, and hashing, linked lists, stacks, queues, and trees, and sorting, searching, recursion, and graph basics."
      },
      {
        "q": "What language is it in?",
        "a": "The concepts are language-agnostic, and you can tell the tutor your language for examples. Pair it with the Python, Java, or JavaScript plan if you're also learning the language."
      }
    ],
    "curriculum": {
      "title": "Data Structures & Algorithms — 3-Week Starter Plan",
      "subtitle": "From big-O to graphs",
      "overview": "A three-week plan across core DSA — analysis and the linear structures, trees and recursion, then sorting, searching, and graphs — with worked examples, quizzes, and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Analysis & linear structures",
          "milestone": "Analyze complexity and use core structures",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Big-O notation",
              "description": "Time and space complexity.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Arrays & strings",
              "description": "Common operations and patterns.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Hashing",
              "description": "Hash maps and sets.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Analysis and linear structures.",
              "type": "quiz",
              "duration": "20 min"
            },
            {
              "day": 5,
              "title": "Spaced review",
              "description": "Recall on the week's patterns.",
              "type": "review",
              "duration": "15 min"
            }
          ]
        },
        {
          "week": 2,
          "theme": "Lists, stacks & trees",
          "milestone": "Work with linked and hierarchical structures",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Linked lists",
              "description": "Singly and doubly linked lists.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Stacks & queues",
              "description": "LIFO and FIFO structures.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Trees",
              "description": "Binary trees and traversal.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Lists, stacks, and trees.",
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
          "theme": "Sorting, searching & graphs",
          "milestone": "Apply the core algorithms",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Sorting & searching",
              "description": "Key sorts and binary search.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Recursion & backtracking",
              "description": "Recursive problem solving.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Graphs",
              "description": "Representation, BFS, and DFS.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of DSA.",
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
  "web-development": {
    "meta": {
      "title": "Web Development Study Plan, AI-Built | Learnpath",
      "description": "Get a personalized web development plan — HTML/CSS, JavaScript, and backend basics — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for web development",
      "description": "A web development plan in seconds — front end to back end, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for web development",
      "sub": "Tell it your goal or where you're starting, and get a web development plan in seconds — HTML and CSS, JavaScript, and backend basics — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No. Tell it you're starting from zero and the plan begins with how the web works and HTML/CSS."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "How the web works, HTML and CSS, JavaScript and the DOM, and backend basics like APIs and deployment — building toward a working site."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "Web Development — 3-Week Starter Plan",
      "subtitle": "From front end to back end",
      "overview": "A three-week plan across web development — HTML, CSS, and how the web works, JavaScript and the DOM, then backend basics and deployment — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Front-end foundations",
          "milestone": "Build and style a page",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "How the web works",
              "description": "Browsers, servers, and HTTP.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "HTML & CSS",
              "description": "Structure and styling.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Responsive layout",
              "description": "Flexbox, grid, and media queries.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Front-end foundations.",
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
          "theme": "JavaScript & the DOM",
          "milestone": "Make a page interactive",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "JavaScript basics",
              "description": "Variables, functions, and control flow.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "The DOM & events",
              "description": "Changing the page and handling input.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Fetching data",
              "description": "APIs and async basics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "JavaScript and the DOM.",
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
          "theme": "Backend & deploy",
          "milestone": "Add a backend and ship it",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Servers & APIs",
              "description": "What a backend does and REST basics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Working with data",
              "description": "Storing and retrieving data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Deploying a site",
              "description": "Putting a project online.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of web development.",
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
  "machine-learning": {
    "meta": {
      "title": "Machine Learning Study Plan, AI-Built | Learnpath",
      "description": "Get a personalized machine learning plan — foundations, core algorithms, and model evaluation — with lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for machine learning",
      "description": "A machine learning plan in seconds — foundations to neural nets, with lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for machine learning",
      "sub": "Tell it your goal or where you're starting, and get a machine learning plan in seconds — foundations, core algorithms, and model evaluation — with lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Concepts and the math behind them.",
        "desc": "Lessons build the intuition and the key math, so the algorithms aren't black boxes."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "What should I know first?",
        "a": "Comfort with Python and basic statistics helps. Tell Learnpath where you are, or pair this with the Python plan."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "What machine learning is, supervised and unsupervised learning, core algorithms like regression, classification, and trees, and model evaluation plus an intro to neural networks."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "Machine Learning — 3-Week Starter Plan",
      "subtitle": "From foundations to neural networks",
      "overview": "A three-week plan across machine learning fundamentals — foundations and data, core algorithms, then evaluation and an intro to neural networks — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Intermediate",
      "weeks": [
        {
          "week": 1,
          "theme": "Foundations",
          "milestone": "Understand the ML workflow",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "What is machine learning?",
              "description": "Supervised, unsupervised, and the workflow.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Data & features",
              "description": "Preparing data and feature basics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Linear regression",
              "description": "Your first model.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Foundations.",
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
          "theme": "Core algorithms",
          "milestone": "Train the key models",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Classification",
              "description": "Logistic regression and k-NN.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Decision trees & ensembles",
              "description": "Trees, forests, and boosting.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Unsupervised learning",
              "description": "Clustering and dimensionality reduction.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Core algorithms.",
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
          "theme": "Evaluation & neural nets",
          "milestone": "Evaluate models and meet neural nets",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Model evaluation",
              "description": "Train/test split, metrics, and cross-validation.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Overfitting & regularization",
              "description": "Bias, variance, and tuning.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Intro to neural networks",
              "description": "How neural networks learn.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of machine learning.",
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
  "data-science": {
    "meta": {
      "title": "Data Science Study Plan, AI-Built | Learnpath",
      "description": "Get a personalized data science plan — Python and pandas, EDA, and intro modeling — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for data science",
      "description": "A data science plan in seconds — Python and pandas to modeling, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for data science",
      "sub": "Tell it your goal or where you're starting, and get a data science plan in seconds — Python and pandas, exploratory analysis, and intro modeling — with hands-on lessons, practice, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "What should I know first?",
        "a": "Some Python helps, but you can start fresh. Tell Learnpath where you are, or pair this with the Python plan."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "Python and pandas for data, cleaning and exploratory data analysis, visualization, and an introduction to statistics and modeling."
      },
      {
        "q": "Does it replace a course or instructor?",
        "a": "No. It handles planning and daily practice and works alongside any course, book, or bootcamp you're using."
      }
    ],
    "curriculum": {
      "title": "Data Science — 3-Week Starter Plan",
      "subtitle": "From pandas to your first model",
      "overview": "A three-week plan across data science fundamentals — Python and pandas, cleaning, EDA, and visualization, then statistics and intro modeling — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "30 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Python & pandas",
          "milestone": "Load and manipulate data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Python for data",
              "description": "The essentials you need for data work.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "pandas basics",
              "description": "DataFrames, selection, and filtering.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Aggregation & joins",
              "description": "Grouping and combining data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Python and pandas.",
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
          "theme": "Cleaning & EDA",
          "milestone": "Explore and visualize data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cleaning data",
              "description": "Missing values and tidy data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Exploratory analysis",
              "description": "Finding patterns in data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Visualization",
              "description": "Charts that communicate clearly.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Cleaning and EDA.",
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
          "theme": "Statistics & modeling",
          "milestone": "Draw conclusions and model",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Statistics for data science",
              "description": "Distributions and inference basics.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Intro to modeling",
              "description": "A first predictive model.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "A small analysis",
              "description": "Take a dataset end to end.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of data science.",
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
  "excel": {
    "meta": {
      "title": "Excel Study Plan: AI-Built in Seconds | Learnpath",
      "description": "Get a personalized Excel learning plan — formulas, functions, and pivot tables — with hands-on lessons, flashcards, and an AI tutor. Free to try, no signup."
    },
    "og": {
      "title": "Your AI study partner for Excel",
      "description": "An Excel plan in seconds — formulas to pivot tables, with hands-on lessons and an AI tutor."
    },
    "hero": {
      "h1": "Your AI study partner for Excel",
      "sub": "Tell it your goal or where you're starting, and get an Excel plan in seconds — formulas, functions, and pivot tables — with hands-on lessons, practice, flashcards, and a tutor."
    },
    "benefits": [
      {
        "title": "Learn by building.",
        "desc": "Lessons pair each concept with small, runnable examples, so you're writing real code from day one."
      },
      {
        "title": "Goes at your pace.",
        "desc": "Tell it whether you're starting from zero or leveling up, and the plan scales its depth and speed."
      },
      {
        "title": "Practice that sticks.",
        "desc": "Flashcards and checkpoint quizzes resurface syntax and concepts so the fundamentals become second nature."
      }
    ],
    "faq": [
      {
        "q": "Do I need experience to start?",
        "a": "No. Tell it you're starting from zero and the plan begins with cells, formatting, and basic formulas."
      },
      {
        "q": "Can I build a plan for free?",
        "a": "Yes — generate one on the homepage with no signup. A free account saves it and unlocks lessons and flashcards; Pro adds the AI tutor and uploading your own materials, like a course PDF."
      },
      {
        "q": "What does it cover?",
        "a": "Cells, formulas, and formatting, key functions like lookups and logical and text functions, and pivot tables, charts, and basic analysis."
      },
      {
        "q": "Does this work for Google Sheets too?",
        "a": "Most concepts transfer directly. The lessons focus on Excel, but the tutor can point out Sheets equivalents."
      }
    ],
    "curriculum": {
      "title": "Excel Foundations — 3-Week Starter Plan",
      "subtitle": "From formulas to pivot tables",
      "overview": "A three-week plan across Excel — cells, formulas, and formatting, the key functions, then pivot tables, charts, and analysis — with quizzes and spaced review.",
      "totalWeeks": 3,
      "daysPerWeek": 5,
      "sessionTime": "25 min",
      "level": "Beginner",
      "weeks": [
        {
          "week": 1,
          "theme": "Basics",
          "milestone": "Build and format a spreadsheet",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Cells & navigation",
              "description": "Rows, columns, and references.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Formulas",
              "description": "Writing formulas and using references.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Formatting",
              "description": "Number formats and clean layouts.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Excel basics.",
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
          "theme": "Functions",
          "milestone": "Use the workhorse functions",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Logical & math functions",
              "description": "IF, SUMIF, and friends.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Lookup functions",
              "description": "VLOOKUP, XLOOKUP, and INDEX/MATCH.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "Text & date functions",
              "description": "Cleaning and combining data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Checkpoint quiz",
              "description": "Functions.",
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
          "theme": "Analysis",
          "milestone": "Summarize and visualize data",
          "quizCount": 1,
          "days": [
            {
              "day": 1,
              "title": "Pivot tables",
              "description": "Summarizing data quickly.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 2,
              "title": "Charts",
              "description": "Visualizing your data.",
              "type": "lesson",
              "duration": "30 min"
            },
            {
              "day": 3,
              "title": "A small analysis",
              "description": "Take a dataset from raw to insight.",
              "type": "exercise",
              "duration": "30 min"
            },
            {
              "day": 4,
              "title": "Cumulative quiz",
              "description": "Three weeks of Excel.",
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