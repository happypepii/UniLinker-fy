"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { nationalities, countries } from "@/lib/data"
import type { Nationality, Country } from "@/lib/types"

interface ContextSelectorProps {
  onComplete: (nationality: Nationality, destination: Country) => void
}

export function ContextSelector({ onComplete }: ContextSelectorProps) {
  const [selectedNationality, setSelectedNationality] = useState<Nationality | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Country | null>(null)
  const [step, setStep] = useState<"nationality" | "destination">("nationality")

  const handleNationalitySelect = (nationality: Nationality) => {
    setSelectedNationality(nationality)
    setStep("destination")
  }

  const handleDestinationSelect = (destination: Country) => {
    setSelectedDestination(destination)
  }

  const handleContinue = () => {
    if (selectedNationality && selectedDestination) {
      onComplete(selectedNationality, selectedDestination)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground text-balance">
            Real knowledge from students who have been there
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Content adapts based on your nationality and destination.
            <br />
            What applies to you won&apos;t apply to everyone.
          </p>
        </div>

        {step === "nationality" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                1
              </span>
              <span>Where are you from?</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {nationalities.map((nationality) => (
                <button
                  key={nationality.code}
                  onClick={() => handleNationalitySelect(nationality)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/50",
                    selectedNationality?.code === nationality.code && "border-primary bg-primary/5",
                  )}
                >
                  <span className="text-2xl">{nationality.flag}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-card-foreground">{nationality.name}</p>
                    {nationality.isEU && <p className="text-xs text-muted-foreground">EU Citizen</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "destination" && selectedNationality && (
          <div className="space-y-6">
            <button
              onClick={() => setStep("nationality")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs text-success-foreground">
                <Check className="h-3 w-3" />
              </span>
              <span>
                {selectedNationality.flag} {selectedNationality.name}
              </span>
              <span className="text-xs">(change)</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                2
              </span>
              <span>Where are you going?</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleDestinationSelect(country)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/50",
                    selectedDestination?.code === country.code && "border-primary bg-primary/5",
                  )}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <p className="text-sm font-medium text-card-foreground">{country.name}</p>
                </button>
              ))}
            </div>

            {selectedDestination && (
              <div className="pt-4">
                <Button onClick={handleContinue} className="w-full gap-2" size="lg">
                  Continue to explore
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {!selectedNationality.isEU && selectedDestination.code === "DE" && (
                  <p className="mt-3 text-center text-sm text-muted-foreground">
                    As a non-EU citizen, you&apos;ll see visa-related content.
                  </p>
                )}
                {selectedNationality.isEU && selectedDestination.code === "DE" && (
                  <p className="mt-3 text-center text-sm text-muted-foreground">
                    As an EU citizen, visa content will be hidden — you have freedom of movement.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
