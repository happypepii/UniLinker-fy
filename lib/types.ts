export type Nationality = {
  code: string
  name: string
  flag: string
  isEU: boolean
}

export type Country = {
  code: string
  name: string
  flag: string
}

export type UserContext = {
  nationality: Nationality | null
  destination: Country | null
}

export type TopicCategory = "administrative" | "university" | "life" | "mentorship"

export type TopicRelevance = {
  // If true, only show for non-EU nationals
  requiresNonEU?: boolean
  // If true, only show for EU nationals
  requiresEU?: boolean
  // Specific nationality codes where this topic is NOT relevant
  excludeNationalities?: string[]
}

export type Topic = {
  id: string
  title: string
  description: string
  category: TopicCategory
  icon: string
  requiresVisa?: boolean
  tags?: string[]
  comingSoon?: boolean
  relevance?: TopicRelevance
}

export type Answer = {
  id: string
  content: string
  author: {
    nationality: string
    university: string
    status: "student" | "graduate"
  }
  helpfulCount: number
  date: string
}

export type Question = {
  id: string
  question: string
  answers: Answer[]
}

export type TimelineStep = {
  id: string
  title: string
  description: string
  tips: string[]
  mistakes: string[]
  stage: "after-acceptance" | "before-arrival" | "first-30-days" | "first-semester"
}

export type University = {
  id: string
  name: string
  country: string
  city: string
  adminFriction: "low" | "medium" | "high"
  languageUsage: {
    english: number
    local: number
  }
  insights: string[]
  quotes: {
    text: string
    author: {
      nationality: string
      year: string
    }
  }[]
}

export type Mentor = {
  id: string
  name: string
  university: string
  nationality: string
  areas: string[]
  trustScore: number
  responseTime: string
}

export type RealTimeline = {
  id: string
  visaType: string
  nationality: string
  submissionDate: string
  followUps: { date: string; action: string }[]
  approvalDate: string
  totalDays: number
  notes?: string
}
