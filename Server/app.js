const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connect = require("./config/database");
const cors = require("cors");
// import routes
const router = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const Post = require("./models/postModel");

const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

// auth routes
app.use("/api", router);
// user routes
app.use("/api/user", userRouter);
// post routes
app.use("/api/post", postRouter);
// category routes
app.use("/api/category", categoryRouter);

const PORT = process.env.SERVER_PORT || 8000;

const removeLegacyTitleIndex = async () => {
  try {
    const collection = Post.collection;
    const indexes = await collection.indexes();
    if (indexes.some((index) => index.name === "title_1")) {
      await collection.dropIndex("title_1");
      console.log("Dropped legacy title_1 index from posts collection.");
    }
  } catch (error) {
    console.warn("Could not cleanup legacy index:", error.message);
  }
};

async function main() {
  await connect();
  await removeLegacyTitleIndex();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
