"use client"

import { use } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { UniversityProfile } from "@/components/university-profile"
import { universities } from "@/lib/data"

export default function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const university = universities.find((u) => u.id === id)

  if (!university) {
    return (
      <div className="min-h-screen bg-background">
        <Header showContextSwitcher={false} />
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <h1 className="text-xl font-semibold text-foreground">University not found</h1>
          <Link
            href="/"
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
      <UniversityProfile university={university} />
    </div>
  )
}
