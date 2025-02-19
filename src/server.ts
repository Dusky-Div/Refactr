import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.ts";
import connectDB from "./lib/db.ts";

const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/", userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.warn("Error on startServer: ", error);
    process.exit(1);
  }
};

startServer();
