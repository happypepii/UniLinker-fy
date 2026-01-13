"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { MentorshipPreview } from "@/components/mentorship-preview"
import { mentors } from "@/lib/data"
import { useUserContext } from "@/lib/user-context"

export default function MentorshipPage() {
  const { userContext } = useUserContext()

  const buildBackURL = () => {
    const params = new URLSearchParams()
    if (userContext.nationality) params.set("nationality", userContext.nationality.code)
    if (userContext.destination) params.set("destination", userContext.destination.code)
    return params.toString() ? `/?${params.toString()}` : "/"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header nationality={userContext.nationality} showContextSwitcher={!!userContext.nationality} />
      <div className="mx-auto max-w-4xl px-6 py-4">
        <Link
          href={buildBackURL()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to topics
        </Link>
      </div>
      <MentorshipPreview mentors={mentors} />
    </div>
  )
}
