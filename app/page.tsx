'use client'

import dynamic from 'next/dynamic'

const Frame = dynamic(() => import('@/components/Frame'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <Frame />
    </main>
  )
}