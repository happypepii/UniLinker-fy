"use client"

import { topics } from "@/lib/data"
import { TopicCard } from "@/components/topic-card"
import type { Nationality, Country } from "@/lib/types"

interface ExplorationViewProps {
  nationality: Nationality
  destination: Country
}

export function ExplorationView({ nationality, destination }: ExplorationViewProps) {
  const showVisaContent = !nationality.isEU

  const administrativeTopics = topics.filter((t) => t.category === "administrative")
  const universityTopics = topics.filter((t) => t.category === "university")
  const lifeTopics = topics.filter((t) => t.category === "life")
  const mentorshipTopics = topics.filter((t) => t.category === "mentorship")

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          Showing content for {nationality.flag} {nationality.name} → {destination.flag} {destination.name}
        </p>
      </div>

      <div className="space-y-12">
        {/* Administrative & Legal */}
        <section>
          <h2 className="mb-1 text-lg font-semibold text-foreground">Administrative & Legal</h2>
          <p className="mb-5 text-sm text-muted-foreground">Essential paperwork and legal requirements</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {administrativeTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                href={
                  topic.id === "visa" || topic.id === "blocked-account" ? `/topic/${topic.id}` : `/timeline/${topic.id}`
                }
                isDeemphasized={topic.requiresVisa && !showVisaContent}
              />
            ))}
          </div>
          {!showVisaContent && (
            <p className="mt-3 text-xs text-muted-foreground italic">
              Visa-related topics are de-emphasized for EU citizens.
            </p>
          )}
        </section>

        {/* University Reality */}
        <section>
          <h2 className="mb-1 text-lg font-semibold text-foreground">University Reality</h2>
          <p className="mb-5 text-sm text-muted-foreground">What students actually experience</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {universityTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} href={`/university/${topic.id}`} />
            ))}
          </div>
        </section>

        {/* Life & Work */}
        <section>
          <h2 className="mb-1 text-lg font-semibold text-foreground">Life & Work After Arrival</h2>
          <p className="mb-5 text-sm text-muted-foreground">Settling in and building your life</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lifeTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} href={`/timeline/${topic.id}`} />
            ))}
          </div>
        </section>

        {/* Peer Mentorship */}
        <section>
          <h2 className="mb-1 text-lg font-semibold text-foreground">Peer Mentorship</h2>
          <p className="mb-5 text-sm text-muted-foreground">Connect with students who have been there</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mentorshipTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} href="/mentorship" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
