"use client"

import type React from "react"
import { FileText, Clock, Users, MessageCircle, ArrowRight, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserContext } from "@/lib/user-context"

interface SubcategoryCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const subcategories: SubcategoryCard[] = [
  {
    id: "overview",
    title: "Visa Overview",
    description: "Key requirements, documents, and common pitfalls",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "timeline",
    title: "Timeline View",
    description: "Step-by-step visual guide from application to arrival",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: "real-timelines",
    title: "Real Application Timelines",
    description: "Actual cases shared by students for comparison",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "qa",
    title: "Q&A Forum",
    description: "Questions answered by verified students",
    icon: <MessageCircle className="h-5 w-5" />,
  },
]

interface VisaSubcategoryViewProps {
  onSelectSubcategory: (id: string) => void
}

export function VisaSubcategoryView({ onSelectSubcategory }: VisaSubcategoryViewProps) {
  const { userContext } = useUserContext()
  const userNationality = userContext.nationality?.name || null

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">Student Visa</h1>
        <p className="text-muted-foreground">Application process, appointments, and documents</p>
      </div>

      {userNationality && (
        <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Showing content relevant to <span className="font-medium text-foreground">{userNationality}</span>{" "}
              students
            </span>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {subcategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectSubcategory(category.id)}
            className={cn(
              "group flex items-center gap-4 rounded-lg border border-border bg-card p-5",
              "text-left transition-all hover:border-primary/30 hover:bg-accent/50",
            )}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-card-foreground group-hover:text-foreground">{category.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  )
}
