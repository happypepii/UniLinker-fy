"use client"

import { topics } from "@/lib/data"
import { TopicCard } from "@/components/topic-card"
import { useUserContext } from "@/lib/user-context"
import { isTopicRelevantForNationality } from "@/lib/utils"
import type { Nationality, Country } from "@/lib/types"

interface ExplorationViewProps {
  nationality: Nationality
  destination: Country
}

export function ExplorationView({ nationality, destination }: ExplorationViewProps) {
  const { userContext } = useUserContext()

  const relevantTopics = topics.filter((t) => isTopicRelevantForNationality(t, nationality))

  const administrativeTopics = relevantTopics.filter((t) => t.category === "administrative")
  const universityTopics = relevantTopics.filter((t) => t.category === "university")
  const lifeTopics = relevantTopics.filter((t) => t.category === "life")
  const mentorshipTopics = relevantTopics.filter((t) => t.category === "mentorship")

  const buildHref = (path: string) => {
    const params = new URLSearchParams()
    if (userContext.nationality) params.set("nationality", userContext.nationality.code)
    if (userContext.destination) params.set("destination", userContext.destination.code)
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          Showing content for {nationality.flag} {nationality.name} → {destination.flag} {destination.name}
        </p>
      </div>

      <div className="space-y-12">
        {/* Administrative & Legal */}
        {administrativeTopics.length > 0 && (
          <section>
            <h2 className="mb-1 text-lg font-semibold text-foreground">Administrative & Legal</h2>
            <p className="mb-5 text-sm text-muted-foreground">Essential paperwork and legal requirements</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {administrativeTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  href={buildHref(
                    topic.id === "visa" || topic.id === "blocked-account"
                      ? `/topic/${topic.id}`
                      : `/timeline/${topic.id}`,
                  )}
                />
              ))}
            </div>
          </section>
        )}

        {/* University Reality */}
        {universityTopics.length > 0 && (
          <section>
            <h2 className="mb-1 text-lg font-semibold text-foreground">University Reality</h2>
            <p className="mb-5 text-sm text-muted-foreground">What students actually experience</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {universityTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} href={buildHref(`/university/${topic.id}`)} />
              ))}
            </div>
          </section>
        )}

        {/* Life & Work */}
        {lifeTopics.length > 0 && (
          <section>
            <h2 className="mb-1 text-lg font-semibold text-foreground">Life & Work After Arrival</h2>
            <p className="mb-5 text-sm text-muted-foreground">Settling in and building your life</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {lifeTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} href={buildHref(`/timeline/${topic.id}`)} />
              ))}
            </div>
          </section>
        )}

        {/* Peer Mentorship */}
        {mentorshipTopics.length > 0 && (
          <section>
            <h2 className="mb-1 text-lg font-semibold text-foreground">Peer Mentorship</h2>
            <p className="mb-5 text-sm text-muted-foreground">Connect with students who have been there</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mentorshipTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} href={buildHref("/mentorship")} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
