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


// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const connectDB = require("./config/db");

// /* ROUTES */
// const adminRoutes = require("./routes/adminRoutes");
// const articleRoutes = require("./routes/articleRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const authRoutes = require("./routes/authRoutes");
// const uploadRoutes = require("./routes/uploadRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const userRoutes = require("./routes/userRoutes");

// /* CONFIG */
// dotenv.config();
// connectDB();

// const app = express();

// /* ✅ CORS */
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// /* MIDDLEWARES */
// app.use(express.json());
// app.use(cookieParser());

// /* ✅ SERVIR LES IMAGES UPLOADÉES */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ROUTES API */
// app.use("/api/admin", adminRoutes);
// app.use("/api/articles", articleRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/users", userRoutes);

// /* SERVER */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on http://localhost:${PORT}`);
// });



// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const morgan = require("morgan");

// const connectDB = require("./config/db");

// /* ROUTES */
// const adminRoutes = require("./routes/adminRoutes");
// const articleRoutes = require("./routes/articleRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const authRoutes = require("./routes/authRoutes");
// const uploadRoutes = require("./routes/uploadRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const userRoutes = require("./routes/userRoutes");

// /* CONFIG */
// dotenv.config();
// connectDB();

// const app = express();

// /* 🔐 LOGS & SÉCURITÉ */
// app.use(morgan("dev"));
// app.disable("x-powered-by");

// /* ✅ CORS */
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// /* MIDDLEWARES */
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// /* 🖼️ FICHIERS STATIQUES (IMAGES UPLOADÉES) */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ROUTES API */
// app.use("/api/admin", adminRoutes);
// app.use("/api/articles", articleRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/users", userRoutes);

// /* 🚀 LANCEMENT DU SERVEUR */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on http://localhost:${PORT}`);
// });
