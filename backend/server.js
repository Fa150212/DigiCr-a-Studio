const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const articleRoutes = require("./routes/articleRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

/* ===============================
   ✅ CORS CONFIGURATION (IMPORTANT)
================================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://digi-cr-a-studio-l1xs.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise Postman, Render, etc.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Middleware pour JSON et cookies
app.use(express.json());
app.use(cookieParser());

/* ===============================
   ROUTES
================================= */
app.use("/api/admin", adminRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

/* ===============================
   SERVER
================================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
