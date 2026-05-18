// ratelimiter.js
import ratelimit from '../config/upstash.js';  // ✅ Fixed path (go up one level to src, then into config)

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || req.headers["x-forwarded-for"] || "global";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (e) {
    console.error("Rate limit error", e);
    next();
  }
};

export default rateLimiter;