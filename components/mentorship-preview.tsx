import { Star, Clock, User } from "lucide-react"
import type { Mentor } from "@/lib/types"

interface MentorshipPreviewProps {
  mentors: Mentor[]
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-card-foreground">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground">{mentor.university}</p>
          <p className="text-xs text-muted-foreground">{mentor.nationality}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-warning/10 px-2 py-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs font-medium text-warning-foreground">{mentor.trustScore}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Can help with</p>
        <div className="flex flex-wrap gap-1.5">
          {mentor.areas.map((area) => (
            <span key={area} className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>{mentor.responseTime}</span>
      </div>
    </div>
  )
}

export function MentorshipPreview({ mentors }: MentorshipPreviewProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Peer Mentorship</h1>
        <p className="text-muted-foreground">
          Connect with students who have navigated the same challenges. High-reputation mentors provide guidance for
          complex situations.
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">How trust scores work:</strong> Mentors earn reputation through helpful
          responses and verified experiences. Scores reflect reliability, not popularity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border p-6 text-center">
        <p className="text-sm text-muted-foreground">Booking and messaging features coming soon.</p>
      </div>
    </div>
  )
}
