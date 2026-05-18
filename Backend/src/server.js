// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config(); // Call this as early as possible
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Global Rate Limiter applied to all routes below
app.use(rateLimiter);

// Fixed: Added leading slash
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => console.log("Server started on port", PORT));
});

