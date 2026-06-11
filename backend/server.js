import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from "./routes/Url.js";

dotenv.config();

const app = express();


app.use(cors()); 

app.use(express.json());


app.use("/", urlRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World! URL Shortener API is Running.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Locally!");
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });