"use client"

import { useState } from "react"
import { Check, AlertTriangle, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { timelineSteps } from "@/lib/data"
import type { TimelineStep } from "@/lib/types"

const stageLabels: Record<TimelineStep["stage"], string> = {
  "after-acceptance": "After Acceptance",
  "before-arrival": "Before Arrival",
  "first-30-days": "First 30 Days",
  "first-semester": "First Semester",
}

const stageOrder: TimelineStep["stage"][] = ["after-acceptance", "before-arrival", "first-30-days", "first-semester"]

function TimelineStepCard({
  step,
  index,
  isCompleted,
  onToggleComplete,
}: {
  step: TimelineStep
  index: number
  isCompleted: boolean
  onToggleComplete: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card transition-all",
        isCompleted ? "border-success/30 bg-success/5" : "border-border",
      )}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <button
            onClick={onToggleComplete}
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
              isCompleted ? "border-success bg-success text-success-foreground" : "border-border hover:border-primary",
            )}
          >
            {isCompleted && <Check className="h-3.5 w-3.5" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
            </div>
            <h3 className={cn("font-medium text-card-foreground", isCompleted && "line-through opacity-60")}>
              {step.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-5 space-y-4 border-t border-border pt-5">
            {step.tips.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Lightbulb className="h-4 w-4 text-warning" />
                  <span>Tips from students</span>
                </div>
                <ul className="space-y-1.5">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-6">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {step.mistakes.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span>Common mistakes</span>
                </div>
                <ul className="space-y-1.5">
                  {step.mistakes.map((mistake, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-6">
                      • {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function VisaTimelineView() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  // Filter to visa-related steps only
  const visaSteps = timelineSteps.filter((step) => ["after-acceptance", "before-arrival"].includes(step.stage))

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(stepId)) {
        next.delete(stepId)
      } else {
        next.add(stepId)
      }
      return next
    })
  }

  // Group steps by stage
  const stepsByStage = stageOrder
    .map((stage) => ({
      stage,
      label: stageLabels[stage],
      steps: visaSteps.filter((s) => s.stage === stage),
    }))
    .filter((group) => group.steps.length > 0)

  const completedCount = completedSteps.size
  const totalCount = visaSteps.length

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Timeline View</h1>
        <p className="text-muted-foreground">Step-by-step visual guide from application to arrival</p>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
        <span className="text-sm text-muted-foreground">Your progress</span>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {stepsByStage.map((group) => (
          <div key={group.stage}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{group.label}</h2>
            <div className="space-y-3">
              {group.steps.map((step, index) => (
                <TimelineStepCard
                  key={step.id}
                  step={step}
                  index={visaSteps.findIndex((s) => s.id === step.id)}
                  isCompleted={completedSteps.has(step.id)}
                  onToggleComplete={() => toggleStep(step.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
