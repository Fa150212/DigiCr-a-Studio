const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


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

/* ✅ CORS CORRECT */
app.use(
  cors({
    origin: "http://localhost:3000", // FRONTEND
    credentials: true,               // COOKIES
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ⚠️ NE PAS parser JSON avant upload
app.use("/api/upload", uploadRoutes);

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRoutes);
// app.use("/api/articles", articleRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
