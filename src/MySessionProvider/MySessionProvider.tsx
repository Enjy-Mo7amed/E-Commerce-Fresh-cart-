'use client'
import { SessionProvider } from "next-auth/react"

export function SessionProviderr({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}