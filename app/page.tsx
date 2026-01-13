"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ContextSelector } from "@/components/context-selector"
import { ExplorationView } from "@/components/exploration-view"
import type { Nationality, Country } from "@/lib/types"

export default function HomePage() {
  const [context, setContext] = useState<{
    nationality: Nationality
    destination: Country
  } | null>(null)

  const handleContextComplete = (nationality: Nationality, destination: Country) => {
    setContext({ nationality, destination })
  }

  const handleNationalityChange = (nationality: Nationality) => {
    if (context) {
      setContext({ ...context, nationality })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        nationality={context?.nationality}
        onNationalityChange={handleNationalityChange}
        showContextSwitcher={!!context}
      />

      {!context ? (
        <ContextSelector onComplete={handleContextComplete} />
      ) : (
        <ExplorationView nationality={context.nationality} destination={context.destination} />
      )}
    </div>
  )
}
