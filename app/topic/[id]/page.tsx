import { Suspense } from "react"
import { TopicContent } from "@/components/topic-content"

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <Suspense fallback={null}>
      <TopicContent id={id} />
    </Suspense>
  )
}
