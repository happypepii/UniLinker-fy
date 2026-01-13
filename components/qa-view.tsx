"use client"

import { useState } from "react"
import { ThumbsUp, User, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Question, Answer } from "@/lib/types"

interface QAViewProps {
  topicTitle: string
  topicDescription: string
  questions: Question[]
}

function AnswerCard({ answer, isExpanded, onToggle }: { answer: Answer; isExpanded: boolean; onToggle: () => void }) {
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-card-foreground">{answer.author.nationality}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{answer.author.university}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5",
                  answer.author.status === "student" ? "bg-info/20 text-info" : "bg-success/20 text-success",
                )}
              >
                {answer.author.status === "student" ? "Current Student" : "Graduate"}
              </span>
              <span>•</span>
              <span>{new Date(answer.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>

      <p
        className={cn(
          "text-sm text-card-foreground leading-relaxed",
          !isExpanded && answer.content.length > 200 && "line-clamp-3",
        )}
      >
        {answer.content}
      </p>

      {answer.content.length > 200 && (
        <button
          onClick={onToggle}
          className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-2 text-muted-foreground hover:text-foreground", hasMarkedHelpful && "text-success")}
          onClick={() => setHasMarkedHelpful(!hasMarkedHelpful)}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-xs">{hasMarkedHelpful ? "Marked helpful" : "Was this helpful?"}</span>
        </Button>
        <span className="text-xs text-muted-foreground">
          {answer.helpfulCount + (hasMarkedHelpful ? 1 : 0)} found this helpful
        </span>
      </div>
    </div>
  )
}

function QuestionSection({ question }: { question: Question }) {
  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set())

  const toggleAnswer = (answerId: string) => {
    setExpandedAnswers((prev) => {
      const next = new Set(prev)
      if (next.has(answerId)) {
        next.delete(answerId)
      } else {
        next.add(answerId)
      }
      return next
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">{question.question}</h3>
      <div className="space-y-4">
        {question.answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            isExpanded={expandedAnswers.has(answer.id)}
            onToggle={() => toggleAnswer(answer.id)}
          />
        ))}
      </div>
    </div>
  )
}

export function QAView({ topicTitle, topicDescription, questions }: QAViewProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">{topicTitle}</h1>
        <p className="text-muted-foreground">{topicDescription}</p>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">About these answers:</strong> Responses come from verified students who
          share their nationality, university, and status. We emphasize usefulness over popularity.
        </p>
      </div>

      <div className="space-y-10">
        {questions.map((question) => (
          <QuestionSection key={question.id} question={question} />
        ))}
      </div>
    </div>
  )
}
