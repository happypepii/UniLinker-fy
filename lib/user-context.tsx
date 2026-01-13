"use client"

import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { UserContext } from "./types"
import { nationalities, countries } from "./data"

interface UserContextState {
  userContext: UserContext
  setUserContext: (context: UserContext) => void
  updateURLParams: (params: Record<string, string | null>) => void
}

const UserContextContext = createContext<UserContextState | undefined>(undefined)

function getInitialContext(searchParams: URLSearchParams): UserContext {
  const nationalityCode = searchParams.get("nationality")
  const destinationCode = searchParams.get("destination")

  const nationality = nationalityCode ? nationalities.find((n) => n.code === nationalityCode) || null : null
  const destination = destinationCode ? countries.find((c) => c.code === destinationCode) || null : null

  return { nationality, destination }
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchParamsRef = useRef(searchParams)
  searchParamsRef.current = searchParams

  const [userContext, setUserContextState] = useState<UserContext>(() => getInitialContext(searchParams))

  const setUserContext = useCallback(
    (context: UserContext) => {
      setUserContextState(context)

      const params = new URLSearchParams(searchParamsRef.current.toString())

      if (context.nationality) {
        params.set("nationality", context.nationality.code)
      } else {
        params.delete("nationality")
      }

      if (context.destination) {
        params.set("destination", context.destination.code)
      } else {
        params.delete("destination")
      }

      const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newURL, { scroll: false })
    },
    [pathname, router],
  )

  const updateURLParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParamsRef.current.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }

      const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.push(newURL, { scroll: false })
    },
    [pathname, router],
  )

  return (
    <UserContextContext.Provider value={{ userContext, setUserContext, updateURLParams }}>
      {children}
    </UserContextContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContextContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider")
  }
  return context
}
