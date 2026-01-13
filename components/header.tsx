"use client"

import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { nationalities } from "@/lib/data"
import type { Nationality } from "@/lib/types"
import Link from "next/link"

interface HeaderProps {
  nationality?: Nationality | null
  onNationalityChange?: (nationality: Nationality) => void
  showContextSwitcher?: boolean
}

export function Header({ nationality, onNationalityChange, showContextSwitcher = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-semibold text-primary-foreground">U</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">UniLinker</span>
        </Link>

        {showContextSwitcher && nationality && onNationalityChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                <Globe className="h-4 w-4" />
                <span className="text-sm">
                  {nationality.flag} {nationality.name}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {nationalities.map((nat) => (
                <DropdownMenuItem key={nat.code} onClick={() => onNationalityChange(nat)} className="gap-2">
                  <span>{nat.flag}</span>
                  <span>{nat.name}</span>
                  {nat.isEU && <span className="ml-auto text-xs text-muted-foreground">EU</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
