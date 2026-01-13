import type { Nationality, Country, Topic, Question, TimelineStep, University, Mentor } from "./types"

export const nationalities: Nationality[] = [
  { code: "TW", name: "Taiwan", flag: "🇹🇼", isEU: false },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", isEU: true },
  { code: "US", name: "United States", flag: "🇺🇸", isEU: false },
  { code: "IN", name: "India", flag: "🇮🇳", isEU: false },
  { code: "CN", name: "China", flag: "🇨🇳", isEU: false },
  { code: "KR", name: "South Korea", flag: "🇰🇷", isEU: false },
  { code: "JP", name: "Japan", flag: "🇯🇵", isEU: false },
  { code: "BR", name: "Brazil", flag: "🇧🇷", isEU: false },
  { code: "PL", name: "Poland", flag: "🇵🇱", isEU: true },
  { code: "FR", name: "France", flag: "🇫🇷", isEU: true },
]

export const countries: Country[] = [
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
]

export const topics: Topic[] = [
  // Administrative & Legal
  {
    id: "visa",
    title: "Student Visa",
    description: "Application process, appointments, and documents",
    category: "administrative",
    icon: "passport",
    requiresVisa: true,
    tags: ["urgent", "legal"],
  },
  {
    id: "registration",
    title: "City Registration",
    description: "Anmeldung and residence permits",
    category: "administrative",
    icon: "building",
    tags: ["required"],
  },
  {
    id: "blocked-account",
    title: "Blocked Account",
    description: "Setting up financial proof for visa",
    category: "administrative",
    icon: "bank",
    requiresVisa: true,
    tags: ["financial"],
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    description: "Public vs private, requirements",
    category: "administrative",
    icon: "shield",
    tags: ["required"],
  },

  // University Reality
  {
    id: "tu-dresden",
    title: "TU Dresden",
    description: "Technical University of Dresden reality check",
    category: "university",
    icon: "graduation",
    tags: ["dresden", "technical"],
  },
  {
    id: "tum",
    title: "TU Munich",
    description: "Technical University of Munich insights",
    category: "university",
    icon: "graduation",
    tags: ["munich", "technical"],
  },
  {
    id: "lmu",
    title: "LMU Munich",
    description: "Ludwig Maximilian University insights",
    category: "university",
    icon: "graduation",
    tags: ["munich"],
  },

  // Life & Work
  {
    id: "housing",
    title: "Housing",
    description: "Finding accommodation, scams to avoid",
    category: "life",
    icon: "home",
    tags: ["urgent", "essential"],
  },
  {
    id: "banking",
    title: "Banking",
    description: "Opening accounts, best options",
    category: "life",
    icon: "credit-card",
    tags: ["financial"],
  },
  {
    id: "jobs",
    title: "Student Jobs",
    description: "Working regulations, where to find jobs",
    category: "life",
    icon: "briefcase",
    tags: ["work"],
  },
  {
    id: "internships",
    title: "Internships",
    description: "Finding and securing internships",
    category: "life",
    icon: "building-2",
    tags: ["work", "career"],
  },

  // Mentorship
  {
    id: "peer-mentorship",
    title: "Find a Mentor",
    description: "Connect with experienced students",
    category: "mentorship",
    icon: "users",
    tags: ["support"],
  },
]

export const sampleQuestions: Question[] = [
  {
    id: "q1",
    question: "When should I book my visa appointment for Germany?",
    answers: [
      {
        id: "a1",
        content:
          "Book at least 3-4 months before your intended travel date. Embassy appointments fill up quickly, especially during peak season (June-August). I made the mistake of waiting until 2 months before and had to delay my semester start.",
        author: { nationality: "Taiwan", university: "TU Dresden", status: "student" },
        helpfulCount: 47,
        date: "2025-08-15",
      },
      {
        id: "a2",
        content:
          "For the German embassy in Taipei, slots open at midnight on the 1st of each month. Set an alarm and be ready to book immediately. I got my appointment within 5 minutes of slots opening.",
        author: { nationality: "Taiwan", university: "TUM", status: "graduate" },
        helpfulCount: 32,
        date: "2025-09-02",
      },
    ],
  },
  {
    id: "q2",
    question: "What documents do I actually need for the blocked account?",
    answers: [
      {
        id: "a3",
        content:
          "You need: passport copy, admission letter, proof of address (can be temporary), and around €11,208 for the year. I used Expatrio - the process took about 2 weeks. Make sure your name matches exactly across all documents.",
        author: { nationality: "India", university: "TU Dresden", status: "student" },
        helpfulCount: 58,
        date: "2025-07-20",
      },
    ],
  },
]

export const timelineSteps: TimelineStep[] = [
  {
    id: "t1",
    title: "Accept your offer",
    description: "Formally accept your university admission and pay any required deposits.",
    stage: "after-acceptance",
    tips: [
      "Save all confirmation emails and documents",
      "Note all deadlines in your calendar",
      "Start gathering documents for visa early",
    ],
    mistakes: ["Missing the acceptance deadline", "Not reading the conditions attached to your offer"],
  },
  {
    id: "t2",
    title: "Open blocked account",
    description: "Set up your blocked account as proof of financial means for visa.",
    stage: "after-acceptance",
    tips: [
      "Compare providers: Expatrio, Fintiba, Deutsche Bank",
      "Transfer funds early - international transfers can take time",
      "Keep receipt for visa appointment",
    ],
    mistakes: ["Transferring exact amount without buffer for fees", "Name mismatch between bank account and passport"],
  },
  {
    id: "t3",
    title: "Book visa appointment",
    description: "Schedule your visa interview at the German embassy.",
    stage: "after-acceptance",
    tips: ["Book 3-4 months in advance", "Prepare all original documents", "Practice common interview questions"],
    mistakes: ["Waiting too long to book", "Missing required documents on the day"],
  },
  {
    id: "t4",
    title: "Arrange health insurance",
    description: "Get approved health insurance before arrival.",
    stage: "before-arrival",
    tips: [
      "Public insurance (TK, AOK) is often cheaper for students",
      "Get insurance certificate in German",
      "Coverage must start from day 1 in Germany",
    ],
    mistakes: ["Travel insurance is NOT enough", "Choosing private when you could have public"],
  },
  {
    id: "t5",
    title: "Find temporary housing",
    description: "Secure at least 2 weeks of accommodation for arrival.",
    stage: "before-arrival",
    tips: [
      "Student dormitory waitlists can be years long",
      "Airbnb for first 2-4 weeks is common",
      "Never pay for housing without video tour or in-person viewing",
    ],
    mistakes: ["Paying deposits to scammers", "Arriving without any accommodation lined up"],
  },
  {
    id: "t6",
    title: "City registration (Anmeldung)",
    description: "Register your address at the local Bürgeramt within 14 days.",
    stage: "first-30-days",
    tips: [
      "Book appointment online before arrival if possible",
      "Bring passport, rental contract, landlord confirmation form",
      "This unlocks everything else: bank account, phone contract, etc.",
    ],
    mistakes: [
      "Waiting more than 14 days (it is legally required)",
      "Not having Wohnungsgeberbestätigung from landlord",
    ],
  },
  {
    id: "t7",
    title: "Open bank account",
    description: "Set up a German bank account for daily transactions.",
    stage: "first-30-days",
    tips: [
      "N26, DKB, or traditional banks like Sparkasse",
      "Need Anmeldung confirmation for most banks",
      "Ask about student discounts",
    ],
    mistakes: ["High fees at traditional banks for international students", "Not activating online banking"],
  },
  {
    id: "t8",
    title: "University enrollment",
    description: "Complete enrollment (Immatrikulation) at your university.",
    stage: "first-30-days",
    tips: [
      "Bring all original documents",
      "Pay semester fee to get student ID",
      "Student ID often includes public transport",
    ],
    mistakes: ["Missing enrollment deadline", "Not bringing certified translations"],
  },
]

export const universities: University[] = [
  {
    id: "tu-dresden",
    name: "TU Dresden",
    country: "Germany",
    city: "Dresden",
    adminFriction: "medium",
    languageUsage: { english: 60, local: 40 },
    insights: [
      "Most master programs are fully in English, but daily life requires basic German",
      "International Office is helpful but very slow to respond",
      "Campus is spread across the city - plan travel time between buildings",
      "Student services (Mensa, library) are excellent value",
    ],
    quotes: [
      {
        text: 'I wish I had learned basic German before arriving. Even "Entschuldigung" and "Ich verstehe nicht" help a lot.',
        author: { nationality: "Taiwan", year: "2024" },
      },
      {
        text: "The bureaucracy is real. Every form needs three stamps and two signatures.",
        author: { nationality: "India", year: "2023" },
      },
      {
        text: "Dresden is incredibly affordable compared to Munich or Berlin. My rent was half what friends pay elsewhere.",
        author: { nationality: "Brazil", year: "2024" },
      },
    ],
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    adminFriction: "high",
    languageUsage: { english: 75, local: 25 },
    insights: [
      "Highly competitive atmosphere - both academically and for housing",
      "Excellent industry connections, especially for tech and engineering",
      "Munich is expensive - budget €800-1200/month minimum for living costs",
      "Multiple campuses: city center, Garching (engineering), Freising (life sciences)",
    ],
    quotes: [
      {
        text: "TUM opens doors. The network alone is worth the Munich prices.",
        author: { nationality: "China", year: "2024" },
      },
      {
        text: "Finding housing took me 3 months. Start looking before you even get your acceptance.",
        author: { nationality: "United States", year: "2023" },
      },
    ],
  },
]

export const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Wei-Lin C.",
    university: "TU Dresden",
    nationality: "Taiwan",
    areas: ["Visa Process", "Housing in Dresden", "Engineering Programs"],
    trustScore: 4.9,
    responseTime: "Within 24 hours",
  },
  {
    id: "m2",
    name: "Priya S.",
    university: "TUM",
    nationality: "India",
    areas: ["Blocked Account", "Job Search", "Tech Industry"],
    trustScore: 4.8,
    responseTime: "Within 48 hours",
  },
  {
    id: "m3",
    name: "Tomáš K.",
    university: "TU Dresden",
    nationality: "Czech Republic",
    areas: ["EU Student Process", "Housing", "Student Life"],
    trustScore: 4.7,
    responseTime: "Within 24 hours",
  },
  {
    id: "m4",
    name: "Min-Ji P.",
    university: "LMU Munich",
    nationality: "South Korea",
    areas: ["Healthcare", "Banking", "German Language"],
    trustScore: 4.9,
    responseTime: "Within 24 hours",
  },
]
