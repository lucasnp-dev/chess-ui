'use client'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function Dashboard() {
  return (
    <main>
      <h1>dashboard</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </main>
  )
}
