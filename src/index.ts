import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import cors from "cors";
import { register, login, logout } from "./controllers/auth";
import { verifyToken } from "./controllers/verifyToken";
import { connectDB } from "./libs/db";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`💚 app is running on 🔌 port ${process.env.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("❌ Failed to connect to database", err);
    process.exit(1);
  });

app.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

app.post("/register", (req, res) => {
  register(req, res);
});

app.post("/login", (req, res) => {
  login(req, res);
});

app.post("/logout", (req, res) => {
  logout(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`\n💚 app is running on 🔌 port ${process.env.PORT}`);
});
