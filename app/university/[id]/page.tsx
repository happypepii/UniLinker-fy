"use client"

import { use } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { UniversityProfile } from "@/components/university-profile"
import { universities } from "@/lib/data"
import { useUserContext } from "@/lib/user-context"

export default function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { userContext } = useUserContext()
  const university = universities.find((u) => u.id === id)

  const buildBackURL = () => {
    const params = new URLSearchParams()
    if (userContext.nationality) params.set("nationality", userContext.nationality.code)
    if (userContext.destination) params.set("destination", userContext.destination.code)
    return params.toString() ? `/?${params.toString()}` : "/"
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background">
        <Header showContextSwitcher={false} />
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <h1 className="text-xl font-semibold text-foreground">University not found</h1>
          <Link
            href={buildBackURL()}
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header nationality={userContext.nationality} showContextSwitcher={!!userContext.nationality} />
      <div className="mx-auto max-w-3xl px-6 py-4">
        <Link
          href={buildBackURL()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to topics
        </Link>
      </div>
      <UniversityProfile university={university} />
    </div>
  )
}
