import type React from "react"
import Link from "next/link"
import {
  FileText,
  Building,
  Landmark,
  Shield,
  GraduationCap,
  Home,
  CreditCard,
  Briefcase,
  Building2,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Topic } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  passport: FileText,
  building: Building,
  bank: Landmark,
  shield: Shield,
  graduation: GraduationCap,
  home: Home,
  "credit-card": CreditCard,
  briefcase: Briefcase,
  "building-2": Building2,
  users: Users,
}

interface TopicCardProps {
  topic: Topic
  href: string
  isDeemphasized?: boolean
}

export function TopicCard({ topic, href, isDeemphasized }: TopicCardProps) {
  const Icon = iconMap[topic.icon] || FileText

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm",
        isDeemphasized && "opacity-50 pointer-events-none",
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <h3 className="mb-1 font-medium text-card-foreground">{topic.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
      {topic.tags && topic.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {topic.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex rounded-full px-2 py-0.5 text-xs",
                tag === "urgent" && "bg-warning/20 text-warning-foreground",
                tag === "required" && "bg-info/20 text-info-foreground",
                tag !== "urgent" && tag !== "required" && "bg-muted text-muted-foreground",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
