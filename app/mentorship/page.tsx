import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { MentorshipPreview } from "@/components/mentorship-preview"
import { mentors } from "@/lib/data"

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showContextSwitcher={false} />
      <div className="mx-auto max-w-4xl px-6 py-4">
        <Link
          href="/"
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
