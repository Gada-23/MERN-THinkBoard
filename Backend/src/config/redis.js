import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

// Force load .env from the root
dotenv.config({ path: './.env' })

console.log("Checking env vars...");
console.log("URL exists:", !!process.env.UPSTASH_REDIS_REST_URL);
console.log("Token exists:", !!process.env.UPSTASH_REDIS_REST_TOKEN);

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.error("Missing Redis env vars! Using hardcoded values...");
  // Fallback to hardcoded
  var redis = new Redis({
    url: "https://equal-panther-93728.upstash.io",
    token: "gQAAAAAAAW4gAAIgcDJiYzJhYWZhYzk3ZDc0NmJmYWU4ZTIzOGE3OWMyNTc3Nw"
  });
} else {
  var redis = Redis.fromEnv();
}

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "20 s")
})

export default ratelimit