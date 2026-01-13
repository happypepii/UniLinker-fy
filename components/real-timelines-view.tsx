"use client"

import { useState } from "react"
import { Calendar, Clock, ArrowRight, Filter, Globe } from "lucide-react"
import { realTimelines } from "@/lib/data"
import { useUserContext } from "@/lib/user-context"
import type { RealTimeline } from "@/lib/types"

function TimelineCard({ timeline }: { timeline: RealTimeline }) {
  const submissionDate = new Date(timeline.submissionDate)
  const approvalDate = new Date(timeline.approvalDate)

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-card-foreground">{timeline.nationality}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{timeline.visaType}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
          <Clock className="h-3 w-3" />
          {timeline.totalDays} days
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Submitted</div>
          <div className="text-sm font-medium text-card-foreground">
            {submissionDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>
        <div className="flex flex-1 items-center gap-1">
          <div className="h-0.5 flex-1 bg-muted" />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="h-0.5 flex-1 bg-muted" />
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Approved</div>
          <div className="text-sm font-medium text-card-foreground">
            {approvalDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>
      </div>

      {timeline.followUps.length > 0 && (
        <div className="mb-4 space-y-2 border-t border-border pt-4">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Follow-ups</div>
          {timeline.followUps.map((followUp, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">
                <span className="font-medium text-card-foreground">
                  {new Date(followUp.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}:
                </span>{" "}
                {followUp.action}
              </span>
            </div>
          ))}
        </div>
      )}

      {timeline.notes && <div className="rounded bg-muted/50 p-3 text-sm text-muted-foreground">{timeline.notes}</div>}
    </div>
  )
}

export function RealTimelinesView() {
  const { userContext } = useUserContext()
  const userNationality = userContext.nationality?.name || null
  const [showAllNationalities, setShowAllNationalities] = useState(false)

  const filteredTimelines =
    showAllNationalities || !userNationality
      ? realTimelines
      : realTimelines.filter((t) => t.nationality === userNationality)

  const otherTimelinesCount = userNationality
    ? realTimelines.filter((t) => t.nationality !== userNationality).length
    : 0

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Real Application Timelines</h1>
        <p className="text-muted-foreground">Aggregated real cases shared by students</p>
      </div>

      {/* Nationality Filter */}
      {userNationality && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {showAllNationalities ? (
                "Showing all nationalities"
              ) : (
                <>
                  Showing <span className="font-medium text-foreground">{userNationality}</span> experiences
                </>
              )}
            </span>
          </div>
          <button
            onClick={() => setShowAllNationalities(!showAllNationalities)}
            className="flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <Filter className="h-3.5 w-3.5" />
            {showAllNationalities ? "Show my nationality" : `Include others (+${otherTimelinesCount})`}
          </button>
        </div>
      )}

      {filteredTimelines.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">No timelines available for your nationality yet.</p>
          <button onClick={() => setShowAllNationalities(true)} className="mt-2 text-sm text-primary hover:underline">
            View timelines from other nationalities
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTimelines.map((timeline) => (
            <TimelineCard key={timeline.id} timeline={timeline} />
          ))}
        </div>
      )}

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">About these timelines:</strong> Processing times vary based on embassy
          location, season, and individual circumstances. Use these as reference points, not guarantees.
        </p>
      </div>
    </div>
  )
}
