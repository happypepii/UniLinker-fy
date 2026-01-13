"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ContextSelector } from "@/components/context-selector"
import { ExplorationView } from "@/components/exploration-view"
import { useUserContext } from "@/lib/user-context"
import type { Nationality, Country } from "@/lib/types"

export default function HomePage() {
  const router = useRouter()
  const { userContext, setUserContext } = useUserContext()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setIsInitialized(true)
  }, [])

  const hasContext = userContext.nationality && userContext.destination

  const handleContextComplete = (nationality: Nationality, destination: Country) => {
    setUserContext({ nationality, destination })
  }

  const handleNationalityChange = (nationality: Nationality) => {
    if (userContext.destination) {
      setUserContext({ nationality, destination: userContext.destination })
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background">
        <Header showContextSwitcher={false} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        nationality={userContext.nationality}
        onNationalityChange={handleNationalityChange}
        showContextSwitcher={!!hasContext}
      />

      {!hasContext ? (
        <ContextSelector onComplete={handleContextComplete} />
      ) : (
        <ExplorationView nationality={userContext.nationality!} destination={userContext.destination!} />
      )}
    </div>
  )
}
