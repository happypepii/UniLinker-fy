import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Topic, Nationality } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTopicRelevantForNationality(topic: Topic, nationality: Nationality | null): boolean {
  if (!nationality) return true // Show all if no nationality selected

  const relevance = topic.relevance
  if (!relevance) return true // No relevance rules = always relevant

  // Check EU requirement
  if (relevance.requiresNonEU && nationality.isEU) return false
  if (relevance.requiresEU && !nationality.isEU) return false

  // Check specific nationality exclusions
  if (relevance.excludeNationalities?.includes(nationality.code)) return false

  return true
}
