import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
import connectDB from "./config/db.js";
import User from "./model/users.js";

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello from server"));

app.post("/add", async (req, res) => {
  try {
    const addUser = await User.create({
      username: req.body.username,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
