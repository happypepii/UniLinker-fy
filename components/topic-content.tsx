"use client"

import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { QAView } from "@/components/qa-view"
import { VisaSubcategoryView } from "@/components/visa-subcategory-view"
import { VisaOverview } from "@/components/visa-overview"
import { VisaTimelineView } from "@/components/visa-timeline-view"
import { RealTimelinesView } from "@/components/real-timelines-view"
import { VisaQAView } from "@/components/visa-qa-view"
import { sampleQuestions, topics } from "@/lib/data"
import { useUserContext } from "@/lib/user-context"

type VisaSubcategory = "overview" | "timeline" | "real-timelines" | "qa"

interface TopicContentProps {
  id: string
}

export function TopicContent({ id }: TopicContentProps) {
  const searchParams = useSearchParams()
  const { userContext, updateURLParams } = useUserContext()
  const topic = topics.find((t) => t.id === id)

  const visaSubcategory = searchParams.get("view") as VisaSubcategory | null

  const buildBackURL = (path: string) => {
    const params = new URLSearchParams()
    if (userContext.nationality) params.set("nationality", userContext.nationality.code)
    if (userContext.destination) params.set("destination", userContext.destination.code)
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Header showContextSwitcher={false} />
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <h1 className="text-xl font-semibold text-foreground">Topic not found</h1>
          <Link
            href={buildBackURL("/")}
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  const isVisaTopic = id === "visa"

  const handleSelectSubcategory = (subcategoryId: string) => {
    updateURLParams({ view: subcategoryId })
  }

  const handleBackToVisa = () => {
    updateURLParams({ view: null })
  }

  const renderVisaContent = () => {
    switch (visaSubcategory) {
      case "overview":
        return <VisaOverview />
      case "timeline":
        return <VisaTimelineView />
      case "real-timelines":
        return <RealTimelinesView />
      case "qa":
        return <VisaQAView />
      default:
        return <VisaSubcategoryView onSelectSubcategory={handleSelectSubcategory} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header nationality={userContext.nationality} showContextSwitcher={!!userContext.nationality} />
      <div className="mx-auto max-w-3xl px-6 py-4">
        {isVisaTopic && visaSubcategory ? (
          <button
            onClick={handleBackToVisa}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Student Visa
          </button>
        ) : (
          <Link
            href={buildBackURL("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to topics
          </Link>
        )}
      </div>
      {isVisaTopic ? (
        renderVisaContent()
      ) : (
        <QAView topicTitle={topic.title} topicDescription={topic.description} questions={sampleQuestions} />
      )}
    </div>
  )
}
