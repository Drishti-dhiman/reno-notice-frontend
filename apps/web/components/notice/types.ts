export type Notice = {
  id: number
  title: string
  body: string
  category: "EXAM" | "EVENT" | "GENERAL"
  priority: "NORMAL" | "URGENT"
  publishDate: string
  imageUrl?: string | null
}

export type Toast = {
  id: number
  title: string
  tone: "success" | "error"
}
