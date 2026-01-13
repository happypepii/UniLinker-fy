"use client"

import { use } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { TimelineView } from "@/components/timeline-view"
import { timelineSteps, topics } from "@/lib/data"

export default function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const topic = topics.find((t) => t.id === id)

  return (
    <div className="min-h-screen bg-background">
      <Header showContextSwitcher={false} />
      <div className="mx-auto max-w-3xl px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to topics
        </Link>
      </div>
      <TimelineView
        topicTitle={topic?.title || "Your Journey"}
        topicDescription={topic?.description || "Step-by-step guide with tips from real students"}
        steps={timelineSteps}
      />
    </div>
  )
}
