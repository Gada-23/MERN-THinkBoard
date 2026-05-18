import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Hardcode the values directly (temporary for testing)
const redis = new Redis({
  url: "https://equal-panther-93728.upstash.io",
  token: "gQAAAAAAAW4gAAIgcDJiYzJhYWZhYzk3ZDc0NmJmYWU4ZTIzOGE3OWMyNTc3Nw"
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "20 s")
})

export default ratelimit