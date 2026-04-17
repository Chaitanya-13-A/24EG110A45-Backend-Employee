import exp from "express";
import mongoose from "mongoose";
import { empRoute } from "./API/empApp.js";
import cors from "cors";

const app = exp();

// middleware
app.use(cors());
app.use(exp.json());

// routes
app.use("/emp-api", empRoute);

// DB + server start
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ use env
    console.log("DB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running");
    });

  } catch (err) {
    console.log("DB error:", err.message);
  }
};

connectDB();

// error middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});