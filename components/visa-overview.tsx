"use client"

import { FileCheck, AlertTriangle, FileText } from "lucide-react"
import { visaOverview } from "@/lib/data"

export function VisaOverview() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Visa Overview</h1>
        <p className="text-muted-foreground">A structured summary of the German student visa process</p>
      </div>

      {/* Summary */}
      <div className="mb-8 rounded-lg border border-border bg-card p-6">
        <p className="text-card-foreground leading-relaxed">{visaOverview.summary}</p>
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-success" />
          <h2 className="text-lg font-semibold text-foreground">Key Requirements</h2>
        </div>
        <ul className="space-y-2">
          {visaOverview.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Documents */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-info" />
          <h2 className="text-lg font-semibold text-foreground">Required Documents</h2>
        </div>
        <div className="grid gap-3">
          {visaOverview.documents.map((doc, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium text-card-foreground">{doc.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common Pitfalls */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="text-lg font-semibold text-foreground">Common Pitfalls</h2>
        </div>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
          <ul className="space-y-2">
            {visaOverview.pitfalls.map((pitfall, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/50" />
                {pitfall}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
