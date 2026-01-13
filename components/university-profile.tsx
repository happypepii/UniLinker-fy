import { AlertTriangle, Check, MessageSquareQuote } from "lucide-react"
import { cn } from "@/lib/utils"
import type { University } from "@/lib/types"

interface UniversityProfileProps {
  university: University
}

export function UniversityProfile({ university }: UniversityProfileProps) {
  const frictionLabels = {
    low: { label: "Low friction", color: "text-success" },
    medium: { label: "Medium friction", color: "text-warning" },
    high: { label: "High friction", color: "text-destructive" },
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {university.city}, {university.country}
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">{university.name}</h1>
      </div>

      {/* Reality Indicators */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Administrative Friction</h3>
          <div className="flex items-center gap-2">
            <AlertTriangle className={cn("h-5 w-5", frictionLabels[university.adminFriction].color)} />
            <span className={cn("font-medium", frictionLabels[university.adminFriction].color)}>
              {frictionLabels[university.adminFriction].label}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Based on student reports about bureaucracy, response times, and processes.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Language Usage</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="mb-1 flex justify-between text-xs">
                <span>English</span>
                <span className="font-medium">{university.languageUsage.english}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-info" style={{ width: `${university.languageUsage.english}%` }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1 flex justify-between text-xs">
                <span>Local</span>
                <span className="font-medium">{university.languageUsage.local}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${university.languageUsage.local}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Students Wish They Knew */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">What students wish they had known</h2>
        <div className="space-y-3">
          {university.insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <p className="text-sm text-card-foreground">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Quotes */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">From students</h2>
        <div className="space-y-4">
          {university.quotes.map((quote, index) => (
            <div key={index} className="rounded-lg border border-border bg-muted/30 p-5">
              <div className="mb-3 flex items-start gap-2">
                <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-sm text-card-foreground italic leading-relaxed">&quot;{quote.text}&quot;</p>
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                — {quote.author.nationality} student, {quote.author.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
